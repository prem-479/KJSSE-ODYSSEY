"use client";

const competitions = [
    {
        id: "comp-erc",
        bg: "var(--ink)",
        ghost: "ERC",
        flag: "🇵🇱",
        kicker: "ERC — European Rover Challenge",
        title: "HARNESSING\nEUROPEAN SKIES",
        body: "Poland's premier international student rover competition. Tests rovers on Mars-analog terrain across navigation, science, and manipulation — judged by ESA and space industry experts.",
    },
    {
        id: "comp-irc",
        bg: "var(--ink2)",
        ghost: "IRC",
        flag: "🇮🇳",
        kicker: "IRC — International Rover Challenge",
        title: "INDIA'S\nFRONTIER",
        body: "India's flagship student rover competition with pan-Asian participation. Tasks cover autonomous terrain traverse, robotic arm operations, and on-board science experiments.",
    },
    {
        id: "comp-urc",
        bg: "var(--ink)",
        ghost: "URC",
        flag: "🇺🇸",
        kicker: "URC — University Rover Challenge",
        title: "THE ULTIMATE\nAMBITION",
        body: "The world's most prestigious student robotics competition at the Mars Desert Research Station, Utah. The pinnacle of student rover engineering — our north star.",
    },
];

export default function Competitions() {
    return (
        <>
            <style>{`
        .comp-scroll { height: 200svh; position: relative; background: transparent; }
        .comp-sticky { position: sticky; top: 0; height: 100svh; overflow: hidden; display: flex; align-items: center; justify-content: flex-start; padding: 0-5vw; background: transparent; }
        .comp-sticky::before { content: ''; position: absolute; inset: 0; z-index: 0; background: radial-gradient(circle at 20% 50%, rgba(30,120,255,0.08) 0%, transparent 70%); }
        .comp-ghost { position: absolute; top: 50%; right: 3vw; transform: translateY(-50%); font-family: var(--font-bebas); font-size: clamp(200px,32vw,400px); color: rgba(255,255,255,.025); line-height: 1; letter-spacing: -4px; user-select: none; z-index: 1; filter: blur(1px); }
        .comp-content { position: relative; z-index: 2; max-width: 680px; padding: 0 5vw; }
        .comp-flag { font-size: 44px; margin-bottom: 24px; display: block; filter: drop-shadow(0 0 20px rgba(255,255,255,0.2)); }
        .comp-kicker { font-family: var(--font-mono); font-size: 11px; font-weight: 400; letter-spacing: 6px; text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: 15px; margin-bottom: 20px; opacity: 0.8; }
        .comp-kicker::before { content: ''; width: 30px; height: 1px; background: var(--gold); opacity: 0.4; }
        .comp-h { font-family: var(--font-bebas); font-size: clamp(50px,8vw,110px); line-height: 0.88; letter-spacing: 0.5px; margin-bottom: 28px; white-space: pre-line; color: #fff; text-shadow: 0 0 40px rgba(212,168,67,0.1); }
        .comp-rule { width: 50px; height: 1px; background: var(--gold); margin-bottom: 28px; opacity: 0.5; }
        .comp-p { font-family: var(--font-serif); font-size: 16px; line-height: 1.85; color: var(--fg2); font-weight: 400; font-style: italic; max-width: 550px; }

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
      `}</style>
            {competitions.map((c, idx) => (
                <div key={c.id} className="comp-scroll" id={c.id}>
                    <div className="comp-sticky">
                        <div className="comp-ghost">{c.ghost}</div>
                        <div className="comp-content">
                            <span className="comp-flag">{c.flag}</span>
                            <div className="comp-kicker">{c.kicker}</div>
                            <h3 className="comp-h">{c.title}</h3>
                            <div className="comp-rule" />
                            <p className="comp-p">{c.body}</p>
                        </div>
                        <div className="un-tab">
                            <div className="un-tab-num">0{idx + 3}</div>
                            <div className="un-tab-label">MISSION LOG</div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
