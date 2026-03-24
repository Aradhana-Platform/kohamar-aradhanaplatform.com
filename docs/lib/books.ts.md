## 1. Overview

- **Purpose**: Provides helper functions for reading book data from MDX files in the `content/books` directory.
- **Problem it solves**: Encapsulates file-system access and frontmatter parsing for books so UI components can work with structured `Book` objects.
- **High-level responsibility**: Expose `getAllBooks` and `getBookBySlug` APIs for listing and retrieving books.

## 2. File Location

- Source: `lib/books.ts`

## 3. Key Components

- `booksDirectory`
  - Constant path to the `content/books` directory, constructed from `process.cwd()`.
- `Book` interface
  - Type describing book metadata: `slug`, `title`, `author`, `price`, `date`, `description`, `image`, `category`.
- `getAllBooks(): Book[]`
  - Returns an array of `Book` objects by:
    - Checking whether `booksDirectory` exists; if not, returns an empty array.
    - Reading `.mdx` files from the directory.
    - Parsing each file's frontmatter with `gray-matter`.
    - Mapping the parsed data into `Book` objects.
- `getBookBySlug(slug: string)`
  - Retrieves a single book by slug:
    - Builds the path to `${slug}.mdx` in `booksDirectory`.
    - Returns `null` if the file does not exist.
    - Otherwise, reads and parses the file with `gray-matter` and returns `{ frontmatter: data as Book, content }`.

## 4. Execution Flow

- **getAllBooks**:
  1. Determine if `booksDirectory` exists with `fs.existsSync`.
  2. If not, return `[]`.
  3. Read directory entries via `fs.readdirSync`.
  4. Filter to `.mdx` files only.
  5. For each file:
     - Compute slug from filename.
     - Read file content and parse with `matter`.
     - Construct and return a `Book` object.

- **getBookBySlug**:
  1. Build `fullPath` using `path.join` and `slug`.
  2. If `fs.existsSync(fullPath)` is false, return `null`.
  3. Otherwise, read and parse the MDX file.
  4. Return a `{ frontmatter, content }` object.

## 5. Data Flow

- **Inputs**:
  - Files in `content/books` directory.
  - A `slug` parameter for `getBookBySlug`.
- **Processing**:
  - File-system I/O.
  - Frontmatter parsing via `gray-matter`.
- **Outputs**:
  - `getAllBooks`: Array of `Book` metadata objects.
  - `getBookBySlug`: Single book with `frontmatter` and `content`, or `null` if not found.
- **Dependencies**:
  - Node.js `fs` and `path`.
  - `gray-matter` for parsing MDX frontmatter.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[getAllBooks] --> B[Check booksDirectory Exists]
    B -->|No| C[Return Empty Array]
    B -->|Yes| D[Read .mdx Files]
    D --> E[Parse Frontmatter]
    E --> F[Build Book Objects]
    F --> G[Return Book[]]

    H[getBookBySlug(slug)] --> I[Build File Path]
    I --> J[Check File Exists]
    J -->|No| K[Return null]
    J -->|Yes| L[Read & Parse File]
    L --> M[Return {frontmatter, content}]
```

## 7. Error Handling & Edge Cases

- Explicitly guards against missing `booksDirectory` and missing book files.
- No try/catch; if reads fail for existing files, errors propagate.
- Assumes frontmatter contains all `Book` fields; if missing, properties may be `undefined`.

## 8. Example Usage

```ts
import { getAllBooks, getBookBySlug } from "../lib/books";

const books = getAllBooks();
const singleBook = getBookBySlug("the-art-of-prayer");
```