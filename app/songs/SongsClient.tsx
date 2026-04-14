"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Song } from "../../lib/songs";
import Image from "next/image";

// Helper function to extract YouTube video ID from URL
function extractYouTubeId(url: string): string | null {
  if (!url) return null;

  // Decode HTML entities like &amp; to &
  const decodedUrl = url.replace(/&amp;/g, "&");

  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = decodedUrl.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export default function SongsClient({
  initialVideos,
}: {
  initialVideos: Song[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = useMemo(() => {
    return initialVideos.filter((v) => {
      const matchesCategory =
        selectedCategory === "All" || v.category === selectedCategory;
      const matchesSearch =
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (v.description &&
          v.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [initialVideos, selectedCategory, searchQuery]);

  const categories = [
    "All",
    ...Array.from(new Set(initialVideos.map((v) => v.category))),
  ];

  // Fallback if no videos found
  if (!initialVideos || initialVideos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        <p>No songs found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 pb-20 relative">
      {/* Hero Section */}
      <div className="relative pt-18 pb-8 bg-gradient-to-b from-#1c388b-50 to-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#1c388b] rounded-full blur-[100px]" />
          <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-[#1c388b] rounded-full blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              <span className="text-[#1c388b]">Songs</span>
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-md">
              Savor songs by Amar Pandey
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-slate-400 group-focus-within:text-[#1c388b] transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by title, artist, or lyrics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-[#1c388b] focus:border-transparent transition-all text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${cat === selectedCategory ? "bg-[#1c388b] text-white shadow-[#1c388b]/20" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-2">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-slate-800">
            {searchQuery
              ? `Search Results (${filteredVideos.length})`
              : "Recent Songs"}
          </h2>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
            >
              Clear search
            </button>
          )}
        </div>

        <AnimatePresence mode="popLayout">
          {filteredVideos.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
            >
              {filteredVideos.map((video) => {
                // Extract YouTube video ID from the video URL
                const videoId = extractYouTubeId(video.video);
                const thumbnailUrl = videoId
                  ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                  : video.image || "";

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={video.slug}
                  >
                    <Link
                      href={`/songs/${video.slug}`}
                      className="cursor-pointer group block"
                    >
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                        <Image
                          src={thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          width={400}
                          height={400}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] rounded-md font-bold uppercase tracking-wider">
                          {video.duration}
                        </span>
                      </div>
                      <div className="flex gap-3 px-1">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1c388b] to-[#101c39] text-white flex-shrink-0 flex items-center justify-center font-bold text-sm shadow-sm">
                          {video.artist.charAt(0)}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <h3 className="font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-[#1c388b] transition-colors uppercase tracking-tight text-[14px]">
                            {video.title}
                          </h3>
                          <p className="text-sm text-slate-500 mt-1 hover:text-slate-700 truncate font-medium">
                            {video.artist}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-slate-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mb-4 opacity-20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg">No songs match your search query.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-blue-600 hover:underline"
              >
                View all songs
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
