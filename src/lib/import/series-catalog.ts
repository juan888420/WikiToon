import { linkSeriesToChannel } from "@/lib/import/series-channel";
import { fetchTmdbSeries, writeTmdbSeries, type TmdbSeriesPayload } from "@/lib/import/tmdb-series";
import { prisma } from "@/lib/prisma";

export type SeriesCatalogEntry = {
  tmdbId: number;
  /** Channels to link (SeriesChannel). Omit when the Latin American channel is not documented. */
  channelSlugs?: string[];
};

export type LoadedSeries = {
  tmdbId: number;
  seriesId: number;
  title: string;
  status: "imported" | "refreshed" | "unchanged";
  linkedChannels: string[];
};

/**
 * Loads the curated series catalog. The data is validated first, then every TMDB request runs
 * before any write, then all writes happen in one transaction, so any failure writes nothing.
 * By default only series missing from the DB are fetched; `refresh` re-syncs every entry from
 * TMDB (title and slug are still never overwritten). Additive only: series and SeriesChannel rows
 * missing from `entries` are never deleted, and existing links are left untouched.
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
      payloads.set(entry.tmdbId, await fetchTmdbSeries(entry.tmdbId));
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
          const written = await writeTmdbSeries(tx, payload);
          series = written.series;
          status = written.created ? "imported" : "refreshed";
        } else {
          series = await tx.series.findUniqueOrThrow({
            where: { tmdbId: entry.tmdbId },
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
          linkedChannels,
        });
      }
      return loaded;
    },
    // A full load from an empty DB writes thousands of episodes in this single transaction.
    { timeout: 600_000 },
  );
}
