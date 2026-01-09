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
