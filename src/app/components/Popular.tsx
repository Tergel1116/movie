// /movie/popular?language=en-US&page=1

import { Movie } from "../page";
import { MovieCard } from "./MovieCard";

import { Seemore } from "./Seemore";

const fetchFromPopularMovieDB = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDc4NTYyZWE3NThlY2QyMmMwMmNkNDBkMmY5ZjU5MiIsIm5iZiI6MTc2NjU1MTc2Ni4wODksInN1YiI6IjY5NGI3MGQ2MTI4MzMwYTI0MWIxZDRjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NgHj33F-HetHfBAE-ExlxFnwjDDKaElih0z9qdvBzl0`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data.results;
};

export default async function Popular() {
  const movies: Movie[] = await fetchFromPopularMovieDB();
  return (
    <div>
      <div>
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
