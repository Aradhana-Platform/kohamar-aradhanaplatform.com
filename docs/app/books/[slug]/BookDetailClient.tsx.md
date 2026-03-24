## 1. Overview

- **Purpose**: Client-side component for rendering a detailed view of a single book, including cover, metadata, and markdown content.
- **Problem it solves**: Provides a rich layout for book details separate from server-side data fetching.
- **High-level responsibility**: Render hero section with cover and price, author/publish info, description, and markdown body.

## 2. File Location

- Source: `app/books/[slug]/BookDetailClient.tsx`

## 3. Key Components

- `BookDetailClient` (default export)
  - Props: `{ book: Book; content: string }`.
  - Uses `framer-motion` for entry animations.
  - Layout:
    - Back link to `/books`.
    - Two-column grid (cover + info on larger screens).
    - Markdown-rendered description/body via `ReactMarkdown`.
- Icons from `lucide-react`:
  - `ArrowLeft`, `User`, `Calendar`, `Tag` for visual cues.

## 4. Execution Flow

- On render:
  1. Shows animated back navigation.
  2. Animates book cover card with image and price badge.
  3. Displays category badge, title, author, and publish date.
  4. Shows a highlighted description.
  5. Renders full markdown `content` within a styled prose container.

## 5. Data Flow

- **Inputs**:
  - `book` metadata from `lib/books`.
  - `content` string from parsed MDX frontmatter/body.
- **Processing**:
  - `ReactMarkdown` converts markdown to React elements.
- **Outputs**:
  - Complete book detail page UI.
- **Dependencies**:
  - `framer-motion`.
  - `next/link`.
  - `react-markdown`.
  - `Book` type from `../../../lib/books`.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[BookDetailClient(book, content)] --> B[Render Hero (Cover + Price)]
    A --> C[Render Metadata (Author/Date)]
    A --> D[Render Description]
    A --> E[Render Markdown Body]
```

## 7. Error Handling & Edge Cases

- Assumes `book` and `content` are valid; called only when server has found a book.
- If `book.image` is missing or invalid, the cover image may not render correctly.

## 8. Example Usage

- Used from `app/books/[slug]/page.tsx`:

```tsx
<BookDetailClient book={bookData.frontmatter} content={bookData.content} />
```