import type { Metadata } from "next";

export const SITE_NAME = "WikiToon";

export const SITE_DESCRIPTION =
  "Archivo de las series, los bloques y la programación de los canales infantiles y juveniles de Latinoamérica en los años 90 y 2000.";

/**
 * Absolute base for canonical URLs, Open Graph, the sitemap and robots. Set NEXT_PUBLIC_SITE_URL
 * to the production domain; on Vercel it falls back to the project's production domain, and
 * locally to the dev server.
 */
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  return new URL("http://localhost:3000");
}

export const siteUrl = resolveSiteUrl();

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

type PageMetadataInput = {
  /** Page title without the site name; the root layout's template appends it. */
  title: string;
  description: string;
  /** Canonical path, e.g. "/series/samurai-x". */
  path: string;
  /** Absolute image URL for link previews (e.g. a TMDB poster). */
  image?: { url: string; alt: string; width?: number; height?: number };
  /** Keeps the page out of search results (it still passes links). */
  noIndex?: boolean;
};

/**
 * Per-page metadata. Next merges `openGraph` and `twitter` shallowly, so a page that set only
 * `title` would share the layout's preview title; every page builds all of them here instead.
 */
export function pageMetadata({ title, description, path, image, noIndex }: PageMetadataInput): Metadata {
  const fullTitle = `${title} · ${SITE_NAME}`;
  const images = image ? [image] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "es_419",
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: { card: "summary", title: fullTitle, description, images },
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}

/** Shortens text for a meta description at a word boundary (TMDB overviews can be long). */
export function truncateDescription(text: string, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:.]+$/, "")}…`;
}

/** Serializes JSON-LD for a `<script>` tag, escaping `<` as Next's JSON-LD guide recommends. */
export function jsonLd(data: Record<string, unknown>) {
  return { __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c") };
}
