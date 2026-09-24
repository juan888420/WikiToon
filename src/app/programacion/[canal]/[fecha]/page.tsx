import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { Container } from "@/components/container";
import { ScheduleSlotList } from "@/components/schedule/schedule-slot-list";
import { getScheduleDay, listScheduleDayParams } from "@/lib/data/schedules";
import { formatScheduleDate, pluralize } from "@/lib/format";

// Only dates with real schedule rows are generated; any other channel/date pair is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return listScheduleDayParams();
}

const AIR_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

async function loadDay(params: PageProps<"/programacion/[canal]/[fecha]">["params"]) {
  const { canal, fecha } = await params;
  return AIR_DATE_PATTERN.test(fecha) ? getScheduleDay(canal, fecha) : null;
}

export async function generateMetadata({
  params,
}: PageProps<"/programacion/[canal]/[fecha]">): Promise<Metadata> {
  const day = await loadDay(params);
  if (!day) return {};
  return { title: `Programación de ${day.channel.name} · ${formatScheduleDate(day.airDate)}` };
}

export default async function ScheduleDayPage({ params }: PageProps<"/programacion/[canal]/[fecha]">) {
  const day = await loadDay(params);
  if (!day) notFound();

  return (
    <Container className="py-8 sm:py-12">
      <Link
        href="/programacion"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon aria-hidden className="size-4" />
        Programación
      </Link>

      <header className="mt-6">
        <p className="text-xs font-medium tracking-wider text-primary uppercase">Programación</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          <time dateTime={day.airDate}>{formatScheduleDate(day.airDate, "long")}</time>
        </h1>
        <Link
          href={`/canales/${day.channel.slug}/programacion`}
          className="mt-3 inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChannelLogo
            logoPath={day.channel.logoPath}
            name={day.channel.name}
            sizes="32px"
            className="size-8 rounded-md [&_span]:text-[10px]"
          />
          {day.channel.name}
        </Link>
      </header>

      <section className="mt-10">
        <h2 className="sr-only">Emisiones</h2>
        <p className="mb-5 text-sm text-muted-foreground">
          {pluralize(day.slots.length, "emisión", "emisiones")}. Horarios en hora local, tal como
          los publicó cada fuente.
        </p>
        <ScheduleSlotList slots={day.slots} />
      </section>
    </Container>
  );
}
