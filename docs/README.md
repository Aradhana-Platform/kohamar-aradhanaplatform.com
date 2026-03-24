# Documentation Overview

## Purpose

This `docs/` directory provides structured documentation for every major source file in the project, plus high-level architecture and data-flow guides. Each file-level document follows a common template with sections for overview, key components, execution flow, data flow, Mermaid diagrams, error handling, and example usage.

## Structure

- `ARCHITECTURE.md` – High-level system architecture and module responsibilities.
- `DATA_FLOW.md` – End-to-end data flows from MDX content to rendered pages.
- `app/` – Documentation for Next.js route segments and pages.
- `Components/` – Documentation for reusable UI components.
- `lib/` – Documentation for data loader and helper modules.
- Root config docs:
  - `eslint.config.mjs.md`
  - `next.config.ts.md`
  - `tailwind.config.ts.md`
  - `postcss.config.mjs.md`
  - `tsconfig.json.md`
  - `package.json.md`

## How to Navigate

- To understand a route:
  - Find the corresponding file under `app/` (e.g., `app/articles/page.tsx`).
  - Open the mirrored doc under `docs/app/...` (e.g., `docs/app/articles/page.tsx.md`).
- To understand a component:
  - Locate the component in `Components/`.
  - Open its matching doc in `docs/Components/...`.
- To understand data loading:
  - Look at `lib/` modules and their docs in `docs/lib/`.
- To understand global behavior and tooling:
  - Read the config docs and `ARCHITECTURE.md` / `DATA_FLOW.md`.

## Cross-Linked Flows

- Articles:
  - Route docs: `docs/app/articles/page.tsx.md`, `docs/app/articles/[slug]/page.tsx.md`.
  - Loader docs: `docs/lib/posts.ts.md`.
  - UI docs: `docs/Components/BlogCards.tsx.md`, `docs/Components/ArticleUI.tsx.md`.
- Magazines:
  - Route docs: `docs/app/magazines/page.tsx.md`, `docs/app/magazines/[slug]/page.tsx.md`.
  - Loader docs: `docs/lib/magazine.ts.md`.
  - UI docs: `docs/Components/MagazineCard.tsx.md`.
- Books:
  - Route docs: `docs/app/books/page.tsx.md`, `docs/app/books/[slug]/page.tsx.md`.
  - Loader docs: `docs/lib/books.ts.md`.
  - UI docs: `docs/app/books/BooksClient.tsx.md`, `docs/app/books/[slug]/BookDetailClient.tsx.md`.
- Songs:
  - Route docs: `docs/app/songs/page.tsx.md`, `docs/app/songs/[slug]/page.tsx.md`.
  - Loader docs: `docs/lib/songs.ts.md`.
  - UI docs: `docs/app/songs/SongsClient.tsx.md`, `docs/app/songs/[slug]/SingleSongClient.tsx.md`.
- Home & Categories:
  - Route docs: `docs/app/home/page.tsx.md`.
  - Data docs: `docs/lib/category.ts.md`.
  - UI docs: `docs/app/home/ArticlePost.tsx.md`, `docs/Components/Category.tsx.md`.

## Conventions

- Each documentation file uses numbered sections:
  1. Overview
  2. File Location
  3. Key Components
  4. Execution Flow
  5. Data Flow
  6. Mermaid Diagrams
  7. Error Handling & Edge Cases
  8. Example Usage
- Mermaid diagrams focus on:
  - High-level request → loader → component flows.
  - Data movement from `content/` to UI.

## Extending the Documentation

- When adding a new source file:
  1. Mirror its path under `docs/` (e.g., `src/foo/bar.ts` → `docs/src/foo/bar.ts.md`).
  2. Use the same 8-section template as existing docs.
  3. Add at least one Mermaid diagram explaining control or data flow.

This setup ensures the documentation stays aligned with the codebase and remains easy to navigate for future contributors.