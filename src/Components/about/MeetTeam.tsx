import { useState } from "react";
import { T, TeamMember } from "./CoreValue";

export function TeamCard({ name, role, bio, hue }: TeamMember) {
    const [hovered, setHovered] = useState(false);
    const initials = name
        .split(" ")
        .filter(Boolean)
        .map((w: any) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="text-center"
            style={{
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
                transition: "transform 0.3s cubic-bezier(.22,1,.36,1)",
            }}
        >
            {/* avatar */}
            <div
                className="w-full rounded-xl flex items-center justify-center mb-4"
                style={{
                    aspectRatio: "1",
                    background: `linear-gradient(145deg, hsl(${ hue },45%,62%) 0%, hsl(${ hue + 20 },50%,48%) 100%)`,
                    boxShadow: hovered ? "0 6px 24px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.08)",
                    transition: "box-shadow 0.3s ease",
                }}
            >
                <span className="text-white font-light" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontFamily: "Georgia, serif", textShadow: "0 1px 6px rgba(0,0,0,0.2)" }}>
                    {initials}
                </span>
            </div>

            <h3 className="font-semibold" style={{ color: T.navy, fontSize: "0.95rem", fontFamily: "Georgia, serif" }}>{name}</h3>
            <p className="mt-1 text-xs font-semibold tracking-wide" style={{ color: T.gold, fontFamily: "sans-serif" }}>{role}</p>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: T.gray500, fontFamily: "Georgia, serif" }}>{bio}</p>
        </div>
    );
}