## 1. Overview

- **Purpose**: Provides typed access to worship song content stored as MDX files in `content/songs`.
- **Problem it solves**: Centralizes song metadata parsing and lookup logic so UI components can work with a strongly typed `Song` model.
- **High-level responsibility**: List all songs and retrieve individual songs by slug.

## 2. File Location

- Source: `lib/songs.ts`

## 3. Key Components

- `songsDirectory`
  - Absolute path to `content/songs`.
- `Song` interface
  - Describes song metadata: `slug`, `title`, `artist`, `duration`, `category`, optional `description`, `image`, `video`, `lyrics`.
- `getAllSongs(): Song[]`
  - Returns an array of songs by reading all MDX files under `songsDirectory`, parsing frontmatter, and mapping fields to `Song`.
- `getSongBySlug(slug: string): Song | null`
  - Attempts to read the MDX file for the given slug.
  - On success, parses and returns a `Song` object.
  - On failure (e.g., file missing), returns `null`.

## 4. Execution Flow

- **getAllSongs**:
  1. Check if `songsDirectory` exists via `fs.existsSync`.
  2. If not, return an empty array.
  3. Read file names via `fs.readdirSync`.
  4. For each file:
     - Compute slug from filename.
     - Read file content.
     - Parse frontmatter with `matter`.
     - Map metadata fields into a `Song` object.
  5. Return the resulting `Song[]`.

- **getSongBySlug**:
  1. Build `fullPath` as `songsDirectory/${slug}.mdx`.
  2. Within a try/catch, read and parse the file.
  3. On success, construct a `Song` object and return it.
  4. On any error (e.g., file not found), return `null`.

## 5. Data Flow

- **Inputs**:
  - MDX files in `content/songs`.
  - `slug` parameter for `getSongBySlug`.
- **Processing**:
  - File I/O.
  - Frontmatter parsing.
  - Mapping parsed fields into the typed `Song` structure.
- **Outputs**:
  - `getAllSongs`: an array of `Song` objects.
  - `getSongBySlug`: a `Song` or `null`.
- **Dependencies**:
  - Node.js `fs` and `path`.
  - `gray-matter` for parsing.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[getAllSongs] --> B[Check songsDirectory Exists]
    B -->|No| C[Return []]
    B -->|Yes| D[Read MDX Files]
    D --> E[Parse Frontmatter]
    E --> F[Map to Song]
    F --> G[Return Song[]]

    H[getSongBySlug(slug)] --> I[Build File Path]
    I --> J[Try Read & Parse]
    J -->|Success| K[Return Song]
    J -->|Error| L[Return null]
```

## 7. Error Handling & Edge Cases

- Protects against missing directory by returning an empty array.
- `getSongBySlug` catches all errors and returns `null`, avoiding server crashes.
- Assumes song MDX files have all required fields; missing fields may be `undefined`.

## 8. Example Usage

```ts
import { getAllSongs, getSongBySlug } from "../lib/songs";

const songs = getAllSongs();
const song = getSongBySlug("hebrew-alphabet-song");
```