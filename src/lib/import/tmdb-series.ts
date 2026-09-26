import type { Prisma } from "@/generated/prisma/client";
import { resolveSeriesSlug } from "@/lib/import/series-slug";
import { prisma } from "@/lib/prisma";
import {
  getTvSeasonDetails,
  getTvSeriesDetails,
  searchTvSeries,
  type TmdbTvSearchResult,
  type TmdbTvSeasonDetails,
  type TmdbTvSeriesDetails,
} from "@/lib/tmdb";

function normalizeTitle(title: string) {
  return title
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function slugify(title: string) {
  return normalizeTitle(title).replace(/ /g, "-");
}

function yearOf(date: string | null | undefined) {
  const year = date ? Number.parseInt(date.slice(0, 4), 10) : Number.NaN;
  return Number.isNaN(year) ? null : year;
}

// TMDB returns "" (not null) for untranslated text fields.
function textOrNull(value: string | null | undefined) {
  return value?.trim() ? value : null;
}

/**
 * Finds exactly one TMDB series whose localized or original title matches `title` and whose
 * first air year is `firstAirYear`. Throws with the candidate list otherwise, so a wrong show
 * is never imported silently. Only the first page of search results is considered.
 */
export async function findTmdbSeriesByExactTitle(
  title: string,
  firstAirYear: number,
): Promise<TmdbTvSearchResult> {
  const { results } = await searchTvSeries(title);
  const wanted = normalizeTitle(title);
  const matches = results.filter(
    (result) =>
      (normalizeTitle(result.name) === wanted || normalizeTitle(result.original_name) === wanted) &&
      yearOf(result.first_air_date) === firstAirYear,
  );

  if (matches.length !== 1) {
    const candidates = results
      .map((r) => `${r.id} "${r.name}" / "${r.original_name}" (${r.first_air_date || "no date"})`)
      .join("\n  ");
    throw new Error(
      `Expected exactly 1 TMDB series titled "${title}" first aired in ${firstAirYear}, found ${matches.length}.\n` +
        `Candidates:\n  ${candidates || "(no results)"}`,
    );
  }

  return matches[0];
}

export type TmdbSeriesPayload = {
  details: TmdbTvSeriesDetails;
  seasons: TmdbTvSeasonDetails[];
  syncedAt: Date;
};

/**
 * Fetches a TMDB series with its seasons (and their episodes). Makes no DB writes. `seasons`
 * limits the fetch to those season numbers, for TMDB entries that group runs outside the catalog's
 * scope; the payload's last air date then comes from the kept episodes, not from TMDB's whole run.
 * A requested season TMDB doesn't have is an error.
 */
export async function fetchTmdbSeries(
  tmdbSeriesId: number,
  { seasons: seasonNumbers }: { seasons?: number[] } = {},
): Promise<TmdbSeriesPayload> {
  let details = await getTvSeriesDetails(tmdbSeriesId);
  if (seasonNumbers) {
    const missing = seasonNumbers.filter(
      (number) => !details.seasons.some((season) => season.season_number === number),
    );
    if (missing.length > 0) {
      throw new Error(`TMDB series ${tmdbSeriesId} has no season ${missing.join(", ")}.`);
    }
    details = {
      ...details,
      seasons: details.seasons.filter((season) => seasonNumbers.includes(season.season_number)),
    };
  }
  const seasons = await Promise.all(
    details.seasons.map((season) => getTvSeasonDetails(tmdbSeriesId, season.season_number)),
  );
  if (seasonNumbers) {
    const lastAirDate = seasons
      .flatMap((season) => [season.air_date, ...season.episodes.map((episode) => episode.air_date)])
      .filter((date): date is string => Boolean(date))
      .sort()
      .at(-1);
    details = { ...details, last_air_date: lastAirDate ?? null };
  }
  return { details, seasons, syncedAt: new Date() };
}

/**
 * Upserts a fetched series with its seasons and episodes by TMDB id, inside the caller's
 * transaction. `Series.title` and `slug` are only set on create: they are curated by WikiToon
 * afterwards and must not be overwritten by later syncs. `title` replaces TMDB's name on create,
 * and the slug is built from it.
 */
export async function writeTmdbSeries(
  tx: Prisma.TransactionClient,
  { details, seasons, syncedAt }: TmdbSeriesPayload,
  { title = details.name }: { title?: string } = {},
) {
  const seriesData = {
    overview: textOrNull(details.overview),
    firstAirYear: yearOf(details.first_air_date),
    lastAirYear: yearOf(details.last_air_date),
    posterPath: details.poster_path,
    tmdbSyncedAt: syncedAt,
  };
  // An existing series keeps its slug; only a new one gets a slug resolved against collisions.
  const existing = await tx.series.findUnique({
    where: { tmdbId: details.id },
    select: { id: true },
  });
  const series = existing
    ? await tx.series.update({ where: { id: existing.id }, data: seriesData })
    : await tx.series.create({
        data: {
          ...seriesData,
          tmdbId: details.id,
          title,
          slug: await resolveSeriesSlug(
            {
              baseSlug: slugify(title),
              firstAirYear: seriesData.firstAirYear,
              tmdbId: details.id,
            },
            (slug) => tx.series.findUnique({ where: { slug }, select: { tmdbId: true } }),
          ),
        },
      });

  let episodeCount = 0;
  for (const season of seasons) {
    const seasonData = {
      seriesId: series.id,
      number: season.season_number,
      name: textOrNull(season.name),
      overview: textOrNull(season.overview),
      airYear: yearOf(season.air_date),
      posterPath: season.poster_path,
      tmdbSyncedAt: syncedAt,
    };
    const savedSeason = await tx.season.upsert({
      where: { tmdbId: season.id },
      update: seasonData,
      create: { ...seasonData, tmdbId: season.id },
    });

    for (const episode of season.episodes) {
      const episodeData = {
        seasonId: savedSeason.id,
        number: episode.episode_number,
        title: textOrNull(episode.name),
        overview: textOrNull(episode.overview),
        originalAirDate: textOrNull(episode.air_date),
        stillPath: episode.still_path,
        tmdbSyncedAt: syncedAt,
      };
      await tx.episode.upsert({
        where: { tmdbId: episode.id },
        update: episodeData,
        create: { ...episodeData, tmdbId: episode.id },
      });
    }
    episodeCount += season.episodes.length;
  }

  return { series, created: !existing, seasonCount: seasons.length, episodeCount };
}

/**
 * Imports one TMDB series with all its seasons and episodes, upserting by TMDB id.
 * All TMDB requests happen before the DB transaction, so a network failure writes nothing and a
 * DB failure rolls everything back.
 */
export async function importTmdbSeries(tmdbSeriesId: number) {
  const payload = await fetchTmdbSeries(tmdbSeriesId);
  return prisma.$transaction(
    (tx) => writeTmdbSeries(tx, payload),
    // Interactive transactions default to a 5s timeout; large series can take longer.
    { timeout: 60_000 },
  );
}
