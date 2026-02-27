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
// import { useEffect, useState, useRef } from "react"; // useRef нэмсэн

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

//   // --- ШИНЭ: Цэс нээлттэй эсэхийг удирдах state ---
//   const [isOpen, setIsOpen] = useState(true);
//   const menuRef = useRef<HTMLDivElement>(null);

//   const rawGenreParam = params?.genreResult
//     ? decodeURIComponent(params.genreResult as string)
//     : "";
//   const currentGenres = rawGenreParam ? rawGenreParam.split(",") : [];

//   const { data } = useSWR(
//     "https://api.themoviedb.org/3/genre/movie/list?language=en",
//     fetcher,
//   );
//   const genres = data?.genres || [];

//   // --- ШИНЭ: Гадна талд дарахад хаах логик ---
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setIsOpen(false); // Гадна талд дарахад хаана
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const toggleGenre = (id: string) => {
//     let newGenres;
//     const stringId = String(id);

//     if (currentGenres.includes(stringId)) {
//       newGenres = currentGenres.filter((g) => g !== stringId);
//     } else {
//       newGenres = [...currentGenres, stringId];
//     }

//     // --- ШИНЭ: Сонголт хиймэгц цэсийг хаах ---
//     setIsOpen(false);

//     if (newGenres.length > 0) {
//       router.push(`/genre/${newGenres.join(",")}`);
//     } else {
//       router.push(`/`);
//     }
//   };

//   // Хэрэв хаалттай бол юу ч харуулахгүй (эсвэл нээх товч харуулж болно)
//   if (!isOpen) return null;

//   return (
//     // menuRef-ийг энд холбож өгнө
//     <div
//       ref={menuRef}
//       className="flex flex-col items-center gap-2 bg-white p-4 shadow-lg rounded-lg border"
//     >
//       <div className="border-b w-full flex flex-col mb-4 pb-2">
//         <div className="flex justify-between items-center">
//           <span className="text-black font-bold text-[24px]">Genres</span>
//           {/* Гараар хаах товч нэмж болно */}
//           <button
//             onClick={() => setIsOpen(false)}
//             className="text-gray-400 hover:text-black"
//           >
//             ✕
//           </button>
//         </div>
//         <span className="text-black text-sm">
//           Selected: {currentGenres.length}
//         </span>
//       </div>

//       <div className="flex w-full flex-wrap gap-[12px]">
//         {genres.map((genre: any) => {
//           const isActive = currentGenres.includes(String(genre.id));

//           return (
//             <Badge
//               key={genre.id}
//               onClick={() => toggleGenre(String(genre.id))}
//               variant={isActive ? "default" : "outline"}
//               className={`hover:cursor-pointer transition-all duration-200 px-4 py-1.5 select-none ${
//                 isActive
//                   ? "bg-black text-white hover:bg-black/90 ring-2 ring-black ring-offset-1"
//                   : "bg-transparent text-black hover:bg-gray-200 border-gray-300"
//               }`}
//             >
//               {genre.name}
//             </Badge>
//           );
//         })}
//       </div>

//       {currentGenres.length > 0 && (
//         <button
//           onClick={() => {
//             router.push("/");
//             setIsOpen(false);
//           }}
//           className="text-xs text-gray-500 underline mt-4 hover:text-black"
//         >
//           Clear all filters
//         </button>
//       )}
//     </div>
//   );
// }
