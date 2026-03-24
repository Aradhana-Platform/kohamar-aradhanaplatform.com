## 1. Overview

- **Purpose**: Handles dynamic song detail routes under `/songs/[slug]`.
- **Problem it solves**: Generates static parameters for all songs and renders a single-song player page.
- **High-level responsibility**: Build static paths from available songs, fetch a song (and list of all songs), and delegate rendering to `SingleSongClient`.

## 2. File Location

- Source: `app/songs/[slug]/page.tsx`

## 3. Key Components

- `generateStaticParams()`
  - Next.js data function that:
    - Calls `getAllSongs()`.
    - Maps each song to `{ slug: song.slug }` for static generation.
- `SongPage` (default export)
  - Async server component taking `{ params }`.
  - Awaits `params` to extract `slug`.
  - Calls `getSongBySlug(slug)` and `getAllSongs()`.
  - If `song` is falsy, calls `notFound()` to trigger a 404.
  - Otherwise renders `<SingleSongClient song={song} allSongs={allSongs} />`.
- `SingleSongClient`
  - Client component responsible for the player UI and "Up Next" list.

## 4. Execution Flow

- Build time (static generation):
  1. `generateStaticParams` retrieves all songs.
  2. Next.js creates routes for each `{ slug }`.
- Request time:
  1. For a specific slug, Next.js runs `SongPage`.
  2. `SongPage` loads the `song` and `allSongs` from `lib/songs`.
  3. If no song is found, `notFound()` is invoked.
  4. If found, `SingleSongClient` renders the detailed player page.

## 5. Data Flow

- **Inputs**:
  - Dynamic route parameter `slug`.
  - Song MDX files via `getAllSongs`/`getSongBySlug`.
- **Processing**:
  - Static params generation.
  - Single song lookup and complete list retrieval.
- **Outputs**:
  - Song detail page rendered by `SingleSongClient`.
- **Dependencies**:
  - `../../../lib/songs`.
  - `./SingleSongClient`.
  - `next/navigation` for `notFound`.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[getAllSongs] --> B[generateStaticParams]
    B --> C[Static Paths /songs/:slug]

    D[SongPage({ params })] --> E[getSongBySlug(slug)]
    D --> F[getAllSongs]
    E -->|null| G[notFound]
    E -->|Song| H[SingleSongClient song, allSongs]
```

## 7. Error Handling & Edge Cases

- If `getSongBySlug` returns `null`, `notFound()` triggers a 404 page.
- If `getAllSongs` returns an empty list, `generateStaticParams` will create no routes.

## 8. Example Usage

- Automatically used for routes like `/songs/biblical-greek-alphabet-song`.