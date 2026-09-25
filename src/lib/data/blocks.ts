import { cache } from "react";
import type { Prisma } from "@/generated/prisma/client";
import { groupSeriesRuns, seriesCardSelect } from "@/lib/data/series";
import { prisma } from "@/lib/prisma";

const nameCollator = new Intl.Collator("es", { sensitivity: "base", numeric: true });

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
} satisfies Prisma.BlockSelect;

type BlockSummaryRow = Prisma.BlockGetPayload<{ select: typeof blockSummarySelect }>;

function toSummary({ blockChannels, seriesBlocks, ...block }: BlockSummaryRow) {
  return {
    ...block,
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
      seriesBlocks: {
        orderBy: [{ startYear: "asc" }, { id: "asc" }],
        select: { startYear: true, endYear: true, series: { select: seriesCardSelect } },
      },
    },
  });
  if (!block) return null;

  const { blockChannels, seriesBlocks, ...rest } = block;
  return {
    ...rest,
    channels: blockChannels
      .map(({ channel }) => channel)
      .sort((a, b) => nameCollator.compare(a.name, b.name)),
    series: groupSeriesRuns(seriesBlocks),
  };
});
