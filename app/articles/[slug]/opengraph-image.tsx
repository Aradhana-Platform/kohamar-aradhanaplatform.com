import { getPostBySlug } from "../../../lib/posts";
import { siteConfig } from "../../../lib/seo/config";
import { renderDetailOg, OG_SIZE } from "../../../lib/seo/og";

export const runtime = "nodejs";
export const alt = "Kohamar article";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function ArticleOgImage({
  params,
}: {
  params: { slug: string };
}) {
  let title: string = "Article";
  let author: string = siteConfig.author.name;
  let category: string = "";
  try {
    const post = getPostBySlug(params.slug);
    const fm = post.frontmatter as Record<string, string | undefined>;
    title = fm.title || title;
    author = fm.author || author;
    category = fm.category || "";
  } catch {
    // Fallback
  }

  return renderDetailOg({
    eyebrow: category || "Article",
    title,
    byline: `by ${author}`,
  });
}
