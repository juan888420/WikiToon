# WikiToon

An archive of Latin American children's and teen TV from the 90s and 2000s: the channels, the
series they aired, their programming blocks and documented schedules. WikiToon is a reference
site, not a streaming service: it hosts no video. The UI is in Spanish.

Built with Next.js (App Router), TypeScript, Tailwind CSS, Prisma 7 with SQLite, and series
metadata from [TMDB](https://www.themoviedb.org). Every page is prerendered at build time.

> This product uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved
> by TMDB. Channel and block logos are trademarks of their owners.

## Local development

Requires Node 24.

```bash
npm install
cp .env.example .env   # set TMDB_READ_ACCESS_TOKEN to load series from TMDB
npm run db:deploy      # create dev.db from the committed migrations
npm run db:seed        # channels
npm run db:load:series # series catalog (calls TMDB)
npm run db:load:blocks
npm run db:load:programming
npm run dev
```

The order matters: each loader needs the data of the previous one. All loaders are idempotent.
The curated data lives in `prisma/data/`; see `CLAUDE.md` for the data model and the rules
behind each dataset.

Checks: `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`.

## Production data

The catalog database is **not** in this repository: it contains TMDB content, and TMDB's API
terms don't allow publishing it as a dataset or caching it for more than six months. The
production build downloads it from private storage before prerendering:

1. Load or refresh the local database (`npm run db:load:series -- --refresh` re-syncs TMDB data;
   do it at least every six months), then run `npm run db:snapshot`. It writes
   `.data/catalog.db` (gitignored) and prints its checksum.
2. Upload that file to private storage that serves it over HTTPS, optionally behind a bearer
   token. For example, a release asset in a private GitHub repository, fetched through the API
   URL `https://api.github.com/repos/<owner>/<repo>/releases/assets/<id>` with a fine-grained
   token that can only read that repository. Uploading a new file changes the asset id, so
   update `CATALOG_DB_URL` too.
3. Redeploy. `npm run build` runs `scripts/fetch-db.ts` first: it downloads the file, checks that
   it is a SQLite database with every committed migration applied and a loaded catalog, and
   stops the build otherwise.

Environment variables for the production build (Vercel):

| Variable | Value |
|---|---|
| `DATABASE_URL` | `file:./.data/catalog.db` |
| `CATALOG_DB_URL` | URL of the uploaded snapshot |
| `CATALOG_DB_TOKEN` | Bearer token for that URL, if the storage needs one |
| `NEXT_PUBLIC_SITE_URL` | Production origin, e.g. `https://wikitoon.example` (canonical URLs, sitemap, previews) |

`TMDB_READ_ACCESS_TOKEN` is only needed locally, by the loaders. The deployed site never queries
the database or TMDB at runtime, so content changes need a new snapshot and a redeploy.

## Credits

- Series metadata and posters: [TMDB](https://www.themoviedb.org).
- Logo lettering: Luckiest Guy by Astigmatic (Apache License 2.0). Asset sources and licenses:
  `public/brand/SOURCES.md`, `public/logos/SOURCES.md`, `public/logos/blocks/SOURCES.md`.
