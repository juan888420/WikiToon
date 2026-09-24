import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, before, describe, it, mock } from "node:test";
import type { TmdbTvSeasonDetails, TmdbTvSeriesDetails } from "@/lib/tmdb";

// Runs against a throwaway SQLite DB with the real migrations applied and a mocked TMDB, so it
// never touches dev.db or the network. Env must be set before `@/lib/prisma` is first imported.
const tempDir = mkdtempSync(path.join(tmpdir(), "wikitoon-test-"));
process.env.DATABASE_URL = `file:${path.join(tempDir, "test.db")}`;
process.env.TMDB_READ_ACCESS_TOKEN = "test-token";

type Fixture = { details: TmdbTvSeriesDetails; season: TmdbTvSeasonDetails };

function fixture(tmdbId: number, name: string, firstAirDate: string): Fixture {
  return {
    details: {
      id: tmdbId,
      name,
      original_name: name,
      overview: "",
      first_air_date: firstAirDate,
      last_air_date: firstAirDate,
      poster_path: null,
      backdrop_path: null,
      number_of_seasons: 1,
      number_of_episodes: 1,
      seasons: [
        {
          id: tmdbId * 10,
          season_number: 1,
          name: "Temporada 1",
          overview: "",
          air_date: firstAirDate,
          episode_count: 1,
          poster_path: null,
        },
      ],
      origin_country: ["US"],
      original_language: "en",
      status: "Ended",
    },
    season: {
      id: tmdbId * 10,
      season_number: 1,
      name: "Temporada 1",
      overview: "",
      air_date: firstAirDate,
      poster_path: null,
      episodes: [
        {
          id: tmdbId * 100,
          episode_number: 1,
          season_number: 1,
          name: "Episodio 1",
          overview: "",
          air_date: firstAirDate,
          still_path: null,
        },
      ],
    },
  };
}

const fixtures = new Map<number, Fixture>([
  [4686, fixture(4686, "Ben 10", "2005-12-27")],
  [68295, fixture(68295, "Ben 10", "2016-10-01")],
  // Hypothetical third "Ben 10" from 2016, to force the `{base}-{year}-{tmdbId}` fallback.
  [70000, fixture(70000, "Ben 10", "2016-05-01")],
]);

function mockTmdbFetch(input: string | URL | Request) {
  const { pathname } = new URL(input instanceof Request ? input.url : input);
  const match = pathname.match(/^\/3\/tv\/(\d+)(?:\/season\/(\d+))?$/);
  const found = match && fixtures.get(Number(match[1]));
  const body = found && (match[2] === undefined ? found.details : found.season);
  return Promise.resolve(
    body
      ? Response.json(body)
      : Response.json({ status_code: 34, status_message: "Not found", success: false }, { status: 404 }),
  );
}

describe("importTmdbSeries slug resolution", () => {
  let prisma: typeof import("@/lib/prisma").prisma;
  let importTmdbSeries: typeof import("@/lib/import/tmdb-series").importTmdbSeries;

  before(async () => {
    execFileSync(
      process.execPath,
      [path.join("node_modules", "prisma", "build", "index.js"), "migrate", "deploy"],
      { env: process.env, stdio: "pipe" },
    );
    mock.method(globalThis, "fetch", mockTmdbFetch);
    ({ prisma } = await import("@/lib/prisma"));
    ({ importTmdbSeries } = await import("@/lib/import/tmdb-series"));
  });

  after(async () => {
    await prisma?.$disconnect();
    mock.restoreAll();
    rmSync(tempDir, { recursive: true, force: true });
  });

  async function slugsByTmdbId() {
    const rows = await prisma.series.findMany({ select: { tmdbId: true, slug: true } });
    return Object.fromEntries(rows.map((row) => [row.tmdbId, row.slug]));
  }

  async function counts() {
    return {
      series: await prisma.series.count(),
      seasons: await prisma.season.count(),
      episodes: await prisma.episode.count(),
      seriesChannels: await prisma.seriesChannel.count(),
    };
  }

  it("uses the base slug for the first series with a title", async () => {
    const { series } = await importTmdbSeries(4686);
    assert.equal(series.slug, "ben-10");
  });

  it("appends the first air year for a same-titled series with another tmdbId", async () => {
    const { series } = await importTmdbSeries(68295);
    assert.equal(series.slug, "ben-10-2016");
  });

  it("appends year and tmdbId when slug and slug-year are both taken", async () => {
    const { series } = await importTmdbSeries(70000);
    assert.equal(series.slug, "ben-10-2016-70000");
  });

  it("re-imports without changing slugs or duplicating rows", async () => {
    const snapshot = { slugs: await slugsByTmdbId(), counts: await counts() };
    const ids = await Promise.all(
      [4686, 68295, 70000].map(async (tmdbId) => (await importTmdbSeries(tmdbId)).series.id),
    );

    assert.deepEqual(await slugsByTmdbId(), snapshot.slugs);
    assert.deepEqual(await counts(), snapshot.counts);
    assert.deepEqual(snapshot.counts, { series: 3, seasons: 3, episodes: 3, seriesChannels: 0 });
    assert.equal(new Set(ids).size, 3);
  });

  it("keeps the existing title and slug when TMDB renames the series", async () => {
    const original = fixtures.get(4686)!;
    fixtures.set(4686, { ...original, details: { ...original.details, name: "Ben 10 (renamed)" } });
    try {
      const { series } = await importTmdbSeries(4686);
      assert.equal(series.slug, "ben-10");
      assert.equal(series.title, "Ben 10");
    } finally {
      fixtures.set(4686, original);
    }
  });

  it("stores TMDB text as delivered", async () => {
    const episode = await prisma.episode.findUnique({ where: { tmdbId: 468600 } });
    assert.equal(episode?.title, "Episodio 1");
  });
});
