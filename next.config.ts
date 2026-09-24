import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // TMDB artwork; paths are stored in the DB and turned into URLs by `tmdbImageUrl`.
    remotePatterns: [new URL("https://image.tmdb.org/t/p/**")],
  },
};

export default nextConfig;
