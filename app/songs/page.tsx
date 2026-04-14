import { getAllSongs } from "../../lib/songs";
import SongsClient from "./SongsClient";

export default async function SongsPage() {
  const songs = getAllSongs();
  return <SongsClient initialVideos={songs} />;
}
