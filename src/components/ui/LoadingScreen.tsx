"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);

    // Progress counter
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) { clearInterval(interval); return 100; }
                return prev + 1;
            });
        }, 22);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
            style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
        >
            {/* Centred HUD content */}
            <div style={{
                position: "relative", zIndex: 10,
                height: "100%", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center"
            }}>
                {/* Outer glow ring */}
                <div style={{
                    position: "relative", width: 380, height: 240,
                    display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    {/* Rotating ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: "absolute",
                            width: "100%", height: "100%",
                            border: "1px solid rgba(212,168,67,0.15)",
                            borderRadius: "50%",
                            boxShadow: "inset 0 0 40px rgba(212,168,67,0.04)",
                        }}
                    />
                    {/* Counter-rotating ring */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: "absolute",
                            width: "82%", height: "82%",
                            border: "1px dashed rgba(212,168,67,0.07)",
                            borderRadius: "50%",
                        }}
                    />
                    {/* Orbiting glint */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        style={{ position: "absolute", width: "100%", height: "100%" }}
                    >
                        <div style={{
                            position: "absolute", top: "-5px", left: "50%",
                            width: 8, height: 8, borderRadius: "50%",
                            background: "#d4a843",
                            boxShadow: "0 0 20px #d4a843, 0 0 50px #d4a843, 0 0 100px rgba(212,168,67,0.4)"
                        }} />
                    </motion.div>

                    {/* Logo */}
                    <motion.img
                        src="/logo-loader.png"
                        alt="Team Odyssey"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: "relative", zIndex: 4,
                            width: "300px", height: "auto",
                            mixBlendMode: "screen",
                            filter: "brightness(1.2) contrast(2.0) saturate(1.5) drop-shadow(0 0 24px rgba(212,168,67,0.3))",
                        }}
                    />
                </div>

                {/* Sub-line */}
                <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.8 }}
                    style={{
                        marginTop: 8,
                        fontFamily: "var(--font-mono)",
                        fontSize: 9, letterSpacing: "5px",
                        color: "rgba(212,168,67,0.6)", textTransform: "uppercase"
                    }}
                >
                    KJSSE · DEEP SPACE PROGRAM
                </motion.div>

                {/* Progress bar */}
                <div style={{
                    marginTop: 40, width: 220, height: 1,
                    background: "rgba(255,255,255,0.08)", overflow: "hidden", position: "relative"
                }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        style={{
                            height: "100%",
                            background: "linear-gradient(90deg, rgba(212,168,67,0.4), #d4a843)",
                            boxShadow: "0 0 12px #d4a843"
                        }}
                    />
                </div>

                {/* Percentage */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    style={{
                        marginTop: 14,
                        fontFamily: "var(--font-mono)", fontSize: 8,
                        letterSpacing: "4px", color: "rgba(255,255,255,0.3)",
                        textTransform: "uppercase"
                    }}
                >
                    {progress < 100 ? `SYSTEMS ONLINE — ${progress}%` : "LAUNCH READY"}
                </motion.div>
            </div>
        </motion.div>
    );
}
