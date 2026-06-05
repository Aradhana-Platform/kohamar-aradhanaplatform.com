import { getMagazineBySlug } from "../../../lib/magazine";
import { siteConfig } from "../../../lib/seo/config";
import { renderDetailOg, OG_SIZE } from "../../../lib/seo/og";

export const runtime = "nodejs";
export const alt = "Kohamar magazine";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function MagazineOgImage({
  params,
}: {
  params: { slug: string };
}) {
  let title: string = "Magazine";
  let author: string = siteConfig.author.name;
  let category: string = "Magazine";
  try {
    const magazine = getMagazineBySlug(params.slug);
    const fm = magazine.frontmatter as Record<string, string | undefined>;
    title = fm.title || title;
    author = fm.author || author;
    category = fm.category || category;
  } catch {
    // Fallback
  }

  return renderDetailOg({
    eyebrow: category,
    title,
    byline: `by ${author}`,
  });
}
