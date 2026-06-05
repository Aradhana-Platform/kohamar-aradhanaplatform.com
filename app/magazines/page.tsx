import React from "react";
import type { Metadata } from "next";
import MagazineCard from "../../Components/MagazineCard";
import { getAllPosts } from "../../lib/magazine";
import { buildMetadata } from "../../lib/seo/metadata";
import { JsonLd } from "../../Components/seo/JsonLd";
import { breadcrumbLd, collectionPageLd } from "../../lib/seo/jsonld";
import { absoluteUrl, siteConfig } from "../../lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Magazines",
  description:
    "Magazine-style theological essays and long-form reflections by Amar Pandey.",
  path: "/magazines",
  keywords: ["theology magazine", "Nepali theology", "biblical reflections"],
});

const page = () => {
  const posts = getAllPosts();
  return (
    <div>
      <JsonLd
        id="ld-magazines-breadcrumb"
        data={breadcrumbLd([
          { name: "Home", url: siteConfig.url },
          { name: "Magazines", url: absoluteUrl("/magazines") },
        ])}
      />
      <JsonLd
        id="ld-magazines-collection"
        data={collectionPageLd({
          url: absoluteUrl("/magazines"),
          name: "Magazines",
          description: "Magazine essays by Amar Pandey.",
          items: posts.map((p) => ({
            name: p.title ?? p.slug,
            url: absoluteUrl(`/magazines/${p.slug}`),
            image: p.image,
          })),
        })}
      />
      <MagazineCard magazines={posts} />
    </div>
  );
};

export default page;
