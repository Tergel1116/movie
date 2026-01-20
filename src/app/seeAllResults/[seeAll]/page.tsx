import { MovieCard } from "@/app/components/MovieCard";
import { Movie } from "../../../..";
import BadgeDemo from "@/app/components/Genre";

const fetchFromSeeAllResultsMovieDB = async (searchValue: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
    },
  );
  const data = await response.json();
  // console.log(data);
  return data.results || [];
};
export default async function SeeResults({
  params,
}: {
  params: Promise<{ seeAll: string }>;
}) {
  const { seeAll } = await params;
  const movies: Movie[] = await fetchFromSeeAllResultsMovieDB(seeAll);
  return (
    <div className="w-screen mb-60 flex gap-10">
      <div className="w-[80vw]">
        {movies.length > 0 ? (
          <div className="mx-auto flex flex-col gap-10">
            <div className="flex flex-row gap-2 ml-12">
              <span>See all results for:</span>
              <span className="font-bold">"{seeAll}"</span>
            </div>
            <div className="grid grid-cols-5 mx-auto gap-10">
              {movies?.map((movie) => (
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
      <div className="w-[20vw] mr-50 mt-10">
        <BadgeDemo />
      </div>
    </div>
  );
}
