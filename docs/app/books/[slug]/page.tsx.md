## 1. Overview

- **Purpose**: Server-side entrypoint for dynamic book detail routes `/books/[slug]`.
- **Problem it solves**: Fetches a single book by slug, handles 404s, and delegates UI rendering to `BookDetailClient`.
- **High-level responsibility**: Wire up the route parameter to the books library and client component.

## 2. File Location

- Source: `app/books/[slug]/page.tsx`

## 3. Key Components

- `PageProps` interface
  - Defines `params` as a `Promise<{ slug: string }>`.
- `BookDetailPage` (default export)
  - Async server component.
  - Awaits `params` to extract `slug`.
  - Calls `getBookBySlug(slug)`.
  - If no book is found, calls `notFound()`.
  - Otherwise renders `<BookDetailClient book={bookData.frontmatter} content={bookData.content} />`.

## 4. Execution Flow

- On request to `/books/[slug]`:
  1. Next.js invokes `BookDetailPage` with `params`.
  2. `slug` is awaited and used to call `getBookBySlug`.
  3. If result is `null`, `notFound()` triggers a 404 page.
  4. If a book is found, `BookDetailClient` is rendered with the parsed data.

## 5. Data Flow

- **Inputs**:
  - Dynamic `slug` parameter.
  - Book MDX files under `content/books`.
- **Processing**:
  - Book lookup via `getBookBySlug`.
- **Outputs**:
  - Fully rendered book detail page via `BookDetailClient`.
- **Dependencies**:
  - `../../../lib/books`.
  - `./BookDetailClient`.
  - `next/navigation` (`notFound`).

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[Request '/books/:slug'] --> B[BookDetailPage]
    B --> C[getBookBySlug(slug)]
    C -->|null| D[notFound]
    C -->|Book| E[BookDetailClient(book, content)]
```

## 7. Error Handling & Edge Cases

- Explicitly handles missing books by invoking `notFound()`.

## 8. Example Usage

- Automatically used for dynamic `/books/:slug` routes.