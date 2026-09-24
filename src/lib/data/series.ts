import { cache } from "react";
import { prisma } from "@/lib/prisma";

const titleCollator = new Intl.Collator("es", { sensitivity: "base", numeric: true });

/** Fields a `SeriesCard` needs; shared by every list that renders series cards. */
export const seriesCardSelect = {
  slug: true,
  title: true,
  firstAirYear: true,
  lastAirYear: true,
  posterPath: true,
} as const;

export async function listSeries() {
  const series = await prisma.series.findMany({ select: seriesCardSelect });
  // SQLite sorts by byte value; the collator handles accents and numbers ("Ben 10") properly.
  return series.sort((a, b) => titleCollator.compare(a.title, b.title));
}

export type SeriesListItem = Awaited<ReturnType<typeof listSeries>>[number];

export type YearRun = { startYear: number | null; endYear: number | null };

/**
 * Groups join rows (SeriesChannel, SeriesBlock) by series, keeping every run: a series can have
 * several rows for separate periods. Sorted by title.
 */
export function groupSeriesRuns<Row extends YearRun & { series: SeriesListItem }>(rows: Row[]) {
  const bySlug = new Map<string, { series: SeriesListItem; runs: YearRun[] }>();
  for (const { series, startYear, endYear } of rows) {
    const entry = bySlug.get(series.slug) ?? { series, runs: [] };
    entry.runs.push({ startYear, endYear });
    bySlug.set(series.slug, entry);
  }
  return [...bySlug.values()].sort((a, b) => titleCollator.compare(a.series.title, b.series.title));
}

export function listSeriesSlugs() {
  return prisma.series.findMany({ select: { slug: true } });
}

/** Cached per request so `generateMetadata` and the page share one query. */
export const getSeriesBySlug = cache(async (slug: string) => {
  const series = await prisma.series.findUnique({
    where: { slug },
    select: {
      slug: true,
      title: true,
      originalTitle: true,
      overview: true,
      firstAirYear: true,
      lastAirYear: true,
      posterPath: true,
      tmdbId: true,
      tmdbSyncedAt: true,
      seasons: {
        orderBy: { number: "asc" },
        select: {
          id: true,
          number: true,
          name: true,
          airYear: true,
          episodes: {
            orderBy: { number: "asc" },
            select: { id: true, number: true, title: true, overview: true, originalAirDate: true },
          },
        },
      },
    },
  });
  if (!series) return null;

  // Specials (season 0, following TMDB) go after the regular seasons.
  const regular = series.seasons.filter((season) => season.number > 0);
  const specials = series.seasons.filter((season) => season.number === 0);
  return { ...series, seasons: [...regular, ...specials] };
});

export type SeriesDetail = NonNullable<Awaited<ReturnType<typeof getSeriesBySlug>>>;
