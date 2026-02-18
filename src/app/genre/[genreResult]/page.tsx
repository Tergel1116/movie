import { MovieCard } from "@/app/components/MovieCard";
import BadgeDemo from "@/app/components/Genre";
import { DynamicPagination } from "@/app/components/DynamicPagination";

export type Movie = {
  id: number;
  runtime: number;
  vote_count: number;
  backdrop_path: string;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  original_title: string;
  genres: { id: number; name: string }[];
};

const fetchMoviesByGenre = async (genreIds: string, page: string = "1") => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds}&page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
    },
  );
  return await response.json();
};

const fetchGenres = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?language=en`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
    },
  );
  const data = await response.json();
  return data.genres;
};

export default async function GenreResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ genreResult: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  const currentPage = page || 1;

  const { genreResult } = await params;

  const [movieData, genres] = await Promise.all([
    fetchMoviesByGenre(genreResult, String(currentPage)),
    fetchGenres(),
  ]);

  const movies: Movie[] = movieData.results || [];
  const totalResults = movieData.total_results || 0;

  const totalPages = movieData.total_pages > 500 ? 500 : movieData.total_pages;

  const currentGenre = genres?.find(
    (g: { id: number; name: string }) => String(g.id) === String(genreResult),
  );

  return (
    <div className="flex w-screen flex gap-15 flex-row-reverse max-sm:flex max-sm:flex-col-reverse ">
      <div className="container  p-8 w-[70vw] max-sm:w-[100vw] max-sm:m-auto ">
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">
            {currentGenre ? currentGenre.name : "Unknown Genre"} Movies
          </h1>
          <p className="black flex gap-2">
            Found
            <span className=" font-semibold">
              {totalResults.toLocaleString()}
            </span>
            movies in this category
          </p>
        </div>
        <hr className="border-gray-800 mb-10" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-sm:gap-15 ">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          ) : (
            <p className="text-white">No movies found.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-20 mb-20 flex justify-center">
            <DynamicPagination
              totalPages={totalPages}
              currentPage={Number(currentPage)}
            />
          </div>
        )}
      </div>
      <div className="w-[30vw] mt-20 ml-10 flex flex-col gap-10 max-sm:flex-col">
        <div className="text-[30px] font-semibold">Search filter</div>
        <div className="max-sm:flex max-sm:flex-row max-sm:w-[80vw] max-sm:mr-[10px] ">
          <BadgeDemo />
        </div>
      </div>
    </div>
  );
}
