"use client";

import { useState, useEffect } from "react";
import BlogCards from "../../Components/BlogCards";

/* ─── Inline SVG Icons ─────────────────────────────────────────────────────── */
const SparklesIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74z" />
        <path d="M19 15l1.2 2.8L23 19l-2.8 1.2L19 23l-1.2-2.8L15 19l2.8-1.2z" />
        <path d="M5 2l.8 2L8 5l-2.2.8L5 8l-.8-2.2L2 5l2.2-.8z" />
    </svg>
);
const BookIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);
const ClockIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);
const ScalesIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22v-7" /><path d="M4 22h16" />
        <path d="M12 2L5 7l7 5 7-5-7-5z" />
        <path d="M5 7l-3 9h6l-3-9z" /><path d="M19 7l-3 9h6l-3-9z" />
    </svg>
);
const ShieldIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);
const HeartIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);
const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const categories = [
    { id: "all", label: "All", icon: <SparklesIcon /> },
    { id: "systematic-theology", label: "Systematic Theology", icon: <BookIcon /> },
    { id: "biblical-studies", label: "Biblical Studies", icon: <BookIcon /> },
    { id: "church-history", label: "Church History", icon: <ClockIcon /> },
    { id: "ethics", label: "Ethics", icon: <ScalesIcon /> },
    { id: "apologetics", label: "Apologetics", icon: <ShieldIcon /> },
    { id: "spiritual-formation", label: "Spiritual Formation", icon: <HeartIcon /> },
];

interface Post {
    slug: string;
    title: string;
    date: string;
    author: string;
    category: string;
    categoryColor: string;
    image: string;
    readTime: string;
    description: string;
}

export default function ArticlesClient({ posts }: { posts: any[] }) {
    const [active, setActive] = useState("all");
    const [query, setQuery] = useState("");
    const [mounted, setMounted] = useState(false);
    const [focusSearch, setFocus] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 60);
        return () => clearTimeout(t);
    }, []);

    /* stagger helper */
    const fadeIn = (delay = 0) => ({
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.8s ${ delay }s cubic-bezier(0.22,1,.36,1), transform 0.8s ${ delay }s cubic-bezier(0.22,1,.36,1)`,
    });

    const filteredPosts = posts.filter(post => {
        const matchesCategory = active === "all" || (post.category && post.category.toLowerCase().replace(" ", "-") === active);
        const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase()) ||
            (post.description && post.description.toLowerCase().includes(query.toLowerCase()));
        return matchesCategory && matchesQuery;
    });

    return (
        <div style={{ minHeight: "100vh", fontFamily: "'Georgia', 'Times New Roman', serif", background: "#f9fafb" }}>

            {/* ────── HERO ────────────────────────────────────────────────────── */}
            <header style={{
                position: "relative",
                width: "100%",
                minHeight: 400,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(148deg, #2c3e5a 0%, #1e2d44 42%, #243548 72%, #2a3f5f 100%)",
                overflow: "hidden",
                padding: "64px 24px",
            }}>
                {/* decorative blobs */}
                <div style={{ position: "absolute", width: 520, height: 520, top: -140, left: -120, borderRadius: "50%", background: "#5a8ab5", filter: "blur(90px)", opacity: 0.12, pointerEvents: "none" }} />
                <div style={{ position: "absolute", width: 380, height: 380, bottom: -90, right: -90, borderRadius: "50%", background: "#4a7499", filter: "blur(80px)", opacity: 0.12, pointerEvents: "none" }} />

                {/* subtle bottom fade */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to bottom, transparent, rgba(249,250,251,0.08))", pointerEvents: "none" }} />

                {/* text content */}
                <div style={{ position: "relative", zIndex: 1, textAlign: "center", ...fadeIn(0) }}>
                    <h1 style={{
                        color: "#fff",
                        fontWeight: 300,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.1,
                        fontSize: "clamp(2.8rem, 7vw, 5.4rem)",
                        textShadow: "0 2px 28px rgba(0,0,0,0.22)",
                        margin: 0,
                    }}>All Articles</h1>

                    <p style={{
                        color: "rgba(255,255,255,0.78)",
                        fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
                        lineHeight: 1.65,
                        maxWidth: 560,
                        margin: "18px auto 0",
                    }}>
                        Explore our collection of theological writings, biblical insights, and spiritual reflections.
                    </p>
                </div>
            </header>

            {/* ────── SEARCH + FILTERS ────────────────────────────────────────── */}
            <section style={{ width: "100%", padding: "52px 20px 60px", background: "#fff" }}>
                <div style={{ maxWidth: 880, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>

                    {/* Search bar */}
                    <div style={{ width: "100%", maxWidth: 640, position: "relative", ...fadeIn(0.12) }}>
                        <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none", display: "flex", alignItems: "center" }}>
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            style={{
                                width: "100%",
                                height: 52,
                                paddingLeft: 44,
                                paddingRight: 20,
                                fontSize: "1rem",
                                fontFamily: "inherit",
                                color: "#374151",
                                background: "#fff",
                                border: `1.5px solid ${ focusSearch ? "#1e2d44" : "#e2e5ea" }`,
                                borderRadius: 999,
                                outline: "none",
                                boxSizing: "border-box",
                                boxShadow: focusSearch
                                    ? "0 2px 18px rgba(30,45,68,0.18)"
                                    : "0 2px 12px rgba(0,0,0,0.065)",
                                transition: "box-shadow 0.25s ease, border-color 0.25s ease",
                            }}
                        />
                    </div>

                    {/* Category pills */}
                    <div style={{
                        display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12,
                        ...fadeIn(0.24),
                    }}>
                        {categories.map((cat, i) => {
                            const on = active === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActive(cat.id)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        padding: "10px 20px",
                                        borderRadius: 999,
                                        fontSize: "0.91rem",
                                        fontFamily: "inherit",
                                        cursor: "pointer",
                                        background: on ? "#1e2d44" : "#fff",
                                        color: on ? "#fff" : "#374151",
                                        border: `1.5px solid ${ on ? "#1e2d44" : "#e2e5ea" }`,
                                        boxShadow: on ? "0 2px 10px rgba(30,45,68,0.28)" : "0 1px 4px rgba(0,0,0,0.065)",
                                        /* staggered reveal */
                                        opacity: mounted ? 1 : 0,
                                        transform: mounted ? "translateY(0)" : "translateY(8px)",
                                        transition: `opacity 0.7s ${ 0.28 + i * 0.055 }s cubic-bezier(0.22,1,.36,1),
                                    transform 0.7s ${ 0.28 + i * 0.055 }s cubic-bezier(0.22,1,.36,1),
                                    background 0.22s ease, color 0.22s ease,
                                    border-color 0.22s ease, box-shadow 0.22s ease`,
                                    }}
                                    onMouseEnter={e => {
                                        if (!on) {
                                            e.currentTarget.style.borderColor = "#1e2d44";
                                            e.currentTarget.style.boxShadow = "0 2px 8px rgba(30,45,68,0.14)";
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if (!on) {
                                            e.currentTarget.style.borderColor = "#e2e5ea";
                                            e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.065)";
                                        }
                                    }}
                                >
                                    <span style={{ display: "flex", alignItems: "center", opacity: on ? 1 : 0.6 }}>
                                        {cat.icon}
                                    </span>
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* blogs... */}
            <section className='py-16 px-6 lg:px-12 bg-white min-h-screen'>
                <BlogCards posts={filteredPosts} />
            </section>
        </div>
    );
}
