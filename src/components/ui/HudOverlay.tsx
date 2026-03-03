"use client";
import { useEffect, useState } from "react";

const sections = [
    { id: "s1", label: "MISSION START" },
    { id: "s2", label: "THE ROVER" },
    { id: "s3", label: "DEPARTMENTS" },
    { id: "comp-erc", label: "ERC POLAND" },
    { id: "comp-irc", label: "IRC INDIA" },
    { id: "comp-urc", label: "URC USA" },
    { id: "s8", label: "PARTNERSHIP" },
    { id: "s9", label: "CONTACT" },
];

export default function HudOverlay() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [temp, setTemp] = useState(-270.45);

    useEffect(() => {
        const handleScroll = () => {
            const vh = window.innerHeight;
            const scrollPos = window.scrollY + vh / 2;

            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i].id);
                if (el && scrollPos >= el.offsetTop) {
                    setActiveIdx(i);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Subtle temperature fluctuation
    useEffect(() => {
        const i = setInterval(() => {
            setTemp(t => t + (Math.random() * 0.02 - 0.01));
        }, 2000);
        return () => clearInterval(i);
    }, []);

    return (
        <div id="hud-root" style={{
            position: "fixed", inset: 0, zIndex: 1000,
            pointerEvents: "none", color: "var(--fg)",
            fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: "1px", textTransform: "uppercase"
        }}>
            {/* Top HUD */}
            <div style={{
                position: "absolute", top: 24, left: "5vw", right: "5vw",
                display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
                <div style={{ display: "flex", gap: 24, opacity: 0.6 }}>
                    <div>STATUS: NOMINAL</div>
                    <div>COORDS: 18.441° N, 77.452° E</div>
                </div>
                <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                        <span style={{ color: "var(--fg3)" }}>TEMP:</span>
                        <span>{temp.toFixed(2)}° C</span>
                    </div>
                    <div style={{ pointerEvents: "auto", cursor: "none", opacity: 0.8 }} className="hud-btn">
                        SOUND OFF
                    </div>
                </div>
            </div>

            {/* Left Nav Dots */}
            <div style={{
                position: "absolute", left: "2vw", top: "50%",
                transform: "translateY(-50%)", display: "flex",
                flexDirection: "column", gap: 20, alignItems: "center"
            }}>
                <div style={{ width: 1, height: 40, background: "var(--line)" }} />
                {sections.map((s, i) => (
                    <div
                        key={s.id}
                        onClick={() => {
                            document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
                        }}
                        style={{
                            width: 6, height: 6, borderRadius: "50%",
                            background: i === activeIdx ? "var(--gold)" : "var(--fg3)",
                            transition: "all 0.4s var(--ease)",
                            pointerEvents: "auto", cursor: "none",
                            boxShadow: i === activeIdx ? "0 0 10px var(--gold)" : "none",
                            position: "relative"
                        }}
                    >
                        {i === activeIdx && (
                            <div style={{
                                position: "absolute", left: 16, top: "50%",
                                transform: "translateY(-50%)", whiteSpace: "nowrap",
                                color: "var(--gold)", fontSize: 9, fontWeight: 700
                            }}>
                                {(i + 1).toString().padStart(2, '0')} | {s.label}
                            </div>
                        )}
                    </div>
                ))}
                <div style={{ width: 1, height: 40, background: "var(--line)" }} />
            </div>

            {/* Bottom Section Label (UN Style) */}
            <div style={{
                position: "absolute", bottom: 40, left: 40,
                display: "flex", alignItems: "center", gap: 12,
                opacity: activeIdx === 0 ? 0 : 1, transition: "opacity 0.6s var(--ease)"
            }}>
                <div style={{
                    padding: "6px 12px", background: "var(--un-blue)",
                    border: "1px solid rgba(212,168,67,0.2)",
                    borderRadius: 4, color: "var(--gold)", fontWeight: 700
                }}>
                    {(activeIdx + 1).toString().padStart(2, '0')}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px" }}>
                    {sections[activeIdx].label}
                </div>
            </div>

            <style>{`
                .hud-btn:hover { color: var(--gold); }
            `}</style>
        </div>
    );
}
