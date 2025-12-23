import React from "react";

import { upcomingMovies } from "../constants/upcoming";

import Image from "next/image";

export const Upcoming = () => {
  return (
    <div className=" h-[978px] w-screen ">
      <div></div>
      <div className="relative top-50 h-[978px] w-screen grid grid-cols-5 grid-rows-2 gap-[32px]">
        {upcomingMovies.map((movie) => (
          <div
            key={movie.id}
            className="h-[439px] rounded-lg bg-[#F4F4F5]  w-[230px] "
          >
            <img className="h-[340px] w-[230px]" src={movie.poster} alt="" />
            <div className="px-3 py-2">
              <div className="flex items-center gap-1 text-[14px] ">
                <img src="star.png" alt="" />
                {movie.rating}
                <span className="text-gray-400 text-[12px]">/ 10</span>
              </div>
              <div className="text-[18px]">{movie.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Upcoming;
