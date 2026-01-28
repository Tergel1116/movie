// import { fetchFromPopularMovieDB } from "@/app/components/Popular";
// import { MovieCard } from "@/app/components/MovieCard";
// import { Header } from "@/app/components/Header";
// import { DynamicPagination } from "@/app/components/DynamicPagination";

// type Movie = {
//   id: number;
//   title: string;
//   poster_path: string;
//   vote_average: number;
//   backdrop_path: string;
// };
// type PageProps = {
//   params: Promise<{ movieCategory: string }>;
//   searchParams: Promise<{ page?: string }>;
// };
// export default async function Page({
//   params,
// }: {
//   params: Promise<{ movieCategory: string }>;
// }) {
//   const { movieCategory } = await params;

//   const movies: Movie[] = await fetchFromPopularMovieDB(movieCategory);

//   return (
//     <div className="flex flex-col gap-10 px-16">
//       <p className="text-[30px] font-semibold">{movieCategory}</p>
//       <div className="grid grid-cols-5 gap-10 m-auto">
//         {movies.map((movie) => (
//           <MovieCard movie={movie} key={movie.id} />
//         ))}
//       </div>
//       <div className="flex flex-row gap-[10px] ">
//         <DynamicPagination totalPages={10} />
//       </div>
//     </div>
//   );
// }

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

  // pagination page (URL: ?page=1)
  const sParams = await searchParams
  const page = Number(sParams.page) || 1;

  // API дуудалт
  const movies: Movie[] = await fetchFromPopularMovieDB(movieCategory, page);

  return (
    <div className="flex flex-col gap-10 px-16">
      <p className="text-[30px] font-semibold capitalize">{movieCategory}</p>

      <div className="grid grid-cols-5 gap-10">
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
