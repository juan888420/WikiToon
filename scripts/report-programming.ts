// Writes docs/research/programming-review.md: what the programming data leaves for human review
// (unresolved titles, block labels outside the catalog, series scheduled on channels they aren't
// linked to, source conflicts and differences, uncertain slots) plus integrity checks of the DB.
// Read-only: it never writes to the database.
import { writeFileSync } from "node:fs";
import { analyzeProgramming, type Occurrence } from "@/lib/import/programming";
import { prisma } from "@/lib/prisma";
import { programmingData } from "../prisma/data/programming";

const OUT = "docs/research/programming-review.md";
const WEEKDAYS = ["", "lun", "mar", "mié", "jue", "vie", "sáb", "dom"];
const cell = (text: string) => text.replace(/\|/g, "/").replace(/\n/g, " ");

function where(occurrences: Occurrence[]) {
  const bySource = new Map<string, Set<string>>();
  for (const o of occurrences) {
    const at = `${o.weekday ? `${WEEKDAYS[o.weekday]} ` : ""}${o.start}`;
    bySource.set(o.source, (bySource.get(o.source) ?? new Set()).add(at));
  }
  return [...bySource].map(([source, at]) => `${source} (${[...at].slice(0, 3).join(", ")}${at.size > 3 ? "…" : ""})`).join("; ");
}

async function integrityChecks() {
  const duplicateSlots = await prisma.$queryRawUnsafe<{ n: bigint }[]>(
    "SELECT COUNT(*) AS n FROM (SELECT grid_id, weekday, start_time FROM schedule_grid_slots GROUP BY 1, 2, 3 HAVING COUNT(*) > 1)",
  );
  const foreignFeeds = await prisma.$queryRawUnsafe<{ n: bigint }[]>(
    `SELECT (SELECT COUNT(*) FROM schedule_grids g JOIN feeds f ON f.id = g.feed_id WHERE f.channel_id <> g.channel_id)
          + (SELECT COUNT(*) FROM schedules s JOIN feeds f ON f.id = s.feed_id WHERE f.channel_id <> s.channel_id) AS n`,
  );
  const uncertainWithoutReason =
    (await prisma.scheduleGridSlot.count({ where: { certainty: "UNCERTAIN", OR: [{ notes: null }, { notes: "" }] } })) +
    (await prisma.schedule.count({ where: { certainty: "UNCERTAIN", sourceUrl: { not: null }, OR: [{ notes: null }, { notes: "" }] } }));
  const gridsWithoutSource = await prisma.scheduleGrid.count({ where: { sourceName: "" } });
  const deprecatedFeedUsed = await prisma.schedule.count({ where: { feed: { not: null }, feedId: { not: null } } });
  const [grids, slots, schedules, feeds] = await Promise.all([
    prisma.scheduleGrid.count(),
    prisma.scheduleGridSlot.count(),
    prisma.schedule.count(),
    prisma.feed.count(),
  ]);
  const byCertainty = await prisma.scheduleGridSlot.groupBy({ by: ["certainty"], _count: { _all: true } });
  const scheduleByCertainty = await prisma.schedule.groupBy({ by: ["certainty"], _count: { _all: true } });
  return {
    counts: { grids, slots, schedules, feeds },
    byCertainty: Object.fromEntries(byCertainty.map((g) => [g.certainty, g._count._all])),
    scheduleByCertainty: Object.fromEntries(scheduleByCertainty.map((g) => [g.certainty, g._count._all])),
    checks: [
      ["Franjas duplicadas (grilla + día + hora)", Number(duplicateSlots[0].n)],
      ["Grillas o días con una señal de otro canal", Number(foreignFeeds[0].n)],
      ["Registros UNCERTAIN sin nota que explique por qué", uncertainWithoutReason],
      ["Grillas sin fuente", gridsWithoutSource],
      ["Días nuevos que usan el campo deprecado `feed`", deprecatedFeedUsed],
    ] as const,
  };
}

async function main() {
  const { analysis } = await analyzeProgramming(programmingData);
  const db = await integrityChecks();
  const lines: string[] = [];
  const push = (...l: string[]) => lines.push(...l);

  push(
    "# Revisión de los datos de programación",
    "",
    "Generado por `npm run db:report:programming` a partir de `prisma/data/programming` y de la base de datos. No editar a mano.",
    "",
    "## Estado de la base",
    "",
    `- ${db.counts.feeds} señales, ${db.counts.grids} grillas con ${db.counts.slots} franjas por día de la semana, ${db.counts.schedules} filas de días concretos (\`Schedule\`).`,
    `- Franjas de grilla por certeza: ${Object.entries(db.byCertainty).map(([k, v]) => `${k} ${v}`).join(", ")}.`,
    `- Filas de \`Schedule\` por certeza: ${Object.entries(db.scheduleByCertainty).map(([k, v]) => `${k} ${v}`).join(", ")}.`,
    "",
    "| Comprobación | Resultado |",
    "| ------------ | --------: |",
    ...db.checks.map(([label, n]) => `| ${label} | ${n === 0 ? "0 ✓" : `**${n}**`} |`),
    "",
  );

  push("## Conflictos entre fuentes", "", "Grillas del mismo período cuyas fuentes no coinciden. Se conservan ambas; ninguna se da por correcta.", "");
  // Both grids of a conflict record it; list each pair once, with both grids' notes.
  for (const conflict of analysis.conflicts) {
    for (const other of conflict.conflictsWith.filter((slug) => conflict.grid < slug)) {
      const counterpart = analysis.conflicts.find((c) => c.grid === other);
      push(`- \`${conflict.grid}\` ↔ \`${other}\``, `  - ${conflict.grid}: ${conflict.notes ?? ""}`, `  - ${other}: ${counterpart?.notes ?? ""}`);
    }
  }
  push("");

  push(
    "## Diferencias con fuentes primarias",
    "",
    "Franjas de una grilla secundaria que una fuente primaria de otra fecha (o del mismo período) lista distinto. Conservan su certeza y la nota con la fuente.",
    "",
    "| Grilla | Días | Hora | Título en la grilla | Nota |",
    "| ------ | ---- | ---: | ------------------- | ---- |",
  );
  for (const grid of programmingData.grids) {
    for (const slot of grid.slots) {
      if (!slot.notes || !/Difiere de fuente primaria|Coincidencia parcial/.test(slot.notes)) continue;
      push(`| ${grid.slug} | ${slot.days.map((d) => WEEKDAYS[d]).join(", ")} | ${slot.start} | ${cell(slot.title ?? "—")} | ${cell(slot.notes)} |`);
    }
  }
  push("");

  push("## Franjas UNCERTAIN", "", "| Fuente | Días | Hora | Título | Motivo |", "| ------ | ---- | ---: | ------ | ------ |");
  for (const grid of programmingData.grids) {
    for (const slot of grid.slots.filter((s) => s.certainty === "UNCERTAIN")) {
      push(`| ${grid.slug} | ${slot.days.map((d) => WEEKDAYS[d]).join(", ")} | ${slot.start} | ${cell(slot.title ?? "—")} | ${cell(slot.notes ?? "")} |`);
    }
  }
  for (const day of programmingData.days) {
    for (const slot of day.slots.filter((s) => s.certainty === "UNCERTAIN")) {
      push(`| ${day.channelSlug} ${day.airDate} | — | ${slot.start} | ${cell(slot.title ?? "—")} | ${cell(slot.notes ?? "")} |`);
    }
  }
  push("");

  push(
    "## Series programadas en un canal al que no están vinculadas",
    "",
    "La fuente las ubica en el canal, pero el catálogo no tiene `SeriesChannel` para ese par. No se crea ningún vínculo automáticamente.",
    "",
    "| Serie | TMDB | Canal | Fuentes |",
    "| ----- | ---: | ----- | ------- |",
    ...[...analysis.missingSeriesChannels.values()]
      .sort((a, b) => a.channelSlug.localeCompare(b.channelSlug) || a.seriesTitle.localeCompare(b.seriesTitle, "es"))
      .map((m) => `| ${cell(m.seriesTitle)} | ${m.tmdbId} | ${m.channelSlug} | ${[...m.sources].join(", ")} |`),
    "",
  );

  push(
    "## Etiquetas de bloque que no están en el catálogo",
    "",
    "Se conservan literalmente en `listedBlock`. No se crea ningún bloque.",
    "",
    "| Etiqueta | Franjas | Dónde |",
    "| -------- | ------: | ----- |",
    ...[...analysis.unmappedBlocks.values()]
      .sort((a, b) => b.occurrences.length - a.occurrences.length)
      .map((b) => `| ${cell(b.label)} | ${b.occurrences.length} | ${cell(where(b.occurrences))} |`),
    "",
  );

  const unresolved = [...analysis.unresolvedTitles.values()].sort((a, b) => b.occurrences.length - a.occurrences.length || a.title.localeCompare(b.title, "es"));
  push(
    "## Títulos sin resolver",
    "",
    `${unresolved.length} títulos sin alias: la franja conserva el título literal y queda sin serie. Para resolver uno, agregar un alias en \`prisma/data/programming/title-aliases.ts\` (serie del catálogo, bloque o \`notASeries\`) y recargar. Nunca se crea una serie desde aquí.`,
    "",
    "| Título | Canales | Franjas | Dónde |",
    "| ------ | ------- | ------: | ----- |",
    ...unresolved.map((t) => `| ${cell(t.title)} | ${[...new Set(t.occurrences.map((o) => o.channelSlug))].join(", ")} | ${t.occurrences.length} | ${cell(where(t.occurrences))} |`),
    "",
  );

  writeFileSync(OUT, lines.join("\n"));
  console.log(`Wrote ${OUT}: ${unresolved.length} unresolved titles, ${analysis.unmappedBlocks.size} unmapped block labels, ${analysis.missingSeriesChannels.size} missing SeriesChannel pairs.`);
  const failed = db.checks.filter(([, n]) => n !== 0);
  if (failed.length) {
    console.error(`Integrity checks failed: ${failed.map(([l]) => l).join("; ")}`);
    process.exitCode = 1;
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
