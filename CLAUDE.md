# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What WikiToon is

WikiToon is an archive and exploration platform for Latin American children's TV, focused mainly on the 90s and 2000s era. It organizes and displays the historical record of channels, series, programming blocks, and schedules that made up Latin American kids' TV. It is **not** a streaming service: no video playback/hosting, just structured reference and browsing of what aired, where, and when. UI content is in Spanish (`<html lang="es">`).

## Project status

- Data layer: schema with 3 migrations, idempotent seed (7 channels), generic TMDB series importer with tests.
- UI: global layout, Series module (`/series`, `/series/[slug]`), Channels module (`/canales`, `/canales/[slug]` + sections), Blocks module (`/bloques`, `/bloques/[canal]/[slug]`), Schedule module (`/programacion`, `/programacion/[canal]/[fecha]`) and Timeline (`/timeline`). See "UI" below.
- Not built yet: home page content (`src/app/page.tsx` is still a placeholder), API routes.
- Catalog in `dev.db` (as of 2026-09-24):
  - 7 channels (seed), all with a local `logoPath` (`/logos/{slug}.svg`, Jetix `.png`).
  - 10 series imported from TMDB (Ben 10, The Powerpuff Girls, Dexter's Laboratory, Courage the Cowardly Dog, Ed, Edd n Eddy, Johnny Bravo, Samurai Jack, Codename: Kids Next Door, Foster's Home for Imaginary Friends, The Grim Adventures of Billy and Mandy): 62 seasons, 1427 episodes. Titles/slugs come from TMDB `es-MX` names (e.g. `el-laboratorio-de-dexter`).
  - 10 `SeriesChannel` rows, all to Cartoon Network, with `startYear`/`endYear`/`sourceName`/`sourceUrl` null. They are catalog links, not verified airing records.
  - 0 blocks and 0 series-block rows (so `/bloques` shows its empty state and no block pages are generated), 0 schedules (so `/programacion` shows its empty state and no day pages are generated), 0 timeline events (so `/timeline` and every channel timeline show their empty state).
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
npm run db:import:series -- --tmdb-id <id> [--channel <slug>]
npm run db:import:series -- --title "<title>" --year <first air year> [--channel <slug>]
npm run db:import:ben10  # wrapper: --title "Ben 10" --year 2005 --channel cartoon-network
```

Reset the dev DB from scratch: `npx prisma migrate reset`, then `npm run db:seed`. Always run the seed explicitly; it's idempotent (upserts by `slug`), so re-running is safe. Prisma's CLI refuses `migrate reset` when invoked by an AI agent without explicit user consent. Don't bypass that guard; ask the user.

Create schema changes with `npm run db:migrate -- --name <change>`. Don't use `prisma db push`; the DB is managed only through committed migrations in `prisma/migrations`. In Prisma 7, `migrate dev` no longer runs `generate` automatically, so the `postdb:migrate` npm hook runs it. Don't chain with `&&` inside `db:migrate`: npm appends `-- --name` args to the end of the script, so they'd go to `generate`, and `migrate dev` would hang waiting for an interactive name prompt.

Tests: `npm test` runs `src/**/*.test.ts` with Node's built-in `node:test` through `tsx` (no test framework dependency). Import tests apply the real migrations to a throwaway SQLite DB in the OS temp dir and mock `fetch`, so they never touch `dev.db` or call TMDB.

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
- `Channel` is intentionally minimal (name, slug, country, `logoPath`, provenance). `logoPath` is a local path under `public/` set by the seed (including on `update`, so re-seeding restores it); assets live in `public/logos/` and each one's source, license and modifications are documented in `public/logos/SOURCES.md` (keep it in sync when a logo changes). Never store external URLs in `logoPath`. No description or launch/close years: channel history is not a feature at this stage; historical milestones go in `TimelineEvent` if needed.
- Seed (`prisma/seed.ts`) contains only the 7 base pan-regional channels. Don't add invented dates or source URLs to seed data.
- Hanna-Barbera or any other studio is not an entity. Its shows are plain `Series` linked to channels (e.g. Boomerang). No Studio, Genre, Person, User, etc. unless explicitly requested.
- Provenance: historical records (`Channel`, `Series`, `Block`, `SeriesChannel`, `SeriesBlock`, `Schedule`, `TimelineEvent`) carry `sourceName`, `sourceUrl`, `notes`. There is no separate Source table yet.
- Date formats:
  - `Schedule.airDate` is `"YYYY-MM-DD"` and `startTime`/`endTime` are `"HH:MM"` (24h), stored as TEXT in local broadcast time as published by the source. They are not `DateTime`, which would shift days across LatAm timezones, but they sort correctly as strings.
  - Ranges on blocks and joins use `startYear`/`endYear`.
  - `TimelineEvent` uses `year` + optional `month`/`day` for partial dates.
- Regional feeds: `Schedule.feed` is a free-form code (e.g. `"MX"`, `"Sur"`), null meaning unknown or pan-regional. It's the hook for a future `Feed` model; don't build one without asking. `Channel.country` (ISO alpha-2, null = pan-regional) distinguishes national broadcasters.
- `Schedule.seriesId` is optional. When it's null, `listedTitle` should hold the title as printed in the source. That rule is enforced in app code; SQLite has no CHECK constraint for it.
- Delete behavior:
  - Deleting a `Channel` that has `Block`s or `Schedule`s is blocked (`Restrict`).
  - Join rows cascade.
  - Optional references on `Schedule`/`TimelineEvent` are set to null.
- `TimelineEventType` is a Prisma enum, stored as TEXT in SQLite and validated by the client, not by the DB.

## TMDB integration (`src/lib/tmdb/`)

- Public API via `@/lib/tmdb`: `searchTvSeries(query, { page, firstAirDateYear, language })`, `getTvSeriesDetails(id, { language })`, `getTvSeasonDetails(id, seasonNumber, { language })`, `tmdbImageUrl(path, size)`, `TmdbError`, plus response types in `types.ts` (only the fields we consume).
- Native `fetch`, 10s timeout, default language `es-MX` (Latin American Spanish titles/overviews when TMDB has them).
- Auth: `TMDB_READ_ACCESS_TOKEN` (TMDB "API Read Access Token", sent as `Authorization: Bearer`). Server-side only; never expose it with `NEXT_PUBLIC_`. The client throws at call time if it's missing, so builds don't need it.
- Intended flow: TMDB client -> pick a series -> write `Series`/`Season`/`Episode` rows via Prisma. Pages read from our DB, never from TMDB at render time. The client stays framework-agnostic and Prisma-free so it can run from `tsx` scripts. That's why it has no `server-only` import, which throws outside Next's server environment.
- Import: `src/lib/import/tmdb-series.ts` (the Prisma-aware layer; `src/lib/tmdb/` stays Prisma-free).
  - `findTmdbSeriesByExactTitle(title, firstAirYear)` requires exactly one match on normalized title + first-air year from page 1 of search. Otherwise it throws with the candidate list, so it never guesses.
  - `importTmdbSeries(tmdbId)` fetches everything first, then upserts Series/Seasons/Episodes by `tmdbId` in one transaction. It's idempotent and atomic. `Series.title`/`slug` are set only on create; an existing series never gets its slug changed.
  - Slug collisions on create are resolved by `resolveSeriesSlug` (`src/lib/import/series-slug.ts`), first free candidate wins: `{base}` -> `{base}-{firstAirYear}` -> `{base}-{firstAirYear}-{tmdbId}` (`{base}-{tmdbId}` when there's no year). A candidate owned by the same `tmdbId` counts as free; if all are taken it throws rather than guess.
  - Channel links (`SeriesChannel`) are never derived from TMDB. `linkSeriesToChannel` (`src/lib/import/series-channel.ts`) creates one with null years/source only when the caller passes a channel explicitly, and leaves existing rows untouched.
  - One generic CLI, `scripts/import-series.ts` (`db:import:series`), for every series; don't add per-series scripts (`db:import:ben10` is just an npm alias with fixed args). It validates `--channel` before calling TMDB. Imported TMDB text is stored as delivered (e.g. placeholder titles like "Episodio 1"); curation is a separate, future step.
  - Scripts live in `scripts/` and run via `tsx --env-file=.env`; never call TMDB from a page render.
- Store TMDB image **paths** (`posterPath`, `stillPath`) in the DB and build URLs with `tmdbImageUrl`. `next.config.ts` allows `https://image.tmdb.org/t/p/**` in `images.remotePatterns`, so `next/image` can render them. There is no backdrop field in the schema; series pages show the poster only.

## UI

- Pages read only from Prisma through `src/lib/data/` (`series.ts`, `channels.ts`, `blocks.ts`, `schedules.ts`, `timeline.ts`); never from TMDB at render time. Detail lookups are wrapped in React `cache()` so `generateMetadata`, layouts and pages share one query per request.
- Historical data (channel and block airing years, blocks, schedules, timeline events and their dates) is never invented or derived from TMDB. Historical dates are never turned into `Date` objects or shifted by timezone: `Schedule.airDate`/`startTime`/`endTime` and `TimelineEvent` year/month/day are formatted from their stored strings/numbers only (`formatScheduleDate`, `formatTimeRange`, `formatPartialDate`). Only `formatAirDate` (TMDB episode dates) and `formatDate` (`tmdbSyncedAt`) use `Intl` with UTC. Sections without data render an empty state; `SeriesChannel`/`SeriesBlock` years are shown only when documented, and TMDB years are labeled as the original run ("Emisión original"), not Latin American airing. Records show their source (`SourceNote`) when present.
- Rendering: all current pages are static. Dynamic routes (`[slug]`, `[canal]/[slug]`, `[canal]/[fecha]`) use `generateStaticParams` + `dynamicParams = false`, so unknown slugs return a real 404 and **new imports, seed or historical data only appear after a new build**. (On-demand rendering with a `loading.tsx` boundary streams a 200 before `notFound()` runs.) `next start` logs `Error: Internal: NoFallbackError` for those 404s; the responses are correct.
- Routes:
  - `/`: placeholder.
  - `/series`: poster grid (`SeriesCard`), sorted with an `es` collator; `loading.tsx`, `error.tsx`.
  - `/series/[slug]`: archive record: poster, title, facts (original run, seasons, episodes, specials), overview, TMDB link + sync date, season accordion (specials last, `hiddenUntilFound` so find-in-page reaches closed seasons), TMDB placeholder titles shown as delivered; `loading.tsx`.
  - `/canales`: channel cards with distinct series count and block count; `error.tsx`.
  - `/canales/[slug]`: shared `layout.tsx` (logo, name, section nav with counts) and one route per section: `/canales/[slug]` (Series), `/canales/[slug]/bloques` (the channel's blocks as `BlockCard`s linking to `/bloques/[canal]/[slug]`), `/canales/[slug]/programacion` (the channel's dates with schedule data, grouped by year, linking to `/programacion/[canal]/[fecha]`), `/canales/[slug]/timeline` (see Timeline below).
  - `/bloques`: global block catalog (`BlockCard`: name, channel, documented years, distinct series count), sorted by name then channel; `error.tsx`.
  - `/bloques/[canal]/[slug]`: block record: name, linked channel, documented years, description, source, and its series as `SeriesCard`s whose caption is the documented period(s) in the block (`formatRuns`), never TMDB years. The URL carries the channel slug because `Block.slug` is only unique per channel (`@@unique([channelId, slug])`); build links with `blockHref`. `/bloques/[canal]` alone is a 404.
  - `/programacion`: global schedule index: one section per channel with schedule data, its dates grouped by year (`ScheduleDayLinks`, slot count per date); `error.tsx`.
  - `/programacion/[canal]/[fecha]`: one channel's slots for one `YYYY-MM-DD` date, sorted by `startTime` string (`ScheduleSlotList`). Each slot shows start/end time, linked series, `listedTitle` verbatim (`whitespace-pre-wrap`; shown as the title when there's no series, as "En la fuente: …" when there is), linked block, feed ("Señal X") and source; a slot may have a series, a block, both or neither. Only (channel, date) pairs with real rows are generated; other pairs, malformed dates and `/programacion/[canal]` are 404. Multiple feeds on one day are interleaved by time; no date filter, pagination or prev/next navigation yet.
  - `/timeline` and `/canales/[slug]/timeline`: see Timeline below.
  - `not-found.tsx` (Spanish 404). All main nav links now resolve.
- Timeline:
  - `/timeline` is the global timeline; `/canales/[slug]/timeline` is filtered by channel. Both use `listTimelineEvents` (`src/lib/data/timeline.ts`) and the `TimelineList` component (`src/components/timeline/`), so they look the same.
  - Grouped by year; ordered by year, month, day (then id). Month/day may be null and the event is still valid: within a year, events with no month come first, then month without day, then full dates (`nulls: "first"`). Dates are shown with the precision available: "1997", "mar 1997", "4 mar 1997".
  - `TimelineEventType` labels (in `TimelineList`): CHANNEL_LAUNCH "Lanzamiento de canal", CHANNEL_CLOSURE "Cierre de canal", REBRAND "Cambio de imagen", BLOCK_LAUNCH "Estreno de bloque", BLOCK_END "Fin de bloque", SERIES_PREMIERE "Estreno de serie", SERIES_FINALE "Final de serie", OTHER "Otro".
  - Each event shows date, type, title, description and source when present; its related channel, series and block link to `/canales/[slug]`, `/series/[slug]` and `/bloques/[canal]/[slug]` (the channel link is hidden inside that channel's own timeline).
  - Channel timeline rule (`channelTimelineWhere`): events with that `channelId`, plus events of the channel's blocks (a block belongs to exactly one channel), even when their `channelId` is null. Series-only events are not included, because a series can be linked to several channels. The channel nav "Timeline" count uses the same `channelTimelineWhere`, so it always matches the list.
  - No search, filters or pagination yet.
- Shared data/format helpers (reuse them instead of duplicating):
  - `src/lib/data/blocks.ts`: one block summary select for both the global catalog (`listBlocks`) and the channel section (`listChannelBlocks`), with distinct series counts; `getBlock(channelSlug, blockSlug)`, `listBlockParams`, `blockHref`.
  - `src/lib/data/series.ts`: `seriesCardSelect` (fields a `SeriesCard` needs) and `groupSeriesRuns` (groups `SeriesChannel`/`SeriesBlock` rows per series, keeping every run), used by series, channels and blocks.
  - `src/lib/data/schedules.ts`: `listScheduleChannels` (global index), `listChannelScheduleDays` (channel section), `listScheduleDayParams`, `getScheduleDay`, `scheduleDayHref`; dates come from a `groupBy` on `(channelId, airDate)`.
  - `src/lib/data/timeline.ts`: `listTimelineEvents({ channelId? })` and `channelTimelineWhere` (also used by the channel count in `channels.ts`).
  - `src/lib/format.ts`: `formatYearRange`, `formatRuns` (documented runs only), `formatScheduleDate`, `formatTimeRange`, `formatPartialDate` (no `Date`), `formatAirDate`, `formatDate`, `pluralize`.
- Layout (`src/app/layout.tsx`): sticky `SiteHeader` (brand + main nav: Inicio, Canales, Series, Bloques, Programación, Timeline; horizontal scroll on mobile), `SiteFooter` with the TMDB attribution required by TMDB's terms, title template `%s · WikiToon`.
- Components: app components in `src/components/` (`container`, `site-header`, `site-footer`, `empty-state`, `source-note`, `route-error`), plus `series/`, `channels/`, `blocks/`, `schedule/` and `timeline/`. `ChannelLogo` expects `logoPath` to be a local path under `public/` and shows initials when it's null. Logos render inside a dark `bg-muted` tile, so dark/black logos need a light variant (Disney Channel and Boomerang use white-recolored variants for this reason).
- Motion (`motion/react`) is used only for the active-item indicators (`layoutId`) in the main nav and the channel section nav, both client components.
- Design: dark-only for now, minimal (Linear/Vercel style), neutral base-nova tokens with a single amber accent (`--primary`/`--ring`), used for small labels, the brand dot, focus and active indicators. Subtle borders; hover darkens or changes border, never scales. Mobile-first.

## shadcn/ui

- Config in `components.json`. Add components with `npx shadcn@latest add <name>`; they land in `src/components/ui`. Installed: `accordion`, `button`, `skeleton`.
- Primitives are **Base UI** (`@base-ui/react`), not Radix. Composition uses Base UI's `render` prop, not Radix's `asChild`. Check the generated component source before assuming a Radix API.
- `cn()` comes from the `cn` package (by shadcn, replaces `clsx` + `tailwind-merge`); `src/lib/utils.ts` re-exports it.
- Theme tokens (oklch CSS variables, light in `:root`, dark in `.dark`) live in `src/app/globals.css`, which also imports `tw-animate-css` and `shadcn/tailwind.css`. Dark mode is class-based (`@custom-variant dark`); `layout.tsx` sets `dark scheme-dark` on `<html>`, so the app is always dark (no theme toggle). The light `:root` tokens are unused but kept, with the amber accent in both.
- Font: Geist via `next/font/google` in `src/app/layout.tsx`, exposed as `--font-sans`.

## Conventions

- Prisma schema: DB tables (plural, e.g. `series_channels`) and columns follow `snake_case` via `@map`/`@@map`; Prisma model and field names stay `camelCase` in application code. IDs are autoincrement `Int`; public URLs should use `slug` (`Channel`/`Series` globally unique, `Block` unique per channel).
- shadcn/ui components go in `src/components/ui`; app-specific components live outside that folder.
- Path alias `@/*` maps to `src/*`.
