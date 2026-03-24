## 1. Overview

- **Purpose**: Client-side UI for browsing, searching, and filtering worship songs.
- **Problem it solves**: Enables users to quickly find songs by title, artist, lyrics, or category, and navigate to individual song pages.
- **High-level responsibility**: Manage filter state, compute filtered songs, and render a responsive grid of song cards.

## 2. File Location

- Source: `app/songs/SongsClient.tsx`

## 3. Key Components

- `SongsClient` (default export)
  - Props: `{ initialVideos: Song[] }`.
  - State:
    - `selectedCategory`: currently active category filter.
    - `searchQuery`: current search text.
  - Derived data:
    - `filteredVideos`: memoized list of songs matching category and search.
    - `categories`: `['All', ...unique video.category values]`.
- `extractYouTubeId(url: string)`
  - Helper function to parse a YouTube video ID from various URL formats.
- UI elements:
  - Hero section with heading and description.
  - Search input with clear button.
  - Category pill buttons.
  - Grid of song cards with thumbnails, title, artist, and duration.

## 4. Execution Flow

- On initial render:
  1. `selectedCategory` is set to `"All"`, `searchQuery` is empty.
  2. `categories` is derived from `initialVideos`.
  3. `filteredVideos` initially equals `initialVideos`.
- On user interaction:
  1. Changing the search input updates `searchQuery`.
  2. Clicking a category button updates `selectedCategory`.
  3. `filteredVideos` recomputes via `useMemo`, applying:
     - Category match (`All` or exact category equality).
     - Search match across `title`, `artist`, and optional `description`.
- Rendering:
  - If `initialVideos` is empty, a "No songs found" fallback is shown.
  - Otherwise, a hero, search, category filters, and the results grid are rendered.

## 5. Data Flow

- **Inputs**:
  - `initialVideos: Song[]` from the server-side page.
  - User input for search and category.
- **Processing**:
  - Filtering by category and text.
  - Thumbnail URL generation via extracted YouTube IDs.
- **Outputs**:
  - JSX for the songs listing page.
- **Dependencies**:
  - `next/link` and `next/image`.
  - `framer-motion` for animations.
  - `../../lib/songs` type `Song`.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[SongsClient(initialVideos)] --> B[Derive Categories]
    A --> C[User Changes Search/Category]
    C --> D[Recompute filteredVideos]
    D --> E[Render Grid of Links]
    E --> F[Song Detail Pages (/songs/:slug)]
```

## 7. Error Handling & Edge Cases

- If `initialVideos` is `null` or empty, a full-screen fallback message is rendered.
- Filtering gracefully handles optional `description` using conditional checks.
- `extractYouTubeId` returns `null` on invalid URLs, falling back to a provided image if available.

## 8. Example Usage

```tsx
import SongsClient from "./SongsClient";
import { getAllSongs } from "../../lib/songs";

export default async function SongsPage() {
  const songs = getAllSongs();
  return <SongsClient initialVideos={songs} />;
}
```