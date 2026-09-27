import type { MetadataRoute } from "next";
import { blockHref, listBlockParams } from "@/lib/data/blocks";
import { listChannelSlugs } from "@/lib/data/channels";
import { listScheduleDayParams, scheduleDayHref } from "@/lib/data/schedules";
import { listSeriesSlugs } from "@/lib/data/series";
import { absoluteUrl } from "@/lib/seo";

/**
 * Every indexable page, built from the same queries as `generateStaticParams`, so it only lists
 * URLs that exist. Channel schedule sections without dates are left out (they are `noindex`).
 * No `lastModified`: the catalog has no reliable per-page edit date.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [channels, series, blocks, days] = await Promise.all([
    listChannelSlugs(),
    listSeriesSlugs(),
    listBlockParams(),
    listScheduleDayParams(),
  ]);
  const channelsWithDays = new Set(days.map((day) => day.canal));

  const paths = [
    "/canales",
    "/series",
    "/bloques",
    "/programacion",
    ...channels.map(({ slug }) => `/canales/${slug}`),
    ...channels
      .filter(({ slug }) => channelsWithDays.has(slug))
      .map(({ slug }) => `/canales/${slug}/programacion`),
    ...series.map(({ slug }) => `/series/${slug}`),
    ...blocks.map(blockHref),
    ...days.map((day) => scheduleDayHref(day.canal, day.fecha)),
  ];
  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
