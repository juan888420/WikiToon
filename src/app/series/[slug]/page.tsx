import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { SeriesPoster } from "@/components/series/series-poster";
import { SeriesSeasons } from "@/components/series/series-seasons";
import { getSeriesBySlug, listSeriesSlugs } from "@/lib/data/series";
import { formatDate, formatYearRange } from "@/lib/format";

// Series only change through import scripts, so every known slug is prerendered at build time.
// Unknown slugs get a real 404 status; rendering them on demand would stream a 200 before
// `notFound()` runs, because of the loading boundary.
export const dynamicParams = false;

export function generateStaticParams() {
  return listSeriesSlugs();
}

export async function generateMetadata({
  params,
}: PageProps<"/series/[slug]">): Promise<Metadata> {
  const series = await getSeriesBySlug((await params).slug);
  if (!series) return {};
  return { title: series.title, description: series.overview ?? undefined };
}

export default async function SeriesDetailPage({ params }: PageProps<"/series/[slug]">) {
  const series = await getSeriesBySlug((await params).slug);
  if (!series) notFound();

  const regularSeasons = series.seasons.filter((season) => season.number > 0);
  const specials = series.seasons.find((season) => season.number === 0);
  const facts = [
    {
      label: "Emisión original",
      value: formatYearRange(series.firstAirYear, series.lastAirYear) ?? "Sin dato",
    },
    { label: "Temporadas", value: regularSeasons.length },
    {
      label: "Episodios",
      value: regularSeasons.reduce((total, season) => total + season.episodes.length, 0),
    },
    ...(specials ? [{ label: "Especiales", value: specials.episodes.length }] : []),
  ];

  return (
    <Container className="py-8 sm:py-12">
      <Link
        href="/series"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon aria-hidden className="size-4" />
        Series
      </Link>

      <article className="mt-6">
        <div className="grid gap-8 md:grid-cols-[240px_1fr] md:gap-10 lg:grid-cols-[280px_1fr]">
          <SeriesPoster
            posterPath={series.posterPath}
            title={series.title}
            sizes="(min-width: 1024px) 280px, (min-width: 768px) 240px, 60vw"
            priority
            className="mx-auto w-3/5 max-w-60 md:w-full md:max-w-none"
          />

          <div className="min-w-0">
            <p className="text-xs font-medium tracking-wider text-primary uppercase">Serie</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {series.title}
            </h1>
            {series.originalTitle && series.originalTitle !== series.title && (
              <p className="mt-1 text-muted-foreground">{series.originalTitle}</p>
            )}

            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label} className="rounded-lg border border-border px-3 py-2.5">
                  <dt className="text-xs text-muted-foreground">{fact.label}</dt>
                  <dd className="mt-0.5 text-sm font-medium tabular-nums">{fact.value}</dd>
                </div>
              ))}
            </dl>

            {series.overview && (
              <section className="mt-8">
                <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Sinopsis
                </h2>
                <p className="mt-2 max-w-prose leading-relaxed text-foreground/90">
                  {series.overview}
                </p>
              </section>
            )}

            {series.tmdbId !== null && (
              <p className="mt-8 text-xs text-muted-foreground">
                Metadata e imágenes:{" "}
                <a
                  href={`https://www.themoviedb.org/tv/${series.tmdbId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-0.5 underline underline-offset-3 hover:text-foreground"
                >
                  TMDB #{series.tmdbId}
                  <ArrowUpRightIcon aria-hidden className="size-3" />
                </a>
                {series.tmdbSyncedAt && <> · Sincronizado el {formatDate(series.tmdbSyncedAt)}</>}
              </p>
            )}
          </div>
        </div>

        <section className="mt-12 sm:mt-16">
          <h2 className="text-lg font-semibold tracking-tight">Temporadas y episodios</h2>
          <p className="mt-1 mb-5 text-sm text-muted-foreground">
            Las fechas corresponden al estreno original según TMDB, no a su emisión en
            Latinoamérica.
          </p>
          <SeriesSeasons seasons={series.seasons} />
        </section>
      </article>
    </Container>
  );
}
