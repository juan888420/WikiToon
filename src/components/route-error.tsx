"use client";

import { useEffect } from "react";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

export type RouteErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export function RouteError({ error, retry }: RouteErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-20">
      <div className="mx-auto max-w-md rounded-xl border border-border px-6 py-10 text-center">
        <p className="text-sm font-medium">No se pudo cargar esta sección del archivo.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Ocurrió un error al leer los datos. Puedes intentarlo de nuevo.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => retry()}>
          Reintentar
        </Button>
      </div>
    </Container>
  );
}
