import type { Metadata } from "next";
import { BlockCard } from "@/components/blocks/block-card";
import { EmptyState } from "@/components/empty-state";
import { listChannelBlocks } from "@/lib/data/blocks";
import { getChannelBySlug } from "@/lib/data/channels";
import { requireChannel } from "../require-channel";

export async function generateMetadata({
  params,
}: PageProps<"/canales/[slug]/bloques">): Promise<Metadata> {
  const channel = await getChannelBySlug((await params).slug);
  return channel ? { title: `Bloques · ${channel.name}` } : {};
}

export default async function ChannelBlocksPage({ params }: PageProps<"/canales/[slug]/bloques">) {
  const channel = await requireChannel(params);
  const blocks = await listChannelBlocks(channel.id);

  return (
    <section>
      <h2 className="sr-only">Bloques</h2>
      {blocks.length === 0 ? (
        <EmptyState
          title={`Todavía no hay bloques documentados para ${channel.name}.`}
          description="Los bloques de programación aparecerán aquí cuando se registren con su fuente."
        />
      ) : (
        <ul className="space-y-3">
          {blocks.map((block) => (
            <li key={block.id}>
              <BlockCard block={block} showChannels={false} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
