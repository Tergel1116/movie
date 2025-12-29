// /movie/popular?language=en-US&page=1

import { Movie } from "../page";
import { MovieCard } from "./MovieCard";

import { Seemore } from "./Seemore";

export const fetchFromPopularMovieDB = async (category: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${category}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data.results;
};

export default async function Popular() {
  const movies: Movie[] = await fetchFromPopularMovieDB("popular");
  return (
    <div className="flex flex-col  m-0">
      <div className="flex justify-between items center m-10">
        <span className="text-[24px] font-semibold">Popular</span>
        <Seemore />
      </div>
      <div className="grid grid-cols-5 gap-5 w-[70vw]">
        {movies?.slice(0, 10).map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
