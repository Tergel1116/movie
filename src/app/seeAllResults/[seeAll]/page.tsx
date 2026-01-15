// import { MovieCard } from "@/app/components/MovieCard";
// import { Movie } from "../../../..";

// const fetchFromSeeAllResultsMovieDB = async (searchValue: string) => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1`,
//     {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//       },
//     }
//   );
//   const data = await response.json();
//   console.log(data);
//   return data.results || [];
// };
// export default async function SeeResults({
//   params,
// }: {
//   params: Promise<{ seeAll: string }>;
// }) {
//   const { seeAll } = await params;
//   const movies: Movie[] = await fetchFromSeeAllResultsMovieDB(seeAll);
//   return (
//     <div>
//       <div>
//         {movies?.map((movie) => (
//           <MovieCard movie={movie} key={movie.id} />
//         ))}
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import { Movie } from "../../../..";
// import { MovieCard } from "@/app/components/MovieCard"; // MovieCard импорт хийх

// const fetchFromSeeAllResultsMovieDB = async (
//   searchValue: string,
//   page: number = 1
// ) => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
//       searchValue
//     )}&language=en-US&page=${page}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//       },
//     }
//   );
//   const data = await response.json();
//   console.log(data);
//   return data.results || []; // data.results-г буцаах нь илүү тохиромжтой
// };

// export default async function SeeResults({
//   params,
// }: {
//   params: Promise<{ seeAll: string }>;
// }) {
//   const { seeAll } = await params;

//   // seeAll доторх утгыгsearchValue болгож ашиглана
//   const movies: Movie[] = await fetchFromSeeAllResultsMovieDB(seeAll);

//   return (
//     <div className="p-10">
//       <h2 className="text-2xl font-bold mb-6 uppercase">
//         Search Results: {seeAll}
//       </h2>
//       <div className="grid grid-cols-5 gap-5">
//         {movies && movies.length > 0 ? (
//           movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
//         ) : (
//           <p>No movies found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// import { MovieCard } from "@/app/components/MovieCard";
// import { Movie } from "../../../..";

// /* TMDB fetch */
// const fetchFromSeeAllResultsMovieDB = async (
//   searchValue: string
// ): Promise<Movie[]> => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
//       searchValue
//     )}&language=en-US&page=1`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//       },
//       cache: "no-store",
//     }
//   );

//   const data = await response.json();
//   console.log(data);
//   return data.results ?? [];
// };

// /* Page */
// export default async function SeeResults({
//   params,
// }: {
//   params: { seeAll: string };
// }) {
//   const movies = await fetchFromSeeAllResultsMovieDB(params.seeAll);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">
//         Search results for: {params.seeAll}
//       </h1>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {movies.map((movie) => (
//           <MovieCard key={movie.id} movie={movie} />
//         ))}
//       </div>

//       {movies.length === 0 && <p className="text-gray-400">No movies found.</p>}
//     </div>
//   );
// }

import { MovieCard } from "@/app/components/MovieCard";
import { Movie } from "../../../.."; // Өөрийнхөө types-ийн замыг шалгаарай
import BadgeDemo from "@/app/components/Genre";

/* TMDB fetch */
const fetchFromSeeAllResultsMovieDB = async (
  searchValue: string
): Promise<Movie[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      searchValue
    )}&language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();
  //   console.log("Fetched data for:", searchValue, data.results?.length);
  return data.results ?? [];
};

/* Page Component */
// Next.js 15+ дээр params нь Promise байх ёстой
export default async function SeeResults({
  params,
}: {
  params: Promise<{ seeAll: string }>;
}) {
  // 1. params-ийг заавал await хийж задлах ёстой
  const resolvedParams = await params;
  const searchTerm = resolvedParams.seeAll;

  // 2. Задалсан searchTerm-ээ ашиглаж датагаа татна
  const movies = await fetchFromSeeAllResultsMovieDB(searchTerm);

  return (
    <div className="flex gap-20">
      <div className="p-6 w-[60vw]">
        <h1 className="text-2xl font-bold mb-4">
          {/* URL-аас ирсэн кодыг (жишээ нь %20) текст болгож хувиргана */}
          Search results for: "{decodeURIComponent(searchTerm)}"
        </h1>

        {movies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center">
            <p className="text-gray-500">
              0 results for "{decodeURIComponent(searchTerm)}"
            </p>
          </div>
        )}
      </div>
      <div className="w-[30vw]">
        <div className="">
          <BadgeDemo />
        </div>
      </div>
    </div>
  );
}
