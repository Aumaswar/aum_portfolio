import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";
import GlassShape from "./GlassShape";

const roles = ["Software Engineer", "AI & ML Enthusiast", "Front-End Developer", "Problem Solver"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.9]);
  const y = useTransform(scrollY, [0, 600], [0, 100]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 96;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      style={{ opacity, scale, y }}
      className="relative min-h-screen flex flex-col justify-center section-padding will-change-transform">
      {/* 3D Glass Entity Background */}
      <div className="absolute inset-0 pointer-events-auto z-0" style={{ opacity: 0.8 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <Environment preset="city" />
          <GlassShape />
        </Canvas>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Status badge */}
        <TextReveal delay={0.2}>
          <div className="flex items-center gap-2 mb-8 md:mb-12">
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }} />

            <span className="text-sm font-body text-muted-foreground tracking-widest uppercase">
              Available for work
            </span>
          </div>
        </TextReveal>

        {/* Name */}
        <TextReveal delay={0.4}>
          <h1 className="font-display font-extrabold text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-tight">
            Aum
          </h1>
        </TextReveal>
        <TextReveal delay={0.5}>
          <h1 className="font-display font-extrabold text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-tight">
            <span className="text-gradient">​Aswar</span>
          </h1>
        </TextReveal>

        {/* Role rotator */}
        <div className="mt-8 md:mt-12 h-8 overflow-hidden">
          <motion.div
            key={roleIndex}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="font-body text-lg md:text-xl text-muted-foreground tracking-wide">

            {roles[roleIndex]}
          </motion.div>
        </div>

        {/* CTA */}
        <TextReveal delay={0.8}>
          <div className="mt-12 md:mt-16 flex flex-wrap gap-4">
            <MagneticButton
              onClick={() => navigate("/projects")}
              className="bg-primary text-primary-foreground px-8 py-4 font-body font-medium text-sm tracking-wider uppercase"
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollToSection("contact")}
              className="border border-border text-foreground px-8 py-4 font-body font-medium text-sm tracking-wider uppercase hover:border-primary transition-colors"
            >
              Get in Touch
            </MagneticButton>
          </div>
        </TextReveal>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>

        <span className="text-xs font-body text-muted-foreground tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-muted-foreground/30" />
      </motion.div>
    </motion.section>);

};

export default HeroSection;