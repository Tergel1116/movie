// /movie/popular?language=en-US&page=1

// import { Movie } from "../page";
// import { MovieCard } from "./MovieCard";
// import Link from "next/link";
// import { Seemore } from "./Seemore";
// import { stringify } from "querystring";

// export const fetchFromPopularMovieDB = async (
//   category: string,
//   page: number,
// ) => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/movie/${category}?page=${page}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//       },
//     },
//   );
//   const data = await response.json();

//   return data.results;
// };

// export default async function Popular() {
//   const movies: Movie[] = await fetchFromPopularMovieDB("popular");
//   return (
//     <div className="flex flex-col  m-0">
//       <div className="flex justify-between items-center m-10 ">
//         <span className="text-[24px] font-semibold">Popular</span>
//         {/* <Seemore /> */}
//         <Link href="/category/popular">
//           <button className="p-0  hover:cursor-pointer flex gap-2 items-center justify-center">
//             <span>See more ➔</span>
//           </button>
//         </Link>
//       </div>
//       <div className="grid grid-cols-5 gap-5 w-[70vw]">
//         {movies?.slice(0, 10).map((movie) => (
//           <MovieCard movie={movie} key={movie.id} />
//         ))}
//       </div>
//     </div>
//   );
// }

import { Movie } from "../page";
import { MovieCard } from "./MovieCard";
import Link from "next/link";

export const fetchFromPopularMovieDB = async (
  category: string,
  page: number = 1,
) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
    },
  );
  const data = await response.json();
  console.log(response);
  return data.results;
};

type PopularProps = {
  category?: string;
  page?: number;
};

export default async function Popular({
  category = "popular",
  page = 1,
}: PopularProps) {
  // category, page-г параметрээр авах боломжтой болгосон
  const movies: Movie[] = await fetchFromPopularMovieDB(category, page);

  return (
    <div className="flex flex-col m-0">
      <div className="flex justify-between items-center m-10 ">
        <span className="text-[24px] font-semibold capitalize">{category}</span>
        <Link href={`/category/${category}`}>
          <button className="hover:cursor-pointer flex gap-2 items-center justify-center">
            <span>See more ➔</span>
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-5 w-[70vw]">
        {movies?.slice(0, 10).map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
