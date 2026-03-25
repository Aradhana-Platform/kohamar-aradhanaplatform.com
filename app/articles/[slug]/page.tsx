import { getPostBySlug } from "../../../lib/posts";
import { MDXRemote } from 'next-mdx-remote/rsc';
import ShareSidebar from "../../../Components/ShareSidebar";
import {
    BackButton,
    CategoryBadge,
    MetaItem,
    HeroImage,
    PullQuote,
    User,
    Calendar,
    Clock,
    C
} from "../../../Components/ArticleUI";
import { EnterMdxComponent } from "../../../Components/mdx-components/EnterMdxComponent";

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    // console.log('slug = ' + slug);
    const post = getPostBySlug(slug);

    // Fallback constants if frontmatter is missing
    const category = post.frontmatter.category || "General";
    const title = post.frontmatter.title || "Untitled Article";
    const author = post.frontmatter.author || "Unknown Author";
    const date = post.frontmatter.date || "Unknown Date";
    const readTime = post.frontmatter.readTime || "5 min read";
    const image = post.frontmatter.image;


    // share btn:
    const linkUrl = `https://kohamar.aradhanaplatform.com/articles`;

    // const blog = post;
    const blogTitle = title;
    const blogUrl = `${ linkUrl }/${ slug }`;

    return (
        <div style={{
            minHeight: "100vh",
            background: C.offWhite,
            fontFamily: "Georgia, 'Times New Roman', serif",
            paddingBottom: 80,
        }}>
            {/* ── Header region ── */}
            <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
                <div style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "28px 6vw 32px",
                }}>
                    <div style={{ marginBottom: 20, paddingTop: 20 }}>
                        <BackButton />
                    </div>

                    <div style={{ marginBottom: 14 }}>
                        <CategoryBadge colorClassName={post.frontmatter.categoryColor}>{category}</CategoryBadge>
                    </div>

                    <h1 style={{
                        fontSize: "clamp(2rem, 5vw, 3.2rem)",
                        fontWeight: 300,
                        lineHeight: 1.15,
                        color: C.navy,
                        margin: "0 0 20px",
                        maxWidth: 920,
                        letterSpacing: "-0.01em",
                        fontFamily: "Georgia, 'Times New Roman', serif",
                    }}>
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
            <div className="mx-auto max-w-[1400px] md:max-w-[1200px] grid grid-cols-[10px_1fr] md:grid-cols-[80px_1fr] gap-13 md:gap-12 px-[3vw] md:px-[6vw] pt-12">
                {/* left sidebar – share */}
                <div>
                    <ShareSidebar url={blogUrl} blogTitle={blogTitle} />
                </div>


                {/* main content column */}
                <div className="prose prose-lg prose-slate max-w-none">
                    <MDXRemote source={post.content} components={{ ...EnterMdxComponent }} />
                </div>
            </div>
        </div>
    );
}
