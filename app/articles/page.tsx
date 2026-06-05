import type { Metadata } from "next";
import { getAllPosts } from "../../lib/posts";
import ArticlesClient from "./ArticlesClient";
import { buildMetadata } from "../../lib/seo/metadata";
import { JsonLd } from "../../Components/seo/JsonLd";
import { breadcrumbLd, collectionPageLd } from "../../lib/seo/jsonld";
import { absoluteUrl, siteConfig } from "../../lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Articles",
  description:
    "Peer-style theological articles and biblical studies by Amar Pandey — covering exegesis, Old Testament, New Testament, ethics, and Christian living.",
  path: "/articles",
  keywords: [
    "theological articles",
    "biblical studies",
    "Amar Pandey articles",
    "exegesis",
    "scriptural reflection",
  ],
});

export default function AllArticles() {
  const posts = getAllPosts();

  const items = posts.map((p) => ({
    name: p.title ?? p.slug,
    url: absoluteUrl(`/articles/${p.slug}`),
    image: p.image,
  }));

  return (
    <>
      <JsonLd
        id="ld-articles-breadcrumb"
        data={breadcrumbLd([
          { name: "Home", url: siteConfig.url },
          { name: "Articles", url: absoluteUrl("/articles") },
        ])}
      />
      <JsonLd
        id="ld-articles-collection"
        data={collectionPageLd({
          url: absoluteUrl("/articles"),
          name: "Articles",
          description: "Theological and biblical articles by Amar Pandey.",
          items,
        })}
      />
      <ArticlesClient posts={posts} />
    </>
  );
}
