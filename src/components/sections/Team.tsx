"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const teamData = {
    "2024-25": [
        { name: "Aarav Sharma", role: "Team Lead", image: "/team/placeholder.jpg" },
        { name: "Ananya Iyer", role: "Mechanical Head", image: "/team/placeholder.jpg" },
        { name: "Ishaan Gupta", role: "Electronics Lead", image: "/team/placeholder.jpg" },
        { name: "Sanya Malhotra", role: "Software Architect", image: "/team/placeholder.jpg" },
        { name: "Rohan Varma", role: "Systems Engineer", image: "/team/placeholder.jpg" },
        { name: "Aditi Rao", role: "Science Payload Lead", image: "/team/placeholder.jpg" },
        { name: "Vikram Singh", role: "Operations Manager", image: "/team/placeholder.jpg" },
        { name: "Nisha Patel", role: "Communications Lead", image: "/team/placeholder.jpg" },
    ],
    "2023-24": [
        { name: "Sameer Deshmukh", role: "Past Lead", image: "/team/placeholder.jpg" },
        { name: "Kavita Reddy", role: "Structural Design", image: "/team/placeholder.jpg" },
        // Add more members as needed
    ],
};

const Team = () => {
    const [activeYear, setActiveYear] = useState("2024-25");

    return (
        <section id="team" className="py-24 bg-space-900 overflow-hidden">
            <div className="section-container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <span className="overline mb-4 block">The Crew</span>
                        <h2>Our Multi-disciplinary Team</h2>
                    </div>

                    {/* Year Selector */}
                    <div className="flex bg-space-800 p-1 rounded-full border border-white-40/10">
                        {Object.keys(teamData).map((year) => (
                            <button
                                key={year}
                                onClick={() => setActiveYear(year)}
                                className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 ${activeYear === year
                                        ? "bg-cyan-odyssey text-space-900 font-bold"
                                        : "text-white-40 hover:text-white-100"
                                    }`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {teamData[activeYear as keyof typeof teamData].map((member, index) => (
                            <motion.div
                                key={`${activeYear}-${member.name}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="relative mb-6">
                                    {/* Image Circle */}
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white-40/10 group-hover:border-cyan-odyssey/50 transition-colors duration-500 bg-space-800 flex items-center justify-center">
                                        {/* Placeholder content until real images are provided */}
                                        <div className="text-white-40 text-[10px] uppercase tracking-tighter opacity-20">ODYSSEY MEMBER</div>
                                        {/* <img src={member.image} alt={member.name} className="w-full h-full object-cover" /> */}
                                    </div>

                                    {/* LinkedIn Icon small placeholder */}
                                    <div className="absolute bottom-1 right-1 w-8 h-8 bg-cyan-odyssey rounded-full flex items-center justify-center translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 cursor-pointer">
                                        <svg className="w-4 h-4 text-space-900" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </div>
                                </div>

                                <h4 className="text-white-100 font-display text-sm md:text-base mb-1 tracking-tight">{member.name}</h4>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-odyssey font-medium">{member.role}</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Team;
