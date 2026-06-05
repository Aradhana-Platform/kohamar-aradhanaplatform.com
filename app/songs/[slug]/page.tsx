import type { Metadata } from "next";
import { getAllSongs, getSongBySlug } from "../../../lib/songs";
import SingleSongClient from "./SingleSongClient";
import { notFound } from "next/navigation";
import { buildMetadata } from "../../../lib/seo/metadata";
import { JsonLd } from "../../../Components/seo/JsonLd";
import { breadcrumbLd, musicRecordingLd } from "../../../lib/seo/jsonld";
import { absoluteUrl, siteConfig } from "../../../lib/seo/config";

export async function generateStaticParams() {
  const songs = getAllSongs();
  return songs.map((song) => ({
    slug: song.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const song = getSongBySlug(slug);
  if (!song) {
    return buildMetadata({
      title: "Song not found",
      description: "The requested song could not be found.",
      path: `/songs/${slug}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: song.title,
    description: song.description || `${song.title} — ${song.artist}`,
    path: `/songs/${slug}`,
    image: song.image,
    type: "music.song",
    keywords: [song.artist, song.category, "Christian song", "worship"].filter(
      Boolean,
    ) as string[],
  });
}

export default async function SongPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const song = getSongBySlug(slug);
  const allSongs = getAllSongs();

  if (!song) {
    notFound();
  }

  const url = absoluteUrl(`/songs/${slug}`);
  const image = song.image
    ? /^https?:\/\//i.test(song.image)
      ? song.image
      : absoluteUrl(song.image)
    : undefined;

  return (
    <>
      <JsonLd
        id="ld-song"
        data={musicRecordingLd({
          url,
          name: song.title,
          byArtist: song.artist,
          duration: song.duration,
          genre: song.category,
          thumbnail: image,
          videoUrl: song.video,
        })}
      />
      <JsonLd
        id="ld-song-breadcrumb"
        data={breadcrumbLd([
          { name: "Home", url: siteConfig.url },
          { name: "Songs", url: absoluteUrl("/songs") },
          { name: song.title, url },
        ])}
      />
      <SingleSongClient song={song} allSongs={allSongs} />
    </>
  );
}
