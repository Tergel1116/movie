// import React from "react";
// import { Movie } from "../../../../index";
// import { MovieCard } from "@/app/components/MovieCard";
// import { title } from "process";
// import { DynamicPagination } from "@/app/components/DynamicPagination";

// const fetchFromMoreLikeMovieDB = async (id: string) => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//       },
//     },
//   );
//   const data = await response.json();
//   console.log(data);
//   return data.results || [];
// };

// export default async function MoreLike({
//   params,
// }: {
//   params: Promise<{ similarMovie: string }>;
// }) {
//   // Фолдерын нэр чинь [similarMovie] учраас яг энэ нэрээр нь await хийж авна
//   const { similarMovie } = await params;

//   const movies: Movie[] = await fetchFromMoreLikeMovieDB(similarMovie);

//   return (
//     <div className="">
//       <div className="flex justify-between m-10 items-center">
//         <span className="font-semibold text-[24px]">More Like This</span>
//       </div>
//       <div className="grid grid-cols-5 gap-5 w-[70vw] mx-auto">
//         {movies?.map((movie) => (
//           <MovieCard movie={movie} key={movie.id} />
//         ))}
//         <DynamicPagination totalPages={10} currentPage={page} />
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Movie } from "../../../../index";
import { MovieCard } from "@/app/components/MovieCard";
import { DynamicPagination } from "@/app/components/DynamicPagination";

// Fetch функцээ хуудасны дугаар авдаг болгож өөрчлөх
const fetchFromMoreLikeMovieDB = async (id: string, page: string = "1") => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
    },
  );
  const data = await response.json();
  return data; // Зөвхөн results биш бүх өгөгдлийг буцаавал total_pages-д хэрэгтэй
};

export default async function MoreLike({
  params,
  searchParams,
}: {
  params: Promise<{ similarMovie: string }>;
  searchParams: Promise<{ page?: string }>; // URL-аас хуудасны дугаарыг авна
}) {
  const { similarMovie } = await params;
  const { page } = await searchParams;
  const currentPage = page || "1";

  const data = await fetchFromMoreLikeMovieDB(similarMovie, currentPage);
  const movies: Movie[] = data.results || [];
  const totalPages = data.total_pages; // TMDB ихэвчлэн 500 хүртэл зөвшөөрдөг

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between my-10 items-center">
        <span className="font-semibold text-[24px]">More Like This</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>

      <div className="mt-10 mb-20 flex justify-center">
        <DynamicPagination totalPages={10} currentPage={Number(currentPage)} />
        {/* <DynamicPagination totalPages={10} currentPage={currentPage} /> */}
      </div>
    </div>
  );
}
