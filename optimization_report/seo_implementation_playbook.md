# SEO Implementation Playbook — Next.js + Vercel + Cloudflare

A reusable recipe for setting up production-grade SEO on a **new** Next.js
App Router project. Pair this with [post_deploy_seo_playbook.md](./post_deploy_seo_playbook.md)
for the operational steps that follow deployment.

This file is the **what to build**. The post-deploy playbook is the
**what to do after building**.

> **Audience:** an engineer (human or AI) starting fresh on a Next.js site.
> **Outcome:** every page has proper metadata, canonical, OG/Twitter, JSON-LD;
> sitemap, robots, RSS, OG images, and a 404 all served correctly;
> performance is baseline-clean.

**Time budget:** ~4–8 hours for a small content site (10–50 pages).

---

## When to use this guide

✅ Greenfield Next.js project on App Router.
✅ Vercel hosting (other hosts work but specifics differ).
✅ Content-driven site (blog, magazine, docs, marketing, academic).
❌ Pages Router projects — patterns differ; migrate to App Router first.
❌ Pure SPA shells with all content client-rendered — fix the SSR story first; SEO won't help an empty HTML response.

---

## Phase 0 — Pre-flight audit (1 hour)

Before writing any SEO code, answer these:

- [ ] **Router:** App Router or Pages Router? (Confirm `app/` directory exists.)
- [ ] **Rendering:** SSG, ISR, SSR? (Run `npm run build` — check the route table.)
- [ ] **Content source:** MDX files? CMS? API? (Determines how `generateStaticParams` and `sitemap.ts` get data.)
- [ ] **Domain:** Final production domain known? (Needed for `metadataBase`.)
- [ ] **CDN:** Cloudflare proxy on or off? (Determines cache strategy.)
- [ ] **Existing routes:** Any duplicate-content risks? (e.g. `/` and `/home` rendering identical pages.)
- [ ] **`"use client"` pages:** Any top-level pages that should export `metadata`? (They'll need splitting into server + client.)
- [ ] **Hard-coded URLs:** Search the codebase for the production domain — those need to flow through `siteConfig`.

Write findings into a `seo_audit_report.md` like the one in this folder.

---

## Phase 1 — Foundation library (45 min)

Create a `lib/seo/` directory. This becomes the single source of truth.

### File: `lib/seo/config.ts`

Centralise everything domain-, brand-, and SEO-default-related. **No other
file should hard-code your domain.**

Shape:

```ts
export const siteConfig = {
  url: "https://example.com",
  name: "Brand",
  fullName: "Brand — Tagline",
  shortName: "BRAND",
  tagline: "...",
  description: "...",                  // ≤ 300 chars
  defaultLocale: "en",
  locale: "en_US",
  organization: { name, legalName, url, logo, sameAs: [] },
  author: { name, alternateNames, jobTitle, sameAs: [] },
  twitter: { handle: "", site: "" },
  defaultOgImage: "/logo.jpg",
  keywords: [...],
} as const;

export function absoluteUrl(pathname: string): string { ... }
```

Reference implementation: [lib/seo/config.ts](../lib/seo/config.ts).

### File: `lib/seo/metadata.ts`

A `buildMetadata()` helper that takes inputs and returns a fully-formed
Next.js `Metadata` object. Also `buildScholarMeta()` if you publish academic
content.

Input shape:

```ts
interface BuildMetadataInput {
  title: string;
  description?: string;
  path: string;                        // e.g. "/articles/foo"
  image?: string | null;
  type?: "website" | "article" | "book" | "profile" | "music.song";
  noIndex?: boolean;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  other?: Record<string, string | string[]>;
  canonical?: string;
}
```

Centralises: canonical URL resolution, OG image absolutisation, robots policy,
Twitter cards, Open Graph type mapping, description truncation.

Reference: [lib/seo/metadata.ts](../lib/seo/metadata.ts).

### File: `lib/seo/jsonld.ts`

Typed JSON-LD builders + a `pruneLd()` helper that strips undefined/null/empty
values before serialisation.

Typical exports (add only what your content needs):

- `organizationLd()`
- `websiteLd()` (with `SearchAction` for sitelinks searchbox)
- `personLd(name, opts)`
- `articleLd(input)` — supports `Article`, `ScholarlyArticle`, `BlogPosting`
- `bookLd(input)`
- `breadcrumbLd(items)`
- `musicRecordingLd(input)`
- `collectionPageLd(input)`
- `pruneLd(obj)` — recursive cleanup

Reference: [lib/seo/jsonld.ts](../lib/seo/jsonld.ts).

### Component: `Components/seo/JsonLd.tsx`

Server component that renders `<script type="application/ld+json">` with the
payload pruned by `pruneLd`. Always pass an `id` for stable hydration:

```tsx
<JsonLd id="ld-article" data={articleLd({...})} />
```

Reference: [Components/seo/JsonLd.tsx](../Components/seo/JsonLd.tsx).

### Optional helpers

- `lib/seo/rss.ts` — RSS 2.0 XML builder. Only if you want a feed.
- `lib/seo/og.tsx` — shared `renderDetailOg()` for `ImageResponse`.
- `lib/seo/slug.ts` — slug normaliser for new content.

---

## Phase 2 — App Router SEO surfaces (60 min)

These are file-name conventions that Next.js App Router understands natively.
**Drop them in `app/` and the framework wires them up automatically.**

### `app/robots.ts`

```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"] },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
```

Reference: [app/robots.ts](../app/robots.ts).

### `app/sitemap.ts`

Returns `MetadataRoute.Sitemap`. Build from your content sources. Wrap each
loader in a `safeList()` so one bad file can't break the sitemap.

```ts
const entries: MetadataRoute.Sitemap = [
  { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1.0 },
  ...articles.map(p => ({ url: absoluteUrl(`/articles/${p.slug}`), ... })),
  ...books.map(b => ({ url: absoluteUrl(`/books/${b.slug}`), ... })),
];
```

Reference: [app/sitemap.ts](../app/sitemap.ts).

### `app/manifest.ts`

Generates `/manifest.webmanifest`. Required if you want PWA / Apple touch icon
behaviour to work properly.

Reference: [app/manifest.ts](../app/manifest.ts).

### `app/not-found.tsx`

Custom 404 page that returns **HTTP 404** + `noindex` meta. Without this,
unknown routes might return generic Next.js 404 markup that doesn't carry
your branding.

Reference: [app/not-found.tsx](../app/not-found.tsx).

### `app/rss.xml/route.ts`

Optional. Route handler emitting RSS 2.0. Set explicit `Cache-Control` for CDN
control:

```
Cache-Control: public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400
```

Reference: [app/rss.xml/route.ts](../app/rss.xml/route.ts).

### `app/opengraph-image.tsx`

Default site-wide OG image. Use `next/og` `ImageResponse`. Edge runtime works
fine for the default (no filesystem access needed).

### `app/<segment>/[slug]/opengraph-image.tsx`

Per-detail-route OG images. **Use `nodejs` runtime if you read from the
filesystem** (MDX, JSON files); edge runtime cannot use `fs`.

Reference: [app/articles/[slug]/opengraph-image.tsx](../app/articles/[slug]/opengraph-image.tsx).

---

## Phase 3 — Per-route metadata + JSON-LD (90 min)

For **every** page, do these four things:

### 3a. Static routes — export `metadata`

```tsx
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Articles",
  description: "...",
  path: "/articles",
  keywords: [...],
});
```

### 3b. Dynamic routes — export `generateMetadata` + `generateStaticParams`

```tsx
export async function generateStaticParams() {
  try {
    return getAllItems().map(i => ({ slug: i.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  let item;
  try {
    item = getItemBySlug(slug);
  } catch {
    return buildMetadata({
      title: "Not found",
      description: "...",
      path: `/items/${slug}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: item.title,
    description: item.description,
    path: `/items/${slug}`,
    image: item.image,
    type: "article",
    publishedTime: item.date,
    authors: [item.author],
    // Google Scholar tags for academic content:
    other: buildScholarMeta({...}),
  });
}
```

### 3c. Inject JSON-LD in the JSX

```tsx
return (
  <>
    <JsonLd id="ld-article" data={articleLd({...})} />
    <JsonLd id="ld-breadcrumb" data={breadcrumbLd([...])} />
    {/* page content */}
  </>
);
```

### 3d. Listing pages — add `CollectionPage` + `ItemList`

Listings (`/articles`, `/books`, etc.) should declare `CollectionPage` with a
nested `ItemList` for discoverability of children.

### Mapping schema types to routes

| Route type | Metadata `type` | JSON-LD on detail page |
| --- | --- | --- |
| Homepage | `website` | `Organization` + `WebSite` (in root layout) |
| Listing (articles, books, ...) | `website` | `BreadcrumbList` + `CollectionPage` |
| Article detail (editorial) | `article` | `Article` + `BreadcrumbList` |
| Article detail (academic) | `article` | `ScholarlyArticle` + `BreadcrumbList` + `citation_*` meta tags |
| Book detail | `book` | `Book` + `BreadcrumbList` |
| Author / about | `profile` | `Person` + `BreadcrumbList` |
| Song / music | `music.song` (mapped to `website` in OG since FB doesn't accept it directly) | `MusicRecording` + `BreadcrumbList` |
| 404 | `website` | (none) — `noindex` |

### Handling `"use client"` pages

A page marked `"use client"` cannot export `metadata`. Split it:

1. Move existing UI into `<SegmentName>Client.tsx` — keep `"use client"` there.
2. Rewrite `page.tsx` as a server component that exports `metadata`, injects
   JSON-LD, and renders `<SegmentNameClient />`.

Pattern is mechanical; no content changes needed.

Reference: [app/about/page.tsx](../app/about/page.tsx) + [app/about/AboutClient.tsx](../app/about/AboutClient.tsx).

---

## Phase 4 — Root layout wiring (15 min)

In `app/layout.tsx`:

1. Export `metadata` with `metadataBase`, default OG/Twitter, robots policy,
   icons (including Apple touch + 512×512), manifest link, RSS alternate,
   title template (`"%s | BRAND"`).
2. Export `viewport` with theme color tuples.
3. Inject site-wide JSON-LD in the body: `Organization` + `WebSite`.
4. Pass `display: "swap"` to any `next/font` loaders.

Reference: [app/layout.tsx](../app/layout.tsx).

---

## Phase 5 — Fix architectural mistakes (varies)

### Duplicate content

If `/` and `/home` (or similar) render the same content:

- Add `noIndex: true` and `canonical: "/"` to the duplicate's metadata.
- Disallow it in `robots.ts`.
- Exclude it from `sitemap.ts`.

### Hard-coded URLs

Search the codebase for the production domain — every hit should flow through
`absoluteUrl()` from `siteConfig`.

### Crawl traps

Check for infinite-pagination or filter combinations that create exponential
URL space. Add `rel="canonical"` or `noindex` accordingly.

### Render-blocking patterns

- CSS `@import url(...)` for Google Fonts inside JSX `<style>` blocks → migrate to `next/font`.
- Raw `<img>` for above-the-fold images → swap to `<Image>` with explicit `width`/`height` and `priority`.
- Synchronous `framer-motion` imports on landing pages → consider dynamic import.

---

## Phase 6 — Performance hygiene (30 min)

- [ ] All `<img>` swapped to `next/image` with explicit dimensions.
- [ ] Primary above-the-fold image has `priority`.
- [ ] Fonts use `next/font` with `display: "swap"`.
- [ ] No production `console.log` in build-time loaders.
- [ ] `next.config.ts` declares `images.remotePatterns` for every external image host.
- [ ] React Compiler enabled if on React 19+.
- [ ] No client-only data fetching for content that exists at build time — use `generateStaticParams`.

---

## Phase 7 — Verification (30 min)

### Local

```bash
npx tsc --noEmit                   # Type-clean
npm run build                      # All routes prerender
```

Expect output like:

```
✓ Generating static pages using 11 workers (N/N)
```

Confirm in the route table:

- `○` (static) for listings + about + contact
- `●` (SSG) for dynamic content routes — proves `generateStaticParams` worked
- `ƒ` (Dynamic) only for OG image routes and edge functions

### Local HTTP smoke test

```bash
npm start &
sleep 5
curl -sI http://localhost:3000/robots.txt
curl -sI http://localhost:3000/sitemap.xml
curl -sI http://localhost:3000/rss.xml
curl -sI http://localhost:3000/manifest.webmanifest
curl -s   http://localhost:3000/articles/<some-slug> | grep -c 'application/ld+json'    # ≥ 2
curl -s   http://localhost:3000/articles/<some-slug> | grep -oE '<meta name="citation_' # for academic
curl -s   http://localhost:3000/articles/<some-slug> | grep -oE '<link rel="canonical"' # canonical present
```

If `npm start` is unavailable, `next dev` works but headers differ slightly.

### Validators (post-deploy)

See [post_deploy_seo_playbook.md](./post_deploy_seo_playbook.md) §6–§7.

---

## Phase 8 — Documentation (15 min)

Create `optimization_report/` with at minimum:

- `seo_audit_report.md` — what was wrong before
- `implementation_summary.md` — what changed, with impact ratings
- `technical_changes.md` — file-by-file narrative
- `schema_implementation.md` — JSON-LD types deployed per route
- `performance_optimization.md` — performance changes + deliberate non-changes
- `future_recommendations.md` — roadmap, limitations
- `checklists.md` — operational checklists
- `changes_summary.json` — machine-readable manifest
- `post_deploy_seo_playbook.md` — copy from this folder

This folder becomes the long-term technical reference for whoever maintains
the site next.

---

## Phase 9 — Hand off to deployment

Once everything above is green:

1. Merge the SEO branch to production.
2. Open [post_deploy_seo_playbook.md](./post_deploy_seo_playbook.md) and start
   at Step 1.

The implementation phase ends. Operations phase begins.

---

## Constraints to honour throughout

These are project-agnostic rules borrowed from the engagement this folder
documents:

- ❌ **Do not modify editorial content** (articles, books, magazines, user data).
- ❌ **Do not break existing routes** — every URL that worked before must still work.
- ❌ **Do not damage UI/UX** — pure SEO changes only. If the SEO win requires UI work, defer to a UI sprint with explicit approval.
- ❌ **Do not add runtime dependencies** unless absolutely needed. Prefer framework primitives (`next/og`, `next/image`, `next/font`, route handlers).
- ❌ **Do not introduce client-side data fetching** for content that exists at build time.
- ❌ **Do not put secrets in `siteConfig.ts`**. Tokens belong in environment variables.

---

## Decision quick-reference

| Situation | Decision |
| --- | --- |
| Choosing canonical form (`www` vs apex, trailing slash) | Pick on day 1, stick with it. Vercel sets `www` ↔ apex redirect; choose the apex as canonical for most projects. |
| `noindex` for a real public URL | Almost always wrong. Use `canonical` to a preferred URL instead. |
| ISR vs SSG for content pages | SSG via `generateStaticParams` for stable content. ISR only when content changes per minute. |
| Edge runtime vs Node runtime for OG images | Node for filesystem reads (MDX, JSON). Edge for pure code-driven images. |
| `Article` vs `ScholarlyArticle` JSON-LD | Editorial → `Article`. Peer-reviewed/academic → `ScholarlyArticle` + `citation_*` meta tags. |
| `summary` vs `summary_large_image` Twitter card | Always `summary_large_image` for content sites. |
| Whether to add `hreflang` | Only after multilingual variants ship. Architecture-ready helper is fine. |
| Whether to add Cloudflare Cache Rules | Only after you have a real cache-stampede problem. Defaults are fine for content sites. |

---

## Reusable file template list

When starting a new project, create these files in this order:

```
lib/seo/config.ts
lib/seo/metadata.ts
lib/seo/jsonld.ts
lib/seo/rss.ts                              (optional)
lib/seo/og.tsx                              (optional but recommended)
lib/seo/slug.ts                             (optional)
Components/seo/JsonLd.tsx
app/robots.ts
app/sitemap.ts
app/manifest.ts
app/not-found.tsx
app/rss.xml/route.ts                        (optional)
app/opengraph-image.tsx
app/<segment>/[slug]/opengraph-image.tsx    (one per dynamic content type)
```

Then modify:

```
app/layout.tsx                              (metadata, JsonLd, font display: swap)
app/page.tsx                                (per-route metadata)
app/<segment>/page.tsx                      (per-route metadata, listing LD)
app/<segment>/[slug]/page.tsx               (generateStaticParams, generateMetadata, detail LD)
```

That's the full SEO scaffold.

---

## Cross-references

- Reference implementation files cited throughout: the working code in this
  repository under [lib/seo/](../lib/seo/), [Components/seo/](../Components/seo/),
  and [app/](../app/).
- For the operational steps after deployment: [post_deploy_seo_playbook.md](./post_deploy_seo_playbook.md).
- For project-specific results of applying this playbook: [implementation_summary.md](./implementation_summary.md).
