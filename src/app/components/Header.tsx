"use client";
import Link from "next/link";
import React, { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import useSWR from "swr";
// import { fetcher } from "../../../utils/fetcher";
import { fetcher } from "@/utils/fetcher";
// import { data } from "react-router-dom";
import { Divide, Loader } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { MovieCard } from "./MovieCard";
export const Header = () => {
  const pathname = usePathname();
  const { push } = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
    fetcher
  );
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    push(`/?query=${event.target.value}`);
  };
  console.log(data);
  return (
    <div className="w-screen flex justify-between px-[48px] py-[20px] items-center">
      <Link href="/">
        <img src="/movieLogo.png" alt="" className="" />
      </Link>
      <div className="flex gap-[10px]">
        {/* <img src="button.png" alt="" /> */}
        <button className="h-8 w-25 bg-white border border-gray-200 rounded-[6px]">
          ∨ Genre
        </button>
        <div className="flex flex-col items center justify-center">
          {isLoading && <Loader />}
          <input
            type="search"
            placeholder="Search..."
            className="py-[3px] px-2 border border-gray-200 rounded-[6px] w-[379px]"
            onChange={handleChange}
          />
          <div></div>
        </div>
      </div>
      <div className="">
        <img src="/darkmode.png" alt="" />
      </div>
    </div>
  );
};
export default Header;
