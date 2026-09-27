import { TimeRanges } from "@/components/blocks/time-ranges";
import { SourceNote } from "@/components/source-note";
import type { BlockScheduleLine } from "@/lib/data/blocks";
import { formatTimeZone, formatWeekdays, formatYearMonth } from "@/lib/format";

/** Every documented schedule line of a block, with its channel, month, clock and source. */
export function BlockSchedule({
  lines,
  showChannel,
}: {
  lines: BlockScheduleLine[];
  showChannel: boolean;
}) {
  // Grids count the broadcast day from 06:00, so an early-morning slot belongs to the day before.
  const hasEarlyMorning = lines.some((line) => line.times.some((time) => time.startTime < "06:00"));
  const hasSourced = lines.some((line) => line.period !== null);

  return (
    <>
      <ul className="mt-3 grid max-w-3xl gap-3 sm:grid-cols-2">
        {lines.map((line) => {
          const meta = [
            showChannel ? (line.channel?.name ?? null) : null,
            line.period ? formatYearMonth(line.period) : null,
            // Only a sourced slot can say its clock is undocumented; the owner's slots have none.
            line.timeZone
              ? formatTimeZone(line.timeZone)
              : line.sourceUrl
                ? "zona horaria no documentada"
                : null,
          ]
            .filter(Boolean)
            .join(" · ");

          return (
            <li
              key={`${line.channel?.slug} ${line.weekdays} ${line.period} ${line.sourceUrl}`}
              className="rounded-lg border border-border px-3 py-2.5"
            >
              <p className="text-sm font-medium">{formatWeekdays(line.weekdays)}</p>
              <p className="mt-0.5 text-sm tabular-nums">
                <TimeRanges times={line.times} />
              </p>
              {meta && <p className="mt-1.5 text-xs text-muted-foreground">{meta}</p>}
              <div className="mt-1 empty:hidden">
                <SourceNote name={line.sourceName} url={line.sourceUrl} />
              </div>
            </li>
          );
        })}
      </ul>
      {(hasSourced || hasEarlyMorning) && (
        <p className="mt-3 max-w-prose text-xs leading-relaxed text-muted-foreground">
          {[
            hasSourced &&
              "Los horarios con fuente son los que esta muestra para ese mes, no una franja permanente.",
            hasEarlyMorning &&
              "Los horarios de madrugada cuentan en el día de emisión anterior: un viernes a la 01:00 es la madrugada del sábado.",
          ]
            .filter(Boolean)
            .join(" ")}
        </p>
      )}
    </>
  );
}
