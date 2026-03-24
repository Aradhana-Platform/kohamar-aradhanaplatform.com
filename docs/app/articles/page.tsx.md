## 1. Overview

- **Purpose**: Serves as the server component backing the `/articles` route, loading all article metadata and delegating rendering to a client component.
- **Problem it solves**: Separates data loading (server-side) from interactive UI (client-side filtering/search in `ArticlesClient`).
- **High-level responsibility**: Fetch all posts via `getAllPosts` and pass them into `ArticlesClient`.

## 2. File Location

- Source: `app/articles/page.tsx`

## 3. Key Components

- `AllArticles` (default export)
  - Server component that:
    - Calls `getAllPosts()` from `lib/posts`.
    - Passes the resulting `posts` array into `<ArticlesClient posts={posts} />`.
- `getAllPosts`
  - Imported helper that reads MDX article files and returns an array of post metadata.
- `ArticlesClient`
  - Client component that handles search, category filters, and rendering of the article list.

## 4. Execution Flow

- On navigation to `/articles`:
  1. Next.js executes `AllArticles` on the server.
  2. `getAllPosts()` is called to read/post-process article metadata.
  3. The `posts` array is passed as props to `ArticlesClient`.
  4. `ArticlesClient` renders the interactive article list in the browser.

## 5. Data Flow

- **Inputs**:
  - Article MDX files under `content/articles`, accessed through `getAllPosts`.
- **Processing**:
  - `AllArticles` performs no additional transformation; it simply forwards `posts`.
- **Outputs**:
  - JSX containing `<ArticlesClient posts={posts} />`.
- **Dependencies**:
  - `../../lib/posts` for content access.
  - `./ArticlesClient` for client-side UI.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[Request to '/articles'] --> B[AllArticles Server Component]
    B --> C[getAllPosts]
    C --> D[posts Array]
    B --> E[ArticlesClient posts={posts}]
    E --> F[Rendered Articles List]
```

## 7. Error Handling & Edge Cases

- No explicit error handling is implemented here.
- If `getAllPosts` fails (e.g., missing directory or bad MDX), the error bubbles up to Next.js.

## 8. Example Usage

- Used automatically as the page component for `/articles`. Not intended for direct import by other modules.
