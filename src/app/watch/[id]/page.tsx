"use client";

import React from "react";

export default function WatchMovie({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const videoUrl = `https://www.vidking.net/embed/movie/${resolvedParams.id}`;
  return (
    <div>
      <div className="">
        <iframe src={videoUrl} className="h-[60vh] w-[60vw]"></iframe>
      </div>
    </div>
  );
}
