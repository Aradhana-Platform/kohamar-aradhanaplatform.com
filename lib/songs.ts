import fs from "fs";
import path from "path";
import matter from "gray-matter";

const songsDirectory = path.join(process.cwd(), "content/songs");

export interface Song {
    slug: string; // Add slug field
    title: string;
    artist: string;
    duration: string;
    category: string;
    description?: string;
    image: string;
    video: string;
    lyrics: string;
}

export function getAllSongs(): Song[] {
    if (!fs.existsSync(songsDirectory)) {
        return [];
    }
    
    const files = fs.readdirSync(songsDirectory);

    return files.map((file) => {
        const slug = file.replace(".mdx", ""); // Derive slug from filename
        const fullPath = path.join(songsDirectory, file);
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        const { data } = matter(fileContent);

        return {
            slug,
            title: data.title,
            artist: data.artist,
            duration: data.duration,
            category: data.category,
            description: data.description,
            image: data.image,
            video: data.video,
            lyrics: data.lyrics,
        } as Song;
    });
}

export function getSongBySlug(slug: string): Song | null {
    try {
        const fullPath = path.join(songsDirectory, `${slug}.mdx`);
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        const { data } = matter(fileContent);

        return {
            slug,
            title: data.title,
            artist: data.artist,
            duration: data.duration,
            category: data.category,
            description: data.description,
            image: data.image,
            video: data.video,
            lyrics: data.lyrics,
        } as Song;
    } catch (e) {
        return null;
    }
}
