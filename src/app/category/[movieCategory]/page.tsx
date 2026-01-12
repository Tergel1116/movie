import { fetchFromPopularMovieDB } from "@/app/components/Popular";
import { MovieCard } from "@/app/components/MovieCard";
import { Header } from "@/app/components/Header";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
};

export default async function Page({
  params,
}: {
  params: Promise<{ movieCategory: string }>;
}) {
  const { movieCategory } = await params;

  const movies: Movie[] = await fetchFromPopularMovieDB(movieCategory);

  return (
    <div className="flex flex-col gap-10 px-16">
      <p className="text-[30px] font-semibold">{movieCategory}</p>
      <div className="grid grid-cols-5 gap-10 m-auto">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
      <div className="flex flex-row gap-[10px] relative left-185 ">
        <button>
          <span className="text-gray-500 font-semibold hover:cursor-pointer">
            &lt; Previous
          </span>
        </button>
        <button className="h-[40px] w-[40px] border border-gray-200 rounded-md hover:cursor-pointer">
          1
        </button>
        <button className="h-[40px] w-[40px] border border-gray-200 rounded-md hover:cursor-pointer">
          2
        </button>
        <button className="h-[40px] w-[40px] border border-gray-200 rounded-md hover:cursor-pointer">
          ...
        </button>
        <button className="h-[40px] w-[40px] border border-gray-200 rounded-md hover:cursor-pointer">
          5
        </button>
        <button>
          <span className="font-semibold hover:cursor-pointer">Next &gt;</span>
        </button>
      </div>
    </div>
  );
}
