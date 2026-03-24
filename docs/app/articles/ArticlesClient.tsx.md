## 1. Overview

- **Purpose**: Client-side UI for the `/articles` page, providing search, category filtering, and displaying article cards.
- **Problem it solves**: Allows users to browse, filter, and search articles interactively without full page reloads.
- **High-level responsibility**: Manage UI state (selected category, search query, animation mounting) and render `BlogCards` with filtered posts.

## 2. File Location

- Source: `app/articles/ArticlesClient.tsx`

## 3. Key Components

- `ArticlesClient` (default export)
  - React client component that accepts `posts` as props and:
    - Maintains state: `active` category, `query` string, `mounted` boolean, and `focusSearch` for styling.
    - Filters posts by category and search query.
    - Renders hero header, search bar, category pills, and a `BlogCards` grid of filtered posts.
- `categories`
  - Local array defining available filter categories with `id`, `label`, and icon.
- `Post` interface
  - Type definition describing article shape: `slug`, `title`, `date`, `author`, `category`, `categoryColor`, `image`, `readTime`, and `description`.
- Inline icon components (`SparklesIcon`, `BookIcon`, `ClockIcon`, `ScalesIcon`, `ShieldIcon`, `HeartIcon`, `SearchIcon`)
  - SVG-based icons used in hero and filter UI.
- `BlogCards`
  - Imported component that actually renders the list of posts.

## 4. Execution Flow

- On mount:
  1. `mounted` is initially `false`.
  2. `useEffect` sets `mounted` to `true` after a small timeout to trigger staggered animations.
- Rendering process:
  1. Hero section with title and description is rendered.
  2. Search bar is rendered with controlled `query` state.
  3. Category pills are displayed; clicking updates `active` category.
  4. `filteredPosts` is computed:
     - Match category: `active === "all"` or normalized post category equals active id.
     - Match query: title or description includes the lowercased `query`.
  5. `BlogCards` is rendered with `filteredPosts` as `posts` prop.

## 5. Data Flow

- **Inputs**:
  - `posts: Post[]` prop passed from the server component `AllArticles`.
  - User input: search text and category selection.
- **Processing**:
  - Normalize category strings to compare with `active` ids.
  - Apply filter pipeline to the posts array based on active category and search query.
- **Outputs**:
  - JSX markup for the complete `/articles` UI and a filtered list of posts.
- **Dependencies**:
  - React hooks (`useState`, `useEffect`).
  - `../../Components/BlogCards`.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[ArticlesClient(posts)] --> B[User Selects Category]
    A --> C[User Types Query]
    A --> D[Compute filteredPosts]
    D --> E[BlogCards(posts=filteredPosts)]
    E --> F[Rendered Article Cards]
```

## 7. Error Handling & Edge Cases

- No explicit try/catch; relies on well-formed `posts` data.
- If `posts` is empty, `filteredPosts` will also be empty and `BlogCards` is expected to handle this gracefully.
- Filtering assumes `category`, `title`, and `description` are present; optional chaining is used for `title`/`description`.

## 8. Example Usage

- Used exclusively by `app/articles/page.tsx`:

```tsx
import ArticlesClient from "./ArticlesClient";
import { getAllPosts } from "../../lib/posts";

export default function AllArticles() {
  const posts = getAllPosts();
  return <ArticlesClient posts={posts} />;
}
```
