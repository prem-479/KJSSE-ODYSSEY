"use client";
import { useEffect, useRef } from "react";

export default function ProgressBar() {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const update = () => {
            const total = document.body.scrollHeight - window.innerHeight;
            const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
            if (barRef.current) barRef.current.style.width = pct + "%";
        };
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);

    return (
        <div
            ref={barRef}
            style={{
                position: "fixed", top: 0, left: 0, height: "2px",
                zIndex: 900, background: "var(--gold)",
                width: "0%", transition: "width .06s linear",
                pointerEvents: "none",
            }}
        />
    );
}
