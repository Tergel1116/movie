import Image from "next/image";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Head from "next/head";
import { Scroll } from "./components/Scroll";
// import { Upcoming } from "./components/Upcoming";
import Upcoming from "./components/Upcoming";
import Popular from "./components/Popular";
import { Seemore } from "./components/Seemore";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  rating: number;
  vote_average: number;
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      {/* <Footer /> */}
      <Scroll />

      <Upcoming />
      <Popular />
    </div>
  );
}
