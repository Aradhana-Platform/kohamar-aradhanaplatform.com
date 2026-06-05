import type { Metadata } from "next";
import { getAllSongs } from "../../lib/songs";
import SongsClient from "./SongsClient";
import { buildMetadata } from "../../lib/seo/metadata";
import { JsonLd } from "../../Components/seo/JsonLd";
import { breadcrumbLd, collectionPageLd } from "../../lib/seo/jsonld";
import { absoluteUrl, siteConfig } from "../../lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Songs",
  description:
    "Christian songs and worship music by Amar Pandey and collaborators — including Nepali Christian songs and Hebrew/Greek alphabet songs.",
  path: "/songs",
  keywords: ["Nepali Christian songs", "worship songs", "Hebrew alphabet song", "Greek alphabet song", "Amar Pandey songs"],
});

export default async function SongsPage() {
  const songs = getAllSongs();
  return (
    <>
      <JsonLd
        id="ld-songs-breadcrumb"
        data={breadcrumbLd([
          { name: "Home", url: siteConfig.url },
          { name: "Songs", url: absoluteUrl("/songs") },
        ])}
      />
      <JsonLd
        id="ld-songs-collection"
        data={collectionPageLd({
          url: absoluteUrl("/songs"),
          name: "Songs",
          description: "Songs by Amar Pandey and collaborators.",
          items: songs.map((s) => ({
            name: s.title,
            url: absoluteUrl(`/songs/${s.slug}`),
            image: s.image,
          })),
        })}
      />
      <SongsClient initialVideos={songs} />
    </>
  );
}
