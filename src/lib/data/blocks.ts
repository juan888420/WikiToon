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
  startYear: true,
  endYear: true,
  channel: { select: { slug: true, name: true } },
  // Distinct series: a series can have several SeriesBlock rows (separate periods).
  seriesBlocks: { distinct: ["seriesId"], select: { seriesId: true } },
} satisfies Prisma.BlockSelect;

type BlockSummaryRow = Prisma.BlockGetPayload<{ select: typeof blockSummarySelect }>;

function toSummary({ seriesBlocks, ...block }: BlockSummaryRow) {
  return { ...block, seriesCount: seriesBlocks.length };
}

export type BlockSummary = ReturnType<typeof toSummary>;

export async function listBlocks() {
  const blocks = await prisma.block.findMany({ select: blockSummarySelect });
  return blocks
    .map(toSummary)
    .sort(
      (a, b) =>
        nameCollator.compare(a.name, b.name) || nameCollator.compare(a.channel.name, b.channel.name),
    );
}

export async function listChannelBlocks(channelId: number) {
  const blocks = await prisma.block.findMany({
    where: { channelId },
    orderBy: [{ startYear: "asc" }, { name: "asc" }],
    select: blockSummarySelect,
  });
  return blocks.map(toSummary);
}

/** Block slugs are only unique per channel, so block URLs carry both slugs. */
export function blockHref(block: { slug: string; channel: { slug: string } }) {
  return `/bloques/${block.channel.slug}/${block.slug}`;
}

export async function listBlockParams() {
  const blocks = await prisma.block.findMany({
    select: { slug: true, channel: { select: { slug: true } } },
  });
  return blocks.map((block) => ({ canal: block.channel.slug, slug: block.slug }));
}

/** Cached per request so `generateMetadata` and the page share one query. */
export const getBlock = cache(async (channelSlug: string, blockSlug: string) => {
  // (channelId, slug) is unique and channel slugs are unique, so this matches at most one block.
  const block = await prisma.block.findFirst({
    where: { slug: blockSlug, channel: { slug: channelSlug } },
    select: {
      name: true,
      description: true,
      startYear: true,
      endYear: true,
      sourceName: true,
      sourceUrl: true,
      channel: { select: { slug: true, name: true, logoPath: true } },
      seriesBlocks: {
        orderBy: [{ startYear: "asc" }, { id: "asc" }],
        select: { startYear: true, endYear: true, series: { select: seriesCardSelect } },
      },
    },
  });
  if (!block) return null;

  const { seriesBlocks, ...rest } = block;
  return { ...rest, series: groupSeriesRuns(seriesBlocks) };
});
