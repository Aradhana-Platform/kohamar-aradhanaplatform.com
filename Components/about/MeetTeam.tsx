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
                className="w-full rounded-xl shadow-xl overflow-hidden flex items-center justify-center mb-4"
                style={{
                    aspectRatio: "1",
                    background: `linear-gradient(145deg, hsl(${ hue },45%,62%) 0%, hsl(${ hue + 20 },50%,48%) 100%)`,
                    boxShadow: hovered ? "0 6px 24px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.08)",
                    transition: "box-shadow 0.3s ease",
                }}
            >
                {/* <span className="text-white font-light" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontFamily: "Georgia, serif", textShadow: "0 1px 6px rgba(0,0,0,0.2)" }}>
                    {initials}
                </span> */}
                <img src="https://scontent.fktm21-1.fna.fbcdn.net/v/t39.30808-6/299914749_1512516582551863_309940420655358093_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeEFANQfVjh9nqlK5E23i2xvYwAR_hGGaDJjABH-EYZoMjVOOQoYkfYzOIv_IiJzqQ_G_Je_KLN-qfQGIgwrPyd4&_nc_ohc=yPkRvmyrBXcQ7kNvwFhPjxb&_nc_oc=AdlIXd5GiUIEcmeIxIxDXwU3gBuSkdoh0gpbaRxjydIG5eyxS_mKSAeNaKSZLsKIKiITlcxh9iWCfK8gpG2-0veL&_nc_zt=23&_nc_ht=scontent.fktm21-1.fna&_nc_gid=MyfuUi1wzWOnRpOAsnLGwA&oh=00_Aft0PFtJNMkrZHJvIfhtadsnmZhu_j1gyrsSZcae1SPxuQ&oe=699BD3F0" alt="" className="" />
            </div>

            <h3 className="font-semibold" style={{ color: T.navy, fontSize: "0.95rem", fontFamily: "Georgia, serif" }}>{name}</h3>
            <p className="mt-1 text-xs font-semibold tracking-wide" style={{ color: T.gold, fontFamily: "sans-serif" }}>{role}</p>
            <p className="mt-2 text-sm leading-relaxed italic" style={{ color: T.gray500, fontFamily: "Georgia, serif" }}>{bio}</p>
        </div>
    );
}