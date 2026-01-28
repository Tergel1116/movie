// "use client";

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// // import { nowPalying } from "../page";
// // import { Moviecard1 } from "./MovieCard";
// import { WatchTrailerButton } from "./WatchTrailerButton";
// import { useState } from "react";
// import { Moviecard1 } from "./MovieCard";

// export type NowPlaying = {
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
// };

// type CarouselComponentProps = {
//   nowPlayingMovie: NowPlaying[];
// };

// export const CarouselComponent = ({
//   nowPlayingMovie,
// }: CarouselComponentProps) => {
//   const [movieId, setMovieId] = useState(0);

//   const handleMovieSelect = (id: number) => () => {
//     setMovieId(id);
//   };
//   console.log({ movieId });
//   return (
//     <Carousel className="w-full">
//       <CarouselContent>
//         {nowPlayingMovie.map((mov) => (
//           <CarouselItem key={mov.id} className="relative">
//             <Moviecard1
//               mov={mov}
//               key={mov.id}
//               handleMovieSelect={handleMovieSelect}
//             />
//           </CarouselItem>
//         ))}
//       </CarouselContent>

//       <WatchTrailerButton movieId={movieId} />

//       <CarouselPrevious className="left-5" />
//       <CarouselNext className="right-5" />
//     </Carousel>
//   );
// };

// "use client";
// import { useState } from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { WatchTrailerButton } from "./WatchTrailerButton";
// import { Moviecard1 } from "./MovieCard";

// export const CarouselComponent = ({ nowPlayingMovie }: { nowPlayingMovie: any[] }) => {
//   // Эхний киног default-оор сонгоно
//   const [movieId, setMovieId] = useState(nowPlayingMovie[0]?.id || 0);

//   return (
//     <div className="relative w-full">
//       <Carousel
//         className="w-full"
//         setApi={(api) => {
//           api?.on("select", () => {
//             const index = api.selectedScrollSnap();
//             setMovieId(nowPlayingMovie[index]?.id);
//           });
//         }}
//       >
//         <CarouselContent>
//           {nowPlayingMovie.map((mov) => (
//             <CarouselItem key={mov.id} className="relative">
//               <Moviecard1
//                 mov={mov}
//                 handleMovieSelect={() => setMovieId(mov.id)}
//               />
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious className="left-5" />
//         <CarouselNext className="right-5" />
//       </Carousel>

//       {/* Trailer товчлуур */}
//       <div className="absolute bottom-10 left-10 z-50">
//         <WatchTrailerButton movieId={movieId} />
//       </div>
//     </div>
//   );
// };
