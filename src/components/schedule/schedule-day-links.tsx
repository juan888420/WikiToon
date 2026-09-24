import Link from "next/link";
import { type ScheduleDay, scheduleDayHref } from "@/lib/data/schedules";
import { formatScheduleDate, pluralize } from "@/lib/format";

/** Available dates grouped by year (taken from the "YYYY-MM-DD" string), each linking to its day. */
export function ScheduleDayLinks({ channelSlug, days }: { channelSlug: string; days: ScheduleDay[] }) {
  const byYear = new Map<string, ScheduleDay[]>();
  for (const day of days) {
    const year = day.airDate.slice(0, 4);
    byYear.set(year, [...(byYear.get(year) ?? []), day]);
  }

  return (
    <div className="space-y-5">
      {[...byYear].map(([year, yearDays]) => (
        <div key={year}>
          <h3 className="text-xs font-medium text-muted-foreground tabular-nums">{year}</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {yearDays.map((day) => (
              <li key={day.airDate}>
                <Link
                  href={scheduleDayHref(channelSlug, day.airDate)}
                  aria-label={`${formatScheduleDate(day.airDate)}, ${pluralize(day.slotCount, "emisión", "emisiones")}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-border/60 px-3 py-1.5 text-sm transition-colors outline-none hover:border-foreground/20 hover:bg-muted/30 focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <time dateTime={day.airDate} className="tabular-nums">
                    {formatScheduleDate(day.airDate, "dayMonth")}
                  </time>
                  <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground tabular-nums">
                    {day.slotCount}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
