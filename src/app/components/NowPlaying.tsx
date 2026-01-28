// import Image from "next/image";
// import { Movie } from "../page";
// import { TrailerModel } from "../movieDetails/[id]/components/TrailerModel";
// type Props = {
//   movie: Movie;
// };
// export const NowPlaying = ({ movie }: Props) => {
//   return (
//     <div className="relative flex items-center justify-center flex-col">
//       <Image
//         height={600}
//         width={1000}
//         alt={movie.title}
//         src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
//         className=" w-full shrink-0 h-[600px] object-cover  "
//       />
//       <div className="absolute inset-[150px_30px_30px_120px] flex flex-col items- gap-5">
//         <div className="text-white  ">Now playing:</div>
//         <div className=" h-10 w-190 text-[36px] font-bold text-white ">
//           {movie.title}
//         </div>
//         <div className=" flex gap-2  text-[18px] font-bold text-white">
//           ⭐{movie.vote_average?.toFixed(1)}
//           <span className="text-gray-600 opacity-100">/10</span>
//         </div>
//         <div className="  text-[12px] text-white w-100">{movie.overview}</div>
//         <div className=" h-12 w-35 bg-white rounded-[8px] hover:cursor-pointer hover:bg-gray-200 duration-500 flex flex-row items-center justify-center  gap-2">
//           ▷ Watch Trailer
//         </div>

//       </div>
//     </div>
//   );
// };

import Image from "next/image";
import Link from "next/link"; // Link нэмсэн
import { Movie } from "../page";
import { TrailerModel } from "../movieDetails/[id]/components/TrailerModel";
import { Dialog } from "@radix-ui/react-dialog";

type Props = {
  movie: Movie;
};

export const NowPlaying = ({ movie }: Props) => {
  return (
    <div className="relative flex items-center justify-center flex-col">
      <Image
        height={600}
        width={1000}
        alt={movie.title}
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        className="w-full shrink-0 h-[600px] object-cover"
      />

      <div className="absolute inset-[150px_30px_30px_120px] flex flex-col gap-5">
        <div className="text-white">Now playing:</div>
        <div className="h-10 w-200 text-[36px] font-bold text-white">
          {movie.title}
        </div>
        <div className="flex gap-2 text-[18px] font-bold text-white">
          ⭐{movie.vote_average?.toFixed(1)}
          <span className="text-gray-600 opacity-100">/10</span>
        </div>
        <div className="text-[12px] text-white w-100">{movie.overview}</div>
        <div className="flex gap-2 items-center">
          <div>
            <TrailerModel movieId={movie.id} />
          </div>
          <span className="text-white">Watch trailer</span>
        </div>
      </div>

      {/* <div className="absolute top-110 right-[90%] flex gap-2 items-center">
        <div>
          <TrailerModel movieId={movie.id} />
        </div>
        <span className="text-white">Watch trailer</span>
      </div> */}
    </div>
  );
};

// import Image from "next/image";
// import Link from "next/link";
// import { Movie } from "../page";
// import { TrailerModel } from "../movieDetails/[id]/components/TrailerModel";
// import { CarouselComponent } from "./CarauselComponent";

// type Props = {
//   movie: Movie;
// };

// export const NowPlaying = ({ movie }: Props) => {
//   return (
//     <div className="relative flex items-center justify-center flex-col">
//       <Image
//         height={600}
//         width={1000}
//         alt={movie.title}
//         src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
//         className="w-full shrink-0 h-[600px] object-cover"
//       />

//       <div className="absolute inset-[150px_30px_30px_120px] flex flex-col gap-5">
//         <div className="text-white">Now playing:</div>
//         <div className="h-10 w-190 text-[36px] font-bold text-white">
//           {movie.title}
//         </div>
//         <div className="flex gap-2 text-[18px] font-bold text-white">
//           ⭐{movie.vote_average?.toFixed(1)}
//           <span className="text-gray-600 opacity-100">/10</span>
//         </div>
//         <div className="text-[12px] text-white w-100">{movie.overview}</div>

//         <Link
//           href={`?trailer=true&movieId=${movie.id}`}
//           scroll={false}
//           className="h-12 w-35 bg-white rounded-[8px] hover:cursor-pointer hover:bg-gray-200 duration-500 flex flex-row items-center justify-center gap-2 text-black font-semibold"
//         >
//           ▷ Watch Trailer
//         </Link>
//       </div>

//       <TrailerModel movieId={movie.id} />
//     </div>
//   );
// };

// "use client";
// import Autoplay from "embla-carousel-autoplay";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { NowPlaying } from "@/app/components/CarauselComponent";

// import { CarouselComponent } from "@/app/components/CarauselComponent";
// import { div } from "motion/react-client";
// import { Scroll } from "lucide-react";
// // import { useState } from "react";

// const fetchfromNowPlayingMovieDB = async () => {
//   const response = await fetch(
//     "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//       },
//     },
//   );
//   const data = await response.json();

//   return data.results;
// };
// type Params = {
//   movie: number;
// };
// // const [handleClick, setHandleClick] = useState(true);
// export const Hero = async ({ movies }: Params) => {
//   const nowPlayingMovie: NowPlaying[] = await fetchfromNowPlayingMovieDB();

//   return (
//     <div>
//       <CarouselComponent nowPlayingMovie={nowPlayingMovie} />
//       <Carousel
//         className="w-screen"
//         opts={{ loop: true }}
//         plugins={[
//           Autoplay({
//             delay: 5000,
//           }),
//         ]}
//       >
//         <CarouselContent className="w-full">
//           {movies.map((movie, i) => (
//             <CarouselItem key={i} className="">
//               {/* <Scroll key={i} movie={movie.id} /> */}
//             </CarouselItem>
//           ))}
//         </CarouselContent>

//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </div>
//   );
// };
