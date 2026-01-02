// import React from "react";

// import Image from "next/image";
// import { AlignVerticalJustifyEnd } from "lucide-react";

// type Movie = {
//   id: number;
//   title: string;
//   poster_path: string;
//   vote_average: number;
//   backdrop_path: string;
//   release_date?: string;
// };

// type Props = {
//   // searchValue: string;
//   keyword: string;
//   results: Movie[];
//   onClose: () => void;
// };

// export const SearchResults = ({
//   keyword,
//   results,
//   onClose,
// }: // searchValue,
// Props) => {
//   if (!keyword) return null;

//   return (
//     <div className="relative left-1/2 top-0 2-40 mt-2 w-95 h-auto -translate-x-1/2 rounded-md bg-white shadow-lg border border-[#E4E4E7]">
//       <ul className="h-auto overfLow-y-auto">
//         {results.slice(0, 5).map((movie) => (
//           <li
//             key={movie.id}
//             className="h-40 flex cursor-pointer items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 border-b border-[#E4E4E71] "
//           >
//             <div className="flex items-center gap-3 flex-1 min-w-0">
//               {movie.poster_path && (
//                 <div className="h-25 w-15 overflow-hidden rounded-md bg-gray-200 flex shrink-0">
//                   <Image
//                     src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
//                     alt={movie.title}
//                     width={60}
//                     height={120}
//                     className="h-full w-full object-cover"
//                   />
//                 </div>
//               )}
//               <div className="flex items-center">
//                 <div className="flex flex-col gap-4">
//                   <div className="flex flex-col gap-1 min-w-0 ">
//                     <p className="text-lg font-medium text-black truncate">
//                       {movie.title}
//                     </p>
//                     {movie.vote_average !== undefined && (
//                       <p className="flex items-center">
//                         <span className="flex gap-1">
//                           <span>⭐</span>
//                           {movie.vote_average.toFixed(1)}
//                         </span>
//                         <span className="text-xs text-gray-500">/10</span>
//                       </p>
//                     )}
//                   </div>
//                   <span className="font-semibold text-sm">
//                     {movie.release_date?.slice(0, 4)}
//                   </span>
//                 </div>
//                 <div className=" flex shrink-0 items-center justify bg-center bg-red-300">
//                   <button>See more →</button>
//                 </div>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div className="h-14 flex items-center">
//         {results.length > 0 ? (
//           <span className="h-14 flex flex-row items-center pl-5 gap-2">
//             See all results for
//             <span className="font-semibold">"{keyword}"</span>
//             {/* <span>{searchValue}</span> */}
//           </span>
//         ) : (
//           <div className="h-full w-full flex items-center justify-center ">
//             <span className="">No result</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

import React from "react";
import Image from "next/image";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  release_date?: string;
};

type Props = {
  keyword: string;
  results: Movie[];
  onClose: () => void;
};

export const SearchResults = ({ keyword, results, onClose }: Props) => {
  if (!keyword) return null;

  return (
    <div className="relative left-1/2 mt-2 w-[95%] -translate-x-1/2 rounded-md bg-white shadow-lg border border-[#E4E4E7]">
      {/* Search results list */}
      <ul>
        {results.slice(0, 5).map((movie) => (
          <li
            key={movie.id}
            className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 border-b border-[#E4E4E7]"
          >
            {/* LEFT: Poster + Movie Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {movie.poster_path && (
                <div className="h-[100px] w-[60px] overflow-hidden rounded-md bg-gray-200 flex-shrink-0">
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    width={60}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1 min-w-0">
                <p className="text-lg font-medium text-black truncate">
                  {movie.title}
                </p>
                {movie.vote_average !== undefined && (
                  <p className="flex items-center text-sm">
                    <span className="flex gap-1">
                      <span>⭐</span>
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-500">/10</span>
                  </p>
                )}
                <span className="font-semibold text-sm text-gray-500">
                  {movie.release_date?.slice(0, 4)}
                </span>
              </div>
            </div>

            {/* RIGHT: See more button */}
            <button
              // onClick={}
              className="flex-shrink-0 text-sm font-medium text-blue-600 hover:underline"
            >
              See more →
            </button>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="h-14 flex items-center border-t border-[#E4E4E7]">
        {results.length > 0 ? (
          <span className="pl-5 text-sm">
            See all results for{" "}
            <span className="font-semibold">"{keyword}"</span>
          </span>
        ) : (
          <div className="w-full text-center text-sm text-gray-500">
            No result
          </div>
        )}
      </div>
    </div>
  );
};

// <div className="">
//   <ul className="">
//     {results.slice(0, 5).map((movie) => (
//       <li key={movie.id} className="h-30 ">
//         <div className="relative z-1 bg-gray-500 p-5 flex ">
//           {movie.poster_path && (
//             <div className=" bg-gray-200 w-[60px] h-auto flex  ">
//               <Image
//                 src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
//                 alt={movie.title}
//                 width={60}
//                 height={120}
//                 className="object-cover"
//               />
//             </div>
//           )}
//           <div className="flex flex-col items-center justify-center">
//             <p>{movie.title}</p>
//             {movie.vote_average !== undefined && (
//               <p>
//                 ⭐{movie.vote_average.toFixed(1)}
//                 <span className="text-gray-200">/10</span>
//               </p>
//             )}
//             <span>{movie.release_date?.slice(0, 4)}</span>
//             <span></span>
//           </div>
//         </div>
//       </li>
//     ))}
//   </ul>
// </div>

// import React from "react";
// import Image from "next/image";

// type Movie = {
//   id: number;
//   title: string;
//   poster_path: string;
//   vote_average: number;
//   backdrop_path: string;
//   release_date?: string;
// };

// type Props = {
//   keyword: string;
//   results: Movie[];
//   onClose: () => void;
// };

// export const SearchResults = ({ keyword, results, onClose }: Props) => {
//   if (!keyword) return null;

//   return (
//     <div className="relative left-1/2 mt-2 w-[95%] -translate-x-1/2 rounded-md bg-white shadow-lg border border-[#E4E4E7]">
//       <ul className="max-h-[400px] overflow-y-auto">
//         {results.slice(0, 5).map((movie) => (
//           <li
//             key={movie.id}
//             className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-gray-50 border-b border-[#E4E4E7] cursor-pointer"
//           >
//             {/* LEFT SIDE */}
//             <div className="flex items-center gap-3 flex-1 min-w-0">
//               {movie.poster_path && (
//                 <div className="h-[100px] w-[60px] overflow-hidden rounded-md bg-gray-200 flex-shrink-0">
//                   <Image
//                     src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
//                     alt={movie.title}
//                     width={60}
//                     height={100}
//                     className="h-full w-full object-cover"
//                   />
//                 </div>
//               )}

//               <div className="flex flex-col gap-1 min-w-0">
//                 {/* TITLE – 1 line */}
//                 <p className="text-lg font-medium text-black truncate">
//                   {movie.title}
//                 </p>

//                 {movie.vote_average !== undefined && (
//                   <p className="flex items-center text-sm text-gray-700">
//                     <span className="flex gap-1">
//                       <span>⭐</span>
//                       {movie.vote_average.toFixed(1)}
//                     </span>
//                     <span className="text-xs text-gray-500">/10</span>
//                   </p>
//                 )}

//                 <span className="text-sm font-semibold text-gray-500">
//                   {movie.release_date?.slice(0, 4)}
//                 </span>
//               </div>
//             </div>

//             {/* RIGHT SIDE */}
//             <button className="flex-shrink-0 text-sm font-medium text-blue-600 hover:underline">
//               See more →
//             </button>
//           </li>
//         ))}
//       </ul>

//       {/* FOOTER */}
//       <div className="h-14 flex items-center border-t border-[#E4E4E7]">
//         {results.length > 0 ? (
//           <span className="pl-5 text-sm">
//             See all results for
//             <span className="font-semibold">"{keyword}"</span>
//           </span>
//         ) : (
//           <div className="w-full text-center text-sm text-gray-500">
//             No result
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
