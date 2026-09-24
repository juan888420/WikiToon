import Link from "next/link";
import { SourceNote } from "@/components/source-note";
import { blockHref } from "@/lib/data/blocks";
import type { ScheduleSlot } from "@/lib/data/schedules";
import { formatTimeRange } from "@/lib/format";

/** One day's slots in chronological order. A slot may have a series, a block, both or neither. */
export function ScheduleSlotList({ slots }: { slots: ScheduleSlot[] }) {
  return (
    <ol className="divide-y divide-border/60 rounded-xl border border-border/60">
      {slots.map((slot) => (
        <li key={slot.id} className="grid gap-x-4 gap-y-1 px-4 py-3.5 sm:grid-cols-[7.5rem_1fr]">
          <span className="pt-0.5 font-mono text-xs text-muted-foreground tabular-nums">
            {formatTimeRange(slot.startTime, slot.endTime)}
          </span>
          <div className="min-w-0 space-y-1 text-sm">
            {slot.series ? (
              <Link
                href={`/series/${slot.series.slug}`}
                className="font-medium underline-offset-3 hover:underline"
              >
                {slot.series.title}
              </Link>
            ) : slot.listedTitle ? (
              <p className="font-medium whitespace-pre-wrap">{slot.listedTitle}</p>
            ) : (
              <p className="text-muted-foreground italic">Sin título registrado</p>
            )}
            {/* Kept verbatim: it's the title exactly as printed in the source. */}
            {slot.series && slot.listedTitle && (
              <p className="text-xs whitespace-pre-wrap text-muted-foreground">
                En la fuente: “{slot.listedTitle}”
              </p>
            )}
            {(slot.block || slot.feed) && (
              <p className="text-xs text-muted-foreground">
                {slot.block && (
                  <Link
                    href={blockHref(slot.block)}
                    className="underline underline-offset-3 hover:text-foreground"
                  >
                    {slot.block.name}
                  </Link>
                )}
                {slot.block && slot.feed && " · "}
                {slot.feed && `Señal ${slot.feed}`}
              </p>
            )}
            <SourceNote name={slot.sourceName} url={slot.sourceUrl} />
          </div>
        </li>
      ))}
    </ol>
  );
}
