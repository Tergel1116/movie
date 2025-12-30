import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    TMDB_BASE_URL: process.env.TMDB_BASE_UR ?? "",
    NEXT_PUBLIC_MOVIE_DB_KEY: process.env.NEXT_PUBLIC_MOVIE_DB_KEY ?? "",
  },
  reactCompiler: true,
  images: {
    domains: ["image.tmdb.org"],
  },
};

export default nextConfig;
