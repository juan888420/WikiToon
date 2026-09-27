import { cache } from "react";
import type { Prisma } from "@/generated/prisma/client";
import { groupSeriesRuns, seriesCardSelect } from "@/lib/data/series";
import { prisma } from "@/lib/prisma";

// Ignores punctuation, so "¿Quién tiene el control?" sorts under Q.
const nameCollator = new Intl.Collator("es", {
  sensitivity: "base",
  numeric: true,
  ignorePunctuation: true,
});

const airingSelect = {
  orderBy: { position: "asc" },
  select: {
    weekdays: true,
    startTime: true,
    endTime: true,
    period: true,
    timeZone: true,
    sourceName: true,
    sourceUrl: true,
    channel: { select: { slug: true, name: true } },
  },
} satisfies Prisma.Block$blockAiringsArgs;

type AiringRow = Prisma.BlockAiringGetPayload<typeof airingSelect>;

/**
 * Groups a block's airings into schedule lines: one per channel, weekdays, period and source, with
 * its time ranges in data order. Keeps the order of each line's first airing, so the first lines
 * are the ones the data puts first (the card shows those).
 */
function toScheduleLines(airings: AiringRow[]) {
  const lines = new Map<
    string,
    Omit<AiringRow, "weekdays" | "startTime" | "endTime"> & {
      weekdays: number[];
      times: { startTime: string; endTime: string | null }[];
    }
  >();
  for (const { weekdays, startTime, endTime, ...airing } of airings) {
    const key = [airing.channel?.slug, weekdays, airing.period, airing.sourceUrl].join("|");
    const line = lines.get(key);
    if (line) {
      line.times.push({ startTime, endTime });
    } else {
      lines.set(key, {
        ...airing,
        weekdays: weekdays.split(",").map(Number),
        times: [{ startTime, endTime }],
      });
    }
  }
  return [...lines.values()];
}

export type BlockScheduleLine = ReturnType<typeof toScheduleLines>[number];

/** Shared by the global catalog and the channel section, so both render the same `BlockCard`. */
const blockSummarySelect = {
  id: true,
  slug: true,
  name: true,
  description: true,
  logoPath: true,
  startYear: true,
  endYear: true,
  // A block can run on several channels (e.g. Fox Kids and then Jetix).
  blockChannels: { select: { channel: { select: { slug: true, name: true } } } },
  // Distinct series: a series can have several SeriesBlock rows (separate periods).
  seriesBlocks: { distinct: ["seriesId"], select: { seriesId: true } },
  blockAirings: airingSelect,
} satisfies Prisma.BlockSelect;

type BlockSummaryRow = Prisma.BlockGetPayload<{ select: typeof blockSummarySelect }>;

function toSummary({ blockChannels, seriesBlocks, blockAirings, ...block }: BlockSummaryRow) {
  return {
    ...block,
    schedule: toScheduleLines(blockAirings),
    channels: blockChannels
      .map(({ channel }) => channel)
      .sort((a, b) => nameCollator.compare(a.name, b.name)),
    seriesCount: seriesBlocks.length,
  };
}

export type BlockSummary = ReturnType<typeof toSummary>;

export async function listBlocks() {
  const blocks = await prisma.block.findMany({ select: blockSummarySelect });
  return blocks.map(toSummary).sort((a, b) => nameCollator.compare(a.name, b.name));
}

export async function listChannelBlocks(channelId: number) {
  const blocks = await prisma.block.findMany({
    where: { blockChannels: { some: { channelId } } },
    orderBy: [{ startYear: "asc" }, { name: "asc" }],
    select: blockSummarySelect,
  });
  return blocks.map(toSummary);
}

/** Block slugs are globally unique, so one block has one page, shared by all of its channels. */
export function blockHref(block: { slug: string }) {
  return `/bloques/${block.slug}`;
}

export async function listBlockParams() {
  const blocks = await prisma.block.findMany({ select: { slug: true } });
  return blocks.map((block) => ({ slug: block.slug }));
}

/** Cached per request so `generateMetadata` and the page share one query. */
export const getBlock = cache(async (blockSlug: string) => {
  const block = await prisma.block.findUnique({
    where: { slug: blockSlug },
    select: {
      name: true,
      description: true,
      logoPath: true,
      startYear: true,
      endYear: true,
      sourceName: true,
      sourceUrl: true,
      blockChannels: {
        select: { channel: { select: { slug: true, name: true, logoPath: true } } },
      },
      blockAirings: airingSelect,
      seriesBlocks: {
        orderBy: [{ startYear: "asc" }, { id: "asc" }],
        select: { startYear: true, endYear: true, series: { select: seriesCardSelect } },
      },
    },
  });
  if (!block) return null;

  const { blockChannels, seriesBlocks, blockAirings, ...rest } = block;
  return {
    ...rest,
    schedule: toScheduleLines(blockAirings),
    channels: blockChannels
      .map(({ channel }) => channel)
      .sort((a, b) => nameCollator.compare(a.name, b.name)),
    series: groupSeriesRuns(seriesBlocks),
  };
});
