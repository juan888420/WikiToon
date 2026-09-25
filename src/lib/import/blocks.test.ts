import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, before, describe, it } from "node:test";
import type { BlockData } from "@/lib/import/blocks";

// Runs against a throwaway SQLite DB with the real migrations applied, so it never touches dev.db.
// Env must be set before `@/lib/prisma` is first imported.
const tempDir = mkdtempSync(path.join(tmpdir(), "wikitoon-test-"));
process.env.DATABASE_URL = `file:${path.join(tempDir, "test.db")}`;

const cartoonCartoons: BlockData = {
  slug: "cartoon-cartoons",
  name: "Cartoon Cartoons",
  channelSlugs: ["cartoon-network"],
  description: "Original series.",
  seriesTmdbIds: [1, 2],
};

describe("loadBlocks", () => {
  let prisma: typeof import("@/lib/prisma").prisma;
  let loadBlocks: typeof import("@/lib/import/blocks").loadBlocks;
  let channelId: number;
  let otherChannelId: number;

  before(async () => {
    execFileSync(
      process.execPath,
      [path.join("node_modules", "prisma", "build", "index.js"), "migrate", "deploy"],
      { env: process.env, stdio: "pipe" },
    );
    ({ prisma } = await import("@/lib/prisma"));
    ({ loadBlocks } = await import("@/lib/import/blocks"));

    ({ id: channelId } = await prisma.channel.create({
      data: { slug: "cartoon-network", name: "Cartoon Network" },
    }));
    // Stands in for the successor channel of a shared block (Fox Kids -> Jetix).
    ({ id: otherChannelId } = await prisma.channel.create({
      data: { slug: "boomerang", name: "Boomerang" },
    }));
    for (const tmdbId of [1, 2, 3]) {
      const series = await prisma.series.create({
        data: { tmdbId, slug: `series-${tmdbId}`, title: `Series ${tmdbId}` },
      });
      // Series 3 is deliberately not linked to any channel.
      if (tmdbId !== 3) {
        await prisma.seriesChannel.create({ data: { seriesId: series.id, channelId } });
      }
    }
  });

  after(async () => {
    await prisma?.$disconnect();
    rmSync(tempDir, { recursive: true, force: true });
  });

  async function counts() {
    return {
      blocks: await prisma.block.count(),
      blockChannels: await prisma.blockChannel.count(),
      seriesBlocks: await prisma.seriesBlock.count(),
    };
  }

  it("creates blocks, channel links and series links with null years and source", async () => {
    const [loaded] = await loadBlocks([cartoonCartoons]);

    assert.deepEqual(await counts(), { blocks: 1, blockChannels: 1, seriesBlocks: 2 });
    assert.equal(loaded.blockCreated, true);
    assert.deepEqual([loaded.channelsCreated, loaded.linksCreated], [1, 2]);
    const block = await prisma.block.findUniqueOrThrow({ where: { id: loaded.blockId } });
    assert.equal(block.description, "Original series.");
    assert.deepEqual([block.startYear, block.endYear, block.sourceName], [null, null, null]);
    const links = await prisma.seriesBlock.findMany({ where: { blockId: loaded.blockId } });
    assert.ok(links.every((link) => link.startYear === null && link.sourceName === null));
  });

  it("re-runs without duplicating rows", async () => {
    const [loaded] = await loadBlocks([cartoonCartoons]);

    assert.deepEqual(await counts(), { blocks: 1, blockChannels: 1, seriesBlocks: 2 });
    assert.equal(loaded.blockCreated, false);
    assert.deepEqual([loaded.channelsCreated, loaded.channelsExisting], [0, 1]);
    assert.deepEqual([loaded.linksCreated, loaded.linksExisting], [0, 2]);
  });

  it("keeps one block for a lineup shared by two channels", async () => {
    const shared: BlockData = {
      slug: "mysteria",
      name: "Mysteria",
      channelSlugs: ["cartoon-network", "boomerang"],
      // Series 1 only airs on cartoon-network, which is enough for a block on both channels.
      seriesTmdbIds: [1],
    };
    const [loaded] = await loadBlocks([shared]);

    assert.equal(loaded.channelsCreated, 2);
    const block = await prisma.block.findUniqueOrThrow({
      where: { slug: "mysteria" },
      select: { id: true, blockChannels: { select: { channelId: true } } },
    });
    assert.deepEqual(
      block.blockChannels.map((link) => link.channelId).sort(),
      [channelId, otherChannelId].sort(),
    );
    // Re-running adds neither a second block nor duplicate channel links.
    await loadBlocks([shared]);
    assert.equal(await prisma.block.count({ where: { slug: "mysteria" } }), 1);
    assert.equal(await prisma.blockChannel.count({ where: { blockId: block.id } }), 2);

    await prisma.block.delete({ where: { id: block.id } });
  });

  it("updates name, description and logo but keeps years, sources and notes", async () => {
    const block = await prisma.block.update({
      where: { slug: "cartoon-cartoons" },
      data: { startYear: 1997, sourceName: "Source", notes: "Curated note" },
    });
    await prisma.seriesBlock.updateMany({ where: { blockId: block.id }, data: { startYear: 1998 } });

    await loadBlocks([
      {
        ...cartoonCartoons,
        name: "Renamed",
        description: "New text.",
        logoPath: "/logos/blocks/cartoon-cartoons.svg",
      },
    ]);

    const updated = await prisma.block.findUniqueOrThrow({ where: { id: block.id } });
    assert.deepEqual(
      [updated.name, updated.description, updated.logoPath],
      ["Renamed", "New text.", "/logos/blocks/cartoon-cartoons.svg"],
    );
    assert.deepEqual(
      [updated.startYear, updated.sourceName, updated.notes],
      [1997, "Source", "Curated note"],
    );
    const links = await prisma.seriesBlock.findMany({ where: { blockId: block.id } });
    assert.ok(links.every((link) => link.startYear === 1998));
  });

  it("never deletes blocks, channel links or series links missing from the data", async () => {
    const other = await prisma.block.create({
      data: { slug: "other", name: "Other", blockChannels: { create: { channelId } } },
    });
    const series = await prisma.series.findUniqueOrThrow({ where: { tmdbId: 1 } });
    await prisma.seriesBlock.create({ data: { seriesId: series.id, blockId: other.id } });
    // A channel link the data file no longer lists is left alone too.
    await prisma.blockChannel.create({
      data: { blockId: other.id, channelId: otherChannelId },
    });

    await loadBlocks([{ ...cartoonCartoons, seriesTmdbIds: [1] }]);

    assert.deepEqual(await counts(), { blocks: 2, blockChannels: 3, seriesBlocks: 3 });
  });

  it("rejects invalid data without writing anything", async () => {
    const before = await counts();
    const valid: BlockData = { ...cartoonCartoons, slug: "valid-new", seriesTmdbIds: [1] };

    await assert.rejects(
      loadBlocks([
        valid,
        { ...cartoonCartoons, slug: "missing-series", seriesTmdbIds: [99] },
        { ...cartoonCartoons, slug: "unlinked-series", seriesTmdbIds: [3] },
        { ...cartoonCartoons, slug: "unknown-channel", channelSlugs: ["unknown"] },
        { ...cartoonCartoons, slug: "no-channel", channelSlugs: [] },
        { ...cartoonCartoons, slug: "repeated-channel", channelSlugs: ["boomerang", "boomerang"] },
        { ...cartoonCartoons, slug: "valid-new", seriesTmdbIds: [1, 1] },
        { ...cartoonCartoons, slug: "remote-logo", logoPath: "https://example.com/logo.svg" },
      ]),
      (error: Error) => {
        assert.match(error.message, /nothing was written/);
        assert.match(error.message, /no series with TMDB id 99/);
        assert.match(error.message, /"Series 3" \(TMDB 3\) has no SeriesChannel/);
        assert.match(error.message, /channel "unknown" not found/);
        assert.match(error.message, /no-channel: at least one channel is required/);
        assert.match(error.message, /repeated-channel lists a channel more than once/);
        assert.match(error.message, /valid-new is listed more than once/);
        assert.match(error.message, /lists a series more than once/);
        assert.match(error.message, /remote-logo: logoPath must be a local path/);
        return true;
      },
    );
    assert.deepEqual(await counts(), before);
  });
});
