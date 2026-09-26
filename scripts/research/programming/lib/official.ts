// Parses archived pages of the channels' own sites (cartoonnetworkla.com): the weekly "Toon In"
// grid of 2000 and the daily schedule pages of 2005.
import { htmlToText, normalizeTime } from "./text";

export type OfficialWeeklySlot = { day: string; start: string; end: string | null; text: string };
export type OfficialWeeklyGrid = { label: string; days: string[]; slots: OfficialWeeklySlot[] };

/**
 * Weekly HTML grids ("Hora | Lunes | ... | Domingo") with rowspan and colspan. A page can hold
 * several (the 2000 grid page has a general one and one for Mexico); each is labeled with the
 * text between it and the previous grid.
 */
export function parseOfficialWeeklyGrids(html: string): OfficialWeeklyGrid[] {
  // Innermost rows only: the page layout wraps the grids in outer tables.
  const rows = [...html.matchAll(/<tr[^>]*>((?:(?!<tr)[\s\S])*?)<\/tr>/gi)].map((m) => ({
    index: m.index,
    cells: [...m[1].matchAll(/<td([^>]*)>([\s\S]*?)<\/td>/gi)].map((c) => ({
      colspan: Number(c[1].match(/colspan="?(\d+)/i)?.[1] ?? 1),
      rowspan: Number(c[1].match(/rowspan="?(\d+)/i)?.[1] ?? 1),
      text: htmlToText(c[2]),
    })),
  }));
  const grids: OfficialWeeklyGrid[] = [];
  let previousEnd = 0;
  for (let h = 0; h < rows.length; h++) {
    const header = rows[h].cells;
    if (header[0]?.text !== "Hora" || header.length < 8) continue;
    const days = header.slice(1).map((c) => c.text);
    const label = htmlToText(html.slice(previousEnd, rows[h].index));
    const body: typeof rows = [];
    for (let r = h + 1; r < rows.length && normalizeTime(rows[r].cells[0]?.text ?? ""); r++) body.push(rows[r]);

    const pending: { left: number }[] = [];
    const placed: { row: number; day: number; rowspan: number; text: string }[] = [];
    body.forEach((row, r) => {
      let col = 0;
      const skip = () => {
        while (pending[col]?.left > 0) {
          pending[col].left--;
          col++;
        }
      };
      for (const cell of row.cells.slice(1)) {
        skip();
        for (let k = 0; k < cell.colspan; k++, col++) {
          placed.push({ row: r, day: col, rowspan: cell.rowspan, text: cell.text });
          if (cell.rowspan > 1) pending[col] = { left: cell.rowspan - 1 };
        }
      }
      skip();
    });
    const times = body.map((row) => normalizeTime(row.cells[0].text)!);
    grids.push({
      label: label.slice(-120),
      days,
      slots: placed
        .filter((p) => p.day < days.length)
        .map((p) => ({ day: days[p.day], start: times[p.row], end: times[p.row + p.rowspan] ?? null, text: p.text })),
    });
    previousEnd = rows[h + body.length]?.index ?? rows[h].index;
  }
  return grids;
}

export type OfficialDailySchedule = { statedTimeZone: string | null; slots: { start: string; text: string }[] };

/** Daily schedule pages ("Time | Program" or "Horario | Programa"), 06:00 to 05:59. */
export function parseOfficialDaily(html: string): OfficialDailySchedule {
  const text = htmlToText(html);
  const statedTimeZone = /Buenos Aires/i.test(text) ? "America/Argentina/Buenos_Aires" : null;
  const cells = [...html.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => htmlToText(m[1])).filter(Boolean);
  const slots: { start: string; text: string }[] = [];
  for (let i = 0; i < cells.length - 1; i++) {
    const start = normalizeTime(cells[i]);
    if (start && !normalizeTime(cells[i + 1])) slots.push({ start, text: cells[i + 1] });
  }
  return { statedTimeZone, slots };
}
