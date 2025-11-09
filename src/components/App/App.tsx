import { useState } from "react";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../types/movie";
import { fetchMovies, type TMDBResponse } from "../../services/movieService";
import toast from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isError, setIsError] = useState(false);
  const [selected, setSelected] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      if (!query.trim()) return;

      setIsLoading(true);
      setIsError(false);
      setMovies([]);

      // Виклик сервісної функції
      const data: TMDBResponse = await fetchMovies({ query });

      if (data.results.length === 0) {
        toast("No movies found for your request.", {
          icon: "🎬",
          style: { background: "#333", color: "#fff" },
        });
      }

      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setIsError(true);
      toast.error("Something went wrong while fetching movies!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      <MovieGrid movies={movies} onSelect={(movie) => setSelected(movie)} />
      {selected && (
        <MovieModal movie={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
