## 1. Overview

- **Purpose**: Implements the `/songs` page by loading all songs and rendering the interactive songs client.
- **Problem it solves**: Separates server-side data access from the client-side search and filter UI for songs.
- **High-level responsibility**: Fetch all songs via `getAllSongs` and pass them to `SongsClient`.

## 2. File Location

- Source: `app/songs/page.tsx`

## 3. Key Components

- `SongsPage` (default export)
  - Async server component.
  - Calls `getAllSongs()` from `lib/songs`.
  - Renders `<SongsClient initialVideos={songs} />`.
- `getAllSongs`
  - Library function returning an array of `Song` objects.
- `SongsClient`
  - Client-side component that handles searching, filtering, and listing songs.

## 4. Execution Flow

- On navigation to `/songs`:
  1. Next.js runs `SongsPage` on the server.
  2. `getAllSongs()` retrieves all songs from filesystem.
  3. The `songs` array is passed to `SongsClient` as `initialVideos`.

## 5. Data Flow

- **Inputs**:
  - MDX song files from `content/songs` via `getAllSongs`.
- **Processing**:
  - `SongsPage` performs no extra processing beyond passing data down.
- **Outputs**:
  - JSX that renders `SongsClient` with the songs list.
- **Dependencies**:
  - `../../lib/songs`.
  - `./SongsClient`.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[Request '/songs'] --> B[SongsPage]
    B --> C[getAllSongs]
    C --> D[songs: Song[]]
    B --> E[SongsClient initialVideos={songs}]
    E --> F[Songs Listing UI]
```

## 7. Error Handling & Edge Cases

- `getAllSongs` returns an empty array if the songs directory is missing; in this case, `SongsClient` will show a fallback.
- No additional error handling is defined here.

## 8. Example Usage

- Used automatically as the `/songs` route.