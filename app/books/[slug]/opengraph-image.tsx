import { getBookBySlug } from "../../../lib/books";
import { siteConfig } from "../../../lib/seo/config";
import { renderDetailOg, OG_SIZE } from "../../../lib/seo/og";

export const runtime = "nodejs";
export const alt = "Kohamar book";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function BookOgImage({
  params,
}: {
  params: { slug: string };
}) {
  let title: string = "Book";
  let author: string = siteConfig.author.name;
  let category: string = "Book";
  const book = getBookBySlug(params.slug);
  if (book) {
    title = book.frontmatter.title || title;
    author = book.frontmatter.author || author;
    category = book.frontmatter.category || category;
  }

  return renderDetailOg({
    eyebrow: category,
    title,
    byline: `by ${author}`,
  });
}
