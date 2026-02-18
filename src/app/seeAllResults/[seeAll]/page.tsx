import { MovieCard } from "@/app/components/MovieCard";
import { Movie } from "../../../..";
import BadgeDemo from "@/app/components/Genre";
import { DynamicPagination } from "@/app/components/DynamicPagination";
import { div } from "motion/react-client";

const fetchFromSeeAllResultsMovieDB = async (
  searchValue: string,
  page: string = "1",
) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=${page}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
    },
  );

  const data = await response.json();
  return data;
};

export default async function SeeResults({
  params,
  searchParams,
}: {
  params: Promise<{ seeAll: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page || 1);

  const { seeAll } = await params;

  const movieData = await fetchFromSeeAllResultsMovieDB(
    seeAll,
    String(currentPage),
  );

  const totalPages = movieData.total_pages > 500 ? 500 : movieData.total_pages;

  const movies: Movie[] = movieData.results || [];

  return (
    <div>
      <div className="w-screen mb-60 flex gap-20 max-sm:flex-col-reverse max-sm:mb-0 ">
        <div className="w-[80vw] max-sm:w-[100vw] ">
          {movies.length > 0 ? (
            <div className="mx-auto flex flex-col gap-10">
              <div className="flex flex-row gap-2 ml-12">
                <span>See all results for:</span>
                <span className="font-bold">"{seeAll}"</span>
              </div>

              <div className="grid grid-cols-5 mx-auto gap-10 max-sm:grid-cols-2 max-sm:gap-2">
                {movies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </div>
            </div>
          ) : (
            <div>
              <span>No results for:</span>
              <span className="font-bold">"{seeAll}"</span>
            </div>
          )}
        </div>

        <div className="w-[30vw] mr-30 mt-10 max-sm:flex max-sm:flex-row max-sm:w-[90vw] max-sm:mr-0 max-sm:ml-10">
          <BadgeDemo />
        </div>
      </div>
      {totalPages > 1 && (
        <div className="mt-20 mb-20 flex justify-center w-full  ">
          <DynamicPagination
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
}
