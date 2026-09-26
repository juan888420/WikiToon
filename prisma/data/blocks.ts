import type { BlockData } from "../../src/lib/import/blocks";

// Curated blocks, loaded with `npm run db:load:blocks` after the seed and series imports.
// Years and sources stay out until they are documented; series are referenced by TMDB id.
// A block may start empty. Series associations are the ones a source supports plus the ones the
// project owner decides, which are marked as such. Discovery Kids has no blocks because its Latin
// American blocks are not documented; don't fill them with guessed names. Block names without a
// description were provided by the project owner; their description stays null until documented.
// `slug` is globally unique: a block can run on several channels (`channelSlugs`), which is how the
// Fox Kids blocks that continued after the Jetix rebrand are recorded, as one block on both.
// `logoPath` is optional and must point to a local asset under `public/logos/blocks/`, named
// `{block-slug}`. Document its source in `public/logos/blocks/SOURCES.md`, which also lists why
// each pending block has no logo yet. Blocks without it show initials.
export const blocks: BlockData[] = [
  {
    slug: "cartoon-cartoons",
    name: "Cartoon Cartoons",
    channelSlugs: ["cartoon-network"],
    description: "Sello de las series animadas originales de Cartoon Network.",
    logoPath: "/logos/blocks/cartoon-cartoons.png",
    seriesTmdbIds: [
      4229, // El laboratorio de Dexter
      607, // Las chicas superpoderosas
      2405, // Johnny Bravo
      3611, // La Vaca y el Pollito
      606, // Ed, Edd y Eddy
      2085, // Coraje, el perro cobarde
      177, // Soy la Comadreja
      4350, // Mike, Lu y Og
      // Also in English Wikipedia's list of series branded Cartoon Cartoons (US evidence, accepted
      // for blocks). Samurai Jack is explicitly not one: it "did not bear the moniker".
      1477, // Sheep en la gran ciudad
      4314, // El Escuadrón del Tiempo
      897, // Las sombrías aventuras de Billy y Mandy
      4246, // Malo Con Carne
      1789, // Jones, El Robot
      2660, // KND: Los chicos del barrio
    ],
  },
  {
    slug: "toonami",
    name: "Toonami",
    channelSlugs: ["cartoon-network"],
    description: "Bloque de series de acción y anime.",
    logoPath: "/logos/blocks/toonami.svg",
    // Catalog series in Spanish Wikipedia's lineup of Toonami (Latinoamérica), 2002-2007, then
    // those in English Wikipedia's list of Toonami programs (US evidence, accepted for blocks).
    // Anime without a Cartoon Network link (Bleach, Cowboy Bebop) can't be listed here.
    seriesTmdbIds: [
      60572, // Pokémon
      35610, // Inuyasha
      12971, // Dragon Ball Z
      42444, // Los Caballeros del Zodiaco
      1618, // Liga de la Justicia
      668, // X-Men: Evolución
      3122, // Star Wars: Clone Wars
      30669, // Yu Yu Hakusho
      2723, // Samurai Jack
      12609, // Dragon Ball
      46260, // Naruto
      37854, // One Piece
      604, // Los jóvenes titanes
      84200, // Liga de la Justicia Ilimitada
      513, // Batman del futuro
      2098, // Batman: la serie animada
      472, // Megas XLR
      // Added by the project owner's decision; they aired on Animax, Warner Channel or streaming.
      13916, // Death Note
      30984, // Bleach
      95479, // Jujutsu Kaisen
    ],
  },
  {
    slug: "adult-swim",
    name: "Adult Swim",
    channelSlugs: ["cartoon-network"],
    description: "Bloque nocturno de animación para adultos de Cartoon Network, emitido en Latinoamérica entre 2005 y 2008.",
    logoPath: "/logos/blocks/adult-swim.svg",
    // Launch lineup from the 2005 Cartoon Network Latin America press release, plus the later
    // additions documented for the Cartoon Network years (2005-2008). Series the block aired only
    // on I.Sat or later channels are not listed: those channels are not in the catalog, and the US
    // Adult Swim catalog is not the Latin American block's lineup.
    seriesTmdbIds: [
      416, // Harvey Birdman, Abogado
      251, // Aqua Teen Hunger Force
      334, // Laboratorio Submarino 2021
      481, // El Show de Brak
      2342, // Secundaria de clones
      2073, // Mission Hill
      4999, // Bob y Margaret
      2274, // Películas caseras
      3547, // Universitarios
      709, // Pollo Robot
      3043, // Ratón Esponja
      2798, // Fantasma del Espacio de Costa a Costa
      2568, // Los Oblongs
      // Documented in Cartoon Network Latin America's Adult Swim schedules (2006-2008).
      2418, // Los hermanos Venture
      539, // Los calamareños
      // Added by the project owner's decision; they aired on Adult Swim elsewhere (I.Sat, TBS,
      // Warner Channel, Locomotion for Cowboy Bebop), not in this block.
      60625, // Rick y Morty
      653, // Metalocalypse
      1542, // Frisky Dingo
      292, // Moral Orel
      11936, // Minoriteam
      40064, // Black Dynamite
      30991, // Cowboy Bebop
    ],
  },
  {
    slug: "nicktoons",
    name: "Nicktoons",
    channelSlugs: ["nickelodeon"],
    description: "Sello de las series animadas originales de Nickelodeon.",
    logoPath: "/logos/blocks/nicktoons.png",
    seriesTmdbIds: [
      3022, // Rugrats: Aventuras en Pañales
      537, // ¡Oye, Arnold!
      387, // Bob Esponja
      4630, // Los Padrinos Mágicos
      657, // La vida moderna de Rocko
      1567, // CatDog
      2408, // Los Thornberrys
      3793, // Invasor Zim
      2129, // Las Aventuras de Jimmy Neutron: El Niño Genio
      2309, // Danny Phantom
      246, // Avatar: La leyenda de Aang
      // Also in English Wikipedia's list of Nicktoons (US evidence, accepted for blocks).
      384, // Doug
      504, // Ren y Stimpy
      2429, // Aaahh!!! Monstruos de verdad
      3579, // Los Castores Cascarrabias
      2009, // Rocket Power
      544, // KaBlam!
      1760, // Ginger
      4413, // Zona Tiza
      130, // Rugrats Crecidos
      178, // La robot adolescente
      3805, // Catscratch
      4511, // The X's
      6046, // El Tigre: las aventuras de Manny Rivera
      9921, // La granja
      5340, // Tak
      15641, // The Mighty B!
      7869, // Los Pingüinos de Madagascar
    ],
  },
  {
    slug: "nick-at-nite",
    name: "Nick at Nite",
    channelSlugs: ["nickelodeon"],
    description: "Bloque nocturno de Nickelodeon con comedias clásicas de acción en vivo.",
    logoPath: "/logos/blocks/nick-at-nite.svg",
    // Live action only, by the project owner's decision: the 2006-2010 lineup documented by ANMTV
    // without the animated series it aired from April 2010, plus All That, which is in English
    // Wikipedia's list of Nick at Nite programs (US evidence, accepted for blocks).
    seriesTmdbIds: [
      4482, // Hechizada
      14009, // Los locos Addams
      1712, // Los Munsters
      1660, // Mi bella genio
      2552, // Mork & Mindy
      54, // ¡Ay, cómo duele crecer!
      1786, // Dos perfectos desconocidos
      4658, // ALF
      2410, // Blanco y negro
      1803, // Los hechos de la vida
      249, // Clarissa lo explica todo
      1835, // Kenan y Kel
      1892, // El Príncipe de Bel-Air
      4455, // Súper Agente 86
      3845, // Días felices
      2038, // Drake & Josh
      1778, // Zoey 101
      1600, // Manual de supervivencia escolar de Ned
      3814, // All That
      // Added by the project owner's decision.
      2352, // La niñera
      52, // El show de los 70
    ],
  },
  {
    slug: "zapping-zone",
    name: "Zapping Zone",
    channelSlugs: ["disney-channel"],
    description: "Bloque de Disney Channel con conductores que presentaban las series de acción en vivo del canal.",
    logoPath: "/logos/blocks/zapping-zone.png",
    // Live action only, by the project owner's decision: the catalog's live-action series in the
    // "Series emitidas" list of Spanish Wikipedia's Zapping Zone article.
    seriesTmdbIds: [
      3498, // Los Hechiceros de Waverly Place
      21641, // ¡Buena suerte Charlie!
      4610, // Hannah Montana
      4602, // Es tan Raven
      3200, // Mano a mano
      4575, // Lizzie McGuire
      33873, // Sunny entre estrellas
      12712, // JONAS (listed as Jonas L.A.; TMDB covers both)
      4605, // Zack y Cody: Gemelos en acción
      15079, // Zack y Cody: Gemelos a bordo
      1528, // Phil del futuro
      119, // Cory en la Casa Blanca
      33213, // A todo ritmo
      // Added by the project owner's decision (Disney XD originals in the US).
      31628, // Par de Reyes
      17519, // Zeke y Luther
    ],
  },
  // Fox Kids was succeeded by Jetix, and these blocks continued across the rebrand, so each one is
  // a single block on both channels rather than two independent blocks. Which catalog series aired
  // in them comes from Wikipedia and ANMTV, plus the additions the project owner decided (marked in
  // each block).
  {
    slug: "mysteria",
    name: "Mysteria",
    channelSlugs: ["fox-kids", "jetix"],
    description: "Bloque de series de misterio y fenómenos paranormales, estrenado el 3 de marzo de 2001 los sábados por la noche.",
    logoPath: "/logos/blocks/mysteria.png",
    // Catalog series in ANMTV's article on the Mysteria block series.
    seriesTmdbIds: [
      5835, // Escalofríos
      6, // El Colegio del Agujero Negro
      1954, // Qué raro
      15851, // Ciencia Traviesa
      599, // Los misterios del oráculo
      9277, // Escuela de espanto (project owner's decision)
      // Added from the project owner's list (most also in Spanish Wikipedia's Mysteria lineup).
      43219, // Los Misterios de Moville
      21036, // Los nuevos locos Addams
      318109, // Real Scary Stories
      4289, // El mundo secreto de Alex Mack
      635, // Las aventuras de Shirley Holmes
      4045, // Eerie, Indiana
      2928, // The Hardy Boys y Nancy Drew
    ],
  },
  {
    slug: "insomnio",
    name: "Insomnio",
    channelSlugs: ["fox-kids", "jetix"],
    description: "Bloque de madrugada, de 0:00 a 6:00, con programas clásicos y nuevos.",
    logoPath: "/logos/blocks/insomnio.png",
    // Catalog series in the Insomnio lineup of Spanish Wikipedia's Fox Kids article. Its "Los locos
    // Adams" is the 1964 series; "Los nuevos locos Addams" (1998, Mysteria) is not in the catalog.
    seriesTmdbIds: [
      43219, // Los Misterios de Moville
      14009, // Los locos Addams
      75216, // Mortadelo y Filemón
      4956, // Dilbert
      1269, // El Hombre-Araña y sus Sorprendentes Amigos
      9277, // Escuela de espanto (project owner's decision)
      // Added from the project owner's list, which joins Spanish Wikipedia's Insomnio lineup with
      // its Invasión Animé one.
      325574, // Los Tres Chiflados
      4681, // El Zorro
      2287, // Batman (1966)
      117523, // El Gordo y el Flaco
      1712, // Los Munsters
      2901, // Los 4 Fantásticos (1994)
      31654, // Digimon
      9302, // Digimon Tamers
      8991, // Digimon Frontier
      15130, // Monster Rancher
      8908, // Flint, el detective del tiempo
      34786, // DinoZaurs
      21736, // Patlabor
      21175, // Shinzo
      19260, // Los Caballeros del Mundo Mon
      11235, // Medabots
      203937, // La Autopista
      27615, // Heavy Gear
      20469, // Transformers: Robots in Disguise
      54728, // BeyBlade
      10926, // Sonic X
      40143, // Shaman King
      14891, // Kirby de las Estrellas
      9550, // Kid Músculo
      5653, // Megaman NT Warrior
    ],
  },
  {
    slug: "quien-tiene-el-control",
    name: "¿Quién tiene el control?",
    channelSlugs: ["fox-kids", "jetix"],
    description: "Maratón mensual en la que el público elegía por votación en la web qué serie se emitía.",
    logoPath: "/logos/blocks/quien-tiene-el-control.png",
    // A monthly vote-driven marathon, not a fixed lineup. Series listed by the project owner's
    // decision; only Dragon Booster (2005), Power Rangers, Pucca and Los Padrinos Mágicos (2009)
    // are documented in a vote.
    seriesTmdbIds: [
      31654, // Digimon
      9302, // Digimon Tamers
      8991, // Digimon Frontier
      54728, // BeyBlade
      11235, // Medabots
      40143, // Shaman King
      10926, // Sonic X
      14891, // Kirby de las Estrellas
      20469, // Transformers: Robots in Disguise
      2328, // Power Rangers
      15130, // Monster Rancher
      5653, // Megaman NT Warrior
      // Documented vote options: Dragon Booster (2005); Pucca and Los Padrinos Mágicos (2009).
      2826, // Dragon Booster
      6782, // Pucca
      4630, // Los Padrinos Mágicos
      // The rest of the channels' popular animated action, anime and comedy series, added by the
      // project owner's decision on genre alone.
      4574, // X-Men
      10079, // El Hombre-Araña: Sin Límites
      2284, // Las Tortugas Ninja
      2808, // Tres Espías Sin Límite
      137, // W.I.T.C.H.
      3809, // Yin, Yang, Yo!
      20993, // Galactik Football
      2557, // Academia de Titanes
      1903, // A.T.O.M.
      1960, // Dave el bárbaro
      9550, // Kid Músculo
      3787, // Chaotic
      6549, // Wolverine y los X-Men
      4335, // Oban Star Racers
      3428, // Súper Escuadrón Ciber Monos Hiper Fuerza ¡Ya!
      240, // Las aventuras de Jackie Chan
    ],
  },
  {
    slug: "doble-carga",
    name: "Doble Carga",
    channelSlugs: ["fox-kids", "jetix"],
    description: "Bloque de los domingos al mediodía con dos episodios seguidos de una misma serie.",
    logoPath: "/logos/blocks/doble-carga.png",
    // Catalog series in ANMTV's month-by-month history of the block (2003-2007). Its "El Pájaro
    // Loco" is not identified as El nuevo show del Pájaro Loco, so it is left out.
    seriesTmdbIds: [
      4630, // Los Padrinos Mágicos
      8991, // Digimon Frontier
      9550, // Kid Músculo
      43219, // Los Misterios de Moville
      14891, // Kirby de las Estrellas
      10079, // El Hombre-Araña: Sin Límites
      4574, // X-Men
      2328, // Power Rangers
      2808, // Tres Espías Sin Límite
      54728, // BeyBlade
      5653, // Megaman NT Warrior
      10926, // Sonic X
      1763, // Dientes de Lata
      11235, // Medabots
      2284, // Las Tortugas Ninja
      1903, // A.T.O.M
      137, // W.I.T.C.H.
      2826, // Dragon Booster
      1960, // Dave el bárbaro
      20993, // Galactik Football
      2557, // Academia de Titanes
      6782, // Pucca
      3809, // Yin, Yang, Yo!
      // Added by the project owner's decision on genre alone, without checking their airings: the
      // Fox Kids and Jetix animated action and adventure series, action anime and the Jetix-era
      // comedy Las locuras de Andy. Live action, horror and mystery, pre-1990 classics and adult
      // anime are left out.
      3787, // Chaotic
      6549, // Wolverine y los X-Men
      3428, // Súper Escuadrón Ciber Monos Hiper Fuerza ¡Ya!
      4335, // Oban Star Racers
      3441, // Get Ed
      5444, // Club Caza Monstruos
      240, // Las aventuras de Jackie Chan
      65120, // Los Patos Extremos
      12150, // Súper Sumos
      1719, // Gárgolas
      888, // El Hombre Araña (1994)
      1300, // Los Vengadores
      1130, // Silver Surfer
      11100, // Godzilla: La serie
      12544, // Los Tiburones del Asfalto
      2901, // Los 4 Fantásticos (1994)
      20469, // Transformers: Robots in Disguise
      27615, // Heavy Gear
      34786, // DinoZaurs
      203937, // La Autopista
      31654, // Digimon
      9302, // Digimon Tamers
      40143, // Shaman King
      15130, // Monster Rancher
      21175, // Shinzo
      19260, // Los Caballeros del Mundo Mon
      8908, // Flint, el detective del tiempo
      1762, // Las locuras de Andy
    ],
  },
  {
    slug: "invasion-anime",
    name: "Invasión Animé",
    channelSlugs: ["fox-kids", "jetix"],
    description: "Bloque dedicado a la animación japonesa, estrenado el 1 de marzo de 2001.",
    logoPath: "/logos/blocks/invasion-anime.png",
    // Catalog series in ANMTV's list of the block's premieres (2001-2005). The "Digimon" entry
    // covers both Digimon and Digimon 2; Digimon 3 and 4 are Tamers and Frontier.
    seriesTmdbIds: [
      31654, // Digimon
      15130, // Monster Rancher
      8908, // Flint, el detective del tiempo
      21175, // Shinzo
      19260, // Los Caballeros del Mundo Mon
      11235, // Medabots
      9302, // Digimon Tamers
      54728, // BeyBlade
      40143, // Shaman King
      8991, // Digimon Frontier
      14891, // Kirby de las Estrellas
      9550, // Kid Músculo
      5653, // Megaman NT Warrior
      137, // W.I.T.C.H.
    ],
  },
  // Boomerang blocks provided by the project owner by name only; years and sources stay null. Their
  // logos were also supplied by the owner (see SOURCES.md).
  {
    slug: "rodeo-cartoon-de-hanna-barbera",
    name: "Rodeo Cartoon de Hanna-Barbera",
    channelSlugs: ["boomerang"],
    description: "Hora diaria de dibujos animados clásicos de Hanna-Barbera, emitida entre 2005 y 2006.",
    logoPath: "/logos/blocks/rodeo-cartoon-de-hanna-barbera.png",
    // The official Latin American schedules (June 2005 to March 2006) list the block as one hour
    // without its contents. These are the catalog series behind the shorts of Hanna-Barbera's
    // Cartoon Corral, the US block it is said to adapt (US evidence), added by the project owner's
    // decision to fill it with Hanna-Barbera series only.
    seriesTmdbIds: [
      967, // El Show de Huckleberry Hound
      38960, // Tiro Loco McGraw
      30773, // El Show del Oso Yogui
      11167, // El Show de Maguila Gorila
      22172, // La hormiga atómica
      4752, // El Inspector Ardilla
      12350, // Pepe Pótamo y su globo mágico
      15307, // El Lagarto Juancho
      12519, // The Ruff and Reddy Show
      985, // La Carrera de Los Autos Locos
      10097, // Pierre Nodoyuna y Patán en sus máquinas voladoras
      // The rest of the catalog's Hanna-Barbera comedy series on Boomerang, by the project owner's
      // decision. Action series go to Boomeraction and music ones to BoomBox.
      1996, // Los Picapiedra
      4232, // Don Gato y su Pandilla
      2362, // Los supersónicos
      23652, // Los Banana Splits
      926, // ¡Scooby-Doo, dónde estás!
      1765, // Los peligros de Penélope Glamour
      5305, // Harlem Globetrotters
      11173, // Where's Huddles?
      11136, // Los osos revoltosos
      1068, // Las Nuevas Películas de Scooby-Doo
      12463, // Roma me da risa
      10347, // Las aventuras de Chan
      10476, // Buggy Veloz
      10475, // Pulgarcito, investigador privado
      12396, // Goober y los cazadores de fantasmas
      14698, // El clan de Yogi
      10106, // Hong Kong Phooey
      11008, // El astuto Wheelie
      7842, // El Show de Tom y Jerry
      4929, // Simiolón y Listolín
      2150, // El show de Scooby Doo
      1072, // Las Olimpiadas de la Risa
      12266, // La Carrera Espacial de Yogui
      13526, // Los Locos de la Galaxia
      6005, // El show de Scooby-Doo y Scrappy-Doo
      5687, // Los Pitufos
      34868, // Los Rescatadores
      1069, // Los 13 fantasmas de Scooby-Doo
      13349, // La Búsqueda del Tesoro de Yogui
      4167, // Los Pequeños Picapiedra
      418, // Un cachorro llamado Scooby-Doo
      12454, // El Nuevo Show del Oso Yogi
      4274, // Los pequeños Tom y Jerry
      10442, // Yo Yogui!
      11040, // Droopy, el gran detective
    ],
  },
  {
    slug: "boomeraction",
    name: "Boomeraction",
    channelSlugs: ["boomerang"],
    description: "Bloque de series de acción y aventura, uno de los primeros de Boomerang.",
    logoPath: "/logos/blocks/boomeraction.png",
    // Catalog series in the Boomeraction lineups of Boomerpedia and the Boomerang Schedule Archive
    // (US evidence, accepted for blocks; the block also ran on the Latin American feed).
    seriesTmdbIds: [
      3303, // Fantasma del Espacio
      962, // Jonny Quest
      1029, // Birdman y el Trío Galaxia
      3578, // Los Herculoides
      10644, // Moby Dick y Mightor el poderoso
      2579, // Frankenstein Jr. y los Imposibles
      10501, // Shazzan
      28629, // Los Chicos del Espacio
      936, // Súper Amigos
      3850, // Los piratas de las aguas tenebrosas
      14365, // Ases del peligro
      364, // Laboratorio Submarino 2020
      11709, // El valle de los dinosaurios
      // Godzilla, El grupo increíble and El fantasma revoltoso appear in the block's Latin American
      // schedules (2002-2005); the other Hanna-Barbera action series are added by the project
      // owner's decision.
      5246, // Godzilla
      11144, // El grupo increíble
      10481, // El fantasma revoltoso
      11161, // Los viajes de Gulliver
      10434, // Jana de la selva
      10610, // El Reto de los Super Amigos
      11067, // Estrellas Espaciales
      10343, // Galtar y la lanza dorada
      // Imported for the block from its Latin American schedules (twelfth series batch).
      30986, // Meteoro
      1651, // Los 4 Fantásticos (1967)
      42245, // James Bond Jr.
      2650, // Los Centuriones
      11844, // Flash Gordon
      18131, // Los Cazafantasmas
      2286, // Los verdaderos Cazafantasmas
      4793, // Cazafantasmas: La nueva generación
      14917, // Fuerza G: Guardianes del espacio
      2628, // Los súper Globetrotters
      2271, // La Mole
      12826, // Colmillo, el lobo solitario
      302676, // Dinamita, el perro maravilla
      6059, // El poderoso Hércules
      4979, // El show de Underdog
    ],
  },
  {
    slug: "boombox",
    name: "BoomBox",
    channelSlugs: ["boomerang"],
    description: "Segmento musical de Boomerang con videoclips, presentaciones en vivo y documentales musicales.",
    logoPath: "/logos/blocks/boombox.png",
    // BoomBox was a music video and concert segment (2007-2014). These Hanna-Barbera series with
    // bands or music themes are listed by the project owner's decision, not from its schedules.
    seriesTmdbIds: [
      4489, // Josie y sus Gatimelódicas
      12451, // Los Gatedráticos del Ritmo
      13255, // Butch Cassidy y los chicos Sundance
      2936, // Mandibulín
      9773, // Capitán Cavernícola y los Ángeles adolescentes
      10518, // Club siguepistas
      2451, // El Show de Pebbles y Bamm-Bamm
      1010, // La hora de los Picapiedra
    ],
  },
];
