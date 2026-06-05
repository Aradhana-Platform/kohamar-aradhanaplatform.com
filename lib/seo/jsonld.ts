import { siteConfig, absoluteUrl } from "./config";

type Json = Record<string, unknown>;

export function organizationLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.organization.name,
    legalName: siteConfig.organization.legalName,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.organization.logo),
    sameAs: [siteConfig.organization.url].filter(Boolean),
  };
}

export function websiteLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.defaultLocale,
    publisher: { "@id": `${siteConfig.url}#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/articles?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function personLd(name: string, opts?: { jobTitle?: string; sameAs?: string[] }): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: opts?.jobTitle,
    sameAs: opts?.sameAs,
  };
}

export interface ArticleLdInput {
  type?: "Article" | "ScholarlyArticle" | "BlogPosting";
  url: string;
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author: string;
  section?: string;
  keywords?: string[];
}

export function articleLd(input: ArticleLdInput): Json {
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": input.url,
    },
    headline: input.headline,
    description: input.description,
    image: input.image ? [input.image] : undefined,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: {
      "@type": "Person",
      name: input.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.organization.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.organization.logo),
      },
    },
    articleSection: input.section,
    keywords: input.keywords?.join(", "),
    inLanguage: siteConfig.defaultLocale,
  };
}

export interface BookLdInput {
  url: string;
  name: string;
  description?: string;
  image?: string;
  author: string;
  datePublished?: string;
  inLanguage?: string;
  isbn?: string;
  bookFormat?: "EBook" | "Hardcover" | "Paperback" | "AudiobookFormat";
  offersUrl?: string;
  price?: string;
  priceCurrency?: string;
  genre?: string;
}

export function bookLd(input: BookLdInput): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: input.name,
    description: input.description,
    image: input.image,
    url: input.url,
    inLanguage: input.inLanguage ?? siteConfig.defaultLocale,
    isbn: input.isbn,
    bookFormat: input.bookFormat ? `https://schema.org/${input.bookFormat}` : undefined,
    datePublished: input.datePublished,
    genre: input.genre,
    author: {
      "@type": "Person",
      name: input.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.organization.name,
    },
    offers: input.offersUrl
      ? {
          "@type": "Offer",
          url: input.offersUrl,
          price: input.price,
          priceCurrency: input.priceCurrency ?? "USD",
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function musicRecordingLd(input: {
  url: string;
  name: string;
  byArtist: string;
  duration?: string;
  inAlbum?: string;
  genre?: string;
  thumbnail?: string;
  videoUrl?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: input.name,
    url: input.url,
    duration: input.duration,
    genre: input.genre,
    image: input.thumbnail,
    byArtist: {
      "@type": "MusicGroup",
      name: input.byArtist,
    },
    inAlbum: input.inAlbum,
    associatedMedia: input.videoUrl
      ? {
          "@type": "VideoObject",
          contentUrl: input.videoUrl,
        }
      : undefined,
  };
}

export function collectionPageLd(input: {
  url: string;
  name: string;
  description: string;
  items: { url: string; name: string; image?: string }[];
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: input.url,
    name: input.name,
    description: input.description,
    inLanguage: siteConfig.defaultLocale,
    isPartOf: { "@id": `${siteConfig.url}#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: input.items.length,
      itemListElement: input.items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        url: it.url,
        image: it.image,
      })),
    },
  };
}

export function pruneLd<T extends Json>(obj: T): T {
  const out: Json = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v)) {
      const filtered = v.filter((x) => x !== undefined && x !== null);
      if (filtered.length) out[k] = filtered;
      continue;
    }
    if (typeof v === "object") {
      const inner = pruneLd(v as Json);
      if (Object.keys(inner).length) out[k] = inner;
      continue;
    }
    out[k] = v;
  }
  return out as T;
}
