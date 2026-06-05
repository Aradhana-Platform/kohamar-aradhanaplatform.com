import type { MetadataRoute } from "next";
import { absoluteUrl } from "../lib/seo/config";
import { getAllPosts as getAllArticles } from "../lib/posts";
import { getAllPosts as getAllMagazines } from "../lib/magazine";
import { getAllBooks } from "../lib/books";
import { getAllQuickReadPosts } from "../lib/quickread";
import { getAllSongs } from "../lib/songs";

type SitemapEntry = MetadataRoute.Sitemap[number];

function safeDate(input: unknown): Date | undefined {
  if (!input || typeof input !== "string") return undefined;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return undefined;
  return d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: SitemapEntry[] = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/articles"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/magazines"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/books"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/quick-read"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/songs"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const articleEntries: SitemapEntry[] = safeList(() => getAllArticles()).map(
    (post) => ({
      url: absoluteUrl(`/articles/${post.slug}`),
      lastModified: safeDate(post.date) ?? now,
      changeFrequency: "yearly",
      priority: 0.85,
    }),
  );

  const magazineEntries: SitemapEntry[] = safeList(() => getAllMagazines()).map(
    (post) => ({
      url: absoluteUrl(`/magazines/${post.slug}`),
      lastModified: safeDate(post.date) ?? now,
      changeFrequency: "yearly",
      priority: 0.75,
    }),
  );

  const bookEntries: SitemapEntry[] = safeList(() => getAllBooks()).map(
    (book) => ({
      url: absoluteUrl(`/books/${book.slug}`),
      lastModified: safeDate(book.date) ?? now,
      changeFrequency: "yearly",
      priority: 0.75,
    }),
  );

  const quickReadEntries: SitemapEntry[] = safeList(() =>
    getAllQuickReadPosts(),
  ).map((post) => ({
    url: absoluteUrl(`/quick-read/${post.slug}`),
    lastModified: safeDate(post.date) ?? now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const songEntries: SitemapEntry[] = safeList(() => getAllSongs()).map(
    (song) => ({
      url: absoluteUrl(`/songs/${song.slug}`),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.55,
    }),
  );

  return [
    ...staticEntries,
    ...articleEntries,
    ...magazineEntries,
    ...bookEntries,
    ...quickReadEntries,
    ...songEntries,
  ];
}

function safeList<T>(fn: () => T[]): T[] {
  try {
    return fn() ?? [];
  } catch {
    return [];
  }
}
