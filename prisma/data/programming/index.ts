import type { ProgrammingData } from "../../../src/lib/import/programming";
import { blockAliases } from "./block-aliases";
import { days, grids } from "./dataset";
import { feeds } from "./feeds";
import { titleAliases } from "./title-aliases";

// Programming data loaded by `npm run db:load:programming`, after the seed, series and blocks.
// - feeds.ts, title-aliases.ts, block-aliases.ts: curated by hand.
// - grids/ and days/ (listed in dataset.ts): generated from the extracted sources by
//   `npm run research:programming:build`, then curated by hand. Each grid file owns its slots and
//   each day its rows: reloading replaces exactly those.
export const programmingData: ProgrammingData = { feeds, titleAliases, blockAliases, grids, days };
