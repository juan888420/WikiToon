import type { Metadata } from "next";
import Link from "next/link";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { ScheduleDayLinks } from "@/components/schedule/schedule-day-links";
import { listScheduleChannels } from "@/lib/data/schedules";
import { pluralize } from "@/lib/format";

export const metadata: Metadata = {
  title: "Programación",
  description: "Parrillas históricas documentadas en el archivo de WikiToon.",
};

export default async function SchedulePage() {
  const channels = await listScheduleChannels();
  const dayCount = channels.reduce((total, { days }) => total + days.length, 0);

  return (
    <Container className="py-10 sm:py-14">
      <header className="mb-8 sm:mb-10">
        <p className="text-xs font-medium tracking-wider text-primary uppercase">Archivo</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Programación</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {channels.length === 0
            ? "Parrillas históricas por canal y fecha."
            : `${pluralize(dayCount, "fecha documentada", "fechas documentadas")} en ${pluralize(channels.length, "canal", "canales")}. Horarios en hora local, tal como los publicó cada fuente.`}
        </p>
      </header>

      {channels.length === 0 ? (
        <EmptyState
          title="Todavía no hay programación documentada."
          description="Las parrillas históricas aparecerán aquí cuando se registren con su fuente."
        />
      ) : (
        <div className="space-y-10">
          {channels.map(({ channel, days }) => (
            <section key={channel.slug}>
              <div className="mb-4 flex items-center gap-3">
                <ChannelLogo
                  logoPath={channel.logoPath}
                  name={channel.name}
                  sizes="36px"
                  className="size-9 rounded-md [&_span]:text-[11px]"
                />
                <div>
                  <h2 className="font-medium">
                    <Link
                      href={`/canales/${channel.slug}/programacion`}
                      className="underline-offset-3 hover:underline"
                    >
                      {channel.name}
                    </Link>
                  </h2>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    {pluralize(days.length, "fecha", "fechas")}
                  </p>
                </div>
              </div>
              <ScheduleDayLinks channelSlug={channel.slug} days={days} />
            </section>
          ))}
        </div>
      )}
    </Container>
  );
}
