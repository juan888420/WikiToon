import type { FeedData } from "../../../src/lib/import/programming";

// Broadcast feeds documented by the programming sources. A record gets a feed only when its source
// states it or it was deduced with evidence (see the grid and day notes); otherwise its feed is null.
export const feeds: FeedData[] = [
  {
    channelSlug: "cartoon-network",
    slug: "latinoamerica",
    name: "Señal Latinoamérica",
    referenceTimeZone: "America/Argentina/Buenos_Aires",
    sourceName: "Horario oficial de cartoonnetworkla.com (13/10/2005): \"Buenos Aires City local time\"",
    sourceUrl: "https://web.archive.org/web/20051013061542/http://alt.cartoonnetworkla.com:80/english/schedule",
    notes: "Señal general del sitio oficial, publicada en hora de Buenos Aires. El área exacta que cubría no está documentada.",
  },
  {
    channelSlug: "cartoon-network",
    slug: "mexico",
    name: "Señal México",
    region: "México",
    sourceName: "Grilla para México del sitio oficial (2/10/2000)",
    sourceUrl: "https://web.archive.org/web/20001018141410/http://www.cartoonnetworkla.com/spanish/toonin/grid.html",
    notes: "El sitio oficial y la Cartoon Network Wiki publican una grilla aparte para México.",
  },
  {
    channelSlug: "boomerang",
    slug: "latinoamerica",
    name: "Señal Latinoamérica",
    referenceTimeZone: "America/Argentina/Buenos_Aires",
    sourceName: "Horario oficial de Boomerang (8/7/2005): \"Buenos Aires City local time\"",
    sourceUrl: "https://web.archive.org/web/20050708073627/http://alt.cartoonnetworkla.com/english/boomerang/schedule",
    notes:
      "Una sola señal en 2003-2005: la guía de Cablevisión Monterrey muestra la misma grilla con la diferencia horaria exacta entre Buenos Aires y Monterrey.",
  },
  {
    channelSlug: "fox-kids",
    slug: "sur",
    name: "Zona Sur",
    sourceName: "ANMTV: Se cumplen 17 años del cierre de Fox Kids y el estreno de Jetix",
    sourceUrl: "https://www.anmtvla.com/2021/08/se-cumplen-17-anos-del-cierre-de-fox.html",
    notes: "Los países que cubría no están documentados en las fuentes revisadas.",
  },
  {
    channelSlug: "fox-kids",
    slug: "norte",
    name: "Zona Norte",
    region: "México",
    sourceName: "ANMTV: Se cumplen 17 años del cierre de Fox Kids y el estreno de Jetix",
    sourceUrl: "https://www.anmtvla.com/2021/08/se-cumplen-17-anos-del-cierre-de-fox.html",
    notes: "ANMTV la llama \"Zona Norte o México\"; sus bloques iban una hora después que en la Zona Sur.",
  },
  {
    channelSlug: "jetix",
    slug: "sur",
    name: "Zona Sur",
    sourceName: "ANMTV: Se cumplen 17 años del cierre de Fox Kids y el estreno de Jetix",
    sourceUrl: "https://www.anmtvla.com/2021/08/se-cumplen-17-anos-del-cierre-de-fox.html",
    notes: "Heredada de Fox Kids. Los países que cubría no están documentados en las fuentes revisadas.",
  },
  {
    channelSlug: "jetix",
    slug: "norte",
    name: "Zona Norte",
    region: "México",
    sourceName: "ANMTV: Se cumplen 17 años del cierre de Fox Kids y el estreno de Jetix",
    sourceUrl: "https://www.anmtvla.com/2021/08/se-cumplen-17-anos-del-cierre-de-fox.html",
    notes: "Heredada de Fox Kids; ANMTV la llama \"Zona Norte o México\".",
  },
];
