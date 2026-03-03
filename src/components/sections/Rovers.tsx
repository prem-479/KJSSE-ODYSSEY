"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Float } from "@react-three/drei";

const rovers = [
    {
        name: "ODYSSEY I",
        mission: "Mars Desert Research Challenge",
        year: "2023",
        specs: {
            mass: "45kg",
            topSpeed: "0.8 m/s",
            drive: "6-Wheel Independent",
            nav: "Lidar + Stereo",
        },
        features: ["Autonomous Navigation", "High-Torque Actuators", "Titanium Alloy Chassis"],
        color: "#00e5ff",
    },
    {
        name: "PRATHAM",
        mission: "ERC Finalist",
        year: "2024",
        specs: {
            mass: "38kg",
            topSpeed: "1.2 m/s",
            drive: "Rocker-Bogie 2.0",
            nav: "Visual SLAM",
        },
        features: ["Carbon Fiber Frame", "Modular Payload Bay", "AI Obstacle Evasion"],
        color: "#ff8c2a",
    },
];

const RoverDisplay = ({ color }: { color: string }) => (
    <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Float speed={2} rotationIntensity={0.5}>
            <mesh>
                <boxGeometry args={[2.5, 1.2, 3.5]} />
                <MeshDistortMaterial
                    color={color}
                    speed={1}
                    distort={0.1}
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>
        </Float>
        <OrbitControls enableZoom={false} />
    </Canvas>
);

const Rovers = () => {
    return (
        <section id="rovers" className="relative min-h-[120vh] bg-space-900 py-24 overflow-hidden">
            <div className="section-container mb-20 text-center">
                <span className="overline mb-4 block">The Fleet</span>
                <h2>Engineering Excellence</h2>
            </div>

            <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-0 h-[80vh]">
                {rovers.map((rover, index) => (
                    <div
                        key={index}
                        className="min-w-full h-full snap-start grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-6 md:px-20"
                    >
                        {/* Left 7 Columns: 3D Canvas */}
                        <div className="lg:col-span-7 h-[400px] lg:h-full relative bg-space-950/50 rounded-3xl border border-white-40/5">
                            <div className="absolute top-8 left-8 z-10">
                                <span className="overline text-[10px] text-white-40">Classification</span>
                                <h3 className="text-3xl font-display font-bold">{rover.name}</h3>
                            </div>
                            <RoverDisplay color={rover.color} />
                            {/* Radial glow */}
                            <div className="absolute inset-0 bg-gradient-radial from-white-100/5 to-transparent pointer-events-none" />
                        </div>

                        {/* Right 5 Columns: Specs & Features */}
                        <div className="lg:col-span-5 flex flex-col gap-10">
                            <div>
                                <span className="text-cyan-odyssey text-sm font-mono tracking-widest mb-2 block">
                                    {rover.mission} — {rover.year}
                                </span>
                                <h4 className="text-2xl font-display mb-6">Technical Specifications</h4>

                                <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-b border-white-40/10 pb-10">
                                    {Object.entries(rover.specs).map(([label, value]) => (
                                        <div key={label}>
                                            <span className="text-[10px] uppercase tracking-widest text-white-40 block mb-1">
                                                {label}
                                            </span>
                                            <span className="text-white-100 font-medium">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-display mb-4">Core Features</h4>
                                <ul className="flex flex-col gap-3">
                                    {rover.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-white-80 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-odyssey" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Slide indicator */}
            <div className="section-container mt-10">
                <div className="flex gap-4">
                    {rovers.map((_, idx) => (
                        <div key={idx} className={`h-[2px] w-12 ${idx === 0 ? "bg-cyan-odyssey" : "bg-white-40/20"}`} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Rovers;
