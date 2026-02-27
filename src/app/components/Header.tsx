"use client";
import Link from "next/link";
import React, { ChangeEvent, useState, useRef, useEffect } from "react"; // useRef, useEffect нэмэв
import { Badge } from "@/components/ui/badge";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Loader, Search, X, ChevronDown } from "lucide-react"; // ChevronDown нэмэв
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

  // --- ШИНЭ: Гадна талд даралтыг мэдрэх Ref-үүд ---
  const desktopGenreRef = useRef<HTMLDivElement>(null);
  const mobileGenreRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useSWR(
    searchValue
      ? `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`
      : null,
    fetcher,
  );

  const results = data?.results ?? [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopGenreRef.current &&
        !desktopGenreRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }

      if (
        mobileGenreRef.current &&
        !mobileGenreRef.current.contains(event.target as Node)
      ) {
        setIsMobileGenreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleOutClick = () => {
    setSearchValue("");
    isMobileOpen(false);
    setIsMobileGenreOpen(false);
    setIsOpen(false);
  };

  return (
    <div className="w-screen flex justify-between px-4 sm:px-[48px] py-[20px] items-center bg-white relative gap-2 border-b border-gray-100">
      <Link href="/" className="shrink-0">
        <div className="flex items-center justify-center gap-1">
          <TbMovie className="size-5 text-[#4338CA]" />
          <span className="italic text-[#4338CA] font-bold">Movie Z</span>
        </div>
      </Link>

      {/* --- MOBILE SECTION --- */}
      <div
        className="hidden max-sm:flex items-center gap-2 flex-1 justify-end min-w-0"
        ref={mobileGenreRef}
      >
        <AnimatePresence>
          {mobileOpen && (
            <div className="relative">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setIsMobileGenreOpen(!isMobileGenreOpen)}
                className="h-9 px-3 border border-gray-200 rounded-md bg-white text-sm whitespace-nowrap"
              >
                Genre
              </motion.button>

              {isMobileGenreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="fixed inset-x-4 top-20 z-50 bg-white border p-4 rounded-lg shadow-2xl overflow-y-auto max-h-[70vh]"
                >
                  <div onClick={() => setIsMobileGenreOpen(false)}>
                    <BadgeDemo />
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>

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
            className={`w-full outline-none text-sm ${mobileOpen ? "opacity-100 pr-2" : "opacity-0"}`}
            value={searchValue}
            onChange={handleChange}
            onFocus={() => isMobileOpen(true)}
          />
        </motion.div>

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
      <div
        className="flex gap-[10px] relative max-sm:hidden items-center"
        ref={desktopGenreRef}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-9 px-4 bg-white border hover:bg-gray-100 duration-300 border-gray-200 rounded-[6px] flex items-center justify-center gap-2"
        >
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
          Genre
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-12 right-0 z-50 w-[577px] rounded-lg p-5 bg-white border border-gray-200 shadow-2xl"
            >
              <div onClick={() => setIsOpen(false)}>
                <BadgeDemo />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="py-[3px] px-2 border border-gray-200 rounded-[6px] w-[379px] h-[36px] outline-none focus:ring-1 focus:ring-gray-300"
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

      <div className="hover:cursor-pointer ml-2 shrink-0">
        <MdOutlineDarkMode className="size-5 border h-[36px] w-[36px] p-2 rounded-md hover:bg-gray-100 duration-200" />
      </div>
    </div>
  );
};

export default Header;
