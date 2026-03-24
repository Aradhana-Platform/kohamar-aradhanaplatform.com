## 1. Overview

- **Purpose**: Fetches and displays a limited list of recent article posts.
- **Problem it solves**: Provides a reusable component to show the latest articles without duplicating sorting and slicing logic.
- **High-level responsibility**: Retrieve posts from the file-based content system, sort by date, select the most recent ones, and render them via `BlogCards`.

## 2. File Location

- Source: `app/home/ArticlePost.tsx`

## 3. Key Components

- `ArticlePost` (default export)
  - Functional React component that:
    - Calls `getAllPosts()` to obtain all posts from the articles content directory.
    - Sorts posts by date in descending order.
    - Slices the array to keep only the first three posts.
    - Passes the resulting posts to `BlogCards` for display.
- `BlogCards`
  - Imported UI component that renders a list of blog post cards given a `posts` prop.
- `getAllPosts`
  - Imported from `lib/posts`; reads and parses MDX files from `content/articles`.

## 4. Execution Flow

- On render:
  1. `ArticlePost` invokes `getAllPosts()`.
  2. The returned array of posts is sorted by `date` (newest first) using `new Date(b.date) - new Date(a.date)`.
  3. The sorted list is truncated to the first three items using `.slice(0, 3)`.
  4. The resulting `posts` array is passed to `<BlogCards posts={posts} />`.
  5. `BlogCards` handles presentation of each post.

## 5. Data Flow

- **Inputs**:
  - Implicitly relies on the article MDX files in `content/articles` via `getAllPosts`.
- **Processing**:
  - Fetch all posts from file system.
  - Sort by `date` field in descending order.
  - Slice to the top three posts.
- **Outputs**:
  - JSX that renders `BlogCards` with the processed `posts` array.
- **Dependencies**:
  - `../../Components/BlogCards` for UI rendering.
  - `../../lib/posts` for data retrieval.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[ArticlePost Component] --> B[getAllPosts]
    B --> C[Array of Posts]
    C --> D[Sort by Date Desc]
    D --> E[Slice Top 3]
    E --> F[BlogCards(posts)]
    F --> G[Rendered Post Cards]
```

## 7. Error Handling & Edge Cases

- No explicit error handling is implemented.
- Potential issues:
  - Invalid or missing `date` fields in MDX frontmatter could affect sort ordering.
  - If `getAllPosts` throws (e.g., missing content directory), the error propagates to the caller/Next.js.
- The component assumes at least zero or more posts; if there are fewer than three, `.slice(0, 3)` will simply return the available posts.

## 8. Example Usage

- Used within the home page to show recent articles:

```tsx
import ArticlePost from "./ArticlePost";

export default function Home() {
  return <ArticlePost />;
}
```
