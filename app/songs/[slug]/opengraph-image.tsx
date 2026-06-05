import { getSongBySlug } from "../../../lib/songs";
import { renderDetailOg, OG_SIZE } from "../../../lib/seo/og";

export const runtime = "nodejs";
export const alt = "Kohamar song";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function SongOgImage({
  params,
}: {
  params: { slug: string };
}) {
  let title: string = "Song";
  let artist: string = "";
  let category: string = "Song";
  const song = getSongBySlug(params.slug);
  if (song) {
    title = song.title || title;
    artist = song.artist || artist;
    category = song.category || category;
  }

  return renderDetailOg({
    eyebrow: category,
    title,
    byline: artist ? `by ${artist}` : undefined,
  });
}
