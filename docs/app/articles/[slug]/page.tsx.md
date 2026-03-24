## 1. Overview

- **Purpose**: Renders an individual article detail page based on the `slug` route parameter.
- **Problem it solves**: Fetches article content and metadata from MDX files and presents a full reading experience with sharing and styling.
- **High-level responsibility**: Retrieve a single post via `getPostBySlug`, derive metadata, and render the article using shared article UI components and MDX rendering.

## 2. File Location

- Source: `app/articles/[slug]/page.tsx`

## 3. Key Components

- `ArticleDetailPage` (default export)
  - Async server component that:
    - Receives `params` (containing `slug`) from Next.js.
    - Calls `getPostBySlug(slug)` to load the post.
    - Applies sensible defaults for missing frontmatter (category, title, author, date, readTime).
    - Constructs sharing URLs and titles.
    - Renders header metadata, hero image, share sidebar, and MDX content.
- `getPostBySlug`
  - Imported from `lib/posts`; reads and parses a single MDX article.
- UI components imported from `Components/ArticleUI`:
  - `BackButton`, `CategoryBadge`, `MetaItem`, `HeroImage`, `PullQuote`, `User`, `Calendar`, `Clock`, `C`.
- `ShareSidebar`
  - Component for rendering social/share controls.
- `MDXRemote` from `next-mdx-remote/rsc`
  - Renders MDX `content` into React components.
- `TextDesign` from `Components/mdx-components/TextDesign`
  - Custom MDX components mapping to style parts of the article.

## 4. Execution Flow

- On request to `/articles/[slug]`:
  1. Next.js passes `params` containing `{ slug }` to `ArticleDetailPage`.
  2. `slug` is awaited from `params` and used to call `getPostBySlug(slug)`.
  3. Frontmatter defaults are applied for missing properties.
  4. Share URL and title are built from the base articles URL and slug.
  5. The component renders:
     - Header section with back button, category badge, title, and meta items.
     - Hero image via `HeroImage`.
     - Main grid with `ShareSidebar` and MDX content.
     - Optional `PullQuote` rendered from `post.frontmatter.description` if available.
     - `MDXRemote` renders `post.content` with custom components (`TextDesign`).

## 5. Data Flow

- **Inputs**:
  - `params` with article `slug` from the dynamic route.
  - MDX file corresponding to the slug in `content/articles` (via `getPostBySlug`).
- **Processing**:
  - File read and frontmatter parsing via `getPostBySlug`.
  - Derivation of user-facing metadata and defaults.
  - Creation of share URLs and props for UI components.
- **Outputs**:
  - Fully rendered article detail page.
- **Dependencies**:
  - `../../../lib/posts`.
  - `next-mdx-remote/rsc`.
  - `../../../Components/ArticleUI`, `../../../Components/ShareSidebar`, `../../../Components/mdx-components/TextDesign`.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[Request '/articles/:slug'] --> B[ArticleDetailPage]
    B --> C[getPostBySlug(slug)]
    C --> D[{frontmatter, content}]
    B --> E[Derive Metadata & Defaults]
    B --> F[Render Header & HeroImage]
    B --> G[Render ShareSidebar]
    B --> H[Render MDX via MDXRemote]
```

## 7. Error Handling & Edge Cases

- No explicit error handling for missing or invalid posts; if `getPostBySlug` throws, the error propagates to Next.js.
- If frontmatter fields are missing, sensible string defaults are used for display.
- `image` may be undefined; behavior depends on how `HeroImage` handles a missing `src`.

## 8. Example Usage

- Automatically used by Next.js for `/articles/:slug` routes. Example of a matching MDX file slug:

```ts
// URL: /articles/first-post
// MDX file: content/articles/first-post.mdx
```
