import { siteConfig, absoluteUrl } from "./config";

export interface RssItem {
  title: string;
  url: string;
  description?: string;
  pubDate?: string;
  author?: string;
  category?: string;
  guid?: string;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function safeDate(input?: string): string {
  if (!input) return new Date().toUTCString();
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
}

export function buildRss(items: RssItem[]): string {
  const feedUrl = absoluteUrl("/rss.xml");
  const lastBuildDate = new Date().toUTCString();

  const itemsXml = items
    .map((item) => {
      const link = absoluteUrl(item.url);
      const guid = item.guid ? escapeXml(item.guid) : link;
      const desc = item.description ? escapeXml(item.description) : "";
      const cat = item.category ? `<category>${escapeXml(item.category)}</category>` : "";
      const author = item.author ? `<dc:creator><![CDATA[${item.author}]]></dc:creator>` : "";
      return `    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${guid}</guid>
      <pubDate>${safeDate(item.pubDate)}</pubDate>
      ${author}
      ${cat}
      <description><![CDATA[${desc}]]></description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(siteConfig.fullName)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>${siteConfig.defaultLocale}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <generator>Next.js App Router</generator>
${itemsXml}
  </channel>
</rss>`;
}
