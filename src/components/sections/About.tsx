"use client";
import { useEffect, useRef } from "react";

function RoverCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const c = canvasRef.current;
        if (!c) return;
        const ctx = c.getContext("2d")!;
        let t = 0;
        let animId: number;

        const resize = () => {
            c.width = c.offsetWidth * window.devicePixelRatio;
            c.height = c.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();
        window.addEventListener("resize", resize);

        const G = (a = 1) => `rgba(212,168,67,${a})`;

        const frame = () => {
            const W = c.offsetWidth, H = c.offsetHeight;
            ctx.clearRect(0, 0, W, H);
            const cx = W / 2, cy = H / 2 + 10, sc = Math.min(W, H) / 340;

            // Grid
            ctx.strokeStyle = "rgba(212,168,67,0.05)"; ctx.lineWidth = 1;
            for (let x = 0; x < W; x += 48) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
            for (let y = 0; y < H; y += 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

            ctx.save(); ctx.translate(cx, cy); ctx.rotate(Math.sin(t * 0.0024) * 0.028); ctx.scale(sc, sc);

            // Glow beneath rover
            const g = ctx.createRadialGradient(0, 58, 5, 0, 58, 136);
            g.addColorStop(0, G(0.09)); g.addColorStop(1, "transparent");
            ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, 58, 136, 20, 0, 0, Math.PI * 2); ctx.fill();

            const whl = (x: number, y: number, r: number) => {
                ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(8,8,16,.97)"; ctx.fill();
                ctx.strokeStyle = G(0.68); ctx.lineWidth = 1.5; ctx.stroke();
                for (let i = 0; i < 6; i++) {
                    const a = (i / 6) * Math.PI * 2 + t * 0.009;
                    ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * 3, y + Math.sin(a) * 3);
                    ctx.lineTo(x + Math.cos(a) * (r - 3), y + Math.sin(a) * (r - 3));
                    ctx.strokeStyle = G(0.2); ctx.lineWidth = 0.9; ctx.stroke();
                }
                ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2);
                ctx.fillStyle = G(0.5); ctx.fill();
            };

            // Rocker arms
            ctx.strokeStyle = G(0.18); ctx.lineWidth = 2.2;
            [[[-115, 24], [-88, 7], [-20, 14]], [[115, 24], [88, 7], [20, 14]]].forEach(pts => {
                ctx.beginPath(); (pts as [number, number][]).forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
            });
            ([[-115, 24, 20], [-88, 7, 18], [20, 14, 18], [115, 24, 20], [88, 7, 18], [-20, 14, 18]] as [number, number, number][]).forEach(([x, y, r]) => whl(x, y, r));

            // Chassis
            const bg = ctx.createLinearGradient(-74, -31, 74, 31);
            bg.addColorStop(0, "rgba(20,20,32,.97)"); bg.addColorStop(1, "rgba(10,10,20,.97)");
            ctx.fillStyle = bg; ctx.strokeStyle = G(0.42); ctx.lineWidth = 1.1;
            ctx.beginPath(); ctx.roundRect(-74, -31, 148, 62, 8); ctx.fill(); ctx.stroke();
            ctx.strokeStyle = G(0.07); ctx.lineWidth = 0.7;
            ([[[-64, -8], [64, -8]], [[-64, 8], [64, 8]], [[-14, -31], [-14, 31]], [[14, -31], [14, 31]]] as [[number, number], [number, number]][]).forEach(([a, b]) => {
                ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke();
            });
            ctx.strokeStyle = G(0.28); ctx.lineWidth = 0.85;
            ctx.beginPath(); ctx.moveTo(-55, -31); ctx.lineTo(55, -31); ctx.stroke();

            // Solar panels
            const pp = 0.18 + Math.sin(t * 0.036) * 0.08;
            ([[-74], [74]] as [number][]).forEach(([px]) => {
                const x = px < 0 ? px - 34 : px;
                ctx.fillStyle = `rgba(36,52,170,${pp + 0.04})`; ctx.strokeStyle = G(0.32); ctx.lineWidth = 0.65;
                ctx.beginPath(); ctx.roundRect(x, -6, 34, 12, 2); ctx.fill(); ctx.stroke();
                for (let ci = 1; ci < 4; ci++) {
                    ctx.strokeStyle = "rgba(70,90,245,.14)"; ctx.lineWidth = 0.55;
                    ctx.beginPath(); ctx.moveTo(x + ci * 8.5, -6); ctx.lineTo(x + ci * 8.5, 6); ctx.stroke();
                }
            });

            // Mast + camera
            ctx.strokeStyle = G(0.26); ctx.lineWidth = 1.7;
            ctx.beginPath(); ctx.moveTo(-7, -31); ctx.lineTo(-7, -71); ctx.stroke();
            ctx.fillStyle = "rgba(12,12,22,.9)"; ctx.strokeStyle = G(0.38); ctx.lineWidth = 0.85;
            ctx.beginPath(); ctx.roundRect(-18, -80, 21, 12, 3); ctx.fill(); ctx.stroke();
            const lp = 0.35 + Math.sin(t * 0.063) * 0.33;
            ctx.beginPath(); ctx.arc(-7, -74, 4.2, 0, Math.PI * 2); ctx.fillStyle = `rgba(65,135,255,${lp})`; ctx.fill();
            ctx.strokeStyle = G(0.26); ctx.beginPath(); ctx.arc(-7, -74, 5.7, 0, Math.PI * 2); ctx.stroke();

            // Arm
            const a1 = -0.62 + Math.sin(t * 0.013) * 0.22;
            const a2 = 0.46 + Math.sin(t * 0.016 + 1) * 0.17;
            ctx.save(); ctx.translate(47, -31);
            ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI * 2); ctx.fillStyle = G(0.78); ctx.fill();
            ctx.rotate(a1); ctx.strokeStyle = G(0.72); ctx.lineWidth = 3.8; ctx.lineCap = "round";
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -44); ctx.stroke();
            ctx.beginPath(); ctx.arc(0, -44, 3.2, 0, Math.PI * 2); ctx.fillStyle = "#10102a"; ctx.fill();
            ctx.strokeStyle = G(0.42); ctx.lineWidth = 0.9; ctx.stroke();
            ctx.translate(0, -44); ctx.rotate(a2); ctx.strokeStyle = G(0.52); ctx.lineWidth = 2.6;
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -30); ctx.stroke();
            ctx.translate(0, -30); ctx.rotate(Math.sin(t * 0.02) * 0.26);
            ([[-4, 0], [4, 0]] as [number, number][]).forEach(([gx]) => {
                ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(gx, -7);
                ctx.strokeStyle = G(0.58); ctx.lineWidth = 1.5; ctx.stroke();
                ctx.beginPath(); ctx.arc(gx, -9, 2.3, 0, Math.PI * 2);
                ctx.fillStyle = G(0.38); ctx.fill();
            });
            ctx.restore();

            // Antenna
            ctx.strokeStyle = G(0.16); ctx.lineWidth = 1.1;
            ctx.beginPath(); ctx.moveTo(56, -31); ctx.lineTo(56, -52); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(56, -52); ctx.lineTo(50, -47); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(56, -52); ctx.lineTo(62, -47); ctx.stroke();
            const sa = 0.16 + Math.sin(t * 0.078) * 0.13;
            for (let i = 1; i <= 3; i++) {
                ctx.beginPath(); ctx.arc(56, -52, i * 6, Math.PI, Math.PI * 2);
                ctx.strokeStyle = `rgba(212,168,67,${sa / i})`; ctx.lineWidth = 0.6; ctx.stroke();
            }

            ctx.restore();
            t++; animId = requestAnimationFrame(frame);
        };
        frame();

        return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animId); };
    }, []);

    return <canvas ref={canvasRef} style={{ width: "100%", height: "380px", display: "block" }} />;
}

export default function About() {
    const features = [
        { icon: "🛸", title: "Mars-Analog Rover Platform", desc: "Rocker-bogie suspension, 6-DOF robotic arm, SLAM-based autonomous navigation, full ROS2 stack. Built to ERC, IRC, and URC compliance." },
        { icon: "🚁", title: "Autonomous Drone Systems", desc: "GPS-guided UAVs with real-time telemetry, dead-cat frames, and multi-mission payload systems." },
        { icon: "📐", title: "Industry-Grade Process", desc: "We mirror aerospace mission development: systems architecture, interface control, and verification & validation at every stage." },
    ];
    const specs = [
        { n: "6-DOF", l: "Robotic Arm" }, { n: "ROS2", l: "Software Stack" },
        { n: "SLAM", l: "Navigation" }, { n: "LoRa", l: "RF Comms" },
    ];

    return (
        <>
            <style>{`
        #s2 { position: relative; z-index: 2; background: transparent; color: var(--fg); border-top: 1px solid var(--line); }
        .ed-block { max-width: 1300px; margin: 0 auto; padding: 120px 5vw; display: grid; grid-template-columns: 1fr 2fr; gap: 80px; align-items: start; position: relative; }
        .ed-chapter { font-family: var(--font-bebas); font-size: clamp(100px,18vw,200px); line-height: 1; color: rgba(255,255,255,.03); letter-spacing: -3px; margin-bottom: -20px; }
        .ed-tag { font-family: var(--font-mono); font-size: 11px; font-weight: 400; letter-spacing: 5px; text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: 10px; margin-bottom: 20px; opacity: 0.8; }
        .ed-tag::before { content: ''; width: 25px; height: 1px; background: var(--gold); opacity: 0.4; }
        .ed-h { font-family: var(--font-bebas); font-size: clamp(42px,6vw,82px); line-height: 0.92; letter-spacing: .5px; color: #fff; margin-bottom: 24px; text-shadow: 0 0 50px rgba(255,255,255,0.05); }
        .ed-h em { color: var(--gold); font-style: normal; text-shadow: 0 0 40px rgba(212,168,67,0.2); }
        .ed-body { font-family: var(--font-serif); font-size: 16px; line-height: 1.85; color: var(--fg2); font-weight: 400; font-style: italic; margin-bottom: 48px; max-width: 600px; }
        .feat-row { display: flex; flex-direction: column; border-top: 1px solid var(--line); }
        .feat { display: grid; grid-template-columns: 52px 1fr; gap: 20px; align-items: start; padding: 28px 0; border-bottom: 1px solid var(--line); }
        .feat-ico { font-size: 20px; line-height: 1; padding-top: 4px; opacity: 0.8; }
        .feat-t { font-family: var(--font-mono); font-size: 14px; font-weight: 600; letter-spacing: 1px; color: var(--gold); margin-bottom: 8px; text-transform: uppercase; }
        .feat-d { font-family: var(--font-serif); font-size: 14px; color: var(--fg2); line-height: 1.65; font-weight: 400; font-style: italic; }
        .ed-visual { position: relative; margin-top: 60px; border-radius: 12px; overflow: hidden; background: radial-gradient(circle at 30% 30%, rgba(30,120,255,0.08) 0%, transparent 60%), #050510; border: 1px solid var(--line); box-shadow: 0 40px 100px rgba(0,0,0,0.5); }
        .rv-pill { position: absolute; bottom: 30px; right: 30px; background: rgba(0,0,0,0.6); backdrop-filter: blur(20px); border: 1px solid var(--line); border-radius: 8px; padding: 12px 20px; display: flex; gap: 16px; align-items: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .rv-pn { font-family: var(--font-bebas); font-size: 24px; color: var(--gold); line-height: 1; }
        .rv-pl { font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--fg3); margin-top: 2px; }
        .rv-sep { width: 1px; height: 32px; background: var(--line); }
        .spec-row { display: flex; gap: 48px; margin-top: 50px; flex-wrap: wrap; }
        .spec-n { font-family: var(--font-bebas); font-size: 32px; color: #fff; line-height: 1; margin-bottom: 4px; }
        .spec-l { font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--fg3); }

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

        @media(max-width:900px){ .ed-block { grid-template-columns: 1fr; gap: 40px; } }
      `}</style>

            <section id="s2">
                <div className="ed-block">
                    <div>
                        <div className="ed-chapter">01</div>
                        <div className="ed-tag">The Mission</div>
                    </div>
                    <div>
                        <h2 className="ed-h">Built to explore.<br /><em>Engineered to win.</em></h2>
                        <p className="ed-body">KJSSE Odyssey is the official Martian Rover &amp; Drone team of KJ Somaiya School of Engineering, Mumbai. We compete at the world&apos;s most prestigious student robotics challenges using aerospace-grade systems engineering — PDR, CDR, FMEA, RTM, and full V&amp;V. Every subsystem follows the same rigour applied in real space missions.</p>
                        <div className="feat-row">
                            {features.map((f, i) => (
                                <div className="feat" key={i}>
                                    <div className="feat-ico">{f.icon}</div>
                                    <div>
                                        <div className="feat-t">{f.title}</div>
                                        <div className="feat-d">{f.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="ed-visual">
                            <RoverCanvas />
                            <div className="rv-pill">
                                <div><div className="rv-pn">2024</div><div className="rv-pl">Founded</div></div>
                                <div className="rv-sep" />
                                <div><div className="rv-pn" style={{ color: "var(--fg)" }}>KJSSE</div><div className="rv-pl">Mumbai, IN</div></div>
                            </div>
                        </div>
                        <div className="spec-row">
                            {specs.map((s, i) => (
                                <div key={i}><div className="spec-n">{s.n}</div><div className="spec-l">{s.l}</div></div>
                            ))}
                        </div>
                    </div>

                    <div className="un-tab">
                        <div className="un-tab-num">01</div>
                        <div className="un-tab-label">MISSION BRIEF</div>
                    </div>
                </div>
            </section>
        </>
    );
}
