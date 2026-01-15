// https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds}&page=${page}
import { MovieCard } from "@/app/components/MovieCard";
import { Movie } from "../../../..";

const fetchMoviesByGenre = async (genreIds: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds}&page=1`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data.results || [];
};
// const movies: Movie[] = await fetchMoviesByGenre();
// const movies: Movie[] = await fetchMoviesByGenre();
// const movies: Movie[] = await fetchMoviesByGenre();
// const movies: Movie[] = await fetchMoviesByGenre();
// const movies: Movie[] = await fetchMoviesByGenre();
// const movies: Movie[] = await fetchMoviesByGenre();

// GENRE AAR HAINASHUUUU!!!!!!!!!!
// GENRE AAR HAINASHUUUU!!!!!!!!!!
// GENRE AAR HAINASHUUUU!!!!!!!!!!
// GENRE AAR HAINASHUUUU!!!!!!!!!!
// GENRE AAR HAINASHUUUU!!!!!!!!!!
// GENRE AAR HAINASHUUUU!!!!!!!!!!
// GENRE AAR HAINASHUUUU!!!!!!!!!!
// GENRE AAR HAINASHUUUU!!!!!!!!!!
