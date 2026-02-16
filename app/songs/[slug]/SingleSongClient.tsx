"use client";

import { useState } from "react";
import Image from "next/image"; // kept for non-youtube images if any
import Link from "next/link";
import YouTube from "react-youtube";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Song } from "../../../lib/songs";


const getYouTubeId = (url: string) => {
    if (!url) return "";

    // Decode HTML entities like &amp; to &
    const decodedUrl = url.replace(/&amp;/g, '&');

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([a-zA-Z0-9_-]{11}).*/;
    const match = decodedUrl.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "";
};

export default function SingleSongClient({ song, allSongs }: { song: Song, allSongs: Song[] }) {
    const router = useRouter();

    // Find current song index
    const currentIndex = allSongs.findIndex(s => s.slug === song.slug);

    // Create "Up Next" list: all songs after the current one, then wrap around to songs before it
    const upNext = currentIndex !== -1
        ? [...allSongs.slice(currentIndex + 1), ...allSongs.slice(0, currentIndex)]
        : allSongs.filter(s => s.slug !== song.slug);

    // Handle video end - auto-play next song
    const handleVideoEnd = () => {
        if (upNext.length > 0) {
            // Navigate to the first song in the "Up Next" list
            router.push(`/songs/${ upNext[0].slug }`);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20 pt-10">
            {/* 
                Structure:
                - Player (Top on mobile, Left on desktop)
                - Details (Below Player)
                - Up Next (Right on desktop, Bottom on mobile)
             */}
            {/* BACK BUTTON */}
            <div className="max-w-7xl lg:sticky lg:top-20 mx-auto px-4 lg:px-8 mb-4">
                <Link href="/songs" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 shadow-sm hover:shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to Songs
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: PLAYER + INFO */}
                <div className="lg:col-span-2 space-y-4">
                    {/* VIDEO PLAYER */}
                    <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl">
                        <YouTube
                            videoId={getYouTubeId(song.video)}
                            opts={{
                                height: '100%',
                                width: '100%',
                                playerVars: { autoplay: 1, rel: 0 },
                            }}
                            onEnd={handleVideoEnd}
                            className="w-full h-full absolute inset-0"
                            iframeClassName="w-full h-full"
                        />
                    </div>

                    {/* VIDEO INFO */}
                    <div>
                        <div className="md:flex items-center justify-between pb-4 border-b border-slate-200">
                            <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{song.title}</h1>
                            <div className="">
                                <button
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: song.title,
                                                text: `Check out "${ song.title }" by ${ song.artist } on Kohamar!`,
                                                url: window.location.href,
                                            }).catch(console.error);
                                        } else {
                                            navigator.clipboard.writeText(window.location.href);
                                            alert("Link copied to clipboard!");
                                        }
                                    }}
                                    className="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full font-medium text-sm flex items-center gap-2 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                                    </svg>
                                    Share
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 bg-slate-100 p-4 rounded-xl text-sm text-slate-700">
                            <p><span className="font-semibold">Description:</span></p>
                            <p className="mt-2">{song.description}</p>
                        </div>
                    </div>
                </div>


                {/* RIGHT COLUMN: UP NEXT */}
                <div className="lg:col-span-1">
                    <h3 className="font-bold text-slate-800 mb-4 text-xl">Up Next</h3>
                    <div className="space-y-4">
                        {upNext.map((nextSong) => {
                            // Extract YouTube video ID from the video URL
                            const videoId = getYouTubeId(nextSong.video);
                            const thumbnailUrl = videoId
                                ? `https://img.youtube.com/vi/${ videoId }/maxresdefault.jpg`
                                : '';

                            return (
                                <Link
                                    key={nextSong.slug}
                                    href={`/songs/${ nextSong.slug }`}
                                    className="flex gap-3 group cursor-pointer hover:bg-slate-100 p-2 rounded-lg transition-colors"
                                >
                                    <div className="relative w-40 aspect-video rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                                        <img
                                            src={thumbnailUrl}
                                            alt={nextSong.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                        />
                                        <span className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 text-white text-[10px] rounded font-medium">{nextSong.duration}</span>
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <h4 className="font-semibold text-sm line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{nextSong.title}</h4>
                                        <p className="text-xs text-slate-500 mt-1 truncate">{nextSong.artist}</p>
                                        <p className="text-xs text-slate-500">{nextSong.category}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}
