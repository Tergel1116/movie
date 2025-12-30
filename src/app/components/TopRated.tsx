import { Seemore } from "./Seemore";
import { Movie } from "../page";
import { MovieCard } from "./MovieCard";
import Link from "next/link";

const fetchFromTopRatedMovieDB = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
    }
  );
  const data = await response.json();

  return data.results;
};

export default async function TopRated() {
  const movies: Movie[] = await fetchFromTopRatedMovieDB();
  return (
    <div className="flex flex-col">
      <div className="flex items-center m-10 justify-between">
        <span className="text-[26px] font-semibold">Top Rated</span>
        {/* <Seemore /> */}
        <Link href="/category/top_rated">
          <button className="p-2 bg-amber-300 hover:cursor-pointer flex gap-2 items-center justify-center">
            <span>See more</span>
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-5 w-[70vw]">
        {movies?.slice(0, 10).map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
