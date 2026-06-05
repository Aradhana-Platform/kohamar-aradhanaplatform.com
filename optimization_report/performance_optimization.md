# Performance Optimization

This document records every performance-related change shipped during the SEO
engagement, plus the deliberate trade-offs that were made to honour the
"do not damage UI/UX" constraint.

---

## 1. Changes shipped

### 1.1 `next/image` for the logo
- **Files:** [Components/Navbar.tsx](../Components/Navbar.tsx), [Components/Footer.tsx](../Components/Footer.tsx).
- **Why:** Raw `<img>` bypasses Next.js image optimisation (no resizing, no AVIF/WebP, no `srcset`, no lazy loading). The logo participates in LCP on every page.
- **How:** Used explicit `width`/`height` to match the existing CSS box; added `priority` in the Navbar so the logo is preloaded.
- **Visual impact:** Zero — sizes match exactly.
- **Expected effect:** Smaller payload for the logo (Next now serves AVIF/WebP variants), better LCP score.

### 1.2 Font display swap
- **File:** [app/layout.tsx](../app/layout.tsx).
- **Why:** Default `Geist` and `Geist_Mono` initialisations did not declare `display: "swap"`. Adding it avoids invisible-text flash and helps CLS by letting the browser substitute a fallback while the font loads.
- **Visual impact:** Negligible — fonts swap when loaded.

### 1.3 Production `console.log` removal
- **Files:** [lib/posts.ts](../lib/posts.ts), [lib/quickread.ts](../lib/quickread.ts).
- **Why:** `console.log` in build-time data loaders generates noise in build logs and consumes some I/O time during static generation. Removing them keeps build artifacts clean.
- **Visual impact:** None.

### 1.4 `Cache-Control` on RSS
- **File:** [app/rss.xml/route.ts](../app/rss.xml/route.ts).
- **Why:** Without explicit cache headers, Cloudflare's default cache rules can be unpredictable. Setting `public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400` keeps the feed cacheable at the edge but allows it to refresh hourly without blocking responses.

### 1.5 `generateStaticParams` everywhere
- **Files:** [app/articles/[slug]/page.tsx](../app/articles/[slug]/page.tsx), [app/books/[slug]/page.tsx](../app/books/[slug]/page.tsx), [app/magazines/[slug]/page.tsx](../app/magazines/[slug]/page.tsx), [app/quick-read/[slug]/page.tsx](../app/quick-read/[slug]/page.tsx).
- **Why:** Without these, the dynamic segments would lazily generate on first hit in production. Eager prerendering means every URL is **already** served as static HTML by Vercel's edge — best possible TTFB and LCP.
- **Visual impact:** None.

## 2. Core Web Vitals — directional expectations

> Actual numbers should be measured in production via PageSpeed Insights or
> the Vercel Analytics tab. The below is the *expected direction* of change.

| Metric | Before posture | After posture | Reason |
| --- | --- | --- | --- |
| LCP | Variable on routes that render hero images via raw `<img>` and use display fonts via CSS `@import` | Improved on Navbar/Footer-dominated pages | Logo now optimised; font display strategy improves perceived performance. |
| CLS | Risk from font swap without `display: swap` | Reduced | `display: "swap"` declared. Logo `next/image` declares explicit dimensions, so no layout shift on load. |
| INP | Already reasonable (React Compiler enabled) | Unchanged | No additional JS introduced; JSON-LD scripts are inert. |
| TTFB | Lazy SSG on first hit could cause higher TTFB | Improved | All routes prerendered at build via `generateStaticParams`. |

## 3. Deliberately NOT changed

### 3.1 Google Fonts `@import` in hero `<style>` blocks
- **Files:** [app/home/page.tsx](../app/home/page.tsx) (`Libre Baskerville`), [app/magazines/[slug]/page.tsx](../app/magazines/[slug]/page.tsx) (`Inter`), [Components/Category.tsx](../Components/Category.tsx) (`Playfair Display`).
- **Reason for inaction:** Moving these to `next/font` would require restructuring the hero typography setup and would risk a visual regression on a design-sensitive route. The audit rule "DO NOT damage existing UI/UX" outweighs the marginal LCP improvement.
- **Recommendation:** Migrate to `next/font/google` in a future, dedicated UI sprint. See [future_recommendations.md](./future_recommendations.md).

### 3.2 Public demo SVGs
- **Files:** [public/next.svg](../public/next.svg), [public/vercel.svg](../public/vercel.svg), [public/file.svg](../public/file.svg), [public/globe.svg](../public/globe.svg), [public/window.svg](../public/window.svg).
- **Reason for inaction:** Out of additive scope. They are not referenced from the codebase but are not actively harmful.
- **Recommendation:** Safe to delete in a separate housekeeping PR.

### 3.3 React Compiler
- **State:** Enabled (`reactCompiler: true`). No change made — already optimal.

## 4. Image optimisation audit notes

- `next.config.ts` declares `remotePatterns` for:
  - `images.unsplash.com`
  - `img.freepik.com`
  - `theologica-733b461f.base44.app`
  - `www.youtube.com`, `i.ytimg.com`, `img.youtube.com`
  - `scontent.fktm21-1.fna.fbcdn.net`
- All article and book hero images already flow through `<Image>` in [Components/ArticleUI.tsx](../Components/ArticleUI.tsx) and other detail components. Where they did not (Navbar/Footer logo), they now do.

## 5. Script loading

- The only injected scripts are typed JSON-LD blocks emitted as
  `<script type="application/ld+json">`. The browser does not parse these as
  JavaScript; they have no parser-blocking cost and no network cost (inline).

## 6. Bundle considerations

- No new client dependencies added.
- All SEO code (`lib/seo/*`) runs **server-side only**, except `Components/seo/JsonLd.tsx`
  which is a pure server component (no `"use client"`).
- Bundle size unchanged.

## 7. Caching strategy

| Endpoint | Cache header | Notes |
| --- | --- | --- |
| `/robots.txt` | Default (Vercel: `public, max-age=0, must-revalidate`) | OK — small file, edge cached |
| `/sitemap.xml` | Default | OK |
| `/rss.xml` | `public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400` | Custom, content refreshes hourly |
| `/manifest.webmanifest` | Default | OK |
| OG image routes | Default (Next.js handles caching of `ImageResponse`) | Edge OG cached aggressively by Vercel |

## 8. Cloudflare-specific notes

- All endpoints emit standard headers; Cloudflare's default page-rules pass them through.
- RSS handler sets explicit edge cache directives so a Cloudflare-cached response will not become stale beyond 24 hours.
- No need to bypass Cloudflare for any SEO endpoint — they are all safe to be CDN-cached.

## 9. Future performance work

Tracked in [future_recommendations.md](./future_recommendations.md).
