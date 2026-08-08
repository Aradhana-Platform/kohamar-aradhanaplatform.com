import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllQuickReadPosts, getQuickReadPostBySlug } from "../../../lib/quickread";
import {
  BackButton,
  C,
  HeroImage,
} from "../../../Components/ArticleUI";
import { EnterMdxComponent } from "../../../Components/mdx-components/EnterMdxComponent";
import { buildMetadata } from "../../../lib/seo/metadata";
import { JsonLd } from "../../../Components/seo/JsonLd";
import { articleLd, breadcrumbLd } from "../../../lib/seo/jsonld";
import { absoluteUrl, siteConfig } from "../../../lib/seo/config";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    return getAllQuickReadPosts().map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let qr;
  try {
    qr = getQuickReadPostBySlug(slug);
  } catch {
    return buildMetadata({
      title: "Quick Read not found",
      description: "The requested quick read could not be found.",
      path: `/quick-read/${slug}`,
      noIndex: true,
    });
  }
  const fm = qr.frontmatter as Record<string, string | undefined>;
  const title = fm.title || "Quick Read";
  const description = fm.excerpt || fm.description || siteConfig.description;
  return buildMetadata({
    title,
    description,
    path: `/quick-read/${slug}`,
    image: fm.image,
    type: "article",
    publishedTime: fm.date,
    authors: [fm.author || siteConfig.author.name],
    section: fm.category,
    tags: fm.tag ? [fm.tag] : fm.category ? [fm.category] : undefined,
  });
}

export default async function QuickReadDetail({ params }: PageProps) {
  const { slug } = await params;
  const quickReadData = getQuickReadPostBySlug(slug);

  const title = quickReadData.frontmatter.title || "Untitled Article";
  const author = quickReadData.frontmatter.author || siteConfig.author.name;
  const date = quickReadData.frontmatter.date;
  const image = quickReadData.frontmatter.image;
  const category = quickReadData.frontmatter.category;
  const description =
    quickReadData.frontmatter.excerpt || quickReadData.frontmatter.description;
  const url = absoluteUrl(`/quick-read/${slug}`);
  const ogImage = image
    ? /^https?:\/\//i.test(image)
      ? image
      : absoluteUrl(image)
    : absoluteUrl(siteConfig.defaultOgImage);

  return (
    <div className="">
      <JsonLd
        id="ld-quickread"
        data={articleLd({
          type: "Article",
          url,
          headline: title,
          description,
          image: ogImage,
          datePublished: date,
          author,
          section: category,
        })}
      />
      <JsonLd
        id="ld-quickread-detail-breadcrumb"
        data={breadcrumbLd([
          { name: "Home", url: siteConfig.url },
          { name: "Quick Reads", url: absoluteUrl("/quick-read") },
          { name: title, url },
        ])}
      />
      <div
        style={{
          minHeight: "100vh",
          background: C.offWhite,
          fontFamily: "Georgia, 'Times New Roman', serif",
          paddingBottom: 80,
        }}
      >
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
              <BackButton backprops={{ path: "/quick-read" }} />
            </div>

            <div style={{ marginBottom: 14 }}>
              {/* <CategoryBadge colorClassName={quickReadData.frontmatter.categoryColor}>{category}</CategoryBadge> */}
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
            >
              {title}
            </h1>
          </div>
        </div>

        {/* ── Hero image ── */}
        <div style={{ padding: "48px 6vw 0" }}>
          <HeroImage src={image} />
        </div>

        {/* ── Article body grid (content + sidebar) ── */}
        <div className="mx-auto max-w-350 md:max-w-300 px-[4vw] md:px-[6vw] pt-12">
          {/* main content column */}
          <div className="prose prose-lg prose-slate max-w-none">
            <MDXRemote
              source={quickReadData.content}
              components={{ ...EnterMdxComponent }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// .............................................
// import { getPostBySlug } from "../../../lib/posts";
// import { getQuickReadPostBySlug } from "../../../lib/quickread";
// import { MDXRemote } from 'next-mdx-remote/rsc';
// import ShareSidebar from "../../../Components/ShareSidebar";
// import {
//     BackButton,
//     CategoryBadge,
//     MetaItem,
//     HeroImage,
//     PullQuote,
//     User,
//     Calendar,
//     Clock,
//     C
// } from "../../../Components/ArticleUI";
// import { EnterMdxComponent } from "../../../Components/mdx-components/EnterMdxComponent";

// export default async function QuickReadDetail({ params }: { params: Promise<{ slug: string }> }) {
//     const slug = (await params).slug;
//     // console.log('slug = ' + slug);
//     const post = getQuickReadPostBySlug(slug);

//     // Fallback constants if frontmatter is missing
//     const category = post.frontmatter.category || "General";
//     const title = post.frontmatter.title || "Untitled Article";
//     const author = post.frontmatter.author || "Unknown Author";
//     const date = post.frontmatter.date || "Unknown Date";
//     const readTime = post.frontmatter.readTime || "5 min read";
//     const image = post.frontmatter.image;

//     // share btn:
//     const linkUrl = `https://kohamar.aradhanaplatform.com/articles`;

//     // const blog = post;
//     const blogTitle = title;
//     const blogUrl = `${ linkUrl }/${ slug }`;

//     return (
//         <div style={{
//             minHeight: "100vh",
//             background: C.offWhite,
//             fontFamily: "Georgia, 'Times New Roman', serif",
//             paddingBottom: 80,
//         }}>
//             {/* ── Header region ── */}
//             <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
//                 <div style={{
//                     maxWidth: 1200,
//                     margin: "0 auto",
//                     padding: "28px 6vw 32px",
//                 }}>
//                     <div style={{ marginBottom: 20, paddingTop: 20 }}>
//                         <BackButton />
//                     </div>

//                     <div style={{ marginBottom: 14 }}>
//                         <CategoryBadge colorClassName={post.frontmatter.categoryColor}>{category}</CategoryBadge>
//                     </div>

//                     <h1 style={{
//                         fontSize: "clamp(2rem, 5vw, 3.2rem)",
//                         fontWeight: 300,
//                         lineHeight: 1.15,
//                         color: C.navy,
//                         margin: "0 0 20px",
//                         maxWidth: 920,
//                         letterSpacing: "-0.01em",
//                         fontFamily: "Georgia, 'Times New Roman', serif",
//                     }}>
//                         {title}
//                     </h1>

//                     <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
//                         <MetaItem icon={User}>{author}</MetaItem>
//                         <MetaItem icon={Calendar}>{date}</MetaItem>
//                         <MetaItem icon={Clock}>{readTime}</MetaItem>
//                     </div>
//                 </div>
//             </div>

//             {/* ── Hero image ── */}
//             <div style={{ padding: "48px 6vw 0" }}>
//                 <HeroImage src={image} />
//             </div>

//             {/* ── Article body grid (content + sidebar) ── */}
//             <div className="mx-auto max-w-[1400px] md:max-w-[1200px] grid grid-cols-[10px_1fr] md:grid-cols-[80px_1fr] gap-13 md:gap-12 px-[3vw] md:px-[6vw] pt-12">
//                 {/* left sidebar – share */}
//                 <div>
//                     <ShareSidebar url={blogUrl} blogTitle={blogTitle} />
//                 </div>

//                 {/* main content column */}
//                 <div className="prose prose-lg prose-slate max-w-none">
//                     <MDXRemote source={post.content} components={{ ...EnterMdxComponent }} />
//                 </div>
//             </div>
//         </div>
//     );
// }
