"use client";
import { useEffect, useRef } from "react";

const DEPTS = [
    { bgn: "01", tag: "Coding Department", name: "Coding", desc: "Full software stack — ROS2 architecture, SLAM autonomous navigation, MoveIt2 arm control, Gazebo simulation, and custom operator GUIs. The brain of the rover.", chips: ["ROS2", "SLAM", "Autonomy", "MoveIt2", "Nav2", "Embedded C"], mem: "10–12 Members", icon: "💻" },
    { bgn: "02", tag: "Electronics Department", name: "Electronics", desc: "Custom PCB design, power distribution & BMS, LoRa/900MHz RF communication, sensor integration, and full wiring harness engineering. The nervous system.", chips: ["KiCad", "PCB Design", "LoRa RF", "BMS", "Sensors"], mem: "6–7 Members", icon: "⚡" },
    { bgn: "03", tag: "Mechanical Department", name: "Mechanical", desc: "Structural design, suspension geometry, 6-DOF robotic arm, FEA validation, CNC machining, and 3D printing. The physical body of the rover.", chips: ["SolidWorks", "FEA", "CNC", "Robotic Arm", "3D Print"], mem: "10–12 Members", icon: "⚙️" },
    { bgn: "04", tag: "Research / IP / Simulation", name: "Research & Sim", desc: "MATLAB/Simulink dynamics modelling, digital twin development, IP filing, 3D rendering, and performance analytics. Theory meets hardware.", chips: ["MATLAB", "Simulink", "Digital Twin", "IP Strategy"], mem: "5 Members", icon: "🔬" },
    { bgn: "05", tag: "Marketing & Management", name: "Management", desc: "Sponsorship strategy, budget management, competition logistics, brand design, media production, and institutional representation. The operational backbone.", chips: ["Sponsorship", "Finance", "Creative", "Logistics", "Media"], mem: "10 Members", icon: "📊" },
];

export default function Departments() {
    const sectionRef = useRef<HTMLElement>(null);
    const curDeptRef = useRef(-1);

    const setDept = (i: number) => {
        if (i === curDeptRef.current || i < 0 || i >= DEPTS.length) return;
        curDeptRef.current = i;
        const d = DEPTS[i];
        const el = (id: string) => document.getElementById(id);
        if (el("d-bgn")) el("d-bgn")!.textContent = d.bgn;
        if (el("d-tag")) el("d-tag")!.textContent = d.tag;
        if (el("d-name")) el("d-name")!.textContent = d.name;
        if (el("d-desc")) el("d-desc")!.textContent = d.desc;
        if (el("d-mem")) el("d-mem")!.textContent = d.mem;
        const chips = el("d-chips");
        if (chips) chips.innerHTML = d.chips.map(c => `<span class="chip">${c}</span>`).join("");
        document.querySelectorAll(".d-panel").forEach((p, pi) => p.classList.toggle("on", pi === i));
        document.querySelectorAll(".d-dot").forEach((dt, di) => dt.classList.toggle("on", di === i));
    };

    useEffect(() => {
        setDept(0);
        const drive = () => {
            const s = sectionRef.current;
            if (!s) return;
            const y = window.scrollY, top = s.offsetTop, h = s.offsetHeight, vh = window.innerHeight;
            const stickyStart = top;
            const scrollable = h - vh;
            const into = y - stickyStart;
            if (into < 0 || into > scrollable) return;
            const idx = Math.min(Math.floor((into / scrollable) * DEPTS.length), DEPTS.length - 1);
            setDept(idx);
        };
        window.addEventListener("scroll", drive, { passive: true });
        drive();
        return () => window.removeEventListener("scroll", drive);
    }, []);

    return (
        <>
            <style>{`
        #s3 { height: 600svh; position: relative; background: transparent; }
        #s3-sticky {
          position: sticky; top: 0; height: 100svh; overflow: hidden;
          background: transparent; display: flex;
        }
        .d-left {
          width: 42%; padding: 0 5vw; display: flex; flex-direction: column;
          justify-content: center; position: relative; z-index: 2;
        }
        .d-bg-n { font-family: var(--font-bebas); font-size: clamp(90px,15vw,180px); color: rgba(255,255,255,.03); line-height: 1; letter-spacing: -3px; margin-bottom: -12px; }
        .d-tag-label { font-family: var(--font-mono); font-size: 11px; font-weight: 400; letter-spacing: 5px; text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: 10px; margin-bottom: 12px; opacity: 0.8; }
        .d-tag-label::before { content: ''; width: 25px; height: 1px; background: var(--gold); opacity: 0.4; }
        .d-name { font-family: var(--font-bebas); font-size: clamp(44px,6vw,82px); line-height: .92; letter-spacing: .5px; color: #fff; margin-bottom: 20px; text-shadow: 0 0 40px rgba(255,255,255,0.1); }
        .d-desc { font-family: var(--font-serif); font-size: 15px; line-height: 1.85; color: var(--fg2); font-weight: 400; font-style: italic; max-width: 380px; margin-bottom: 28px; }
        .d-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
        .d-chip { font-family: var(--font-mono); font-size: 9px; padding: 4px 10px; border: 1px solid var(--line); border-radius: 3px; color: var(--fg3); letter-spacing: 1px; }
        .d-members { font-family: var(--font-mono); font-size: 12px; color: var(--gold); letter-spacing: 2px; text-transform: uppercase; }
        .d-right { flex: 1; position: relative; overflow: hidden; }
        .d-panel { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .9s var(--ease); }
        .d-panel.on { opacity: 1; }
        .d-panel-bg { font-size: clamp(160px,28vw,320px); opacity: .05; user-select: none; transform: rotate(-10deg); line-height: 1; filter: blur(2px); }
        
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

        @media(max-width:900px){ .d-left { width: 100%; padding: 80px 5vw 16px; } #s3-sticky { flex-direction: column; } .d-right { min-height: 200px; width: 100%; } }
      `}</style>

            <section id="s3" ref={sectionRef}>
                <div id="s3-sticky">
                    <div className="d-left">
                        <div className="d-bg-n" id="d-bgn">01</div>
                        <div className="d-tag-label" id="d-tag">Department</div>
                        <div className="d-name" id="d-name">—</div>
                        <div className="d-desc" id="d-desc">—</div>
                        <div className="d-chips" id="d-chips" />
                        <div className="d-members" id="d-mem">—</div>
                    </div>
                    <div className="d-right" id="d-right">
                        {DEPTS.map((d, i) => (
                            <div className={`d-panel${i === 0 ? " on" : ""}`} key={i}>
                                <div className="d-panel-bg">{d.icon}</div>
                            </div>
                        ))}
                    </div>

                    <div className="un-tab">
                        <div className="un-tab-num">02</div>
                        <div className="un-tab-label">DEPARTMENTS</div>
                    </div>
                </div>
            </section>
        </>
    );
}
