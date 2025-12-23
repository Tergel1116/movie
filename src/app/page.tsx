import Image from "next/image";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Head from "next/head";
import { Scroll } from "./components/Scroll";
import { Upcoming } from "./components/Upcoming";
import { Seemore } from "./components/Seemore";

type Movie = {};

const movies: Movie[] = [
  {
    title: "asdf",
  },
];

export default function Home() {
  return (
    <div>
      <Header />
      {/* <Footer /> */}
      <Scroll />
      <Seemore />
      <Upcoming />
    </div>
  );
}
