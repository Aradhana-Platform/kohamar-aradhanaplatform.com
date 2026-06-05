import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "../lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Page not found",
  description:
    "The page you are looking for does not exist or has been moved.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px 24px",
        textAlign: "center",
        fontFamily: "Georgia, 'Times New Roman', serif",
        color: "#0f172a",
      }}
    >
      <p
        style={{
          fontSize: 14,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#b45309",
          marginBottom: 16,
        }}
      >
        404 — Not Found
      </p>
      <h1
        style={{
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.15,
          margin: 0,
          maxWidth: 720,
        }}
      >
        We could not find that page.
      </h1>
      <p
        style={{
          marginTop: 16,
          color: "#475569",
          fontSize: 18,
          maxWidth: 560,
        }}
      >
        The link may be broken, or the page may have moved. Try one of the
        sections below.
      </p>
      <nav
        style={{
          marginTop: 32,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "center",
        }}
      >
        <Link
          href="/"
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            background: "#0f172a",
            color: "#fff",
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          Home
        </Link>
        <Link
          href="/articles"
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            background: "#f1f5f9",
            color: "#0f172a",
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          Articles
        </Link>
        <Link
          href="/books"
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            background: "#f1f5f9",
            color: "#0f172a",
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          Books
        </Link>
        <Link
          href="/magazines"
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            background: "#f1f5f9",
            color: "#0f172a",
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          Magazines
        </Link>
        <Link
          href="/quick-read"
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            background: "#f1f5f9",
            color: "#0f172a",
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          Quick Reads
        </Link>
      </nav>
    </main>
  );
}
