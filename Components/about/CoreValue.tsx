export interface CoreValue {
    icon: "Book" | "Heart" | "Users" | "Target" | "MessageCircle" | "Award";
    title: string;
    desc: string;
}



export const CORE_VALUES: CoreValue[] = [
    { icon: "Book", title: "Theological Rigor", desc: "We maintain academic standards while making content accessible to all readers." },
    { icon: "Heart", title: "Spiritual Depth", desc: "Our writing aims not just to inform, but to transform and deepen faith." },
    { icon: "Users", title: "Community", desc: "We believe theology is best practiced in community, not isolation." },
    { icon: "Target", title: "Relevance", desc: "We connect ancient wisdom with the pressing questions of our time." },
    { icon: "MessageCircle", title: "Dialogue", desc: "We welcome diverse perspectives and foster respectful theological conversation." },
    { icon: "Award", title: "Excellence", desc: "We strive for the highest quality in every piece we publish." },
];


export const T = {
    navy: "#1e2d44",
    navyLight: "#2c3e5a",
    gold: "#c9953a",
    burgundy: "#6b2c3b",
    gray500: "#6b7280",
    gray700: "#374151",
} as const;


export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    hue: number;
}

// export const TEAM: TeamMember[] = [
//     { name: "Dr. Thomas Mitchell", role: "Founding Editor & Systematic Theology", bio: "PhD in Theology from Oxford University with 20+ years of teaching experience.", hue: 210 },
//     { name: "Prof. Sarah Chen", role: "Biblical Studies Editor", bio: "Professor of New Testament at Gordon-Conwell Theological Seminary.", hue: 30 },
//     { name: "Rev. James Okonkwo", role: "Church History Contributor", bio: "Ordained minister and church historian specializing in African Christianity.", hue: 160 },
//     { name: "Dr. Maria Santos", role: "Ethics & Applied Theology", bio: "Research fellow exploring the intersection of faith and contemporary ethics.", hue: 340 },
// ];