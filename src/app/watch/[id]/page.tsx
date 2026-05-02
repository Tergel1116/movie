// "use client";

// import React from "react";

// export default function WatchMovie({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const resolvedParams = React.use(params);
//   const videoUrl = `https://www.vidking.net/embed/movie/${resolvedParams.id}`;
//   return (
//     <div>
//       <div className="">
//         <iframe src={videoUrl} className="h-[100vh] w-[100vw]"></iframe>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useRef } from "react";

export default function WatchMovie({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const videoUrl = `https://www.vidking.net/embed/movie/${resolvedParams.id}`;
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen();
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={containerRef}
        className="relative group [&:fullscreen]:w-screen [&:fullscreen]:h-screen [&:fullscreen>iframe]:w-full [&:fullscreen>iframe]:h-full"
      >
        <iframe src={videoUrl} className="h-[40vh] w-[70vw]" allowFullScreen />
        <button
          onClick={handleFullscreen}
          className="absolute bottom-3 right-3 bg-black/70 hover:bg-black text-white p-3 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          title="Fullscreen"
        >
          ⛶
        </button>
      </div>
    </div>
  );
}
