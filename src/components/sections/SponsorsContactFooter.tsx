"use client";
import { useState } from "react";
import { getAssetPath } from "@/lib/utils";

const tiers = [
    { medal: "🥉", name: "Bronze", price: "₹25K", popular: false, golden: false, items: ["Logo on team t-shirts", "3 social media mentions", "Competition acknowledgment", "Certificate of sponsorship"] },
    { medal: "🥈", name: "Silver", price: "₹50K", popular: false, golden: false, items: ["Logo on rover arm & drone", "Competition banner branding", "8 social media features", "Dedicated page in design report", "Internship pipeline access"] },
    { medal: "🥇", name: "Gold", price: "₹1L", popular: true, golden: false, items: ["Logo on rover chassis (prominent)", "Logo on team jerseys (front)", "Monthly social media features", "Spotlight in 200+ pg design report", "Lab visit & team interaction", "Recruitment pipeline access"] },
    { medal: "👑", name: "Title Sponsor", price: "Custom", popular: false, golden: true, items: ["Team name includes your brand", "Full rover & drone branding", "All competition materials", "Co-branded IP opportunities", "Annual technical briefings", "Priority recruitment pipeline", "Dedicated press releases"] },
];

const whyStats = [
    { n: "46", t: "Elite Engineers", d: "Mumbai's best undergrads across software, electronics, mechanical, and systems design." },
    { n: "3", t: "International Stages", d: "Your brand at ERC (Poland), IRC (India), and URC (USA) — three world-top competitions." },
    { n: "∞", t: "Talent Pipeline", d: "Direct access to rigorous, hands-on engineers with real aerospace systems experience." },
];

const contactItems = [
    { icon: "📍", label: "Location", value: "KJ Somaiya School of Engineering\nVidyavihar, Mumbai — 400077" },
    { icon: "✉️", label: "Email", value: "odyssey@somaiya.edu" },
    { icon: "🏆", label: "Competitions", value: "ERC · IRC · URC" },
];

export default function SponsorsContactFooter() {
    const [sent, setSent] = useState(false);

    return (
        <>
            <style>{`
        /* Sponsors */
        #s8 { background: transparent; color: var(--fg); position: relative; z-index: 2; border-top: 1px solid var(--line); }
        .sp-top { max-width: 1300px; margin: 0 auto; padding: 120px 5vw 60px; display: grid; grid-template-columns: 1fr 1.8fr; gap: 80px; align-items: end; }
        .sp-h { font-family: var(--font-bebas); font-size: clamp(50px,8vw,110px); line-height: 0.88; letter-spacing: 0.5px; color: #fff; margin-bottom: 20px; text-shadow: 0 0 40px rgba(212,168,67,0.1); }
        .sp-h em { color: var(--gold); font-style: normal; text-shadow: 0 0 40px rgba(212,168,67,0.3); }
        .sp-p { font-family: var(--font-serif); font-size: 16px; line-height: 1.85; color: var(--fg2); font-weight: 400; font-style: italic; max-width: 520px; }
        .tier-grid { max-width: 1300px; margin: 0 auto; padding: 0 5vw; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .tier { background: rgba(255,255,255,0.02); border-radius: 12px; padding: 32px 24px; border: 1px solid var(--line); transition: all 0.4s var(--ease); position: relative; overflow: hidden; }
        .tier:hover { transform: translateY(-8px); border-color: rgba(212,168,67,0.4); box-shadow: 0 20px 50px rgba(0,0,0,0.4); background: rgba(255,255,255,0.04); }
        .tier.popular { border-color: var(--gold); background: linear-gradient(160deg, rgba(212,168,67,0.1), rgba(255,255,255,0.02)); }
        .tier.golden { border-color: var(--gold); box-shadow: 0 0 30px rgba(212,168,67,0.1); }
        .tier-pop { position: absolute; top: 0; left: 50%; transform: translateX(-50%); background: var(--gold); color: #000; font-family: var(--font-mono); font-size: 9px; font-weight: 700; letter-spacing: 2px; padding: 6px 16px; border-radius: 0 0 8px 8px; text-transform: uppercase; white-space: nowrap; }
        .tier-m { font-size: 24px; margin-bottom: 16px; opacity: 0.8; }
        .tier-name { font-family: var(--font-mono); font-size: 11px; font-weight: 400; letter-spacing: 3px; text-transform: uppercase; color: var(--fg3); margin-bottom: 12px; }
        .tier-price { font-family: var(--font-bebas); font-size: 48px; color: #fff; line-height: 1; margin-bottom: 24px; }
        .tier-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .tier-list li { font-family: var(--font-serif); font-size: 12px; color: var(--fg2); display: flex; align-items: flex-start; gap: 10px; line-height: 1.5; font-style: italic; }
        .tier-list li::before { content: '→'; color: var(--gold); font-size: 11px; flex-shrink: 0; margin-top: 1px; font-style: normal; }
        .why-strip { max-width: 1300px; margin: 80px auto 0; display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--line); padding: 0 5vw; }
        .wc { padding: 60px 0; text-align: center; border-right: 1px solid var(--line); }
        .wc:last-child { border-right: none; }
        .wc-n { font-family: var(--font-bebas); font-size: 72px; color: var(--gold); line-height: 1; margin-bottom: 8px; text-shadow: 0 0 40px rgba(212,168,67,0.2); }
        .wc-t { font-family: var(--font-mono); font-size: 14px; font-weight: 400; letter-spacing: 2px; color: #fff; margin-bottom: 8px; text-transform: uppercase; }
        .wc-d { font-family: var(--font-serif); font-size: 14px; color: var(--fg2); line-height: 1.65; font-style: italic; max-width: 260px; margin: 0 auto; }
        .sp-cta { max-width: 1300px; margin: 0 auto; padding: 80px 5vw 120px; text-align: center; }

        /* Contact */
        #s9 { background: transparent; border-top: 1px solid var(--line); padding: 120px 5vw; position: relative; z-index: 2; }
        .ct-wrap { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.2fr; gap: 100px; align-items: start; }
        .ct-items { margin-top: 48px; display: flex; flex-direction: column; gap: 12px; }
        .ci { display: flex; gap: 18px; align-items: flex-start; padding: 20px 24px; border-radius: 12px; border: 1px solid var(--line); background: rgba(255,255,255,0.02); transition: all 0.3s; }
        .ci:hover { border-color: rgba(212,168,67,0.3); background: rgba(255,255,255,0.04); }
        .ci-i { font-size: 20px; opacity: 0.8; }
        .ci-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--fg3); margin-bottom: 6px; }
        .ci-v { font-family: var(--font-serif); font-size: 14px; color: var(--fg); line-height: 1.6; white-space: pre-line; font-style: italic; }
        .form { display: flex; flex-direction: column; gap: 16px; }
        .fr2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .fg { display: flex; flex-direction: column; gap: 8px; }
        .fg label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--fg3); }
        .fg input, .fg textarea, .fg select { background: rgba(255,255,255,0.03); border: 1px solid var(--line); color: var(--fg); padding: 14px 18px; border-radius: 8px; font-size: 15px; font-family: var(--font-outfit); outline: none; transition: all 0.3s; cursor: none; }
        .fg input:focus, .fg textarea:focus, .fg select:focus { border-color: var(--gold); background: rgba(255,255,255,0.05); }
        .fg textarea { min-height: 120px; resize: vertical; }
        .btn-send { width: 100%; padding: 18px; border-radius: 8px; background: var(--gold); color: #000; border: none; cursor: none; font-family: var(--font-mono); font-size: 14px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; transition: all 0.3s var(--ease); margin-top: 12px; }
        .btn-send:hover { background: var(--gold2); transform: translateY(-2px); box-shadow: 0 10px 30px rgba(212,168,67,0.3); }
        .btn-send.sent { background: #059669; color: #fff; }

        /* Footer */
        footer { background: #010105; border-top: 1px solid var(--line); padding: 80px 5vw 40px; position: relative; z-index: 2; }
        .ft { max-width: 1300px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 60px; }
        .ft-brand p { font-family: var(--font-serif); font-size: 14px; color: var(--fg2); line-height: 1.8; max-width: 280px; font-style: italic; margin-top: 20px; }
        .ft-socs { display: flex; gap: 12px; margin-top: 24px; }
        .ft-soc { width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--line); display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--fg3); transition: all 0.3s; font-family: var(--font-mono); }
        .ft-soc:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-3px); }
        .ft-col h5 { font-family: var(--font-mono); font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: var(--gold); margin-bottom: 24px; font-weight: 600; }
        .ft-col a { display: block; font-family: var(--font-serif); font-size: 14px; color: var(--fg3); margin-bottom: 12px; transition: color 0.3s; font-style: italic; }
        .ft-col a:hover { color: var(--fg); }
        .ft-bot { max-width: 1300px; margin: 0 auto; border-top: 1px solid var(--line); padding-top: 32px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; }
        .ft-bot p { font-family: var(--font-mono); font-size: 10px; color: rgba(255,255,255,0.15); letter-spacing: 1px; }

        /* UN-style Section Tab */
        .un-tab {
            position: absolute; bottom: 5vh; left: 5vw; z-index: 3;
            display: flex; alignItems: center; gap: 12px;
        }
        .un-tab-num {
            padding: 6px 12px; background: var(--un-blue);
            border: 1px solid rgba(212,168,67,0.2);
            border-radius: 4px; color: var(--gold);
            font-family: var(--font-mono); font-size: 10px; font-weight: 700;
        }
        .un-tab-label {
            font-family: var(--font-mono); font-size: 10px; font-weight: 700;
            letter-spacing: 2px; text-transform: uppercase; color: var(--fg);
        }

        @media(max-width:900px){ .sp-top { grid-template-columns: 1fr; gap: 40px; } .tier-grid { grid-template-columns: 1fr 1fr; } .why-strip { grid-template-columns: 1fr; } .wc { border-right: none; border-bottom: 1px solid var(--line); } .ct-wrap { grid-template-columns: 1fr; gap: 60px; } .ft { grid-template-columns: 1fr 1fr; gap: 40px; } .fr2 { grid-template-columns: 1fr; } }
        @media(max-width:600px){ .tier-grid { grid-template-columns: 1fr; } }
      `}</style>

            {/* Sponsors */}
            <section id="s8">
                <div className="sp-top">
                    <div>
                        <div style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(80px,14vw,160px)", color: "rgba(255,255,255,0.03)", lineHeight: 1, marginBottom: -16 }}>05</div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 400, letterSpacing: "5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 10, display: "flex", alignItems: "center", gap: 10, opacity: 0.8 }}>
                            <span style={{ width: 25, height: 1, background: "var(--gold)", opacity: 0.4 }} />
                            Partnership
                        </div>
                    </div>
                    <div>
                        <h2 className="sp-h">Partner with<br /><em>the Future</em></h2>
                        <p className="sp-p">Your brand at the intersection of engineering talent, international competition, and space technology. 46 of Mumbai&apos;s finest engineering minds — competing on the world stage.</p>
                    </div>
                </div>
                <div className="tier-grid">
                    {tiers.map((t, i) => (
                        <div key={i} className={`tier${t.popular ? " popular" : ""}${t.golden ? " golden" : ""}`}>
                            {t.popular && <div className="tier-pop">Most Popular</div>}
                            <div className="tier-m">{t.medal}</div>
                            <div className="tier-name">{t.name}</div>
                            <div className="tier-price">{t.price}</div>
                            <ul className="tier-list">{t.items.map((item, ii) => <li key={ii}>{item}</li>)}</ul>
                        </div>
                    ))}
                </div>
                <div className="why-strip">
                    {whyStats.map((w, i) => (
                        <div key={i} className="wc">
                            <div className="wc-n">{w.n}</div>
                            <div className="wc-t">{w.t}</div>
                            <div className="wc-d">{w.d}</div>
                        </div>
                    ))}
                </div>
                <div className="sp-cta">
                    <button className="btn-gold" style={{ fontSize: 14, padding: "18px 48px", fontFamily: "var(--font-mono)", fontWeight: 700, letterSpacing: "3px" }}
                        onClick={() => document.getElementById("s9")?.scrollIntoView({ behavior: "smooth" })}>
                        INITIATE PARTNERSHIP →
                    </button>
                </div>

                <div className="un-tab">
                    <div className="un-tab-num">05</div>
                    <div className="un-tab-label">COMMITMENT</div>
                </div>
            </section>

            {/* Contact */}
            <section id="s9">
                <div className="ct-wrap">
                    <div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 400, letterSpacing: "5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 14, display: "flex", alignItems: "center", gap: 10, opacity: 0.8 }}>
                            <span style={{ width: 25, height: 1, background: "var(--gold)", opacity: 0.4 }} />
                            CONTACT UNIT
                        </div>
                        <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(38px,5.5vw,64px)", lineHeight: 0.92, marginBottom: 24, color: "#fff" }}>
                            Let&apos;s build<br /><em style={{ color: "var(--gold)", fontStyle: "normal", textShadow: "0 0 30px rgba(212,168,67,0.2)" }}>together.</em>
                        </h2>
                        <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 1.85, color: "var(--fg2)", fontWeight: 400, fontStyle: "italic", maxWidth: 480, marginBottom: 40 }}>Interested in sponsorship, technical collaboration, or recruitment? We respond within 48 hours.</p>
                        <div className="ct-items">
                            {contactItems.map((c, i) => (
                                <div key={i} className="ci">
                                    <div className="ci-i">{c.icon}</div>
                                    <div><div className="ci-label">{c.label}</div><div className="ci-v">{c.value}</div></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="form">
                            <div className="fr2">
                                <div className="fg"><label>First Name</label><input type="text" placeholder="Ravi" /></div>
                                <div className="fg"><label>Last Name</label><input type="text" placeholder="Sharma" /></div>
                            </div>
                            <div className="fg"><label>Organisation</label><input type="text" placeholder="Company / Institution" /></div>
                            <div className="fg"><label>Email</label><input type="email" placeholder="ravi@company.com" /></div>
                            <div className="fg">
                                <label>Enquiry Type</label>
                                <select>
                                    <option>Sponsorship Partnership</option>
                                    <option>Technical Collaboration</option>
                                    <option>Media / Press</option>
                                    <option>Recruitment</option>
                                    <option>General Enquiry</option>
                                </select>
                            </div>
                            <div className="fg"><label>Message</label><textarea placeholder="Tell us about your interest in partnering with Team Odyssey..." /></div>
                            <button className={`btn-send${sent ? " sent" : ""}`} onClick={() => { setSent(true); setTimeout(() => setSent(false), 3500); }}>
                                {sent ? "✓ TRANSMISSION RECEIVED" : "SEND TRANSMISSION →"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <div className="ft">
                    <div className="ft-brand">
                        <div style={{ fontFamily: "var(--font-bebas)", fontSize: 28, letterSpacing: "2px", color: "var(--gold)", textShadow: "0 0 20px rgba(212,168,67,0.2)" }}>TEAM ODYSSEY</div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "4px", textTransform: "uppercase", color: "var(--fg3)", marginTop: 4 }}>KJSSE · DEEP SPACE UNIT</div>
                        <p>The official Martian Rover &amp; Drone team of KJ Somaiya School of Engineering. Building the engineers who will explore the cosmos.</p>

                        <div style={{ display: "flex", gap: 24, marginTop: 32, alignItems: "center", opacity: 0.5 }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={getAssetPath("/logo-kjsse.png")} alt="Somaiya University" style={{ height: 36, width: "auto", filter: "grayscale(1) brightness(2)" }} />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={getAssetPath("/logo-trust.png")} alt="Somaiya Trust" style={{ height: 36, width: "auto", filter: "grayscale(1) brightness(2)" }} />
                        </div>

                        <div className="ft-socs">
                            <a href="#" className="ft-soc">Li</a><a href="#" className="ft-soc">Ig</a><a href="#" className="ft-soc">Yt</a><a href="#" className="ft-soc">Gh</a>
                        </div>
                    </div>
                    <div className="ft-col"><h5>Operations</h5><a href="#s2">The Mission</a><a href="#s3">Departments</a><a href="#s7">Leadership</a><a href="#s6">Hierarchy</a></div>
                    <div className="ft-col"><h5>Systems</h5><a href="#">Rover Platform</a><a href="#">Drone Systems</a><a href="#">Research & IP</a><a href="#">Publications</a></div>
                    <div className="ft-col"><h5>Connect</h5><a href="#s8">Sponsorship</a><a href="#comp-erc">Mission Log</a><a href="#s9">Contact</a><a href="#">Recruitment</a></div>
                </div>
                <div className="ft-bot">
                    <p>© 2026 KJSSE ODYSSEY — MARS ROVERS & DRONES. ALL RIGHTS RESERVED.</p>
                    <span style={{ fontSize: 10, color: "rgba(212,168,67,0.4)", fontFamily: "var(--font-mono)", letterSpacing: "2px", textTransform: "uppercase" }}>KJ Somaiya School of Engineering, Mumbai · IN</span>
                </div>
            </footer>
        </>
    );
}
