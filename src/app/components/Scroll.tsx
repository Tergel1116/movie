"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Scroll = () => {
  return (
    <div className="flex justify-center bg-amber-500 mt-10">
      <Carousel
        className="w-[100vw]"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="">
          {[1, 2, 3, 4].map((i) => (
            <CarouselItem key={i} className="">
              <div className="h-[600px]  flex items-center justify-center bg-red-200 ">
                Slide {i}
                {/* <img src="pic.jpg" alt="" /> */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
