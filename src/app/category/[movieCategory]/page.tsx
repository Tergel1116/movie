// import { fetchFromPopularMovieDB } from "@/app/components/Popular";
// import { MovieCard } from "@/app/components/MovieCard";
// export default async function Page({
//   params,
// }: {
//   params: Promise<{ movieCategory: string }>;
// }) {
//   const { movieCategory } = await params;

//   const movies: Movie[] = await fetchFromPopularMovieDB(movieCategory);

//   {
//     movies.map((movie) => (

//         <MovieCard movie={movie} key={movie} />;
//     });
// )

//     return <div>{movieCategory}</div>;
// }
import { fetchFromPopularMovieDB } from "@/app/components/Popular";
import { MovieCard } from "@/app/components/MovieCard";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
};

export default async function Page({
  params,
}: {
  params: Promise<{ movieCategory: string }>;
}) {
  const { movieCategory } = await params;

  const movies: Movie[] = await fetchFromPopularMovieDB(movieCategory);

  return (
    <div>
      <h1>{movieCategory}</h1>
      <div>
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
