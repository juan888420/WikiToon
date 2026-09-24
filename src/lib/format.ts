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
 * Partial historical dates (`TimelineEvent` year + optional month/day), built from the numbers
 * only, with no `Date` or timezone: "1997", "mar 1997" or "4 mar 1997". An out-of-range month
 * falls back to the year alone.
 */
export function formatPartialDate(year: number, month: number | null, day: number | null) {
  const monthName = month === null ? undefined : MONTHS[month - 1];
  if (!monthName) return String(year);
  const short = `${monthName.slice(0, 3)} ${year}`;
  return day === null ? short : `${day} ${short}`;
}

export function formatDate(date: Date) {
  return airDateFormat.format(date);
}

export function pluralize(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`;
}
