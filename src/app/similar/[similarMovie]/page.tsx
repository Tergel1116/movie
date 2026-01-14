// import React from "react";
// import { Movie } from "../../../../index";

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
import { Movie } from "../../../../index";
import { MovieCard } from "@/app/components/MovieCard";
import { title } from "process";

const fetchFromMoreLikeMovieDB = async (id: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data.results || [];
};

export default async function MoreLike({
  params,
}: {
  params: Promise<{ similarMovie: string }>;
}) {
  // Фолдерын нэр чинь [similarMovie] учраас яг энэ нэрээр нь await хийж авна
  const { similarMovie } = await params;

  const movies: Movie[] = await fetchFromMoreLikeMovieDB(similarMovie);

  return (
    <div className="">
      <div className="flex justify-between m-10 items-center">
        <span className="font-semibold text-[24px]">More Like This</span>
      </div>
      <div className="grid grid-cols-5 gap-5 w-[70vw] mx-auto">
        {movies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
