
import { getPostBySlug } from "../../../lib/posts";
import ReactMarkdown from "react-markdown";
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

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    // Fallback constants if frontmatter is missing
    const category = post.frontmatter.category || "General";
    const title = post.frontmatter.title || "Untitled Article";
    const author = post.frontmatter.author || "Unknown Author";
    const date = post.frontmatter.date || "Unknown Date";
    const readTime = post.frontmatter.readTime || "5 min read";
    const image = post.frontmatter.image;

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
                    <div style={{ marginBottom: 20 }}>
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
                    <ShareSidebar />
                </div>

                {/* main content column */}
                <div className="md:max-w-[900] text-justify prose prose-lg prose-slate max-w-none">
                    {post.frontmatter.description && (
                        <PullQuote>{post.frontmatter.description}</PullQuote>
                    )}
                    <ReactMarkdown
                        components={{
                            // Custom components mapping if needed, e.g. for images or custom styles
                            // h1: ({node, ...props}) => <h1 style={{...}} {...props} />,
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
