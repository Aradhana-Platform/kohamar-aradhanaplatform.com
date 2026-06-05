# Checklists — Validation, GSC, Google Scholar

This document is operational. Run through it after each deploy and each
content sprint.

---

## 1. Sitemap validation

- [ ] Visit `https://kohamar.aradhanaplatform.com/sitemap.xml` and confirm HTTP 200.
- [ ] Run the XML through a validator such as [xmlvalidation.com](https://www.xmlvalidation.com/).
- [ ] Confirm every content URL is present and uses HTTPS + the canonical host.
- [ ] Confirm `lastmod` is a parseable ISO date for every entry.

## 2. robots.txt validation

- [ ] Visit `https://kohamar.aradhanaplatform.com/robots.txt`.
- [ ] Confirm `Sitemap: https://kohamar.aradhanaplatform.com/sitemap.xml` is present.
- [ ] Confirm `Disallow: /home` is present and `/` is allowed.
- [ ] Confirm major crawlers (Googlebot, Bingbot, Googlebot-News, Google-Extended, GPTBot) each have an explicit `User-Agent` block.
- [ ] Test with [Google's robots.txt Tester](https://search.google.com/search-console/settings/robots-txt) inside Search Console.

## 3. Metadata validation per route

For each route (sample below — repeat for `articles`, `magazines`, etc.):

- [ ] `<title>` is unique and follows the `"%s | KOHAMAR"` template.
- [ ] `<meta name="description">` is unique and ≤300 chars.
- [ ] `<link rel="canonical">` points to the absolute URL.
- [ ] `<meta property="og:title">`, `og:description`, `og:image`, `og:url`, `og:type` exist.
- [ ] `<meta name="twitter:card" content="summary_large_image">` and twitter title/description/image exist.
- [ ] `<meta name="robots">` is `index, follow` (or `noindex, follow` on `/home`).

## 4. Schema / JSON-LD validation

- [ ] On every route, view source and confirm at least one `<script type="application/ld+json">`.
- [ ] Paste the URL into [Google's Rich Results Test](https://search.google.com/test/rich-results).
- [ ] Paste the URL into the [Schema Markup Validator](https://validator.schema.org/).
- [ ] Confirm no `Required` or `Recommended` errors.

Spot routes to validate:

- [ ] `/` — `Organization`, `WebSite`.
- [ ] `/articles/the-decalogic-theology-of-the-sabbath` — `ScholarlyArticle`, `BreadcrumbList`.
- [ ] `/books/Understanding-Your-Call` — `Book`, `BreadcrumbList`.
- [ ] `/magazines/In-the-beginning-part-1` — `Article`, `BreadcrumbList`.
- [ ] `/quick-read/quick-read-1` — `Article`, `BreadcrumbList`.
- [ ] `/songs/shema` — `MusicRecording`, `BreadcrumbList`.

## 5. OG image validation

- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) for `/`, `/articles/...`, `/books/...`, `/songs/...`.
- [ ] [Twitter / X Card Validator](https://cards-dev.twitter.com/validator).
- [ ] Confirm that each detail-route OG image renders the title, eyebrow, byline correctly.

## 6. RSS validation

- [ ] Visit `https://kohamar.aradhanaplatform.com/rss.xml` and confirm `Content-Type: application/rss+xml`.
- [ ] Validate at [W3C Feed Validator](https://validator.w3.org/feed/).
- [ ] Subscribe with a real reader (Feedly, Inoreader) and confirm titles render correctly.

## 7. Performance validation

- [ ] [PageSpeed Insights](https://pagespeed.web.dev/) for `/`, `/articles/the-decalogic-theology-of-the-sabbath`, `/books/Understanding-Your-Call`.
- [ ] Confirm LCP < 2.5s, CLS < 0.1, INP < 200ms on mobile.
- [ ] [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly).

---

## 8. Google Search Console — initial setup

1. **Add property:** `https://kohamar.aradhanaplatform.com`. Prefer DNS TXT verification so verification survives DNS provider changes.
2. **Submit sitemap:** Under Sitemaps, submit `sitemap.xml` and wait for "Success".
3. **URL inspection:** Pick a representative article URL and request indexing.
4. **Crawl rate:** Default automatic crawl rate is fine; no action required.
5. **International targeting:** Skip until multilingual variants ship.
6. **Coverage / Indexing tab:**
   - Expect `/home` to appear under "Excluded — alternate page with proper canonical tag" (intentional).
   - Expect `_not-found` / `/404` to be excluded.
7. **Manual actions:** Confirm none exist.
8. **Enhancements:**
   - **Article** rich results — confirm appearance.
   - **Sitelinks searchbox** — possible because `WebSite` JSON-LD declares a `SearchAction`.

## 9. Bing Webmaster Tools

- [ ] Add property at https://www.bing.com/webmasters/.
- [ ] Submit the same sitemap.
- [ ] Import from GSC if desired (faster).

## 10. Google Scholar — submission readiness checklist

Source: https://scholar.google.com/intl/en/scholar/inclusion.html

- [ ] Article URLs are stable and use HTTPS — ✅
- [ ] Each article page has these meta tags:
  - `citation_title` ✅
  - `citation_author` ✅
  - `citation_publication_date` ✅
  - `citation_abstract` ✅
  - `citation_pdf_url` ⚠ when PDF is available
- [ ] The site exposes a sitemap that links to all articles — ✅
- [ ] robots.txt does **not** block Scholar (it is a Googlebot variant) — ✅
- [ ] Articles do not require JavaScript to render the title and abstract — ✅ (server-rendered)
- [ ] Article pages return a single canonical URL — ✅

When ready, fill the [Scholar inclusion form](https://scholar.google.com/intl/en/scholar/inclusion.html#submit) with:
- Site URL: `https://kohamar.aradhanaplatform.com`
- Sample article URL: `/articles/the-decalogic-theology-of-the-sabbath`
- Brief description of publishing scope (academic theological articles, biblical studies).

## 11. Post-deploy smoke tests (run after every release)

```
curl -I https://kohamar.aradhanaplatform.com/robots.txt
curl -I https://kohamar.aradhanaplatform.com/sitemap.xml
curl -I https://kohamar.aradhanaplatform.com/rss.xml
curl -I https://kohamar.aradhanaplatform.com/manifest.webmanifest
curl -I https://kohamar.aradhanaplatform.com/opengraph-image
curl -I https://kohamar.aradhanaplatform.com/articles/the-decalogic-theology-of-the-sabbath
curl -I https://kohamar.aradhanaplatform.com/articles/the-decalogic-theology-of-the-sabbath/opengraph-image
```

All should return `200`. The 404 path should return `404`:

```
curl -I https://kohamar.aradhanaplatform.com/does-not-exist
```

## 12. Internal linking checklist (manual)

Internal linking strengthens topical authority. After each new article ships:

- [ ] Link from at least one existing article to the new one.
- [ ] Update the relevant listing page (already automatic via filesystem scan).
- [ ] If the article belongs to a category, link to it from at least one quick-read or magazine essay in the same theme.
- [ ] Use descriptive anchor text (the article title or topical keyword), not "click here".
