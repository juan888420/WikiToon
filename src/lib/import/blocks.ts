import { prisma } from "@/lib/prisma";

export type BlockData = {
  channelSlug: string;
  slug: string;
  name: string;
  description?: string;
  /** Local asset under `public/logos/blocks/` (e.g. "/logos/blocks/toonami.svg"); never a URL. */
  logoPath?: string;
  /** Series in the block, by TMDB id (stable across DB resets, unlike autoincrement ids). */
  seriesTmdbIds: number[];
};

export type LoadedBlock = {
  channelSlug: string;
  slug: string;
  blockId: number;
  blockCreated: boolean;
  linksCreated: number;
  linksExisting: number;
};

/**
 * Loads curated blocks and their series. Everything is validated before the first write and runs
 * in one transaction, so invalid data writes nothing. Additive only: blocks and SeriesBlock rows
 * missing from `blocks` are never deleted. The data owns a block's `name`, `description` and
 * `logoPath` (omitted means null); years, sources and notes are never touched, and new SeriesBlock
 * rows get null years/source.
 * Every series must already be linked to the block's channel (SeriesChannel), since a block
 * appearance implies the series aired on that channel.
 */
export async function loadBlocks(blocks: BlockData[]): Promise<LoadedBlock[]> {
  return prisma.$transaction(async (tx) => {
    const problems: string[] = [];

    const blockKeys = new Set<string>();
    for (const block of blocks) {
      const key = `${block.channelSlug}/${block.slug}`;
      if (blockKeys.has(key)) problems.push(`Block ${key} is listed more than once.`);
      blockKeys.add(key);
      if (new Set(block.seriesTmdbIds).size !== block.seriesTmdbIds.length) {
        problems.push(`Block ${key} lists a series more than once.`);
      }
      if (block.logoPath !== undefined && !block.logoPath.startsWith("/logos/blocks/")) {
        problems.push(`Block ${key}: logoPath must be a local path under /logos/blocks/.`);
      }
    }

    const channels = await tx.channel.findMany({
      where: { slug: { in: blocks.map((block) => block.channelSlug) } },
      select: { id: true, slug: true },
    });
    const channelIdBySlug = new Map(channels.map((channel) => [channel.slug, channel.id]));

    const series = await tx.series.findMany({
      where: { tmdbId: { in: blocks.flatMap((block) => block.seriesTmdbIds) } },
      select: { id: true, tmdbId: true, title: true },
    });
    const seriesByTmdbId = new Map(series.map((row) => [row.tmdbId, row]));

    const seriesChannels = await tx.seriesChannel.findMany({
      where: { seriesId: { in: series.map((row) => row.id) } },
      select: { seriesId: true, channelId: true },
    });
    const linkedPairs = new Set(seriesChannels.map((link) => `${link.seriesId}:${link.channelId}`));

    for (const block of blocks) {
      const key = `${block.channelSlug}/${block.slug}`;
      const channelId = channelIdBySlug.get(block.channelSlug);
      if (channelId === undefined) {
        problems.push(`Block ${key}: channel "${block.channelSlug}" not found.`);
        continue;
      }
      for (const tmdbId of block.seriesTmdbIds) {
        const row = seriesByTmdbId.get(tmdbId);
        if (!row) {
          problems.push(`Block ${key}: no series with TMDB id ${tmdbId}. Import it first.`);
        } else if (!linkedPairs.has(`${row.id}:${channelId}`)) {
          problems.push(
            `Block ${key}: "${row.title}" (TMDB ${tmdbId}) has no SeriesChannel for "${block.channelSlug}".`,
          );
        }
      }
    }

    if (problems.length > 0) {
      throw new Error(`Invalid block data, nothing was written:\n  ${problems.join("\n  ")}`);
    }

    const loaded: LoadedBlock[] = [];
    for (const block of blocks) {
      const channelId = channelIdBySlug.get(block.channelSlug)!;
      const blockData = {
        name: block.name,
        description: block.description ?? null,
        logoPath: block.logoPath ?? null,
      };
      const existing = await tx.block.findUnique({
        where: { channelId_slug: { channelId, slug: block.slug } },
        select: { id: true },
      });
      const saved = existing
        ? await tx.block.update({ where: { id: existing.id }, data: blockData })
        : await tx.block.create({ data: { ...blockData, channelId, slug: block.slug } });

      let linksCreated = 0;
      for (const tmdbId of block.seriesTmdbIds) {
        const seriesId = seriesByTmdbId.get(tmdbId)!.id;
        // SeriesBlock allows several runs per pair, so existing rows (any run) are left as they are.
        const link = await tx.seriesBlock.findFirst({
          where: { seriesId, blockId: saved.id },
          select: { id: true },
        });
        if (!link) {
          await tx.seriesBlock.create({ data: { seriesId, blockId: saved.id } });
          linksCreated++;
        }
      }

      loaded.push({
        channelSlug: block.channelSlug,
        slug: block.slug,
        blockId: saved.id,
        blockCreated: !existing,
        linksCreated,
        linksExisting: block.seriesTmdbIds.length - linksCreated,
      });
    }
    return loaded;
  });
}
