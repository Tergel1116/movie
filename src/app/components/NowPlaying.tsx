import Image from "next/image";
import Link from "next/link";
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

      <div className="absolute inset-[150px_30px_30px_50px] flex flex-col gap-5 max-sm:gap-1">
        <div className="text-white">Now playing:</div>
        <div className="h-10 w-200 text-[36px] font-bold max-sm:w-90 max-sm:mb-15 text-white">
          {movie.title}
        </div>
        <div className="flex gap-2 text-[18px] font-bold text-white">
          ⭐{movie.vote_average?.toFixed(1)}
          <span className="text-gray-600 opacity-100">/10</span>
        </div>
        <div className="text-[12px] text-white w-100 max-sm:w-50">
          {movie.overview}
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <TrailerModel movieId={movie.id} />
          </div>
          <span className="text-white">Watch trailer</span>
        </div>
      </div>
    </div>
  );
};
