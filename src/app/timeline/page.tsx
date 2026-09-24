import type { Metadata } from "next";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { TimelineList } from "@/components/timeline/timeline-list";
import { listTimelineEvents } from "@/lib/data/timeline";
import { pluralize } from "@/lib/format";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Hitos documentados de la televisión infantil de Latinoamérica.",
};

export default async function TimelinePage() {
  const events = await listTimelineEvents();

  return (
    <Container className="py-10 sm:py-14">
      <header className="mb-8 sm:mb-10">
        <p className="text-xs font-medium tracking-wider text-primary uppercase">Archivo</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Timeline</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {events.length === 0
            ? "Hitos de canales, bloques y series, en orden cronológico."
            : `${pluralize(events.length, "evento documentado", "eventos documentados")}, en orden cronológico.`}
        </p>
      </header>

      <section>
        <h2 className="sr-only">Eventos</h2>
        {events.length === 0 ? (
          <EmptyState
            title="Todavía no hay eventos documentados."
            description="Los hitos históricos aparecerán aquí cuando se registren con su fuente."
          />
        ) : (
          <TimelineList events={events} />
        )}
      </section>
    </Container>
  );
}
