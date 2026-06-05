import type { Metadata } from "next";
import { getAllQuickReadPosts } from "../../lib/quickread";
import { QuickRead } from "./QuickRead";
import { buildMetadata } from "../../lib/seo/metadata";
import { JsonLd } from "../../Components/seo/JsonLd";
import { breadcrumbLd, collectionPageLd } from "../../lib/seo/jsonld";
import { absoluteUrl, siteConfig } from "../../lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Quick Reads",
  description:
    "Short scriptural reflections and quick devotional reads from Kohamar.",
  path: "/quick-read",
  keywords: ["quick reads", "devotional", "scripture reflections", "Kohamar"],
});

export default function AllArticles() {
  const posts = getAllQuickReadPosts();

  return (
    <>
      <JsonLd
        id="ld-quickread-breadcrumb"
        data={breadcrumbLd([
          { name: "Home", url: siteConfig.url },
          { name: "Quick Reads", url: absoluteUrl("/quick-read") },
        ])}
      />
      <JsonLd
        id="ld-quickread-collection"
        data={collectionPageLd({
          url: absoluteUrl("/quick-read"),
          name: "Quick Reads",
          description: "Short scriptural reflections.",
          items: posts.map((p) => ({
            name: p.title ?? p.slug,
            url: absoluteUrl(`/quick-read/${p.slug}`),
            image: p.image,
          })),
        })}
      />
      <QuickRead posts={posts} />
    </>
  );
}
