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

// "use client";

// import useSWR from "swr";
// import { Badge } from "@/components/ui/badge";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState, useRef } from "react";

// const fetcher = (url: string) =>
//   fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//     },
//   }).then((res) => res.json());

// export default function BadgeDemo() {
//   const params = useParams();
//   const router = useRouter();

//   const [isOpen, setIsOpen] = useState(true); // 👈 анхнаасаа нээлттэй
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   // Outside click → хаах
//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (
//         wrapperRef.current &&
//         !wrapperRef.current.contains(e.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const rawGenreParam = params?.genreResult
//     ? decodeURIComponent(params.genreResult as string)
//     : "";
//   const currentGenres = rawGenreParam ? rawGenreParam.split(",") : [];

//   const { data } = useSWR(
//     "https://api.themoviedb.org/3/genre/movie/list?language=en",
//     fetcher,
//   );
//   const genres = data?.genres || [];

//   const toggleGenre = (id: string) => {
//     let newGenres;
//     const stringId = String(id);

//     if (currentGenres.includes(stringId)) {
//       newGenres = currentGenres.filter((g) => g !== stringId);
//     } else {
//       newGenres = [...currentGenres, stringId];
//     }

//     if (newGenres.length > 0) {
//       router.push(`/genre/${newGenres.join(",")}`);
//     } else {
//       router.push(`/`);
//     }
//   };

//   return (
//     <div
//       ref={wrapperRef}
//       onClick={() => setIsOpen(true)} // 👈 дотор дархад нээгдэнэ
//       className="flex flex-col items-center gap-2"
//     >
//       <div className="border-b w-full h-[60px] flex flex-col mb-2 mt-[-15px] pb-18">
//         <span className="text-black font-bold text-[24px]">Genres</span>
//         <span className="text-black">Selected: {currentGenres.length}</span>
//       </div>

//       {/* ЭНД ЮУ Ч УСТААГҮЙ */}
//       <div
//         className={`flex w-full flex-wrap gap-[22px] transition-all duration-200 ${
//           isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//       >
//         {genres.map((genre: any) => {
//           const isActive = currentGenres.includes(String(genre.id));

//           return (
//             <Badge
//               key={genre.id}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleGenre(String(genre.id));
//               }}
//               variant={isActive ? "default" : "outline"}
//               className={`hover:cursor-pointer transition-all duration-200 px-4 py-1.5 select-none ${
//                 isActive
//                   ? "bg-black text-white hover:bg-black/90 ring-2 ring-black ring-offset-1"
//                   : "bg-transparent text-black hover:bg-gray-200 border-gray-300"
//               }`}
//             >
//               {genre.name}
//               {isActive && (
//                 <span className="ml-2 bg-white text-black rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
//                   ✕
//                 </span>
//               )}
//             </Badge>
//           );
//         })}
//       </div>

//       {currentGenres.length > 0 && (
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             router.push("/");
//           }}
//           className="text-xs text-gray-500 underline mt-4 hover:text-black"
//         >
//           Clear all filters
//         </button>
//       )}
//     </div>
//   );
// }
