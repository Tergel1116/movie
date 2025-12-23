import React from "react";

export const Header = () => {
  return (
    <div className="w-screen flex justify-between px-[48px] py-[20px] items-center">
      <div className="">
        <img src="movieLogo.png" alt="" />
      </div>
      <div className="flex gap-[10px]">
        <img src="button.png" alt="" />
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
