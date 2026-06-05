import { NextResponse } from "next/server";
import { getAllPosts as getAllArticles } from "../../lib/posts";
import { getAllPosts as getAllMagazines } from "../../lib/magazine";
import { getAllQuickReadPosts } from "../../lib/quickread";
import { buildRss, type RssItem } from "../../lib/seo/rss";

export const dynamic = "force-static";
export const revalidate = 3600;

function safeList<T>(fn: () => T[]): T[] {
  try {
    return fn() ?? [];
  } catch {
    return [];
  }
}

export async function GET() {
  const articles: RssItem[] = safeList(() => getAllArticles()).map((p) => ({
    title: p.title ?? p.slug,
    url: `/articles/${p.slug}`,
    description: p.description,
    pubDate: p.date,
    author: p.author,
    category: p.category,
  }));

  const magazines: RssItem[] = safeList(() => getAllMagazines()).map((p) => ({
    title: p.title ?? p.slug,
    url: `/magazines/${p.slug}`,
    description: p.description,
    pubDate: p.date,
    author: p.author,
    category: p.category,
  }));

  const quickReads: RssItem[] = safeList(() => getAllQuickReadPosts()).map(
    (p) => ({
      title: p.title ?? p.slug,
      url: `/quick-read/${p.slug}`,
      description: p.description,
      pubDate: p.date,
      author: p.author,
      category: p.category,
    }),
  );

  const all = [...articles, ...magazines, ...quickReads].sort((a, b) => {
    const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return db - da;
  });

  const xml = buildRss(all);

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
