"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-space-950 pt-20 pb-10 border-t border-cyan-odyssey/10">
            <div className="section-container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Column 1: Identity */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-display font-bold tracking-[0.15em] text-white-100">
                                ODYSSEY
                            </span>
                            <div className="w-2 h-2 bg-cyan-odyssey rounded-full animate-pulse" />
                        </div>
                        <p className="text-sm text-white-60 leading-relaxed max-w-xs">
                            KJSSE Odyssey is the premier aerospace research and development unit of K. J. Somaiya College of Engineering, pioneering student-led rover engineering.
                        </p>
                    </div>

                    {/* Column 2: Navigation */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white-100 font-display text-sm tracking-widest uppercase">Mission Control</h4>
                        <div className="flex flex-col gap-3">
                            <Link href="#rovers" className="text-sm text-white-60 hover:text-cyan-odyssey transition-colors">The Rovers</Link>
                            <Link href="#departments" className="text-sm text-white-60 hover:text-cyan-odyssey transition-colors">Specializations</Link>
                            <Link href="#team" className="text-sm text-white-60 hover:text-cyan-odyssey transition-colors">The Crew</Link>
                            <Link href="#achievements" className="text-sm text-white-60 hover:text-cyan-odyssey transition-colors">Achievements</Link>
                        </div>
                    </div>

                    {/* Column 3: Institutional / Contact */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white-100 font-display text-sm tracking-widest uppercase">Institution</h4>
                        <div className="flex flex-col gap-3">
                            <span className="text-sm text-white-60">K. J. Somaiya College of Engineering</span>
                            <span className="text-sm text-white-60">Somaiya Vidyavihar University, Mumbai</span>
                            <Link href="mailto:odyssey@somaiya.edu" className="text-sm text-cyan-odyssey hover:underline transition-all">odyssey@somaiya.edu</Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white-40/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] uppercase tracking-widest text-white-40">
                        © {new Date().getFullYear()} KJSSE ODYSSEY. ALL SYSTEMS NOMINAL.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-[10px] uppercase tracking-widest text-white-40 hover:text-white-100 transition-colors">Privacy Protocol</Link>
                        <Link href="#" className="text-[10px] uppercase tracking-widest text-white-40 hover:text-white-100 transition-colors">Media Kit</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
