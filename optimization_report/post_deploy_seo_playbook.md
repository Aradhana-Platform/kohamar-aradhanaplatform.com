# Post-Deploy SEO Playbook

A reusable operational guide for the steps to take **after** SEO infrastructure
ships on a Next.js + Vercel + Cloudflare project. Use this on every project
the moment the SEO foundation (robots, sitemap, metadata, JSON-LD, RSS, OG
images) is merged to production.

> This is operational only — for the code-level SEO implementation see
> [seo_implementation_playbook.md](./seo_implementation_playbook.md).
> For project-specific results see
> [implementation_summary.md](./implementation_summary.md),
> [technical_changes.md](./technical_changes.md),
> [schema_implementation.md](./schema_implementation.md).

**Time budget:** ~45 min today + ~15 min/week ongoing.

---

## Pre-flight checklist (before opening Search Console)

- [ ] Code is merged to the deploy branch and Vercel build is green.
- [ ] The production URL is known: `https://<your-domain>`.
- [ ] You can edit DNS records (needed for verification).
- [ ] You know whether the domain is on Cloudflare proxy or DNS-only — see next section.

---

## 1. Cloudflare proxy check

Cloudflare can hide a successful deploy by serving cached old responses.
Check this once per environment:

1. Cloudflare dashboard → your zone → **DNS** tab.
2. Find the record for the relevant subdomain.
3. Check the cloud icon:

| Icon | Meaning | Cache risk |
| --- | --- | --- |
| 🟠 Orange | Proxied — Cloudflare is between user and origin | **Yes** — purge after deploy |
| ⚪ Grey | DNS only — Cloudflare just resolves DNS | None — skip the purge |

### If orange-cloud → purge the cache once

Cloudflare dashboard → **Caching → Configuration → Purge Cache → Custom Purge**, paste:

```
https://<your-domain>/robots.txt
https://<your-domain>/sitemap.xml
https://<your-domain>/rss.xml
https://<your-domain>/manifest.webmanifest
```

Verify the purge:

```
curl -sI https://<your-domain>/robots.txt | grep -i 'cf-cache-status\|age'
```

`cf-cache-status: MISS` or `DYNAMIC` = clean. `HIT` with a high `age:` = purge again.

---

## 2. Smoke-test live endpoints

Run these once after deploy. All should return **200** except the last one.

```
curl -sI https://<your-domain>/robots.txt
curl -sI https://<your-domain>/sitemap.xml
curl -sI https://<your-domain>/rss.xml
curl -sI https://<your-domain>/manifest.webmanifest
curl -sI https://<your-domain>/opengraph-image
curl -sI https://<your-domain>/does-not-exist   # expect 404
```

Open in a browser and eyeball:

- `/robots.txt` → contains your `Sitemap:` line and explicit Googlebot/Bingbot/GPTBot blocks.
- `/sitemap.xml` → valid XML, every public URL listed, `<lastmod>` parses as ISO date.
- `/rss.xml` → valid RSS 2.0 with `<channel>`, `<atom:link rel="self">`, and items.

If anything 404s, the file isn't in your `app/` directory or the build failed silently. Fix that **before** moving on.

---

## 3. Google Search Console setup (15 min)

### 3a. Verify domain ownership

1. Open https://search.google.com/search-console/welcome.
2. Pick **Domain property** (not URL prefix — Domain covers all subdomains and protocols).
3. Enter the root domain: `<your-root-domain>` (e.g. `example.com`, not `www.example.com` and not `https://example.com`).
4. Google shows a TXT record value like `google-site-verification=abc123...`.
5. Add this as a **TXT record** at the root (`@`) in your DNS provider (Cloudflare DNS dashboard if applicable).
6. Wait ~1 minute. Click **Verify**.

**Why Domain property and DNS TXT:**
- Domain property covers every subdomain (apex, www, staging, etc.) without re-verification.
- DNS TXT survives Vercel/Cloudflare changes; HTML-file or meta-tag verification can break during refactors.

### 3b. Submit sitemap

1. In GSC left sidebar → **Sitemaps**.
2. Enter `sitemap.xml` (not the full URL — just the path).
3. Submit. Wait for **Success** status (usually <60 seconds).
4. Refresh — confirm Google reports the discovered URL count matches your sitemap.

### 3c. Set up email alerts

GSC → **Settings → Users and permissions** → confirm your email gets coverage/issue notifications. Optional but recommended.

---

## 4. URL Inspection (request priority indexing)

**What to paste:** A full absolute URL of a page you want indexed *soon*.

**What NOT to paste:**
- ❌ URLs missing `https://`
- ❌ Relative paths
- ❌ URLs you've intentionally marked `noindex` (e.g. duplicate routes)
- ❌ The same URL twice in 24 hours
- ❌ URLs that don't exist

**Strategy:** Submit your top 5–10 highest-value URLs on day 1. Skip the long tail — the sitemap handles discovery for those.

Example priority order for a content site:

```
https://<your-domain>/
https://<your-domain>/articles
https://<your-domain>/articles/<flagship-piece>
https://<your-domain>/articles/<second-priority>
https://<your-domain>/books
https://<your-domain>/about
```

Flow for each URL:

1. Paste in the top "Inspect any URL" bar → Enter.
2. Wait ~10 s for the initial check.
3. Expect "URL is not on Google" on a fresh site — normal.
4. Click **Request Indexing** → wait ~30 s for the live test.
5. Confirm "Indexing requested" message.

**Rate limit:** Google allows ~10–12 requests per property per day. Don't burn them on low-priority URLs.

**Diagnostics to read on each result:**
- *Page availability → Crawl allowed?* Should be Yes.
- *Indexing allowed?* Should be Yes (or "No: noindex detected" only on intentional noindex pages).
- *User-declared canonical* and *Google-selected canonical* should match the URL you submitted.

---

## 5. Bing Webmaster Tools (5 min)

Bing powers Bing, DuckDuckGo, Yahoo, and ChatGPT search results — worth doing.

1. Go to https://www.bing.com/webmasters/.
2. Sign in → **Add a site** → **Import from Google Search Console**.
3. This pulls verification + sitemap automatically. Done.

If GSC import fails, manual setup mirrors GSC: add a DNS TXT or upload the BingSiteAuth.xml file, then submit `https://<your-domain>/sitemap.xml` under **Sitemaps**.

---

## 6. Validate structured data (10 min)

Pick 3–5 representative URLs covering each schema type and run them through:

| Tool | URL |
| --- | --- |
| [Rich Results Test](https://search.google.com/test/rich-results) | Detail pages — should show valid Article / Book / etc. + Breadcrumbs |
| [Schema Markup Validator](https://validator.schema.org/) | Same URLs — should show 0 errors |

For each result:
- Confirm the expected schema type is detected.
- Confirm 0 "Errors". Warnings are usually acceptable.
- If errors appear, the message names the missing field — fix in your JSON-LD builder or content frontmatter.

Sitelinks searchbox eligibility shows on the homepage if `WebSite` schema declared `SearchAction`. Confirm via Rich Results Test on `/`.

---

## 7. Validate social previews (5 min)

| Tool | Why |
| --- | --- |
| [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) | Clears Facebook/Instagram OG cache; shows preview |
| [X / Twitter Card Validator](https://cards-dev.twitter.com/validator) | Shows Twitter Card preview |
| [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) | LinkedIn caches hard — only this tool refreshes it |

Test home + one detail URL per content type. Click "Scrape Again" / "Re-run" if the preview shows old data.

If the OG image is the generic site default instead of a per-page image, confirm:
- The per-page route exports an `opengraph-image.tsx`.
- The OG image route returns 200 + `Content-Type: image/png`.

---

## 8. Performance baseline (10 min)

1. **Enable Vercel Speed Insights** in your Vercel project dashboard → Analytics tab.
2. Run [PageSpeed Insights](https://pagespeed.web.dev/) on 3 URLs: home, a detail page, a listing page.
3. **Record the baseline numbers somewhere durable**: LCP, CLS, INP (mobile and desktop).
4. Set targets: LCP < 2.5 s, CLS < 0.1, INP < 200 ms.

Without a baseline you can't tell if future changes are wins or regressions.

---

## 9. Google Scholar (only for academic content)

**Timing matters.** Submit Scholar inclusion **only after** Google has indexed at least a few articles via regular search — verify in GSC → Coverage. For a fresh site that means waiting **2–4 weeks** after step 3.

**Pre-submission readiness checks:**

- [ ] Article URLs are HTTPS and stable.
- [ ] Each article has `citation_title`, `citation_author`, `citation_publication_date`, `citation_abstract` meta tags.
- [ ] (Strongly recommended) `citation_pdf_url` for articles with linked PDFs.
- [ ] Article HTML renders the title and abstract without JavaScript — view the raw HTML.
- [ ] No `noindex` on article URLs.
- [ ] Robots.txt does not block any Scholar variant (Scholar uses Googlebot).

**Submit at:** https://scholar.google.com/intl/en/scholar/inclusion.html
Provide: site URL, 2–3 sample article URLs, brief description of scope.

---

## 10. Ongoing maintenance cadence

| Frequency | Action |
| --- | --- |
| Per new content item | Rich Results Test on the new URL. URL Inspection → Request Indexing for high-priority pieces. |
| Weekly | GSC Performance tab — check impression/click trends. Coverage tab — look for new errors. |
| Monthly | PageSpeed Insights on home + 1 recent page. Compare to baseline. |
| Quarterly | Run the full [checklists.md](./checklists.md). Update [changes_summary.json](./changes_summary.json) if anything material changed. |
| When content scales (>500 URLs) | Implement sitemap splitting via Next.js `generateSitemaps()`. |

---

## 11. Common pitfalls

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| GSC says "Couldn't fetch" on sitemap submission | Cloudflare or hosting blocking Googlebot | Check `/robots.txt` for accidental `Disallow: /sitemap.xml`. Verify with the Mobile-Friendly Test on the sitemap URL. |
| Sitemap submitted but 0 pages discovered after 1 week | Sitemap file is malformed XML or returns wrong Content-Type | Validate at https://www.xmlvalidation.com/. Confirm `Content-Type: application/xml`. |
| `URL is not on Google` after 2+ weeks for a high-quality page | Crawl budget or thin-content signal | Add internal links from existing pages to the unindexed page. Don't repeatedly request indexing — it's not a ranking signal. |
| OG image shows the old/default image after redeploy | Facebook/LinkedIn cache | Re-run the respective debugger to force a re-fetch. |
| `cf-cache-status: HIT` on stale `/robots.txt` | Cloudflare edge cache | Purge cache for the specific URL. |
| `noindex` showing up on pages that should be indexed | A `metadata.robots.index = false` somewhere up the layout chain | Search the codebase for `noIndex` and confirm only intentional pages have it. |
| Schema validator complains about missing required field | JSON-LD builder didn't receive the data | Check the frontmatter has the field; check the builder passes it through. |

---

## 12. What NOT to do (common mistakes)

- ❌ **Don't repeatedly request indexing** for the same URL. Once is enough.
- ❌ **Don't submit sitemap multiple times** in GSC. Submit once, leave it; Google re-fetches it automatically.
- ❌ **Don't add `noindex` "just in case"** to staging pages on the production property — they'll then live there forever in GSC's memory.
- ❌ **Don't expect ranking changes in week 1.** The discovery → crawl → index → rank pipeline takes 4–12 weeks for a fresh site.
- ❌ **Don't manually tweak `robots.txt` to block specific bots** unless you have a reason. The default is permissive — that's correct for most public sites.
- ❌ **Don't change canonical URLs after submission.** Pick the canonical form (with or without `www`, trailing slash or not) on day 1 and stick with it.
- ❌ **Don't disable JavaScript** thinking it helps SEO. Modern Google renders JS. The issue isn't JS — it's whether the SSR HTML is complete (it is, in App Router by default).

---

## 13. URL Inspection — what to paste cheat sheet

```
✅ https://example.com/                              ← homepage
✅ https://example.com/articles/my-article-slug      ← detail page
✅ https://example.com/articles                      ← listing
✅ https://example.com/about                         ← important static
❌ example.com                                       ← missing scheme
❌ https://example.com/articles/my-article-slug/     ← trailing slash if not canonical
❌ /articles/my-article-slug                         ← relative
❌ https://example.com/articles?page=2               ← pagination — sitemap handles it
❌ https://example.com/home                          ← noindex by design
❌ https://example.com/articles/my-article-slug#section   ← anchors are pointless
```

---

## 14. Quick-start (30-minute version)

If you only have 30 minutes today:

1. **Confirm endpoints live** (smoke tests above) — 5 min
2. **GSC verification + sitemap submit** — 15 min
3. **One Rich Results Test on a detail URL** — 5 min
4. **One Facebook + Twitter card test on the same URL** — 5 min

Everything else can wait a week without losing SEO value.

---

## Project-specific notes

> When you reuse this playbook on a new project, fill these in:

| Field | Value for this project |
| --- | --- |
| Domain | `https://kohamar.aradhanaplatform.com` |
| Verified in GSC on | _yyyy-mm-dd_ |
| Sitemap URL | `https://kohamar.aradhanaplatform.com/sitemap.xml` |
| Sitemap submitted on | _yyyy-mm-dd_ |
| Bing Webmaster verified on | _yyyy-mm-dd_ |
| First Rich Results Test passed | _yyyy-mm-dd_ |
| Performance baseline (LCP/CLS/INP mobile) | _set after PSI run_ |
| Vercel Speed Insights enabled | _yes/no_ |
| Cloudflare proxy state | _grey (DNS only)_ |
| Google Scholar inclusion submitted | _yyyy-mm-dd or N/A_ |
