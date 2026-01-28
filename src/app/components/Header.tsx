"use client";
import Link from "next/link";
import React, { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Divide, Loader } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { SearchResults } from "./SearchResults";
// import { BadgeDemo } from "./Genre";
import BadgeDemo from "./Genre";
import { AnimatePresence, motion } from "motion/react";
import { MdOutlineEmail } from "react-icons/md";
import { TbMovie } from "react-icons/tb";
import { MdOutlineDarkMode } from "react-icons/md";
// import { genreResult } from "../genre/[genreResult]/page";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const pathname = usePathname();
  const { push } = useRouter();

  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
    fetcher,
  );
  const results = data?.results ?? [];
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleOutClick = () => setSearchValue("");

  return (
    <div className=" w-screen flex justify-between px-[48px] py-[20px] items-center">
      <Link href="/">
        <div className="flex items-center justify-center gap-1">
          <TbMovie className="size-5 text-[#4338CA]" />
          <span className="italic text-[#4338CA] font-bold">Movie Z</span>
        </div>
      </Link>
      <div className="flex gap-[10px] relative right-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-8 w-25 bg-white border hover:cursor-pointer hover:bg-gray-200 duration-300 border-gray-200 rounded-[6px] flex items-center justify-center gap-2 max-sm:hidden"
        >
          <span className="scale-140 mb-2">⌵</span> Genre
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="genre-menu"
              initial={{
                opacity: 0,
                clipPath: "circle(0% at 10% 0%)",
              }}
              animate={{
                opacity: 1,
                clipPath: "circle(150% at 10% 0%)",
              }}
              exit={{
                opacity: 0,
                clipPath: "circle(0% at 10% 0%)",
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 15,
                duration: 0.8,
              }}
              className="absolute top-10 z-20 h-auto w-[577px] rounded-lg p-5 bg-white border border-[#E4E4E7] shadow-2xl overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* <Link href={`genre${genre.id}`}> */}

                <BadgeDemo />

                {/* </Link> */}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex flex-col items center justify-center absolute left-30">
          <input
            type="search"
            placeholder="Search..."
            className="py-[3px] px-2 border border-gray-200 rounded-[6px] w-[379px] max-sm:w-[36px] h-[36px] max-sm:relative max-sm:bottom-4.5 max-sm:left-25"
            onChange={handleChange}
            value={searchValue}
          />
          {isLoading && <Loader className="relative top-10 left-45  z-10" />}
          <div className="absolute z-1 top-7 right-1 left-1">
            <SearchResults
              keyword={searchValue}
              results={results}
              handleOutClick={handleOutClick}
              onClose={() => setSearchValue("")}
            />
          </div>
          <div></div>
        </div>
      </div>
      <div className="hover:cursor-pointer">
        <MdOutlineDarkMode className="size-5 border h-[36px] w-[36px] p-2 rounded-md" />
      </div>
    </div>
  );
};
export default Header;
