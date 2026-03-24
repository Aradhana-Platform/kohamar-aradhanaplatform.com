## 1. Overview

- **Purpose**: Aggregates posts from multiple content directories (articles and magazines) and provides a generic `getPostBySlug` helper across all content.
- **Problem it solves**: Allows consumers to fetch all posts, regardless of type, or find a specific post by slug without knowing which subfolder it lives in.
- **High-level responsibility**: Read MDX files from configured content folders, parse frontmatter, and normalize post metadata.

## 2. File Location

- Source: `lib/category.ts`

## 3. Key Components

- `contentDirectory`
  - Array of absolute paths to `content/articles` and `content/magazine` directories.
- `getAllposts()`
  - Iterates through each directory in `contentDirectory`.
  - Reads all MDX files, parses frontmatter with `gray-matter`, and builds a combined list of post metadata.
- `getPostBySlug(slug: string)`
  - Scans each folder within the root `content` directory.
  - For each folder, checks for a `${slug}.mdx` file.
  - If found, reads and parses the file and returns `{ frontmatter, content }`.
  - Throws an error if no matching post is found in any folder.

## 4. Execution Flow

- **getAllposts**:
  1. Initialize `allPosts` as an empty array.
  2. For each directory in `contentDirectory`:
     - Read filenames using `fs.readdirSync`.
     - For each file:
       - Compute slug from filename.
       - Read file contents and parse with `matter`.
       - Map frontmatter to a normalized metadata object.
     - Append posts from this directory to `allPosts`.
  3. Return the merged `allPosts` array.

- **getPostBySlug**:
  1. Read all folder names under `content`.
  2. For each folder:
     - Construct a full path to `${slug}.mdx`.
     - If it exists, read and parse using `matter` and return the result.
  3. If no file is found, throw an error.

## 5. Data Flow

- **Inputs**:
  - File-system contents of `content/articles` and `content/magazine`.
  - A `slug` string for `getPostBySlug`.
- **Processing**:
  - File reads via `fs`.
  - Path building via `path`.
  - Frontmatter parsing via `gray-matter`.
- **Outputs**:
  - `getAllposts`: unified array of article and magazine metadata.
  - `getPostBySlug`: a single post with `frontmatter` and `content`, or an exception if not found.
- **Dependencies**:
  - Node.js `fs` and `path`.
  - `gray-matter` for parsing.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[getAllposts] --> B[Iterate contentDirectory]
    B --> C[Read Files in Each Dir]
    C --> D[Parse Frontmatter]
    D --> E[Build Post Objects]
    E --> F[Merge into allPosts]
    F --> G[Return Combined Posts]

    H[getPostBySlug(slug)] --> I[Read 'content' Folders]
    I --> J[For Each Folder]
    J --> K[Check slug.mdx Exists]
    K -->|Found| L[Read & Parse File]
    L --> M[Return {frontmatter, content}]
    K -->|Not Found| J
    J -->|None Found| N[Throw Error]
```

## 7. Error Handling & Edge Cases

- `getAllposts` does not guard against missing directories; if a directory is missing, `fs.readdirSync` will throw.
- `getPostBySlug` throws a descriptive error if no post is found.
- Assumes MDX frontmatter contains the expected fields; missing fields become `undefined`.

## 8. Example Usage

```ts
import { getAllposts, getPostBySlug } from "../lib/category";

const posts = getAllposts();
const single = getPostBySlug("first-post");
```