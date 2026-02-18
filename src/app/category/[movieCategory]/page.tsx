import { fetchFromPopularMovieDB } from "@/app/components/Popular";
import { MovieCard } from "@/app/components/MovieCard";
import { DynamicPagination } from "@/app/components/DynamicPagination";
import { use } from "react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
};

type PageProps = {
  params: Promise<{ movieCategory: string }>;

  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { movieCategory } = await params;

  const sParams = await searchParams;
  const page = Number(sParams.page) || 1;

  const movies: Movie[] = await fetchFromPopularMovieDB(movieCategory, page);

  return (
    <div className="flex flex-col gap-10 px-16">
      <p className="text-[30px] font-semibold capitalize">{movieCategory}</p>

      <div className="grid grid-cols-5 gap-10  max-sm:grid-cols-2 max-sm:gap-x-30">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center">
        <DynamicPagination totalPages={10} currentPage={page} />
      </div>
    </div>
  );
}
