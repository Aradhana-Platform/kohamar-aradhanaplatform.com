import { T } from "./CoreValue";

export function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <span
            className="block text-sm font-medium tracking-widest uppercase mb-2"
            style={{ color: T.gold, fontFamily: "sans-serif" }}
        >
            {children}
        </span>
    );
}