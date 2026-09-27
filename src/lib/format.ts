/** "1998–2005", "1998" or null. En dash, not em dash. */
export function formatYearRange(start: number | null, end: number | null) {
  if (start === null) return end === null ? null : String(end);
  if (end === null || end === start) return String(start);
  return `${start}–${end}`;
}

/**
 * Documented runs on a channel or block ("1999–2004 · 2010"), or null when none has years.
 * Never pass TMDB original-run years here.
 */
export function formatRuns(runs: { startYear: number | null; endYear: number | null }[]) {
  const ranges = runs.map((run) => formatYearRange(run.startYear, run.endYear)).filter(Boolean);
  return ranges.length > 0 ? ranges.join(" · ") : null;
}

const airDateFormat = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** Formats a stored "YYYY-MM-DD" date without timezone shifts; returns other input unchanged. */
export function formatAirDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  const parsed = new Date(`${date}T00:00:00Z`);
  return Number.isNaN(parsed.getTime()) ? date : airDateFormat.format(parsed);
}

const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

/**
 * Formats a `Schedule.airDate` ("YYYY-MM-DD", local broadcast date) from its digits only, with no
 * `Date` or timezone involved. "short": "27 dic 2005", "long": "27 de diciembre de 2005",
 * "dayMonth": "27 dic". Returns the input unchanged if it isn't a valid YYYY-MM-DD string.
 */
export function formatScheduleDate(airDate: string, style: "short" | "long" | "dayMonth" = "short") {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(airDate);
  const month = match ? MONTHS[Number(match[2]) - 1] : undefined;
  if (!match || !month) return airDate;

  const [, year, , day] = match;
  const dayNumber = Number(day);
  if (style === "long") return `${dayNumber} de ${month} de ${year}`;
  const short = `${dayNumber} ${month.slice(0, 3)}`;
  return style === "dayMonth" ? short : `${short} ${year}`;
}

/** "HH:MM" strings as published; never parsed into dates. */
export function formatTimeRange(start: string, end: string | null) {
  return end ? `${start}–${end}` : start;
}

/**
 * The "HH:MM" ranges of one schedule line, one string each ("11:00–12:00"; "desde 00:00" when
 * open), so the UI can keep every range on one line.
 */
export function formatTimeRanges(times: { startTime: string; endTime: string | null }[]) {
  return times.map(({ startTime, endTime }) =>
    endTime ? formatTimeRange(startTime, endTime) : `desde ${startTime}`,
  );
}

const WEEKDAYS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * ISO weekdays (1 = Monday), ascending, as a recurring schedule: "Lunes a viernes", "Sábados",
 * "Sábados y domingos", "Lunes, miércoles y viernes" or "Todos los días".
 */
export function formatWeekdays(weekdays: number[]) {
  const names = weekdays.map((day) => WEEKDAYS[day - 1]).filter((name) => name !== undefined);
  if (names.length === 0) return "";
  if (names.length === 7) return "Todos los días";
  const consecutive = weekdays.every((day, i) => i === 0 || day === weekdays[i - 1]! + 1);
  if (consecutive && names.length >= 3) return capitalize(`${names[0]} a ${names.at(-1)}`);
  // "sábado" and "domingo" take an "s" in the plural; the other weekday names don't change.
  const plural = names.map((name) => (name.endsWith("o") ? `${name}s` : name));
  const list =
    plural.length === 1 ? plural[0]! : `${plural.slice(0, -1).join(", ")} y ${plural.at(-1)}`;
  return capitalize(list);
}

/** "2005-10" -> "oct 2005", from the digits only; returns other input unchanged. */
export function formatYearMonth(period: string) {
  const match = /^(\d{4})-(\d{2})$/.exec(period);
  const month = match ? MONTHS[Number(match[2]) - 1] : undefined;
  return match && month ? `${month.slice(0, 3)} ${match[1]}` : period;
}

/** IANA zone as a reader-facing clock: "America/Argentina/Buenos_Aires" -> "hora de Buenos Aires". */
export function formatTimeZone(timeZone: string) {
  const city = timeZone.split("/").at(-1)?.replaceAll("_", " ");
  return city ? `hora de ${city}` : timeZone;
}

export function formatDate(date: Date) {
  return airDateFormat.format(date);
}

const listFormat = new Intl.ListFormat("es", { type: "conjunction" });

/** "Boomerang, Fox Kids y Jetix". */
export function formatList(items: string[]) {
  return listFormat.format(items);
}

export function pluralize(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`;
}
