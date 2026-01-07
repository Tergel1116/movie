// import Image from "next/image";
// import { Movie } from "../page";

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
//         className=" w-full shrink-0 h-[600px] object-cover object-fill object-fit "
//       />
//       <div className="relative flex flex-col items- gap-5">
//         <div className="text-white text-amber-600 relative bottom-100 right-100 ">
//           Now playing:
//         </div>
//         <div className="absolute h-10 w-190 bottom-[1400%] right-[-150%] text-[36px] font-bold text-white ">
//           {movie.title}
//         </div>
//         <div className="absolute  bottom-[1000%] right-[490%] flex gap-2  text-[18px] font-bold text-white">
//           ⭐{movie.vote_average?.toFixed(1)}
//           <span className="text-gray-600 opacity-40">/10</span>
//         </div>
//         <div className="absolute  bottom-40 right-30 text-[12px] text-white w-100">
//           {movie.overview}
//         </div>
//         <div className="absolute bottom-100 right-100 h-12 w-35 bg-white rounded-[8px] flex flex-row items-center justify-center  gap-2">
//           <img src="play.png" alt="" /> Watch Trailer
//         </div>
//       </div>
//       <div></div>
//     </div>
//   );
// };
import Image from "next/image";
import { Movie } from "../page";

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
        className=" w-full shrink-0 h-[600px] object-cover  "
      />
      <div className="absolute inset-[150px_30px_30px_120px] flex flex-col items- gap-5">
        <div className="text-white  ">Now playing:</div>
        <div className=" h-10 w-190 text-[36px] font-bold text-white ">
          {movie.title}
        </div>
        <div className=" flex gap-2  text-[18px] font-bold text-white">
          ⭐{movie.vote_average?.toFixed(1)}
          <span className="text-gray-600 opacity-100">/10</span>
        </div>
        <div className="  text-[12px] text-white w-100">{movie.overview}</div>
        <div className=" h-12 w-35 bg-white rounded-[8px] hover:cursor-pointer hover:bg-gray-200 duration-500 flex flex-row items-center justify-center  gap-2">
          ▷ Watch Trailer
        </div>
      </div>
      <div></div>
    </div>
  );
};
