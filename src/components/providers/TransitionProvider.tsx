"use client";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/ui/LoadingScreen";
import HudOverlay from "@/components/ui/HudOverlay";
import Cursor from "@/components/ui/Cursor";
import ProgressBar from "@/components/ui/ProgressBar";
import GlobalSpaceBackground from "@/components/ui/GlobalSpaceBackground";

export default function TransitionProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <GlobalSpaceBackground />
            <AnimatePresence mode="wait">
                {loading && <LoadingScreen key="loader" />}
            </AnimatePresence>

            {!loading && (
                <>
                    <HudOverlay />
                    <Cursor />
                    <ProgressBar />
                    {children}
                </>
            )}
        </>
    );
}
