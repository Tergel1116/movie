// import React from "react";
// import { Movie } from "../../../../../index";

// import { MovieCard } from "@/app/components/MovieCard";

// import Link from "next/link";
// import Header from "@/app/components/Header";
// import { number } from "motion";

// const fetchFromMoreLikeMovieDB = async (id: number) => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//       },
//     }
//   );
//   const data = await response.json();

//   return data.results;
// };

// export default async function MoreLike() {
//   const movies: Movie[] = await fetchFromMoreLikeMovieDB(id);

//   return (
//     <div className="">
//       <div className="flex justify-between m-10 items-center">
//         <span className="font-semibold text-[24px]"> </span>
//       </div>
//       <div className="grid grid-cols-5 gap-5  w-[70vw] ml-0">
//         {movies?.map((movie) => (
//           <MovieCard movie={movie} key={movie.id} />
//         ))}
//       </div>
//     </div>
//   );
// }
import React from "react";
import { Movie } from "../../../../../index"; // Замаа зөв эсэхийг шалгаарай
import { MovieCard } from "@/app/components/MovieCard";

// Хэрэгцээгүй бол "motion"-оос авсан number-г устга

const fetchFromMoreLikeMovieDB = async (id: string | number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
    {
      headers: {
        "Content-Type": "application/json",
        // Server side учраас заавал PUBLIC байх албагүй
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
      // Cache тохиргоо (сонголтоор)
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data.results;
};

// Next.js App Router-д params автоматаар орж ирдэг
interface Props {
  params: { id: string };
}

export default async function MoreLike({ params }: Props) {
  // params-аас id-г авч байна
  const { id } = params;
  const movies: Movie[] = await fetchFromMoreLikeMovieDB(id);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between m-10 items-center">
        <h2 className="font-semibold text-[24px]">Similar Movies</h2>
      </div>

      {/* Grid-ийн хэмжээг илүү уян хатан (responsive) болгов */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {movies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
