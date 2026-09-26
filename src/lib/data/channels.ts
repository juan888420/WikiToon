import { cache } from "react";
import { groupSeriesRuns, seriesCardSelect } from "@/lib/data/series";
import { channelTimelineWhere } from "@/lib/data/timeline";
import { prisma } from "@/lib/prisma";

const nameCollator = new Intl.Collator("es", { sensitivity: "base", numeric: true });

/** Distinct series per channel; a series can have several SeriesChannel rows (separate runs). */
async function countSeriesByChannel(channelId?: number) {
  const links = await prisma.seriesChannel.findMany({
    where: channelId === undefined ? undefined : { channelId },
    distinct: ["channelId", "seriesId"],
    select: { channelId: true },
  });
  const counts = new Map<number, number>();
  for (const { channelId: id } of links) counts.set(id, (counts.get(id) ?? 0) + 1);
  return counts;
}

export async function listChannels() {
  const [channels, seriesCounts] = await Promise.all([
    prisma.channel.findMany({
      select: {
        id: true,
        slug: true,
        name: true,
        logoPath: true,
        blockChannels: { select: { block: { select: { name: true } } } },
      },
    }),
    countSeriesByChannel(),
  ]);

  return channels
    .map(({ id, blockChannels, ...channel }) => ({
      ...channel,
      seriesCount: seriesCounts.get(id) ?? 0,
      blockNames: blockChannels
        .map(({ block }) => block.name)
        .sort((a, b) => nameCollator.compare(a, b)),
    }))
    .sort((a, b) => nameCollator.compare(a.name, b.name));
}

export type ChannelListItem = Awaited<ReturnType<typeof listChannels>>[number];

export function listChannelSlugs() {
  return prisma.channel.findMany({ select: { slug: true } });
}

/** Cached per request so the channel layout, pages and metadata share one query. */
export const getChannelBySlug = cache(async (slug: string) => {
  const channel = await prisma.channel.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      name: true,
      logoPath: true,
      _count: { select: { schedules: true } },
    },
  });
  if (!channel) return null;

  const { _count, ...rest } = channel;
  const [seriesCounts, timelineEvents] = await Promise.all([
    countSeriesByChannel(channel.id),
    prisma.timelineEvent.count({ where: channelTimelineWhere(channel.id) }),
  ]);
  return {
    ...rest,
    counts: {
      series: seriesCounts.get(channel.id) ?? 0,
      schedules: _count.schedules,
      timelineEvents,
    },
  };
});

export type ChannelDetail = NonNullable<Awaited<ReturnType<typeof getChannelBySlug>>>;

/**
 * Series linked to the channel, with every documented run (years stay null until sourced) and the
 * slugs of the channel's blocks each one is in.
 */
export async function listChannelSeries(channelId: number) {
  const [links, blockLinks] = await Promise.all([
    prisma.seriesChannel.findMany({
      where: { channelId },
      orderBy: [{ startYear: "asc" }, { id: "asc" }],
      select: { startYear: true, endYear: true, series: { select: seriesCardSelect } },
    }),
    // Only blocks that ran on this channel: a series can also be in another channel's blocks.
    prisma.seriesBlock.findMany({
      where: { block: { blockChannels: { some: { channelId } } } },
      select: { series: { select: { slug: true } }, block: { select: { slug: true } } },
    }),
  ]);

  const blockSlugsBySeries = new Map<string, Set<string>>();
  for (const { series, block } of blockLinks) {
    const slugs = blockSlugsBySeries.get(series.slug) ?? new Set<string>();
    slugs.add(block.slug);
    blockSlugsBySeries.set(series.slug, slugs);
  }
  return groupSeriesRuns(links).map((entry) => ({
    ...entry,
    blockSlugs: [...(blockSlugsBySeries.get(entry.series.slug) ?? [])],
  }));
}
