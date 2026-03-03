"use client";

import React from "react";
import { motion } from "framer-motion";

const sponsors = [
    { name: "Sponsor Alpha", type: "Platinum" },
    { name: "Sponsor Beta", type: "Platinum" },
    { name: "Sponsor Gamma", type: "Gold" },
    { name: "Sponsor Delta", type: "Gold" },
    { name: "Sponsor Epsilon", type: "Silver" },
    { name: "Sponsor Zeta", type: "Silver" },
    { name: "Sponsor Eta", type: "Silver" },
    { name: "Sponsor Theta", type: "Silver" },
];

const Sponsors = () => {
    return (
        <section id="sponsors" className="py-24 bg-space-900 border-t border-white-40/5">
            <div className="section-container">
                <div className="text-center mb-16">
                    <span className="overline mb-4 block">Strategic Support</span>
                    <h2>Our Partners in Progress</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {sponsors.map((sponsor, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="group flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 bg-space-800/50 p-8 rounded-xl border border-transparent hover:border-cyan-odyssey/20 hover:scale-105"
                        >
                            <div className="h-12 w-32 bg-white-40/10 rounded group-hover:bg-cyan-odyssey/10 transition-colors flex items-center justify-center">
                                <span className="text-[10px] uppercase tracking-tighter text-white-40 group-hover:text-cyan-odyssey/60 font-bold">
                                    {sponsor.name}
                                </span>
                            </div>
                            <span className="mt-4 text-[8px] uppercase tracking-[0.3em] text-white-40 font-medium">
                                {sponsor.type} PARTNER
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Sponsors;
