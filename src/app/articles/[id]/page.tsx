"use client";
import { useState } from "react";

/* ══════════════════════════════════════════════════════════════════════════════
   ICONS
   ══════════════════════════════════════════════════════════════════════════════ */
const ArrowLeft = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

const User = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const Calendar = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const Clock = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const Twitter = () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
);

const Facebook = () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

/* ══════════════════════════════════════════════════════════════════════════════
   THEME
   ══════════════════════════════════════════════════════════════════════════════ */
const C = {
    navy: "#1e2d44",
    burgundy: "#6b2c3b",
    gold: "#c9953a",
    gray400: "#9ca3af",
    gray600: "#4b5563",
    gray700: "#374151",
    gray800: "#1f2937",
    offWhite: "#f9fafb",
};

/* ══════════════════════════════════════════════════════════════════════════════
   ARTICLE DATA (mock)
   ══════════════════════════════════════════════════════════════════════════════ */
const article = {
    category: "Ethics",
    title: "Christian Ethics in the Digital Age",
    author: "Dr. Maria Santos",
    date: "January 25, 2026",
    readTime: "8 min read",
    pullQuote: "How do ancient moral principles apply to social media, AI, and the challenges of our connected world?",
    heroImageAlt: "Lady Justice bronze statue holding scales",
};

/* ══════════════════════════════════════════════════════════════════════════════
   COMPONENTS
   ══════════════════════════════════════════════════════════════════════════════ */

function BackButton() {
    return (
        <button style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "transparent", border: "none", cursor: "pointer",
            color: C.gray700, fontSize: "0.92rem", fontWeight: 500,
            padding: "6px 0", transition: "color 0.2s ease",
            fontFamily: "sans-serif",
        }}
            onMouseEnter={e => e.currentTarget.style.color = C.navy}
            onMouseLeave={e => e.currentTarget.style.color = C.gray700}
        >
            <ArrowLeft />
            <span>Back to Articles</span>
        </button>
    );
}

function CategoryBadge({ children }) {
    return (
        <span style={{
            display: "inline-block",
            background: C.burgundy,
            color: "#fff",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.03em",
            padding: "5px 14px",
            borderRadius: 6,
            fontFamily: "sans-serif",
        }}>
            {children}
        </span>
    );
}

function MetaItem({ icon: Icon, children }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.gray600, fontSize: "0.88rem", fontFamily: "sans-serif" }}>
            <Icon />
            <span>{children}</span>
        </div>
    );
}

function HeroImage() {
    /* Lady Justice statue placeholder — bronze gradient with sculpture silhouette hints */
    return (
        <div style={{
            width: "100%",
            maxWidth: 1100,
            margin: "0 auto",
            aspectRatio: "16 / 7.5",
            borderRadius: 16,
            overflow: "hidden",
            position: "relative",
            background: "linear-gradient(140deg, #8b7355 0%, #6b5545 25%, #4a3f38 50%, #3d3530 75%, #2d2622 100%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
        }}>
            {/* subtle vignette */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 55% 45%, transparent 20%, rgba(0,0,0,0.35) 100%)" }} />

            {/* statue silhouette hints (scales + figure) */}
            <div style={{ position: "absolute", top: "18%", right: "38%", width: "14%", height: "48%", opacity: 0.35 }}>
                {/* figure body */}
                <div style={{ position: "absolute", left: "38%", top: "22%", width: "24%", height: "62%", background: "linear-gradient(to bottom, #a89070 0%, #8b7355 100%)", borderRadius: "12px 12px 24px 24px" }} />
                {/* head */}
                <div style={{ position: "absolute", left: "40%", top: "8%", width: "20%", height: "18%", background: "#a89070", borderRadius: "50%" }} />
                {/* raised arm holding scales */}
                <div style={{ position: "absolute", left: "62%", top: "18%", width: "3px", height: "28%", background: "#8b7355", transformOrigin: "top", transform: "rotate(-35deg)" }} />
                {/* scales beam */}
                <div style={{ position: "absolute", right: "-18%", top: "35%", width: "40%", height: "2px", background: "#6b5545" }} />
                {/* left scale */}
                <div style={{ position: "absolute", right: "20%", top: "37%", width: "8px", height: "8px", borderRadius: "50% 50% 0 0", border: "2px solid #6b5545", borderBottom: "none" }} />
                {/* right scale */}
                <div style={{ position: "absolute", right: "-2%", top: "37%", width: "8px", height: "8px", borderRadius: "50% 50% 0 0", border: "2px solid #6b5545", borderBottom: "none" }} />
            </div>

            {/* subtle grain texture */}
            <div style={{
                position: "absolute", inset: 0, opacity: 0.08, pointerEvents: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }} />
        </div>
    );
}

function PullQuote({ children }) {
    return (
        <div style={{
            borderLeft: `4px solid ${ C.gold }`,
            paddingLeft: 28,
            margin: "40px 0",
        }}>
            <p style={{
                fontSize: "clamp(1.15rem, 2.4vw, 1.38rem)",
                lineHeight: 1.65,
                fontStyle: "italic",
                color: C.gray700,
                margin: 0,
                fontFamily: "Georgia, 'Times New Roman', serif",
            }}>
                {children}
            </p>
        </div>
    );
}

function ArticleContent() {
    return (
        <div style={{
            fontSize: "1.05rem",
            lineHeight: 1.85,
            color: C.gray800,
            fontFamily: "Georgia, 'Times New Roman', serif",
        }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: C.navy, marginTop: 0, marginBottom: 18, fontFamily: "Georgia, serif" }}>
                Navigating New Territory
            </h2>
            <p style={{ margin: "0 0 20px" }}>
                The digital revolution has created ethical terrain that previous generations couldn't have imagined. How do we apply timeless Christian principles to smartphones, social media, and artificial intelligence?
            </p>

            <h3 style={{ fontSize: "1.22rem", fontWeight: 600, color: C.navy, marginTop: 32, marginBottom: 14, fontFamily: "Georgia, serif" }}>
                The Virtue of Attention
            </h3>
            <p style={{ margin: "0 0 20px" }}>
                Silicon Valley has perfected the art of capturing our focus, competing relentlessly for our attention—the most precious resource we have. The question isn't whether we should use technology, but how we steward our capacity for presence and contemplation in an age of infinite distraction.
            </p>

            <p style={{ margin: "0 0 20px" }}>
                Ancient spiritual disciplines like Sabbath rest, contemplative prayer, and fasting from consumption take on new urgency when our devices promise instant access to unlimited content, connection, and entertainment.
            </p>

            <h3 style={{ fontSize: "1.22rem", fontWeight: 600, color: C.navy, marginTop: 32, marginBottom: 14, fontFamily: "Georgia, serif" }}>
                Digital Witness and Truth
            </h3>
            <p style={{ margin: "0 0 20px" }}>
                Social media platforms reward outrage, oversimplification, and tribal allegiance. Yet the call to bear witness to truth remains unchanged—even when nuance doesn't go viral and grace isn't algorithmically amplified.
            </p>

            <p style={{ margin: "0 0 20px" }}>
                Christians online face a tension: how do we engage public discourse without conforming to the performative dynamics that degrade genuine conversation? The answer lies not in withdrawal, but in cultivating a distinct posture—one marked by humility, charity, and the courage to resist the pressure to reduce complex realities into shareable slogans.
            </p>
        </div>
    );
}

function ShareSidebar() {
    const [hovered, setHovered] = useState(null);
    const links = [
        { id: "twitter", icon: Twitter, label: "Twitter" },
        { id: "facebook", icon: Facebook, label: "Facebook" },
    ];

    return (
        <div style={{
            position: "sticky",
            top: 100,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "flex-start",
        }}>
            <span style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: C.gray600,
                marginBottom: 4,
                fontFamily: "sans-serif",
            }}>
                Share
            </span>

            {links.map(({ id, icon: Icon }) => (
                <button
                    key={id}
                    onMouseEnter={() => setHovered(id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        border: `1.5px solid ${ hovered === id ? C.navy : "#d1d5db" }`,
                        background: hovered === id ? C.navy : "#fff",
                        color: hovered === id ? "#fff" : C.gray600,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.22s ease",
                        boxShadow: hovered === id ? "0 4px 16px rgba(30,45,68,0.15)" : "0 1px 3px rgba(0,0,0,0.08)",
                    }}
                >
                    <Icon />
                </button>
            ))}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════════════════
   PAGE ROOT
   ══════════════════════════════════════════════════════════════════════════════ */
export default function ArticleDetailPage() {
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
                        <CategoryBadge>{article.category}</CategoryBadge>
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
                        {article.title}
                    </h1>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                        <MetaItem icon={User}>{article.author}</MetaItem>
                        <MetaItem icon={Calendar}>{article.date}</MetaItem>
                        <MetaItem icon={Clock}>{article.readTime}</MetaItem>
                    </div>
                </div>
            </div>

            {/* ── Hero image ── */}
            <div style={{ padding: "48px 6vw 0" }}>
                <HeroImage />
            </div>

            {/* ── Article body grid (content + sidebar) ── */}
            <div className="mx-auto max-w-[1400px] md:max-w-[1200px]  grid grid-cols-[10px_1fr] md:grid-cols-[80px_1fr] gap-13 md:gap-12 px-[3vw] md:px-[6vw]  pt-12">
                {/* left sidebar – share */}
                <div>
                    <ShareSidebar />
                </div>

                {/* main content column */}
                <div className="md:max-w-[900] text-justify">
                    <PullQuote>{article.pullQuote}</PullQuote>
                    <ArticleContent />
                </div>
            </div>
        </div>
    );
}