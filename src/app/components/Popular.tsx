import { Movie } from "../page";
import { MovieCard } from "./MovieCard";
import Link from "next/link";

export const fetchFromPopularMovieDB = async (
  category: string,
  page: number = 1,
) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
    },
  );
  const data = await response.json();
  console.log(response);
  return data.results;
};

type PopularProps = {
  category?: string;
  page?: number;
};

export default async function Popular({
  category = "popular",
  page = 1,
}: PopularProps) {
  // category, page-г параметрээр авах боломжтой
  const movies: Movie[] = await fetchFromPopularMovieDB(category, page);

  return (
    <div className="flex flex-col m-0">
      <div className="flex justify-between items-center m-10 max-sm:mx-0">
        <span className="text-[24px] font-semibold capitalize">{category}</span>
        <Link href={`/category/${category}`}>
          <button className="hover:cursor-pointer flex gap-2 items-center justify-center">
            <span>See more ➔</span>
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-5 w-[70vw] max-sm:grid-cols-2">
        {movies?.slice(0, 10).map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
