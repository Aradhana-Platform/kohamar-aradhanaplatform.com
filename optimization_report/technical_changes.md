# Technical Changes — File-by-File Narrative

For each file: **What**, **Why**, **Risk/Impact**.

---

## A. New SEO library

### [lib/seo/config.ts](../lib/seo/config.ts)
- **What:** Defines `siteConfig`, `SITE_URL`, and `absoluteUrl(path)`.
- **Why:** Centralising domain, author, organization, defaults, and keywords prevents drift. When the brand changes, exactly one file needs an edit.
- **Risk:** None. Pure data + a single string helper.

### [lib/seo/metadata.ts](../lib/seo/metadata.ts)
- **What:** `buildMetadata(input)` produces a fully-formed Next.js `Metadata` object. `buildScholarMeta()` produces the Google Scholar `citation_*` map.
- **Why:** Eliminates per-route metadata duplication and enforces consistent canonical/OG/Twitter/robots policy. Description is safely truncated to 300 chars and whitespace-normalised; image is auto-resolved against `metadataBase`.
- **Risk:** Centralised — bugs would be wide-impact. Mitigated by simple, branch-free logic and TypeScript strictness.

### [lib/seo/jsonld.ts](../lib/seo/jsonld.ts)
- **What:** Typed builders for `Organization`, `WebSite`, `Person`, `Article`, `ScholarlyArticle`, `Book`, `BreadcrumbList`, `MusicRecording`, `CollectionPage`, plus a `pruneLd()` helper that recursively drops `undefined`/`null`/empty values.
- **Why:** Schema.org JSON-LD is verbose and error-prone if hand-written. Builders give type safety and `pruneLd` keeps the emitted payloads clean for validators.
- **Risk:** None at the API surface; emitted JSON is validated by Google's Rich Results Test.

### [lib/seo/rss.ts](../lib/seo/rss.ts)
- **What:** `buildRss(items)` produces an RSS 2.0 XML string. XML entities escaped; CDATA used for title and description.
- **Why:** RSS feed provides a syndication channel for articles + magazines + quick-reads. Building the XML manually avoids adding a dependency.
- **Risk:** Manual XML carries injection risk. Mitigated by an explicit `escapeXml()` step and CDATA on user content fields.

### [lib/seo/og.tsx](../lib/seo/og.tsx)
- **What:** `renderDetailOg({ eyebrow, title, byline })` returns an `ImageResponse` rendered with `next/og`.
- **Why:** All five detail-route OG images share the same visual; one helper avoids JSX duplication.
- **Risk:** Edge runtime sandbox limitations — only inline styles, no remote fonts. Helper sticks to those constraints.

### [lib/seo/slug.ts](../lib/seo/slug.ts)
- **What:** `normalizeSlug(input)` and `isCanonicalSlug(input)`.
- **Why:** Future-proofing for new content. Removes diacritics, lowercases, collapses whitespace and dashes, blocks reserved names (`api`, `robots.txt`, etc.).
- **Risk:** Not currently wired into the build (no slug currently violates it). Available for any future content ingestion script.

### [Components/seo/JsonLd.tsx](../Components/seo/JsonLd.tsx)
- **What:** Server component that emits `<script type="application/ld+json">` with the payload run through `pruneLd`.
- **Why:** Consistent injection point so any page can drop in a typed builder output.
- **Risk:** Uses `dangerouslySetInnerHTML` — safe because the payload comes from typed builders, not arbitrary user input, and `JSON.stringify` neutralises HTML special characters that would matter inside a script tag.

---

## B. App Router SEO surfaces

### [app/robots.ts](../app/robots.ts)
- **What:** Uses `MetadataRoute.Robots`. Allows all by default; disallows `/api/`, `/_next/`, and `/home`; explicitly opens Googlebot, Googlebot-News, Google-Extended, GPTBot, Bingbot; declares `host` and `sitemap`.
- **Why:** Canonical robots policy from the App Router-native API. `Disallow: /home` prevents the duplicate from being crawled.
- **Risk:** None. If the host changes, edit `lib/seo/config.ts` once.

### [app/sitemap.ts](../app/sitemap.ts)
- **What:** Uses `MetadataRoute.Sitemap`. Statically emits seven static entries + every article/book/magazine/quick-read/song slug, with sensible `lastModified`, `changeFrequency`, and `priority`. Wraps each loader in `safeList()` so a malformed content file cannot break the sitemap.
- **Why:** Search engines need a deterministic, up-to-date sitemap. Defensive loading guarantees the sitemap is always 200.
- **Risk:** Low. Worst case a single malformed MDX file is dropped silently.

### [app/manifest.ts](../app/manifest.ts)
- **What:** Generates `/manifest.webmanifest`.
- **Why:** Completes the "favicon + meta" Phase 2 requirement; supports Android home-screen install and PWA expectations.
- **Risk:** None. Reuses existing `/favicon.ico` and `/logo.jpg`.

### [app/not-found.tsx](../app/not-found.tsx)
- **What:** Custom 404 page. Returns HTTP 404 by virtue of being the App Router's not-found handler. Emits `noindex` metadata. Provides navigation back to listings.
- **Why:** Avoids accidental indexing of broken paths and improves UX for misses.
- **Risk:** None.

### [app/rss.xml/route.ts](../app/rss.xml/route.ts)
- **What:** Route handler at `/rss.xml`. Force-static, revalidate 3600s. Returns the RSS XML with `Content-Type: application/rss+xml` and a strong `Cache-Control`.
- **Why:** RSS readers and aggregators need a predictable endpoint. `force-static` keeps it cacheable at the CDN.
- **Risk:** None. `safeList()` protects against bad content files.

### [app/opengraph-image.tsx](../app/opengraph-image.tsx)
- **What:** Default site OG image, edge runtime, 1200×630, branded gradient with site name and tagline.
- **Why:** Used as fallback when a page does not set its own `openGraph.images`.
- **Risk:** Edge runtime — no Node APIs allowed. Implementation stays within `next/og` constraints.

### `app/<segment>/[slug]/opengraph-image.tsx` (five files)
- **What:** One per content type. Reads the MDX frontmatter and renders a per-page OG image via `renderDetailOg()`.
- **Why:** Per-page social previews drive click-through.
- **Risk:** Uses `runtime = "nodejs"` because filesystem access (the MDX reader) is unavailable on edge.

---

## C. Per-route page changes

### [app/layout.tsx](../app/layout.tsx)
- Added `metadataBase: new URL(siteConfig.url)`. **Critical** — without it OG/Twitter URLs are broken.
- Added title template `"%s | KOHAMAR"`. The pre-existing `"KOHAMAR"` default remains as the root title.
- Added full default OpenGraph and Twitter cards, robots policy, icons (incl. Apple touch), `manifest` link, viewport with theme color tuples, RSS alternate.
- Injected `<JsonLd id="ld-organization" />` and `<JsonLd id="ld-website" />` into the body.
- Added `display: "swap"` to both Geist fonts.

### [app/page.tsx](../app/page.tsx)
- Added `metadata` with canonical `/`. Still renders the `Home` component (no UI change).

### [app/home/page.tsx](../app/home/page.tsx)
- Added `metadata` with `noIndex: true` and `canonical: "/"`.
- Removed unused imports (`Image`, `BlogCards`, `QuickRead`).
- **No UI/UX change.**

### [app/about/page.tsx](../app/about/page.tsx)
- Was a full `"use client"` page with no per-page metadata possible.
- **Split:** UI moved verbatim to `app/about/AboutClient.tsx`; `page.tsx` is now a server component that exports metadata + injects `Person` and `BreadcrumbList` JSON-LD, then renders `AboutClient`.
- **Zero content change.**

### [app/about/AboutClient.tsx](../app/about/AboutClient.tsx)
- Copy of the original page with `export default function AboutPage()` renamed to `AboutClient`.

### [app/contact/page.tsx](../app/contact/page.tsx)
- Added metadata. Stub body untouched.

### [app/articles/page.tsx](../app/articles/page.tsx)
- Added metadata, `BreadcrumbList` LD, `CollectionPage` LD.

### [app/articles/[slug]/page.tsx](../app/articles/[slug]/page.tsx)
- Added `generateStaticParams()` and `generateMetadata()`.
- `generateMetadata` resolves frontmatter and emits Article OG, Twitter, and Google Scholar `citation_*` via `buildScholarMeta`.
- Body emits `ScholarlyArticle` JSON-LD and `BreadcrumbList` JSON-LD.
- Replaced the hard-coded `https://kohamar.aradhanaplatform.com/articles` URL with `absoluteUrl(\`/articles/${slug}\`)`.

### [app/books/page.tsx](../app/books/page.tsx)
- Added metadata + `BreadcrumbList` + `CollectionPage` LD.

### [app/books/[slug]/page.tsx](../app/books/[slug]/page.tsx)
- Added `generateStaticParams()` + `generateMetadata()`.
- Emits `Book` LD (with `offers` if frontmatter has `booklinks` and `price`) + `BreadcrumbList`.
- Parses `price` defensively (`$18.99` → 18.99 USD, falls back if no currency match).

### [app/magazines/page.tsx](../app/magazines/page.tsx)
- Metadata + Breadcrumb LD + CollectionPage LD.

### [app/magazines/[slug]/page.tsx](../app/magazines/[slug]/page.tsx)
- `generateStaticParams()` + `generateMetadata()` (Article OG + Scholar tags).
- Article + Breadcrumb LD.
- Cleaned unused imports (`ReactMarkdown`, `MDXProvider`, `EnterMdxComponent`, `PullQuote`, `CategoryBadge`).

### [app/quick-read/page.tsx](../app/quick-read/page.tsx)
- Metadata + Breadcrumb LD + CollectionPage LD.

### [app/quick-read/[slug]/page.tsx](../app/quick-read/[slug]/page.tsx)
- `generateStaticParams()` + `generateMetadata()`.
- Description prefers `excerpt`, falls back to `description`.
- Article + Breadcrumb LD.

### [app/songs/page.tsx](../app/songs/page.tsx)
- Metadata + Breadcrumb LD + CollectionPage LD.

### [app/songs/[slug]/page.tsx](../app/songs/[slug]/page.tsx)
- Added `generateMetadata` (`type: "music.song"`).
- Emits `MusicRecording` LD + `BreadcrumbList`.
- `generateStaticParams` already existed.

---

## D. Component performance changes

### [Components/Navbar.tsx](../Components/Navbar.tsx)
- Swapped raw `<img src="/logo.jpg">` for `<Image src="/logo.jpg" width={48} height={48} priority>`.
- `priority` because the logo is part of LCP-critical above-the-fold content.
- Visual size identical (48×48 inside a `w-12 h-12` round container).

### [Components/Footer.tsx](../Components/Footer.tsx)
- Swapped raw `<img>` for `<Image>` at 56×56 (matching `w-14 h-14`).

---

## E. Library hygiene

### [lib/posts.ts](../lib/posts.ts) and [lib/quickread.ts](../lib/quickread.ts)
- Removed two `console.log` statements each (`slug = ...`).
- **No behavioural change.** Slightly less console noise in dev and zero runtime cost in prod.

---

## F. Files intentionally NOT changed

- All MDX files in [content/articles/](../content/articles/), [content/books/](../content/books/), [content/magazine/](../content/magazine/), [content/quickread/](../content/quickread/), [content/songs/](../content/songs/) — editorial content is sacrosanct per task rules.
- [Components/ArticleUI.tsx](../Components/ArticleUI.tsx), [Components/BlogCards.tsx](../Components/BlogCards.tsx), and other UI components — no SEO requirement and the audit rule forbids UI/UX damage.
- Display-font `@import` strings inside hero `<style>` blocks (Magazine detail, Category, Home) — replacing them with `next/font` would require restyling and risks UX regression; kept as-is.
- `public/` SVGs (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`) — unused but file deletion is outside the additive-only mandate.
- [tsconfig.json](../tsconfig.json) `paths` alias — leaving as-is; the alias is unused and harmless.

---

## G. Hydration / regression posture

- All splits (notably About) preserve identical client-side JSX. Server now wraps with metadata-emitting parent.
- Build emits 46 static routes; no `useEffect`-only data was migrated, and no `"use client"` boundaries were demoted to server.
- `generateStaticParams` keeps the previous behaviour of those pages (still SSG) while now prerendering at build time.
