import type { BlockData } from "../../src/lib/import/blocks";

// Curated blocks, loaded with `npm run db:load:blocks` after the seed and series imports.
// Years and sources stay out until they are documented; series are referenced by TMDB id.
// A block may start empty: only clear series associations are listed, dubious ones are left out.
// Boomerang and Discovery Kids have no blocks yet because their Latin American blocks are not
// documented; don't fill them with guessed names. Block names without a description were provided
// by the project owner; their description stays null until it is documented.
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
    ],
  },
  {
    slug: "toonami",
    name: "Toonami",
    channelSlugs: ["cartoon-network"],
    description: "Bloque de series de acción y anime.",
    logoPath: "/logos/blocks/toonami.svg",
    // Los jóvenes titanes and Samurai Jack are dubious for the Latin American Toonami.
    seriesTmdbIds: [],
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
    ],
  },
  {
    slug: "nick-at-nite",
    name: "Nick at Nite",
    channelSlugs: ["nickelodeon"],
    logoPath: "/logos/blocks/nick-at-nite.svg",
    seriesTmdbIds: [],
  },
  {
    slug: "zapping-zone",
    name: "Zapping Zone",
    channelSlugs: ["disney-channel"],
    description: "Bloque con conductores.",
    logoPath: "/logos/blocks/zapping-zone.png",
    // Which catalog series aired inside the block is not documented.
    seriesTmdbIds: [],
  },
  // Fox Kids was succeeded by Jetix, and these blocks continued across the rebrand, so each one is
  // a single block on both channels rather than two independent blocks. Which catalog series aired
  // in them is not documented, so they stay empty: never infer a lineup from a block's name.
  {
    slug: "mysteria",
    name: "Mysteria",
    channelSlugs: ["fox-kids", "jetix"],
    logoPath: "/logos/blocks/mysteria.png",
    seriesTmdbIds: [],
  },
  {
    slug: "insomnio",
    name: "Insomnio",
    channelSlugs: ["fox-kids", "jetix"],
    logoPath: "/logos/blocks/insomnio.png",
    seriesTmdbIds: [],
  },
  {
    slug: "quien-tiene-el-control",
    name: "¿Quién tiene el control?",
    channelSlugs: ["fox-kids", "jetix"],
    logoPath: "/logos/blocks/quien-tiene-el-control.png",
    seriesTmdbIds: [],
  },
  {
    slug: "doble-carga",
    name: "Doble Carga",
    channelSlugs: ["fox-kids", "jetix"],
    logoPath: "/logos/blocks/doble-carga.png",
    seriesTmdbIds: [],
  },
  {
    slug: "invasion-anime",
    name: "Invasión Animé",
    channelSlugs: ["fox-kids", "jetix"],
    logoPath: "/logos/blocks/invasion-anime.png",
    seriesTmdbIds: [],
  },
  // Boomerang blocks provided by the project owner by name only, so description, years and sources
  // stay null. Which catalog series aired in them is not documented, so they stay empty: a block
  // name is never a lineup. Their logos were also supplied by the owner (see SOURCES.md).
  {
    slug: "rodeo-cartoon-de-hanna-barbera",
    name: "Rodeo Cartoon de Hanna-Barbera",
    channelSlugs: ["boomerang"],
    logoPath: "/logos/blocks/rodeo-cartoon-de-hanna-barbera.png",
    seriesTmdbIds: [],
  },
  {
    slug: "boomeraction",
    name: "Boomeraction",
    channelSlugs: ["boomerang"],
    logoPath: "/logos/blocks/boomeraction.png",
    seriesTmdbIds: [],
  },
  {
    slug: "boombox",
    name: "BoomBox",
    channelSlugs: ["boomerang"],
    logoPath: "/logos/blocks/boombox.png",
    seriesTmdbIds: [],
  },
];
