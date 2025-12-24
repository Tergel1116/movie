import React from "react";
import { ArrowRight } from "lucide-react";

export const Seemore = () => {
  return (
    <div className=" flex ">
      <button className="p-2 bg-amber-300 hover:cursor-pointer flex gap-2 items-center justify-center">
        <span>See more</span>
        <ArrowRight />
      </button>
    </div>
  );
};
// export default Seemore;
