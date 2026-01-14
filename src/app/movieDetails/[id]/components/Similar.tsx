import React from "react";
import { Movie } from "../../../../..";
import { div } from "motion/react-client";
import { MovieCard } from "@/app/components/MovieCard";
import Image from "next/image";
import Link from "next/link";
type Props = {
  movieId: string;
};

const fetchMoreLikeMovieDB = async (id: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data.results;
};

export const Similar = async ({ movieId }: Props) => {
  const movies: Movie[] = await fetchMoreLikeMovieDB(movieId);

  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[26px] font-bold">More like this</span>
        <Link href={`/similar/${movieId}`}>
          <button className="text-[15px] font-semibold hover:cursor-pointer">
            See more →
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-5">
        {movies.slice(0, 5).map((movie, index) => (
          <div key={index}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};
