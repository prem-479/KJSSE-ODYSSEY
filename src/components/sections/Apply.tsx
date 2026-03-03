"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

const Apply = () => {
    return (
        <section id="apply" className="py-32 relative overflow-hidden bg-space-950">
            {/* ODYSSEY Logo Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none selec-none">
                <span className="text-[12rem] md:text-[24rem] font-display font-bold tracking-[0.2em] leading-none">
                    ODYSSEY
                </span>
            </div>

            <div className="section-container relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl mx-auto"
                >
                    <span className="overline mb-6 block">Join the mission</span>
                    <h2 className="mb-8">Are You Ready To Build The Uncharted?</h2>
                    <p className="text-white-80 text-lg mb-12 leading-relaxed">
                        We are looking for ambitious engineers, researchers, and strategists.
                        Applications for the 2025-26 cohort are now open.
                    </p>
                    <Button href="https://google.com" className="px-12 py-4 text-base font-bold">
                        APPLY NOW
                    </Button>
                    <p className="mt-8 text-[10px] uppercase tracking-widest text-white-40">
                        Selection process includes technical screening and mission-fit interview.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Apply;
