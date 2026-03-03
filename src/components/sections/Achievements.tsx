"use client";

import React from "react";
import { motion } from "framer-motion";

const milestones = [
    {
        year: "2024",
        title: "ERC Finalists",
        description: "Ranked among the top teams globally at the European Rover Challenge, Poland.",
        side: "left",
    },
    {
        year: "2023",
        title: "URC Merit Award",
        description: "Received special recognition for autonomous navigation at University Rover Challenge.",
        side: "right",
    },
    {
        year: "2022",
        title: "National Victory",
        description: "Winners of the Indian Rover Challenge with maximum points in science payload.",
        side: "left",
    },
    {
        year: "2021",
        title: "Odyssey Protocol",
        description: "Initial research unit founded with a mission to bridge the gap between classroom and aerospace.",
        side: "right",
    },
];

const Achievements = () => {
    return (
        <section id="achievements" className="py-24 bg-space-950 relative overflow-hidden">
            <div className="section-container">
                <div className="text-center mb-20">
                    <span className="overline mb-4 block">Our Orbit</span>
                    <h2>Mission Milestones</h2>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Center Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white-40/10 -translate-x-1/2 hidden md:block" />

                    <div className="flex flex-col gap-12 md:gap-24">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row items-center gap-8 ${milestone.side === "right" ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Milestone Card */}
                                <div className="flex-1 w-full md:w-auto">
                                    <div className={`glass-card p-8 group hover:border-cyan-odyssey/30 ${milestone.side === "left" ? "md:text-right" : "md:text-left"
                                        }`}>
                                        <span className="text-cyan-odyssey font-mono text-sm mb-2 block">{milestone.year}</span>
                                        <h4 className="text-xl font-display mb-3 text-white-100">{milestone.title}</h4>
                                        <p className="text-sm text-white-60 leading-relaxed max-w-sm ml-auto mr-auto md:ml-0 md:mr-0">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Center Node */}
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-space-900 border border-white-40/20 rounded-full flex items-center justify-center group">
                                        <div className="w-3 h-3 bg-cyan-odyssey rounded-full shadow-[0_0_15px_var(--odyssey-cyan)]" />
                                    </div>
                                </div>

                                {/* Empty Space for alignment */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Achievements;
