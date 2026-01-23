// "use client";

// import useSWR from "swr";
// import { Badge } from "@/components/ui/badge";
// import Link from "next/link";

// import { useState } from "react";

// export type Movie = {
//   id: Number;
//   runtime: number;
//   vote_count: number;
//   backdrop_path: string;
//   title: string;
//   poster_path: string;
//   overview: string;
//   release_date: string;
//   vote_average: number;
//   original_title: string;
//   genres: string;
//   // genres: { id: number; name: string }[];
// };

// // const [color, setColor] = useState();
// // const handleClick = (): void => {
// //   const newColor = color === "blue" ? "red" : "blue";
// //   setColor(newColor);
// // };

// const fetcher = (url: string) =>
//   fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//     },
//   }).then((res) => res.json());

// export default function BadgeDemo() {
//   const { data, error, isLoading } = useSWR(
//     "https://api.themoviedb.org/3/genre/movie/list?language=en",
//     fetcher,
//   );
//   const genres = data?.genres || [];
//   return (
//     <div className="flex flex-col items-center gap-2 ">
//       <div className="border-b w-full h-[60px] flex flex-col mb-2 mt-[-15px] pb-18">
//         <span className="text-black font-bold text-[24px]">Genres</span>
//         <span className="text-black">See lists of movies by genre</span>
//       </div>
//       <div className="flex w-full flex-wrap gap-[22px]">
//         {genres.map((genre: any) => (
//           <Link href={`/genre/${genre.id}`} key={genre.id}>
//             <Badge
//               // onClick={handleClick}
//               variant="outline"
//               className="hover:bg-gray-200 hover:cursor-pointer"
//             >
//               {genre.name} <span className="scale-170 mb-[1px]">›</span>
//             </Badge>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";

// import useSWR from "swr";
// import { Badge } from "@/components/ui/badge";
// import Link from "next/link";
// import { useParams } from "next/navigation"; // useParams нэмэх

// const fetcher = (url: string) =>
//   fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//     },
//   }).then((res) => res.json());

// export default function BadgeDemo() {
//   // 1. URL-аас genre id-г авч байна
//   const params = useParams();
//   const currentGenreId = params?.genreResult; // Таны folder name [genreResult] байгаа тул

//   const { data, error, isLoading } = useSWR(
//     "https://api.themoviedb.org/3/genre/movie/list?language=en",
//     fetcher,
//   );

//   const genres = data?.genres || [];

//   return (
//     <div className="flex flex-col items-center gap-2">
//       <div className="border-b w-full h-[60px] flex flex-col mb-2 mt-[-15px] pb-18">
//         <span className="text-black font-bold text-[24px]">Genres</span>
//         <span className="text-black">See lists of movies by genre</span>
//       </div>
//       <div className="flex w-full flex-wrap gap-[22px]">
//         {genres.map((genre: any) => {
//           // 2. Сонгогдсон эсэхийг шалгах
//           const isActive = String(genre.id) === String(currentGenreId);

//           return (
//             <Link href={`/genre/${genre.id}`} key={genre.id}>
//               <Badge
//                 // 3. Хэрэв идэвхтэй бол өнгийг нь 'default' (хар), үгүй бол 'outline' болгоно
//                 variant={isActive ? "default" : "outline"}
//                 className={`hover:cursor-pointer transition-colors ${
//                   isActive
//                     ? "bg-black text-white hover:bg-black/80"
//                     : "hover:bg-gray-200"
//                 }`}
//               >
//                 {genre.name} <span className="scale-170 mb-[1px]">›</span>
//               </Badge>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client";

import useSWR from "swr";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
    },
  }).then((res) => res.json());

export default function BadgeDemo() {
  const params = useParams();
  const router = useRouter();

  // URL-аас ID-нуудыг салгаж авах (params.genreResult нь "28%2C12" гэж ирж магадгүй тул decode хийнэ)
  const rawGenreParam = params?.genreResult
    ? decodeURIComponent(params.genreResult as string)
    : "";
  const currentGenres = rawGenreParam ? rawGenreParam.split(",") : [];

  const { data } = useSWR(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    fetcher,
  );
  const genres = data?.genres || [];

  const toggleGenre = (id: string) => {
    let newGenres;
    const stringId = String(id);

    if (currentGenres.includes(stringId)) {
      // Хэрэв байгаа бол хасна
      newGenres = currentGenres.filter((g) => g !== stringId);
    } else {
      // Байхгүй бол нэмнэ
      newGenres = [...currentGenres, stringId];
    }

    // Шинэ URL үүсгэх
    if (newGenres.length > 0) {
      router.push(`/genre/${newGenres.join(",")}`);
    } else {
      router.push(`/`); // Бүгдийг хасвал нүүр хуудас руу
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="border-b w-full h-[60px] flex flex-col mb-2 mt-[-15px] pb-18">
        <span className="text-black font-bold text-[24px]">Genres</span>
        <span className="text-black">Selected: {currentGenres.length}</span>
      </div>
      <div className="flex w-full flex-wrap gap-[22px]">
        {genres.map((genre: any) => {
          // Идэвхтэй эсэхийг маш тодорхой шалгах
          const isActive = currentGenres.includes(String(genre.id));

          return (
            <Badge
              key={genre.id}
              onClick={() => toggleGenre(String(genre.id))}
              // isActive үед variant-ыг заавал солих
              variant={isActive ? "default" : "outline"}
              className={`hover:cursor-pointer transition-all duration-200 px-4 py-1.5 select-none ${
                isActive
                  ? "bg-black text-white hover:bg-black/90 ring-2 ring-black ring-offset-1"
                  : "bg-transparent text-black hover:bg-gray-200 border-gray-300"
              }`}
            >
              {genre.name}
              {isActive && (
                <span className="ml-2 bg-white text-black rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                  ✕
                </span>
              )}
            </Badge>
          );
        })}
      </div>

      {currentGenres.length > 0 && (
        <button
          onClick={() => router.push("/")}
          className="text-xs text-gray-500 underline mt-4 hover:text-black"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
