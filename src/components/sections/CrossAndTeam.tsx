"use client";

const cross = [
    { i: "🛰️", t: "Chief Systems Engineer", b: "Captain & Vice Captain", d: "Owns the System Architecture Document, all ICDs, and RTM. Chairs PDR, CDR, Integration Reviews. Final technical arbitrator." },
    { i: "🧪", t: "Chief Test & Validation", b: "Captain & Vice Captain", d: "Owns the complete V&V framework. Can halt any subsystem. Leads FMEA and FTA. Rover cannot ship without CTVE sign-off." },
    { i: "🔌", t: "Integration Engineer", b: "Chief Systems Engineer", d: "Physically connects all subsystems using oscilloscopes and protocol analyzers to verify every hardware-software interface." },
    { i: "📂", t: "Config & Docs Manager", b: "Vice Captain", d: "Guardian of institutional knowledge. Owns document management, Config Item Register, and all change request workflows." },
    { i: "🛡️", t: "Safety & Compliance Officer", b: "Team Captain", d: "Unique veto over any unsafe operation regardless of team pressure. Reviews all PCB schematics before fabrication." },
    { i: "📈", t: "Data & Performance Engineer", b: "CTVE", d: "Transforms raw telemetry into insight. Tracks rover speed, arm cycle time, nav accuracy (RMSE), battery endurance." },
];

const hierarchy = [
    [{ t: "Team Captain", s: "Ultimate Authority", type: "cmd" }],
    [{ t: "Vice Captain", s: "Operational Authority", type: "cmd" }],
    [
        { t: "Chief Systems Eng.", s: "Technical Authority", type: "xf" },
        { t: "Chief Test & Validation", s: "Quality Authority", type: "xf" },
        { t: "Safety Officer", s: "Safety Veto", type: "xf" },
    ],
    [
        { t: "Coding Lead", s: "Software Architect", type: "" },
        { t: "Electronics Lead", s: "HW Systems Eng.", type: "" },
        { t: "Mechanical Lead", s: "Structural Eng.", type: "" },
        { t: "Research Lead", s: "Simulation & IP", type: "" },
        { t: "Project Manager", s: "Business Head", type: "" },
    ],
    [
        { t: "25 Sub-Domain Heads", s: "5 per department", type: "", wide: true },
        { t: "5 Vice Leads", s: "1 per department", type: "", wide: false },
    ],
    [{ t: "43–46 Core Members", s: "Individual Contributors", type: "", wide: true }],
];

const team = [
    { av: "TC", n: "Team Captain", r: "Strategic Authority", xf: false },
    { av: "VC", n: "Vice Captain", r: "Operational Head", xf: false },
    { av: "CSE", n: "Chief Systems Eng.", r: "Technical Authority", xf: true },
    { av: "CTV", n: "Chief Test & Validation", r: "Quality Authority", xf: true },
    { av: "SLA", n: "Software Lead Architect", r: "Coding Dept.", xf: false },
    { av: "HSE", n: "Hardware Systems Eng.", r: "Electronics Dept.", xf: false },
    { av: "MSE", n: "Mechanical Systems Eng.", r: "Mechanical Dept.", xf: false },
    { av: "RSH", n: "Research & Sim Head", r: "R&D Dept.", xf: false },
    { av: "PM", n: "Project Manager", r: "Business Head", xf: false },
    { av: "SCO", n: "Safety & Compliance", r: "Veto Authority", xf: true },
    { av: "IE", n: "Integration Engineer", r: "Cross-Department", xf: true },
    { av: "DPE", n: "Data & Performance", r: "Analytics Authority", xf: true },
];

export default function CrossAndTeam() {
    return (
        <>
            <style>{`
        /* Cross-functional */
        #s5 { background: transparent; color: var(--fg); position: relative; z-index: 2; }
        .wh-hdr { max-width: 1300px; margin: 0 auto; padding: 80px 5vw 52px; display: grid; grid-template-columns: 1fr 1.8fr; gap: 60px; align-items: end; }
        .wh-chap { font-family: 'Bebas Neue', sans-serif; font-size: clamp(80px,14vw,160px); color: rgba(255,255,255,.03); line-height: 1; margin-bottom: -16px; }
        .wh-tag { font-family: 'Barlow Condensed', var(--font-barlow), sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 4px; text-transform: uppercase; color: var(--gold); margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
        .wh-tag::before { content: ''; width: 18px; height: 1px; background: var(--gold); opacity: 0.4; }
        .wh-h { font-family: 'Bebas Neue', sans-serif; font-size: clamp(40px,5.5vw,68px); line-height: .95; letter-spacing: .5px; color: #fff; }
        .wh-h em { color: var(--gold); font-style: normal; }
        .wh-p { font-size: 14px; line-height: 1.85; color: var(--fg2); font-weight: 300; max-width: 480px; }
        .cross-grid { max-width: 1300px; margin: 0 auto; padding: 0 5vw 80px; display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; border: none; overflow: hidden; }
        .cr { background: rgba(255,255,255,.02); border: 1px solid var(--line); border-radius: 6px; padding: 32px 26px; transition: background .25s, border-color .25s; position: relative; overflow: hidden; }
        .cr::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg,var(--gold),transparent); transform: scaleX(0); transform-origin: left; transition: transform .4s var(--ease); }
        .cr:hover { background: rgba(255,255,255,.04); border-color: rgba(212,168,67,0.3); }
        .cr:hover::after { transform: scaleX(1); }
        .cr-i { font-size: 26px; margin-bottom: 14px; }
        .cr-t { font-family: 'Barlow Condensed', var(--font-barlow), sans-serif; font-size: 17px; font-weight: 600; letter-spacing: .5px; color: #fff; margin-bottom: 6px; }
        .cr-b { display: inline-block; font-family: 'Barlow Condensed', var(--font-barlow), sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--fg3); background: rgba(255,255,255,.05); border: 1px solid var(--line); padding: 3px 10px; border-radius: 100px; margin-bottom: 12px; }
        .cr-d { font-size: 13px; color: var(--fg2); line-height: 1.7; font-weight: 300; }

        /* Hierarchy */
        #s6 { background: transparent; border-top: 1px solid var(--line); padding: 90px 5vw; position: relative; z-index: 2; }
        .hier { margin-top: 48px; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .hrow { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
        .hn { padding: 11px 17px; border-radius: 6px; border: 1px solid var(--line); background: rgba(255,255,255,.02); min-width: 136px; text-align: center; transition: border-color .2s, background .2s; }
        .hn:hover { border-color: rgba(212,168,67,.3); background: rgba(212,168,67,.04); }
        .hn.cmd { border-color: rgba(212,168,67,.45); background: rgba(212,168,67,.08); }
        .hn.xf { border-color: rgba(26,44,199,.4); background: rgba(26,44,199,.07); }
        .hn-t { font-family: 'Barlow Condensed', var(--font-barlow), sans-serif; font-size: 13px; font-weight: 600; letter-spacing: .3px; color: var(--fg); }
        .hn-s { font-size: 10px; color: var(--fg3); margin-top: 2px; }
        .harr { color: rgba(255,255,255,.1); font-size: 13px; }
        .hleg { margin-top: 28px; display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
        .hli { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--fg2); }
        .hld { width: 8px; height: 8px; border-radius: 2px; }

        /* Team */
        #s7 { background: transparent; border-top: 1px solid var(--line); padding: 90px 5vw; position: relative; z-index: 2; }
        .team-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(136px,1fr)); gap: 8px; margin-top: 44px; }
        .tc { padding: 20px 12px; text-align: center; border-radius: 8px; border: 1px solid var(--line); background: rgba(255,255,255,.02); transition: border-color .25s, transform .25s var(--ease); }
        .tc:hover { border-color: rgba(212,168,67,.35); transform: translateY(-4px); }
        .tc-av { width: 54px; height: 54px; border-radius: 50%; margin: 0 auto 12px; background: rgba(212,168,67,.1); border: 1px solid rgba(212,168,67,.22); display: flex; align-items: center; justify-content: center; font-family: 'Bebas Neue', sans-serif; font-size: 12px; color: var(--gold); transition: box-shadow .2s, border-color .2s; }
        .tc:hover .tc-av { border-color: var(--gold); box-shadow: 0 0 14px rgba(212,168,67,.25); }
        .tc-av.xf { color: rgba(100,120,255,.9); background: rgba(26,44,199,.08); border-color: rgba(26,44,199,.25); }
        .tc-n { font-family: 'Barlow Condensed', var(--font-barlow), sans-serif; font-size: 12px; font-weight: 600; letter-spacing: .3px; color: var(--fg); margin-bottom: 3px; }
        .tc-r { font-size: 10px; color: var(--fg3); line-height: 1.4; }

        @media(max-width:900px){ .wh-hdr { grid-template-columns: 1fr; gap: 24px; } .cross-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width:600px){ .cross-grid { grid-template-columns: 1fr; } .team-grid { grid-template-columns: repeat(2,1fr); } .hrow { gap: 5px; } .hn { min-width: 110px; padding: 9px 12px; } }
      `}</style>

            {/* Cross-Functional */}
            <section id="s5">
                <div className="wh-hdr">
                    <div>
                        <div className="wh-chap">04</div>
                        <div className="wh-tag">Integrated Authority</div>
                    </div>
                    <div>
                        <h2 className="wh-h rv">6 <em>Cross-Department</em> Roles</h2>
                        <p className="wh-p rv d1">These roles hold authority spanning all departments simultaneously. Their directives take precedence within defined scope — ensuring the rover functions as one coherent system.</p>
                    </div>
                </div>
                <div className="cross-grid">
                    {cross.map((c, i) => (
                        <div className={`cr rv d${(i % 3) + 1}`} key={i}>
                            <div className="cr-i">{c.i}</div>
                            <div className="cr-t">{c.t}</div>
                            <div className="cr-b">{c.b}</div>
                            <div className="cr-d">{c.d}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Hierarchy */}
            <section id="s6">
                <div style={{ maxWidth: 900, margin: "0 auto" }}>
                    <div className="s-tag">Authority Model</div>
                    <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(38px,5.5vw,64px)", lineHeight: 1, letterSpacing: ".5px", marginBottom: 14 }}>
                        Command <em style={{ color: "var(--gold)", fontStyle: "normal" }}>Hierarchy</em>
                    </h2>
                    <p style={{ fontSize: 14, lineHeight: 1.85, color: "var(--fg2)", fontWeight: 300, maxWidth: 480 }}>12-level authority chain mirroring aerospace project management.</p>
                    <div className="hier">
                        {hierarchy.map((row, ri) => (
                            <div key={ri}>
                                {ri > 0 && <div className="harr" style={{ textAlign: "center", padding: "4px 0" }}>↓</div>}
                                <div className="hrow">
                                    {row.map((n: { t: string; s: string; type: string; wide?: boolean }, ni: number) => (
                                        <div key={ni} className={`hn${n.type === "cmd" ? " cmd" : n.type === "xf" ? " xf" : ""}`} style={n.wide ? { minWidth: 200 } : {}}>
                                            <div className="hn-t">{n.t}</div>
                                            <div className="hn-s">{n.s}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="hleg">
                        <div className="hli"><div className="hld" style={{ background: "rgba(212,168,67,.7)" }} />Command Roles</div>
                        <div className="hli"><div className="hld" style={{ background: "rgba(26,44,199,.6)" }} />Cross-Dept. Authority</div>
                        <div className="hli"><div className="hld" style={{ background: "rgba(255,255,255,.1)" }} />Departmental Roles</div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section id="s7">
                <div style={{ maxWidth: 1300, margin: "0 auto" }}>
                    <div className="s-tag">The People</div>
                    <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(38px,5.5vw,64px)", lineHeight: 1, letterSpacing: ".5px", marginBottom: 14 }}>
                        Leadership <em style={{ color: "var(--gold)", fontStyle: "normal" }}>Team</em>
                    </h2>
                    <p style={{ fontSize: 14, lineHeight: 1.85, color: "var(--fg2)", fontWeight: 300, maxWidth: 480 }}>Engineers and innovators driving the mission forward.</p>
                    <div className="team-grid">
                        {team.map((m, i) => (
                            <div className={`tc rv d${(i % 4) + 1}`} key={i}>
                                <div className={`tc-av${m.xf ? " xf" : ""}`}>{m.av}</div>
                                <div className="tc-n">{m.n}</div>
                                <div className="tc-r">{m.r}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
