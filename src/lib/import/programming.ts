import type { Certainty } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

/** ISO weekday of the broadcast day: 1 = Monday ... 7 = Sunday. */
export type Weekday = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type FeedData = {
  channelSlug: string;
  /** Unique per channel. */
  slug: string;
  name: string;
  region?: string;
  /** IANA time zone the feed's schedules are usually published in. */
  referenceTimeZone?: string;
  sourceName?: string;
  sourceUrl?: string;
  notes?: string;
};

/** What a listed title refers to. `notASeries` records why a title is deliberately left unlinked. */
export type TitleTarget = { tmdbId: number } | { blockSlug: string } | { notASeries: string };

export type TitleAlias = {
  /** Title as listed by a source; matched case-, accent- and punctuation-insensitively. */
  title: string;
  /** Limits the alias to these channels; omit for every channel. */
  channelSlugs?: string[];
} & TitleTarget;

export type BlockAlias = {
  /** Block label as listed by a source. */
  label: string;
  blockSlug: string;
  channelSlugs?: string[];
};

export type GridSlotData = {
  days: Weekday[];
  start: string;
  end: string | null;
  /** Null only when the source marks the slot unidentified. */
  title: string | null;
  /** Block label as listed by the source. */
  block?: string | null;
  certainty: Certainty;
  /** Required for UNCERTAIN slots: the reason, so the doubt keeps its provenance. */
  notes?: string;
  /** Explicit link for a title the aliases can't resolve unambiguously. */
  seriesTmdbId?: number;
};

export type GridData = {
  slug: string;
  channelSlug: string;
  feedSlug: string | null;
  validFrom: string;
  validTo: string;
  timeZone: string | null;
  broadcastDayStart: string;
  sourceName: string;
  sourceUrl: string | null;
  notes?: string;
  /** Grids of the same period whose sources disagree with this one. Both sides must list it. */
  conflictsWith?: string[];
  slots: GridSlotData[];
};

export type DaySlotData = {
  start: string;
  end: string | null;
  title: string | null;
  certainty: Certainty;
  notes?: string;
  seriesTmdbId?: number;
};

/** One concrete day from one source; (channel, airDate, sourceUrl) identifies it on reload. */
export type ScheduleDayData = {
  channelSlug: string;
  feedSlug: string | null;
  airDate: string;
  timeZone: string | null;
  sourceName: string;
  sourceUrl: string;
  notes?: string;
  slots: DaySlotData[];
};

export type ProgrammingData = {
  feeds: FeedData[];
  titleAliases: TitleAlias[];
  blockAliases: BlockAlias[];
  grids: GridData[];
  days: ScheduleDayData[];
};

/** Where an unresolved title or block label was found. */
export type Occurrence = { channelSlug: string; source: string; weekday?: Weekday; start: string };

export type ProgrammingAnalysis = {
  unresolvedTitles: Map<string, { title: string; occurrences: Occurrence[] }>;
  unmappedBlocks: Map<string, { label: string; occurrences: Occurrence[] }>;
  /** Catalog series scheduled on a channel they have no SeriesChannel row for. */
  missingSeriesChannels: Map<string, { seriesTitle: string; tmdbId: number; channelSlug: string; sources: Set<string> }>;
  conflicts: { grid: string; conflictsWith: string[]; notes: string | null }[];
};

/** Case-, accent- and punctuation-insensitive key for matching listed titles. */
export function normalizeTitle(title: string) {
  return title
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const MONTH_OR_DAY = /^\d{4}-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?$/;
const DAY = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

function isTimeZone(value: string) {
  try {
    new Intl.DateTimeFormat("en", { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

const inScope = (channelSlugs: string[] | undefined, channelSlug: string) =>
  !channelSlugs || channelSlugs.includes(channelSlug);

type Resolved = {
  seriesId: number | null;
  blockId: number | null;
};

async function readCatalog(data: ProgrammingData) {
  const tmdbIds = [
    ...data.titleAliases.flatMap((alias) => ("tmdbId" in alias ? [alias.tmdbId] : [])),
    ...data.grids.flatMap((grid) => grid.slots.flatMap((slot) => slot.seriesTmdbId ?? [])),
    ...data.days.flatMap((day) => day.slots.flatMap((slot) => slot.seriesTmdbId ?? [])),
  ];
  const [channels, series, blocks, blockChannels, seriesChannels] = await Promise.all([
    prisma.channel.findMany({ select: { id: true, slug: true } }),
    prisma.series.findMany({ where: { tmdbId: { in: tmdbIds } }, select: { id: true, tmdbId: true, title: true } }),
    prisma.block.findMany({ select: { id: true, slug: true } }),
    prisma.blockChannel.findMany({ select: { blockId: true, channelId: true } }),
    prisma.seriesChannel.findMany({ distinct: ["seriesId", "channelId"], select: { seriesId: true, channelId: true } }),
  ]);
  return {
    channelIdBySlug: new Map(channels.map((c) => [c.slug, c.id])),
    seriesByTmdbId: new Map(series.map((s) => [s.tmdbId!, s])),
    blockIdBySlug: new Map(blocks.map((b) => [b.slug, b.id])),
    blockOnChannel: new Set(blockChannels.map((link) => `${link.blockId}:${link.channelId}`)),
    seriesOnChannel: new Set(seriesChannels.map((link) => `${link.seriesId}:${link.channelId}`)),
  };
}

/**
 * Validates the programming data against the catalog and resolves every listed title and block
 * label through the curated aliases, without writing anything. Throws listing every problem.
 * Nothing is matched by similarity and nothing is created: unresolved titles and labels are
 * returned for review.
 */
export async function analyzeProgramming(data: ProgrammingData) {
  const catalog = await readCatalog(data);
  const problems: string[] = [];
  const analysis: ProgrammingAnalysis = {
    unresolvedTitles: new Map(),
    unmappedBlocks: new Map(),
    missingSeriesChannels: new Map(),
    conflicts: [],
  };

  const checkChannel = (slug: string, where: string) => {
    if (!catalog.channelIdBySlug.has(slug)) problems.push(`${where}: channel "${slug}" not found. Run \`npm run db:seed\` first.`);
  };
  const checkTimeZone = (tz: string | null | undefined, where: string) => {
    if (tz && !isTimeZone(tz)) problems.push(`${where}: invalid IANA time zone "${tz}".`);
  };

  // Feeds.
  const feedKeys = new Set<string>();
  for (const feed of data.feeds) {
    const where = `Feed ${feed.channelSlug}/${feed.slug}`;
    checkChannel(feed.channelSlug, where);
    checkTimeZone(feed.referenceTimeZone, where);
    const key = `${feed.channelSlug}/${feed.slug}`;
    if (feedKeys.has(key)) problems.push(`${where} is listed more than once.`);
    feedKeys.add(key);
  }
  const checkFeed = (channelSlug: string, feedSlug: string | null, where: string) => {
    if (feedSlug !== null && !feedKeys.has(`${channelSlug}/${feedSlug}`)) {
      problems.push(`${where}: feed "${feedSlug}" is not a feed of channel "${channelSlug}".`);
    }
  };

  // Aliases.
  const titleAliases = data.titleAliases.map((alias) => ({ ...alias, key: normalizeTitle(alias.title) }));
  for (const [i, alias] of titleAliases.entries()) {
    const where = `Title alias "${alias.title}"`;
    if (!alias.key) problems.push(`${where}: empty title.`);
    for (const slug of alias.channelSlugs ?? []) checkChannel(slug, where);
    if ("tmdbId" in alias && !catalog.seriesByTmdbId.has(alias.tmdbId)) {
      problems.push(`${where}: no series with TMDB id ${alias.tmdbId}. Aliases never create series.`);
    }
    if ("blockSlug" in alias && !catalog.blockIdBySlug.has(alias.blockSlug)) {
      problems.push(`${where}: no block "${alias.blockSlug}". Aliases never create blocks.`);
    }
    for (const other of titleAliases.slice(i + 1)) {
      const overlap = !alias.channelSlugs || !other.channelSlugs || alias.channelSlugs.some((c) => other.channelSlugs!.includes(c));
      if (other.key === alias.key && overlap) problems.push(`${where} overlaps "${other.title}" on the same channels.`);
    }
  }
  const blockAliases = data.blockAliases.map((alias) => ({ ...alias, key: normalizeTitle(alias.label) }));
  for (const [i, alias] of blockAliases.entries()) {
    const where = `Block alias "${alias.label}"`;
    for (const slug of alias.channelSlugs ?? []) checkChannel(slug, where);
    if (!catalog.blockIdBySlug.has(alias.blockSlug)) problems.push(`${where}: no block "${alias.blockSlug}". Aliases never create blocks.`);
    for (const other of blockAliases.slice(i + 1)) {
      const overlap = !alias.channelSlugs || !other.channelSlugs || alias.channelSlugs.some((c) => other.channelSlugs!.includes(c));
      if (other.key === alias.key && overlap) problems.push(`${where} overlaps "${other.label}" on the same channels.`);
    }
  }

  const blockOnChannel = (blockSlug: string, channelSlug: string, where: string) => {
    const blockId = catalog.blockIdBySlug.get(blockSlug);
    const channelId = catalog.channelIdBySlug.get(channelSlug);
    if (blockId === undefined || channelId === undefined) return null;
    if (!catalog.blockOnChannel.has(`${blockId}:${channelId}`)) {
      problems.push(`${where}: block "${blockSlug}" doesn't run on "${channelSlug}" (no BlockChannel).`);
      return null;
    }
    return blockId;
  };

  const resolve = (
    title: string | null,
    label: string | null | undefined,
    seriesTmdbId: number | undefined,
    channelSlug: string,
    occurrence: Occurrence,
    where: string,
  ): Resolved => {
    let seriesId: number | null = null;
    let blockId: number | null = null;

    if (seriesTmdbId !== undefined) {
      const series = catalog.seriesByTmdbId.get(seriesTmdbId);
      if (!series) problems.push(`${where}: no series with TMDB id ${seriesTmdbId}.`);
      else seriesId = series.id;
    } else if (title) {
      const key = normalizeTitle(title);
      const alias = titleAliases.find((a) => a.key === key && inScope(a.channelSlugs, channelSlug));
      if (!alias) {
        const entry = analysis.unresolvedTitles.get(key) ?? { title, occurrences: [] };
        entry.occurrences.push(occurrence);
        analysis.unresolvedTitles.set(key, entry);
      } else if ("tmdbId" in alias) {
        seriesId = catalog.seriesByTmdbId.get(alias.tmdbId)?.id ?? null;
      } else if ("blockSlug" in alias) {
        blockId = blockOnChannel(alias.blockSlug, channelSlug, where);
      }
    }

    if (label) {
      const key = normalizeTitle(label);
      const alias = blockAliases.find((a) => a.key === key && inScope(a.channelSlugs, channelSlug));
      if (!alias) {
        const entry = analysis.unmappedBlocks.get(key) ?? { label, occurrences: [] };
        entry.occurrences.push(occurrence);
        analysis.unmappedBlocks.set(key, entry);
      } else {
        const labelBlockId = blockOnChannel(alias.blockSlug, channelSlug, where);
        if (blockId !== null && labelBlockId !== null && blockId !== labelBlockId) {
          problems.push(`${where}: the title and the block label point to different blocks.`);
        }
        blockId = blockId ?? labelBlockId;
      }
    }

    if (seriesId !== null) {
      const channelId = catalog.channelIdBySlug.get(channelSlug)!;
      if (!catalog.seriesOnChannel.has(`${seriesId}:${channelId}`)) {
        const series = [...catalog.seriesByTmdbId.values()].find((s) => s.id === seriesId)!;
        const key = `${seriesId}:${channelSlug}`;
        const entry = analysis.missingSeriesChannels.get(key) ?? {
          seriesTitle: series.title,
          tmdbId: series.tmdbId!,
          channelSlug,
          sources: new Set<string>(),
        };
        entry.sources.add(occurrence.source);
        analysis.missingSeriesChannels.set(key, entry);
      }
    }
    return { seriesId, blockId };
  };

  const checkSlot = (slot: { start: string; end: string | null; title: string | null; certainty: Certainty; notes?: string }, where: string) => {
    if (!TIME.test(slot.start)) problems.push(`${where}: invalid start time "${slot.start}".`);
    if (slot.end !== null && !TIME.test(slot.end)) problems.push(`${where}: invalid end time "${slot.end}".`);
    if (slot.title !== null && !slot.title.trim()) problems.push(`${where}: empty title; use null for unidentified slots.`);
    if (slot.title === null && slot.certainty !== "UNCERTAIN") problems.push(`${where}: an unidentified slot must be UNCERTAIN.`);
    if (slot.certainty === "UNCERTAIN" && !slot.notes?.trim()) problems.push(`${where}: UNCERTAIN slots need notes explaining why.`);
  };

  // Grids.
  const gridSlugs = new Set(data.grids.map((grid) => grid.slug));
  const seenGrids = new Set<string>();
  const resolvedGrids = data.grids.map((grid) => {
    const where = `Grid ${grid.slug}`;
    if (seenGrids.has(grid.slug)) problems.push(`${where} is listed more than once.`);
    seenGrids.add(grid.slug);
    checkChannel(grid.channelSlug, where);
    checkFeed(grid.channelSlug, grid.feedSlug, where);
    checkTimeZone(grid.timeZone, where);
    if (!MONTH_OR_DAY.test(grid.validFrom) || !MONTH_OR_DAY.test(grid.validTo)) problems.push(`${where}: validFrom/validTo must be YYYY-MM or YYYY-MM-DD.`);
    else if (grid.validFrom > grid.validTo) problems.push(`${where}: validFrom is after validTo.`);
    if (!TIME.test(grid.broadcastDayStart)) problems.push(`${where}: invalid broadcastDayStart.`);
    if (!grid.sourceName.trim()) problems.push(`${where}: sourceName is required.`);
    for (const other of grid.conflictsWith ?? []) {
      const counterpart = data.grids.find((g) => g.slug === other);
      if (!gridSlugs.has(other)) problems.push(`${where}: conflictsWith "${other}" is not a grid in the data.`);
      else if (!counterpart?.conflictsWith?.includes(grid.slug)) problems.push(`${where}: conflict with "${other}" must be listed on both grids.`);
    }
    if (grid.conflictsWith?.length) analysis.conflicts.push({ grid: grid.slug, conflictsWith: grid.conflictsWith, notes: grid.notes ?? null });

    const taken = new Set<string>();
    const rows = grid.slots.flatMap((slot, index) => {
      const slotWhere = `${where}, slot ${index + 1} (${slot.start} ${slot.title ?? "unidentified"})`;
      checkSlot(slot, slotWhere);
      if (slot.days.length === 0) problems.push(`${slotWhere}: no days.`);
      if (new Set(slot.days).size !== slot.days.length) problems.push(`${slotWhere}: repeated day.`);
      return slot.days.map((weekday) => {
        if (!Number.isInteger(weekday) || weekday < 1 || weekday > 7) problems.push(`${slotWhere}: weekday must be 1-7.`);
        const key = `${weekday} ${slot.start}`;
        if (taken.has(key)) problems.push(`${where}: two slots on weekday ${weekday} at ${slot.start}.`);
        taken.add(key);
        const occurrence = { channelSlug: grid.channelSlug, source: grid.slug, weekday, start: slot.start };
        return { weekday, slot, ...resolve(slot.title, slot.block, slot.seriesTmdbId, grid.channelSlug, occurrence, slotWhere) };
      });
    });
    return { grid, rows };
  });

  // Concrete days.
  const dayKeys = new Set<string>();
  const resolvedDays = data.days.map((day) => {
    const where = `Day ${day.channelSlug} ${day.airDate} (${day.sourceUrl})`;
    checkChannel(day.channelSlug, where);
    checkFeed(day.channelSlug, day.feedSlug, where);
    checkTimeZone(day.timeZone, where);
    if (!DAY.test(day.airDate)) problems.push(`${where}: airDate must be YYYY-MM-DD.`);
    if (!day.sourceUrl.trim() || !day.sourceName.trim()) problems.push(`${where}: sourceName and sourceUrl are required.`);
    const key = `${day.channelSlug} ${day.airDate} ${day.sourceUrl}`;
    if (dayKeys.has(key)) problems.push(`${where} is listed more than once.`);
    dayKeys.add(key);
    const starts = new Set<string>();
    const rows = day.slots.map((slot, index) => {
      const slotWhere = `${where}, slot ${index + 1} (${slot.start})`;
      checkSlot(slot, slotWhere);
      if (starts.has(slot.start)) problems.push(`${where}: two slots at ${slot.start}.`);
      starts.add(slot.start);
      const occurrence = { channelSlug: day.channelSlug, source: `${day.channelSlug} ${day.airDate}`, start: slot.start };
      return { slot, ...resolve(slot.title, null, slot.seriesTmdbId, day.channelSlug, occurrence, slotWhere) };
    });
    return { day, rows };
  });

  if (problems.length > 0) {
    throw new Error(`Invalid programming data, nothing was written:\n  ${[...new Set(problems)].join("\n  ")}`);
  }
  return { catalog, analysis, resolvedGrids, resolvedDays };
}

export type LoadedProgramming = {
  feeds: number;
  grids: { slug: string; created: boolean; slots: number; replacedSlots: number }[];
  days: { channelSlug: string; airDate: string; rows: number; replacedRows: number }[];
  analysis: ProgrammingAnalysis;
};

/**
 * Loads feeds, recurring grids and concrete days. Everything is validated first (see
 * `analyzeProgramming`) and written in one transaction. The data owns each grid's slots and each
 * (channel, date, source) day's rows, so a reload replaces exactly those and is idempotent. Grids
 * and days missing from the data, and every other Schedule row, are never touched.
 */
export async function loadProgramming(data: ProgrammingData): Promise<LoadedProgramming> {
  const { catalog, analysis, resolvedGrids, resolvedDays } = await analyzeProgramming(data);

  return prisma.$transaction(
    async (tx) => {
      const feedIds = new Map<string, number>();
      for (const feed of data.feeds) {
        const channelId = catalog.channelIdBySlug.get(feed.channelSlug)!;
        const fields = {
          name: feed.name,
          region: feed.region ?? null,
          referenceTimeZone: feed.referenceTimeZone ?? null,
          sourceName: feed.sourceName ?? null,
          sourceUrl: feed.sourceUrl ?? null,
          notes: feed.notes ?? null,
        };
        const saved = await tx.feed.upsert({
          where: { channelId_slug: { channelId, slug: feed.slug } },
          update: fields,
          create: { ...fields, channelId, slug: feed.slug },
          select: { id: true },
        });
        feedIds.set(`${feed.channelSlug}/${feed.slug}`, saved.id);
      }
      const feedId = (channelSlug: string, feedSlug: string | null) =>
        feedSlug === null ? null : feedIds.get(`${channelSlug}/${feedSlug}`)!;

      const grids: LoadedProgramming["grids"] = [];
      for (const { grid, rows } of resolvedGrids) {
        const fields = {
          channelId: catalog.channelIdBySlug.get(grid.channelSlug)!,
          feedId: feedId(grid.channelSlug, grid.feedSlug),
          validFrom: grid.validFrom,
          validTo: grid.validTo,
          timeZone: grid.timeZone,
          broadcastDayStart: grid.broadcastDayStart,
          sourceName: grid.sourceName,
          sourceUrl: grid.sourceUrl,
          notes: grid.notes ?? null,
        };
        const existing = await tx.scheduleGrid.findUnique({ where: { slug: grid.slug }, select: { id: true } });
        const saved = existing
          ? await tx.scheduleGrid.update({ where: { id: existing.id }, data: fields, select: { id: true } })
          : await tx.scheduleGrid.create({ data: { ...fields, slug: grid.slug }, select: { id: true } });
        // The data file owns this grid's slots: replace them, and only them.
        const { count: replacedSlots } = await tx.scheduleGridSlot.deleteMany({ where: { gridId: saved.id } });
        await tx.scheduleGridSlot.createMany({
          data: rows.map(({ weekday, slot, seriesId, blockId }) => ({
            gridId: saved.id,
            weekday,
            startTime: slot.start,
            endTime: slot.end,
            listedTitle: slot.title,
            listedBlock: slot.block ?? null,
            seriesId,
            blockId,
            certainty: slot.certainty,
            notes: slot.notes ?? null,
          })),
        });
        grids.push({ slug: grid.slug, created: !existing, slots: rows.length, replacedSlots });
      }

      const days: LoadedProgramming["days"] = [];
      for (const { day, rows } of resolvedDays) {
        const channelId = catalog.channelIdBySlug.get(day.channelSlug)!;
        // Replace only the rows of this (channel, date, source); other sources' rows stay.
        const { count: replacedRows } = await tx.schedule.deleteMany({
          where: { channelId, airDate: day.airDate, sourceUrl: day.sourceUrl },
        });
        await tx.schedule.createMany({
          data: rows.map(({ slot, seriesId, blockId }) => ({
            channelId,
            feedId: feedId(day.channelSlug, day.feedSlug),
            timeZone: day.timeZone,
            airDate: day.airDate,
            startTime: slot.start,
            endTime: slot.end,
            listedTitle: slot.title,
            seriesId,
            blockId,
            certainty: slot.certainty,
            sourceName: day.sourceName,
            sourceUrl: day.sourceUrl,
            notes: [day.notes, slot.notes].filter(Boolean).join(" ") || null,
          })),
        });
        days.push({ channelSlug: day.channelSlug, airDate: day.airDate, rows: rows.length, replacedRows });
      }

      return { feeds: data.feeds.length, grids, days, analysis };
    },
    { timeout: 120_000 },
  );
}
