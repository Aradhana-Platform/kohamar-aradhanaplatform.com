## 1. Overview

- **Purpose**: Provides shared UI building blocks for article detail pages, including theme constants, icons, metadata display, hero image, and pull quote components.
- **Problem it solves**: Centralizes article-related presentation logic so multiple pages can share consistent styling and behavior.
- **High-level responsibility**: Export themed components (`BackButton`, `CategoryBadge`, `MetaItem`, `HeroImage`, `PullQuote`) and color constants for article views.

## 2. File Location

- Source: `Components/ArticleUI.tsx`

## 3. Key Components

- `C`
  - Object containing color constants (navy, burgundy, gold, gray variants, offWhite) used across article UI.
- `User`, `Calendar`, `Clock`
  - SVG icon components used in metadata displays (author, date, read time).
- `BackButton`
  - Renders a link back to `/articles` with a left arrow icon and text.
- `CategoryBadge`
  - Displays a pill-style label for the article category, styled using theme colors.
- `MetaItem`
  - Generic component for displaying icon + text pairs (e.g., author name, date, duration).
- `HeroImage`
  - Renders the article hero image with a fallback when `src` is missing.
- `PullQuote`
  - Stylized quote block used to emphasize key statements from the article.

## 4. Execution Flow

- Consumers import and compose these components inside article pages.
- `HeroImage`:
  - If `src` is provided, renders an `<img>` within a styled container.
  - If `src` is missing, renders a decorative fallback illustration (Lady Justice-like motif) with gradients and noise.
- `BackButton` uses `next/link` to navigate back to the articles listing.
- `MetaItem` is passed an icon component and children and lays them out horizontally.
- `PullQuote` renders nothing when `children` is falsy; otherwise it wraps text in a left-bordered, italicized block.

## 5. Data Flow

- **Inputs**:
  - Props for each component (e.g., category text, metadata values, hero image `src`/`alt`).
- **Processing**:
  - No business logic; mostly visual composition and fallbacks.
- **Outputs**:
  - Reusable React JSX for article-related UI elements.
- **Dependencies**:
  - `next/link` for `BackButton`.

## 6. Mermaid Diagrams

```mermaid
flowchart TD
    A[Article Detail Page] --> B[BackButton]
    A --> C[CategoryBadge]
    A --> D[MetaItem(User, author)]
    A --> E[MetaItem(Calendar, date)]
    A --> F[MetaItem(Clock, readTime)]
    A --> G[HeroImage]
    A --> H[PullQuote]
```

## 7. Error Handling & Edge Cases

- `HeroImage` gracefully handles missing `src` by rendering a fallback illustration.
- `PullQuote` returns `null` when no `children` are provided, avoiding empty markup.

## 8. Example Usage

```tsx
import { BackButton, CategoryBadge, MetaItem, HeroImage, PullQuote, User, Calendar, Clock } from "../Components/ArticleUI";
```