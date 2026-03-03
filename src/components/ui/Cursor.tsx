"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let mx = 0, my = 0, rx = 0, ry = 0;

        const onMove = (e: MouseEvent) => {
            mx = e.clientX; my = e.clientY;
            if (dotRef.current) {
                dotRef.current.style.left = mx + "px";
                dotRef.current.style.top = my + "px";
            }
        };
        document.addEventListener("mousemove", onMove);

        let frame: number;
        const tick = () => {
            rx += (mx - rx) * 0.1;
            ry += (my - ry) * 0.1;
            if (ringRef.current) {
                ringRef.current.style.left = rx + "px";
                ringRef.current.style.top = ry + "px";
            }
            frame = requestAnimationFrame(tick);
        };
        tick();

        const hoverEls = document.querySelectorAll("a,button,.hover-target");
        const addHover = () => document.body.classList.add("hovered");
        const removeHover = () => document.body.classList.remove("hovered");
        hoverEls.forEach(el => {
            el.addEventListener("mouseenter", addHover);
            el.addEventListener("mouseleave", removeHover);
        });

        return () => {
            document.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <>
            <style>{`
        #cursor-dot {
          position:fixed; z-index:9999; pointer-events:none;
          width:8px; height:8px; border-radius:50%; background:var(--gold);
          transform:translate(-50%,-50%);
          transition:width .25s var(--ease), height .25s var(--ease), opacity .2s;
          mix-blend-mode:difference;
        }
        #cursor-ring {
          position:fixed; z-index:9998; pointer-events:none;
          width:34px; height:34px; border-radius:50%;
          border:1.5px solid rgba(212,168,67,.55);
          transform:translate(-50%,-50%);
          transition:left .08s linear, top .08s linear;
        }
        body.hovered #cursor-dot { width:28px; height:28px; opacity:.3; }
      `}</style>
            <div id="cursor-dot" ref={dotRef} />
            <div id="cursor-ring" ref={ringRef} />
        </>
    );
}
