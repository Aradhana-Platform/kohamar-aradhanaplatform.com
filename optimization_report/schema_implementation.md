# Structured Data (JSON-LD) Implementation

All JSON-LD is produced by typed builders in [lib/seo/jsonld.ts](../lib/seo/jsonld.ts)
and injected by [Components/seo/JsonLd.tsx](../Components/seo/JsonLd.tsx). Each
payload is filtered with `pruneLd()` before serialisation, so empty/undefined
fields never reach the validator.

---

## 1. Schema deployment map

| Schema type | Route(s) where it appears | Source builder |
| --- | --- | --- |
| `Organization` | All routes (injected in root layout) | `organizationLd()` |
| `WebSite` (with `SearchAction`) | All routes (root layout) | `websiteLd()` |
| `BreadcrumbList` | `/about`, `/articles`, `/articles/[slug]`, `/books`, `/books/[slug]`, `/magazines`, `/magazines/[slug]`, `/quick-read`, `/quick-read/[slug]`, `/songs`, `/songs/[slug]` | `breadcrumbLd()` |
| `CollectionPage` (with `ItemList`) | `/articles`, `/books`, `/magazines`, `/quick-read`, `/songs` | `collectionPageLd()` |
| `ScholarlyArticle` | `/articles/[slug]` | `articleLd({ type: "ScholarlyArticle" })` |
| `Article` | `/magazines/[slug]`, `/quick-read/[slug]` | `articleLd({ type: "Article" })` |
| `Book` | `/books/[slug]` | `bookLd()` |
| `MusicRecording` | `/songs/[slug]` | `musicRecordingLd()` |
| `Person` | `/about` | `personLd()` |

## 2. Field policy per schema

### Organization
- `@id`: `<siteUrl>#organization` — used as a join key by other nodes (`publisher`, etc.).
- `name`, `legalName`, `url`, `logo`, `sameAs`.

### WebSite
- `@id`: `<siteUrl>#website`.
- `potentialAction`: `SearchAction` pointing at `/articles?q={search_term_string}`.

### Article / ScholarlyArticle
- `mainEntityOfPage`, `headline`, `description`, `image`, `datePublished`, `dateModified`, `author { Person }`, `publisher { Organization with logo }`, `articleSection`, `keywords`, `inLanguage`.
- Headline preserves frontmatter title verbatim.
- Uses `articleSection` for category.
- `dateModified` falls back to `datePublished` when missing.

### Book
- `name`, `description`, `image`, `url`, `inLanguage`, `isbn` (when present in frontmatter), `bookFormat` (when set), `datePublished`, `genre`, `author { Person }`, `publisher { Organization }`, `offers { Offer with url + price + priceCurrency + availability }`.
- Offer is only emitted when `frontmatter.booklinks` is present.
- Price currency is `USD` if the price string starts with `$`, otherwise omitted (no guessing).

### MusicRecording
- `name`, `url`, `duration`, `genre`, `image`, `byArtist { MusicGroup }`, `inAlbum`, `associatedMedia { VideoObject contentUrl }`.

### BreadcrumbList
- 1-indexed `itemListElement`, each `ListItem` with `name`, `item`.

### CollectionPage
- `name`, `description`, `inLanguage`, `isPartOf { @id: WebSite }`, `mainEntity { ItemList with numberOfItems + each ListItem name + url + image }`.

### Person
- Used on `/about` for the author. `jobTitle` and `sameAs` are populated from `siteConfig.author`.

## 3. Google Scholar `citation_*` meta tags

Implemented via [lib/seo/metadata.ts](../lib/seo/metadata.ts) `buildScholarMeta()` and applied on:

- `/articles/[slug]` (every article)
- `/magazines/[slug]` (every magazine essay)

Fields emitted:

- `citation_title`
- `citation_author` (array — Scholar accepts multiple)
- `citation_publication_date`
- `citation_date` (compatibility)
- `citation_online_date` (when available)
- `citation_abstract`
- `citation_pdf_url` (when frontmatter exposes a PDF link in the future)

Live example, from `/articles/the-decalogic-theology-of-the-sabbath`:

```
<meta name="citation_title" content="The Decalogic Theology of the Sabbath">
<meta name="citation_author" content="Amar Pandey">
<meta name="citation_publication_date" content="2026-03-26">
<meta name="citation_date" content="2026-03-26">
<meta name="citation_abstract" content="An exploration of the rationale and purpose of the Sabbath commandment in the Decalogue.">
```

## 4. Validation procedure

For each schema-bearing route:

1. Visit the route in a browser.
2. View source and confirm one or more `<script type="application/ld+json">` blocks.
3. Copy the payload into [Schema.org's Schema Markup Validator](https://validator.schema.org/).
4. Copy the URL into [Google's Rich Results Test](https://search.google.com/test/rich-results).
5. For article routes, also confirm `citation_*` meta tags appear in the head.

## 5. Why `Article` for magazines and quick-reads (not `ScholarlyArticle`)

`ScholarlyArticle` is reserved for academic articles with explicit
scholarly metadata (peer review, citation, etc.). Magazines and quick-reads
are editorial in form, so they declare the more general `Article` type to
avoid misrepresenting their nature. Articles in `content/articles/` are
scholarly in nature (Amar Pandey's academic work), so they justify the
stronger type.

## 6. Why `MusicRecording` for songs

`MusicRecording` is the correct Schema.org type for an individual song. The
`associatedMedia` field is used to attach the YouTube video URL as a
`VideoObject`. We do **not** emit `VideoObject` as the top-level type because
the canonical entity is the song, not the video.

## 7. Why `CollectionPage` + nested `ItemList`

Listing pages (`/articles`, `/books`, etc.) are best described as
`CollectionPage` with a nested `ItemList` of their items. Google uses this to
understand category-style pages and may show enhanced listing previews.

## 8. Schema validation safety net

[lib/seo/jsonld.ts](../lib/seo/jsonld.ts) provides `pruneLd()`, a recursive
function that removes `undefined`, `null`, empty arrays, and empty objects.
This keeps emitted JSON valid for validators that complain about empty
strings or null fields (e.g. `"image": []` or `"author": null`).

## 9. Extending the schema

To add a new type, add a builder to [lib/seo/jsonld.ts](../lib/seo/jsonld.ts)
that returns a typed `Json` record, then inject it on the relevant route:

```tsx
import { JsonLd } from "../../Components/seo/JsonLd";
import { myNewLd } from "../../lib/seo/jsonld";

<JsonLd id="ld-mything" data={myNewLd({ ... })} />
```

Always pass an `id` so React's hydration is stable.
