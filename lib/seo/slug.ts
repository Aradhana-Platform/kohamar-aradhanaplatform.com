const RESERVED = new Set([
  "api",
  "_next",
  "robots.txt",
  "sitemap.xml",
  "rss.xml",
  "manifest.webmanifest",
  "favicon.ico",
]);

export function normalizeSlug(input: string): string {
  if (!input) return "";
  let s = input.toString();

  try {
    s = s.normalize("NFKD").replace(/[̀-ͯ]/g, "");
  } catch {
    // normalize may throw on invalid input; safe to skip
  }

  s = s.toLowerCase();
  s = s.replace(/&/g, " and ");
  s = s.replace(/[^a-z0-9\s-]/g, "");
  s = s.replace(/\s+/g, "-");
  s = s.replace(/-+/g, "-");
  s = s.replace(/^-+|-+$/g, "");

  if (s.length > 80) {
    s = s.slice(0, 80).replace(/-+$/g, "");
  }

  if (RESERVED.has(s)) {
    s = `${s}-page`;
  }

  return s;
}

export function isCanonicalSlug(input: string): boolean {
  return input === normalizeSlug(input);
}
