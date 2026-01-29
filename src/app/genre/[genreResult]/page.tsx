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
    <div className="flex w-screen flex gap-15 flex-row-reverse">
      <div className="container  p-8 w-[70vw]">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
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
      <div className="w-[30vw] mt-20 ml-10 flex flex-col gap-10">
        <div className="text-[30px] font-semibold">Search filter</div>
        <div className="">
          <BadgeDemo />
        </div>
      </div>
    </div>
  );
}

// import React from "react";
// import { MovieCard } from "@/app/components/MovieCard";
// import BadgeDemo from "@/app/components/Genre";
// import { DynamicPagination } from "@/app/components/DynamicPagination";

// export type Movie = {
//   id: number;
//   runtime: number;
//   vote_count: number;
//   backdrop_path: string;
//   title: string;
//   poster_path: string;
//   overview: string;
//   release_date: string;
//   vote_average: number;
//   original_title: string;
//   genres: { id: number; name: string }[];
// };

// // 1. API-аас дата авах функц (Page-ийг нэмсэн)
// const fetchMoviesByGenre = async (genreIds: string, page: string = "1") => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds}&page=${page}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//       },
//     },
//   );
//   return await response.json();
// };

// // 2. Genre-ийн нэрийг авах функц
// const fetchGenres = async () => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/genre/movie/list?language=en`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//       },
//     },
//   );
//   const data = await response.json();
//   return data.genres;
// };

// export default async function GenreResultPage({
//   params,
//   searchParams,
// }: {
//   params: Promise<{ genreResult: string }>;
//   searchParams: Promise<{ page?: string }>; // URL-аас ?page= утгыг авна
// }) {
//   // Promise-уудыг хүлээж авна
//   const { genreResult } = await params;
//   const { page } = await searchParams;
//   const currentPage = page || "1";

//   // Кино болон Genre-ийн мэдээллийг зэрэг татна
//   const [movieData, genres] = await Promise.all([
//     fetchMoviesByGenre(genreResult, currentPage),
//     fetchGenres(),
//   ]);

//   const movies: Movie[] = movieData.results || [];
//   const totalResults = movieData.total_results || 0;

//   // TMDB 500-аас дээш хуудас өгдөггүй тул хязгаарлана
//   const totalPages = movieData.total_pages > 500 ? 500 : movieData.total_pages;

//   // Одоогийн байгаа Genre-ийн нэрийг олох
//   const currentGenre = genres?.find(
//     (g: { id: number; name: string }) => String(g.id) === String(genreResult),
//   );

//   return (
//     <div className="flex w-full min-h-screen gap-10 flex-row-reverse px-10">
//       {/* Баруун тал: Киноны жагсаалт */}
//       <div className="container p-8 w-[70vw]">
//         <div className="mb-10 flex flex-col gap-2">
//           <h1 className="text-3xl font-bold text-white uppercase tracking-tight">
//             {currentGenre ? currentGenre.name : "Unknown Genre"} Movies
//           </h1>
//           <p className="text-gray-400 flex gap-2">
//             Found
//             <span className="font-semibold text-white">
//               {totalResults.toLocaleString()}
//             </span>
//             movies in this category
//           </p>
//         </div>

//         <hr className="border-gray-800 mb-10" />

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
//           {movies.length > 0 ? (
//             movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
//           ) : (
//             <p className="text-white col-span-full text-center py-20">
//               No movies found.
//             </p>
//           )}
//         </div>

//         {/* ПАГИНАЦИ ХЭСЭГ */}
//         {totalPages > 1 && (
//           <div className="mt-20 mb-20 flex justify-center">
//             <DynamicPagination
//               totalPages={totalPages}
//               currentPage={Number(currentPage)}
//             />
//           </div>
//         )}
//       </div>

//       {/* Зүүн тал: Filter хэсэг */}
//       <div className="w-[30vw] mt-10 flex flex-col gap-8">
//         <div className="text-[30px] font-semibold border-l-4 border-red-600 pl-4">
//           Search filter
//         </div>
//         <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
//           <BadgeDemo />
//         </div>
//       </div>
//     </div>
//   );
// }

// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
