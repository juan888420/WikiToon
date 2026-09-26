// Builds prisma/data/programming/{grids,days} from the extracted sources (docs/research/data/programming)
// and dataset.ts, and lists title alias candidates in .cache/research/programming for curation.
// Generated data files are then curated by hand, so existing ones are never overwritten unless
// --force is passed (which discards manual edits to them).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import type { Certainty } from "@/generated/prisma/enums";
import { normalizeTitle, type GridData, type ScheduleDayData, type Weekday } from "@/lib/import/programming";
import { prisma } from "@/lib/prisma";
import { cablevisionFeeds, EQUIVALENTS, gridSpecs, type Check, type GridSpec } from "./dataset";
import { isoWeekday, parseDayLabel } from "./lib/days";
import { sameProgram, toMinutes } from "./lib/text";
import { cablevisionSources } from "./sources";

const EXTRACTED = path.join("docs", "research", "data", "programming");
const OUT = path.join("prisma", "data", "programming");
const CACHE = path.join(".cache", "research", "programming");

type SourceRef = { name: string; url: string };
type RawSlot = { days: Weekday[]; start: string; end: string | null; text: string; block: string | null; premiere?: boolean; extra?: string };
type Draft = { weekday: Weekday; start: string; end: string | null; title: string | null; block: string | null; certainty: Certainty; notes: string[] };

const readJson = <T>(kind: string, key: string) => JSON.parse(readFileSync(path.join(EXTRACTED, kind, `${key}.json`), "utf8")) as T;

const UNIDENTIFIED = /^(a identificar|sin identificar|\?+)?$/i;
// Cells that name a block instead of a program: the block label is kept as the listed block too.
const CONTAINER = /^(el )?(cartoon cartoons?|hora acme|cinetoon|votatoon|teatro cartoon|cineboom|rodeo cartoon de hanna[- ]barbera|toonami|adult swim( \(repetici[oó]n\))?|zapping zone|mini tv|primera fila|cinemania)$/i;

function readSpec(spec: GridSpec) {
  const specials: string[] = [];
  let source: SourceRef;
  let raw: RawSlot[] = [];
  let detail: RawSlot[] | null = null;
  const byLabel = <S extends { day: string }>(slots: S[]) =>
    slots.flatMap((slot) => {
      const days = parseDayLabel(slot.day);
      if (!days) {
        specials.push(slot.day);
        return [];
      }
      return [{ ...slot, days }];
    });

  if (spec.from.kind === "wiki") {
    type Wiki = { source: SourceRef; tables: { feed: string; slots: (RawSlot & { day: string })[] }[] };
    const wiki = readJson<Wiki>("wiki", spec.from.key);
    const table = (feed: string) => {
      const t = wiki.tables.find((x) => x.feed === feed);
      if (!t) throw new Error(`${spec.slug}: table "${feed}" not found (tables: ${wiki.tables.map((x) => x.feed).join(", ")}).`);
      return byLabel(t.slots);
    };
    source = wiki.source;
    raw = table(spec.from.table);
    if (spec.from.detailTable) detail = table(spec.from.detailTable);
  } else if (spec.from.kind === "blog") {
    type Blog = { source: SourceRef; days: { label: string; slots: { start: string; text: string; block: string | null; extra?: string }[] }[] };
    const blog = readJson<Blog>("blog", spec.from.key);
    source = blog.source;
    for (const day of blog.days) {
      const days = parseDayLabel(day.label);
      if (!days) {
        specials.push(day.label);
        continue;
      }
      // The blog lists starts only; each slot ends where the next one starts.
      day.slots.forEach((slot, i) =>
        raw.push({ days, start: slot.start, end: day.slots[i + 1]?.start ?? null, text: slot.text, block: slot.block, extra: slot.extra }),
      );
    }
  } else {
    type Weekly = { source: SourceRef; grids: { slots: { day: string; start: string; end: string | null; text: string }[] }[] };
    const official = readJson<Weekly>("official", spec.from.key);
    source = official.source;
    raw = byLabel(official.grids[spec.from.gridIndex].slots).map((s) => ({ ...s, block: null }));
  }
  return { source, raw, detail, specials: [...new Set(specials)] };
}

function interpret(slot: RawSlot, base: Certainty): Omit<Draft, "weekday"> {
  const notes: string[] = [];
  let title: string | null = slot.text.trim();
  let block = slot.block;
  let certainty = base;
  const boomerangHour = title.match(/^La hora Boomerang:\s*(.+)$/i);
  if (boomerangHour) {
    block = "La Hora Boomerang";
    title = boomerangHour[1];
  }
  if (UNIDENTIFIED.test(title)) {
    notes.push(`La fuente marca la franja como sin identificar${title ? ` («${title}»)` : ""}.`);
    title = null;
    certainty = "UNCERTAIN";
  } else if (!block && CONTAINER.test(title)) {
    block = title;
  }
  if (slot.extra) notes.push(`La fuente agrega: «${slot.extra}».`);
  if (slot.premiere) notes.push("La fuente la marca como estreno.");
  if (title?.includes(" → ")) notes.push("La fuente indica un cambio de programa dentro del mes.");
  return { start: slot.start, end: slot.end, title, block, certainty, notes };
}

function checkLabel(check: Check) {
  const [kind, key] = check.source.split("/");
  const data = readJson<{ source: SourceRef }>(kind, key);
  const date = key.match(/(\d{4})-(\d{2})-(\d{2})$/);
  const when = date ? ` del ${Number(date[3])}/${Number(date[2])}/${date[1]}` : "";
  const what = kind === "cablevision" ? `la guía de Cablevisión Monterrey${when}` : check.kind === "weekly" ? "la grilla oficial" : `el horario oficial${when}`;
  return { label: `${what} (${data.source.url})`, key, kind, date: date ? `${date[1]}-${date[2]}-${date[3]}` : null };
}

/** Source slots keyed by the grid slot they correspond to ("weekday start"). */
function checkSlots(check: Check, bds: number) {
  const { kind, key, date } = checkLabel(check);
  const map = new Map<string, string>();
  if (check.kind === "weekly") {
    const weekly = readJson<{ grids: { slots: { day: string; start: string; text: string }[] }[] }>(kind, key);
    for (const slot of weekly.grids[check.gridIndex].slots) {
      for (const d of parseDayLabel(slot.day) ?? []) map.set(`${d} ${slot.start}`, EQUIVALENTS[slot.text] ?? slot.text);
    }
    return map;
  }
  const daily = readJson<{ slots: { start: string; text: string }[] }>(kind, key);
  const sourceWeekday = isoWeekday(date!);
  const dayStart = toMinutes(check.dayStart);
  for (const slot of daily.slots) {
    // Minutes since the source day's midnight, then back to the grid's clock and broadcast day.
    let absolute = toMinutes(slot.start);
    if (absolute < dayStart) absolute += 1440;
    const gridAbsolute = absolute - check.offsetMinutes;
    const dayShift = Math.floor((gridAbsolute - bds) / 1440);
    const weekday = (((sourceWeekday - 1 + dayShift) % 7) + 7) % 7 + 1;
    const clock = (((gridAbsolute % 1440) + 1440) % 1440);
    const start = `${String(Math.floor(clock / 60)).padStart(2, "0")}:${String(clock % 60).padStart(2, "0")}`;
    map.set(`${weekday} ${start}`, check.translate?.[slot.text] ?? EQUIVALENTS[slot.text] ?? slot.text);
  }
  return map;
}

function buildGrid(spec: GridSpec) {
  const { source, raw, detail, specials } = readSpec(spec);
  const base: Certainty = spec.from.kind === "official-weekly" ? "VERIFIED" : "PROBABLE";
  const slots = new Map<string, Draft>();
  const duplicates: string[] = [];
  for (const slot of raw) {
    const draft = interpret(slot, base);
    for (const weekday of slot.days) {
      const key = `${weekday} ${slot.start}`;
      const previous = slots.get(key);
      if (previous && previous.title !== draft.title) duplicates.push(`${key}: «${previous.title}» / «${draft.title}»`);
      if (!previous) slots.set(key, { weekday, ...draft, notes: [...draft.notes] });
    }
  }
  for (const slot of detail ?? []) {
    const draft = interpret(slot, base);
    for (const weekday of slot.days) {
      const key = `${weekday} ${slot.start}`;
      slots.set(key, { weekday, ...draft, notes: [...draft.notes, `Detalle de la tabla "${spec.from.kind === "wiki" ? spec.from.detailTable : ""}" de la misma página.`] });
    }
  }

  const bds = toMinutes("06:00");
  for (const check of spec.checks) {
    const { label } = checkLabel(check);
    const sourceSlots = checkSlots(check, bds);
    for (const [key, draft] of slots) {
      const listed = sourceSlots.get(key);
      if (listed === undefined) continue;
      if (draft.title === null) {
        draft.notes.push(`En ${label} figura «${listed}».`);
      } else if (sameProgram(draft.title, listed)) {
        if (draft.title.includes(" → ")) draft.notes.push(`${label} confirma la variante «${listed}».`);
        else {
          if (draft.certainty === "PROBABLE") draft.certainty = "VERIFIED";
          draft.notes.push(`Confirmada por ${label}.`);
        }
      } else {
        const variant = draft.title.split(" → ").find((p) => sameProgram(p, listed));
        // A primary cell can hold two programs ("Busca del Castillo/Pokémon"): a partial match
        // is noted but doesn't verify the slot.
        const combined = listed.split(/\s*\/\s*/).find((p) => sameProgram(draft.title!, EQUIVALENTS[p] ?? p));
        if (variant) draft.notes.push(`${label} confirma la variante «${variant}».`);
        else if (combined && listed.includes("/")) draft.notes.push(`Coincidencia parcial: ${label} lista «${listed}».`);
        else draft.notes.push(`Difiere de fuente primaria: ${label} lista «${listed}».`);
      }
    }
  }

  // Group weekdays back per identical slot, ordered by first weekday and broadcast time.
  const groups = new Map<string, { days: Weekday[]; draft: Draft }>();
  for (const draft of slots.values()) {
    const key = JSON.stringify([draft.start, draft.end, draft.title, draft.block, draft.certainty, draft.notes]);
    const group = groups.get(key) ?? { days: [], draft };
    group.days.push(draft.weekday);
    groups.set(key, group);
  }
  const order = (t: string) => (toMinutes(t) < bds ? toMinutes(t) + 1440 : toMinutes(t));
  const gridSlots = [...groups.values()]
    .map((g) => ({ ...g, days: g.days.sort((a, b) => a - b) }))
    .sort((a, b) => a.days[0] - b.days[0] || order(a.draft.start) - order(b.draft.start))
    .map(({ days, draft }) => ({
      days,
      start: draft.start,
      end: draft.end,
      title: draft.title,
      ...(draft.block ? { block: draft.block } : {}),
      certainty: draft.certainty,
      ...(draft.notes.length ? { notes: draft.notes.join(" ") } : {}),
    }));

  const grid: GridData = {
    slug: spec.slug,
    channelSlug: spec.channelSlug,
    feedSlug: spec.feedSlug,
    validFrom: spec.validFrom,
    validTo: spec.validTo,
    timeZone: spec.timeZone,
    broadcastDayStart: "06:00",
    sourceName: source.name,
    sourceUrl: source.url,
    notes: specials.length ? `${spec.notes} La fuente lista además días especiales fechados, que no se cargan: ${specials.join("; ")}.` : spec.notes,
    ...(spec.conflictsWith ? { conflictsWith: spec.conflictsWith } : {}),
    slots: gridSlots,
  };
  return { grid, duplicates };
}

function buildDays() {
  const byChannel = new Map<string, ScheduleDayData[]>();
  for (const source of cablevisionSources) {
    type Cv = { source: SourceRef; date: string; slots: { start: string; text: string }[] };
    const cv = readJson<Cv>("cablevision", source.key);
    const feed = cablevisionFeeds[source.channelSlug];
    const day: ScheduleDayData = {
      channelSlug: source.channelSlug,
      feedSlug: feed?.feedSlug ?? null,
      airDate: cv.date,
      timeZone: "America/Monterrey",
      sourceName: cv.source.name,
      sourceUrl: cv.source.url,
      notes: `Guía de un día concreto, de 00:00 a 23:30 del calendario, en hora de Monterrey.${feed ? ` Señal: ${feed.reason}` : " Señal no documentada."}`,
      slots: cv.slots.map((slot, i) => {
        const title = slot.text.trim() || null;
        return {
          start: slot.start,
          end: cv.slots[i + 1]?.start ?? null,
          title,
          certainty: title ? "VERIFIED" : "UNCERTAIN",
          ...(title ? {} : { notes: "La guía deja la franja sin título." }),
        };
      }),
    };
    byChannel.set(source.channelSlug, [...(byChannel.get(source.channelSlug) ?? []), day]);
  }
  return byChannel;
}

// --- Output ------------------------------------------------------------------------------------

const lit = (value: unknown) => JSON.stringify(value);
const slotLine = (slot: Record<string, unknown>) =>
  `    { ${Object.entries(slot).map(([k, v]) => `${k}: ${lit(v)}`).join(", ")} },`;

function gridModule(grid: GridData) {
  const { slots, ...rest } = grid;
  const head = Object.entries(rest).map(([k, v]) => `  ${k}: ${lit(v)},`).join("\n");
  return [
    `import type { GridData } from "../../../../../src/lib/import/programming";`,
    "",
    `// Generated by scripts/research/programming/build-dataset.ts from ${grid.sourceUrl}; curated by hand afterwards.`,
    "export const grid: GridData = {",
    head,
    "  slots: [",
    ...slots.map((slot) => slotLine(slot)),
    "  ],",
    "};",
    "",
  ].join("\n");
}

function daysModule(days: ScheduleDayData[]) {
  const blocks = days.map((day) => {
    const { slots, ...rest } = day;
    return ["  {", ...Object.entries(rest).map(([k, v]) => `    ${k}: ${lit(v)},`), "    slots: [", ...slots.map((s) => `  ${slotLine(s)}`), "    ],", "  },"].join("\n");
  });
  return [
    `import type { ScheduleDayData } from "../../../../src/lib/import/programming";`,
    "",
    "// Generated by scripts/research/programming/build-dataset.ts from Cablevisión Monterrey guides; curated by hand afterwards.",
    "export const days: ScheduleDayData[] = [",
    ...blocks,
    "];",
    "",
  ].join("\n");
}

async function main() {
  const { values } = parseArgs({ options: { force: { type: "boolean" } }, strict: true });
  const files = new Map<string, string>();
  const gridImports: { name: string; file: string }[] = [];
  const allGrids: GridData[] = [];

  for (const spec of gridSpecs) {
    const { grid, duplicates } = buildGrid(spec);
    if (duplicates.length) throw new Error(`${spec.slug}: the source lists two programs for the same slot:\n  ${duplicates.join("\n  ")}`);
    const file = path.join(OUT, "grids", spec.channelSlug, `${spec.slug.replace(`${spec.channelSlug}-`, "")}.ts`);
    files.set(file, gridModule(grid));
    gridImports.push({ name: spec.slug.replace(/-(\w)/g, (_, c: string) => c.toUpperCase()), file });
    allGrids.push(grid);
    const count = (c: Certainty) => grid.slots.reduce((n, s) => n + (s.certainty === c ? s.days.length : 0), 0);
    const differences = grid.slots.filter((s) => s.notes?.includes("Difiere de fuente primaria")).reduce((n, s) => n + s.days.length, 0);
    console.log(`${spec.slug}: ${count("VERIFIED")} verified, ${count("PROBABLE")} probable, ${count("UNCERTAIN")} uncertain weekday slots; ${differences} differ from a primary source.`);
  }

  const daysByChannel = buildDays();
  for (const [channel, days] of daysByChannel) files.set(path.join(OUT, "days", `${channel}.ts`), daysModule(days));

  const rel = (file: string) => `./${path.relative(OUT, file).replace(/\\/g, "/").replace(/\.ts$/, "")}`;
  files.set(
    path.join(OUT, "dataset.ts"),
    [
      `import type { GridData, ScheduleDayData } from "../../../src/lib/import/programming";`,
      ...[...daysByChannel.keys()].map((c) => `import { days as ${c.replace(/-(\w)/g, (_, x: string) => x.toUpperCase())}Days } from "${rel(path.join(OUT, "days", `${c}.ts`))}";`),
      ...gridImports.map(({ name, file }) => `import { grid as ${name} } from "${rel(file)}";`),
      "",
      "// Generated by scripts/research/programming/build-dataset.ts: every grid and day file of the dataset.",
      `export const grids: GridData[] = [${gridImports.map((g) => g.name).join(", ")}];`,
      "",
      `export const days: ScheduleDayData[] = [${[...daysByChannel.keys()].map((c) => `...${c.replace(/-(\w)/g, (_, x: string) => x.toUpperCase())}Days`).join(", ")}];`,
      "",
    ].join("\n"),
  );

  const conflicts = [...files].filter(([file, content]) => existsSync(file) && readFileSync(file, "utf8") !== content);
  if (conflicts.length && !values.force) {
    throw new Error(`These files exist and differ from the generated version (pass --force to overwrite and lose manual edits):\n  ${conflicts.map(([f]) => f).join("\n  ")}`);
  }
  for (const [file, content] of files) {
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, content);
  }
  console.log(`Wrote ${files.size} files under ${OUT}.`);

  // Alias candidates: listed titles and exact (normalized) catalog title matches, for manual review.
  const catalog = await prisma.series.findMany({ select: { tmdbId: true, title: true } });
  const byKey = new Map<string, { tmdbId: number | null; title: string }[]>();
  for (const s of catalog) byKey.set(normalizeTitle(s.title), [...(byKey.get(normalizeTitle(s.title)) ?? []), s]);
  const listed = new Map<string, { title: string; channels: Set<string>; count: number }>();
  const add = (title: string | null, channel: string) => {
    if (!title) return;
    const key = normalizeTitle(title);
    const entry = listed.get(key) ?? { title, channels: new Set<string>(), count: 0 };
    entry.channels.add(channel);
    entry.count++;
    listed.set(key, entry);
  };
  for (const grid of allGrids) for (const slot of grid.slots) add(slot.title, grid.channelSlug);
  for (const days of daysByChannel.values()) for (const day of days) for (const slot of day.slots) add(slot.title, day.channelSlug);
  const candidates = [...listed.entries()]
    .map(([key, e]) => ({ title: e.title, channels: [...e.channels].sort(), count: e.count, exactMatches: byKey.get(key) ?? [] }))
    .sort((a, b) => a.title.localeCompare(b.title, "es"));
  mkdirSync(CACHE, { recursive: true });
  writeFileSync(path.join(CACHE, "title-candidates.json"), JSON.stringify(candidates, null, 1));
  console.log(`${candidates.length} distinct listed titles, ${candidates.filter((c) => c.exactMatches.length).length} with an exact catalog title; candidates in ${CACHE}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
