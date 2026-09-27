import type { Metadata } from "next";
import { ChannelCard } from "@/components/channels/channel-card";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { listChannels } from "@/lib/data/channels";
import { formatList, pluralize } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const channels = await listChannels();
  const names = channels.map((channel) => channel.name);
  return pageMetadata({
    title: "Canales infantiles de Latinoamérica",
    description: `${formatList(names)}: series y bloques de su señal latinoamericana en los 90 y 2000.`,
    path: "/canales",
  });
}

export default async function ChannelsPage() {
  const channels = await listChannels();

  return (
    <Container className="py-10 sm:py-14">
      <header className="mb-8 sm:mb-10">
        <p className="text-xs font-medium tracking-wider text-primary uppercase">Catálogo</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Canales</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {pluralize(channels.length, "canal", "canales")} en el archivo.
        </p>
      </header>

      {channels.length === 0 ? (
        <EmptyState title="Todavía no hay canales en el archivo." />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <li key={channel.slug}>
              <ChannelCard channel={channel} />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
