import React from "react";
import { Movie } from "../../../../../index";
import { MovieCard } from "@/app/components/MovieCard";

const fetchFromMoreLikeMovieDB = async (id: string | number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
    {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },

      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data.results;
};

interface Props {
  params: { id: string };
}

export default async function MoreLike({ params }: Props) {
  const { id } = params;
  const movies: Movie[] = await fetchFromMoreLikeMovieDB(id);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between m-10 items-center">
        <h2 className="font-semibold text-[24px]">Similar Movies</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {movies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
