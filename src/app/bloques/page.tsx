import type { Metadata } from "next";
import { BlockCard } from "@/components/blocks/block-card";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { listBlocks } from "@/lib/data/blocks";
import { pluralize } from "@/lib/format";

export const metadata: Metadata = {
  title: "Bloques",
  description: "Bloques de programación del archivo de WikiToon.",
};

export default async function BlocksPage() {
  const blocks = await listBlocks();

  return (
    <Container className="py-10 sm:py-14">
      <header className="mb-8 sm:mb-10">
        <p className="text-xs font-medium tracking-wider text-primary uppercase">Catálogo</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Bloques</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {pluralize(blocks.length, "bloque", "bloques")} en el archivo.
        </p>
      </header>

      <section>
        <h2 className="sr-only">Todos los bloques</h2>
        {blocks.length === 0 ? (
          <EmptyState
            title="Todavía no hay bloques documentados."
            description="Los bloques de programación aparecerán aquí cuando se registren con su fuente."
          />
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {blocks.map((block) => (
              <li key={block.id}>
                <BlockCard block={block} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </Container>
  );
}
