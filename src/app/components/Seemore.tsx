import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Seemore = () => {
  return (
    <div className=" flex ">
      <Link href="/category/upcoming">
        <button className=" bg-amber-300 hover:cursor-pointer flex gap-2 items-center justify-center">
          <span>See more</span>
          <ArrowRight />
        </button>
      </Link>
    </div>
  );
};
// export default Seemore;
