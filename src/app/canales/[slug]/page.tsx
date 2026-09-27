import type { Metadata } from "next";
import { EmptyState } from "@/components/empty-state";
import { SeriesBrowser } from "@/components/series/series-browser";
import { blockHref, listChannelBlocks } from "@/lib/data/blocks";
import { getChannelBySlug, listChannelSeries } from "@/lib/data/channels";
import { formatList, formatRuns, pluralize } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { requireChannel } from "./require-channel";

export async function generateMetadata({ params }: PageProps<"/canales/[slug]">): Promise<Metadata> {
  const channel = await getChannelBySlug((await params).slug);
  if (!channel) return {};
  const blocks = await listChannelBlocks(channel.id);
  const blockText = blocks.length
    ? ` y sus bloques ${formatList(blocks.map((block) => block.name))}`
    : "";
  return pageMetadata({
    title: blocks.length ? `${channel.name}: series y bloques` : `Series de ${channel.name}`,
    description: `${pluralize(channel.counts.series, "serie", "series")} de ${channel.name} en Latinoamérica${blockText}, en el archivo de WikiToon.`,
    path: `/canales/${channel.slug}`,
  });
}

export default async function ChannelSeriesPage({ params }: PageProps<"/canales/[slug]">) {
  const channel = await requireChannel(params);
  const [entries, blocks] = await Promise.all([
    listChannelSeries(channel.id),
    listChannelBlocks(channel.id),
  ]);

  return (
    <section>
      <h2 className="sr-only">Series</h2>
      {entries.length === 0 ? (
        <EmptyState title={`Todavía no hay series vinculadas a ${channel.name}.`} />
      ) : (
        <>
          <p className="mb-6 text-sm text-muted-foreground">
            Series vinculadas a {channel.name} en el catálogo. Los años de emisión en el canal se
            mostrarán cuando estén documentados.
          </p>
          <SeriesBrowser
            items={entries.map(({ series, runs, blockSlugs }) => ({
              series,
              caption: formatRuns(runs),
              channelSlugs: [channel.slug],
              blockSlugs,
            }))}
            blocks={blocks.map((block) => ({
              slug: block.slug,
              name: block.name,
              description: block.description,
              href: blockHref(block),
              channelSlugs: block.channels.map((option) => option.slug),
            }))}
          />
        </>
      )}
    </section>
  );
}
