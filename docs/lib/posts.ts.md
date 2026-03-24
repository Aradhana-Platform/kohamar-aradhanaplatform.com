## 1. Overview

- **Purpose**: Provides helper functions to read and parse article content from MDX files in the `content/articles` directory.
- **Problem it solves**: Centralizes file-system access and frontmatter parsing for blog posts, so UI components can work with structured data.
- **High-level responsibility**: Read MDX files, extract frontmatter metadata, and return normalized post objects or full post content.

## 2. File Location

- Source: `lib/posts.ts`

## 3. Key Components

- `postsDirectory`
  - Constant that resolves to the absolute path of the `content/articles` directory using `process.cwd()` and `path.join`.
- `getAllPosts()`
  - Reads all files from `postsDirectory`.
  - For each file:
    - Derives a `slug` by stripping the `.mdx` extension.
    - Reads file contents.
    - Uses `gray-matter` to parse frontmatter and content.
    - Returns an object with metadata fields: `slug`, `title`, `date`, `author`, `description`, `category`, `categoryColor`, `image`, and `readTime`.
- `getPostBySlug(slug: string)`
  - Given a `slug`, constructs the full path to `${slug}.mdx`.
  - Reads and parses the MDX file using `gray-matter`.
  - Returns an object containing `frontmatter` (all frontmatter data) and `content` (the body of the post).

## 4. Execution Flow

- **getAllPosts**:
  1. Compute `postsDirectory` path.
  2. Use `fs.readdirSync` to list MDX filenames.
  3. For each file:
     - Compute `slug` from filename.
     - Read file content with `fs.readFileSync`.
     - Parse with `matter(fileContent)`.
     - Map frontmatter fields to a normalized post object.
  4. Return an array of post objects.

- **getPostBySlug**:
  1. Receive `slug` as input.
  2. Build full path to the MDX file using `path.join`.
  3. Read the file with `fs.readFileSync`.
  4. Parse with `matter` into `data` and `content`.
  5. Return `{ frontmatter: data, content }`.

## 5. Data Flow

- **Inputs**:
  - File system contents of `content/articles` directory.
  - For `getPostBySlug`, a `slug` string.
- **Processing**:
  - File I/O operations via `fs`.
  - Path resolution via `path`.
  - Frontmatter parsing via `gray-matter`.
- **Outputs**:
  - `getAllPosts`: Array of structured post metadata objects.
  - `getPostBySlug`: Single post object with `frontmatter` and raw `content`.
- **Dependencies**:
  - Node.js `fs` and `path` modules.
  - `gray-matter` for frontmatter parsing.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[getAllPosts] --> B[Read postsDirectory]
    B --> C[Iterate MDX Files]
    C --> D[Read File Content]
    D --> E[Parse Frontmatter with gray-matter]
    E --> F[Build Post Metadata Object]
    F --> G[Return Array of Posts]

    H[getPostBySlug(slug)] --> I[Build File Path]
    I --> J[Read File]
    J --> K[Parse with gray-matter]
    K --> L[Return {frontmatter, content}]
```

## 7. Error Handling & Edge Cases

- No explicit try/catch blocks are present.
- Potential issues:
  - Missing `content/articles` directory or files cause `fs` operations to throw.
  - Malformed frontmatter may cause `gray-matter` parsing errors or missing fields.
  - Date strings may be invalid, affecting downstream sorting.
- Console logging of `slug` is used for debugging but does not affect control flow.

## 8. Example Usage

```ts
import { getAllPosts, getPostBySlug } from "../lib/posts";

// Fetch all posts
const posts = getAllPosts();

// Fetch a single post by slug
const { frontmatter, content } = getPostBySlug("first-post");
```
