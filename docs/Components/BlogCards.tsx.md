## 1. Overview

- **Purpose**: Render a responsive grid of blog/article cards.
- **Problem it solves**: Provides a reusable layout for displaying lists of articles with consistent styling.
- **High-level responsibility**: Accept an array of posts and render linked cards pointing to individual article pages.

## 2. File Location

- Source: `Components/BlogCards.tsx`

## 3. Key Components

- `BlogCards` (default export)
  - Props: `{ posts: Post[] }` where `Post` includes `slug`, `title`, `date`, `author`, `category`, `categoryColor`, `image`, `readTime`, `description`.
  - Maps over `posts` to create individual cards.
- `Post` and `PostListProps` interfaces
  - Local TypeScript definitions specifying the expected shape of each post.

## 4. Execution Flow

- On render:
  1. Wraps content in a `section` and centered container.
  2. Renders a CSS grid that adapts to 1/2/3 columns depending on screen size.
  3. For each `article` in `posts`:
     - Wraps the card in a `Link` to `/articles/${slug}`.
     - Renders an image with category badge overlay.
     - Displays date and read time.
     - Shows title, description, and author.

## 5. Data Flow

- **Inputs**:
  - `posts` array from callers like `ArticlePost` or `ArticlesClient`.
- **Processing**:
  - No transformation beyond mapping; assumes `posts` is correctly shaped.
- **Outputs**:
  - A grid of clickable cards linking to article detail pages.
- **Dependencies**:
  - `next/image` and `next/link`.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[BlogCards(posts)] --> B[Map posts]
    B --> C[Create Card for Each]
    C --> D[Link to /articles/:slug]
    D --> E[Article Detail Page]
```

## 7. Error Handling & Edge Cases

- If `article.image` is missing, a default image `/images/default-post.jpg` is used.
- If `posts` is empty, the grid will render with no cards; no fallback message is defined here.

## 8. Example Usage

```tsx
import BlogCards from "../Components/BlogCards";
import { getAllPosts } from "../lib/posts";

const posts = getAllPosts();
<BlogCards posts={posts} />;
```