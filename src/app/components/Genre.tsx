"use client";

import useSWR from "swr";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
// import { genreResult } from "../genre/[genreResult]/page";
export type Movie = {
  id: Number;
  runtime: number;
  vote_count: number;
  backdrop_path: string;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  original_title: string;
  genres: string;
  // genres: { id: number; name: string }[];
};

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
    },
  }).then((res) => res.json());

export default function BadgeDemo() {
  const { data, error, isLoading } = useSWR(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    fetcher
  );
  const genres = data?.genres || [];
  return (
    <div className="flex flex-col items-center gap-2 ">
      <div className="border-b w-full h-[60px] flex flex-col mb-2 mt-[-15px] pb-18">
        <span className="text-black font-bold text-[24px]">Genres</span>
        <span className="text-black">See lists of movies by genre</span>
      </div>
      <div className="flex w-full flex-wrap gap-[22px]">
        {genres.map((genre: any) => (
          <Link href={`/genre/${genre.id}`} key={genre.id}>
            <Badge
              variant="outline"
              className="hover:bg-gray-200 hover:cursor-pointer"
            >
              {genre.name} <span className="scale-170 mb-[1px]">›</span>
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
