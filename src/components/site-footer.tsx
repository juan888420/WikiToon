import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { WORDMARK } from "@/lib/brand";

const NAV_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/canales", label: "Canales" },
  { href: "/series", label: "Series" },
  { href: "/bloques", label: "Bloques" },
  { href: "/programacion", label: "Programación" },
] as const;

const INSTAGRAM = { handle: "juanpurr", url: "https://www.instagram.com/juanpurr/" };

const linkClass = "transition-colors hover:text-foreground";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/60">
      <Container className="py-10 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:gap-12">
          <div className="max-w-sm">
            <Link href="/canales" className="inline-flex">
              <Image
                src={WORDMARK.src}
                alt="WikiToon"
                width={WORDMARK.width}
                height={WORDMARK.height}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Archivo de las series, los bloques y la programación de los canales infantiles y
              juveniles de Latinoamérica en los años 90 y 2000. No aloja ni transmite video.
            </p>
          </div>

          <nav aria-label="Secciones">
            <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Secciones
            </h2>
            {/* Two columns on phones keep the list short; one column beside the text on wider screens. */}
            <ul className="mt-3 grid grid-cols-2 gap-x-6 text-sm text-muted-foreground sm:grid-cols-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={`block py-1.5 ${linkClass}`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Redes
            </h2>
            <a
              href={INSTAGRAM.url}
              target="_blank"
              rel="noreferrer"
              className={`mt-3 inline-flex items-center gap-1 py-1.5 text-sm text-muted-foreground ${linkClass}`}
            >
              Instagram
              <span className="text-muted-foreground/70">@{INSTAGRAM.handle}</span>
              <ArrowUpRightIcon aria-hidden className="size-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-10 space-y-2 border-t border-border/60 pt-6 text-xs leading-relaxed text-muted-foreground">
          {/* TMDB's terms require its logo, less prominent than the site's own brand, and this notice. */}
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noreferrer"
            className="inline-flex py-1 opacity-80 transition-opacity hover:opacity-100"
          >
            <Image src="/logos/tmdb.svg" alt="TMDB" width={274} height={36} className="h-3 w-auto" />
          </a>
          <p className="max-w-3xl text-pretty">
            Metadata e imágenes de series: TMDB. Este sitio usa TMDB y las API de TMDB, pero no está
            respaldado, certificado ni aprobado de ningún modo por TMDB. Las marcas y logos de canales
            y bloques pertenecen a sus respectivos dueños.
          </p>
          <p>© {new Date().getFullYear()} WikiToon</p>
        </div>
      </Container>
    </footer>
  );
}
