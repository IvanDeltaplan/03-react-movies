import { useEffect } from "react";
import type { Movie } from "../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-poster.png";

  return (
    <div
      className={css.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <img className={css.image} src={poster} alt={movie.title} />

        <div className={`${css.content} ${css.scrollbar}`}>
          <h2>{movie.title}</h2>
          <p>
            <strong>Release:</strong>{" "}
            {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
          </p>
          <p>
            <strong>Rating:</strong> ⭐{" "}
            {typeof movie.vote_average === "number"
              ? movie.vote_average.toFixed(1)
              : "—"}
          </p>
          <p>{movie.overview || "No overview available."}</p>
        </div>
      </div>
    </div>
  );
}
