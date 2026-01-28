import Image from "next/image";

import movieDetail from "../movieDetails/[id]/page";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
};
type Props = {
  movie: Movie;
};
export const MovieCard = ({ movie }: Props) => {
  return (
    <Link href={`/movieDetails/${movie.id}`}>
      <div className="flex items-center justify-center ">
        <div className="flex gap-1  flex-col  w-[200px] duration-500 transition-transform ease-in-out hover:scale-110 rounded-lg  bg-gray-100 h-[395px]">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={300}
            className="rounded-[8px_8px_0px_0px] w-[300px] hover:cursor-pointer hover:opacity-[0.8] duration-500 transition-transform ease-in-out hover:scale-100 "
          />
          <div className="bg-gray-100 rounded-lg py-2  px-2 w-[200px]">
            <p className="">
              ⭐ {movie.vote_average?.toFixed(1)}
              <span className="text-gray-400">/10</span>
            </p>
            <p>{movie.title}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

type nowPlaying = {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
};
type Props1 = {
  mov: nowPlaying;
  handleMovieSelect: (_id: number) => () => void;
};

export const Moviecard1 = ({ mov, handleMovieSelect }: Props1) => {
  return (
    <div className="w-full h-150  ">
      <div className="grid">
        <Image
          src={`https://image.tmdb.org/t/p/original${mov.backdrop_path}`}
          alt={mov.title}
          width={1000}
          height={600}
          className="w-full h-150 object-cover shrink-0 z-0"
        />
        <div className="flex inset-0 absolute flex-col justify-center px-20 text-white max-w-xl gap-4 z-10">
          <div>
            <p className="text-base font-normal">Now Playing:</p>
            <p className="text-4xl font-bold">{mov.title}</p>
            <p className="text-lg font-semibold">
              ⭐ {mov.vote_average?.toFixed(1)}
              <span className="text-[#71717A] text-base font-normal">/10</span>
            </p>
          </div>
          <p className="text-xs"> {mov.overview} </p>
          <button
            onClick={handleMovieSelect(mov.id)}
            className="py-2 px-4 w-40 flex gap-2 bg-white text-black text-sm justify-center items-center rounded-md cursor-pointer"
          >
            {/* <BsCaretRight /> */}
            "Watch Trailer"
          </button>
        </div>
      </div>
    </div>
  );
};
