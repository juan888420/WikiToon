# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What WikiToon is

WikiToon is an archive and exploration platform for Latin American children's TV, focused mainly on the 90s and 2000s era. It organizes and displays the historical record of channels, series, programming blocks, and schedules that made up Latin American kids' TV. It is **not** a streaming service: no video playback/hosting, just structured reference and browsing of what aired, where, and when. UI content is in Spanish (`<html lang="es">`).

## Project status

- Data layer: schema with 6 migrations, idempotent seed (7 channels), generic TMDB series importer, curated series catalog loader (`db:load:series`), curated block loader (`db:load:blocks`) and programming loader (`db:load:programming`: feeds, recurring grids and concrete days), all with tests. The whole catalog is reproducible from the repo: seed, then `prisma/data/series.ts`, then `prisma/data/blocks.ts`, then `prisma/data/programming`.
- UI: global layout, Series module (`/series`, `/series/[slug]`), Channels module (`/canales`, `/canales/[slug]` + sections), Blocks module (`/bloques`, `/bloques/[slug]`), Schedule module (`/programacion`, `/programacion/[canal]/[fecha]`) and Timeline (`/timeline`). See "UI" below.
- No home page: `/` redirects to `/canales` (temporary 307, in `next.config.ts`), which is the main page. Not built yet: API routes.
- Catalog in `dev.db` (as of 2026-09-26). The comments in `prisma/data/series.ts` and `prisma/data/blocks.ts` record the basis of each batch and link; read them before changing an entry.
  - 7 channels (seed), all with a local `logoPath` (`/logos/{slug}.svg`, Jetix `.png`).
  - 367 series from `prisma/data/series.ts` (1450 seasons, 36168 episodes), loaded in thirteen batches. Every series has at least one `SeriesChannel`; there are no orphans. Titles are pinned to the Latin American Spanish name with `title` whenever TMDB's differs; slugs keep the value they were created with, so some stay in English (e.g. `jabberjaw` for Mandibulín). Power Rangers imports only seasons 1-17 (Mighty Morphin to R.P.M.) through `seasons`.
  - 383 `SeriesChannel` rows, all with null years/source: catalog links, not dated airing records. Per channel: Boomerang 93, Cartoon Network 83, Fox Kids 72, Nickelodeon 58, Disney Channel 37, Jetix 23, Discovery Kids 17. 16 series are on two channels.
  - 14 blocks, 19 `BlockChannel` rows and 350 `SeriesBlock` rows, all with null years/source/notes. Every block has a short Spanish `description` (written from the sources gathered in the 2026-09-26 audit) and a `logoPath` (sources and caveats in `public/logos/blocks/SOURCES.md`):
    - Cartoon Network: Cartoon Cartoons (14), Toonami (20), Adult Swim (22).
    - Nickelodeon: Nicktoons (28), Nick at Nite (21, live action only).
    - Disney Channel: Zapping Zone (15, live action only).
    - Fox Kids **and** Jetix, one block each shared by both channels: Mysteria (13), Insomnio (31), ¿Quién tiene el control? (31: the Fox Kids and Jetix popular series, by the owner's decision; only four are documented vote options), Doble Carga (51: its documented lineup plus, by the owner's decision, the Fox Kids and Jetix animated action and adventure series, action anime and Las locuras de Andy, chosen by genre), Invasión Animé (14). Fox Kids was succeeded by Jetix and these blocks continued across the rebrand, so each is one block on two channels, not two blocks, with a single page reachable from both.
    - Boomerang: Rodeo Cartoon de Hanna-Barbera (46: the catalog's Hanna-Barbera comedy series on Boomerang), Boomeraction (36: action and adventure, mostly from the block's Latin American schedules), BoomBox (8: series with bands or music themes). A Boomerang series goes to one of the three by genre.
    - Discovery Kids: none. Its Latin American blocks are not documented.
    - Removed, don't re-add without asking: Nick Jr. and Playhouse Disney (preschool content is not being expanded for now), Hora Boomerang, and Anime (a Cartoon Network block created and deleted on 2026-09-26; its series went to Toonami).
    - Pending decision: Nick Hits (Nickelodeon) is not added yet.
  - Programming (first dataset, see "Programming data" below): 7 feeds, 16 recurring grids (4438 weekday slots: 814 VERIFIED, 3606 PROBABLE, 18 UNCERTAIN) and 31 concrete days from Cablevisión Monterrey (1343 `Schedule` rows, all VERIFIED). Periods: Cartoon Network 2000-10 (Latinoamérica, in two conflicting versions, and a partial México table), 2002-11 and 2005-10; Boomerang 2003-12 and 2005-07; Fox Kids 2001-08 and 2003-01; Jetix 2005-08; Nickelodeon 2001-08 and 2004-01; Disney Channel 2004-01 and 2005-08; Discovery Kids 2004-01 and 2005-08. Don't extend to other years without the owner asking. `/programacion` pages will list the 31 days on the next build (the UI still reads the deprecated `Schedule.feed`, which new data leaves null).
  - 0 timeline events (so `/timeline` and every channel timeline show their empty state).
- Catalog policy (set by the project owner on 2026-09-26): the owner's assignments are final. When the owner places a series on a channel or in a block, it goes there even if the sources place it elsewhere (e.g. Jackie Chan on Fox Kids, Rick y Morty in Adult Swim, the Hanna-Barbera music series in BoomBox). Those entries are marked "project owner's decision" in the data-file comments, next to what the sources say. Don't "correct" or remove them without asking. Without an owner decision, add only associations a source supports, and never create a block from a guessed name. Flag conflicts with the sources once, then do what the owner decides.
- Current focus: catalog and exploration. Detailed historical research (airing dates, schedules, Timeline) is not a priority; those features stay technically ready but empty.
- Infrastructure pending: the app reads a local SQLite file (`dev.db`, gitignored), and `next build` reads it to prerender pages. This is not ready for a real Vercel deploy (no DB in the build/runtime environment, read-only filesystem); the production database strategy is still undecided.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19
- TypeScript (strict)
- Tailwind CSS v4 (CSS-first config via `@import "tailwindcss"` in `src/app/globals.css`, no `tailwind.config`)
- shadcn/ui (CLI 4.x, style `base-nova`, base color `neutral`, CSS variables). See the shadcn/ui section below.
- Motion: import from `motion/react`. This project uses the current `motion` package, not `framer-motion`; this overrides the global CLAUDE.md default for this repo, so don't "correct" it back.
- Lucide (`lucide-react`)
- Prisma 7 + SQLite via the `better-sqlite3` driver adapter
- TMDB API (series metadata and artwork only; typed client in `src/lib/tmdb/`, see below)
- Deploy target: Vercel (not deployable yet; see "Project status")

## Commands

```bash
npm run dev          # dev server (Turbopack)
npm run build        # production build
npm run lint         # ESLint (flat config, eslint.config.mjs)
npm run typecheck    # next typegen && tsc --noEmit
npm test             # node:test via tsx (see below)
npm run db:generate  # prisma generate (also runs on postinstall)
npm run db:migrate   # prisma migrate dev, then `postdb:migrate` hook runs prisma generate
npm run db:deploy    # prisma migrate deploy (apply existing migrations, no prompts)
npm run db:seed      # prisma db seed -> runs `tsx prisma/seed.ts` (configured in prisma.config.ts)
npm run db:studio    # prisma studio
npm run db:load:series   # load the curated series catalog from prisma/data/series.ts (idempotent, additive)
npm run db:load:series -- --refresh  # same, but re-sync every listed series from TMDB
npm run db:import:series -- --tmdb-id <id> [--channel <slug>]  # one-off import/test, not reproducible
npm run db:import:series -- --title "<title>" --year <first air year> [--channel <slug>]
npm run db:load:blocks   # load curated blocks from prisma/data/blocks.ts (idempotent, additive)
npm run db:load:programming    # load feeds, grids and days from prisma/data/programming (idempotent)
npm run db:report:programming  # write docs/research/programming-review.md (read-only; exits 1 if an integrity check fails)
npm run research:programming:fetch    # download the dataset's raw sources into .cache/ (gitignored)
npm run research:programming:extract  # normalize them into docs/research/data/programming
npm run research:programming:build    # generate prisma/data/programming/{grids,days}; refuses to overwrite without --force
```

Reset the dev DB from scratch: `npx prisma migrate reset`, then `npm run db:seed`, then `npm run db:load:series`, then `npm run db:load:blocks`, then `npm run db:load:programming`. The order matters: series need the seeded channels, blocks need the series and their `SeriesChannel` rows, and programming needs the channels, series and blocks its aliases point to. Each loader fails without writing anything when a dependency is missing. The same order builds any fresh DB; set `DATABASE_URL` in the environment to target another file (`--env-file` and `process.loadEnvFile` don't override it). Always run the seed explicitly; it's idempotent (upserts by `slug`), so re-running is safe. Prisma's CLI refuses `migrate reset` when invoked by an AI agent without explicit user consent. Don't bypass that guard; ask the user.

Create schema changes with `npm run db:migrate -- --name <change>`. Don't use `prisma db push`; the DB is managed only through committed migrations in `prisma/migrations`. In Prisma 7, `migrate dev` no longer runs `generate` automatically, so the `postdb:migrate` npm hook runs it. Don't chain with `&&` inside `db:migrate`: npm appends `-- --name` args to the end of the script, so they'd go to `generate`, and `migrate dev` would hang waiting for an interactive name prompt.

Tests: `npm test` runs `src/**/*.test.ts` with Node's built-in `node:test` through `tsx` (no test framework dependency). Import, series-catalog, block-loader and programming-loader tests apply the real migrations to a throwaway SQLite DB in the OS temp dir (the TMDB ones also mock `fetch`), so they never touch `dev.db` or call TMDB.

`typecheck` runs `next typegen` first because globals like `LayoutProps<"/">` come from generated route types in `.next/`; plain `tsc` fails on a fresh clone.

## Prisma 7 setup (differs from Prisma 5/6)

- Config lives in `prisma.config.ts` (schema path, migrations path, datasource URL). The datasource `url` is **not** in `schema.prisma`.
- Prisma 7 does not load `.env` by itself. `prisma.config.ts` loads it with Node's built-in `process.loadEnvFile` (no `dotenv` dependency).
- Generator is `prisma-client` (not `prisma-client-js`) with output `src/generated/prisma`. Import the client from `@/generated/prisma/client`, never from `@prisma/client`. The generated folder is gitignored and ignored by ESLint.
- The client requires a driver adapter. Use the singleton `prisma` exported from `src/lib/prisma.ts` rather than instantiating `PrismaClient` elsewhere.
- `DATABASE_URL="file:./dev.db"` resolves relative to the project root for both the CLI and the app, so the DB file is `./dev.db` (gitignored; see `.env.example`).
- Keep `prisma`, `@prisma/client` and `@prisma/adapter-better-sqlite3` pinned to the same exact version. Note: the npm `latest` tag of `prisma` points to an 8.x RC, so `npm i prisma` without a version installs a mismatched prerelease.
- `better-sqlite3` is a native module; Next already treats it and `@prisma/client` as server-external packages, so no `next.config.ts` change is needed.

## Data model (`prisma/schema.prisma`)

- WikiToon's own DB is the source of truth for historical programming (channels, blocks, lineups, schedules, timeline). TMDB only enriches `Series`/`Season`/`Episode` (`tmdbId`, `overview`, `posterPath`, `stillPath`, `tmdbSyncedAt`); never let a TMDB sync overwrite curated fields like `Series.title` (the Latin American title).
- `SeriesChannel` is the canonical "series aired on channel" record. `SeriesBlock` (block lineup) and `Schedule` (concrete slots) add detail but don't replace it, so a series in a block should also have a `SeriesChannel` row. Both join tables allow multiple rows per pair to represent separate runs.
- `Block` is not owned by a `Channel`: `BlockChannel` (`block_channels`, composite primary key `@@id([blockId, channelId])`, no provenance columns) records which channels ran it, and `Block.slug` is globally unique. This exists because Fox Kids was succeeded by Jetix and five blocks continued across the rebrand; they are one block on two channels. Unlike the other join tables it allows only one row per pair: it records membership, not runs. Per-channel airing years are not modelled; if they are ever needed they belong on `BlockChannel` and require a migration.
- `Channel` is intentionally minimal (name, slug, country, `logoPath`, provenance). `logoPath` is a local path under `public/` set by the seed (including on `update`, so re-seeding restores it); assets live in `public/logos/` and each one's source, license and modifications are documented in `public/logos/SOURCES.md` (keep it in sync when a logo changes). Never store external URLs in `logoPath`. No description or launch/close years: channel history is not a feature at this stage; historical milestones go in `TimelineEvent` if needed.
- Seed (`prisma/seed.ts`) contains only the 7 base pan-regional channels. Don't add invented dates or source URLs to seed data.
- Curated blocks live in `prisma/data/blocks.ts` (block slug, name, `channelSlugs`, optional description, optional `logoPath`, series by `tmdbId`), not in the seed, because their series must be imported first. `loadBlocks` (`src/lib/import/blocks.ts`) is run by `scripts/load-blocks.ts` (`db:load:blocks`):
  - It validates everything before writing: channels exist, series exist, each block has at least one channel, each series has a `SeriesChannel` to **at least one** of the block's channels, no duplicate blocks, channels or series. On any problem it throws listing all of them and writes nothing. It runs in one transaction.
  - It upserts `Block` by `slug`, which is globally unique. The data file owns `name`, `description` and `logoPath` (omitted means null, so removing a logo from the file clears it); `startYear`/`endYear`/`sourceName`/`sourceUrl`/`notes` are never touched.
  - It creates a `BlockChannel` row only when the pair has none, so re-running is a no-op.
  - `Block.logoPath`, like `Channel.logoPath`, is a local asset path, never a URL. The loader rejects anything outside `/logos/blocks/`. Block assets live in `public/logos/blocks/`, named `{block-slug}` (globally unique, so no channel prefix). Each one is documented in `public/logos/blocks/SOURCES.md`.
  - Rule for adding a block logo: there must be evidence of Latin American use (Logopedia, used only as evidence), a file with a verifiable license (Wikimedia Commons), and a visual match between the two. Otherwise leave it null.
  - Never substitute another region's version, a Logopedia file (no free license) or a user recreation claiming its own license.
  - Exception on record: the current PNGs were supplied by the project owner and do **not** meet that rule (broadcast captures, no license). They are listed in a separate section of `SOURCES.md`, which also notes that `mysteria.png` and `doble-carga.png` carry no visible wordmark and were assigned on the file name alone, at the owner's instruction. Don't treat them as precedent for sourcing new logos.
  - It creates a `SeriesBlock` (null years/source) only when the pair has none, leaving existing rows (any run) untouched.
  - It is additive: blocks, `BlockChannel` and `SeriesBlock` rows missing from the file are never deleted or unlinked. Removing something means deleting it explicitly.
  - Only add blocks and series associations that are clear or that the project owner decides (see "Catalog policy" above). A block may be empty (`seriesTmdbIds: []`), but the block itself must be one known to have existed on those channels; never create one from a guessed name.
- Hanna-Barbera or any other studio is not an entity. Its shows are plain `Series` linked to channels (e.g. Boomerang). No Studio, Genre, Person, User, etc. unless explicitly requested.
- Provenance: historical records (`Channel`, `Series`, `Block`, `SeriesChannel`, `SeriesBlock`, `Schedule`, `ScheduleGrid`, `Feed`, `TimelineEvent`) carry `sourceName`, `sourceUrl`, `notes`; grid slots carry `notes` and inherit their grid's source. There is no separate Source table yet.
- Date formats:
  - `Schedule.airDate` is `"YYYY-MM-DD"` and `startTime`/`endTime` are `"HH:MM"` (24h), stored as TEXT in local broadcast time as published by the source. They are not `DateTime`, which would shift days across LatAm timezones, but they sort correctly as strings.
  - Ranges on blocks and joins use `startYear`/`endYear`.
  - `TimelineEvent` uses `year` + optional `month`/`day` for partial dates.
- Regional feeds: `Feed` (per channel, `@@unique([channelId, slug])`: name, region, `referenceTimeZone`) is referenced by `Schedule.feedId` and `ScheduleGrid.feedId`; null means the source doesn't document the feed. `Schedule.feed` (free-form text) is deprecated: kept only until the UI reads `Feed`, never set by new data, to be dropped then. `Channel.country` (ISO alpha-2, null = pan-regional) distinguishes national broadcasters.
- Programming: `ScheduleGrid` (a recurring weekly grid from one source, for a channel, feed and `validFrom`/`validTo` period) with `ScheduleGridSlot` rows, one per ISO weekday (1 = Monday). `Schedule` stays for concrete dated days. See "Programming data" below.
- `Certainty` enum (`VERIFIED`, `PROBABLE`, `UNCERTAIN`) on `ScheduleGridSlot`, `Schedule` and `TimelineEvent`. The `@default(UNCERTAIN)` on the last two only made the migration safe; loaders always set it.
- `Schedule.seriesId` is optional. When it's null, `listedTitle` should hold the title as printed in the source. That rule is enforced in app code; SQLite has no CHECK constraint for it.
- Delete behavior:
  - Deleting a `Channel` that has `BlockChannel`s, `Schedule`s, feeds or grids is blocked (`Restrict`), and so is deleting a `Feed` in use. Deleting a `Block` cascades its `BlockChannel` rows; deleting a grid cascades its slots.
  - Join rows cascade.
  - Optional references on `Schedule`/`TimelineEvent` are set to null.
- `TimelineEventType` and `Certainty` are Prisma enums, stored as TEXT in SQLite and validated by the client, not by the DB.

## Programming data (`prisma/data/programming`, `src/lib/import/programming.ts`)

- Research behind it: `docs/research/programming-grids.md` (sources, cross-checks, periods). Review list, regenerated by `db:report:programming`: `docs/research/programming-review.md` (don't edit by hand).
- A grid only states what its source states. It is never expanded into dated `Schedule` rows, gaps are never filled, and a partial source (the Cartoon Network 2000-10 México table) stays partial. Two sources for the same period are two grids, never merged. When they disagree, both list each other in `conflictsWith` (the loader requires it on both sides) and explain the conflict in `notes`; nobody picks a winner (Cartoon Network 2000-10: wiki vs official grid, Monday-Friday 15:00-17:00).
- Slots: `weekday` is the broadcast day and `broadcastDayStart` ("06:00") marks where it starts, so a Monday 01:00 slot airs in the early hours of Tuesday. Times are local to the grid's `timeZone` (the clock the source publishes in; null when not documented). The same feed can appear with different clocks: Boomerang in Buenos Aires time (wiki, official site) and in Monterrey time (Cablevisión), 2-3 hours apart.
- Certainty, per weekday slot:
  - VERIFIED: a primary source (channel's own site, cable operator guide) confirms it for that weekday. Cross-checks only count within the same or the following month, with a time offset explained by a documented time-zone or feed relationship. Each confirmation or difference is written in the slot's `notes` with the source URL.
  - PROBABLE: secondary source (wiki, blog) not contradicted.
  - UNCERTAIN: the source leaves the slot unidentified (`listedTitle` null) or flags it; `notes` must say why (the loader rejects UNCERTAIN without notes).
- Titles and blocks: `listedTitle`/`listedBlock` keep the source's text. `seriesId`/`blockId` come only from `title-aliases.ts`, `block-aliases.ts` (case/accent-insensitive, scoped by channel) or an explicit `seriesTmdbId` on a slot. Aliases never create series or blocks; an alias to a missing series or block, or to a block that doesn't run on the channel, fails the load. Titles with no alias stay unresolved and are listed in the review. Block labels outside the catalog (Hora ACME, Talismán, Girl Power, Nick Jr., Playhouse Disney...) stay as `listedBlock` only: don't create blocks for them.
- A catalog series scheduled on a channel it has no `SeriesChannel` for is only reported, never linked automatically.
- Loading: validated first, one transaction. Each grid file owns its slots (a reload replaces exactly that grid's slots) and each day owns its rows, identified by channel + date + `sourceUrl` (a reload replaces only those). Grids and days missing from the data, and any other `Schedule` rows, are never touched. Reloads are idempotent.
- Files: `feeds.ts`, `title-aliases.ts`, `block-aliases.ts` (hand-curated), `grids/<channel>/<period>-<variant>.ts` and `days/<channel>.ts` (generated, then curated by hand), `dataset.ts` (generated list), `index.ts`.
- Pipeline (`scripts/research/programming/`): `sources.ts` lists every source of the dataset, `dataset.ts` says how each grid is read, its feed, time zone, cross-checks and conflicts, `fetch.ts` downloads raw copies into `.cache/research/programming` (gitignored: third-party raw copies stay out of the repo), `extract.ts` writes normalized facts plus source URLs into `docs/research/data/programming` (committed, only the sources of the current dataset), and `build-dataset.ts` generates the data files and alias candidates (`.cache/.../title-candidates.json`). To add a period: add its sources and grid spec, run fetch, extract and build, review the new files and aliases, load, report.

## TMDB integration (`src/lib/tmdb/`)

- Public API via `@/lib/tmdb`: `searchTvSeries(query, { page, firstAirDateYear, language })`, `getTvSeriesDetails(id, { language })`, `getTvSeasonDetails(id, seasonNumber, { language })`, `tmdbImageUrl(path, size)`, `TmdbError`, plus response types in `types.ts` (only the fields we consume).
- Native `fetch`, 10s timeout, default language `es-MX` (Latin American Spanish titles/overviews when TMDB has them).
- Auth: `TMDB_READ_ACCESS_TOKEN` (TMDB "API Read Access Token", sent as `Authorization: Bearer`). Server-side only; never expose it with `NEXT_PUBLIC_`. The client throws at call time if it's missing, so builds don't need it.
- Intended flow: TMDB client -> pick a series -> write `Series`/`Season`/`Episode` rows via Prisma. Pages read from our DB, never from TMDB at render time. The client stays framework-agnostic and Prisma-free so it can run from `tsx` scripts. That's why it has no `server-only` import, which throws outside Next's server environment.
- Import: `src/lib/import/tmdb-series.ts` (the Prisma-aware layer; `src/lib/tmdb/` stays Prisma-free).
  - `findTmdbSeriesByExactTitle(title, firstAirYear)` requires exactly one match on normalized title + first-air year from page 1 of search. Otherwise it throws with the candidate list, so it never guesses.
  - `fetchTmdbSeries(tmdbId)` only calls TMDB (details plus every season). `writeTmdbSeries(tx, payload)` only writes: it upserts Series/Seasons/Episodes by `tmdbId` inside the caller's transaction. `importTmdbSeries(tmdbId)` composes both for a single series, idempotent and atomic. `Series.title`/`slug` are set only on create; an existing series never gets its slug changed.
  - Slug collisions on create are resolved by `resolveSeriesSlug` (`src/lib/import/series-slug.ts`), first free candidate wins: `{base}` -> `{base}-{firstAirYear}` -> `{base}-{firstAirYear}-{tmdbId}` (`{base}-{tmdbId}` when there's no year). A candidate owned by the same `tmdbId` counts as free; if all are taken it throws rather than guess.
  - Channel links (`SeriesChannel`) are never derived from TMDB. `linkSeriesToChannel` (`src/lib/import/series-channel.ts`) creates one with null years/source only when the caller passes a channel explicitly, and leaves existing rows untouched. It takes an optional transaction client.
  - The curated catalog is `prisma/data/series.ts`: entries of `tmdbId` plus optional `title`, `channelSlugs` and `seasons`, loaded in file order (so slug collision resolution is deterministic). To add a series to the catalog, add an entry there and run `db:load:series`. `loadSeriesCatalog` (`src/lib/import/series-catalog.ts`) is run by `scripts/load-series.ts`:
    1. It validates first: no duplicate `tmdbId`s or channels, every channel exists, titles are trimmed and slug-safe, season lists are valid, and no series already stores seasons outside its `seasons` list. On any problem it throws listing all of them and writes nothing.
    2. It fetches from TMDB before any write. By default it only fetches series missing from the DB; `--refresh` re-fetches every entry. Any TMDB failure aborts before writing.
    3. It writes everything (series, seasons, episodes, channel links) in one transaction, so there is never a partial load.
    - It is idempotent and additive: series and `SeriesChannel` rows missing from the file are never deleted, and existing links are never modified. Removing something means deleting it explicitly.
    - `title` is the curated Latin American title. On create it replaces TMDB's name and builds the slug; on an existing series it replaces the title only, so the slug never changes. Entries without it keep TMDB's `es-MX` name, and after a reset their slugs are rebuilt from TMDB's current name.
    - `seasons` limits the import to those TMDB season numbers, for umbrella entries that run past the catalog's scope (Power Rangers). Stored seasons outside the list are never deleted; the load fails listing them instead.
  - `scripts/import-series.ts` (`db:import:series`) stays for one-off imports and tests; what it imports is not in the catalog file, so it's not reproducible. Don't add per-series scripts. It validates `--channel` before calling TMDB. Imported TMDB text is stored as delivered (e.g. placeholder titles like "Episodio 1"); curation is a separate, future step.
  - Scripts live in `scripts/` and run via `tsx --env-file=.env`; never call TMDB from a page render.
- Store TMDB image **paths** (`posterPath`, `stillPath`) in the DB and build URLs with `tmdbImageUrl`. `next.config.ts` allows `https://image.tmdb.org/t/p/**` in `images.remotePatterns`, so `next/image` can render them. There is no backdrop field in the schema; series pages show the poster only.

## UI

- Pages read only from Prisma through `src/lib/data/` (`series.ts`, `channels.ts`, `blocks.ts`, `schedules.ts`, `timeline.ts`); never from TMDB at render time. Detail lookups are wrapped in React `cache()` so `generateMetadata`, layouts and pages share one query per request.
- Historical data (channel and block airing years, blocks, schedules, timeline events and their dates) is never invented or derived from TMDB. Historical dates are never turned into `Date` objects or shifted by timezone: `Schedule.airDate`/`startTime`/`endTime` and `TimelineEvent` year/month/day are formatted from their stored strings/numbers only (`formatScheduleDate`, `formatTimeRange`, `formatPartialDate`). Only `formatAirDate` (TMDB episode dates) and `formatDate` (`tmdbSyncedAt`) use `Intl` with UTC. Sections without data render an empty state; `SeriesChannel`/`SeriesBlock` years are shown only when documented, and TMDB years are labeled as the original run ("Emisión original"), not Latin American airing. Records show their source (`SourceNote`) when present.
- Rendering: all current pages are static. Dynamic routes (`[slug]`, `[canal]/[slug]`, `[canal]/[fecha]`) use `generateStaticParams` + `dynamicParams = false`, so unknown slugs return a real 404 and **new imports, seed or historical data only appear after a new build**. (On-demand rendering with a `loading.tsx` boundary streams a 200 before `notFound()` runs.) `next start` logs `Error: Internal: NoFallbackError` for those 404s; the responses are correct.
- Routes:
  - `/`: redirects to `/canales` (`next.config.ts`); there is no `src/app/page.tsx`.
  - `/series`: filterable poster grid (`SeriesBrowser`, see below), sorted with an `es` collator; `loading.tsx`, `error.tsx`.
  - `/series/[slug]`: archive record: poster, title, facts (original run, seasons, episodes, specials), overview, TMDB link + sync date, season accordion (specials last, `hiddenUntilFound` so find-in-page reaches closed seasons), TMDB placeholder titles shown as delivered; `loading.tsx`.
  - `/canales`: the main page. Channel cards with the distinct series count and the names of the channel's blocks; `error.tsx`.
  - `/canales/[slug]`: shared `layout.tsx` (logo, name, section nav with counts) and one route per section: `/canales/[slug]` (Series: a `SeriesBrowser` with a title search and one filter chip per block of the channel, by name; the selected block shows its description and links to `/bloques/[slug]`), `/canales/[slug]/programacion` (the channel's dates with schedule data, grouped by year, linking to `/programacion/[canal]/[fecha]`), `/canales/[slug]/timeline` (see Timeline below).
  - `/bloques`: global block catalog, sorted by name, as a grid of vertical `BlockCard`s (logo tile on top, name, its channels joined with " · ", description, distinct series count, documented years): 2 columns on mobile, 3 from `md`, 4 from `lg`. `error.tsx`.
  - `/bloques/[slug]`: block record: name, every channel that ran it (each linked, with its logo), channel count, documented years, description, source, and its series as `SeriesCard`s whose caption is the documented period(s) in the block (`formatRuns`), never TMDB years. One page per block, shared by all of its channels, because `Block.slug` is globally unique; build links with `blockHref(block)`, which needs only the slug. The old `/bloques/[canal]/[slug]` URL is gone; the app was never deployed, so there is nothing to redirect.
  - `/programacion`: global schedule index: one section per channel with schedule data, its dates grouped by year (`ScheduleDayLinks`, slot count per date); `error.tsx`.
  - `/programacion/[canal]/[fecha]`: one channel's slots for one `YYYY-MM-DD` date, sorted by `startTime` string (`ScheduleSlotList`). Each slot shows start/end time, linked series, `listedTitle` verbatim (`whitespace-pre-wrap`; shown as the title when there's no series, as "En la fuente: …" when there is), linked block, feed ("Señal X") and source; a slot may have a series, a block, both or neither. Only (channel, date) pairs with real rows are generated; other pairs, malformed dates and `/programacion/[canal]` are 404. Multiple feeds on one day are interleaved by time; no date filter, pagination or prev/next navigation yet.
  - `/timeline` and `/canales/[slug]/timeline`: see Timeline below.
  - `not-found.tsx` (Spanish 404). All main nav links now resolve.
  - Removed: `/canales/[slug]/bloques` (its blocks became the filter chips of the channel's Series section) and the placeholder home page.
- Series filters (`src/components/series/series-browser.tsx`, a Client Component): case- and accent-insensitive title search, channel chips (only on `/series`) and block chips with series counts (limited to the selected channel's blocks). Filtering is client-side, so the pages stay static. Filters live in the URL (`q`, `canal`, `bloque`) through `useSearchParams` and `window.history.replaceState`, so they survive going back from a series page; unknown values are ignored. The component wraps itself in `Suspense` with a no-filter view as fallback, which is what gets prerendered. Pass block links built with `blockHref` from the server: `src/lib/data/*` imports Prisma and must never be imported by a Client Component. For the same reason `SeriesPoster` imports `@/lib/tmdb/images`, not the `@/lib/tmdb` barrel.
- Timeline:
  - `/timeline` is the global timeline; `/canales/[slug]/timeline` is filtered by channel. Both use `listTimelineEvents` (`src/lib/data/timeline.ts`) and the `TimelineList` component (`src/components/timeline/`), so they look the same.
  - Grouped by year; ordered by year, month, day (then id). Month/day may be null and the event is still valid: within a year, events with no month come first, then month without day, then full dates (`nulls: "first"`). Dates are shown with the precision available: "1997", "mar 1997", "4 mar 1997".
  - `TimelineEventType` labels (in `TimelineList`): CHANNEL_LAUNCH "Lanzamiento de canal", CHANNEL_CLOSURE "Cierre de canal", REBRAND "Cambio de imagen", BLOCK_LAUNCH "Estreno de bloque", BLOCK_END "Fin de bloque", SERIES_PREMIERE "Estreno de serie", SERIES_FINALE "Final de serie", OTHER "Otro".
  - Each event shows date, type, title, description and source when present; its related channel, series and block link to `/canales/[slug]`, `/series/[slug]` and `/bloques/[slug]` (the channel link is hidden inside that channel's own timeline).
  - Channel timeline rule (`channelTimelineWhere`): events with that `channelId`, plus events of the blocks that ran on the channel (`block: { blockChannels: { some: { channelId } } }`), even when their `channelId` is null. A block shared by Fox Kids and Jetix therefore surfaces its events in both timelines. Series-only events are not included, because a series can be linked to several channels. The channel nav "Timeline" count uses the same `channelTimelineWhere`, so it always matches the list.
  - No search, filters or pagination yet.
- Shared data/format helpers (reuse them instead of duplicating):
  - `src/lib/data/blocks.ts`: one block summary select for both the global catalog (`listBlocks`) and a channel's blocks (`listChannelBlocks`, used for the channel's filter chips), with each block's channels and distinct series counts; `getBlock(blockSlug)`, `listBlockParams`, `blockHref`.
  - `src/lib/data/series.ts`: `seriesCardSelect` (fields a `SeriesCard` needs), `listSeriesWithLinks` (every series with its channel and block slugs, for `/series`) and `groupSeriesRuns` (groups `SeriesChannel`/`SeriesBlock` rows per series, keeping every run), used by series, channels and blocks.
  - `src/lib/data/schedules.ts`: `listScheduleChannels` (global index), `listChannelScheduleDays` (channel section), `listScheduleDayParams`, `getScheduleDay`, `scheduleDayHref`; dates come from a `groupBy` on `(channelId, airDate)`.
  - `src/lib/data/timeline.ts`: `listTimelineEvents({ channelId? })` and `channelTimelineWhere` (also used by the channel count in `channels.ts`).
  - `src/lib/format.ts`: `formatYearRange`, `formatRuns` (documented runs only), `formatScheduleDate`, `formatTimeRange`, `formatPartialDate` (no `Date`), `formatAirDate`, `formatDate`, `pluralize`.
- Layout (`src/app/layout.tsx`): sticky `SiteHeader` (brand linking to `/canales` + main nav: Canales, Series, Bloques, Programación, Timeline; horizontal scroll on mobile), `SiteFooter` with the TMDB attribution required by TMDB's terms, title template `%s · WikiToon`.
- Components: app components in `src/components/` (`container`, `site-header`, `site-footer`, `empty-state`, `source-note`, `route-error`), plus `series/`, `channels/`, `blocks/`, `schedule/` and `timeline/`. `LogoTile` (`src/components/logo-tile.tsx`) renders channel and block logos (`imageClassName` widens the logo's inset for large tiles, as in `BlockCard`): it expects `logoPath` to be a local path under `public/` and shows the name's initials (first letter or digit of the first two words) when it's null. `ChannelLogo` is an alias of it. Block logos appear in `BlockCard` (`/bloques`, `/canales/[slug]/bloques`) and the block page header. Schedule slots and timeline events link blocks as text only. Logos render inside a dark `bg-muted` tile, so dark/black logos need a light variant (Disney Channel and Boomerang use white-recolored variants for this reason).
- Motion (`motion/react`) is used only for the active-item indicators (`layoutId`) in the main nav and the channel section nav, both client components.
- Design: dark-only for now, minimal (Linear/Vercel style), neutral base-nova tokens with a single amber accent (`--primary`/`--ring`), used for small labels, the brand dot, focus and active indicators. Subtle borders; hover darkens or changes border, never scales. Mobile-first.

## shadcn/ui

- Config in `components.json`. Add components with `npx shadcn@latest add <name>`; they land in `src/components/ui`. Installed: `accordion`, `button`, `skeleton`.
- Primitives are **Base UI** (`@base-ui/react`), not Radix. Composition uses Base UI's `render` prop, not Radix's `asChild`. Check the generated component source before assuming a Radix API.
- `cn()` comes from the `cn` package (by shadcn, replaces `clsx` + `tailwind-merge`); `src/lib/utils.ts` re-exports it.
- Theme tokens (oklch CSS variables, light in `:root`, dark in `.dark`) live in `src/app/globals.css`, which also imports `tw-animate-css` and `shadcn/tailwind.css`. Dark mode is class-based (`@custom-variant dark`); `layout.tsx` sets `dark scheme-dark` on `<html>`, so the app is always dark (no theme toggle). The light `:root` tokens are unused but kept, with the amber accent in both.
- Font: Geist via `next/font/google` in `src/app/layout.tsx`, exposed as `--font-sans`.

## Conventions

- Prisma schema: DB tables (plural, e.g. `series_channels`) and columns follow `snake_case` via `@map`/`@@map`; Prisma model and field names stay `camelCase` in application code. IDs are autoincrement `Int`; public URLs should use `slug` (`Channel`, `Series` and `Block` all globally unique).
- shadcn/ui components go in `src/components/ui`; app-specific components live outside that folder.
- Path alias `@/*` maps to `src/*`.
