## 1. Overview

- **Purpose**: Implements the `/books` page, loading all books and delegating rendering to `BooksClient`.
- **Problem it solves**: Separates data fetching (server-side) from interactive UI (client-side catalog) for books.
- **High-level responsibility**: Fetch `Book` items via `getAllBooks` and render the books client component.

## 2. File Location

- Source: `app/books/page.tsx`

## 3. Key Components

- `BooksPage` (default export)
  - Async server component.
  - Calls `getAllBooks()` from `lib/books`.
  - Renders `<BooksClient books={books} />`.
- `getAllBooks`
  - Library function that reads MDX book files and returns a list of books.
- `BooksClient`
  - Client-side component that presents the book collection UI.

## 4. Execution Flow

- On navigation to `/books`:
  1. Next.js executes `BooksPage` on the server.
  2. `getAllBooks()` is called to retrieve `Book[]` from the filesystem.
  3. The `books` array is passed to `BooksClient`.

## 5. Data Flow

- **Inputs**:
  - MDX book files in `content/books` (via `getAllBooks`).
- **Processing**:
  - `BooksPage` performs no additional transformation beyond forwarding data.
- **Outputs**:
  - JSX that renders `BooksClient` with all books.
- **Dependencies**:
  - `../../lib/books`.
  - `./BooksClient`.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[Request '/books'] --> B[BooksPage]
    B --> C[getAllBooks]
    C --> D[books: Book[]]
    B --> E[BooksClient books={books}]
    E --> F[Rendered Books Catalog]
```

## 7. Error Handling & Edge Cases

- No explicit error handling; if `getAllBooks` throws, the error is surfaced by Next.js.
- If there are no books, `BooksClient` receives an empty array and should render accordingly.

## 8. Example Usage

- Used automatically as the `/books` route page.