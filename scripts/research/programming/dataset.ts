// Which grids and days make up the programming dataset, how each is read from its extracted source,
// and which primary sources each grid is cross-checked against. build-dataset.ts turns this into
// prisma/data/programming. Feeds are hand-curated in prisma/data/programming/feeds.ts.

/**
 * A primary source a grid is compared with, slot by slot. Matching slots become VERIFIED; different
 * ones keep their certainty and get a note naming what the primary source lists instead.
 * - weekly: a weekly grid of the same period (weekday by weekday).
 * - daily: one dated day. `offsetMinutes` converts grid times to the source's clock (grid time +
 *   offset = source time) and must be explained by a documented time-zone or feed relationship.
 *   `dayStart` is where the source's day begins ("00:00" for calendar-day guides, "06:00" for
 *   broadcast-day pages). `translate` maps an English source title to the grid's Spanish title,
 *   checked by hand.
 */
export type Check =
  | { kind: "weekly"; source: string; gridIndex: number }
  | { kind: "daily"; source: string; offsetMinutes: number; dayStart: "00:00" | "06:00"; translate?: Record<string, string> };

export type GridSpec = {
  slug: string;
  channelSlug: string;
  feedSlug: string | null;
  validFrom: string;
  validTo: string;
  timeZone: string | null;
  from:
    | { kind: "wiki"; key: string; table: string; detailTable?: string }
    | { kind: "blog"; key: string }
    | { kind: "official-weekly"; key: string; gridIndex: number };
  checks: Check[];
  notes: string;
  conflictsWith?: string[];
};

const BUENOS_AIRES = "America/Argentina/Buenos_Aires";

/**
 * Titles a primary source writes differently (abbreviated, in English or misspelled) from the grid
 * it checks, each checked by hand to be the same program. Used only for cross-checking; it never
 * links a title to a series.
 */
export const EQUIVALENTS: Record<string, string> = {
  "Cartoon-A-Doodle-Doo": "Cartoon a Doodle-Do",
  "Increíbles Aventuras J. Quest": "Las increíbles aventuras de Jonny Quest",
  "J. Quest": "Las increíbles aventuras de Jonny Quest",
  "Chicos Tom y Jerry": "Los pequeños Tom y Jerry",
  "2 Perros Tontos": "Dos perros tontos",
  "Fantasma Espacio C a C": "Fantasma del espacio de costa a costa",
  "La Familia Addams": "Los locos Addams",
  "Pinky, Elmyra y Cerebro": "Pinky, Elvira y Cerebro",
  "Toons Mundialmente Famos": "Toons mundialmente famosos",
  "Huck Hound": "Huckleberry Hound",
  "La Máscar": "La máscara",
  "Aces del Peligro": "Ases del Peligro",
  "Ricochet Rabbit": "Conejo Ricochet",
  "Las aventuras de P B y J Otter": "Las Aventuras de PB&J Otter",
  "Súper escuadrón ciber monos HF": "Súper Escuadrón Ciber Monos Híper Fuerza Ya!",
  "Fairly Odd parents": "Los Padrinos Mágicos",
  "Chalkzone": "Zona Tiza",
  "Yvon of the Yunkon": "Yvon del Yukon",
};

const CN_2005_10_13: Record<string, string> = {
  "Courage the Cowardly Dog": "Coraje, el perro cobarde",
  "The Grim Adventures of Billy & Mandy": "Las sombrías aventuras de Billy y Mandy",
  "Small World": "Pequeño Mundo",
  "Sagwa, the Chinese Siamese Cat": "Sagwa, la gatita siamesa",
  "Berenstein Bears": "Los osos Berenstains",
  "Jacob Two Two": "Jacobo Dos Dos",
  "Powerpuff Girls": "Las chicas superpoderosas",
  "Cartoon Cartoons Show": "El show de Cartoon Cartoons",
  "Codename: Kids Next Door": "KND: Los chicos del barrio",
  "Ed, Edd 'N Eddy": "Ed, Edd y Eddy",
  "Evil con Carne": "Malo con Carne",
  "Xiaolin Showdown": "Duelo Xiaolin",
  "What's New Scooby Doo?": "¿Qué hay de nuevo, Scooby-Doo?",
  "Winx Club, The": "El club Winx",
  "Pet Alien": "Mascotas extraterrestres",
  "Phantom Investigators": "Investigadores de fantasmas",
  "Bugs & Daffy": "Bugs Bunny y el Pato Lucas",
  "Tom & Jerry": "Tom y Jerry",
  "Ghost Stories": "Historias de fantasmas",
  "Yu- Yu Hakusho": "Yu-Yu Hakusho",
  "Knights of the Zodiac": "Los caballeros del zodiaco",
  "Sakura Wars": "La guerra de Sakura",
  "Batman of the Future": "Batman del futuro",
  "Teen Titans": "Los jóvenes titanes",
  "Superman: The Animated Series": "Superman: La serie animada",
  "X-Men Evolution": "Hombre-X: Evolución",
  "Batman: The Animated Series": "Batman: La serie animada",
  "Jackie Chan Adventures": "Las aventuras de Jackie Chan",
  "Acme Hour": "Hora ACME",
};

const BOOMERANG_2005_07_08: Record<string, string> = {
  "Hanna Barbera Cartoon Rodeo": "Rodeo Cartoon de Hanna-Barbera",
  "Kimba, the While Lion": "Kimba, el león blanco",
  "The Underdog Show": "El show de Underdog",
  "Garfield and Friends": "Garfield y sus amigos",
  "Boomerang Hour Featuring Popeye, the Sailor": "Popeye, el marino",
  "Boomeraction - Speed Racer": "Meteoro",
  "Boomeraction - Extreme Ghostbusters": "Cazafantasmas: La nueva generación",
  "The Flintstones": "Los Picapiedra",
  "The Jetsons": "Los Supersónicos",
};

/** Cablevisión guide on the same weekday, same clock: no offset. */
const cvCheck = (key: string, offsetMinutes = 0): Check => ({ kind: "daily", source: `cablevision/${key}`, offsetMinutes, dayStart: "00:00" });

export const gridSpecs: GridSpec[] = [
  {
    slug: "cartoon-network-2000-10-latinoamerica-wiki",
    channelSlug: "cartoon-network",
    feedSlug: "latinoamerica",
    validFrom: "2000-10",
    validTo: "2000-10",
    timeZone: null,
    from: { kind: "wiki", key: "cartoon-network-2000-10", table: "Latinoamérica" },
    checks: [{ kind: "weekly", source: "official/cartoon-network-2000-10-grid", gridIndex: 0 }],
    conflictsWith: ["cartoon-network-2000-10-latinoamerica-oficial"],
    notes:
      "Tabla \"Latinoamérica\" de la wiki. Conflicto con la grilla oficial archivada (grilla cartoon-network-2000-10-latinoamerica-oficial): " +
      "de lunes a viernes de 15:00 a 17:00 la wiki lista Scooby-Doo dos horas (la página dice que fue un \"mes enfocado en Scooby-Doo\"), " +
      "y la grilla oficial lista Beetlejuice, Las Aventuras de Tiny Toons, Scooby Doo Donde Estás? y Que Historia Tan Maravillosa. " +
      "La grilla oficial no tiene fecha de vigencia (captura del 18/10/2000); ninguna de las dos se da por correcta. " +
      "La página no indica zona horaria.",
  },
  {
    slug: "cartoon-network-2000-10-latinoamerica-oficial",
    channelSlug: "cartoon-network",
    feedSlug: "latinoamerica",
    validFrom: "2000-10",
    validTo: "2000-10",
    timeZone: null,
    from: { kind: "official-weekly", key: "cartoon-network-2000-10-grid", gridIndex: 0 },
    checks: [],
    conflictsWith: ["cartoon-network-2000-10-latinoamerica-wiki"],
    notes:
      "Grilla general del sitio oficial cartoonnetworkla.com (sección Toon In), captura del 18/10/2000; no indica fecha de vigencia ni zona horaria. " +
      "La misma página publica aparte una grilla para México fechada el 2/10/2000. " +
      "Conflicto con la versión de la wiki (cartoon-network-2000-10-latinoamerica-wiki) de lunes a viernes de 15:00 a 17:00.",
  },
  {
    slug: "cartoon-network-2000-10-mexico-wiki",
    channelSlug: "cartoon-network",
    feedSlug: "mexico",
    validFrom: "2000-10",
    validTo: "2000-10",
    timeZone: null,
    from: { kind: "wiki", key: "cartoon-network-2000-10", table: "México" },
    checks: [{ kind: "weekly", source: "official/cartoon-network-2000-10-grid", gridIndex: 1 }],
    notes:
      "Tabla \"México\" de la wiki. Es parcial: solo lista las franjas propias de la señal México y no se completa con la tabla general. " +
      "Contrastada con la grilla para México del sitio oficial (fechada el 2/10/2000).",
  },
  {
    slug: "cartoon-network-2002-11-wiki",
    channelSlug: "cartoon-network",
    feedSlug: null,
    validFrom: "2002-11",
    validTo: "2002-11",
    timeZone: null,
    from: { kind: "wiki", key: "cartoon-network-2002-11", table: "Programación regular" },
    checks: [],
    notes:
      "La wiki no separa señales este mes ni indica zona horaria. La captura oficial que cita es de febrero de 2003, así que no verifica este mes.",
  },
  {
    slug: "cartoon-network-2005-10-latinoamerica-wiki",
    channelSlug: "cartoon-network",
    feedSlug: "latinoamerica",
    validFrom: "2005-10",
    validTo: "2005-10",
    timeZone: BUENOS_AIRES,
    from: { kind: "wiki", key: "cartoon-network-2005-10", table: "Cartoon Network", detailTable: "Adult Swim" },
    checks: [{ kind: "daily", source: "official/cartoon-network-2005-10-13", offsetMinutes: 0, dayStart: "06:00", translate: CN_2005_10_13 }],
    notes:
      "Tabla principal de la wiki, con el detalle de su tabla \"Adult Swim\" en las franjas que cubre. " +
      "Hora de la Ciudad de Buenos Aires según el horario oficial del jueves 13/10/2005, que verifica las franjas de ese jueves.",
  },
  {
    slug: "boomerang-2003-12-latinoamerica-wiki",
    channelSlug: "boomerang",
    feedSlug: "latinoamerica",
    validFrom: "2003-12",
    validTo: "2003-12",
    timeZone: BUENOS_AIRES,
    from: { kind: "wiki", key: "boomerang-2003-12", table: "Programación regular" },
    // The Monterrey guide lists the same feed three hours earlier (Buenos Aires UTC-3, Monterrey UTC-6).
    checks: [cvCheck("boomerang-2003-12-11", -180)],
    notes:
      "Ciclo de 8 horas repetido a las 06:00, 14:00 y 22:00. Hora de Buenos Aires: coincide con la guía de Cablevisión Monterrey del jueves 11/12/2003 " +
      "con 3 horas de diferencia (la diferencia horaria de ese mes), así que es la misma señal.",
  },
  {
    slug: "boomerang-2005-07-latinoamerica-wiki",
    channelSlug: "boomerang",
    feedSlug: "latinoamerica",
    validFrom: "2005-07",
    validTo: "2005-07",
    timeZone: BUENOS_AIRES,
    from: { kind: "wiki", key: "boomerang-2005-07", table: "Programación regular" },
    checks: [{ kind: "daily", source: "official/boomerang-2005-07-08", offsetMinutes: 0, dayStart: "06:00", translate: BOOMERANG_2005_07_08 }],
    notes:
      "Ciclo de 8 horas repetido a las 06:00, 14:00 y 22:00. Hora de Buenos Aires según el horario oficial del viernes 8/7/2005, que verifica las franjas de ese viernes. " +
      "Rodeo Cartoon de Hanna-Barbera figura solo como bloque, sin sus series.",
  },
  {
    slug: "fox-kids-2001-08-blog",
    channelSlug: "fox-kids",
    feedSlug: null,
    validFrom: "2001-08",
    validTo: "2001-08",
    timeZone: null,
    from: { kind: "blog", key: "fox-kids-2001-08" },
    checks: [],
    notes: "Grilla del blog; indica como origen foxkidstv.com sin enlazar capturas. No hay fuente primaria del período para contrastar. Señal y zona horaria no indicadas.",
  },
  {
    slug: "fox-kids-2003-01-sur-blog",
    channelSlug: "fox-kids",
    feedSlug: "sur",
    validFrom: "2003-01",
    validTo: "2003-01",
    timeZone: null,
    from: { kind: "blog", key: "fox-kids-2003-01" },
    checks: [],
    notes:
      "Grilla del blog; indica como origen foxkidstv.com sin enlazar capturas. Zona Sur deducida: las grillas del blog de enero 2003 y enero 2004 coinciden " +
      "en orden con las guías de Cablevisión Monterrey (Zona Norte) de diciembre 2003 y febrero 2004 con 4 horas de diferencia. Zona horaria no indicada.",
  },
  {
    slug: "jetix-2005-08-blog",
    channelSlug: "jetix",
    feedSlug: null,
    validFrom: "2005-08",
    validTo: "2005-08",
    timeZone: null,
    from: { kind: "blog", key: "jetix-2005-08" },
    checks: [cvCheck("jetix-2005-09-02")],
    notes:
      "Grilla del blog; indica como origen jetixtv.com. Contrastada con la guía de Cablevisión Monterrey del viernes 2/9/2005 (mes siguiente) a la misma hora; " +
      "solo ese viernes puede quedar verificado. Señal no indicada.",
  },
  {
    slug: "nickelodeon-2001-08-blog",
    channelSlug: "nickelodeon",
    feedSlug: null,
    validFrom: "2001-08",
    validTo: "2001-08",
    timeZone: null,
    from: { kind: "blog", key: "nickelodeon-2001-08" },
    checks: [],
    notes: "Grilla del blog; no indica origen. No hay fuente primaria del período para contrastar. Señal y zona horaria no indicadas.",
  },
  {
    slug: "nickelodeon-2004-01-blog",
    channelSlug: "nickelodeon",
    feedSlug: null,
    validFrom: "2004-01",
    validTo: "2004-01",
    timeZone: null,
    from: { kind: "blog", key: "nickelodeon-2004-01" },
    checks: [cvCheck("nickelodeon-2004-02-20")],
    notes:
      "Grilla del blog; indica como origen mundonick.com. Contrastada con la guía de Cablevisión Monterrey del viernes 20/2/2004 (mes siguiente) a la misma hora. Señal no indicada.",
  },
  {
    slug: "disney-channel-2004-01-blog",
    channelSlug: "disney-channel",
    feedSlug: null,
    validFrom: "2004-01",
    validTo: "2004-01",
    timeZone: null,
    from: { kind: "blog", key: "disney-channel-2004-01" },
    checks: [cvCheck("disney-channel-2004-02-20")],
    notes:
      "Grilla del blog; indica como origen disneylatino.com. Contrastada con la guía de Cablevisión Monterrey del viernes 20/2/2004 (mes siguiente) a la misma hora. Señal no indicada.",
  },
  {
    slug: "disney-channel-2005-08-blog",
    channelSlug: "disney-channel",
    feedSlug: null,
    validFrom: "2005-08",
    validTo: "2005-08",
    timeZone: null,
    from: { kind: "blog", key: "disney-channel-2005-08" },
    checks: [],
    notes:
      "Grilla del blog; indica como origen disneylatino.com. La guía de Cablevisión del 2/9/2005 coincide solo con 1 hora de diferencia no explicada, " +
      "así que no se usa para verificar. Señal y zona horaria no indicadas.",
  },
  {
    slug: "discovery-kids-2004-01-blog",
    channelSlug: "discovery-kids",
    feedSlug: null,
    validFrom: "2004-01",
    validTo: "2004-01",
    timeZone: null,
    from: { kind: "blog", key: "discovery-kids-2004-01" },
    checks: [cvCheck("discovery-kids-2004-02-20")],
    notes:
      "Grilla del blog; indica como origen discoverykidslatino.com. Contrastada con la guía de Cablevisión Monterrey del viernes 20/2/2004 (mes siguiente) a la misma hora. Señal no indicada.",
  },
  {
    slug: "discovery-kids-2005-08-blog",
    channelSlug: "discovery-kids",
    feedSlug: null,
    validFrom: "2005-08",
    validTo: "2005-08",
    timeZone: null,
    from: { kind: "blog", key: "discovery-kids-2005-08" },
    checks: [],
    notes: "Grilla del blog; indica como origen tudiscoverykids.com. No hay guía primaria del mismo mes o el siguiente. Señal y zona horaria no indicadas.",
  },
];

/** Feed of each channel's Cablevisión days, when documented; the rest stay null. */
export const cablevisionFeeds: Record<string, { feedSlug: string; reason: string }> = {
  "fox-kids": { feedSlug: "norte", reason: "ANMTV identifica la Zona Norte con México." },
  jetix: { feedSlug: "norte", reason: "ANMTV identifica la Zona Norte con México." },
  boomerang: { feedSlug: "latinoamerica", reason: "Boomerang tenía una sola señal: coincide con la grilla en hora de Buenos Aires con la diferencia horaria exacta." },
};
