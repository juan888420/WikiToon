import type { SeriesCatalogEntry } from "../../src/lib/import/series-catalog";

// Curated series catalog, loaded with `npm run db:load:series` after the seed and before
// `db:load:blocks`. Series are referenced by TMDB id; titles and slugs come from TMDB (es-MX) on
// first import unless the entry sets `title`, the curated Spanish (Latin American) title. Set it
// whenever TMDB's name is not the Spanish one: it builds the slug on create and, on an existing
// series, replaces the title only (slugs never change). `channelSlugs` are catalog links
// (SeriesChannel with null years/source); leave them out when the Latin American channel is not
// documented. `seasons` limits the import to those TMDB season numbers, for umbrella entries that
// run past the catalog's scope. Entries load in file order.
export const seriesCatalog: SeriesCatalogEntry[] = [
  // Cartoon Network
  { tmdbId: 4686, channelSlugs: ["cartoon-network"] }, // Ben 10
  { tmdbId: 607, channelSlugs: ["cartoon-network"] }, // Las chicas superpoderosas
  { tmdbId: 4229, channelSlugs: ["cartoon-network"] }, // El laboratorio de Dexter
  { tmdbId: 2085, channelSlugs: ["cartoon-network"] }, // Coraje, el perro cobarde
  { tmdbId: 606, channelSlugs: ["cartoon-network"] }, // Ed, Edd y Eddy
  { tmdbId: 2405, channelSlugs: ["cartoon-network"] }, // Johnny Bravo
  { tmdbId: 2723, channelSlugs: ["cartoon-network"] }, // Samurai Jack
  { tmdbId: 2660, channelSlugs: ["cartoon-network"] }, // KND: Los chicos del barrio
  { tmdbId: 1720, channelSlugs: ["cartoon-network"] }, // Mansión Foster para amigos imaginarios
  { tmdbId: 897, channelSlugs: ["cartoon-network"] }, // Las sombrías aventuras de Billy y Mandy

  // Nickelodeon
  { tmdbId: 3022, channelSlugs: ["nickelodeon"] }, // Rugrats: Aventuras en Pañales
  { tmdbId: 537, channelSlugs: ["nickelodeon"] }, // ¡Oye, Arnold!
  { tmdbId: 387, channelSlugs: ["nickelodeon"] }, // Bob Esponja
  { tmdbId: 4630, channelSlugs: ["nickelodeon", "fox-kids"] }, // Los Padrinos Mágicos
  { tmdbId: 657, channelSlugs: ["nickelodeon"] }, // La vida moderna de Rocko

  // Disney Channel
  { tmdbId: 2345, channelSlugs: ["disney-channel"] }, // Kim Possible
  { tmdbId: 1877, channelSlugs: ["disney-channel"] }, // Phineas y Ferb
  { tmdbId: 346, channelSlugs: ["disney-channel"] }, // Jake Long: El Dragón occidental

  // Fox Kids
  { tmdbId: 4574, channelSlugs: ["fox-kids"] }, // X-Men
  { tmdbId: 888, channelSlugs: ["fox-kids"] }, // El Hombre Araña
  { tmdbId: 31654, channelSlugs: ["fox-kids"] }, // Digimon (original title in Japanese)

  // Jetix
  { tmdbId: 137, channelSlugs: ["jetix"] }, // W.I.T.C.H.
  { tmdbId: 3428, channelSlugs: ["jetix"] }, // Súper Escuadrón Ciber Monos Hiper Fuerza ¡Ya!

  // Cartoon Network (second batch)
  { tmdbId: 3611, channelSlugs: ["cartoon-network"] }, // La Vaca y el Pollito
  { tmdbId: 604, channelSlugs: ["cartoon-network"] }, // Los jóvenes titanes

  // Hanna-Barbera classics, linked to Boomerang in the third batch (see the note there).
  { tmdbId: 4232, channelSlugs: ["boomerang"] }, // Don Gato y su Pandilla
  { tmdbId: 926, channelSlugs: ["boomerang"] }, // ¡Scooby-Doo, dónde estás!
  { tmdbId: 1996, channelSlugs: ["boomerang"] }, // Los Picapiedra

  // Caillou was a defining title of Discovery Kids Latin America's preschool schedule, the same
  // basis on which Barney, Franklin, Hi-5 and Bananas en pijamas are linked to it.
  { tmdbId: 3218, channelSlugs: ["discovery-kids"] }, // Caillou

  // Clifford, Dragon Tales and Bob, el constructor appear in ANMTV's August 2005 Discovery Kids
  // Latin America schedule. Arthur aired on Cartoon Network (2005) and Boomerang (2006-2008),
  // according to Spanish Wikipedia. They had no channel until the seventh batch.
  { tmdbId: 8379, channelSlugs: ["discovery-kids"] }, // Clifford

  // Second batch. Channel links follow the same criterion as the first batch: series produced for
  // (or originally aired by) that channel brand. Classics and preschool series whose Latin American
  // channel is not documented stay without a link.
  { tmdbId: 1767, channelSlugs: ["fox-kids"] }, // El Mundo de Bobby
  { tmdbId: 4251, channelSlugs: ["fox-kids"] }, // La Vida con Louie
  { tmdbId: 3370, title: "Eek! el Gato", channelSlugs: ["fox-kids"] }, // Eek! The Cat
  { tmdbId: 6782, channelSlugs: ["jetix"] }, // Pucca
  { tmdbId: 20993, channelSlugs: ["jetix"] }, // Galactik Football
  { tmdbId: 4335, channelSlugs: ["jetix"] }, // Oban Star Racers
  { tmdbId: 3809, channelSlugs: ["jetix"] }, // Yin, Yang, Yo!
  { tmdbId: 1567, channelSlugs: ["nickelodeon"] }, // CatDog
  { tmdbId: 2408, channelSlugs: ["nickelodeon"] }, // Los Thornberrys
  { tmdbId: 3793, channelSlugs: ["nickelodeon"] }, // Invasor Zim
  { tmdbId: 2309, channelSlugs: ["nickelodeon"] }, // Danny Phantom
  { tmdbId: 246, channelSlugs: ["nickelodeon"] }, // Avatar: La leyenda de Aang
  { tmdbId: 2129, channelSlugs: ["nickelodeon"] }, // Las Aventuras de Jimmy Neutron: El Niño Genio
  { tmdbId: 2355, channelSlugs: ["disney-channel"] }, // Lilo & Stitch: La serie
  { tmdbId: 543, channelSlugs: ["disney-channel"] }, // La Familia Proud
  { tmdbId: 4623, channelSlugs: ["disney-channel"] }, // Las nuevas locuras del emperador
  { tmdbId: 4627, channelSlugs: ["disney-channel"] }, // Los Sustitutos
  { tmdbId: 177, channelSlugs: ["cartoon-network"] }, // Soy la Comadreja
  { tmdbId: 4350, channelSlugs: ["cartoon-network"] }, // Mike, Lu y Og
  { tmdbId: 557, channelSlugs: ["cartoon-network"] }, // El Campamento de Lazlo
  { tmdbId: 234, channelSlugs: ["cartoon-network"] }, // Mi compañero de clase es un mono
  { tmdbId: 255, channelSlugs: ["cartoon-network"] }, // Hi Hi Puffy AmiYumi
  // Hanna-Barbera classics, linked to Boomerang in the third batch (see the note there).
  { tmdbId: 2362, channelSlugs: ["boomerang"] }, // Los supersónicos
  { tmdbId: 985, channelSlugs: ["boomerang"] }, // La Carrera de Los Autos Locos
  { tmdbId: 11167, channelSlugs: ["boomerang"] }, // El Show de Maguila Gorila
  { tmdbId: 30773, channelSlugs: ["boomerang"] }, // El Show del Oso Yogui
  { tmdbId: 1585, channelSlugs: ["discovery-kids"] }, // Dragon Tales
  { tmdbId: 10938, channelSlugs: ["discovery-kids"] }, // Bob, el constructor
  { tmdbId: 2153, channelSlugs: ["cartoon-network", "boomerang"] }, // Arthur

  // Third batch. Same criterion for channel links, plus one addition: Boomerang Latin America
  // launched as the channel for the Hanna-Barbera library, so the seven classics already in the
  // catalog are now linked to it. The links stay catalog links, with null years and source; no
  // Latin American airing dates are claimed.
  { tmdbId: 5687, channelSlugs: ["boomerang"] }, // Los Pitufos
  { tmdbId: 1371, channelSlugs: ["discovery-kids"] }, // Hi-5
  { tmdbId: 4887, channelSlugs: ["discovery-kids"] }, // Barney y sus amigos
  { tmdbId: 3103, channelSlugs: ["discovery-kids"] }, // Bananas en pijamas
  { tmdbId: 1458, channelSlugs: ["discovery-kids"] }, // Franklin
  // Premiered in the Fox Kids era and continued on Jetix, like the blocks shared by both channels.
  { tmdbId: 2808, channelSlugs: ["fox-kids", "jetix"] }, // Tres Espías Sin Límite
  { tmdbId: 5835, channelSlugs: ["fox-kids"] }, // Escalofríos
  { tmdbId: 10926, channelSlugs: ["jetix"] }, // Sonic X
  { tmdbId: 12971, channelSlugs: ["cartoon-network"] }, // Dragon Ball Z
  { tmdbId: 504, channelSlugs: ["nickelodeon"] }, // Ren y Stimpy
  { tmdbId: 3579, channelSlugs: ["nickelodeon"] }, // Los Castores Cascarrabias
  { tmdbId: 1546, channelSlugs: ["disney-channel"] }, // Recreo

  // Fourth batch (large expansion). Same criteria as before, applied per channel:
  // - Cartoon Network, Nickelodeon, Disney Channel, Fox Kids and Jetix: series produced for (or
  //   originally aired by) the channel brand. Acquisitions are linked only when Spanish Wikipedia's
  //   article on the Latin American channel names them (CN: Tintín, La Máscara, Garfield, the
  //   Toonami anime; Disney Channel: Pepper Ann, Doug, La Tropa Goofy, Chip y Dale, Timón y Pumba,
  //   101 Dálmatas; Fox Kids: the titles listed in its blocks).
  // - Boomerang: Hanna-Barbera library, as in the third batch.
  // - Discovery Kids: acquisitions carried by the channel, as in the third batch.
  // Links stay catalog links with null years and source. Live-action titles, and anime whose TMDB
  // es-MX name is only in Japanese (no slug can be built from it), are left out for now.

  // Cartoon Network: originals.
  { tmdbId: 2798, channelSlugs: ["cartoon-network"] }, // Fantasma del Espacio de Costa a Costa
  { tmdbId: 1477, channelSlugs: ["cartoon-network"] }, // Sheep en la gran ciudad
  { tmdbId: 4314, channelSlugs: ["cartoon-network"] }, // El Escuadrón del Tiempo
  { tmdbId: 1789, channelSlugs: ["cartoon-network"] }, // Jones, El Robot
  { tmdbId: 4246, channelSlugs: ["cartoon-network"] }, // Malo Con Carne
  { tmdbId: 472, channelSlugs: ["cartoon-network"] }, // Megas XLR
  { tmdbId: 216, channelSlugs: ["cartoon-network"] }, // Duck Dodgers
  { tmdbId: 446, title: "Vida y obra de Juniper Lee", channelSlugs: ["cartoon-network"] }, // Vida y obra de Juniper Lee
  { tmdbId: 1534, channelSlugs: ["cartoon-network"] }, // Robotboy
  { tmdbId: 262, channelSlugs: ["cartoon-network"] }, // Niño Ardilla
  { tmdbId: 2094, channelSlugs: ["cartoon-network"] }, // Class of 3000
  { tmdbId: 9907, channelSlugs: ["cartoon-network"] }, // Chowder
  { tmdbId: 6673, channelSlugs: ["cartoon-network"] }, // Las maravillosas desventuras de Flapjack
  { tmdbId: 14636, channelSlugs: ["cartoon-network"] }, // Los sábados secretos
  { tmdbId: 6040, channelSlugs: ["cartoon-network"] }, // Ben 10: Fuerza Alienígena
  { tmdbId: 1618, channelSlugs: ["cartoon-network"] }, // Liga de la Justicia
  { tmdbId: 84200, channelSlugs: ["cartoon-network"] }, // Liga de la Justicia Ilimitada
  { tmdbId: 3122, channelSlugs: ["cartoon-network"] }, // Star Wars: Clone Wars (2003)
  { tmdbId: 15804, channelSlugs: ["cartoon-network"] }, // Batman, el Valiente
  { tmdbId: 10548, channelSlugs: ["cartoon-network"] }, // Transformers: Animated
  // Cartoon Network: acquisitions named in Spanish Wikipedia's article on the Latin American channel.
  { tmdbId: 1570, channelSlugs: ["cartoon-network"] }, // Las aventuras de Tintín
  { tmdbId: 9957, channelSlugs: ["cartoon-network"] }, // La Máscara (serie animada)
  { tmdbId: 4606, channelSlugs: ["cartoon-network"] }, // Garfield y sus Amigos
  { tmdbId: 12609, channelSlugs: ["cartoon-network"] }, // Dragon Ball
  { tmdbId: 60572, channelSlugs: ["cartoon-network"] }, // Pokémon
  { tmdbId: 35610, channelSlugs: ["cartoon-network"] }, // Inuyasha
  { tmdbId: 42444, channelSlugs: ["cartoon-network"] }, // Los Caballeros del Zodiaco

  // Nickelodeon: originals. TMDB's Doug covers both the Nickelodeon and the Disney run, and Disney
  // Channel Latin America carried it, so it is linked to both.
  { tmdbId: 384, channelSlugs: ["nickelodeon", "disney-channel"] }, // Doug
  { tmdbId: 2429, channelSlugs: ["nickelodeon"] }, // Aaahh!!! Monstruos de verdad
  { tmdbId: 544, channelSlugs: ["nickelodeon"] }, // KaBlam!
  { tmdbId: 2009, channelSlugs: ["nickelodeon"] }, // Rocket Power
  { tmdbId: 1760, channelSlugs: ["nickelodeon"] }, // Ginger
  { tmdbId: 4413, channelSlugs: ["nickelodeon"] }, // Zona Tiza
  { tmdbId: 178, channelSlugs: ["nickelodeon"] }, // La robot adolescente
  { tmdbId: 130, channelSlugs: ["nickelodeon"] }, // Rugrats Crecidos
  { tmdbId: 3805, channelSlugs: ["nickelodeon"] }, // Catscratch
  { tmdbId: 4511, channelSlugs: ["nickelodeon"] }, // The X's
  { tmdbId: 6046, channelSlugs: ["nickelodeon"] }, // El Tigre: las aventuras de Manny Rivera
  { tmdbId: 9921, channelSlugs: ["nickelodeon"] }, // La granja
  { tmdbId: 5340, channelSlugs: ["nickelodeon"] }, // Tak
  { tmdbId: 15641, channelSlugs: ["nickelodeon"] }, // The Mighty B!
  { tmdbId: 7869, channelSlugs: ["nickelodeon"] }, // Los Pingüinos de Madagascar

  // Disney Channel: Disney Television Animation series named in the Latin American channel's
  // article, plus Disney Channel originals.
  { tmdbId: 4568, channelSlugs: ["disney-channel"] }, // Pepper Ann
  { tmdbId: 2235, channelSlugs: ["disney-channel"] }, // La Tropa Goofy
  { tmdbId: 1615, channelSlugs: ["disney-channel"] }, // Chip y Dale al rescate
  { tmdbId: 4429, channelSlugs: ["disney-channel"] }, // Las aventuras de Timón y Pumba
  { tmdbId: 2198, channelSlugs: ["disney-channel"] }, // Los 101 dálmatas: La serie
  { tmdbId: 1960, channelSlugs: ["disney-channel", "jetix"] }, // Dave el bárbaro
  { tmdbId: 618, title: "Brandy y el Sr. Bigotes", channelSlugs: ["disney-channel"] }, // Brandy y el Sr. Bigotes
  { tmdbId: 426, title: "Maggie, una mosca con onda", channelSlugs: ["disney-channel"] }, // The Buzz on Maggie

  // Fox Kids: series named in Spanish Wikipedia's article on the Latin American channel, plus
  // Marvel series produced for Fox Kids (Fox Kids Worldwide owned the Marvel/Saban library).
  { tmdbId: 5373, channelSlugs: ["fox-kids"] }, // Angela Anaconda
  { tmdbId: 2777, channelSlugs: ["fox-kids"] }, // Oggy y las cucarachas
  { tmdbId: 9980, channelSlugs: ["fox-kids"] }, // El nuevo show del Pájaro Loco
  { tmdbId: 86161, title: "Los Cerditos de al Lado", channelSlugs: ["fox-kids"] }, // Pigs Next Door (Los Cerditos de al Lado)
  { tmdbId: 6278, title: "Los Mega Bebés", channelSlugs: ["fox-kids"] }, // Mega Babies
  { tmdbId: 12150, title: "Súper Sumos", channelSlugs: ["fox-kids"] }, // Super Duper Sumos
  { tmdbId: 1666, title: "Mary-Kate y Ashley en acción", channelSlugs: ["fox-kids"] }, // Mary-Kate and Ashley in Action
  { tmdbId: 1763, channelSlugs: ["fox-kids"] }, // Dientes de Lata
  { tmdbId: 1269, channelSlugs: ["fox-kids"] }, // El Hombre-Araña y sus Sorprendentes Amigos
  { tmdbId: 4784, channelSlugs: ["fox-kids"] }, // La Mujer Araña
  { tmdbId: 1130, channelSlugs: ["fox-kids"] }, // Silver Surfer
  { tmdbId: 10079, channelSlugs: ["fox-kids"] }, // El Hombre-Araña: Sin Límites
  { tmdbId: 1300, channelSlugs: ["fox-kids"] }, // Los Vengadores (United They Stand)
  { tmdbId: 21175, channelSlugs: ["fox-kids"] }, // Shinzo
  { tmdbId: 11235, channelSlugs: ["fox-kids"] }, // Medabots
  { tmdbId: 54728, channelSlugs: ["fox-kids"] }, // BeyBlade
  { tmdbId: 40143, channelSlugs: ["fox-kids"] }, // Shaman King
  { tmdbId: 14891, channelSlugs: ["fox-kids"] }, // Kirby de las Estrellas
  { tmdbId: 5653, channelSlugs: ["fox-kids"] }, // Megaman NT Warrior
  { tmdbId: 75216, channelSlugs: ["fox-kids"] }, // Mortadelo y Filemón
  { tmdbId: 4956, channelSlugs: ["fox-kids"] }, // Dilbert
  // Premiered on Fox Kids and kept airing after the Jetix rebrand.
  { tmdbId: 1762, title: "Las locuras de Andy", channelSlugs: ["fox-kids", "jetix"] }, // What's with Andy? (Las locuras de Andy)

  // Jetix: series produced for the Jetix brand.
  { tmdbId: 3441, channelSlugs: ["jetix"] }, // Get Ed
  { tmdbId: 1903, channelSlugs: ["jetix"] }, // A.T.O.M.
  { tmdbId: 5444, title: "Club Caza Monstruos", channelSlugs: ["jetix"] }, // Monster Buster Club
  { tmdbId: 2826, channelSlugs: ["jetix"] }, // Dragon Booster

  // Boomerang: Hanna-Barbera library.
  { tmdbId: 967, channelSlugs: ["boomerang"] }, // El Show de Huckleberry Hound
  { tmdbId: 38960, channelSlugs: ["boomerang"] }, // Tiro Loco McGraw
  { tmdbId: 962, channelSlugs: ["boomerang"] }, // Jonny Quest
  { tmdbId: 3303, channelSlugs: ["boomerang"] }, // Fantasma del Espacio (Space Ghost and Dino Boy)
  { tmdbId: 3578, channelSlugs: ["boomerang"] }, // Los Herculoides
  { tmdbId: 10097, channelSlugs: ["boomerang"] }, // Pierre Nodoyuna y Patán en sus máquinas voladoras
  { tmdbId: 1765, channelSlugs: ["boomerang"] }, // Los peligros de Penélope Glamour
  { tmdbId: 4489, channelSlugs: ["boomerang"] }, // Josie y sus Gatimelódicas
  { tmdbId: 10106, channelSlugs: ["boomerang"] }, // Hong Kong Phooey
  { tmdbId: 9773, channelSlugs: ["boomerang"] }, // Capitán Cavernícola y los Ángeles adolescentes
  { tmdbId: 15307, channelSlugs: ["boomerang"] }, // El Lagarto Juancho (Wally Gator, Touché Turtle, Lippy)
  { tmdbId: 22172, channelSlugs: ["boomerang"] }, // La hormiga atómica
  { tmdbId: 4752, channelSlugs: ["boomerang"] }, // El Inspector Ardilla
  { tmdbId: 12350, channelSlugs: ["boomerang"] }, // Pepe Pótamo y su globo mágico
  { tmdbId: 2936, title: "Mandibulín", channelSlugs: ["boomerang"] }, // Jabberjaw
  { tmdbId: 10476, title: "Buggy Veloz", channelSlugs: ["boomerang"] }, // Speed Buggy
  { tmdbId: 1072, title: "Las Olimpiadas de la Risa", channelSlugs: ["boomerang"] }, // Las Olimpiadas de la Risa
  { tmdbId: 6005, channelSlugs: ["boomerang"] }, // El show de Scooby-Doo y Scrappy-Doo
  { tmdbId: 418, channelSlugs: ["boomerang"] }, // Un cachorro llamado Scooby-Doo
  { tmdbId: 11136, title: "Los osos revoltosos", channelSlugs: ["boomerang"] }, // Help!... It's the Hair Bear Bunch!
  { tmdbId: 10501, channelSlugs: ["boomerang"] }, // Shazzan
  { tmdbId: 1029, channelSlugs: ["boomerang"] }, // Birdman y el Trío Galaxia
  { tmdbId: 2579, title: "Frankenstein Jr. y los Imposibles", channelSlugs: ["boomerang"] }, // Frankenstein, Jr. and The Impossibles
  { tmdbId: 23652, title: "Los Banana Splits", channelSlugs: ["boomerang"] }, // The Banana Splits Adventure Hour
  { tmdbId: 10481, title: "El fantasma revoltoso", channelSlugs: ["boomerang"] }, // The Funky Phantom
  { tmdbId: 7842, channelSlugs: ["boomerang"] }, // El Show de Tom y Jerry (1975, Hanna-Barbera)
  { tmdbId: 4274, channelSlugs: ["boomerang"] }, // Los pequeños Tom y Jerry (Hanna-Barbera)

  // Discovery Kids: acquisitions carried by the channel.
  { tmdbId: 1878, channelSlugs: ["discovery-kids"] }, // Los Backyardigans
  { tmdbId: 12225, channelSlugs: ["discovery-kids"] }, // Peppa Pig
  { tmdbId: 10107, title: "Jay Jay el avioncito", channelSlugs: ["discovery-kids"] }, // Jay Jay the Jet Plane
  { tmdbId: 35225, channelSlugs: ["discovery-kids"] }, // Harry y su cubeta de dinosaurios
  { tmdbId: 13605, channelSlugs: ["discovery-kids"] }, // Jakers! Las aventuras de Piggley Winks
  { tmdbId: 11133, channelSlugs: ["discovery-kids"] }, // Little Robots
  { tmdbId: 13871, channelSlugs: ["discovery-kids"] }, // Los hermanos Koala
  { tmdbId: 656, title: "Jorge el curioso", channelSlugs: ["discovery-kids"] }, // Jorge el curioso

  // Fifth batch (final catalog expansion). Fox Kids and Jetix links follow ANMTV's lists of series
  // premiered on each Latin American channel; a series gets both when it premiered on Fox Kids and
  // is documented on Jetix too. Power Rangers was added in the ninth batch, limited by `seasons`.
  { tmdbId: 15851, title: "Ciencia Traviesa", channelSlugs: ["fox-kids", "jetix"] }, // Ciencia Traviesa (Wicked Science)
  { tmdbId: 6, title: "El Colegio del Agujero Negro", channelSlugs: ["fox-kids", "jetix"] }, // Colegio del Agujero Negro
  { tmdbId: 2284, title: "Las Tortugas Ninja", channelSlugs: ["fox-kids", "jetix"] }, // Las Tortugas Ninja (2003, incl. Fast Forward)
  { tmdbId: 13455, channelSlugs: ["fox-kids"] }, // Cuentos de la Cripta (Tales from the Cryptkeeper)
  { tmdbId: 9302, channelSlugs: ["fox-kids"] }, // Digimon Tamers (Digimon 3)
  { tmdbId: 8991, channelSlugs: ["fox-kids"] }, // Digimon Frontier (Digimon 4)
  { tmdbId: 1719, channelSlugs: ["fox-kids"] }, // Gárgolas
  { tmdbId: 43219, channelSlugs: ["fox-kids"] }, // Los Misterios de Moville
  { tmdbId: 14009, channelSlugs: ["fox-kids", "nickelodeon"] }, // Los locos Addams (1964)
  // Disney Channel original, also named in Spanish Wikipedia's article on Disney Channel Latin America.
  { tmdbId: 1954, channelSlugs: ["fox-kids", "disney-channel"] }, // Qué raro (So Weird)
  { tmdbId: 2557, title: "Academia de Titanes", channelSlugs: ["jetix"] }, // Academia de Titanes (Class of the Titans)
  { tmdbId: 3787, channelSlugs: ["jetix"] }, // Chaotic
  { tmdbId: 6549, channelSlugs: ["jetix"] }, // Wolverine y los X-Men
  { tmdbId: 599, channelSlugs: ["jetix"] }, // Los misterios del oráculo (Dark Oracle)
  // Aired on Cartoon Network Latin America from 2004 (it premiered on Warner Channel in 1999).
  { tmdbId: 513, channelSlugs: ["cartoon-network"] }, // Batman del futuro
  // Premiered in Latin America on Nickelodeon in 2002.
  { tmdbId: 902, channelSlugs: ["nickelodeon"] }, // Yu-Gi-Oh! Duelo de Monstruos

  // Adult Swim launch lineup on Cartoon Network Latin America (2005 press release). Adult Swim is a
  // Cartoon Network block, so these link to the channel and are listed in the block.
  { tmdbId: 416, channelSlugs: ["cartoon-network"] }, // Harvey Birdman, Abogado
  { tmdbId: 251, channelSlugs: ["cartoon-network"] }, // Aqua Teen Hunger Force
  { tmdbId: 334, channelSlugs: ["cartoon-network"] }, // Laboratorio Submarino 2021
  { tmdbId: 481, title: "El Show de Brak", channelSlugs: ["cartoon-network"] }, // The Brak Show (El Show de Brak)
  { tmdbId: 2342, title: "Secundaria de clones", channelSlugs: ["cartoon-network"] }, // Clone High (Secundaria de clones)
  { tmdbId: 2073, channelSlugs: ["cartoon-network"] }, // Mission Hill
  { tmdbId: 4999, channelSlugs: ["cartoon-network"] }, // Bob y Margaret
  { tmdbId: 2274, title: "Películas caseras", channelSlugs: ["cartoon-network"] }, // Home Movies (Películas caseras)

  // Boomerang: Hanna-Barbera library, same criterion as the third and fourth batches.
  { tmdbId: 12519, title: "Ruff y Reddy", channelSlugs: ["boomerang"] }, // The Ruff and Reddy Show
  { tmdbId: 28629, channelSlugs: ["boomerang"] }, // Los Chicos del Espacio
  { tmdbId: 10644, channelSlugs: ["boomerang"] }, // Moby Dick y Mightor el poderoso
  { tmdbId: 11161, title: "Los viajes de Gulliver", channelSlugs: ["boomerang"] }, // The Adventures of Gulliver
  { tmdbId: 12451, channelSlugs: ["boomerang"] }, // Los Gatedráticos del Ritmo (Cattanooga Cats)
  { tmdbId: 5305, channelSlugs: ["boomerang"] }, // Harlem Globetrotters
  { tmdbId: 11173, channelSlugs: ["boomerang"] }, // Where's Huddles?
  { tmdbId: 2451, channelSlugs: ["boomerang"] }, // El Show de Pebbles y Bamm-Bamm
  { tmdbId: 1068, title: "Las Nuevas Películas de Scooby-Doo", channelSlugs: ["boomerang"] }, // Las Nuevas Películas de Scooby-Doo
  { tmdbId: 1010, title: "La hora de los Picapiedra", channelSlugs: ["boomerang"] }, // The Flintstone Comedy Hour
  { tmdbId: 12463, title: "Roma me da risa", channelSlugs: ["boomerang"] }, // The Roman Holidays
  { tmdbId: 364, title: "Laboratorio Submarino 2020", channelSlugs: ["boomerang"] }, // Sealab 2020
  { tmdbId: 10347, title: "Las aventuras de Chan", channelSlugs: ["boomerang"] }, // The Amazing Chan and the Chan Clan
  { tmdbId: 10475, channelSlugs: ["boomerang"] }, // Pulgarcito, investigador privado
  { tmdbId: 12396, channelSlugs: ["boomerang"] }, // Goober y los cazadores de fantasmas
  { tmdbId: 14698, title: "El clan de Yogi", channelSlugs: ["boomerang"] }, // Yogi's Gang
  { tmdbId: 13255, title: "Butch Cassidy y los chicos Sundance", channelSlugs: ["boomerang"] },
  { tmdbId: 936, channelSlugs: ["boomerang"] }, // Súper Amigos
  { tmdbId: 11709, title: "El valle de los dinosaurios", channelSlugs: ["boomerang"] }, // Valley of the Dinosaurs
  { tmdbId: 11008, title: "El astuto Wheelie", channelSlugs: ["boomerang"] }, // Wheelie and the Chopper Bunch
  { tmdbId: 14365, title: "Ases del peligro", channelSlugs: ["boomerang"] }, // Devlin
  { tmdbId: 4929, channelSlugs: ["boomerang"] }, // Simiolón y Listolín (The Great Grape Ape Show)
  { tmdbId: 10518, title: "Club siguepistas", channelSlugs: ["boomerang"] }, // Clue Club
  { tmdbId: 2150, channelSlugs: ["boomerang"] }, // El show de Scooby Doo (Scooby-Doo/Dynomutt Hour)
  { tmdbId: 12266, channelSlugs: ["boomerang"] }, // La Carrera Espacial de Yogui
  { tmdbId: 13526, title: "Los Locos de la Galaxia", channelSlugs: ["boomerang"] }, // Los Locos de la Galaxia
  { tmdbId: 10434, title: "Jana de la selva", channelSlugs: ["boomerang"] }, // Jana of the Jungle
  { tmdbId: 10610, channelSlugs: ["boomerang"] }, // El Reto de los Super Amigos
  { tmdbId: 11144, channelSlugs: ["boomerang"] }, // El grupo increíble (Drak Pack)
  { tmdbId: 11067, title: "Estrellas Espaciales", channelSlugs: ["boomerang"] }, // Space Stars
  { tmdbId: 34868, channelSlugs: ["boomerang"] }, // Los Rescatadores (Shirt Tales)
  { tmdbId: 1069, channelSlugs: ["boomerang"] }, // Los 13 fantasmas de Scooby-Doo
  { tmdbId: 13349, channelSlugs: ["boomerang"] }, // La Búsqueda del Tesoro de Yogui
  { tmdbId: 10343, title: "Galtar y la lanza dorada", channelSlugs: ["boomerang"] }, // Galtar and the Golden Lance
  { tmdbId: 4167, channelSlugs: ["boomerang"] }, // Los Pequeños Picapiedra
  { tmdbId: 12454, channelSlugs: ["boomerang"] }, // El Nuevo Show del Oso Yogi
  { tmdbId: 3850, title: "Los piratas de las aguas tenebrosas", channelSlugs: ["boomerang"] }, // The Pirates of Dark Water
  { tmdbId: 10442, channelSlugs: ["boomerang"] }, // Yo Yogui!
  { tmdbId: 11040, title: "Droopy, el gran detective", channelSlugs: ["boomerang"] }, // Droopy, Master Detective

  // Sixth batch. Titles are pinned to the Latin American Spanish name whenever TMDB's differs.
  // Fox Kids: premieres listed by ANMTV (anime with Japanese-only TMDB names are now titled).
  { tmdbId: 11100, channelSlugs: ["fox-kids"] }, // Godzilla: La serie (Fox Kids, 1999)
  { tmdbId: 65120, title: "Los Patos Extremos", channelSlugs: ["fox-kids"] }, // X-DuckX
  { tmdbId: 9550, title: "Kid Músculo", channelSlugs: ["fox-kids"] }, // Kinnikuman II Sei
  { tmdbId: 15130, title: "Monster Rancher", channelSlugs: ["fox-kids"] },
  { tmdbId: 8908, title: "Flint, el detective del tiempo", channelSlugs: ["fox-kids"] },
  { tmdbId: 19260, title: "Los Caballeros del Mundo Mon", channelSlugs: ["fox-kids"] },

  // Cartoon Network.
  { tmdbId: 668, channelSlugs: ["cartoon-network"] }, // X-Men: Evolución
  { tmdbId: 4684, channelSlugs: ["cartoon-network", "boomerang"] }, // Ozzy y Drix
  // Adult Swim on Cartoon Network (2005-2008), added after the launch lineup.
  { tmdbId: 709, channelSlugs: ["cartoon-network"] }, // Pollo Robot
  { tmdbId: 3043, title: "Ratón Esponja", channelSlugs: ["cartoon-network"] }, // 12 oz. Mouse
  { tmdbId: 3547, title: "Universitarios", channelSlugs: ["cartoon-network"] }, // Undergrads
  { tmdbId: 2568, title: "Los Oblongs", channelSlugs: ["cartoon-network"] },

  // Disney Channel: originals (live action included).
  { tmdbId: 4602, title: "Es tan Raven", channelSlugs: ["disney-channel"] },
  { tmdbId: 4575, channelSlugs: ["disney-channel"] }, // Lizzie McGuire
  { tmdbId: 3200, title: "Mano a mano", channelSlugs: ["disney-channel"] }, // Even Stevens
  // Also on Jetix (ANMTV's list of Jetix Latin America series).
  { tmdbId: 1528, channelSlugs: ["disney-channel", "jetix"] }, // Phil del futuro
  { tmdbId: 4605, channelSlugs: ["disney-channel"] }, // Zack y Cody: Gemelos en acción
  { tmdbId: 4610, channelSlugs: ["disney-channel"] }, // Hannah Montana
  { tmdbId: 119, title: "Cory en la Casa Blanca", channelSlugs: ["disney-channel"] },
  { tmdbId: 3498, channelSlugs: ["disney-channel"] }, // Los Hechiceros de Waverly Place
  { tmdbId: 15079, channelSlugs: ["disney-channel"] }, // Zack y Cody: Gemelos a bordo
  { tmdbId: 33873, title: "Sunny entre estrellas", channelSlugs: ["disney-channel"] },
  { tmdbId: 12712, channelSlugs: ["disney-channel"] }, // JONAS
  { tmdbId: 21641, channelSlugs: ["disney-channel"] }, // ¡Buena suerte Charlie!
  { tmdbId: 33213, channelSlugs: ["disney-channel"] }, // A todo ritmo

  // Nickelodeon: live-action originals and the Latin American original Skimo.
  { tmdbId: 249, title: "Clarissa lo explica todo", channelSlugs: ["nickelodeon"] },
  { tmdbId: 3814, channelSlugs: ["nickelodeon"] }, // All That
  { tmdbId: 1835, channelSlugs: ["nickelodeon"] }, // Kenan y Kel
  { tmdbId: 376, channelSlugs: ["nickelodeon"] }, // El show de Amanda
  { tmdbId: 2038, channelSlugs: ["nickelodeon"] }, // Drake & Josh
  { tmdbId: 1600, channelSlugs: ["nickelodeon"] }, // Manual de supervivencia escolar de Ned
  { tmdbId: 2967, channelSlugs: ["nickelodeon"] }, // Super Natural (Unfabulous)
  { tmdbId: 1778, channelSlugs: ["nickelodeon"] }, // Zoey 101
  { tmdbId: 5371, channelSlugs: ["nickelodeon"] }, // iCarly
  { tmdbId: 263, channelSlugs: ["nickelodeon"] }, // Skimo
  // Nick at Nite lineup 2006-2010 (ANMTV). The block runs on Nickelodeon, so they link to it.
  { tmdbId: 4482, channelSlugs: ["nickelodeon"] }, // Hechizada
  { tmdbId: 1712, title: "Los Munsters", channelSlugs: ["nickelodeon", "fox-kids"] },
  { tmdbId: 1660, title: "Mi bella genio", channelSlugs: ["nickelodeon"] },
  { tmdbId: 2552, channelSlugs: ["nickelodeon"] }, // Mork & Mindy
  { tmdbId: 54, title: "¡Ay, cómo duele crecer!", channelSlugs: ["nickelodeon"] }, // Growing Pains
  { tmdbId: 1786, title: "Dos perfectos desconocidos", channelSlugs: ["nickelodeon"] },
  { tmdbId: 4658, channelSlugs: ["nickelodeon"] }, // ALF
  { tmdbId: 2410, channelSlugs: ["nickelodeon"] }, // Blanco y negro (Diff'rent Strokes)
  { tmdbId: 1803, title: "Los hechos de la vida", channelSlugs: ["nickelodeon"] },
  { tmdbId: 1892, title: "El Príncipe de Bel-Air", channelSlugs: ["nickelodeon"] },
  { tmdbId: 4455, title: "Súper Agente 86", channelSlugs: ["nickelodeon"] }, // Get Smart
  { tmdbId: 3845, title: "Días felices", channelSlugs: ["nickelodeon"] },
  { tmdbId: 7266, title: "Meteoro: La nueva generación", channelSlugs: ["nickelodeon"] },
  { tmdbId: 1743, channelSlugs: ["nickelodeon"] }, // Skyland

  // Tenth batch: channels assigned by the project owner's decision for series that had none. The
  // Venture Bros. and Squidbillies (Adult Swim on Cartoon Network, 2006-2008), the 1978 Godzilla
  // (Boomerang) and Superman (Cartoon Network, 2004-2006) match the Latin American schedules. The
  // rest are editorial links, not documented airings, and some contradict the sources: Jackie Chan
  // aired on Cartoon Network and Boomerang; Lain and Ergo Proxy on Locomotion and Animax (Ergo Proxy
  // postdates Fox Kids); the later Adult Swim titles on I.Sat, TBS or Warner Channel, after the
  // Cartoon Network block ended in 2008; Death Note, Bleach and Jujutsu Kaisen on Animax, Warner
  // Channel or streaming. Don't "correct" them without asking the project owner.
  { tmdbId: 240, channelSlugs: ["fox-kids"] }, // Las aventuras de Jackie Chan
  { tmdbId: 5246, channelSlugs: ["boomerang"] }, // Godzilla (Hanna-Barbera, 1978)
  { tmdbId: 60625, channelSlugs: ["cartoon-network"] }, // Rick y Morty
  { tmdbId: 653, channelSlugs: ["cartoon-network"] }, // Metalocalypse
  { tmdbId: 2418, title: "Los hermanos Venture", channelSlugs: ["cartoon-network"] },
  { tmdbId: 1542, channelSlugs: ["cartoon-network"] }, // Frisky Dingo
  { tmdbId: 292, channelSlugs: ["cartoon-network"] }, // Moral Orel
  { tmdbId: 11936, channelSlugs: ["cartoon-network"] }, // Minoriteam
  { tmdbId: 40064, channelSlugs: ["cartoon-network"] }, // Black Dynamite
  { tmdbId: 539, title: "Los calamareños", channelSlugs: ["cartoon-network"] }, // Squidbillies
  { tmdbId: 30991, channelSlugs: ["cartoon-network"] }, // Cowboy Bebop
  { tmdbId: 1087, channelSlugs: ["fox-kids"] }, // Serial Experiments Lain
  { tmdbId: 1097, channelSlugs: ["fox-kids"] }, // Ergo Proxy
  { tmdbId: 13916, channelSlugs: ["cartoon-network"] }, // Death Note
  { tmdbId: 30984, channelSlugs: ["cartoon-network"] }, // Bleach
  // One Piece: its first 52 episodes (the 4Kids version) aired on Cartoon Network, 2006-2008.
  { tmdbId: 37854, channelSlugs: ["cartoon-network"] }, // One Piece
  { tmdbId: 95479, channelSlugs: ["cartoon-network"] }, // Jujutsu Kaisen

  // Seventh batch. Disney Channel links follow Wikipedia's list of Disney Channel Latin America
  // programs; 31 minutos aired on Nickelodeon Latin America (2004-2007, PRODU); Zoboomafoo on
  // Discovery Kids (ANMTV's August 2005 schedule); La conspiración Roswell on Cartoon Network, not
  // Fox Kids.
  { tmdbId: 720, channelSlugs: ["disney-channel"] }, // Patoaventuras
  { tmdbId: 2567, title: "Hércules: La serie animada", channelSlugs: ["disney-channel"] },
  { tmdbId: 43, title: "31 minutos", channelSlugs: ["nickelodeon"] },
  { tmdbId: 4217, title: "Zoboomafoo", channelSlugs: ["discovery-kids"] },
  { tmdbId: 4390, title: "La conspiración Roswell", channelSlugs: ["cartoon-network"] },
  // Linked by the project owner's decision (eleventh batch for Darkwing, tenth for the others).
  // Darkwing is not in Disney Channel Latin America's program list; the sources place it on
  // broadcast TV, Street Sharks on broadcast TV and Magic Kids, and Creepschool on Nickelodeon
  // (2004-2006).
  { tmdbId: 3319, channelSlugs: ["disney-channel"] }, // El Pato Darkwing
  { tmdbId: 12544, title: "Los Tiburones del Asfalto", channelSlugs: ["fox-kids"] }, // Street Sharks
  { tmdbId: 9277, title: "Escuela de espanto", channelSlugs: ["fox-kids"] }, // Creepschool

  // Eighth batch. Links only where a source documents the Latin American channel: Quack Pack is in
  // Wikipedia's Disney Channel Latin America program list; Batman aired on Cartoon Network in
  // 2004-2006 (Spanish Wikipedia); Scooby-Doo! Misterios S.A. premiered on it in 2011 (ANMTV);
  // Naruto in 2007 (PRODU); Yu Yu Hakusho in Toonami; Max Steel per Spanish Wikipedia.
  { tmdbId: 1863, channelSlugs: ["disney-channel"] }, // Quack Pack
  { tmdbId: 32118, channelSlugs: ["cartoon-network"] }, // Generador Rex
  { tmdbId: 2228, channelSlugs: ["cartoon-network", "boomerang"] }, // Pinky y Cerebro
  { tmdbId: 18123, channelSlugs: ["cartoon-network"] }, // ¡Scooby-Doo! Misterios S.A.
  { tmdbId: 2098, title: "Batman: la serie animada", channelSlugs: ["cartoon-network"] },
  { tmdbId: 46260, channelSlugs: ["cartoon-network"] }, // Naruto
  { tmdbId: 30669, channelSlugs: ["cartoon-network"] }, // Yu Yu Hakusho
  { tmdbId: 5283, channelSlugs: ["cartoon-network"] }, // Max Steel (2000)
  { tmdbId: 2913, title: "¿Le temes a la oscuridad?", channelSlugs: ["nickelodeon"] },
  // Linked in the tenth batch. Superman aired on Cartoon Network in 2004-2006 (its Latin American
  // schedules). Count Duckula and Galaxy Rangers are linked to Fox Kids by the project owner's
  // decision; the sources place them on broadcast TV, ZAZ and Locomotion.
  { tmdbId: 4303, title: "Superman: la serie animada", channelSlugs: ["cartoon-network"] },
  { tmdbId: 2416, channelSlugs: ["fox-kids"] }, // El Conde Pátula (Count Duckula)
  { tmdbId: 325, title: "La Patrulla Galáctica", channelSlugs: ["fox-kids"] }, // Galaxy Rangers

  // Ninth batch. Power Rangers: TMDB only has the umbrella entry, one season per generation up to
  // 2023. Seasons 1-17 (Mighty Morphin to R.P.M., 2009) are the ones in scope; the specials
  // (season 0) and later generations are not imported. Generations premiered on Fox Kids up to
  // Tormenta Ninja and on Jetix from Dino Trueno (ANMTV).
  { tmdbId: 2328, seasons: range(1, 17), channelSlugs: ["fox-kids", "jetix"] }, // Power Rangers

  // Eleventh batch: series added for the Fox Kids blocks by the project owner's decision. Most are
  // in Spanish Wikipedia's lists of Fox Kids' Mysteria, Insomnio and Invasión Animé blocks, whose
  // links identify the version (Zorro 1957, Batman 1966, Fantastic Four 1994, the Patlabor TV
  // series, La Autopista as Track City). Alex Mack, Shirley Holmes, Eerie Indiana and Hardy Boys /
  // Nancy Drew come from the owner's list only. El Gordo y el Flaco is the 1966 Hanna-Barbera
  // series (TMDB has no entry for the live-action shorts); Transformers is Robots in Disguise.
  { tmdbId: 21036, title: "Los nuevos locos Addams", channelSlugs: ["fox-kids"] },
  { tmdbId: 318109, title: "Real Scary Stories", channelSlugs: ["fox-kids"] },
  { tmdbId: 4289, title: "El mundo secreto de Alex Mack", channelSlugs: ["fox-kids"] },
  { tmdbId: 635, title: "Las aventuras de Shirley Holmes", channelSlugs: ["fox-kids"] },
  { tmdbId: 4045, title: "Eerie, Indiana", channelSlugs: ["fox-kids"] },
  { tmdbId: 2928, title: "The Hardy Boys y Nancy Drew", channelSlugs: ["fox-kids"] },
  { tmdbId: 325574, title: "Los Tres Chiflados", channelSlugs: ["fox-kids"] },
  { tmdbId: 4681, title: "El Zorro", channelSlugs: ["fox-kids"] },
  { tmdbId: 2287, title: "Batman", channelSlugs: ["fox-kids"] }, // 1966
  { tmdbId: 117523, title: "El Gordo y el Flaco", channelSlugs: ["fox-kids"] },
  { tmdbId: 2901, title: "Los 4 Fantásticos", channelSlugs: ["fox-kids"] }, // 1994
  { tmdbId: 34786, title: "DinoZaurs", channelSlugs: ["fox-kids"] },
  { tmdbId: 21736, title: "Patlabor", channelSlugs: ["fox-kids"] },
  { tmdbId: 203937, title: "La Autopista", channelSlugs: ["fox-kids"] }, // Track City
  { tmdbId: 27615, title: "Heavy Gear", channelSlugs: ["fox-kids"] },
  { tmdbId: 20469, channelSlugs: ["fox-kids"] }, // Transformers: Robots in Disguise

  // Twelfth batch: Boomeraction series in Boomerang Latin America's schedules (2003-2006, Cartoon
  // Network Wiki grids citing the channel's site), identified with Doblaje Wiki's list of series
  // aired by Boomerang. TMDB has La Mole only inside Fred and Barney Meet the Thing (1979).
  { tmdbId: 30986, title: "Meteoro", channelSlugs: ["boomerang"] }, // Speed Racer (1967)
  { tmdbId: 1651, title: "Los 4 Fantásticos", channelSlugs: ["boomerang"] }, // 1967
  { tmdbId: 42245, title: "James Bond Jr.", channelSlugs: ["boomerang"] },
  { tmdbId: 2650, title: "Los Centuriones", channelSlugs: ["boomerang"] },
  { tmdbId: 11844, title: "Flash Gordon", channelSlugs: ["boomerang"] }, // 1979
  { tmdbId: 18131, title: "Los Cazafantasmas", channelSlugs: ["boomerang"] }, // Filmation, 1986
  { tmdbId: 2286, title: "Los verdaderos Cazafantasmas", channelSlugs: ["boomerang"] },
  { tmdbId: 4793, title: "Cazafantasmas: La nueva generación", channelSlugs: ["boomerang"] },
  { tmdbId: 14917, title: "Fuerza G: Guardianes del espacio", channelSlugs: ["boomerang"] },
  { tmdbId: 2628, title: "Los súper Globetrotters", channelSlugs: ["boomerang"] },
  { tmdbId: 2271, title: "La Mole", channelSlugs: ["boomerang"] }, // Fred and Barney Meet the Thing
  { tmdbId: 12826, title: "Colmillo, el lobo solitario", channelSlugs: ["boomerang"] }, // Fangface
  { tmdbId: 302676, title: "Dinamita, el perro maravilla", channelSlugs: ["boomerang"] }, // Dynomutt
  { tmdbId: 6059, title: "El poderoso Hércules", channelSlugs: ["boomerang"] },
  { tmdbId: 4979, title: "El show de Underdog", channelSlugs: ["boomerang"] },

  // Thirteenth batch, by the project owner's decision: Pair of Kings and Zeke and Luther (Disney XD
  // originals in the US) for Zapping Zone, and The Nanny and That '70s Show for Nick at Nite.
  // Latin American titles from Doblaje Wiki.
  { tmdbId: 31628, title: "Par de Reyes", channelSlugs: ["disney-channel"] },
  { tmdbId: 17519, title: "Zeke y Luther", channelSlugs: ["disney-channel"] },
  { tmdbId: 2352, title: "La niñera", channelSlugs: ["nickelodeon"] },
  { tmdbId: 52, title: "El show de los 70", channelSlugs: ["nickelodeon"] },
];

function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index);
}
