"use client";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { Badge } from "@/components/ui/badge";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Loader, Search, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { SearchResults } from "./SearchResults";
import BadgeDemo from "./Genre";
import { AnimatePresence, motion } from "motion/react";
import { TbMovie } from "react-icons/tb";
import { MdOutlineDarkMode } from "react-icons/md";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Desktop genre
  const [searchValue, setSearchValue] = useState("");
  const [mobileOpen, isMobileOpen] = useState(false); // Mobile search expand state
  const [isMobileGenreOpen, setIsMobileGenreOpen] = useState(false);

  const { data, isLoading } = useSWR(
    searchValue
      ? `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`
      : null,
    fetcher,
  );

  const results = data?.results ?? [];
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleOutClick = () => {
    setSearchValue("");
    isMobileOpen(false);
    setIsMobileGenreOpen(false);
  };

  return (
    <div className="w-screen flex justify-between px-4 sm:px-[48px] py-[20px] items-center bg-white relative gap-2">
      {/* LOGO: Одоо утсан дээр хайлт нээлттэй үед нуугдахгүй */}
      <Link href="/" className="shrink-0">
        <div className="flex items-center justify-center gap-1">
          <TbMovie className="size-5 text-[#4338CA]" />
          <span className="italic text-[#4338CA] font-bold">Movie Z</span>
        </div>
      </Link>

      {/* --- MOBILE SEARCH & GENRE SECTION (Зөвхөн max-sm) --- */}
      <div className="hidden max-sm:flex items-center gap-2 flex-1 justify-end min-w-0">
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Genre Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setIsMobileGenreOpen(!isMobileGenreOpen)}
                className="h-9 px-3 border border-gray-200 rounded-md bg-white text-sm whitespace-nowrap"
              >
                Genre
              </motion.button>

              {/* Mobile Genre Dropdown */}
              {isMobileGenreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-16 left-4 right-4 z-50 bg-white border p-4 rounded-lg shadow-xl"
                >
                  <BadgeDemo />
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>

        {/* Search Input Container */}
        <motion.div
          animate={{ width: mobileOpen ? "100%" : "36px" }}
          className="relative flex items-center h-9 border border-gray-200 rounded-md overflow-hidden bg-white ml-auto"
        >
          <button
            onClick={() => isMobileOpen(!mobileOpen)}
            className="p-2 shrink-0"
          >
            {mobileOpen && !searchValue ? (
              <X size={18} />
            ) : (
              <Search size={18} />
            )}
          </button>

          <input
            type="text"
            placeholder="Search..."
            className={`w-full outline-none text-sm transition-opacity ${mobileOpen ? "opacity-100 pr-2" : "opacity-0"}`}
            value={searchValue}
            onChange={handleChange}
            onFocus={() => isMobileOpen(true)}
          />
        </motion.div>

        {/* Mobile Results */}
        {mobileOpen && searchValue && (
          <div className="absolute top-16 left-4 right-4 z-40">
            <SearchResults
              keyword={searchValue}
              results={results}
              handleOutClick={handleOutClick}
              onClose={handleOutClick}
            />
          </div>
        )}
      </div>

      {/* --- DESKTOP SECTION --- */}
      <div className="flex gap-[10px] relative max-sm:hidden items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-8 px-4 bg-white border hover:bg-gray-100 duration-300 border-gray-200 rounded-[6px] flex items-center justify-center gap-2"
        >
          <span className="mb-1">⌵</span> Genre
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-10 right-0 z-20 w-[577px] rounded-lg p-5 bg-white border border-gray-200 shadow-2xl"
            >
              <BadgeDemo />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="py-[3px] px-2 border border-gray-200 rounded-[6px] w-[379px] h-[36px]"
            onChange={handleChange}
            value={searchValue}
          />
          <div className="absolute top-10 right-0 w-full">
            <SearchResults
              keyword={searchValue}
              results={results}
              handleOutClick={handleOutClick}
              onClose={() => setSearchValue("")}
            />
          </div>
        </div>
      </div>

      {/* DARK MODE: Одоо утсан дээр нуугдахгүй */}
      <div className="hover:cursor-pointer ml-2 shrink-0">
        <MdOutlineDarkMode className="size-5 border h-[36px] w-[36px] p-2 rounded-md" />
      </div>
    </div>
  );
};

export default Header;
