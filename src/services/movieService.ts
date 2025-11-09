import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

import type { Movie } from "../components/types/movie"; 

/** Тип відповіді TMDB */
export interface TMDBResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
}

/** Параметри для функції пошуку */
export interface FetchMoviesParams {
  query: string;
  page?: number;
  includeAdult?: boolean;
  language?: string;
  signal?: AbortSignal;
}

/** Головна функція для пошуку фільмів у TMDB */
export async function fetchMovies({
  query,
  page = 1,
  includeAdult = false,
  language = "en-US",
  signal,
}: FetchMoviesParams): Promise<TMDBResponse> {
  const token = import.meta.env.VITE_TMDB_TOKEN as string;

  const options: AxiosRequestConfig = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie",
    params: {
      query,
      include_adult: includeAdult,
      language,
      page,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    signal,
  };

  const response: AxiosResponse<TMDBResponse> = await axios.request(options);
  return response.data;
}
