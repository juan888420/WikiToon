import type {
  TmdbErrorResponse,
  TmdbPaginatedResponse,
  TmdbTvSearchResult,
  TmdbTvSeasonDetails,
  TmdbTvSeriesDetails,
} from "./types";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
// Latin American Spanish, so titles/overviews match the regional dub when TMDB has them.
const DEFAULT_LANGUAGE = "es-MX";
const REQUEST_TIMEOUT_MS = 10_000;

export class TmdbError extends Error {
  readonly status: number;
  readonly tmdbStatusCode: number | undefined;

  constructor(message: string, status: number, tmdbStatusCode?: number) {
    super(message);
    this.name = "TmdbError";
    this.status = status;
    this.tmdbStatusCode = tmdbStatusCode;
  }
}

type QueryParams = Record<string, string | number | boolean | undefined>;

async function tmdbFetch<T>(path: string, params: QueryParams): Promise<T> {
  const token = process.env.TMDB_READ_ACCESS_TOKEN;
  if (!token) throw new Error("TMDB_READ_ACCESS_TOKEN is not set");

  const url = new URL(`${TMDB_API_BASE_URL}${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as TmdbErrorResponse | null;
    throw new TmdbError(
      body?.status_message ?? `TMDB request failed with status ${response.status}`,
      response.status,
      body?.status_code,
    );
  }

  return (await response.json()) as T;
}

export type SearchTvSeriesOptions = {
  page?: number;
  firstAirDateYear?: number;
  language?: string;
};

export function searchTvSeries(query: string, options: SearchTvSeriesOptions = {}) {
  return tmdbFetch<TmdbPaginatedResponse<TmdbTvSearchResult>>("/search/tv", {
    query,
    page: options.page,
    first_air_date_year: options.firstAirDateYear,
    language: options.language ?? DEFAULT_LANGUAGE,
    include_adult: false,
  });
}

function assertTmdbSeriesId(seriesId: number) {
  if (!Number.isInteger(seriesId) || seriesId <= 0) {
    throw new Error(`Invalid TMDB series id: ${seriesId}`);
  }
}

export function getTvSeriesDetails(seriesId: number, options: { language?: string } = {}) {
  assertTmdbSeriesId(seriesId);
  return tmdbFetch<TmdbTvSeriesDetails>(`/tv/${seriesId}`, {
    language: options.language ?? DEFAULT_LANGUAGE,
  });
}

export function getTvSeasonDetails(
  seriesId: number,
  seasonNumber: number,
  options: { language?: string } = {},
) {
  assertTmdbSeriesId(seriesId);
  if (!Number.isInteger(seasonNumber) || seasonNumber < 0) {
    throw new Error(`Invalid TMDB season number: ${seasonNumber}`);
  }
  return tmdbFetch<TmdbTvSeasonDetails>(`/tv/${seriesId}/season/${seasonNumber}`, {
    language: options.language ?? DEFAULT_LANGUAGE,
  });
}
