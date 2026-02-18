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
