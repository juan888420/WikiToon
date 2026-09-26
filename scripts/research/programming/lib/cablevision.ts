// Parses the daily channel guides of Cablevisión Monterrey (cablevision.com.mx, archived in the
// Wayback Machine): one calendar day, times and titles in two <br>-separated cells.
import { htmlToText, normalizeTime } from "./text";

export type CablevisionDay = {
  channelName: string;
  /** "YYYY-MM-DD", read from the page text. */
  date: string;
  slots: { start: string; text: string }[];
};

const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

export function parseCablevision(html: string): CablevisionDay {
  const text = htmlToText(html);
  const head = text.match(/Nombre: (.*?) Paquete.*?(?:Lunes|Martes|Mi\S+rcoles|Jueves|Viernes|S\S+bado|Domingo)\s+(\d+) (\w+) (\d{4})/);
  if (!head) throw new Error("Cablevisión page without channel name and date.");
  const month = MONTHS.indexOf(head[3].toLowerCase()) + 1;
  if (month === 0) throw new Error(`Unknown month "${head[3]}".`);

  const cells = [...html.matchAll(/<TD[^>]*>([\s\S]*?)<\/TD>/gi)].map((m) => m[1]);
  const split = (cell: string) => cell.split(/<br\s*\/?>/i).map((part) => htmlToText(part));
  const timesIndex = cells.findIndex((cell) => (cell.match(/\d{2}:\d{2}<br>/gi) ?? []).length > 5);
  if (timesIndex < 0) throw new Error("Cablevisión page without a schedule.");
  const times = split(cells[timesIndex]).map(normalizeTime).filter((t): t is string => t !== null);
  const titles = split(cells[timesIndex + 1]);
  return {
    channelName: head[1],
    date: `${head[4]}-${String(month).padStart(2, "0")}-${head[2].padStart(2, "0")}`,
    slots: times.map((start, i) => ({ start, text: titles[i] ?? "" })),
  };
}
