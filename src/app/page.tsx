"use client";
import { useEffect } from "react";
import Cursor from "@/components/ui/Cursor";
import ProgressBar from "@/components/ui/ProgressBar";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Departments from "@/components/sections/Departments";
import Competitions from "@/components/sections/Competitions";
import CrossAndTeam from "@/components/sections/CrossAndTeam";
import SponsorsContactFooter from "@/components/sections/SponsorsContactFooter";

export default function HomePage() {
  // IntersectionObserver for .rv .rv-l .rv-r reveals
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );
    document.querySelectorAll(".rv, .rv-l, .rv-r").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Cursor />
      <ProgressBar />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Departments />
        <Competitions />
        <CrossAndTeam />
        <SponsorsContactFooter />
      </main>
    </>
  );
}
