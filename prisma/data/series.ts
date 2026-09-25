import type { SeriesCatalogEntry } from "../../src/lib/import/series-catalog";

// Curated series catalog, loaded with `npm run db:load:series` after the seed and before
// `db:load:blocks`. Series are referenced by TMDB id; titles and slugs come from TMDB (es-MX) on
// first import. `channelSlugs` are catalog links (SeriesChannel with null years/source); leave
// them out when the Latin American channel is not documented. Entries load in file order.
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
  { tmdbId: 4630, channelSlugs: ["nickelodeon"] }, // Los Padrinos Mágicos
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

  // No channel: the Latin American channel of these preschool series is not documented. Clifford,
  // Arthur and Dragon Tales are PBS titles and Bob, el constructor is a BBC one; which Latin
  // American channel carried them is not established, and recollection is not historical data.
  { tmdbId: 8379 }, // Clifford

  // Second batch. Channel links follow the same criterion as the first batch: series produced for
  // (or originally aired by) that channel brand. Classics and preschool series whose Latin American
  // channel is not documented stay without a link.
  { tmdbId: 1767, channelSlugs: ["fox-kids"] }, // El Mundo de Bobby
  { tmdbId: 4251, channelSlugs: ["fox-kids"] }, // La Vida con Louie
  { tmdbId: 3370, channelSlugs: ["fox-kids"] }, // Eek! The Cat
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
  { tmdbId: 1585 }, // Dragon Tales
  { tmdbId: 10938 }, // Bob, el constructor
  { tmdbId: 2153 }, // Arthur

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
];
