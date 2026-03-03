"use client";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titlePanelRef = useRef<HTMLDivElement>(null);
  const statPanels = useRef<(HTMLDivElement | null)[]>([]);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById("h-eyebrow")?.classList.add("show");
      document.getElementById("h-w1")?.classList.add("show");
      setTimeout(() => document.getElementById("h-w2")?.classList.add("show"), 150);
      document.getElementById("h-tagline")?.classList.add("show");
      document.getElementById("h-scroll-cue")?.classList.add("show");
      document.getElementById("hero-logo-wrap")?.classList.add("show");
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Scroll driver
  useEffect(() => {
    let lastPhase = -1;

    const drive = () => {
      const s = sectionRef.current;
      if (!s) return;
      const y = window.scrollY;
      const top = s.offsetTop;
      const h = s.offsetHeight;
      const vh = window.innerHeight;
      const scrollable = h - vh;
      if (y < top || y > top + scrollable) return;
      const t = (y - top) / scrollable;

      let phase = 0;
      if (t < 0.18) phase = 0;
      else if (t < 0.37) phase = 1;
      else if (t < 0.56) phase = 2;
      else if (t < 0.75) phase = 3;
      else phase = 4;

      if (phase === lastPhase) return;
      lastPhase = phase;

      // Title panel
      if (titlePanelRef.current) {
        titlePanelRef.current.style.opacity = phase === 0 ? "1" : "0";
        titlePanelRef.current.style.transform = phase === 0 ? "none" : "translateY(-40px)";
      }
      // Stat panels
      statPanels.current.forEach((sp, i) => {
        if (!sp) return;
        const active = i === phase - 1;
        sp.style.opacity = active ? "1" : "0";
        sp.style.transform = active ? "none" : i < phase - 1 ? "translateY(-30px)" : "translateY(30px)";
      });
    };

    window.addEventListener("scroll", drive, { passive: true });
    drive();
    return () => window.removeEventListener("scroll", drive);
  }, []);

  const stats = [
    { num: "46", kicker: "Engineering Corps", label: "A multi-disciplinary force building the future of autonomous systems." },
    { num: "5", kicker: "Specialized Hubs", label: "Coding · Electronics · Mecharonics · Research · Strategy" },
    { num: "3", kicker: "Global Fronts", label: "Defending engineering excellence in Poland, India, and the USA." },
    { num: "∞", kicker: "Mission Velocity", label: "Pushing the boundaries of what is possible on any planetary surface." },
  ];

  return (
    <>
      <style>{`
        #s1 { height: 500svh; position: relative; background: transparent; }
        #s1-sticky { position: sticky; top: 0; height: 100svh; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        #hero-bg-nebula {
            position: absolute; inset: 0; z-index: 1;
            background: radial-gradient(circle at 70% 30%, rgba(30,70,200,0.1) 0%, transparent 60%),
                        radial-gradient(circle at 20% 80%, rgba(80,20,150,0.08) 0%, transparent 50%);
        }
        
        #hero-rim-glow {
            position: absolute; bottom: -20vh; left: -10vw; right: -10vw; height: 60vh;
            background: radial-gradient(ellipse at 50% 100%, rgba(30,120,255,0.15) 0%, transparent 70%);
            z-index: 2; pointer-events: none;
        }

        #planet-mars {
            position: absolute; bottom: -8vw; right: -5vw; z-index: 2;
            width: clamp(320px,42vw,620px); height: clamp(320px,42vw,620px);
            border-radius: 50%; overflow: hidden;
            box-shadow: -30px -30px 100px rgba(0,0,0,0.8), 0 0 120px rgba(180,60,20,0.1);
            animation: marsFloat 18s ease-in-out infinite;
        }
        #planet-mars img { width: 100%; height: 100%; object-fit: cover; opacity: 0.95; }
        @keyframes marsFloat { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-25px) rotate(0.6deg)} }

        #hero-overlay {
            position: absolute; inset: 0; z-index: 3; pointer-events: none;
            background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 25%),
                        linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 15%);
        }

        /* Cinematic Typography */
        #h-title {
            position: absolute; inset: 0; z-index: 4;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            padding: 10vh 5vw; pointer-events: none; text-align: center;
            transition: opacity .8s var(--ease), transform .8s var(--ease);
        }
        .hero-logo-wrap {
            margin-bottom: 40px; opacity: 0; transform: scale(.9) translateY(20px);
            transition: opacity 1.2s var(--ease), transform 1.2s var(--ease);
        }
        .hero-logo-wrap.show { opacity: 1; transform: scale(1) translateY(0); }
        .hero-logo-img {
            width: clamp(200px,30vw,420px); height: clamp(200px,30vw,420px);
            border-radius: 50%; object-fit: cover;
            border: 1px solid rgba(212,168,67,0.3);
            filter: drop-shadow(0 0 50px rgba(212,168,67,0.25));
        }

        #h-eyebrow {
            font-family: var(--font-mono); font-size: 11px; letter-spacing: 6px;
            color: var(--gold); margin-bottom: 24px; opacity: 0; transform: translateY(20px);
            transition: opacity .8s var(--ease); display: flex; align-items: center; gap: 15px;
        }
        #h-eyebrow.show { opacity: 0.8; transform: none; }
        .h-eyebrow-line { width: 30px; height: 1px; background: var(--gold); opacity: 0.4; }

        .h-big {
            font-family: var(--font-bebas); font-size: clamp(70px,15vw,180px);
            line-height: 0.82; letter-spacing: 1px; overflow: hidden;
        }
        .h-big-inner {
            display: block; transform: translateY(110%);
            transition: transform 1.2s var(--ease);
            text-shadow: 0 0 60px rgba(212,168,67,0.15);
        }
        .h-big-inner.show { transform: none; }
        .h-big-inner.gold { color: var(--gold); text-shadow: 0 0 50px rgba(212,168,67,0.4); }

        #h-tagline {
            font-family: var(--font-serif); font-weight: 400; font-style: italic;
            font-size: clamp(16px,2vw,22px); letter-spacing: 2px;
            color: var(--fg2); margin-top: 24px; opacity: 0;
            transition: opacity 1.2s var(--ease) 0.6s;
        }
        #h-tagline.show { opacity: 1; }

        #h-scroll-cue {
            position: absolute; bottom: 6vh; left: 50%; transform: translateX(-50%);
            z-index: 5; display: flex; flex-direction: column; align-items: center; gap: 12px;
            color: var(--fg3); font-family: var(--font-mono);
            font-size: 9px; letter-spacing: 4px; opacity: 0;
            transition: opacity 1s var(--ease) 2s;
        }
        #h-scroll-cue.show { opacity: 0.6; }
        .scroll-wire { width: 1px; height: 50px; background: linear-gradient(to bottom, var(--gold), transparent); animation: wire 2s infinite; }
        @keyframes wire { 0%,100%{transform:scaleY(0.2);opacity:0.2} 50%{transform:scaleY(1);opacity:1} }

        .stat-panel {
            position: absolute; inset: 0; z-index: 4;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            pointer-events: none; opacity: 0; transition: opacity 0.6s var(--ease), transform 0.6s var(--ease);
        }
        .stat-num { font-family: var(--font-bebas); font-size: clamp(110px,18vw,210px); color: #fff; line-height: 1; }
        .stat-kicker { font-family: var(--font-mono); font-size: 11px; color: var(--gold); letter-spacing: 4px; margin-bottom: 20px; }
        .stat-label { font-family: var(--font-serif); font-size: clamp(16px,2.2vw,24px); color: var(--fg2); max-width: 550px; text-align: center; font-style: italic; }
      `}</style>

      <section id="s1" ref={sectionRef}>
        <div id="s1-sticky">
          <div id="hero-bg-nebula" />
          <div id="hero-rim-glow" />

          <div id="planet-mars">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/800px-OSIRIS_Mars_true_color.jpg" alt="Mars" crossOrigin="anonymous" />
          </div>

          <div id="hero-overlay" />

          <div id="h-title" ref={titlePanelRef}>
            <div className="hero-logo-wrap" id="hero-logo-wrap">
              <img className="hero-logo-img" src="/logo-badge.jpg" alt="Odyssey Mission Patch" />
            </div>
            <div id="h-eyebrow">
              <span className="h-eyebrow-line" />
              KJSSE · DEEP SPACE EXPLORATION UNIT
              <span className="h-eyebrow-line" />
            </div>
            <div className="h-big"><span className="h-big-inner" id="h-w1">VOYAGING TO</span></div>
            <div className="h-big"><span className="h-big-inner gold" id="h-w2">THE FRONTIER</span></div>
            <div id="h-tagline">Advanced Martian Robotics & Drone Systems</div>
          </div>

          {stats.map((s, i) => (
            <div key={i} className="stat-panel" ref={el => { statPanels.current[i] = el; }}>
              <div className="stat-kicker">{s.kicker}</div>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}

          <div id="h-scroll-cue">
            <div className="scroll-wire" />
            <span>INITIATE DESCENT</span>
          </div>
        </div>
      </section>
    </>
  );
}
