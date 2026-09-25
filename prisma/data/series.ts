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

  // No channel yet: Latin American channel history (Boomerang, Discovery Kids) not documented.
  { tmdbId: 4232 }, // Don Gato y su Pandilla
  { tmdbId: 926 }, // ¡Scooby-Doo, dónde estás!
  { tmdbId: 1996 }, // Los Picapiedra
  { tmdbId: 3218 }, // Caillou
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
  { tmdbId: 2362 }, // Los supersónicos
  { tmdbId: 985 }, // La Carrera de Los Autos Locos
  { tmdbId: 11167 }, // El Show de Maguila Gorila
  { tmdbId: 30773 }, // El Show del Oso Yogui
  { tmdbId: 1585 }, // Dragon Tales
  { tmdbId: 10938 }, // Bob, el constructor
  { tmdbId: 2153 }, // Arthur
];
