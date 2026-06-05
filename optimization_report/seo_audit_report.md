# SEO Audit Report — Phase 1

**Audit window:** 2026-06-04
**Auditor:** Senior SEO Engineer + Next.js Architect
**Site:** https://kohamar.aradhanaplatform.com
**Type:** Academic + research + blogging platform

---

## 1. Rendering architecture

| Aspect | Finding |
| --- | --- |
| Framework | Next.js 16.1.6 (App Router only — no Pages Router) |
| React | 19.2.3, React Compiler enabled (`reactCompiler: true` in `next.config.ts`) |
| Default rendering | Static (SSG) — all content sourced from local MDX via filesystem reads (`fs.readdirSync`, `gray-matter`) |
| Dynamic routes | `articles/[slug]`, `books/[slug]`, `magazines/[slug]`, `quick-read/[slug]`, `songs/[slug]` |
| `generateStaticParams` | Present only on `songs/[slug]` before this engagement |
| `"use client"` islands | Navbar, Footer, Reveal, About page, listings clients, Song client, Book detail client |
| Route groups / layouts | Single root layout; no segment-level layouts |
| ISR | Not used; site is fully static |
| CSR-only routes | None — `"use client"` components remain SSR-rendered as initial HTML |
| Hydration | No mismatch observed |

## 2. SEO architecture (before changes)

| Aspect | State |
| --- | --- |
| `metadataBase` | **Not set** — every relative URL in OG/Twitter would resolve incorrectly. |
| Default title/description | Global `"KOHAMAR"` / `"Powered by Aradhana Platform"` on every page. |
| Per-route `generateMetadata` | Absent on all dynamic routes. |
| Canonical URLs | None. |
| OpenGraph / Twitter cards | None. |
| Structured data | None (no JSON-LD). |
| Sitemap | **None** (no `app/sitemap.ts`). |
| robots.txt | **None** (no `app/robots.ts`). |
| Favicon meta | Default `/favicon.ico` only; no Apple touch icon, no manifest. |
| RSS feed | None. |
| Crawlability | HTML was crawlable, but discovery was poor due to missing sitemap/robots/links. |

## 3. Technical SEO

| Aspect | Finding |
| --- | --- |
| Duplicate content | **Critical**: `/` rendered identical HTML to `/home` because `app/page.tsx` imported `./home/page`. Both URLs were live and indexable. |
| Hard-coded URL | `app/articles/[slug]/page.tsx` had a literal `https://kohamar.aradhanaplatform.com/articles` string for share URLs. |
| Crawl traps | None observed. |
| Redirects | None configured (no Vercel `redirects` or middleware). |
| Canonical conflicts | None — because no canonicals existed at all. |
| XML validity | N/A (no XML routes). |
| Schema issues | None (no schema). |

## 4. Performance SEO

| Aspect | Finding |
| --- | --- |
| Logo image | Rendered with raw `<img>` in Navbar and Footer, bypassing `next/image` (impacts LCP). |
| Google Fonts | Loaded via CSS `@import url(...)` inside JSX `<style>` blocks in Home, Magazine detail hero, and Category — render-blocking. |
| Console logging | Production `console.log` statements in `lib/posts.ts` and `lib/quickread.ts`. |
| Image hosts | `next.config.ts` declares appropriate `remotePatterns` (unsplash, freepik, youtube CDNs). |
| Bundle | React Compiler enabled — good baseline. |
| Lazy loading | Default `next/image` lazy loading available, but logos used raw `<img>`. |
| Caching | No custom headers for RSS/sitemap. |
| Compression | Vercel handles automatically. |

## 5. Academic SEO

| Aspect | Finding |
| --- | --- |
| Google Scholar `citation_*` meta tags | None. |
| ScholarlyArticle schema | None. |
| Author structure | Authors present in frontmatter but not exposed as schema. |
| Publication metadata | Dates in frontmatter (`date`); not exposed as `article:published_time` or `citation_publication_date`. |
| References support | Footnotes exist inline in MDX (per [docs/Components/mdx-components/Callout.tsx.md](../docs/Components/mdx-components/Callout.tsx.md)) but no machine-readable citation list. |

## 6. Cloudflare + Vercel interactions

| Aspect | Finding |
| --- | --- |
| Cache behavior | No conflicting config; Cloudflare default proxy works for App Router responses. |
| Rewrites | None configured at either layer. |
| robots/sitemap accessibility | Was impossible (routes did not exist). |
| Headers | Default Vercel headers only. No `Content-Security-Policy` or other restrictive headers blocking crawlers. |
| Compression | Brotli/gzip handled by Vercel and Cloudflare automatically. |

---

## 7. Problems detected — severity matrix

| # | Severity | Issue | Path |
| --- | --- | --- | --- |
| 1 | **Critical** | Missing `metadataBase` | [app/layout.tsx](../app/layout.tsx) |
| 2 | **Critical** | No `sitemap.xml` | (none existed) |
| 3 | **Critical** | No `robots.txt` | (none existed) |
| 4 | **Critical** | Duplicate content on `/` and `/home` | [app/page.tsx](../app/page.tsx), [app/home/page.tsx](../app/home/page.tsx) |
| 5 | **Critical** | Zero canonical URLs site-wide | all routes |
| 6 | **High** | Generic title/description on every page | [app/layout.tsx](../app/layout.tsx) |
| 7 | **High** | No OG / Twitter cards | all routes |
| 8 | **High** | No JSON-LD anywhere | all routes |
| 9 | **Medium** | No Google Scholar `citation_*` tags | articles, magazines |
| 10 | **Medium** | No RSS feed | (none existed) |
| 11 | **Medium** | Missing `generateStaticParams` | articles, books, magazines, quick-read |
| 12 | **Medium** | Logo via raw `<img>` | [Components/Navbar.tsx](../Components/Navbar.tsx), [Components/Footer.tsx](../Components/Footer.tsx) |
| 13 | **Medium** | Google Fonts via CSS `@import` (render-blocking) | hero sections, Category, Magazine detail |
| 14 | **Medium** | No 404 page with proper SEO behaviour | (none existed) |
| 15 | **Low** | Production `console.log` | [lib/posts.ts](../lib/posts.ts), [lib/quickread.ts](../lib/quickread.ts) |
| 16 | **Low** | Stale Next.js demo SVGs in `/public` | `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg` |
| 17 | **Low** | Hard-coded share URL | [app/articles/[slug]/page.tsx](../app/articles/[slug]/page.tsx) |
| 18 | **Low** | `tsconfig.json` paths alias points to `./src/*` that does not exist | [tsconfig.json](../tsconfig.json) |
| 19 | **Low** | About page is full client component — cannot export `metadata` | [app/about/page.tsx](../app/about/page.tsx) |

## 8. Implementation roadmap (executed)

| Phase | Goal | Outcome |
| --- | --- | --- |
| 2 | Foundational SEO (`robots.ts`, `sitemap.ts`, root metadata, per-route metadata, fix duplicates) | ✅ Done |
| 3 | JSON-LD, Google Scholar tags, RSS, dynamic OG images, slug normalization | ✅ Done |
| 4 | Logo `next/image`, removed `console.log`, font display strategy in root | ✅ Done (Google Fonts in hero `@import` left untouched per UX-preservation rule) |
| 5 | Build verification + checklists | ✅ Done — see [checklists.md](./checklists.md) |
| 6 | Reporting system | ✅ This folder |
