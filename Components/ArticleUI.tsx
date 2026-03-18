
import Link from "next/link";

/* ══════════════════════════════════════════════════════════════════════════════
   THEME CONSTANTS
   ══════════════════════════════════════════════════════════════════════════════ */
export const C = {
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
   ICONS
   ══════════════════════════════════════════════════════════════════════════════ */
const ArrowLeft = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

export const User = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

export const Calendar = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

export const Clock = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

/* ══════════════════════════════════════════════════════════════════════════════
   COMPONENTS
   ══════════════════════════════════════════════════════════════════════════════ */

export function BackButton() {
    return (
        <Link href="/articles" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            textDecoration: "none",
            color: C.gray700, fontSize: "0.92rem", fontWeight: 500,
            padding: "6px 0", transition: "color 0.2s ease",
            fontFamily: "sans-serif",
        }}>
            <ArrowLeft />
            <span>Back to Articles</span>
        </Link>
    );
}

export function CategoryBadge({ children, colorClassName }: { children: React.ReactNode, colorClassName?: string }) {
    // If colorClassName is provided (e.g. from frontmatter), we might use it. 
    // For now, defaulting to burgundy style, but could be dynamic.
    return (
        <span style={{
            display: "inline-block",
            background: C.burgundy, // or use colorClassName if implemented
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

export function MetaItem({ icon: Icon, children }: { icon: React.ComponentType, children: React.ReactNode }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.gray600, fontSize: "0.88rem", fontFamily: "sans-serif" }}>
            <Icon />
            <span>{children}</span>
        </div>
    );
}

export function HeroImage({ src, alt }: { src?: string, alt?: string }) {
    if (src) {
        return (
            <div style={{
                width: "100%",
                maxWidth: 1100,
                margin: "0 auto",
                aspectRatio: "16 / 7.5",
                borderRadius: 16,
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
            }}>
                <img src={src} alt={alt || "Article Hero"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
        );
    }

    /* Fallback: Lady Justice statue placeholder */
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
                <div style={{ position: "absolute", left: "38%", top: "22%", width: "24%", height: "62%", background: "linear-gradient(to bottom, #70a87dff 0%, #8b7355 100%)", borderRadius: "12px 12px 24px 24px" }} />
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
        </div >
    );
}

export function PullQuote({ children }: { children: React.ReactNode }) {
    if (!children) return null;
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
