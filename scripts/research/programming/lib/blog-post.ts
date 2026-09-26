// Parses Foro Grilla de Canales posts: "Día | Mes Año:" headers followed by
// "- HH:MM - [Bloque | ]Programa" (or "HH:MM Bloque - Programa") lines.
import { decodeEntities, normalizeTime } from "./text";

/** `extra` keeps what the blog appends after the title (cast lists such as ": con Hilary Duff"). */
export type BlogSlot = { start: string; text: string; block: string | null; extra?: string };
export type BlogDay = { label: string; slots: BlogSlot[] };
export type BlogPost = { title: string; statedSite: string | null; days: BlogDay[] };

/** Block names the blog writes as a prefix ("Invasión Animé | Digimon", "Nick Jr. - Blue"). */
const BLOCKS = [
  "Girl Power", "Súper Chiflados", "Super Chiflados", "Invasión Animé", "Invasion Anime", "Mysteria", "Insomnio",
  "Clásicos a la Medianoche", "Playhouse Disney", "Nick Jr.", "Nick Jr", "Nicktoons", "Nick at Nite", "Zapping Zone",
  "Toonami", "Cartoon Cartoons", "Hora ACME", "Boomeraction", "Súper Horas", "Doble Carga", "Cineskopio",
  "Generación Power Rangers", "Adult Swim", "Hora Boomerang", "La Hora Boomerang", "Rodeo Cartoon de Hanna-Barbera",
  "Jetix Max", "Mini TV", "Cinetoon", "Votatoon", "Teatro Cartoon",
];
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const PREFIX = new RegExp(`^(${BLOCKS.map(escape).join("|")})\\s*(?:\\||-|:)\\s*(.+)$`, "i");

function htmlToLines(html: string) {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|tr|li|h\d)>/gi, "\n")
      .replace(/<\/t[dh]>/gi, " | ")
      .replace(/<[^>]+>/g, ""),
  )
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

export function parseBlogPost(title: string, html: string): BlogPost {
  const lines = htmlToLines(html);
  const statedSite = lines.slice(0, 6).find((l) => /^(https?:\/\/)?www\.[\w.]+\/?$/.test(l)) ?? null;
  const days: BlogDay[] = [];
  for (const line of lines) {
    const head = line.replace(/\s*\|.*$/, "").replace(/:$/, "").trim();
    if (/^(lunes|martes|mi[eé]rcoles|jueves|viernes|s[aá]bados?|domingos?)\b/i.test(head) && !/\d{1,2}:\d{2}/.test(line) && head.length < 80) {
      days.push({ label: head, slots: [] });
      continue;
    }
    const m = line.match(/^-?\s*(\d{1,2}:\d{2})\s*(?:-\s*)?(.+)$/);
    const start = m ? normalizeTime(m[1]) : null;
    if (!m || !start || !days.length) continue;
    let text = m[2].trim();
    let block: string | null = null;
    // Cast lists come after ": con" (only with the colon, so titles like "Malo con Carne" stay whole).
    const cast = text.match(/^(.*?):\s+(con\s.+)$/i);
    const extra = cast ? cast[2].trim() : undefined;
    if (cast) text = cast[1].trim();
    const prefixed = text.match(PREFIX);
    if (prefixed) {
      block = prefixed[1];
      text = prefixed[2].trim();
    }
    days[days.length - 1].slots.push({ start, text, block, ...(extra ? { extra } : {}) });
  }
  return { title, statedSite, days: days.filter((day) => day.slots.length) };
}
