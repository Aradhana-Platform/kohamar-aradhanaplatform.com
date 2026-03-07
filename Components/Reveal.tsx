import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.18) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);

    return [ref, visible] as const;
}

/** Wrapper that fades + slides in when scrolled into view */
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
    const [ref, visible] = useInView(0.15);
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.75s ${ delay }s cubic-bezier(.22,1,.36,1), transform 0.75s ${ delay }s cubic-bezier(.22,1,.36,1)`,
            }}
        >
            {children}
        </div>
    );
}