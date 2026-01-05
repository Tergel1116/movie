import Image from "next/image";

import { AlignVerticalJustifyEnd } from "lucide-react";

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
};

const fetchFromMovieByIdDB = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}
`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
    }
  );
  const data = await response.json();

  return data.results;
};

export default async function movieDetail({
  params,
}: {
  params: Promise<{ movieDetail: string }>;
}) {
  const { movieDetail } = await params;
  const movies: Movie = await fetchFromMovieByIdDB();

  return <div>{}</div>;
}

// asdf
// asdf
// asdf
// asdf
// asdf
// asdf
// asdf
// asdf
// asdf
// import { log } from "console";
// import Image from "next/image";

// export type Movie = {
//   id: number;
//   runtime: number;
//   vote_count: number;
//   backdrop_path: string;
//   title: string;
//   poster_path: string;
//   overview: string;
//   release_date: string;
//   vote_average: number;
//   original_title: string;
// };

// const fetchMovieById = async (id: string): Promise<Movie> => {
//   const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
//     headers: {
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//     },
//   });

//   return res.json();
// };

// export default async function MovieDetailPage({
//   params,
// }: {
//   params: { movieDetail: string };
// }) {
//   const { movieDetail } = params;

//   const movie = await fetchMovieById(movieDetail);
//   console.log(movie);
//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

//       <Image
//         src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//         alt={movie.title}
//         width={300}
//         height={450}
//       />

//       <p className="mt-4">{movie.overview}</p>

//       <div className="mt-4 space-y-1">
//         <p>📅 {movie.release_date}</p>
//         <p>⭐ {movie.vote_average}</p>
//         <p>⏱ {movie.runtime} мин</p>
//         <p>🗳 {movie.vote_count} санал</p>
//       </div>
//     </div>
//   );
// }
