// import React from "react";
// import { CastMember, CrewMember } from "../../../../../index";
// import { span } from "motion/react-client";

// type Props = {
//   movieId: string;
// };

// const fetchCredits = async (id: string) => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
//       },
//     },
//   );
//   const data = await response.json();
//   //   console.log(data);
//   return data;
// };

// export const Team = async ({ movieId }: { movieId: string }) => {
//   const result = await fetchCredits(movieId);

//   const cast: CastMember[] = result.cast || [];
//   const crew: CrewMember[] = result.crew || [];

//   const director = crew.find((member) => member.job === "Director");
//   const writers = new Set(
//     crew
//       .filter((member) => member.department === "Writing")
//       .slice(0, 4)
//       .map(({ name }) => name),
//   );
//   const stars = cast.slice(0, 3);

//   return (
//     <div className="flex flex-col gap-5">
//       <div className="flex gap-20 border-b-1 pb-5">
//         <div className="font-semibold">Director</div>
//         <div>{director?.name}</div>
//       </div>
//       <div className="flex gap-21.5 border-b pb-5">
//         <span className="font-semibold">Writers</span>
//         <div className="flex gap-5">
//           {Array.from(writers).map((writer, index) => (
//             <span key={index} className="flex flex-row">
//               {index == 0 ? "" : " · "}
//               {writer}
//             </span>
//           ))}
//         </div>
//       </div>
//       <div className="flex gap-25.5 border-b pb-5">
//         <div className="font-semibold">Stars</div>
//         <div className="flex gap-3">
//           {stars.map((star, index) => (
//             <span key={index} className="flex flex-row ">
//               {index == 0 ? "" : " · "}
//               {star.name}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

import React from "react";
import { CastMember, CrewMember } from "../../../../../index";
import { span } from "motion/react-client";

type Props = {
  movieId: string;
};

const fetchCredits = async (id: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_DB_KEY}`,
      },
    },
  );
  const data = await response.json();
  //   console.log(data);
  return data;
};
export const Team = async ({ movieId }: { movieId: string }) => {
  const result = await fetchCredits(movieId);

  const cast: CastMember[] = result.cast || [];
  const crew: CrewMember[] = result.crew || [];

  const director = crew.find((member) => member.job === "Director");
  const writers = Array.from(
    new Set(
      crew
        .filter((member) => member.department === "Writing")
        .slice(0, 3) // Утсан дээр хэт их бичвэр багтахгүй тул 3 болгов
        .map(({ name }) => name),
    ),
  );
  const stars = cast.slice(0, 3);

  return (
    <div className="flex flex-col w-full text-black">
      {/* Director Row */}
      <div className="flex flex-col sm:flex-row py-4 border-b border-gray-200 gap-1 sm:gap-0">
        <div className="font-bold sm:min-w-[120px]">Director</div>
        <div className="text-gray-800">{director?.name || "Unknown"}</div>
      </div>

      {/* Writers Row */}
      <div className="flex flex-col sm:flex-row py-4 border-b border-gray-200 gap-1 sm:gap-0">
        <span className="font-bold sm:min-w-[120px]">Writers</span>
        <div className="flex flex-wrap items-center gap-x-2">
          {writers.map((writer, index) => (
            <span key={index} className="flex items-center">
              {writer}
              {index < writers.length - 1 && <span className="ml-2">·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Stars Row */}
      <div className="flex flex-col sm:flex-row py-4 border-b border-gray-200 gap-1 sm:gap-0">
        <div className="font-bold sm:min-w-[120px]">Stars</div>
        <div className="flex flex-wrap items-center gap-x-2">
          {stars.map((star, index) => (
            <span key={index} className="flex items-center">
              {star.name}
              {index < stars.length - 1 && <span className="ml-2">·</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
