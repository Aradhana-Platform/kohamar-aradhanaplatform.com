## 1. Overview

- **Purpose**: Handles file-based magazine content stored as MDX files in `content/magazine`.
- **Problem it solves**: Provides reusable helpers for listing all magazines and fetching a single magazine by slug.
- **High-level responsibility**: Read magazine MDX files, parse frontmatter, and return structured data objects.

## 2. File Location

- Source: `lib/magazine.ts`

## 3. Key Components

- `postsDirectory`
  - Absolute path to `content/magazine`.
- `getAllPosts()`
  - Reads all MDX files in `postsDirectory`.
  - For each file, derives `slug`, reads content, parses frontmatter with `gray-matter`, and maps metadata.
- `getMagazineBySlug(slug: string)`
  - Constructs the path to `${slug}.mdx`.
  - Reads and parses the file.
  - Returns `{ frontmatter, content }` where `frontmatter` includes magazine metadata.

## 4. Execution Flow

- **getAllPosts**:
  1. Use `fs.readdirSync(postsDirectory)` to get filenames.
  2. For each file:
     - Remove `.mdx` to obtain `slug`.
     - Read file content and parse with `matter`.
     - Return a metadata object with fields like `title`, `date`, `author`, `description`, `category`, `categoryColor`, `image`, `readTime`.
  3. Return the array of magazine metadata objects.

- **getMagazineBySlug**:
  1. Build `fullPath` as `postsDirectory/${slug}.mdx`.
  2. Read file and parse frontmatter and content.
  3. Return `{ frontmatter, content }`.

## 5. Data Flow

- **Inputs**:
  - MDX files in `content/magazine`.
  - `slug` argument to `getMagazineBySlug`.
- **Processing**:
  - File I/O.
  - Frontmatter parsing.
- **Outputs**:
  - `getAllPosts`: array of magazine metadata.
  - `getMagazineBySlug`: full magazine record with `frontmatter` and `content`.
- **Dependencies**:
  - Node.js `fs` and `path`.
  - `gray-matter` for parsing.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[getAllPosts] --> B[Read postsDirectory]
    B --> C[Iterate MDX Files]
    C --> D[Read & Parse File]
    D --> E[Map to Metadata]
    E --> F[Return Array]

    G[getMagazineBySlug(slug)] --> H[Build Path]
    H --> I[Read File]
    I --> J[Parse with gray-matter]
    J --> K[Return {frontmatter, content}]
```

## 7. Error Handling & Edge Cases

- No explicit guards for missing directories or files; `fs` calls will throw if paths are invalid.
- Assumes well-formed frontmatter; missing fields become `undefined`.

## 8. Example Usage

```ts
import { getAllPosts, getMagazineBySlug } from "../lib/magazine";

const magazines = getAllPosts();
const magazine = getMagazineBySlug("magOne");
```