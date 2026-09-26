// Every source behind the first programming dataset. `fetch.ts` downloads them into
// .cache/research/programming (gitignored), `extract.ts` normalizes them into
// docs/research/data/programming, and `build-dataset.ts` turns those into prisma/data/programming.
// To add a period, add its sources here and its grid to dataset.ts.

export type WikiSource = { key: string; page: string };
export type BlogSource = { key: string; url: string };
export type CablevisionSource = { key: string; channelSlug: string; timestamp: string; page: string };
export type OfficialSource = { key: string; kind: "weekly" | "daily"; timestamp: string; url: string };

/** Cartoon Network Wiki (Fandom, es) grid pages. */
export const wikiSources: WikiSource[] = [
  { key: "cartoon-network-2000-10", page: "Grilla de Cartoon Network, Octubre de 2000" },
  { key: "cartoon-network-2002-11", page: "Grilla de Cartoon Network, Noviembre de 2002" },
  { key: "cartoon-network-2005-10", page: "Grilla de Cartoon Network, Octubre de 2005" },
  { key: "boomerang-2003-12", page: "Grilla de Boomerang, Diciembre de 2003" },
  { key: "boomerang-2005-07", page: "Grilla de Boomerang, Julio de 2005" },
];

/** Foro Grilla de Canales posts. */
export const blogSources: BlogSource[] = [
  { key: "fox-kids-2001-08", url: "https://forogrilladecanales.blogspot.com/2025/03/programacion-de-fox-kids-latinoamerica.html" },
  { key: "fox-kids-2003-01", url: "https://forogrilladecanales.blogspot.com/2022/12/programacion-de-fox-kids-enero-2003.html" },
  { key: "jetix-2005-08", url: "https://forogrilladecanales.blogspot.com/2023/10/programacion-de-jetix-agosto-2005.html" },
  { key: "nickelodeon-2001-08", url: "https://forogrilladecanales.blogspot.com/2025/01/programacion-de-nickelodeon.html" },
  { key: "nickelodeon-2004-01", url: "https://forogrilladecanales.blogspot.com/2021/02/programacion-de-nickelodeon-enero-2004.html" },
  { key: "disney-channel-2004-01", url: "https://forogrilladecanales.blogspot.com/2021/02/programacion-de-disney-channel-enero.html" },
  { key: "disney-channel-2005-08", url: "https://forogrilladecanales.blogspot.com/2023/10/programacion-de-disney-channel-agosto.html" },
  { key: "discovery-kids-2004-01", url: "https://forogrilladecanales.blogspot.com/2021/03/programacion-de-discovery-kids-enero.html" },
  { key: "discovery-kids-2005-08", url: "https://forogrilladecanales.blogspot.com/2023/09/programacion-de-discovery-kids-agosto.html" },
];

const cv = (channelSlug: string, date: string, timestamp: string, page: string): CablevisionSource => ({
  key: `${channelSlug}-${date}`,
  channelSlug,
  timestamp,
  page,
});

/** Cablevisión Monterrey daily guides (http://www.cablevision.com.mx/programacion/canales/<page>). */
export const cablevisionSources: CablevisionSource[] = [
  cv("cartoon-network", "2005-03-04", "20050307054519", "canal106.htm"),
  cv("cartoon-network", "2005-04-21", "20050421175622", "canal106.htm"),
  cv("cartoon-network", "2005-09-23", "20050924151906", "canal106.htm"),
  cv("boomerang", "2003-12-11", "20031212124821", "Canal112.htm"),
  cv("boomerang", "2005-03-04", "20050307055630", "Canal112.htm"),
  cv("boomerang", "2005-04-18", "20050421173755", "Canal112.htm"),
  cv("boomerang", "2005-09-02", "20050905125334", "Canal112.htm"),
  cv("fox-kids", "2003-12-11", "20031212124226", "Canal107.htm"),
  cv("jetix", "2005-03-04", "20050307054801", "Canal107.htm"),
  cv("jetix", "2005-04-18", "20050421172849", "Canal107.htm"),
  cv("jetix", "2005-09-02", "20050903202309", "Canal107.htm"),
  cv("nickelodeon", "2004-02-20", "20040220200726", "Canal109.htm"),
  cv("nickelodeon", "2004-04-07", "20040411090221", "Canal109.htm"),
  cv("nickelodeon", "2004-06-04", "20040605163146", "Canal109.htm"),
  cv("nickelodeon", "2004-08-09", "20040809225103", "Canal109.htm"),
  cv("nickelodeon", "2004-10-21", "20041022192739", "Canal109.htm"),
  cv("nickelodeon", "2004-12-07", "20041207194817", "Canal109.htm"),
  cv("disney-channel", "2004-02-20", "20040220200955", "Canal114.htm"),
  cv("disney-channel", "2004-04-07", "20040411090721", "Canal114.htm"),
  cv("disney-channel", "2004-06-04", "20040605164706", "Canal114.htm"),
  cv("disney-channel", "2004-08-09", "20040809225258", "Canal114.htm"),
  cv("disney-channel", "2004-10-21", "20041022195407", "Canal114.htm"),
  cv("disney-channel", "2004-12-07", "20041207195901", "Canal114.htm"),
  cv("disney-channel", "2005-03-04", "20050307055740", "Canal114.htm"),
  cv("disney-channel", "2005-04-18", "20050421173902", "Canal114.htm"),
  cv("disney-channel", "2005-09-02", "20050904014750", "Canal114.htm"),
  cv("discovery-kids", "2004-02-20", "20040220200612", "Canal108.htm"),
  cv("discovery-kids", "2004-06-04", "20040605162921", "Canal108.htm"),
  cv("discovery-kids", "2004-10-21", "20041022191503", "Canal108.htm"),
  cv("discovery-kids", "2005-03-04", "20050307054916", "Canal108.htm"),
  cv("discovery-kids", "2005-04-18", "20050421173058", "Canal108.htm"),
];

/** Archived pages of the channels' own sites. */
export const officialSources: OfficialSource[] = [
  { key: "cartoon-network-2000-10-grid", kind: "weekly", timestamp: "20001018141410", url: "http://www.cartoonnetworkla.com/spanish/toonin/grid.html" },
  { key: "cartoon-network-2005-10-13", kind: "daily", timestamp: "20051013061542", url: "http://alt.cartoonnetworkla.com:80/english/schedule" },
  { key: "boomerang-2005-07-08", kind: "daily", timestamp: "20050708073627", url: "http://alt.cartoonnetworkla.com/english/boomerang/schedule" },
];

export const waybackUrl = (timestamp: string, url: string) => `https://web.archive.org/web/${timestamp}/${url}`;
export const waybackRawUrl = (timestamp: string, url: string) => `https://web.archive.org/web/${timestamp}id_/${url}`;
export const cablevisionUrl = (page: string) => `http://www.cablevision.com.mx:80/programacion/canales/${page}`;
export const wikiUrl = (page: string) => `https://cartoonnetwork.fandom.com/es/wiki/${encodeURIComponent(page.replace(/ /g, "_")).replace(/%2C/g, ",")}`;
