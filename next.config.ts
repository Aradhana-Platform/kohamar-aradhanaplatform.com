import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  reactCompiler: true,

  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "theologica-733b461f.base44.app" },
      { protocol: "https", hostname: "www.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "scontent.fktm21-1.fna.fbcdn.net" },
    ],
  },
};

export default withMDX(nextConfig);
