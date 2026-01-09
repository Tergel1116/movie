import Image from "next/image";

import { AlignVerticalJustifyEnd } from "lucide-react";
import { log } from "console";
import { Team } from "./components/Team";
import { Similar } from "./components/Similar";

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
type Props = {
  movie: Movie;
};
const fetchFromMovieByIdDB = async (id: string) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
    },
  });
  const data = await response.json();
  // console.log(data);
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
    <div className="mb-[0px] flex flex-col items-center">
      <div className="flex  justify-between  pb-5 w-[60vw] ">
        <div className="">
          <div className="text-[36px] font-bold">{movie.title}</div>
          <div className="flex gap-2">
            <div>{movie.release_date} · PG ·</div>
            <div>
              {`${Math.floor(movie.runtime / 60)}${"h"} ${(movie.runtime % 60)
                .toString()
                .padStart(2, "0")}${"m"}`}
            </div>
          </div>
        </div>
        <div>
          <div>Rating</div>
          <div className="flex items-center justify-center gap-3">
            <span className="scale-170 ml-2">⭐</span>
            <div>
              <div className="">
                <span className="font-bold">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-[14px] text-gray-500">/10</span>
              </div>
              <div>{movie.vote_count}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-9 w-[60vw]">
        <div className="flex gap-8 items-center justify-center flex-col">
          <div className="flex items-center justify-center gap-10 w-[60vw]">
            <Image
              src={`${imagePath}${movie.poster_path}`}
              alt={movie.title}
              height={427}
              width={290}
            />
            <div className="relative">
              <Image
                src={`${imagePath}${movie.backdrop_path}`}
                alt={movie.title}
                height={428}
                width={774}
              />
              <div className="absolute bottom-[5%] left-[5%] flex items-center justify-center gap-2">
                <span className="px-3 py-1.5 bg-white rounded-full hover:cursor-pointer">
                  ▷
                </span>
                <span className="text-white font-semibold">Play trailer</span>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex gap-3 w-[70vw]">
          {movie.genres?.map((genre) => (
            <div
              key={genre.id}
              className="px-4 py-2 bg-white flex gap-4 rounded-2xl text-black text-[14px] border border-gray-300 "
            >
              {genre.name}
            </div>
          ))}
        </div>
        <div className="">{movie.overview}</div>
        <Team movieId={id} />
        <Similar movieId={id} />
      </div>
    </div>
  );
}
// KINO BAGIINHNII MEDEELLIIG API AAS DUUDAJ AVAH HEREGTEI!!!!!!!
// KINO BAGIINHNII MEDEELLIIG API AAS DUUDAJ AVAH HEREGTEI!!!!!!!
// KINO BAGIINHNII MEDEELLIIG API AAS DUUDAJ AVAH HEREGTEI!!!!!!!
// KINO BAGIINHNII MEDEELLIIG API AAS DUUDAJ AVAH HEREGTEI!!!!!!!
// KINO BAGIINHNII MEDEELLIIG API AAS DUUDAJ AVAH HEREGTEI!!!!!!!
// KINO BAGIINHNII MEDEELLIIG API AAS DUUDAJ AVAH HEREGTEI!!!!!!!
// KINO BAGIINHNII MEDEELLIIG API AAS DUUDAJ AVAH HEREGTEI!!!!!!!
// KINO BAGIINHNII MEDEELLIIG API AAS DUUDAJ AVAH HEREGTEI!!!!!!!
// KINO BAGIINHNII MEDEELLIIG API AAS DUUDAJ AVAH HEREGTEI!!!!!!!
// KINO BAGIINHNII MEDEELLIIG API AAS DUUDAJ AVAH HEREGTEI!!!!!!!
// KINO BAGIINHNII MEDEELLIIG API AAS DUUDAJ AVAH HEREGTEI!!!!!!!
