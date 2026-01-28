// "use client";
// import Link from "next/link";
// import { Movie } from "../page";

// type Props = {
//   youtubeKey: string;
//   onClose: () => void;
//   movieId: number;
// };

// export const TrailerModal = ({ youtubeKey, onClose, movieId }: Props) => {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
//       <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg">
//         <button
//           onClick={onClose}
//           className="absolute -top-10 right-0 text-white text-lg cursor-pointer"
//         >
//           ✕
//         </button>
//         <Link href={`/movie/${movieId}`}>
//           <button className="absolute top-3 left-185 z-10 bg-blue-600 text-white px-3 py-1 rounded cursor-pointer">
//             see movie detail
//           </button>
//         </Link>

//         <iframe
//           width="100%"
//           height="100%"
//           src={`https://www.youtube.com/embed/${youtubeKey}`}
//           allow="autoplay; encrypted-media"
//         />
//       </div>
//     </div>
//   );
// };



// "use client";
// import { useEffect, useState } from "react";

// export const TrailerModel = ({
//   movieId,
//   onClose,
// }: {
//   movieId: number;
//   onClose: () => void;
// }) => {
//   const [videoKey, setVideoKey] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTrailer = async () => {
//       const res = await fetch(
//         `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//           },
//         },
//       );
//       const data = await res.json();
//       const trailer =
//         data.results?.find((v: any) => v.type === "Trailer") ||
//         data.results?.[0];
//       setVideoKey(trailer?.key);
//     };
//     if (movieId) fetchTrailer();
//   }, [movieId]);

//   if (!videoKey) return null;

//   return (
//     <div
//       className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
//       onClick={onClose}
//     >
//       <div
//         className="relative w-full max-w-5xl aspect-video bg-black"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           onClick={onClose}
//           className="absolute -top-10 right-0 text-white text-2xl"
//         >
//           ✕
//         </button>
//         <iframe
//           width="100%"
//           height="100%"
//           src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
//           allow="autoplay; encrypted-media"
//           allowFullScreen
//         />
//       </div>
//     </div>
//   );
// };
