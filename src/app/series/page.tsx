import type { Metadata } from "next";
import { Container } from "@/components/container";
import { SeriesCard } from "@/components/series/series-card";
import { listSeries } from "@/lib/data/series";
import { pluralize } from "@/lib/format";

export const metadata: Metadata = {
  title: "Series",
  description: "Series animadas del archivo de WikiToon.",
};

export default async function SeriesPage() {
  const series = await listSeries();

  return (
    <Container className="py-10 sm:py-14">
      <header className="mb-8 sm:mb-10">
        <p className="text-xs font-medium tracking-wider text-primary uppercase">Catálogo</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Series</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {pluralize(series.length, "serie", "series")} en el archivo.
        </p>
      </header>

      {series.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
          <p className="text-sm font-medium">Todavía no hay series en el archivo.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Las series aparecerán aquí cuando se importen.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {series.map((item) => (
            <li key={item.slug}>
              <SeriesCard series={item} />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
