import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ["images.unsplash.com", "theologica-733b461f.base44.app", "www.youtube.com", "i.ytimg.com", "img.youtube.com"],
  },
};

export default nextConfig;
