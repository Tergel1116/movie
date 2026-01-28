import Image from "next/image";
import Link from "next/link";
import { Team } from "./components/Team";
import { Similar } from "./components/Similar";
import { TrailerModel } from "./components/TrailerModel";
import TrailerSection from "@/app/components/TrailerSection";

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
  console.log(data);
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
    <div className="mb-0 flex flex-col items-center min-h-screen text-black">
      {/* Дээд хэсэг: Гарчиг болон Үнэлгээ */}
      <div className="flex justify-between pb-5 w-[60vw] mt-10">
        <div>
          <div className="text-[36px] font-bold text-black">{movie.title}</div>
          <div className="flex gap-2 text-black">
            {" "}
            {/* Энд саарал байсныг цагаан болгов */}
            <div>{movie.release_date} · PG ·</div>
            <div>
              {`${Math.floor(movie.runtime / 60)}h ${(movie.runtime % 60)
                .toString()
                .padStart(2, "0")}m`}
            </div>
          </div>
        </div>
        <div>
          <div className="text-black">Rating</div> {/* Саарал байсныг засав */}
          <div className="flex items-center justify-center gap-3 mt-1">
            <span className="scale-170 ml-2">⭐</span>
            <div>
              <div className="text-black">
                <span className="font-bold text-xl">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-[14px] text-black/60">/10</span>
              </div>
              <div className="text-black text-xs">{movie.vote_count}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-9 w-[60vw]">
        {/* Постер болон Backdrop зураг */}
        <div className="flex gap-8 items-center justify-center flex-col">
          <div className="flex items-center justify-center gap-10 w-[60vw]">
            <div className="shrink-0">
              <Image
                src={`${imagePath}${movie.poster_path}`}
                alt={movie.title}
                height={427}
                width={290}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={`${imagePath}${movie.backdrop_path}`}
                alt={movie.title}
                height={428}
                width={774}
                className="object-cover"
              />

              {/* <span className="text-white font-semibold">Play trailer</span>s */}

              <div className="absolute bottom-3 left-2">
                {/* <TrailerSection movieId={movie.id} title={movie.title} /> */}
                <div className="flex items-center gap-2">
                  <TrailerModel movieId={movie.id} />
                  <div className="text-white">Play trailer</div>
                </div>
              </div>
              {/* Trailer Модал */}
            </div>
          </div>
        </div>

        {/* Төрлүүд (Genres) - Чиний анхны загвар */}
        <div className="flex gap-3 flex-wrap">
          {movie.genres?.map((genre) => (
            <div
              key={genre.id}
              className="px-4 py-2 bg-gray-200 flex gap-4 rounded-2xl text-black text-[14px] border border-gray-300 font-medium"
            >
              {genre.name}
            </div>
          ))}
        </div>

        {/* Киноны тайлбар - Цагаан өнгөтэй */}
        <div className="text-black text-lg leading-relaxed">
          {movie.overview}
        </div>

        {/* Жүжигчид */}
        <div className="w-full text-black">
          <Team movieId={id} />
        </div>

        {/* Төстэй кинонууд */}
        <div className="w-full pb-20 text-black">
          <Similar movieId={id} />
        </div>
      </div>
    </div>
  );
}
