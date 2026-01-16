// https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds}&page=${page}
import { MovieCard } from "@/app/components/MovieCard";
import { Movie } from "../../../..";
import { MoveHorizontal } from "lucide-react";
import { a } from "motion/react-client";
import { data } from "react-router-dom";

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
  // console.log(data);
  return data.results || [];
};
export default async function genreResult({
  params,
}: {
  params: Promise<{ genreResult: string }>;
}) {
  const { genreResult } = await params;
  const movies: Movie[] = await fetchMoviesByGenre(genreResult);

  // const currentGenre = data.find(
  //   (g: any) => String(g.id) === String(data)
  // );

  return (
    <div>
      <div>{genreResult}</div>
      <div className="grid grid-cols-5 gap-10">
        {movies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

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
