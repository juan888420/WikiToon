import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // There is no home page: the channel list is the main page.
  async redirects() {
    return [{ source: "/", destination: "/canales", permanent: false }];
  },
  images: {
    // TMDB artwork; paths are stored in the DB and turned into URLs by `tmdbImageUrl`.
    remotePatterns: [new URL("https://image.tmdb.org/t/p/**")],
  },
};

export default nextConfig;
