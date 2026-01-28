// "use client";

// import { useSearchParams, useRouter, usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import React from "react";
// import YouTube from "react-youtube";
// type Props = {
//   youtubeKey: string;
//   onClose: () => void;
//   movieId: number;
// };

// export const TrailerModel = ({ movieId }: { movieId: number | string }) => {
//   // const searchParams = useSearchParams();
//   // const router = useRouter();
//   // const pathname = usePathname();

//   // const isTrailerRequested = searchParams.get("trailer") === "true";

//   // const targetMovieId = searchParams.get("movieId");

//   // const isOpen = isTrailerRequested && targetMovieId === String(movieId);

//   const [videoKey, setVideoKey] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTrailer = async () => {
//       try {
//         const res = await fetch(
//           `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
//           {
//             headers: {
//               Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//             },
//           },
//         );
//         const data = await res.json();
//         console.log(data);
//         const trailer = data.results?.find(
//           (v: any) => v.type === "Trailer" && v.site === "YouTube",
//         );
//         setVideoKey(trailer ? trailer.key : data.results?.[0]?.key);
//       } catch (error) {
//         console.error("Trailer fetch error:", error);
//       }
//     };
//     fetchTrailer();
//   });

//   return (
//     <Dialog>
//       <form>
//         <DialogTrigger asChild>
//           <Button
//             variant="outline"
//             className="w-8 h-8 rounded-full hover:cursor-pointer"
//           >
//             ▷
//           </Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px] w-[500px] px-80 py-50 h-0 ">
//           <DialogTitle></DialogTitle>

//           <div className="grid gap-4 w-150 ">
//             <div
//               className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden absolute bottom-43 right-75 px-4 "
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="absolute">
//                 <YouTube videoId={`${videoKey}`} />
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </form>
//     </Dialog>
//   );
// };

"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import YouTube from "react-youtube";
import React from "react";

export const TrailerModel = ({ movieId }: { movieId: number | string }) => {
  const [videoKey, setVideoKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
            },
          },
        );
        const data = await res.json();

        const trailer = data.results?.find(
          (v: any) => v.type === "Trailer" && v.site === "YouTube",
        );

        setVideoKey(trailer ? trailer.key : data.results?.[0]?.key || null);
      } catch (error) {
        console.error("Trailer fetch error:", error);
      }
    };

    fetchTrailer();
  }, [movieId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-8 h-8 rounded-full hover:cursor-pointer"
        >
          ▷
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px] p-6">
        <DialogTitle></DialogTitle>

        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
          {videoKey && (
            <YouTube
              videoId={videoKey}
              className="w-full h-full"
              iframeClassName="w-full h-full"
            />
          )}
          
        </div>
      </DialogContent>
    </Dialog>
  );
};
