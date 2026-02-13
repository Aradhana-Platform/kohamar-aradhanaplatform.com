"use client";

import Link from "next/link";
import { useState } from "react";
import type { Song } from "../../lib/songs";

export default function SongsClient({ initialVideos }: { initialVideos: Song[] }) {
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Fallback if no videos found
    if (!initialVideos || initialVideos.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
                <p>No songs found.</p>
            </div>
        )
    }

    const filteredVideos = selectedCategory === "All"
        ? initialVideos
        : initialVideos.filter(v => v.category === selectedCategory);

    const categories = ['All', ...Array.from(new Set(initialVideos.map(v => v.category)))];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20 relative">

            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24">

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Worship Songs</h1>
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${ cat === selectedCategory ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300' }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                    {filteredVideos.map((video) => (
                        <Link
                            key={video.slug}
                            href={`/songs/${ video.slug }`}
                            className="cursor-pointer group block"
                        >
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-200 mb-3">
                                <img
                                    src={(video.image?.startsWith('http') || video.image?.startsWith('/')) ? video.image : `https://img.youtube.com/vi/${ video.image }/maxresdefault.jpg`}
                                    alt={video.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-xs rounded font-medium">{video.duration}</span>
                            </div>
                            <div className="flex gap-3 px-1">
                                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex-shrink-0 flex items-center justify-center font-bold text-sm">
                                    {video.artist.charAt(0)}
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <h3 className="font-semibold text-slate-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{video.title}</h3>
                                    <p className="text-sm text-slate-500 mt-1 hover:text-slate-700 truncate">{video.artist}</p>
                                    {/* <p className="text-sm text-slate-500">{video.views} • {video.time}</p> */}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
