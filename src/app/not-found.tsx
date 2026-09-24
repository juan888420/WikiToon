import Link from "next/link";
import { Container } from "@/components/container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="font-mono text-xs text-primary">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">No encontramos esta página</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Puede que la sección todavía no exista en el archivo o que el enlace sea incorrecto.
      </p>
      <Link href="/series" className={buttonVariants({ variant: "outline", className: "mt-6" })}>
        Ver series
      </Link>
    </Container>
  );
}
