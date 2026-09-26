import { linkSeriesToChannel } from "@/lib/import/series-channel";
import {
  fetchTmdbSeries,
  slugify,
  writeTmdbSeries,
  type TmdbSeriesPayload,
} from "@/lib/import/tmdb-series";
import { prisma } from "@/lib/prisma";

export type SeriesCatalogEntry = {
  tmdbId: number;
  /**
   * Curated Spanish title. Replaces TMDB's name: on create it also builds the slug, and on an
   * existing series it updates the title only (the slug never changes). Omit to keep TMDB's name.
   */
  title?: string;
  /** Channels to link (SeriesChannel). Omit when the Latin American channel is not documented. */
  channelSlugs?: string[];
  /**
   * TMDB season numbers to import, for entries that group runs outside the catalog's scope. Omit
   * to import every season. Seasons already stored outside this list are never deleted: the load
   * fails listing them instead.
   */
  seasons?: number[];
};

export type LoadedSeries = {
  tmdbId: number;
  seriesId: number;
  title: string;
  status: "imported" | "refreshed" | "unchanged";
  /** True when an existing series got its title from the catalog in this run. */
  retitled: boolean;
  linkedChannels: string[];
};

/**
 * Loads the curated series catalog. The data is validated first, then every TMDB request runs
 * before any write, then all writes happen in one transaction, so any failure writes nothing.
 * By default only series missing from the DB are fetched; `refresh` re-syncs every entry from
 * TMDB (TMDB never overwrites title or slug; only the catalog's `title` sets the title).
 * Additive only: series and SeriesChannel rows missing from `entries` are never deleted, and
 * existing links are left untouched.
 */
export async function loadSeriesCatalog(
  entries: SeriesCatalogEntry[],
  { refresh = false }: { refresh?: boolean } = {},
): Promise<LoadedSeries[]> {
  const problems: string[] = [];
  const seenTmdbIds = new Set<number>();
  for (const entry of entries) {
    if (seenTmdbIds.has(entry.tmdbId)) {
      problems.push(`TMDB id ${entry.tmdbId} is listed more than once.`);
    }
    seenTmdbIds.add(entry.tmdbId);
    if (entry.title !== undefined && (entry.title !== entry.title.trim() || !slugify(entry.title))) {
      problems.push(`TMDB id ${entry.tmdbId} has a blank, untrimmed or slug-unsafe title.`);
    }
    if (
      entry.seasons !== undefined &&
      (entry.seasons.length === 0 ||
        new Set(entry.seasons).size !== entry.seasons.length ||
        !entry.seasons.every((number) => Number.isInteger(number) && number >= 0))
    ) {
      problems.push(`TMDB id ${entry.tmdbId} has an empty, repeated or invalid season list.`);
    }
    const channelSlugs = entry.channelSlugs ?? [];
    if (new Set(channelSlugs).size !== channelSlugs.length) {
      problems.push(`TMDB id ${entry.tmdbId} lists a channel more than once.`);
    }
  }

  const channels = await prisma.channel.findMany({
    where: { slug: { in: entries.flatMap((entry) => entry.channelSlugs ?? []) } },
    select: { id: true, slug: true },
  });
  const channelIdBySlug = new Map(channels.map((channel) => [channel.slug, channel.id]));
  for (const entry of entries) {
    for (const slug of entry.channelSlugs ?? []) {
      if (!channelIdBySlug.has(slug)) {
        problems.push(
          `TMDB id ${entry.tmdbId}: channel "${slug}" not found. Run \`npm run db:seed\` first.`,
        );
      }
    }
  }

  const limited = entries.filter((entry) => entry.seasons !== undefined);
  const storedSeasons = await prisma.season.findMany({
    where: { series: { tmdbId: { in: limited.map((entry) => entry.tmdbId) } } },
    select: { number: true, series: { select: { tmdbId: true } } },
  });
  for (const entry of limited) {
    const outside = storedSeasons
      .filter((season) => season.series.tmdbId === entry.tmdbId)
      .map((season) => season.number)
      .filter((number) => !entry.seasons!.includes(number));
    if (outside.length > 0) {
      problems.push(
        `TMDB id ${entry.tmdbId} already has seasons outside its list (${outside.join(", ")}); ` +
          "remove them explicitly first.",
      );
    }
  }

  if (problems.length > 0) {
    throw new Error(`Invalid series catalog, nothing was written:\n  ${problems.join("\n  ")}`);
  }

  const existing = await prisma.series.findMany({
    where: { tmdbId: { in: entries.map((entry) => entry.tmdbId) } },
    select: { tmdbId: true },
  });
  const existingTmdbIds = new Set(existing.map((row) => row.tmdbId));

  // Sequential on purpose: each series already fetches its seasons in parallel.
  const payloads = new Map<number, TmdbSeriesPayload>();
  for (const entry of entries) {
    if (!refresh && existingTmdbIds.has(entry.tmdbId)) continue;
    try {
      payloads.set(entry.tmdbId, await fetchTmdbSeries(entry.tmdbId, { seasons: entry.seasons }));
    } catch (error) {
      throw new Error(`TMDB request for series ${entry.tmdbId} failed, nothing was written.`, {
        cause: error,
      });
    }
  }

  return prisma.$transaction(
    async (tx) => {
      const loaded: LoadedSeries[] = [];
      for (const entry of entries) {
        const payload = payloads.get(entry.tmdbId);
        let series: { id: number; title: string };
        let status: LoadedSeries["status"] = "unchanged";
        if (payload) {
          const written = await writeTmdbSeries(tx, payload, { title: entry.title });
          series = written.series;
          status = written.created ? "imported" : "refreshed";
        } else {
          series = await tx.series.findUniqueOrThrow({
            where: { tmdbId: entry.tmdbId },
            select: { id: true, title: true },
          });
        }

        const retitled = entry.title !== undefined && entry.title !== series.title;
        if (retitled) {
          series = await tx.series.update({
            where: { id: series.id },
            data: { title: entry.title },
            select: { id: true, title: true },
          });
        }

        const linkedChannels: string[] = [];
        for (const slug of entry.channelSlugs ?? []) {
          const { created } = await linkSeriesToChannel(series.id, channelIdBySlug.get(slug)!, tx);
          if (created) linkedChannels.push(slug);
        }
        loaded.push({
          tmdbId: entry.tmdbId,
          seriesId: series.id,
          title: series.title,
          status,
          retitled,
          linkedChannels,
        });
      }
      return loaded;
    },
    // A full load from an empty DB writes thousands of episodes in this single transaction.
    { timeout: 600_000 },
  );
}
