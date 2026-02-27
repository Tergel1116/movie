// import Image from "next/image";
// import Link from "next/link";
// import { Team } from "./components/Team";
// import { Similar } from "./components/Similar";
// import { TrailerModel } from "./components/TrailerModel";
// import TrailerSection from "@/app/components/TrailerSection";

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
//   trailer: number;
// };

// const fetchFromMovieByIdDB = async (id: string) => {
//   const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//     },
//   });
//   const data = await response.json();
//   console.log(data);
//   return data;
// };

// export default async function movieDetail({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const movie: Movie = await fetchFromMovieByIdDB(id);
//   const imagePath = "https://image.tmdb.org/t/p/original";

//   return (
//     <div className="mb-0 flex flex-col items-center min-h-screen text-black">
//       {/* Дээд хэсэг: Гарчиг болон Үнэлгээ */}
//       <div className="flex justify-between pb-5 w-[60vw] mt-10">
//         <div>
//           <div className="text-[36px] font-bold text-black">{movie.title}</div>
//           <div className="flex gap-2 text-black">
//             {" "}
//             {/* Энд саарал байсныг цагаан болгов */}
//             <div>{movie.release_date} · PG ·</div>
//             <div>
//               {`${Math.floor(movie.runtime / 60)}h ${(movie.runtime % 60)
//                 .toString()
//                 .padStart(2, "0")}m`}
//             </div>
//           </div>
//         </div>
//         <div>
//           <div className="text-black">Rating</div> {/* Саарал байсныг засав */}
//           <div className="flex items-center justify-center gap-3 mt-1">
//             <span className="scale-170 ml-2">⭐</span>
//             <div>
//               <div className="text-black">
//                 <span className="font-bold text-xl">
//                   {movie.vote_average.toFixed(1)}
//                 </span>
//                 <span className="text-[14px] text-black/60">/10</span>
//               </div>
//               <div className="text-black text-xs">{movie.vote_count}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col gap-9 w-[60vw]">
//         {/* Постер болон Backdrop зураг */}
//         <div className="flex gap-8 items-center justify-center flex-col">
//           <div className="flex items-center justify-center gap-10 w-[60vw]">
//             <div className="shrink-0">
//               <Image
//                 src={`${imagePath}${movie.poster_path}`}
//                 alt={movie.title}
//                 height={427}
//                 width={290}
//                 className="rounded-lg shadow-xl"
//               />
//             </div>
//             <div className="relative rounded-lg overflow-hidden">
//               <Image
//                 src={`${imagePath}${movie.backdrop_path}`}
//                 alt={movie.title}
//                 height={428}
//                 width={774}
//                 className="object-cover"
//               />

//               {/* <span className="text-white font-semibold">Play trailer</span>s */}

//               <div className="absolute bottom-3 left-2">
//                 {/* <TrailerSection movieId={movie.id} title={movie.title} /> */}
//                 <div className="flex items-center gap-2">
//                   <TrailerModel movieId={movie.id} />
//                   <div className="text-white">Play trailer</div>
//                 </div>
//               </div>
//               {/* Trailer Модал */}
//             </div>
//           </div>
//         </div>

//         {/* Төрлүүд (Genres) - Чиний анхны загвар */}
//         <div className="flex gap-3 flex-wrap">
//           {movie.genres?.map((genre) => (
//             <div
//               key={genre.id}
//               className="px-4 py-2 bg-gray-200 flex gap-4 rounded-2xl text-black text-[14px] border border-gray-300 font-medium"
//             >
//               {genre.name}
//             </div>
//           ))}
//         </div>

//         {/* Киноны тайлбар - Цагаан өнгөтэй */}
//         <div className="text-black text-lg leading-relaxed">
//           {movie.overview}
//         </div>

//         {/* Жүжигчид */}
//         <div className="w-full text-black">
//           <Team movieId={id} />
//         </div>

//         {/* Төстэй кинонууд */}
//         <div className="w-full pb-20 text-black">
//           <Similar movieId={id} />
//         </div>
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import { Team } from "./components/Team";
import { Similar } from "./components/Similar";
import { TrailerModel } from "./components/TrailerModel";

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
  trailer: number;
};

const fetchFromMovieByIdDB = async (id: string) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
    },
  });
  const data = await response.json();
  return data;
};

export default async function movieDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie: Movie = await fetchFromMovieByIdDB(id);
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div className="mb-0 flex flex-col items-center min-h-screen text-black px-4 sm:px-8">
      {/* 1. Header: Гарчиг болон Үнэлгээ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full max-w-[1080px] mt-6 sm:mt-10 gap-4">
        <div>
          <h1 className="text-2xl sm:text-[36px] font-bold text-black leading-tight">
            {movie.title}
          </h1>
          <div className="flex flex-wrap gap-2 text-sm sm:text-base mt-1">
            <span>{movie.release_date}</span>
            <span>·</span>
            <span>PG</span>
            <span>·</span>
            <span>
              {`${Math.floor(movie.runtime / 60)}h ${(movie.runtime % 60)
                .toString()
                .padStart(2, "0")}m`}
            </span>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-0">
          <div className="text-black/60 text-sm hidden sm:block">Rating</div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⭐</span>
            <div>
              <div className="leading-none">
                <span className="font-bold text-lg sm:text-xl">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-sm text-black/60">/10</span>
              </div>
              <div className="text-black/60 text-xs">
                {movie.vote_count} votes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Media Section: Poster & Backdrop */}
      <div className="flex flex-col gap-6 w-full max-w-[1080px] mt-6">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 sm:gap-8 h-auto">
          {/* Poster - Mobile дээр нуух эсвэл жижигсгэж болно, энд grid-ээр шийдэв */}
          <div className="hidden md:block shrink-0 h-full">
            <Image
              src={`${imagePath}${movie.poster_path}`}
              alt={movie.title}
              height={450}
              width={300}
              className="rounded-lg shadow-xl w-full h-full object-cover"
            />
          </div>

          {/* Backdrop Image */}
          <div className="relative rounded-lg overflow-hidden aspect-video md:aspect-auto h-full">
            <Image
              src={`${imagePath}${movie.backdrop_path}`}
              alt={movie.title}
              height={428}
              width={774}
              className="object-cover w-full h-full"
              priority
            />
            {/* Play Trailer Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-end p-4 sm:p-6">
              <div className="flex items-center gap-3 cursor-pointer group">
                <TrailerModel movieId={movie.id} />
                <span className="text-white font-semibold text-sm sm:text-base group-hover:underline">
                  Play trailer
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Genres */}
        <div className="flex gap-2 flex-wrap mt-2">
          {movie.genres?.map((genre) => (
            <div
              key={genre.id}
              className="px-3 py-1 sm:px-4 sm:py-2 bg-white border border-gray-200 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              {genre.name}
            </div>
          ))}
        </div>

        {/* 4. Overview */}
        <div className="text-black text-sm sm:text-lg leading-relaxed max-w-4xl">
          {movie.overview}
        </div>

        {/* 5. Team (Actors/Crew) */}
        <div className="w-full border-t border-gray-100 pt-8">
          <Team movieId={id} />
        </div>

        {/* 6. Similar Movies */}
        <div className="w-full pb-20 pt-8  ">
          <Similar movieId={id} />
        </div>
      </div>
    </div>
  );
}
