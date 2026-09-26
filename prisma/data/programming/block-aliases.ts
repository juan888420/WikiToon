import type { BlockAlias } from "../../../src/lib/import/programming";

// Block labels as listed by the sources, mapped to the catalog's blocks. Labels of blocks that are
// not in the catalog (Hora ACME, Talismán, Girl Power, Nick Jr., Playhouse Disney...) are left out
// on purpose: they are kept literally in `listedBlock` and no block is created for them.
export const blockAliases: BlockAlias[] = [
  { label: "Toonami", blockSlug: "toonami", channelSlugs: ["cartoon-network"] },
  { label: "Adult Swim", blockSlug: "adult-swim", channelSlugs: ["cartoon-network"] },
  { label: "Adult Swim (repetición)", blockSlug: "adult-swim", channelSlugs: ["cartoon-network"] },
  { label: "Cartoon Cartoons", blockSlug: "cartoon-cartoons", channelSlugs: ["cartoon-network"] },
  { label: "Cartoon Cartoon", blockSlug: "cartoon-cartoons", channelSlugs: ["cartoon-network"] },
  { label: "Boomeraction", blockSlug: "boomeraction", channelSlugs: ["boomerang"] },
  { label: "Rodeo Cartoon de Hanna-Barbera", blockSlug: "rodeo-cartoon-de-hanna-barbera", channelSlugs: ["boomerang"] },
  { label: "Invasión Animé", blockSlug: "invasion-anime", channelSlugs: ["fox-kids", "jetix"] },
  { label: "Mysteria", blockSlug: "mysteria", channelSlugs: ["fox-kids", "jetix"] },
  { label: "Insomnio", blockSlug: "insomnio", channelSlugs: ["fox-kids", "jetix"] },
  { label: "Doble Carga", blockSlug: "doble-carga", channelSlugs: ["fox-kids", "jetix"] },
  { label: "¿Quién Tiene el Control?", blockSlug: "quien-tiene-el-control", channelSlugs: ["fox-kids", "jetix"] },
  { label: "Nicktoons", blockSlug: "nicktoons", channelSlugs: ["nickelodeon"] },
  { label: "Zapping Zone", blockSlug: "zapping-zone", channelSlugs: ["disney-channel"] },
];
