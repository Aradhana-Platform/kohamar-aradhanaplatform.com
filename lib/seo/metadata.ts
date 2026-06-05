import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "./config";

type OgType = "website" | "article" | "book" | "profile" | "music.song";

export interface BuildMetadataInput {
  title: string;
  description?: string;
  path: string;
  image?: string | null;
  type?: OgType;
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

function safeDescription(input?: string): string {
  const fallback = siteConfig.description;
  const value = (input ?? fallback).replace(/\s+/g, " ").trim();
  if (value.length <= 300) return value;
  return value.slice(0, 297) + "...";
}

function resolveImage(image?: string | null): string {
  if (!image) return absoluteUrl(siteConfig.defaultOgImage);
  if (/^https?:\/\//i.test(image)) return image;
  return absoluteUrl(image);
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const {
    title,
    description,
    path,
    image,
    type = "website",
    noIndex,
    keywords,
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags,
    other,
    canonical,
  } = input;

  const desc = safeDescription(description);
  const imageUrl = resolveImage(image);
  const url = absoluteUrl(canonical ?? path);

  const metadata: Metadata = {
    title,
    description: desc,
    keywords: keywords && keywords.length ? keywords : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: type === "music.song" ? "website" : type,
      url,
      title,
      description: desc,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors,
            section,
            tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [imageUrl],
      ...(siteConfig.twitter.site ? { site: siteConfig.twitter.site } : {}),
      ...(siteConfig.twitter.handle
        ? { creator: siteConfig.twitter.handle }
        : {}),
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
          googleBot: { index: false, follow: true },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    other,
  };

  return metadata;
}

export function buildScholarMeta(args: {
  title: string;
  authors: string[];
  publishedDate?: string;
  abstract?: string;
  pdfUrl?: string;
  onlineDate?: string;
}): Record<string, string | string[]> {
  const out: Record<string, string | string[]> = {};
  out["citation_title"] = args.title;
  if (args.authors.length) {
    out["citation_author"] = args.authors;
  }
  if (args.publishedDate) {
    out["citation_publication_date"] = args.publishedDate;
    out["citation_date"] = args.publishedDate;
  }
  if (args.onlineDate) {
    out["citation_online_date"] = args.onlineDate;
  }
  if (args.abstract) {
    out["citation_abstract"] = args.abstract;
  }
  if (args.pdfUrl) {
    out["citation_pdf_url"] = args.pdfUrl;
  }
  return out;
}
