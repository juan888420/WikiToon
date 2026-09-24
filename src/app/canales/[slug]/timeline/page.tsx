import type { Metadata } from "next";
import { EmptyState } from "@/components/empty-state";
import { TimelineList } from "@/components/timeline/timeline-list";
import { getChannelBySlug } from "@/lib/data/channels";
import { listTimelineEvents } from "@/lib/data/timeline";
import { requireChannel } from "../require-channel";

export async function generateMetadata({
  params,
}: PageProps<"/canales/[slug]/timeline">): Promise<Metadata> {
  const channel = await getChannelBySlug((await params).slug);
  return channel ? { title: `Timeline · ${channel.name}` } : {};
}

export default async function ChannelTimelinePage({
  params,
}: PageProps<"/canales/[slug]/timeline">) {
  const channel = await requireChannel(params);
  const events = await listTimelineEvents({ channelId: channel.id });

  return (
    <section>
      <h2 className="sr-only">Timeline</h2>
      {events.length === 0 ? (
        <EmptyState
          title={`Todavía no hay eventos documentados para ${channel.name}.`}
          description="Los hitos históricos aparecerán aquí cuando se registren con su fuente."
        />
      ) : (
        <TimelineList events={events} hideChannel />
      )}
    </section>
  );
}
