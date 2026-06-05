export const siteConfig = {
  url: "https://kohamar.aradhanaplatform.com",
  name: "Kohamar",
  fullName: "Kohamar — Thinking Scripturally",
  shortName: "KOHAMAR",
  tagline: "Engaging the Word and The World",
  description:
    "Kohamar is an academic and research platform by Rev. Amar Pandey publishing peer-style theological articles, biblical studies, magazines, books, songs and quick reads.",
  defaultLocale: "en",
  locale: "en_US",
  organization: {
    name: "Aradhana Platform",
    legalName: "Aradhana Platform",
    url: "https://aradhanaplatform.com",
    logo: "/logo.jpg",
  },
  author: {
    name: "Amar Pandey",
    alternateNames: ["Rev. Amar Pandey", "अमर पाण्डे"],
    jobTitle: "Academic Dean, Nepal Theological College",
    sameAs: [] as string[],
  },
  twitter: {
    handle: "" as string,
    site: "" as string,
  },
  defaultOgImage: "/logo.jpg",
  keywords: [
    "Amar Pandey",
    "Kohamar",
    "Aradhana Platform",
    "biblical studies",
    "theology",
    "Sabbath",
    "exegesis",
    "Old Testament",
    "New Testament",
    "Nepali theology",
    "Christian ministry",
    "scriptural reflection",
  ],
} as const;

export type SiteConfig = typeof siteConfig;

export const SITE_URL = siteConfig.url;

export function absoluteUrl(pathname: string): string {
  if (!pathname) return siteConfig.url;
  if (/^https?:\/\//i.test(pathname)) return pathname;
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteConfig.url}${path}`;
}
