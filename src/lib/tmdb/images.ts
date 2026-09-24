const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export type TmdbImageSize = `w${number}` | "original";

/** Builds a TMDB image URL from a stored path (e.g. `Series.posterPath`). */
export function tmdbImageUrl(path: string | null | undefined, size: TmdbImageSize = "w500") {
  return path ? `${TMDB_IMAGE_BASE_URL}/${size}${path}` : null;
}
