// Only the TMDB response fields WikiToon consumes. TMDB returns more.

export type TmdbPaginatedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type TmdbTvSearchResult = {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  first_air_date: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  origin_country: string[];
  original_language: string;
};

export type TmdbSeasonSummary = {
  id: number;
  season_number: number;
  name: string;
  overview: string;
  air_date: string | null;
  episode_count: number;
  poster_path: string | null;
};

export type TmdbTvSeriesDetails = {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  first_air_date: string | null;
  last_air_date: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  number_of_seasons: number;
  number_of_episodes: number;
  seasons: TmdbSeasonSummary[];
  origin_country: string[];
  original_language: string;
  status: string;
};

export type TmdbEpisode = {
  id: number;
  episode_number: number;
  season_number: number;
  name: string;
  overview: string;
  air_date: string | null;
  still_path: string | null;
};

export type TmdbTvSeasonDetails = {
  id: number;
  season_number: number;
  name: string;
  overview: string;
  air_date: string | null;
  poster_path: string | null;
  episodes: TmdbEpisode[];
};

export type TmdbErrorResponse = {
  status_code: number;
  status_message: string;
  success: false;
};
