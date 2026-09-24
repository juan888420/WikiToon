import Link from "next/link";
import { SeriesPoster } from "@/components/series/series-poster";
import type { SeriesListItem } from "@/lib/data/series";
import { formatYearRange } from "@/lib/format";

type SeriesCardProps = {
  series: SeriesListItem;
  /** Replaces the default TMDB original-run years (e.g. with years on a specific channel). */
  caption?: string | null;
};

export function SeriesCard({ series, caption }: SeriesCardProps) {
  const text =
    caption === undefined ? formatYearRange(series.firstAirYear, series.lastAirYear) : caption;

  return (
    <Link
      href={`/series/${series.slug}`}
      className="group block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <SeriesPoster
        posterPath={series.posterPath}
        title={series.title}
        sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 45vw"
        className="transition-[border-color,filter] group-hover:border-foreground/20 group-hover:brightness-90"
      />
      <div className="mt-3 space-y-0.5 px-0.5">
        <h2 className="text-sm leading-snug font-medium text-foreground/90 group-hover:text-foreground">
          {series.title}
        </h2>
        {text && <p className="text-xs text-muted-foreground tabular-nums">{text}</p>}
      </div>
    </Link>
  );
}
