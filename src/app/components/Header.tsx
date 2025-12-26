import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <div className="w-screen flex justify-between px-[48px] py-[20px] items-center">
      <Link href="/">
        <img src="movieLogo.png" alt="" className="" />
      </Link>
      <div className="flex gap-[10px]">
        {/* <img src="button.png" alt="" /> */}
        <button className="py-1 px-6 bg-white border border-gray-200 ">
          ∨ Genre
        </button>
        <input
          type="search"
          placeholder="Search..."
          className="py-[3px] px-2 border border-gray-200 rounded-[6px] w-[379px]"
        />
      </div>
      <div className="">
        <img src="darkmode.png" alt="" />
      </div>
    </div>
  );
};
export default Header;
