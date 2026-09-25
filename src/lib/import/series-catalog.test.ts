import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, before, describe, it, mock, type Mock } from "node:test";
import type { TmdbTvSeasonDetails, TmdbTvSeriesDetails } from "@/lib/tmdb";

// Runs against a throwaway SQLite DB with the real migrations applied and a mocked TMDB, so it
// never touches dev.db or the network. Env must be set before `@/lib/prisma` is first imported.
const tempDir = mkdtempSync(path.join(tmpdir(), "wikitoon-test-"));
process.env.DATABASE_URL = `file:${path.join(tempDir, "test.db")}`;
process.env.TMDB_READ_ACCESS_TOKEN = "test-token";

type Fixture = { details: TmdbTvSeriesDetails; season: TmdbTvSeasonDetails };

function fixture(tmdbId: number, name: string): Fixture {
  const season = {
    id: tmdbId * 10,
    season_number: 1,
    name: "Temporada 1",
    overview: "",
    air_date: "2000-01-01",
    poster_path: null,
  };
  return {
    details: {
      id: tmdbId,
      name,
      original_name: name,
      overview: "",
      first_air_date: "2000-01-01",
      last_air_date: "2000-01-01",
      poster_path: null,
      backdrop_path: null,
      number_of_seasons: 1,
      number_of_episodes: 1,
      seasons: [{ ...season, episode_count: 1 }],
      origin_country: ["US"],
      original_language: "en",
      status: "Ended",
    },
    season: {
      ...season,
      episodes: [
        {
          id: tmdbId * 100,
          episode_number: 1,
          season_number: 1,
          name: "Episodio 1",
          overview: "",
          air_date: "2000-01-01",
          still_path: null,
        },
      ],
    },
  };
}

// No fixture for TMDB id 999, so requests for it fail with a TMDB 404.
const fixtures = new Map<number, Fixture>(
  [1, 2, 3, 4].map((tmdbId) => [tmdbId, fixture(tmdbId, `Series ${tmdbId}`)]),
);

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

describe("loadSeriesCatalog", () => {
  let prisma: typeof import("@/lib/prisma").prisma;
  let loadSeriesCatalog: typeof import("@/lib/import/series-catalog").loadSeriesCatalog;
  let fetchMock: Mock<typeof fetch>;

  before(async () => {
    execFileSync(
      process.execPath,
      [path.join("node_modules", "prisma", "build", "index.js"), "migrate", "deploy"],
      { env: process.env, stdio: "pipe" },
    );
    fetchMock = mock.method(globalThis, "fetch", mockTmdbFetch);
    ({ prisma } = await import("@/lib/prisma"));
    ({ loadSeriesCatalog } = await import("@/lib/import/series-catalog"));
    await prisma.channel.createMany({
      data: [
        { slug: "cartoon-network", name: "Cartoon Network" },
        { slug: "nickelodeon", name: "Nickelodeon" },
      ],
    });
  });

  after(async () => {
    await prisma?.$disconnect();
    mock.restoreAll();
    rmSync(tempDir, { recursive: true, force: true });
  });

  async function counts() {
    return {
      series: await prisma.series.count(),
      episodes: await prisma.episode.count(),
      seriesChannels: await prisma.seriesChannel.count(),
    };
  }

  it("imports every series and links its channels", async () => {
    const loaded = await loadSeriesCatalog([
      { tmdbId: 1, channelSlugs: ["cartoon-network"] },
      { tmdbId: 2 },
      { tmdbId: 3, channelSlugs: ["cartoon-network", "nickelodeon"] },
    ]);

    assert.deepEqual(
      loaded.map((series) => [series.tmdbId, series.status, series.linkedChannels]),
      [
        [1, "imported", ["cartoon-network"]],
        [2, "imported", []],
        [3, "imported", ["cartoon-network", "nickelodeon"]],
      ],
    );
    assert.deepEqual(await counts(), { series: 3, episodes: 3, seriesChannels: 3 });
  });

  it("re-runs without calling TMDB or duplicating rows", async () => {
    fetchMock.mock.resetCalls();
    const loaded = await loadSeriesCatalog([
      { tmdbId: 1, channelSlugs: ["cartoon-network"] },
      { tmdbId: 2 },
      { tmdbId: 3, channelSlugs: ["cartoon-network", "nickelodeon"] },
    ]);

    assert.equal(fetchMock.mock.callCount(), 0);
    assert.ok(loaded.every((series) => series.status === "unchanged" && !series.linkedChannels.length));
    assert.deepEqual(await counts(), { series: 3, episodes: 3, seriesChannels: 3 });
  });

  it("adds new channel links to existing series and never removes missing ones", async () => {
    fetchMock.mock.resetCalls();
    const [loaded] = await loadSeriesCatalog([{ tmdbId: 2, channelSlugs: ["nickelodeon"] }]);

    assert.equal(fetchMock.mock.callCount(), 0);
    assert.deepEqual(loaded.linkedChannels, ["nickelodeon"]);
    // Series 1 and 3 and their links are not in this run's data, and are kept.
    assert.deepEqual(await counts(), { series: 3, episodes: 3, seriesChannels: 4 });
  });

  it("re-syncs from TMDB on refresh without changing title or slug", async () => {
    const original = fixtures.get(1)!;
    fixtures.set(1, {
      ...original,
      details: { ...original.details, name: "Renamed", overview: "New overview" },
    });
    try {
      fetchMock.mock.resetCalls();
      const [loaded] = await loadSeriesCatalog([{ tmdbId: 1 }], { refresh: true });

      assert.ok(fetchMock.mock.callCount() > 0);
      assert.equal(loaded.status, "refreshed");
      const series = await prisma.series.findUniqueOrThrow({ where: { tmdbId: 1 } });
      assert.deepEqual(
        [series.title, series.slug, series.overview],
        ["Series 1", "series-1", "New overview"],
      );
    } finally {
      fixtures.set(1, original);
    }
  });

  it("rejects invalid entries without calling TMDB or writing", async () => {
    const snapshot = await counts();
    fetchMock.mock.resetCalls();

    await assert.rejects(
      loadSeriesCatalog([
        { tmdbId: 4, channelSlugs: ["unknown"] },
        { tmdbId: 1 },
        { tmdbId: 1 },
        { tmdbId: 5, channelSlugs: ["cartoon-network", "cartoon-network"] },
      ]),
      (error: Error) => {
        assert.match(error.message, /nothing was written/);
        assert.match(error.message, /channel "unknown" not found/);
        assert.match(error.message, /TMDB id 1 is listed more than once/);
        assert.match(error.message, /TMDB id 5 lists a channel more than once/);
        return true;
      },
    );
    assert.equal(fetchMock.mock.callCount(), 0);
    assert.deepEqual(await counts(), snapshot);
  });

  it("writes nothing when a TMDB request fails mid-batch", async () => {
    const snapshot = await counts();

    await assert.rejects(
      loadSeriesCatalog([{ tmdbId: 4, channelSlugs: ["cartoon-network"] }, { tmdbId: 999 }]),
      /TMDB request for series 999 failed, nothing was written/,
    );
    assert.equal(await prisma.series.findUnique({ where: { tmdbId: 4 } }), null);
    assert.deepEqual(await counts(), snapshot);
  });
});
