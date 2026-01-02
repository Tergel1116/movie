"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { NowPlaying } from "./NowPlaying";
import type { Movie } from "../page";

type ScrollProps = {
  movies: Movie[];
};

export const Scroll = ({ movies }: ScrollProps) => {
  return (
    <div className="flex justify-center mt-10 ">
      <Carousel
        className="w-screen"
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="w-full">
          {movies.map((movie, i) => (
            <CarouselItem key={i} className="">
              <NowPlaying movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
