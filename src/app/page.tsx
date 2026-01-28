import Image from "next/image";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Head from "next/head";
import { Scroll } from "./components/Scroll";
// import { Upcoming } from "./components/Upcoming";
import Upcoming from "./components/Upcoming";
import Popular from "./components/Popular";
import TopRated from "./components/TopRated";
import { Seemore } from "./components/Seemore";
import { NowPlaying } from "./components/NowPlaying";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  // rating: number;
  vote_average: number;
  backdrop_path: string;
  overview: string;
};

const fetchFromUpcomingMovieDB = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
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

export default async function Home() {
  const movies: Movie[] = await fetchFromUpcomingMovieDB();

  return (
    <div className="flex flex-col items-center justify-center">
      <Scroll movies={movies.slice(0, 10)} />
      {/* <NowPlaying movies={movies.slice(0, 10)} /> */}
      <Upcoming />
      <Popular />
      <TopRated />
    </div>
  );
}

// import { Hero } from "./components/NowPlaying";
// import Upcoming from "./components/Upcoming";
// import Popular from "./components/Popular";
// import TopRated from "./components/TopRated";

// export type Movie = {
//   id: number;
//   title: string;
//   poster_path: string;
//   vote_average: number;
//   backdrop_path: string;
//   overview: string;
// };

// const fetchFromUpcomingMovieDB = async () => {
//   const response = await fetch(
//     "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//       },
//     },
//   );
//   const data = await response.json();
//   return data.results;
// };

// export default async function Home() {
//   const movies: Movie[] = await fetchFromUpcomingMovieDB();

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <Hero movies={movies.slice(0, 10)} />
//       <Upcoming />
//       <Popular />
//       <TopRated />
//     </div>
//   );
// }
