"use client";

import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    onClick?: () => void;
    className?: string;
    href?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    onClick,
    className = "",
    href,
}) => {
    const baseStyles = "px-8 py-3 rounded-[6px] font-medium transition-all duration-300 inline-flex items-center justify-center cursor-pointer text-sm tracking-wide";

    const variants = {
        primary: "bg-cyan-odyssey text-space-900 border border-cyan-odyssey hover:glow-cyan hover:-translate-y-0.5 active:translate-y-0",
        secondary: "bg-transparent text-white-100 border border-white-40/30 hover:border-cyan-odyssey hover:text-cyan-odyssey",
    };

    const Component = href ? motion.a : motion.button;

    return (
        <Component
            href={href}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {children}
        </Component>
    );
};

export default Button;
