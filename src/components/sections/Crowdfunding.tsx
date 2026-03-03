"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Button from "../ui/Button";

const Crowdfunding = () => {
    const [funding, setFunding] = useState(0);
    const target = 859000;

    useEffect(() => {
        let start = 0;
        const end = 859000;
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / 100));

        const timer = setInterval(() => {
            start += Math.floor(end / 100);
            if (start >= end) {
                setFunding(end);
                clearInterval(timer);
            } else {
                setFunding(start);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, []);

    return (
        <section id="crowdfunding" className="py-24 relative overflow-hidden">
            {/* Background radial gradient */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-odyssey/20 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-odyssey/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="section-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="overline mb-4 block">Crowdfunding</span>
                        <h2 className="mb-6">Fuel The Future of Space Exploration</h2>
                        <p className="text-white-80 mb-8 max-w-lg leading-relaxed">
                            Our research is powered by the vision of contributors. Your support enables us to procure high-precision actuators, carbon-fiber composites, and sophisticated sensor suites required for global competitions.
                        </p>
                        <div className="flex gap-4">
                            <Button href="#contribute">Contribute Now</Button>
                            <Button variant="secondary" href="#tier">View Tiers</Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="glass-card p-12 flex flex-col items-center justify-center text-center bg-gradient-to-b from-space-800 to-space-950"
                    >
                        <span className="text-[10px] uppercase tracking-widest text-cyan-odyssey mb-4 font-bold">Total Funding Raised</span>
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-4xl md:text-6xl font-display font-bold text-white-100 italic">₹</span>
                            <span className="text-5xl md:text-7xl font-display font-bold text-white-100 tabular-nums">
                                {funding.toLocaleString()}
                            </span>
                        </div>
                        <div className="w-full h-1.5 bg-space-700 rounded-full overflow-hidden mb-8">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "75%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="h-full bg-cyan-odyssey glow-cyan"
                            />
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-white-40">
                            Target: ₹1,200,000 — Phase 3 Procurement
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Crowdfunding;
