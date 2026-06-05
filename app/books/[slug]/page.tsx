import type { Metadata } from "next";
import { getAllBooks, getBookBySlug } from "../../../lib/books";
import BookDetailClient from "./BookDetailClient";
import { notFound } from "next/navigation";
import { buildMetadata } from "../../../lib/seo/metadata";
import { JsonLd } from "../../../Components/seo/JsonLd";
import { bookLd, breadcrumbLd } from "../../../lib/seo/jsonld";
import { absoluteUrl, siteConfig } from "../../../lib/seo/config";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    return getAllBooks().map((b) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const bookData = getBookBySlug(slug);
  if (!bookData) {
    return buildMetadata({
      title: "Book not found",
      description: "The requested book could not be found.",
      path: `/books/${slug}`,
      noIndex: true,
    });
  }
  const b = bookData.frontmatter;
  return buildMetadata({
    title: b.title,
    description: b.description,
    path: `/books/${slug}`,
    image: b.image,
    type: "book",
    keywords: [
      ...siteConfig.keywords,
      b.author,
      b.category,
      "book",
    ].filter(Boolean) as string[],
    authors: [b.author],
  });
}

export default async function BookDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const bookData = getBookBySlug(slug);

  if (!bookData) {
    notFound();
  }

  const b = bookData.frontmatter;
  const url = absoluteUrl(`/books/${slug}`);
  const image = b.image
    ? /^https?:\/\//i.test(b.image)
      ? b.image
      : absoluteUrl(b.image)
    : absoluteUrl(siteConfig.defaultOgImage);

  const priceMatch = typeof b.price === "string" ? b.price.match(/[\d.]+/) : null;
  const price = priceMatch ? priceMatch[0] : undefined;

  return (
    <>
      <JsonLd
        id="ld-book"
        data={bookLd({
          url,
          name: b.title,
          description: b.description,
          image,
          author: b.author,
          datePublished: typeof b.date === "string" ? b.date : undefined,
          genre: b.category,
          offersUrl: b.booklinks || undefined,
          price,
          priceCurrency: b.price?.startsWith("$") ? "USD" : undefined,
        })}
      />
      <JsonLd
        id="ld-book-breadcrumb"
        data={breadcrumbLd([
          { name: "Home", url: siteConfig.url },
          { name: "Books", url: absoluteUrl("/books") },
          { name: b.title, url },
        ])}
      />
      <BookDetailClient
        book={bookData.frontmatter}
        content={bookData.content}
      />
    </>
  );
}
