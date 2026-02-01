import React from "react";

import { Movie } from "../page";
import { MovieCard } from "./MovieCard";
import { Seemore } from "./Seemore";
import Link from "next/link";
import { Header } from "./Header";

const fetchFromUpcomingMovieDB = async (page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
    },
  );
  const data = await response.json();

  return data.results;
};

export default async function Upcoming() {
  const movies: Movie[] = await fetchFromUpcomingMovieDB();

  return (
    <div className="">
      <div className="flex justify-between m-10 max-sm:flex max-sm:mx-0 items-center">
        <span className="font-semibold text-[24px]">Upcoming </span>
        {/* <Seemore /> */}
        <Link href="/category/upcoming">
          <button className="  hover:cursor-pointer flex gap-2 items-center justify-center">
            <span className="">See more ➔</span>
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-5  w-[70vw] ml-0 max-sm:grid-cols-2 max-sm:gap-30">
        {/* <span className="relative bottom-10">asd</span> */}
        {movies?.slice(0, 10).map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

// responsive hiij baigaaa
// responsive hiij baigaaa
// responsive hiij baigaaa
// responsive hiij baigaaa
// responsive hiij baigaaa
// responsive hiij baigaaa
// responsive hiij baigaaa
// responsive hiij baigaaa
// responsive hiij baigaaa
// responsive hiij baigaaa
// responsive hiij baigaaa
// responsive hiij baigaaa
// responsive hiij baigaaa
// responsive hiij baigaaa
// responsive hiij baigaaa
// responsive hiij baigaaa
// responsive hiij baigaaa
// responsive hiij baigaaa
