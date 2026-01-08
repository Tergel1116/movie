import React from "react";
import { Movie } from "../../../../..";

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
  return data;
};

export const Similar = () => {
  return <div>Similar</div>;
};
