import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ["images.unsplash.com", "theologica-733b461f.base44.app"],
  },
};

export default nextConfig;
