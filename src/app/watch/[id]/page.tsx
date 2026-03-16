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
      <div>
        <iframe src={videoUrl}></iframe>
      </div>
    </div>
  );
}
