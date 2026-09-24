import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { resolveSeriesSlug } from "@/lib/import/series-slug";

/** Fake lookup: maps taken slugs to the TMDB id of their owner (null = curated, no TMDB id). */
function ownersLookup(owners: Record<string, number | null>) {
  const calls: string[] = [];
  const lookup = async (slug: string) => {
    calls.push(slug);
    return slug in owners ? { tmdbId: owners[slug] } : null;
  };
  return { lookup, calls };
}

const ben10Reboot = { baseSlug: "ben-10", firstAirYear: 2016, tmdbId: 68295 };

describe("resolveSeriesSlug", () => {
  it("uses the base slug when it is free", async () => {
    const { lookup, calls } = ownersLookup({});
    assert.equal(await resolveSeriesSlug(ben10Reboot, lookup), "ben-10");
    assert.deepEqual(calls, ["ben-10"]);
  });

  it("reuses the base slug when it belongs to the same TMDB series", async () => {
    const { lookup } = ownersLookup({ "ben-10": 68295 });
    assert.equal(await resolveSeriesSlug(ben10Reboot, lookup), "ben-10");
  });

  it("appends the first air year when another series owns the base slug", async () => {
    const { lookup } = ownersLookup({ "ben-10": 4686 });
    assert.equal(await resolveSeriesSlug(ben10Reboot, lookup), "ben-10-2016");
  });

  it("treats a curated series without TMDB id as a different owner", async () => {
    const { lookup } = ownersLookup({ "ben-10": null });
    assert.equal(await resolveSeriesSlug(ben10Reboot, lookup), "ben-10-2016");
  });

  it("appends year and TMDB id when slug and slug-year are both taken", async () => {
    const { lookup, calls } = ownersLookup({ "ben-10": 4686, "ben-10-2016": 12345 });
    assert.equal(await resolveSeriesSlug(ben10Reboot, lookup), "ben-10-2016-68295");
    assert.deepEqual(calls, ["ben-10", "ben-10-2016", "ben-10-2016-68295"]);
  });

  it("reuses a suffixed slug already owned by the same TMDB series", async () => {
    const { lookup } = ownersLookup({ "ben-10": 4686, "ben-10-2016": 68295 });
    assert.equal(await resolveSeriesSlug(ben10Reboot, lookup), "ben-10-2016");
  });

  it("falls back to the TMDB id when there is no first air year", async () => {
    const { lookup } = ownersLookup({ "ben-10": 4686 });
    const slug = await resolveSeriesSlug({ ...ben10Reboot, firstAirYear: null }, lookup);
    assert.equal(slug, "ben-10-68295");
  });

  it("throws instead of guessing when every candidate is taken", async () => {
    const { lookup } = ownersLookup({ "ben-10": 1, "ben-10-2016": 2, "ben-10-2016-68295": 3 });
    await assert.rejects(resolveSeriesSlug(ben10Reboot, lookup), /No free slug for TMDB 68295/);
  });

  it("throws when the title produces an empty slug", async () => {
    const { lookup } = ownersLookup({});
    await assert.rejects(
      resolveSeriesSlug({ ...ben10Reboot, baseSlug: "" }, lookup),
      /no slug-safe characters/,
    );
  });
});
