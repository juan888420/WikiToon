// Brand assets in `public/brand/` (sources in public/brand/SOURCES.md). Sizes are the SVG viewBox
// and the PNG pixels, so `next/image` keeps the aspect ratio.
export const WORDMARK = { src: "/brand/wikitoon-wordmark.svg", width: 485, height: 118 } as const;

export const OG_IMAGE = {
  url: "/brand/og.png",
  width: 1200,
  height: 630,
  alt: "WikiToon: series, bloques, canales y programación de la TV infantil de Latinoamérica",
} as const;
