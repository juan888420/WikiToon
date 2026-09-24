/** Returns the TMDB id of the Series that owns `slug`, or null when the slug is free. */
export type SeriesSlugOwnerLookup = (slug: string) => Promise<{ tmdbId: number | null } | null>;

/**
 * Picks the slug for a Series being created. Candidates are tried in a fixed order and the first
 * one that is free (or already owned by the same TMDB series) wins:
 *   `{base}` -> `{base}-{firstAirYear}` -> `{base}-{firstAirYear}-{tmdbId}`
 * Without a first air year the fallback is `{base}-{tmdbId}`. Kept free of Prisma so the caller
 * can run the lookups inside its own transaction.
 */
export async function resolveSeriesSlug(
  { baseSlug, firstAirYear, tmdbId }: { baseSlug: string; firstAirYear: number | null; tmdbId: number },
  findSlugOwner: SeriesSlugOwnerLookup,
) {
  if (!baseSlug) {
    throw new Error(`Cannot build a slug for TMDB ${tmdbId}: the title has no slug-safe characters.`);
  }

  const candidates =
    firstAirYear === null
      ? [baseSlug, `${baseSlug}-${tmdbId}`]
      : [baseSlug, `${baseSlug}-${firstAirYear}`, `${baseSlug}-${firstAirYear}-${tmdbId}`];

  for (const slug of candidates) {
    const owner = await findSlugOwner(slug);
    if (!owner || owner.tmdbId === tmdbId) return slug;
  }

  throw new Error(`No free slug for TMDB ${tmdbId}. Tried: ${candidates.join(", ")}.`);
}
