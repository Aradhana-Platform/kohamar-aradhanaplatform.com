## 1. Overview

- **Purpose**: Client-side player page for a single song, including YouTube playback and an "Up Next" sidebar.
- **Problem it solves**: Provides a rich playback experience with automatic progression to the next song and cross-navigation between songs.
- **High-level responsibility**: Render a video player, song details, sharing controls, and a list of upcoming songs.

## 2. File Location

- Source: `app/songs/[slug]/SingleSongClient.tsx`

## 3. Key Components

- `SingleSongClient` (default export)
  - Props: `{ song: Song, allSongs: Song[] }`.
  - Computes `currentIndex` for the active song and builds an `upNext` list.
  - Renders the YouTube player, song metadata, description, and an Up Next list of links.
- `getYouTubeId(url: string)`
  - Utility that decodes the URL and extracts a YouTube video ID using a regex, supporting multiple URL formats.
- UI elements:
  - Back link to `/songs`.
  - Responsive layout with player + metadata on the left and "Up Next" list on the right (on large screens).
  - Share button using `navigator.share` where available, otherwise copying the URL to clipboard.

## 4. Execution Flow

- On render:
  1. Compute `currentIndex` by matching `song.slug` against `allSongs`.
  2. Build `upNext` as the songs after the current one, wrapping around to the beginning if needed.
  3. Initialize YouTube player with the extracted video ID and `autoplay` enabled.
- On video end:
  1. `handleVideoEnd` checks if `upNext` is non-empty.
  2. Navigates to the first song in `upNext` via `router.push`.
- Up Next list:
  - For each `nextSong`, compute a thumbnail URL and render a compact card linking to `/songs/${slug}`.

## 5. Data Flow

- **Inputs**:
  - `song`: currently viewed song.
  - `allSongs`: full song list used to build `upNext`.
- **Processing**:
  - YouTube ID extraction.
  - Index lookup and wrap-around list construction.
- **Outputs**:
  - JSX for the player page and Up Next sidebar.
- **Dependencies**:
  - `react-youtube` for the player component.
  - `next/navigation` for `useRouter`.
  - `next/link`.
  - Type `Song` from `../../../lib/songs`.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[SingleSongClient(song, allSongs)] --> B[Find currentIndex]
    B --> C[Build upNext List]
    A --> D[Render YouTube Player]
    D --> E[Video Ends]
    E --> F[handleVideoEnd]
    F --> G[router.push('/songs/' + upNext[0].slug)]
    A --> H[Render Up Next Sidebar]
```

## 7. Error Handling & Edge Cases

- Assumes `song` is valid; component is only used after the server has resolved a song.
- If `currentIndex` is `-1`, `upNext` falls back to all songs except the current.
- Share button relies on browser APIs; fallbacks to clipboard when `navigator.share` is not present.

## 8. Example Usage

- Used only by the server component in `app/songs/[slug]/page.tsx`:

```tsx
return <SingleSongClient song={song} allSongs={allSongs} />;
```