import React from "react";
import type { Metadata } from "next";
import { getAllBooks } from "../../lib/books";
import BooksClient from "./BooksClient";
import { buildMetadata } from "../../lib/seo/metadata";
import { JsonLd } from "../../Components/seo/JsonLd";
import { breadcrumbLd, collectionPageLd } from "../../lib/seo/jsonld";
import { absoluteUrl, siteConfig } from "../../lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Books",
  description:
    "Books by Amar Pandey on the Sabbath, Christian ministry, and Christian living — including To What End the Sabbath?, Understanding and Living the Sabbath, Understanding Christian Ministry, and Understanding Your Call.",
  path: "/books",
  keywords: [
    "Amar Pandey books",
    "Sabbath",
    "Christian ministry",
    "biblical studies books",
    "theology books",
  ],
});

export default async function BooksPage() {
  const books = getAllBooks();

  return (
    <>
      <JsonLd
        id="ld-books-breadcrumb"
        data={breadcrumbLd([
          { name: "Home", url: siteConfig.url },
          { name: "Books", url: absoluteUrl("/books") },
        ])}
      />
      <JsonLd
        id="ld-books-collection"
        data={collectionPageLd({
          url: absoluteUrl("/books"),
          name: "Books",
          description: "Books authored by Amar Pandey.",
          items: books.map((b) => ({
            name: b.title,
            url: absoluteUrl(`/books/${b.slug}`),
            image: b.image,
          })),
        })}
      />
      <BooksClient books={books} />
    </>
  );
}
