"use client";

import { useState } from "react";

// const Twitter = () => (
//     <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
//     </svg>
// );

const ShareIcon = () => (
    <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Arrow pointing up-right (share) */}
        <path d="M4 12v8a2 2 0 0 0 2 2h12" />
        <polyline points="16 4 20 4 20 8" />
        <line x1="20" y1="4" x2="12" y2="12" />
    </svg>
);

// const Facebook = () => (
//     <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
//     </svg>
// );

const C = {
    navy: "#1e2d44",
    gray600: "#4b5563",
};

export default function ShareSidebar({ url, blogTitle }: { url: string, blogTitle: string }) {
    const [hovered, setHovered] = useState<string | null>(null);
    const links = [
        { id: "twitter", icon: ShareIcon, label: "Share" },
        // { id: "facebook", icon: Facebook, label: "Facebook" },
    ];

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blogTitle,
                    url,
                });
            } catch (error) {
                console.log("Share cancelled");
            }
        }
    };


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
                    onClick={handleNativeShare}
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
                    aria-label={`Share on ${ id }`}
                >
                    <Icon />
                </button>
            ))}
        </div>
    );
}
