# Future Recommendations

The following items are deliberately out of scope of the current engagement
because they require product input, content schema changes, or UI sprints
that are not safe to bundle with the additive SEO infrastructure. They are
prioritised below.

---

## P0 — High-impact, low-risk (safe to schedule next)

### Migrate display fonts to `next/font`
- **What:** Replace the CSS `@import` lines for `Libre Baskerville`, `Inter`, and `Playfair Display` (in [app/home/page.tsx](../app/home/page.tsx), [app/magazines/[slug]/page.tsx](../app/magazines/[slug]/page.tsx), [Components/Category.tsx](../Components/Category.tsx)) with `next/font/google` loaders.
- **Why:** Eliminates the last render-blocking pattern and gives self-hosted fonts via Vercel's edge.
- **Risk:** Medium — requires visual QA on the hero typography.
- **Estimated win:** -150–300 ms LCP on cold loads.

### Per-detail OG image polish
- **What:** Allow per-content-type OG image variants (e.g. song variants with album art, book variants with cover thumbnail). Today's shared `renderDetailOg()` is intentionally minimal.
- **Why:** Drives click-through on social shares.
- **Risk:** Low.

### Delete unused public SVGs
- **What:** Remove `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg`.
- **Why:** They are unused remnants of the Next.js starter and are crawled as 200s on the public site.
- **Risk:** Zero (confirmed unreferenced).

---

## P1 — High-impact, requires content schema

### Add `isbn` and `bookFormat` to book frontmatter
- **What:** Extend [content/books/*.mdx](../content/books/) frontmatter with `isbn` (when known) and `bookFormat` (`Paperback` / `EBook`). [lib/seo/jsonld.ts](../lib/seo/jsonld.ts) already wires both into `Book` JSON-LD.
- **Why:** Stronger Book schema rendering in Google Knowledge Panel and Google Books.

### Add `citation_pdf_url` for articles
- **What:** When a PDF is uploaded for a given article, add a `pdfUrl` (or similar) field to the article frontmatter and pass it to `buildScholarMeta`.
- **Why:** Google Scholar prefers articles that expose a direct PDF URL.

### Author `sameAs` URLs
- **What:** Populate `siteConfig.author.sameAs` with the author's ORCID, university profile, Google Scholar profile, and (when applicable) social profiles.
- **Why:** Knowledge-graph linking.

### Twitter / X handle
- **What:** Fill in `siteConfig.twitter.handle` and `siteConfig.twitter.site` when the brand has an X account.
- **Why:** Enables `creator` attribution in Twitter Card previews.

---

## P2 — Architectural, requires product decisions

### Category & tag pages
- **What:** Add `/categories/[name]` and `/tags/[tag]` routes that list articles by category/tag. Today, categories are recorded only on individual articles and the `Category` component is purely decorative.
- **Why:** Increases internal linking depth, helps Google understand topical clusters, and improves crawl economy.
- **Risk:** Requires UI design.

### Author profile pages
- **What:** Add `/authors/[slug]` pages. Today there is only one author, but the schema can support more later.
- **Why:** Enables `Person`-level rich results and consolidates author authority signals.

### Pagination SEO
- **What:** Add `rel="prev"` / `rel="next"` and explicit page-numbered URLs once any listing exceeds ~25 items.
- **Why:** Prevents thin-page penalties on category/tag pages.
- **Trigger:** Not needed yet — current listings have ≤12 items.

### Multilingual / hreflang
- **What:** If Nepali/English content variants ship, declare `alternates.languages` per route. The hreflang scaffolding in [lib/seo/metadata.ts](../lib/seo/metadata.ts) is ready.
- **Why:** Magazines and quick-reads already contain Nepali content — there is a real i18n decision pending.

### XML sitemap splitting
- **What:** When total URLs cross ~10k, split into `articles-sitemap.xml`, `books-sitemap.xml`, etc., via Next.js `generateSitemaps()`.
- **Why:** Sitemap hard limit is 50k URLs / 50 MB per file.
- **Trigger:** Not needed at current scale (~24 URLs).

---

## P3 — Performance polish

### Replace `react-youtube` with native lazy iframe
- **What:** Songs and any future media pages currently use `react-youtube`. A native `<iframe>` with `loading="lazy"` would drop the dependency and shave ~12 kB.
- **Why:** Smaller song-detail JS payload, faster INP.

### Image budget enforcement
- **What:** Add an ESLint rule (`next/no-img-element`) so future PRs cannot ship raw `<img>` again.
- **Why:** Codifies the logo fix as a permanent guard.

### Dynamic imports for `framer-motion`
- **What:** `framer-motion` is imported synchronously by [app/books/[slug]/BookDetailClient.tsx](../app/books/[slug]/BookDetailClient.tsx) and [app/songs/[slug]/SingleSongClient.tsx](../app/songs/[slug]/SingleSongClient.tsx). Dynamic-import the `motion` components for paths that do not need them above the fold.
- **Why:** Reduces client-bundle size on the listing pages.

---

## P4 — Operational & monitoring

### Search Console + Bing Webmaster verification
- **What:** Add the verification record (DNS TXT preferred) and submit `/sitemap.xml`.
- **Why:** Operational requirement to receive Google's index reports.

### Google Scholar inclusion request
- **What:** Submit the [Google Scholar inclusion request](https://scholar.google.com/intl/en/scholar/inclusion.html) once a stable corpus of articles is live.
- **Why:** Drives scholarly citation traffic.

### Vercel Analytics + Speed Insights
- **What:** Enable Vercel's built-in Speed Insights in the dashboard.
- **Why:** Real-user Core Web Vitals; needed to verify the directional claims in [performance_optimization.md](./performance_optimization.md).

### `optimization_report/` versioning
- **What:** When the next SEO sprint runs, add a dated subfolder (`optimization_report/2026-Q3/`) rather than overwriting these files. Update [changes_summary.json](./changes_summary.json) accordingly.
- **Why:** Preserves the audit trail.

---

## Limitations & warnings (current state)

- **Single author assumption.** All article/magazine schema currently encodes one author per piece. Multi-author content would need `authors: string[]` in frontmatter and a small adjustment to `buildMetadata`.
- **No formal references/citations.** The audit found inline footnotes in MDX but no structured citation list. Google Scholar will index articles without citation arrays, but adding `citation` arrays in `ScholarlyArticle` JSON-LD would strengthen Scholar visibility.
- **Quick-read dates are non-ISO** (e.g. `"Apr 13"`). The sitemap loader handles this with `safeDate()`, but `<meta property="article:published_time">` will be omitted for those entries until frontmatter is normalised.
- **About page `mounted` variable is unused.** Pre-existing dead code preserved for safety. Future cleanup recommended.
- **Display fonts in hero `<style>`** remain render-blocking — see P0 above.

---

## Suggested next phases

1. **Sprint A (1 day):** Migrate display fonts to `next/font`; remove unused public SVGs; enable Vercel Speed Insights.
2. **Sprint B (2 days):** Add `isbn`, `bookFormat`, `pdfUrl` fields to frontmatter where applicable; populate `siteConfig.author.sameAs`.
3. **Sprint C (1 week):** Build `/categories/[name]` and `/authors/[slug]` routes with full SEO surface (Breadcrumb LD, CollectionPage LD, sitemap inclusion).
4. **Sprint D (ongoing):** Quarterly SEO health check using [checklists.md](./checklists.md).
