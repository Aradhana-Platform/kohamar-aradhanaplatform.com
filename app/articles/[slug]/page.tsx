import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "../../../lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import ShareSidebar from "../../../Components/ShareSidebar";
import {
  BackButton,
  CategoryBadge,
  MetaItem,
  HeroImage,
  User,
  Calendar,
  Clock,
  C,
} from "../../../Components/ArticleUI";
import { EnterMdxComponent } from "../../../Components/mdx-components/EnterMdxComponent";
import { buildMetadata, buildScholarMeta } from "../../../lib/seo/metadata";
import { JsonLd } from "../../../Components/seo/JsonLd";
import { articleLd, breadcrumbLd } from "../../../lib/seo/jsonld";
import { absoluteUrl, siteConfig } from "../../../lib/seo/config";

export async function generateStaticParams() {
  try {
    return getAllPosts().map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    return buildMetadata({
      title: "Article not found",
      description: "The requested article could not be found.",
      path: `/articles/${slug}`,
      noIndex: true,
    });
  }
  const fm = post.frontmatter as Record<string, string | undefined>;
  const title = fm.title || "Article";
  const description = fm.description || siteConfig.description;
  const image = fm.image;
  const author = fm.author || siteConfig.author.name;
  const date = fm.date;
  const category = fm.category;

  return buildMetadata({
    title,
    description,
    path: `/articles/${slug}`,
    image,
    type: "article",
    publishedTime: date,
    modifiedTime: date,
    authors: [author],
    section: category,
    tags: category ? [category] : undefined,
    keywords: [
      ...siteConfig.keywords,
      ...(category ? [category] : []),
      author,
    ],
    other: buildScholarMeta({
      title,
      authors: [author],
      publishedDate: date,
      abstract: description,
    }),
  });
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);

  const category = post.frontmatter.category || "General";
  const title = post.frontmatter.title || "Untitled Article";
  const author = post.frontmatter.author || "Unknown Author";
  const date = post.frontmatter.date || "Unknown Date";
  const readTime = post.frontmatter.readTime || "5 min read";
  const image = post.frontmatter.image;
  const description = post.frontmatter.description;

  const blogUrl = absoluteUrl(`/articles/${slug}`);
  const blogTitle = title;
  const ogImage = image
    ? /^https?:\/\//i.test(image)
      ? image
      : absoluteUrl(image)
    : absoluteUrl(siteConfig.defaultOgImage);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.offWhite,
        fontFamily: "Georgia, 'Times New Roman', serif",
        paddingBottom: 80,
      }}
    >
      <JsonLd
        id="ld-article"
        data={articleLd({
          type: "ScholarlyArticle",
          url: blogUrl,
          headline: title,
          description,
          image: ogImage,
          datePublished: date,
          author,
          section: category,
          keywords: category ? [category] : undefined,
        })}
      />
      <JsonLd
        id="ld-article-breadcrumb"
        data={breadcrumbLd([
          { name: "Home", url: siteConfig.url },
          { name: "Articles", url: absoluteUrl("/articles") },
          { name: title, url: blogUrl },
        ])}
      />
      {/* ── Header region ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "28px 6vw 32px",
          }}
        >
          <div style={{ marginBottom: 20, paddingTop: 20 }}>
            <BackButton backprops={{ path: "/articles" }} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <CategoryBadge colorClassName={post.frontmatter.categoryColor}>
              {category}
            </CategoryBadge>
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 300,
              lineHeight: 1.15,
              color: C.navy,
              margin: "0 0 20px",
              maxWidth: 920,
              letterSpacing: "-0.01em",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}

            className="italic"
          >
            {title}
          </h1>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            <MetaItem icon={User}>{author}</MetaItem>
            <MetaItem icon={Calendar}>{date}</MetaItem>
            <MetaItem icon={Clock}>{readTime}</MetaItem>
          </div>
        </div>
      </div>

      {/* ── Hero image ── */}
      <div style={{ padding: "48px 6vw 0" }}>
        <HeroImage src={image} />
      </div>

      {/* ── Article body grid (content + sidebar) ── */}
      <div className="mx-auto max-w-[1400px] md:max-w-[1200px] grid grid-cols-1 md:grid-cols-[80px_1fr] gap-13 md:gap-1 md:px-[6vw] pt-12">
        {/* left sidebar – share */}
        <div className="">
          <ShareSidebar url={blogUrl} blogTitle={blogTitle} />
        </div>

        {/* main content column */}
        <div className="prose prose-lg prose-slate max-w-none">
          <MDXRemote
            source={post.content}
            components={{ ...EnterMdxComponent }}
          />
        </div>
      </div>
    </div>
  );
}
