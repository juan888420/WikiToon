import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { SeriesCard } from "@/components/series/series-card";
import { SourceNote } from "@/components/source-note";
import { getBlock, listBlockParams } from "@/lib/data/blocks";
import { formatRuns, formatYearRange, pluralize } from "@/lib/format";

// Blocks only change through data scripts, so every known block is prerendered and unknown ones 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return listBlockParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/bloques/[canal]/[slug]">): Promise<Metadata> {
  const { canal, slug } = await params;
  const block = await getBlock(canal, slug);
  if (!block) return {};
  return {
    title: `${block.name} · ${block.channel.name}`,
    description: block.description ?? undefined,
  };
}

export default async function BlockPage({ params }: PageProps<"/bloques/[canal]/[slug]">) {
  const { canal, slug } = await params;
  const block = await getBlock(canal, slug);
  if (!block) notFound();

  const years = formatYearRange(block.startYear, block.endYear);

  return (
    <Container className="py-8 sm:py-12">
      <Link
        href="/bloques"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon aria-hidden className="size-4" />
        Bloques
      </Link>

      <article className="mt-6">
        <header>
          <p className="text-xs font-medium tracking-wider text-primary uppercase">Bloque</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {block.name}
          </h1>
          <Link
            href={`/canales/${block.channel.slug}`}
            className="mt-3 inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChannelLogo
              logoPath={block.channel.logoPath}
              name={block.channel.name}
              sizes="32px"
              className="size-8 rounded-md [&_span]:text-[10px]"
            />
            {block.channel.name}
          </Link>
        </header>

        <dl className="mt-6 grid max-w-xl grid-cols-2 gap-3">
          {years && (
            <div className="rounded-lg border border-border px-3 py-2.5">
              <dt className="text-xs text-muted-foreground">Años documentados</dt>
              <dd className="mt-0.5 text-sm font-medium tabular-nums">{years}</dd>
            </div>
          )}
          <div className="rounded-lg border border-border px-3 py-2.5">
            <dt className="text-xs text-muted-foreground">Series</dt>
            <dd className="mt-0.5 text-sm font-medium tabular-nums">{block.series.length}</dd>
          </div>
        </dl>

        {block.description && (
          <section className="mt-8">
            <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Descripción
            </h2>
            <p className="mt-2 max-w-prose leading-relaxed text-foreground/90">
              {block.description}
            </p>
          </section>
        )}

        <div className="mt-8">
          <SourceNote name={block.sourceName} url={block.sourceUrl} />
        </div>

        <section className="mt-12 sm:mt-16">
          <h2 className="text-lg font-semibold tracking-tight">Series en su programación</h2>
          {block.series.length === 0 ? (
            <div className="mt-5">
              <EmptyState title="Todavía no hay series documentadas en este bloque." />
            </div>
          ) : (
            <>
              <p className="mt-1 mb-5 text-sm text-muted-foreground">
                {pluralize(block.series.length, "serie", "series")}. Los años en el bloque se
                muestran solo cuando están documentados.
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {block.series.map(({ series, runs }) => (
                  <li key={series.slug}>
                    <SeriesCard series={series} caption={formatRuns(runs)} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </article>
    </Container>
  );
}
