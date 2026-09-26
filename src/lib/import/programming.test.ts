import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, before, beforeEach, describe, it } from "node:test";
import type { GridData, ProgrammingData, ScheduleDayData } from "@/lib/import/programming";

// Runs against a throwaway SQLite DB with the real migrations applied, so it never touches dev.db.
// Env must be set before `@/lib/prisma` is first imported.
const tempDir = mkdtempSync(path.join(tmpdir(), "wikitoon-test-"));
process.env.DATABASE_URL = `file:${path.join(tempDir, "test.db")}`;

const WEEKDAYS = [1, 2, 3, 4, 5] as const;

function grid(overrides: Partial<GridData> = {}): GridData {
  return {
    slug: "cartoon-network-2000-10-sur-wiki",
    channelSlug: "cartoon-network",
    feedSlug: "sur",
    validFrom: "2000-10",
    validTo: "2000-10",
    timeZone: "America/Argentina/Buenos_Aires",
    broadcastDayStart: "06:00",
    sourceName: "Test wiki",
    sourceUrl: "https://example.org/wiki",
    slots: [
      { days: [...WEEKDAYS], start: "06:00", end: "06:30", title: "Series Uno", certainty: "PROBABLE" },
      { days: [1], start: "06:30", end: "07:00", title: "Serie Desconocida", block: "Bloque Histórico", certainty: "PROBABLE" },
      { days: [2], start: "06:30", end: "07:00", title: "Toonami", certainty: "VERIFIED" },
      { days: [3], start: "06:30", end: "07:00", title: null, certainty: "UNCERTAIN", notes: "Sin identificar en la fuente." },
      { days: [4], start: "06:30", end: "07:00", title: "series dos", block: "El Bloque", certainty: "PROBABLE" },
    ],
    ...overrides,
  };
}

function day(overrides: Partial<ScheduleDayData> = {}): ScheduleDayData {
  return {
    channelSlug: "cartoon-network",
    feedSlug: null,
    airDate: "2003-12-11",
    timeZone: "America/Monterrey",
    sourceName: "Test guide",
    sourceUrl: "https://example.org/guide",
    slots: [
      { start: "00:00", end: "00:30", title: "Series Uno", certainty: "VERIFIED" },
      { start: "00:30", end: null, title: "Otra cosa", certainty: "VERIFIED" },
    ],
    ...overrides,
  };
}

function data(overrides: Partial<ProgrammingData> = {}): ProgrammingData {
  return {
    feeds: [{ channelSlug: "cartoon-network", slug: "sur", name: "Señal Sur" }],
    titleAliases: [
      { title: "Series Uno", tmdbId: 1 },
      { title: "Series Dos", tmdbId: 2 },
      { title: "Toonami", blockSlug: "toonami", channelSlugs: ["cartoon-network"] },
    ],
    blockAliases: [{ label: "El Bloque", blockSlug: "toonami" }],
    grids: [grid()],
    days: [day()],
    ...overrides,
  };
}

describe("loadProgramming", () => {
  let prisma: typeof import("@/lib/prisma").prisma;
  let loadProgramming: typeof import("@/lib/import/programming").loadProgramming;
  let channelId: number;

  before(async () => {
    execFileSync(
      process.execPath,
      [path.join("node_modules", "prisma", "build", "index.js"), "migrate", "deploy"],
      { env: process.env, stdio: "pipe" },
    );
    ({ prisma } = await import("@/lib/prisma"));
    ({ loadProgramming } = await import("@/lib/import/programming"));

    ({ id: channelId } = await prisma.channel.create({ data: { slug: "cartoon-network", name: "Cartoon Network" } }));
    await prisma.channel.create({ data: { slug: "boomerang", name: "Boomerang" } });
    const block = await prisma.block.create({ data: { slug: "toonami", name: "Toonami" } });
    await prisma.blockChannel.create({ data: { blockId: block.id, channelId } });
    await prisma.block.create({ data: { slug: "other-block", name: "Other" } });
    const one = await prisma.series.create({ data: { tmdbId: 1, slug: "series-uno", title: "Series Uno" } });
    await prisma.seriesChannel.create({ data: { seriesId: one.id, channelId } });
    // Series 2 exists but is not linked to the channel: the loader must report it, not link it.
    await prisma.series.create({ data: { tmdbId: 2, slug: "series-dos", title: "Series Dos" } });
  });

  beforeEach(async () => {
    await prisma.scheduleGrid.deleteMany();
    await prisma.schedule.deleteMany();
    await prisma.feed.deleteMany();
  });

  after(async () => {
    await prisma?.$disconnect();
    rmSync(tempDir, { recursive: true, force: true });
  });

  async function counts() {
    return {
      feeds: await prisma.feed.count(),
      grids: await prisma.scheduleGrid.count(),
      slots: await prisma.scheduleGridSlot.count(),
      schedules: await prisma.schedule.count(),
      series: await prisma.series.count(),
      blocks: await prisma.block.count(),
      seriesChannels: await prisma.seriesChannel.count(),
    };
  }

  it("expands each slot to one row per weekday and resolves only through aliases", async () => {
    const loaded = await loadProgramming(data());

    assert.deepEqual(await counts(), { feeds: 1, grids: 1, slots: 9, schedules: 2, series: 2, blocks: 2, seriesChannels: 1 });
    const slots = await prisma.scheduleGridSlot.findMany({
      orderBy: [{ weekday: "asc" }, { startTime: "asc" }],
      include: { series: true, block: true },
    });
    const at = (weekday: number, start: string) => slots.find((s) => s.weekday === weekday && s.startTime === start)!;
    assert.equal(at(3, "06:00").series?.tmdbId, 1);
    // Unmapped block label and unresolved title are kept literally, with nothing linked.
    assert.deepEqual([at(1, "06:30").listedTitle, at(1, "06:30").listedBlock, at(1, "06:30").seriesId, at(1, "06:30").blockId], [
      "Serie Desconocida",
      "Bloque Histórico",
      null,
      null,
    ]);
    assert.equal(at(2, "06:30").block?.slug, "toonami");
    assert.deepEqual([at(3, "06:30").listedTitle, at(3, "06:30").certainty, at(3, "06:30").notes], [null, "UNCERTAIN", "Sin identificar en la fuente."]);
    // Case/accent-insensitive alias match, and the block label resolves to its block.
    assert.deepEqual([at(4, "06:30").series?.tmdbId, at(4, "06:30").block?.slug], [2, "toonami"]);

    const gridRow = await prisma.scheduleGrid.findFirstOrThrow({ include: { feed: true } });
    assert.equal(gridRow.feed?.slug, "sur");
    const rows = await prisma.schedule.findMany({ orderBy: { startTime: "asc" } });
    assert.deepEqual(rows.map((r) => [r.certainty, r.timeZone, r.feed, r.feedId, r.seriesId !== null]), [
      ["VERIFIED", "America/Monterrey", null, null, true],
      ["VERIFIED", "America/Monterrey", null, null, false],
    ]);

    assert.deepEqual([...loaded.analysis.unresolvedTitles.values()].map((t) => t.title).sort(), ["Otra cosa", "Serie Desconocida"]);
    assert.deepEqual([...loaded.analysis.unmappedBlocks.values()].map((b) => b.label), ["Bloque Histórico"]);
    assert.deepEqual([...loaded.analysis.missingSeriesChannels.values()].map((m) => [m.tmdbId, m.channelSlug]), [[2, "cartoon-network"]]);
  });

  it("is idempotent and replaces only the slots of the grids in the data", async () => {
    const other = grid({ slug: "cartoon-network-2002-11-wiki", feedSlug: null, validFrom: "2002-11", validTo: "2002-11" });
    await loadProgramming(data({ grids: [grid(), other] }));
    const before = await counts();
    const loaded = await loadProgramming(data({ grids: [grid(), other] }));
    assert.deepEqual(await counts(), before);
    assert.ok(loaded.grids.every((g) => !g.created && g.replacedSlots === g.slots));

    // Correct one slot in one grid, and leave the other grid out of the data entirely.
    const corrected = grid();
    corrected.slots[0] = { ...corrected.slots[0], title: "Series Dos" };
    await loadProgramming(data({ grids: [corrected], days: [] }));
    const firstGrid = await prisma.scheduleGrid.findUniqueOrThrow({ where: { slug: corrected.slug }, include: { slots: true } });
    assert.ok(firstGrid.slots.filter((s) => s.startTime === "06:00").every((s) => s.listedTitle === "Series Dos"));
    const untouched = await prisma.scheduleGrid.findUniqueOrThrow({ where: { slug: other.slug }, include: { slots: true } });
    assert.equal(untouched.slots.length, 9);
    assert.equal(await prisma.schedule.count(), 2, "days missing from the data are never deleted");
  });

  it("replaces only the Schedule rows of the same channel, date and source", async () => {
    // A pre-existing row from another source on the same channel and date must survive.
    await prisma.schedule.create({
      data: { channelId, airDate: "2003-12-11", startTime: "00:00", listedTitle: "Manual", sourceUrl: "https://example.org/other" },
    });
    await loadProgramming(data());
    await loadProgramming(data());
    const rows = await prisma.schedule.findMany({ orderBy: [{ sourceUrl: "asc" }, { startTime: "asc" }] });
    assert.deepEqual(rows.map((r) => [r.sourceUrl, r.listedTitle]), [
      ["https://example.org/guide", "Series Uno"],
      ["https://example.org/guide", "Otra cosa"],
      ["https://example.org/other", "Manual"],
    ]);
    assert.equal(rows[2].certainty, "UNCERTAIN", "rows without explicit certainty keep the safe default");
  });

  it("rejects invalid data and writes nothing", async () => {
    const cases: [string, ProgrammingData, RegExp][] = [
      ["feed of another channel", data({ grids: [grid({ channelSlug: "boomerang" })], days: [] }), /not a feed of channel "boomerang"/],
      [
        "duplicate weekday and start",
        data({ grids: [grid({ slots: [...grid().slots, { days: [1], start: "06:00", end: null, title: "X", certainty: "PROBABLE" }] })] }),
        /two slots on weekday 1 at 06:00/,
      ],
      [
        "uncertain without notes",
        data({ grids: [grid({ slots: [{ days: [1], start: "06:00", end: null, title: "X", certainty: "UNCERTAIN" }] })] }),
        /UNCERTAIN slots need notes/,
      ],
      [
        "unidentified but not uncertain",
        data({ grids: [grid({ slots: [{ days: [1], start: "06:00", end: null, title: null, certainty: "PROBABLE", notes: "x" }] })] }),
        /must be UNCERTAIN/,
      ],
      ["alias to a missing series", data({ titleAliases: [{ title: "Nueva", tmdbId: 999 }] }), /Aliases never create series/],
      ["alias to a missing block", data({ blockAliases: [{ label: "Nuevo", blockSlug: "nope" }] }), /Aliases never create blocks/],
      ["block not on the channel", data({ blockAliases: [{ label: "El Bloque", blockSlug: "other-block" }] }), /doesn't run on "cartoon-network"/],
      ["one-sided conflict", data({ grids: [grid({ conflictsWith: ["missing-grid"] })] }), /is not a grid in the data/],
      ["invalid time zone", data({ days: [day({ timeZone: "Mars/Olympus" })] }), /invalid IANA time zone/],
    ];
    for (const [name, invalid, message] of cases) {
      await assert.rejects(loadProgramming(invalid), message, name);
      assert.deepEqual(await counts(), { feeds: 0, grids: 0, slots: 0, schedules: 0, series: 2, blocks: 2, seriesChannels: 1 }, name);
    }
  });

  it("requires conflicts to be recorded on both grids and reports them", async () => {
    const wiki = grid({ slug: "a-wiki", conflictsWith: ["a-official"], notes: "Conflicto con la grilla oficial." });
    const official = grid({ slug: "a-official", conflictsWith: ["a-wiki"], sourceName: "Official" });
    const loaded = await loadProgramming(data({ grids: [wiki, official], days: [] }));
    assert.deepEqual(loaded.analysis.conflicts.map((c) => [c.grid, c.conflictsWith]), [
      ["a-wiki", ["a-official"]],
      ["a-official", ["a-wiki"]],
    ]);
    assert.equal(await prisma.scheduleGrid.count(), 2);
  });
});
