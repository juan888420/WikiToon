import type { Metadata } from "next";
import { EmptyState } from "@/components/empty-state";
import { SeriesCard } from "@/components/series/series-card";
import { getChannelBySlug, listChannelSeries } from "@/lib/data/channels";
import { formatRuns } from "@/lib/format";
import { requireChannel } from "./require-channel";

export async function generateMetadata({ params }: PageProps<"/canales/[slug]">): Promise<Metadata> {
  const channel = await getChannelBySlug((await params).slug);
  return channel ? { title: channel.name } : {};
}

export default async function ChannelSeriesPage({ params }: PageProps<"/canales/[slug]">) {
  const channel = await requireChannel(params);
  const entries = await listChannelSeries(channel.id);

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
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {entries.map(({ series, runs }) => (
              <li key={series.slug}>
                <SeriesCard series={series} caption={formatRuns(runs)} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
