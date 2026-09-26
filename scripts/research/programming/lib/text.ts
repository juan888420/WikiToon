// Text helpers shared by the programming research parsers.

const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  aacute: "á", eacute: "é", iacute: "í", oacute: "ó", uacute: "ú", ntilde: "ñ", uuml: "ü",
  Aacute: "Á", Eacute: "É", Iacute: "Í", Oacute: "Ó", Uacute: "Ú", Ntilde: "Ñ", Uuml: "Ü",
  iexcl: "¡", iquest: "¿", bull: "•", copy: "©",
};

export function decodeEntities(text: string) {
  return text
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name: string) => ENTITIES[name] ?? match);
}

/** Strips tags and collapses whitespace; `<br>` becomes " / ". */
export function htmlToText(html: string) {
  return decodeEntities(html.replace(/<br\s*\/?>/gi, " / ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

/** "6:00" -> "06:00"; "06:00PM" -> "18:00". Returns null when it isn't a time. */
export function normalizeTime(raw: string) {
  const m = raw.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!m) return null;
  let hours = Number(m[1]);
  const ampm = m[3]?.toUpperCase();
  if (ampm === "PM" && hours < 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;
  if (hours > 23 || Number(m[2]) > 59) return null;
  return `${String(hours).padStart(2, "0")}:${m[2]}`;
}

export { toMinutes };

export const fromMinutes = (minutes: number) => {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};

const STOPWORDS = new Set(["el", "la", "los", "las", "de", "del", "y", "the", "and", "of", "con", "en", "sus"]);

/**
 * Loose comparison used only to cross-check two sources (never to link titles to series). It is
 * conservative: numbers and roman numerals must match, and either most words are shared or one
 * title is contained in the other ("Rocko" in "La Vida Moderna de Rocko") with a distinctive word.
 */
export function sameProgram(a: string, b: string) {
  const tokens = (text: string) =>
    new Set(
      text
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/&/g, " y ")
        .split(/[^a-z0-9]+/)
        .filter((w) => w && !STOPWORDS.has(w))
        .map((w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w)),
    );
  const ta = tokens(a);
  const tb = tokens(b);
  if (!ta.size || !tb.size) return false;
  const numeric = (w: string) => /^(\d+|[ivx]+)$/.test(w);
  const na = [...ta].filter(numeric).sort().join(" ");
  const nb = [...tb].filter(numeric).sort().join(" ");
  if (na !== nb) return false;
  const shared = [...ta].filter((w) => tb.has(w)).length;
  if (shared / new Set([...ta, ...tb]).size >= 0.75) return true;
  const [short, long] = ta.size <= tb.size ? [ta, tb] : [tb, ta];
  const contained = [...short].every((w) => long.has(w));
  return contained && (short.size >= 2 || [...short].some((w) => w.length >= 5));
}
