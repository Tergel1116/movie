// // https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds}&page=${page}
// import { MovieCard } from "@/app/components/MovieCard";
// import { Movie } from "../../../..";
// import { MoveHorizontal } from "lucide-react";

// const fetchMoviesByGenre = async (genreIds: string) => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds}&page=1`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//       },
//     },
//   );
//   // const data = await response.json();
//   return await response.json();

//   // return data.results || [];
// };
// export default async function genreResult({
//   params,
// }: {
//   params: Promise<{ genreResult: string }>;
// }) {
//   const { genreResult } = await params;
//   const movies: Movie[] = await fetchMoviesByGenre(genreResult);

//   // const currentGenre = data.find(
//   //   (g: any) => String(g.id) === String(data)
//   // );

//   return (
//     <div>
//       <div>{genreResult}</div>
//       <div></div>
//       <div className="grid grid-cols-5 gap-10">
//         {movies?.map((movie) => (
//           <MovieCard movie={movie} key={movie.id} />
//         ))}
//       </div>
//     </div>
//   );
// }

import { MovieCard } from "@/app/components/MovieCard";
import BadgeDemo from "@/app/components/Genre";
// import { Movie } from "../../../..";
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
};

// API-аас дата авах функц (Нийт датаг бүтнээр нь буцаана)
const fetchMoviesByGenre = async (genreIds: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds}&page=1`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
    },
  );
  return await response.json();
};

// Genre-ийн жагсаалтыг авах функц (ID-аар нь нэрийг нь олохын тулд)
const fetchGenres = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?language=en`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
    },
  );
  const data = await response.json();
  return data.genres;
};

export default async function GenreResultPage({
  params,
}: {
  params: Promise<{ genreResult: string }>;
}) {
  const { genreResult } = await params;

  // Датаг зэрэг дуудаж байна
  const [movieData, genres] = await Promise.all([
    fetchMoviesByGenre(genreResult),
    fetchGenres(),
  ]);

  const movies: Movie[] = movieData.results || [];
  const totalResults = movieData.total_results || 0;

  // Одоо байгаа Genre-ийн нэрийг олох (Жишээ нь: "28" -> "Action")
  const currentGenre = genres?.find(
    (g: { id: number; name: string }) => String(g.id) === String(genreResult),
  );

  return (
    <div className="flex w-screen flex gap-15 flex-row-reverse">
      <div className="container  p-8 w-[70vw]">
        {/* Дээд хэсэг: Нэр болон Нийт тоо */}
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">
            {currentGenre ? currentGenre.name : "Unknown Genre"} Movies
          </h1>
          <p className="black flex gap-2">
            Found
            <span className=" font-semibold">
              {totalResults.toLocaleString()}
            </span>
            movies in this category 
          </p>
        </div>

        <hr className="border-gray-800 mb-10" />

        {/* Киноны жагсаалт */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          ) : (
            <p className="text-white">No movies found.</p>
          )}
        </div>
      </div>
      <div className="w-[30vw] mt-20 ml-10 flex flex-col gap-10">
        <div className="text-[30px] font-semibold">Search filter</div>
        <div className="">
          <BadgeDemo />
        </div>
      </div>
    </div>
  );
}
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
// genre iin page deeer pagination hiine
