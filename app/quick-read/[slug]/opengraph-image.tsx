import { getQuickReadPostBySlug } from "../../../lib/quickread";
import { siteConfig } from "../../../lib/seo/config";
import { renderDetailOg, OG_SIZE } from "../../../lib/seo/og";

export const runtime = "nodejs";
export const alt = "Kohamar quick read";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function QuickReadOgImage({
  params,
}: {
  params: { slug: string };
}) {
  let title: string = "Quick Read";
  let author: string = siteConfig.author.name;
  let category: string = "Quick Read";
  try {
    const qr = getQuickReadPostBySlug(params.slug);
    const fm = qr.frontmatter as Record<string, string | undefined>;
    title = fm.title || title;
    author = fm.author || author;
    category = fm.category || category;
  } catch {
    // Fallback
  }

  return renderDetailOg({
    eyebrow: category,
    title,
    byline: author ? `by ${author}` : undefined,
  });
}
