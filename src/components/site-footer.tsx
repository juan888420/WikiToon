import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/60">
      <Container className="flex flex-col gap-2 py-8 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <p>WikiToon. Archivo de la televisión infantil animada de Latinoamérica.</p>
        <p>
          Metadata e imágenes de series:{" "}
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-3 hover:text-foreground"
          >
            TMDB
          </a>
          . Este producto usa la API de TMDB pero no está respaldado ni certificado por TMDB.
        </p>
      </Container>
    </footer>
  );
}
