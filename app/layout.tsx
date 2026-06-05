import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { siteConfig } from "../lib/seo/config";
import { JsonLd } from "../Components/seo/JsonLd";
import { organizationLd, websiteLd } from "../lib/seo/jsonld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.fullName,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  generator: "Next.js",
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  publisher: siteConfig.organization.name,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: "/rss.xml", title: `${siteConfig.name} — Articles & Magazines` },
      ],
    },
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.fullName,
    description: siteConfig.description,
    locale: siteConfig.locale,
    images: [
      {
        url: siteConfig.defaultOgImage,
        alt: siteConfig.fullName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.fullName,
    description: siteConfig.description,
    images: [siteConfig.defaultOgImage],
  },
  robots: {
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.jpg", type: "image/jpeg", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/logo.jpg", sizes: "180x180", type: "image/jpeg" }],
  },
  manifest: "/manifest.webmanifest",
  category: "Religion & Spirituality",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ geistSans.variable } ${ geistMono.variable } antialiased`}
      >
        <JsonLd id="ld-organization" data={organizationLd()} />
        <JsonLd id="ld-website" data={websiteLd()} />
        <Navbar />
        <div className="mt-12">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
