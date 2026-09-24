import type { Metadata } from "next";
import { EmptyState } from "@/components/empty-state";
import { ScheduleDayLinks } from "@/components/schedule/schedule-day-links";
import { getChannelBySlug } from "@/lib/data/channels";
import { listChannelScheduleDays } from "@/lib/data/schedules";
import { pluralize } from "@/lib/format";
import { requireChannel } from "../require-channel";

export async function generateMetadata({
  params,
}: PageProps<"/canales/[slug]/programacion">): Promise<Metadata> {
  const channel = await getChannelBySlug((await params).slug);
  return channel ? { title: `Programación · ${channel.name}` } : {};
}

export default async function ChannelSchedulePage({
  params,
}: PageProps<"/canales/[slug]/programacion">) {
  const channel = await requireChannel(params);
  const days = await listChannelScheduleDays(channel.id);

  return (
    <section>
      <h2 className="sr-only">Programación</h2>
      {days.length === 0 ? (
        <EmptyState
          title={`Todavía no hay programación documentada para ${channel.name}.`}
          description="Las parrillas históricas aparecerán aquí cuando se registren con su fuente."
        />
      ) : (
        <>
          <p className="mb-6 text-sm text-muted-foreground">
            {pluralize(days.length, "fecha documentada", "fechas documentadas")}. Horarios en hora
            local, tal como los publicó cada fuente.
          </p>
          <ScheduleDayLinks channelSlug={channel.slug} days={days} />
        </>
      )}
    </section>
  );
}
