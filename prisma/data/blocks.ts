import type { BlockData } from "../../src/lib/import/blocks";

// Curated blocks, loaded with `npm run db:load:blocks` after the seed and series imports.
// Years and sources stay out until they are documented; series are referenced by TMDB id.
// A block may start empty: only clear series associations are listed, dubious ones are left out.
// Boomerang and Discovery Kids have no blocks yet because their Latin American blocks are not
// documented; don't fill them with guessed names. Block names without a description were provided
// by the project owner; their description stays null until it is documented.
// `logoPath` is optional and must point to a local asset under `public/logos/blocks/`, named
// `{channel-slug}-{block-slug}`. Document its source in `public/logos/blocks/SOURCES.md`, which
// also lists why each pending block has no logo yet. Blocks without it show initials.
export const blocks: BlockData[] = [
  {
    channelSlug: "cartoon-network",
    slug: "cartoon-cartoons",
    name: "Cartoon Cartoons",
    description: "Sello de las series animadas originales de Cartoon Network.",
    seriesTmdbIds: [
      4229, // El laboratorio de Dexter
      607, // Las chicas superpoderosas
      2405, // Johnny Bravo
      3611, // La Vaca y el Pollito
      606, // Ed, Edd y Eddy
      2085, // Coraje, el perro cobarde
      177, // Soy la Comadreja
      4350, // Mike, Lu y Og
    ],
  },
  {
    channelSlug: "cartoon-network",
    slug: "toonami",
    name: "Toonami",
    description: "Bloque de series de acción y anime.",
    logoPath: "/logos/blocks/cartoon-network-toonami.svg",
    // Los jóvenes titanes and Samurai Jack are dubious for the Latin American Toonami.
    seriesTmdbIds: [],
  },
  {
    channelSlug: "nickelodeon",
    slug: "nicktoons",
    name: "Nicktoons",
    description: "Sello de las series animadas originales de Nickelodeon.",
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
    ],
  },
  {
    channelSlug: "nickelodeon",
    slug: "nick-jr",
    name: "Nick Jr.",
    description: "Bloque de programación preescolar.",
    seriesTmdbIds: [],
  },
  {
    channelSlug: "nickelodeon",
    slug: "nick-at-nite",
    name: "Nick at Nite",
    logoPath: "/logos/blocks/nickelodeon-nick-at-nite.svg",
    seriesTmdbIds: [],
  },
  {
    channelSlug: "disney-channel",
    slug: "zapping-zone",
    name: "Zapping Zone",
    description: "Bloque con conductores.",
    // Which catalog series aired inside the block is not documented.
    seriesTmdbIds: [],
  },
  {
    channelSlug: "disney-channel",
    slug: "playhouse-disney",
    name: "Playhouse Disney",
    description: "Bloque de programación preescolar.",
    seriesTmdbIds: [],
  },
  { channelSlug: "fox-kids", slug: "mysteria", name: "Mysteria", seriesTmdbIds: [] },
  { channelSlug: "fox-kids", slug: "insomnio", name: "Insomnio", seriesTmdbIds: [] },
  {
    channelSlug: "fox-kids",
    slug: "quien-tiene-el-control",
    name: "¿Quién tiene el control?",
    seriesTmdbIds: [],
  },
  { channelSlug: "fox-kids", slug: "doble-carga", name: "Doble Carga", seriesTmdbIds: [] },
  { channelSlug: "fox-kids", slug: "invasion-anime", name: "Invasión Animé", seriesTmdbIds: [] },
  { channelSlug: "jetix", slug: "invasion-anime", name: "Invasión Animé", seriesTmdbIds: [] },
  { channelSlug: "jetix", slug: "mysteria", name: "Mysteria", seriesTmdbIds: [] },
  {
    channelSlug: "jetix",
    slug: "quien-tiene-el-control",
    name: "¿Quién tiene el control?",
    seriesTmdbIds: [],
  },
  { channelSlug: "jetix", slug: "doble-carga", name: "Doble Carga", seriesTmdbIds: [] },
];
