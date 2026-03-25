"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAssetPath } from "@/lib/utils";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = [
        { label: "About", href: "#s2" },
        { label: "Departments", href: "#s3" },
        { label: "Competitions", href: "#comp-erc" },
        { label: "Sponsor", href: "#s8" },
        { label: "Contact", href: "#s9" },
    ];

    return (
        <nav
            id="nav"
            style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 800,
                height: "68px", display: "flex", alignItems: "center",
                justifyContent: "space-between", padding: "0 5vw",
                transition: "all .5s var(--ease)",
                borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
                background: scrolled ? "rgba(0,11,30,0.85)" : "transparent",
                backdropFilter: scrolled ? "blur(20px)" : "none",
            }}
        >
            {/* Brand */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={getAssetPath("/logo-main.png")}
                    alt="Team Odyssey"
                    style={{ height: 32, width: "auto", mixBlendMode: "screen", filter: "brightness(2) contrast(1.1)" }}
                />
                <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: 12 }}>
                    <div style={{
                        fontFamily: "var(--font-bebas)",
                        fontSize: 20, fontWeight: 400, letterSpacing: "2px",
                        lineHeight: 1, color: "#fff", textShadow: "0 0 20px rgba(255,255,255,0.1)"
                    }}>TEAM ODYSSEY</div>
                    <div style={{
                        fontSize: 9, color: "var(--fg3)", letterSpacing: "3.5px",
                        marginTop: 2, fontFamily: "var(--font-mono)", fontWeight: 400, textTransform: "uppercase"
                    }}>KJSSE · DEEP SPACE</div>
                </div>
            </Link>

            {/* Links */}
            <div style={{ display: "flex", gap: 32 }} className="nav-links">
                {links.map(l => (
                    <Link
                        key={l.label} href={l.href}
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 10, letterSpacing: "2.5px", textTransform: "uppercase",
                            color: "var(--fg3)", transition: "all .3s var(--ease)",
                            fontWeight: 700
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.color = "var(--gold)";
                            e.currentTarget.style.textShadow = "0 0 10px rgba(212,168,67,0.3)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.color = "var(--fg3)";
                            e.currentTarget.style.textShadow = "none";
                        }}
                    >
                        {l.label}
                    </Link>
                ))}
            </div>

            {/* CTA */}
            <button
                className="btn-gold"
                style={{
                    fontSize: 11, padding: "10px 24px", fontFamily: "var(--font-mono)",
                    fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase"
                }}
                onClick={() => document.getElementById("s8")?.scrollIntoView({ behavior: "smooth" })}
            >
                SPONSOR US
            </button>

            <style>{`
        @media(max-width:900px){ .nav-links { display:none; } }
      `}</style>
        </nav>
    );
}
