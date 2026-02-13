import { getAllSongs, getSongBySlug } from "../../../lib/songs";
import SingleSongClient from "./SingleSongClient"; // We will create this next
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const songs = getAllSongs();
    return songs.map((song) => ({
        slug: song.slug,
    }));
}

export default async function SongPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const song = getSongBySlug(slug);
    const allSongs = getAllSongs(); // To show "Up Next"

    if (!song) {
        notFound();
    }

    return <SingleSongClient song={song} allSongs={allSongs} />;
}
