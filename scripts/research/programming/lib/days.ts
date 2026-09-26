import type { Weekday } from "@/lib/import/programming";

const NAMES = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
const fold = (text: string) =>
  text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/sabados/g, "sabado").replace(/domingos/g, "domingo");

/**
 * ISO weekdays covered by a source's day label ("Lunes a jueves", "Lunes, Miércoles y Viernes",
 * "Sábado y Domingo"...). Returns null for dated labels ("Domingo 7 de agosto"), which are
 * one-off specials, not part of the recurring grid.
 */
export function parseDayLabel(label: string): Weekday[] | null {
  const l = fold(label);
  if (/\d/.test(l)) return null;
  if (/todos los dias|lunes a domingo/.test(l)) return [1, 2, 3, 4, 5, 6, 7];
  const days = new Set<number>();
  for (const m of l.matchAll(/(lunes|martes|miercoles|jueves|viernes|sabado|domingo) a (lunes|martes|miercoles|jueves|viernes|sabado|domingo)/g)) {
    for (let d = NAMES.indexOf(m[1]); d <= NAMES.indexOf(m[2]); d++) days.add(d + 1);
  }
  for (const [i, name] of NAMES.entries()) if (new RegExp(`\\b${name}\\b`).test(l)) days.add(i + 1);
  return days.size ? ([...days].sort((a, b) => a - b) as Weekday[]) : null;
}

/** ISO weekday of a "YYYY-MM-DD" date, by arithmetic only (Sakamoto), with no Date object. */
export function isoWeekday(date: string): Weekday {
  const [year, m, d] = date.split("-").map(Number);
  const offsets = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  const y = m < 3 ? year - 1 : year;
  const day = (y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + offsets[m - 1] + d) % 7;
  return (day === 0 ? 7 : day) as Weekday;
}
