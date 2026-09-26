import type { Metadata } from "next";
import { Container } from "@/components/container";
import { SeriesBrowser } from "@/components/series/series-browser";
import { blockHref, listBlocks } from "@/lib/data/blocks";
import { listChannels } from "@/lib/data/channels";
import { listSeriesWithLinks } from "@/lib/data/series";
import { pluralize } from "@/lib/format";

export const metadata: Metadata = {
  title: "Series",
  description: "Series animadas del archivo de WikiToon.",
};

export default async function SeriesPage() {
  const [items, channels, blocks] = await Promise.all([
    listSeriesWithLinks(),
    listChannels(),
    listBlocks(),
  ]);

  return (
    <Container className="py-10 sm:py-14">
      <header className="mb-8 sm:mb-10">
        <p className="text-xs font-medium tracking-wider text-primary uppercase">Catálogo</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Series</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {pluralize(items.length, "serie", "series")} en el archivo.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
          <p className="text-sm font-medium">Todavía no hay series en el archivo.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Las series aparecerán aquí cuando se importen.
          </p>
        </div>
      ) : (
        <SeriesBrowser
          items={items}
          channels={channels.map(({ slug, name }) => ({ slug, name }))}
          blocks={blocks.map((block) => ({
            slug: block.slug,
            name: block.name,
            description: block.description,
            href: blockHref(block),
            channelSlugs: block.channels.map((channel) => channel.slug),
          }))}
        />
      )}
    </Container>
  );
}
