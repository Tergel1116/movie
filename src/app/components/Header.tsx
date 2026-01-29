// "use client";
// import Link from "next/link";
// import React, { ChangeEvent } from "react";
// import { useEffect, useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import useSWR from "swr";
// import { fetcher } from "@/utils/fetcher";
// import { Divide, Loader } from "lucide-react";
// import { useRouter, usePathname } from "next/navigation";
// import { SearchResults } from "./SearchResults";
// // import { BadgeDemo } from "./Genre";
// import BadgeDemo from "./Genre";
// import { AnimatePresence, motion } from "motion/react";
// import { MdOutlineEmail } from "react-icons/md";
// import { TbMovie } from "react-icons/tb";
// import { MdOutlineDarkMode } from "react-icons/md";
// import { div } from "motion/react-client";
// // import { genreResult } from "../genre/[genreResult]/page";

// export const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchValue, setSearchValue] = useState("");
//   const [mobileOpen, isMobileOpen] = useState(false);
//   const pathname = usePathname();
//   const { push } = useRouter();

//   const { data, isLoading, error } = useSWR(
//     `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
//     fetcher,
//   );
//   const results = data?.results ?? [];
//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchValue(event.target.value);
//   };

//   const handleOutClick = () => setSearchValue("");

//   return (
//     <div className=" w-screen flex justify-between px-[48px] py-[20px] items-center">
//       <Link href="/">
//         <div className="flex items-center justify-center gap-1">
//           <TbMovie className="size-5 text-[#4338CA]" />
//           <span className="italic text-[#4338CA] font-bold">Movie Z</span>
//         </div>
//       </Link>
//       {mobileOpen && (
//         <div>
//           <div>
//             <BadgeDemo />
//           </div>
//         </div>
//       )}
//       <div className="flex gap-[10px] relative right-40 max-sm:hidden">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="h-8 w-25 bg-white border hover:cursor-pointer hover:bg-gray-200 duration-300 border-gray-200 rounded-[6px] flex items-center justify-center gap-2 max-sm:hidden"
//         >
//           <span className="scale-140 mb-2">⌵</span> Genre
//         </button>

//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               key="genre-menu"
//               initial={{
//                 opacity: 0,
//                 clipPath: "circle(0% at 10% 0%)",
//               }}
//               animate={{
//                 opacity: 1,
//                 clipPath: "circle(150% at 10% 0%)",
//               }}
//               exit={{
//                 opacity: 0,
//                 clipPath: "circle(0% at 10% 0%)",
//                 transition: { duration: 0.3, ease: "easeInOut" },
//               }}
//               transition={{
//                 type: "spring",
//                 stiffness: 80,
//                 damping: 15,
//                 duration: 0.8,
//               }}
//               className="absolute top-10 z-20 h-auto w-[577px] rounded-lg p-5 bg-white border border-[#E4E4E7] shadow-2xl overflow-hidden"
//             >
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 {/* <Link href={`genre${genre.id}`}> */}

//                 <BadgeDemo />

//                 {/* </Link> */}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <div className="flex flex-col items center justify-center absolute left-30">
//           <input
//             type="search"
//             placeholder="Search..."
//             className="py-[3px] px-2 border border-gray-200 rounded-[6px] w-[379px] max-sm:w-[36px] h-[36px] max-sm:relative max-sm:bottom-4.5 max-sm:left-25"
//             onChange={handleChange}
//             value={searchValue}
//           />
//           {isLoading && <Loader className="relative top-8 left-45  z-10" />}
//           <div className="absolute z-1 top-7 right-1 left-1">
//             <SearchResults
//               keyword={searchValue}
//               results={results}
//               handleOutClick={handleOutClick}
//               onClose={() => setSearchValue("")}
//             />
//           </div>
//           <div></div>
//         </div>
//       </div>
//       <div className="hover:cursor-pointer">
//         <MdOutlineDarkMode className="size-5 border h-[36px] w-[36px] p-2 rounded-md" />
//       </div>
//     </div>
//   );
// };
// export default Header;

// "use client";
// import Link from "next/link";
// import React, { ChangeEvent, useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import useSWR from "swr";
// import { fetcher } from "@/utils/fetcher";
// import { Loader, Search, X } from "lucide-react";
// import { useRouter, usePathname } from "next/navigation";
// import { SearchResults } from "./SearchResults";
// import BadgeDemo from "./Genre";
// import { AnimatePresence, motion } from "motion/react";
// import { TbMovie } from "react-icons/tb";
// import { MdOutlineDarkMode } from "react-icons/md";

// export const Header = () => {
//   const [isOpen, setIsOpen] = useState(false); // Desktop genre
//   const [searchValue, setSearchValue] = useState("");
//   const [mobileOpen, isMobileOpen] = useState(false); // Mobile search expand state
//   const [isMobileGenreOpen, setIsMobileGenreOpen] = useState(false);

//   const { data, isLoading } = useSWR(
//     searchValue
//       ? `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`
//       : null,
//     fetcher,
//   );

//   const results = data?.results ?? [];
//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchValue(event.target.value);
//   };

//   const handleOutClick = () => {
//     setSearchValue("");
//     isMobileOpen(false);
//     setIsMobileGenreOpen(false);
//   };

//   return (
//     <div className="w-screen flex justify-between px-4 sm:px-[48px] py-[20px] items-center bg-white relative">
//       {/* LOGO: Хайлт нээлттэй үед утсан дээр нуугдана */}
//       <Link href="/" className={`${mobileOpen ? "max-sm:block" : "block"}`}>
//         <div className="flex items-center justify-center gap-1">
//           <TbMovie className="size-5 text-[#4338CA]" />
//           <span className="italic text-[#4338CA] font-bold">Movie Z</span>
//         </div>
//       </Link>

//       {/* --- MOBILE SEARCH & GENRE SECTION (Зөвхөн max-sm) --- */}
//       <div className="hidden max-sm:flex items-center gap-2 flex-1 justify-end">
//         <AnimatePresence>
//           {mobileOpen && (
//             <>
//               {/* Genre Button: Хайлт сунахад гарч ирнэ */}
//               <motion.button
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 20 }}
//                 onClick={() => setIsMobileGenreOpen(!isMobileGenreOpen)}
//                 className="h-9 px-3 border border-gray-200 rounded-md bg-white text-sm whitespace-nowrap"
//               >
//                 Genre
//               </motion.button>

//               {/* Mobile Genre Dropdown */}
//               {isMobileGenreOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="absolute top-16 left-4 right-4 z-50 bg-white border p-4 rounded-lg shadow-xl"
//                 >
//                   <BadgeDemo />
//                 </motion.div>
//               )}
//             </>
//           )}
//         </AnimatePresence>

//         {/* Search Input: 36px-ээс сунана */}
//         <motion.div
//           animate={{ width: mobileOpen ? "100%" : "36px" }}
//           className="relative flex items-center h-9 border border-gray-200 rounded-md overflow-hidden bg-white"
//         >
//           <button
//             onClick={() => isMobileOpen(!mobileOpen)}
//             className="p-2 shrink-0"
//           >
//             {mobileOpen && !searchValue ? (
//               <X size={18} />
//             ) : (
//               <Search size={18} />
//             )}
//           </button>

//           <input
//             type="text"
//             placeholder="Search..."
//             className={`w-full outline-none text-sm transition-opacity ${mobileOpen ? "opacity-100 pr-2" : "opacity-0"}`}
//             value={searchValue}
//             onChange={handleChange}
//             onFocus={() => isMobileOpen(true)}
//           />
//         </motion.div>

//         {/* Mobile Results */}
//         {mobileOpen && searchValue && (
//           <div className="absolute top-16 left-4 right-4 z-40">
//             <SearchResults
//               keyword={searchValue}
//               results={results}
//               handleOutClick={handleOutClick}
//               onClose={handleOutClick}
//             />
//           </div>
//         )}
//       </div>

//       {/* --- DESKTOP SECTION (sm-ээс дээш харагдана) --- */}
//       <div className="flex gap-[10px] relative max-sm:hidden items-center">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="h-8 px-4 bg-white border hover:bg-gray-100 duration-300 border-gray-200 rounded-[6px] flex items-center justify-center gap-2"
//         >
//           <span className="mb-1">⌵</span> Genre
//         </button>

//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }}
//               className="absolute top-10 right-0 z-20 w-[577px] rounded-lg p-5 bg-white border border-gray-200 shadow-2xl"
//             >
//               <BadgeDemo />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <div className="relative">
//           <input
//             type="search"
//             placeholder="Search..."
//             className="py-[3px] px-2 border border-gray-200 rounded-[6px] w-[379px] h-[36px]"
//             onChange={handleChange}
//             value={searchValue}
//           />
//           <div className="absolute top-10 right-0 w-full">
//             <SearchResults
//               keyword={searchValue}
//               results={results}
//               handleOutClick={handleOutClick}
//               onClose={() => setSearchValue("")}
//             />
//           </div>
//         </div>
//       </div>

//       {/* DARK MODE: Хайлт нээлттэй үед утсан дээр нуугдана */}
//       <div
//         className={`${mobileOpen ? "max-sm:block" : "block"} hover:cursor-pointer ml-2`}
//       >
//         <MdOutlineDarkMode className="size-5 border h-[36px] w-[36px] p-2 rounded-md" />
//       </div>
//     </div>
//   );
// };

// export default Header;

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
