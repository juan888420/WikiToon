import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { SeriesDetail } from "@/lib/data/series";
import { formatAirDate, pluralize } from "@/lib/format";

type Season = SeriesDetail["seasons"][number];

function seasonLabel(season: Season) {
  return season.name ?? (season.number === 0 ? "Especiales" : `Temporada ${season.number}`);
}

export function SeriesSeasons({ seasons }: { seasons: Season[] }) {
  if (seasons.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border px-6 py-10 text-center text-sm text-muted-foreground">
        Sin temporadas registradas.
      </p>
    );
  }

  return (
    <Accordion
      multiple
      // Closed panels stay in the DOM, so the browser's find-in-page can reach every episode.
      hiddenUntilFound
      defaultValue={[seasons[0].id]}
      className="rounded-xl border border-border"
    >
      {seasons.map((season) => (
        <AccordionItem key={season.id} value={season.id} className="border-border px-4 sm:px-5">
          <AccordionTrigger className="items-center py-4 hover:no-underline">
            <span className="flex flex-1 flex-wrap items-baseline gap-x-3 gap-y-0.5 pr-3">
              <span className="font-medium">{seasonLabel(season)}</span>
              <span className="text-xs font-normal text-muted-foreground tabular-nums">
                {[season.airYear, pluralize(season.episodes.length, "episodio", "episodios")]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            {season.episodes.length === 0 ? (
              <div className="pb-2 text-muted-foreground">Sin episodios registrados.</div>
            ) : (
              <ol className="divide-y divide-border/60 border-t border-border/60">
                {season.episodes.map((episode) => (
                  <li
                    key={episode.id}
                    className="grid grid-cols-[2.75rem_1fr] gap-x-3 py-3 sm:grid-cols-[2.75rem_1fr_auto]"
                  >
                    <span className="pt-0.5 font-mono text-xs text-muted-foreground tabular-nums">
                      E{String(episode.number).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      {episode.title ? (
                        <div className="text-foreground">{episode.title}</div>
                      ) : (
                        <div className="text-muted-foreground italic">Sin título</div>
                      )}
                      {episode.overview && (
                        <div className="mt-1 leading-relaxed text-muted-foreground">
                          {episode.overview}
                        </div>
                      )}
                    </div>
                    {episode.originalAirDate && (
                      <time
                        dateTime={episode.originalAirDate}
                        className="col-start-2 mt-1 text-xs text-muted-foreground tabular-nums sm:col-start-auto sm:mt-0 sm:pt-0.5 sm:text-right"
                      >
                        {formatAirDate(episode.originalAirDate)}
                      </time>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
