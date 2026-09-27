import { prisma } from "@/lib/prisma";

export type BlockData = {
  /** Globally unique: a block can run on several channels, so the slug can't be per-channel. */
  slug: string;
  name: string;
  /** Channels the block ran on, by slug. At least one; several for blocks shared across a rebrand. */
  channelSlugs: string[];
  description?: string;
  /** Local asset under `public/logos/blocks/` (e.g. "/logos/blocks/toonami.svg"); never a URL. */
  logoPath?: string;
  /** Series in the block, by TMDB id (stable across DB resets, unlike autoincrement ids). */
  seriesTmdbIds: number[];
  /** Documented time slots, in display order (the first ones go on the block card). */
  airings?: BlockAiringData[];
};

/**
 * A sourced slot sets `period`, `sourceName` and `sourceUrl`; a slot the project owner decided
 * leaves all three out and says so in `notes`.
 */
export type BlockAiringData = {
  /** One of the block's `channelSlugs`; omitted means every channel of the block. */
  channelSlug?: string;
  /** ISO weekdays of the broadcast day (1 = Monday), ascending, no repeats. */
  weekdays: number[];
  /** "HH:MM" (24h) in `timeZone`. */
  startTime: string;
  /** "HH:MM", or null when the source doesn't say when the block ends. */
  endTime: string | null;
  /** "YYYY-MM": the month the source documents. */
  period?: string;
  /** IANA zone the source publishes in; omitted when not documented. */
  timeZone?: string;
  sourceName?: string;
  sourceUrl?: string;
  notes?: string;
};

export type LoadedBlock = {
  slug: string;
  blockId: number;
  blockCreated: boolean;
  channelsCreated: number;
  channelsExisting: number;
  linksCreated: number;
  linksExisting: number;
  /** Whether the block's airings differed from the data and were rewritten. */
  airingsReplaced: boolean;
  airingsCount: number;
};

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const PERIOD = /^\d{4}-(0[1-9]|1[0-2])$/;

type AiringRow = {
  channelId: number | null;
  position: number;
  weekdays: string;
  startTime: string;
  endTime: string | null;
  period: string | null;
  timeZone: string | null;
  sourceName: string | null;
  sourceUrl: string | null;
  notes: string | null;
};

function airingKey(row: AiringRow) {
  return JSON.stringify([
    row.channelId,
    row.position,
    row.weekdays,
    row.startTime,
    row.endTime,
    row.period,
    row.timeZone,
    row.sourceName,
    row.sourceUrl,
    row.notes,
  ]);
}

function airingProblems(block: BlockData, airing: BlockAiringData, index: number) {
  const label = `Block ${block.slug}, airing ${index + 1}`;
  const problems: string[] = [];
  if (airing.channelSlug !== undefined && !block.channelSlugs.includes(airing.channelSlug)) {
    problems.push(`${label}: channel "${airing.channelSlug}" is not one of the block's channels.`);
  }
  const { weekdays } = airing;
  const validWeekdays =
    weekdays.length > 0 &&
    weekdays.every(
      (day, i) => Number.isInteger(day) && day >= 1 && day <= 7 && (i === 0 || day > weekdays[i - 1]!),
    );
  if (!validWeekdays) {
    problems.push(`${label}: weekdays must be ascending ISO weekdays (1-7) without repeats.`);
  }
  if (!TIME.test(airing.startTime) || (airing.endTime !== null && !TIME.test(airing.endTime))) {
    problems.push(`${label}: times must be "HH:MM" (24h).`);
  }
  const { period, sourceName, sourceUrl } = airing;
  if (period === undefined && sourceName === undefined && sourceUrl === undefined) {
    // The project owner's slot: no source to cite, so the notes must say where it comes from.
    if (!airing.notes?.trim()) {
      problems.push(`${label}: a slot without a source must explain it in notes.`);
    }
  } else {
    if (period === undefined || !PERIOD.test(period)) {
      problems.push(`${label}: period must be "YYYY-MM".`);
    }
    if (!sourceName?.trim() || sourceUrl === undefined || !/^https?:\/\//.test(sourceUrl)) {
      problems.push(`${label}: a source name and an http(s) source URL are required.`);
    }
  }
  return problems;
}

/**
 * Loads curated blocks, their channels and their series. Everything is validated before the first
 * write and runs in one transaction, so invalid data writes nothing. Additive only: blocks,
 * BlockChannel and SeriesBlock rows missing from `blocks` are never deleted. The data owns a
 * block's `name`, `description`, `logoPath` and airings (omitted means null or none; a reload
 * rewrites a block's airings only when they differ); years, sources and notes are never touched,
 * and new SeriesBlock rows get null years/source.
 * Every series must already be linked (SeriesChannel) to at least one of the block's channels,
 * since a block appearance implies the series aired on the channel that ran the block. It is not
 * required on all of them: a block shared by Fox Kids and Jetix may have aired a series on only one.
 */
export async function loadBlocks(blocks: BlockData[]): Promise<LoadedBlock[]> {
  return prisma.$transaction(async (tx) => {
    const problems: string[] = [];

    const blockSlugs = new Set<string>();
    for (const block of blocks) {
      if (blockSlugs.has(block.slug)) problems.push(`Block ${block.slug} is listed more than once.`);
      blockSlugs.add(block.slug);
      if (block.channelSlugs.length === 0) {
        problems.push(`Block ${block.slug}: at least one channel is required.`);
      }
      if (new Set(block.channelSlugs).size !== block.channelSlugs.length) {
        problems.push(`Block ${block.slug} lists a channel more than once.`);
      }
      if (new Set(block.seriesTmdbIds).size !== block.seriesTmdbIds.length) {
        problems.push(`Block ${block.slug} lists a series more than once.`);
      }
      if (block.logoPath !== undefined && !block.logoPath.startsWith("/logos/blocks/")) {
        problems.push(`Block ${block.slug}: logoPath must be a local path under /logos/blocks/.`);
      }
      (block.airings ?? []).forEach((airing, index) => {
        problems.push(...airingProblems(block, airing, index));
      });
    }

    const channels = await tx.channel.findMany({
      where: { slug: { in: blocks.flatMap((block) => block.channelSlugs) } },
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
      const channelIds: number[] = [];
      for (const channelSlug of block.channelSlugs) {
        const channelId = channelIdBySlug.get(channelSlug);
        if (channelId === undefined) {
          problems.push(`Block ${block.slug}: channel "${channelSlug}" not found.`);
        } else {
          channelIds.push(channelId);
        }
      }
      if (channelIds.length === 0) continue;

      for (const tmdbId of block.seriesTmdbIds) {
        const row = seriesByTmdbId.get(tmdbId);
        if (!row) {
          problems.push(`Block ${block.slug}: no series with TMDB id ${tmdbId}. Import it first.`);
        } else if (!channelIds.some((channelId) => linkedPairs.has(`${row.id}:${channelId}`))) {
          problems.push(
            `Block ${block.slug}: "${row.title}" (TMDB ${tmdbId}) has no SeriesChannel for ` +
              `${block.channelSlugs.join(" or ")}.`,
          );
        }
      }
    }

    if (problems.length > 0) {
      throw new Error(`Invalid block data, nothing was written:\n  ${problems.join("\n  ")}`);
    }

    const loaded: LoadedBlock[] = [];
    for (const block of blocks) {
      const blockData = {
        name: block.name,
        description: block.description ?? null,
        logoPath: block.logoPath ?? null,
      };
      const existing = await tx.block.findUnique({
        where: { slug: block.slug },
        select: { id: true },
      });
      const saved = existing
        ? await tx.block.update({ where: { id: existing.id }, data: blockData })
        : await tx.block.create({ data: { ...blockData, slug: block.slug } });

      let channelsCreated = 0;
      for (const channelSlug of block.channelSlugs) {
        const channelId = channelIdBySlug.get(channelSlug)!;
        const link = await tx.blockChannel.findUnique({
          where: { blockId_channelId: { blockId: saved.id, channelId } },
          select: { blockId: true },
        });
        if (!link) {
          await tx.blockChannel.create({ data: { blockId: saved.id, channelId } });
          channelsCreated++;
        }
      }

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

      const airingRows = (block.airings ?? []).map(
        (airing, position): AiringRow => ({
          channelId:
            airing.channelSlug === undefined ? null : channelIdBySlug.get(airing.channelSlug)!,
          position,
          weekdays: airing.weekdays.join(","),
          startTime: airing.startTime,
          endTime: airing.endTime,
          period: airing.period ?? null,
          timeZone: airing.timeZone ?? null,
          sourceName: airing.sourceName ?? null,
          sourceUrl: airing.sourceUrl ?? null,
          notes: airing.notes ?? null,
        }),
      );
      const existingAirings = await tx.blockAiring.findMany({
        where: { blockId: saved.id },
        orderBy: { position: "asc" },
      });
      // Rewritten only when something changed, so reloading the same data writes nothing.
      const airingsReplaced =
        existingAirings.map(airingKey).join("\n") !== airingRows.map(airingKey).join("\n");
      if (airingsReplaced) {
        await tx.blockAiring.deleteMany({ where: { blockId: saved.id } });
        await tx.blockAiring.createMany({
          data: airingRows.map((row) => ({ ...row, blockId: saved.id })),
        });
      }

      loaded.push({
        slug: block.slug,
        blockId: saved.id,
        blockCreated: !existing,
        channelsCreated,
        channelsExisting: block.channelSlugs.length - channelsCreated,
        linksCreated,
        linksExisting: block.seriesTmdbIds.length - linksCreated,
        airingsReplaced,
        airingsCount: airingRows.length,
      });
    }
    return loaded;
  });
}
