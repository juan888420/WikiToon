import Link from "next/link";
import { SourceNote } from "@/components/source-note";
import type { TimelineEventType } from "@/generated/prisma/enums";
import { blockHref } from "@/lib/data/blocks";
import type { TimelineEventItem } from "@/lib/data/timeline";
import { formatPartialDate } from "@/lib/format";

const EVENT_TYPE_LABELS: Record<TimelineEventType, string> = {
  CHANNEL_LAUNCH: "Lanzamiento de canal",
  CHANNEL_CLOSURE: "Cierre de canal",
  REBRAND: "Cambio de imagen",
  BLOCK_LAUNCH: "Estreno de bloque",
  BLOCK_END: "Fin de bloque",
  SERIES_PREMIERE: "Estreno de serie",
  SERIES_FINALE: "Final de serie",
  OTHER: "Otro",
};

const relatedLinkClass = "underline underline-offset-3 hover:text-foreground";

type TimelineListProps = {
  /** Events already in chronological order (see `listTimelineEvents`). */
  events: TimelineEventItem[];
  /** Hides the channel link inside that channel's own page. */
  hideChannel?: boolean;
};

export function TimelineList({ events, hideChannel = false }: TimelineListProps) {
  const byYear = new Map<number, TimelineEventItem[]>();
  for (const event of events) byYear.set(event.year, [...(byYear.get(event.year) ?? []), event]);

  return (
    <div className="space-y-10">
      {[...byYear].map(([year, yearEvents]) => (
        <section key={year}>
          <h3 className="text-2xl font-semibold tracking-tight tabular-nums">{year}</h3>
          <ol className="mt-4 divide-y divide-border/60 rounded-xl border border-border/60">
            {yearEvents.map((event) => {
              const related = [
                !hideChannel &&
                  event.channel && (
                    <Link
                      key="channel"
                      href={`/canales/${event.channel.slug}`}
                      className={relatedLinkClass}
                    >
                      {event.channel.name}
                    </Link>
                  ),
                event.series && (
                  <Link key="series" href={`/series/${event.series.slug}`} className={relatedLinkClass}>
                    {event.series.title}
                  </Link>
                ),
                event.block && (
                  <Link key="block" href={blockHref(event.block)} className={relatedLinkClass}>
                    {event.block.name}
                  </Link>
                ),
              ].filter(Boolean);

              return (
                <li
                  key={event.id}
                  className="grid gap-x-6 gap-y-1 p-4 sm:grid-cols-[8rem_1fr] sm:p-5"
                >
                  <span className="pt-0.5 text-xs text-muted-foreground tabular-nums">
                    {formatPartialDate(event.year, event.month, event.day)}
                  </span>
                  <div className="min-w-0 space-y-1.5">
                    <p className="text-xs font-medium tracking-wider text-primary uppercase">
                      {EVENT_TYPE_LABELS[event.type]}
                    </p>
                    <h4 className="font-medium">{event.title}</h4>
                    {event.description && (
                      <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
                        {event.description}
                      </p>
                    )}
                    {related.length > 0 && (
                      <p className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        {related}
                      </p>
                    )}
                    <SourceNote name={event.sourceName} url={event.sourceUrl} />
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
