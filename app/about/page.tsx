"use client";
import { CORE_VALUES, T, TeamMember } from "../../Components/about/CoreValue";
import { TeamCard } from "../../Components/about/MeetTeam";
import { SectionLabel } from "../../Components/about/SectionLabel";
import { ValueCard } from "../../Components/about/ValueCard";
import { Reveal } from "../../Components/Reveal";
import Image from "next/image";
import { useState, useEffect } from "react";



const TEAM: TeamMember[] = [
    { name: "Bijay B.K", role: "Software Developer", bio: "Founder at Aradhana Platform & The WebSpace", hue: 210 },
    // name:Bardan Nepali,Develper
    { name: "Bardan Nepali", role: "Software Develper", bio: "Software Developer at The WebSpace (Technical team of Aradhana Platform)", hue: 210 },
];

export default function AboutPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        const id = setTimeout(() => setMounted(true), 40);
        return () => clearTimeout(id);
    }, []);

    return (
        <div className="min-h-screen" style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: `linear-gradient(148deg, #101c39 0%, #1c388b 50%, #101c39 100%)` }}>
            {/* hero section */}
            <section
                className="relative overflow-hidden flex items-center max-w-7xl mx-auto"
                style={{

                    minHeight: 280,
                    padding: "90px 6vw",
                }}
            >
                {/* subtle radial glow */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 70% 50%, rgb(27, 56, 140) 0%, transparent 70%)" }} />

                <div
                    className="relative z-10 max-w-xl"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(22px)",
                        transition: "opacity 1s .05s cubic-bezier(.22,1,.36,1), transform 1s .05s cubic-bezier(.22,1,.36,1)",
                    }}
                >
                    <SectionLabel>our Mission</SectionLabel>

                    <h1
                        className="text-white font-light leading-none py-2"
                        style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: "-0.01em", textShadow: "0 2px 28px rgba(0,0,0,0.22)" }}
                    >
                        Our Story <span className="italic">&amp;</span> Mission
                    </h1>

                    <p className="mt-5 text-xl w-full leading-relaxed" style={{ color: "rgba(255,255,255,0.72)", fontFamily: "sans-serif" }}>
                        Theology exists to make profound theological insights accessible to all, bridging the gap between academic scholarship and everyday faith.
                    </p>
                </div>
            </section>

            {/* Our Purpose */}
            <section className="bg-white" style={{ padding: "80px 6vw" }}>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center" style={{ gap: "clamp(32px, 6vw, 72px)" }}>

                    {/* ── text column ── */}
                    <Reveal>
                        <div>
                            <SectionLabel>About me</SectionLabel>
                            <h2
                                className="font-normal leading-tight"
                                style={{ color: T.navy, fontSize: "clamp(1.7rem, 3.4vw, 2.3rem)", fontFamily: "Georgia, serif" }}
                            >
                                Academic Dean of Nepal Theological College
                            </h2>

                            <p className="mt-6 text-base leading-relaxed" style={{ color: T.gray700, fontFamily: "Georgia, serif" }}>
                                Amar Pandey is Academic Dean of Nepal Theological College. He has received theological training in the UK, India, and the Philippines. In addition to teaching, preaching, and writing, Amar likes to hike the beautiful hills of Nepal. Although neither a poet/litterateur nor a person trained in music, he enjoys songwriting occasionally. Amar lives in Kathmandu with his wife and two children.
                            </p>
                            {/* <p className="mt-4 text-base leading-relaxed" style={{ color: T.gray700, fontFamily: "Georgia, serif" }}>
                                Our team of scholars, pastors, and writers work together to present complex theological concepts in clear, engaging language—without sacrificing depth or accuracy.
                            </p> */}
                        </div>
                    </Reveal>

                    {/* ── image + floating stat ── */}
                    <Reveal delay={0.12}>
                        <div className="relative">
                            <Image src="/about-images/Profile.jpg" width={700} height={400} className="rounded-3xl" alt="our purpose" />

                            {/* floating stat badge */}
                            <div
                                className="absolute rounded-xl shadow-xl"
                                style={{
                                    bottom: "8%", left: "-4%",
                                    background: T.burgundy,
                                    padding: "18px 26px",
                                    minWidth: 140,
                                    zIndex: 2,
                                }}
                            >
                                <p className="text-sm mt-1 tracking-wide" style={{ color: "rgba(255,255,255,0.82)", fontFamily: "sans-serif" }}>Equipping Minds, <br />Preaching the Word</p>
                                <p className="text-white font-bold leading-none" style={{ fontSize: "2.1rem", fontFamily: "Georgia, serif" }}>since 2003</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>


            {/* core values... */}
            <section className="bg-gray-100" style={{ padding: "80px 6vw" }}>
                <Reveal>
                    <div className="text-center mb-12">
                        <SectionLabel>What Guides Us</SectionLabel>
                        <h2 className="font-normal" style={{ color: T.navy, fontSize: "clamp(1.7rem, 3.2vw, 2.2rem)", fontFamily: "Georgia, serif" }}>
                            Our Core Values
                        </h2>
                    </div>
                </Reveal>

                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {CORE_VALUES.map((v, i) => (
                        <Reveal key={v.title} delay={i * 0.07}>
                            <ValueCard {...v} />
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* meet Team */}
            <section className="bg-white" style={{ padding: "88px 6vw 96px" }}>
                <Reveal>
                    <div className="text-center mb-13">
                        <SectionLabel>The People Behind Theological</SectionLabel>
                        <h2 className="font-normal" style={{ color: T.navy, fontSize: "clamp(1.7rem, 3.2vw, 2.2rem)", fontFamily: "Georgia, serif" }}>
                            Meet Our Team
                        </h2>
                    </div>
                </Reveal>

                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TEAM.map((m, i) => (
                        <Reveal key={m.name} delay={i * 0.08}>
                            <TeamCard {...m} />
                        </Reveal>
                    ))}
                </div>
            </section>
        </div>

    );
}


