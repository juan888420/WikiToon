# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What WikiToon is

WikiToon is an archive and exploration platform for Latin American children's TV, focused mainly on the 90s and 2000s era. It organizes and displays the historical record of channels, series, programming blocks, and schedules that made up Latin American kids' TV. It is **not** a streaming service: no video playback/hosting, just structured reference and browsing of what aired, where, and when. UI content is in Spanish (`<html lang="es">`).

## Project status

Data layer defined (schema + initial migration), no seed data, no API routes, no UI yet. `src/app/page.tsx` is a placeholder.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19
- TypeScript (strict)
- Tailwind CSS v4 (CSS-first config via `@import "tailwindcss"` in `src/app/globals.css`, no `tailwind.config`)
- shadcn/ui (CLI 4.x, style `base-nova`, base color `neutral`, CSS variables). See the shadcn/ui section below.
- Motion: import from `motion/react`. This project uses the current `motion` package, not `framer-motion`; this overrides the global CLAUDE.md default for this repo, so don't "correct" it back.
- Lucide (`lucide-react`)
- Prisma 7 + SQLite via the `better-sqlite3` driver adapter
- TMDB API (series metadata and artwork only; typed client in `src/lib/tmdb/`, see below)
- Deploy on Vercel

## Commands

```bash
npm run dev          # dev server (Turbopack)
npm run build        # production build
npm run lint         # ESLint (flat config, eslint.config.mjs)
npm run typecheck    # next typegen && tsc --noEmit
npm run db:generate  # prisma generate (also runs on postinstall)
npm run db:migrate   # prisma migrate dev, then `postdb:migrate` hook runs prisma generate
npm run db:deploy    # prisma migrate deploy (apply existing migrations, no prompts)
npm run db:seed      # prisma db seed -> runs `tsx prisma/seed.ts` (configured in prisma.config.ts)
npm run db:studio    # prisma studio
```

Reset the dev DB from scratch: `npx prisma migrate reset`, then `npm run db:seed`. Always run the seed explicitly; it's idempotent (upserts by `slug`), so re-running is safe. Prisma's CLI refuses `migrate reset` when invoked by an AI agent without explicit user consent. Don't bypass that guard; ask the user.

Create schema changes with `npm run db:migrate -- --name <change>`. Don't use `prisma db push`; the DB is managed only through committed migrations in `prisma/migrations`. In Prisma 7, `migrate dev` no longer runs `generate` automatically, so the `postdb:migrate` npm hook runs it. Don't chain with `&&` inside `db:migrate`: npm appends `-- --name` args to the end of the script, so they'd go to `generate`, and `migrate dev` would hang waiting for an interactive name prompt.

No test framework is set up yet.

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
- `Channel` is intentionally minimal (name, slug, country, `logoPath`, provenance). `logoPath` stays null until logo assets are chosen. No description or launch/close years: channel history is not a feature at this stage; historical milestones go in `TimelineEvent` if needed.
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

- Public API via `@/lib/tmdb`: `searchTvSeries(query, { page, firstAirDateYear, language })`, `getTvSeriesDetails(id, { language })`, `tmdbImageUrl(path, size)`, `TmdbError`, plus response types in `types.ts` (only the fields we consume).
- Native `fetch`, 10s timeout, default language `es-MX` (Latin American Spanish titles/overviews when TMDB has them).
- Auth: `TMDB_READ_ACCESS_TOKEN` (TMDB "API Read Access Token", sent as `Authorization: Bearer`). Server-side only; never expose it with `NEXT_PUBLIC_`. The client throws at call time if it's missing, so builds don't need it.
- Intended flow: TMDB client -> pick a series -> write `Series`/`Season`/`Episode` rows via Prisma. Pages read from our DB, never from TMDB at render time. The client stays framework-agnostic and Prisma-free so it can run from `tsx` scripts. That's why it has no `server-only` import, which throws outside Next's server environment.
- Import: `src/lib/import/tmdb-series.ts` (the Prisma-aware layer; `src/lib/tmdb/` stays Prisma-free).
  - `findTmdbSeriesByExactTitle(title, firstAirYear)` requires exactly one match on normalized title + first-air year from page 1 of search. Otherwise it throws with the candidate list, so it never guesses.
  - `importTmdbSeries(tmdbId)` fetches everything first, then upserts Series/Seasons/Episodes by `tmdbId` in one transaction. It's idempotent and atomic. `Series.title`/`slug` are set only on create.
  - Channel links (`SeriesChannel`) are never derived from TMDB; import scripts create them explicitly with null years/source unless verified.
  - Scripts live in `scripts/` and run via `tsx --env-file=.env` (e.g. `npm run db:import:ben10`); never call TMDB from a page render.
- Store TMDB image **paths** (`posterPath`, `stillPath`) in the DB and build URLs with `tmdbImageUrl`. `next/image` will need `image.tmdb.org` in `images.remotePatterns` when UI uses it.

## shadcn/ui

- Config in `components.json`. Add components with `npx shadcn@latest add <name>`; they land in `src/components/ui`. No components are installed yet.
- Primitives are **Base UI** (`@base-ui/react`), not Radix. Composition uses Base UI's `render` prop, not Radix's `asChild`. Check the generated component source before assuming a Radix API.
- `cn()` comes from the `cn` package (by shadcn, replaces `clsx` + `tailwind-merge`); `src/lib/utils.ts` re-exports it.
- Theme tokens (oklch CSS variables, light in `:root`, dark in `.dark`) live in `src/app/globals.css`, which also imports `tw-animate-css` and `shadcn/tailwind.css`. Dark mode is class-based (`@custom-variant dark`), and nothing sets the `.dark` class yet.
- Font: Geist via `next/font/google` in `src/app/layout.tsx`, exposed as `--font-sans`.

## Conventions

- Prisma schema: DB tables (plural, e.g. `series_channels`) and columns follow `snake_case` via `@map`/`@@map`; Prisma model and field names stay `camelCase` in application code. IDs are autoincrement `Int`; public URLs should use `slug` (`Channel`/`Series` globally unique, `Block` unique per channel).
- shadcn/ui components go in `src/components/ui`; app-specific components live outside that folder.
- Path alias `@/*` maps to `src/*`.
