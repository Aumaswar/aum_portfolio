import { useEffect, useState, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";
import GlassShape from "./GlassShape";

const roles = [
  "Software Engineer",
  "AI & ML Enthusiast",
  "Front-End Developer",
  "Problem Solver",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [mouse, setMouse] = useState<[number, number]>([0, 0]);
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

  // global mouse listener so the Canvas follows the cursor even when UI overlays intercept pointer events
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
      const y = (e.clientY / window.innerHeight - 0.5) * -2; // invert
      setMouse([x, y]);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <motion.section
      style={{ opacity, scale, y }}
      className="relative min-h-screen flex flex-col justify-center section-padding will-change-transform"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0" style={{ opacity: 0.9 }}>
        {/* Canvas receives mouse from a global listener so it responds even when UI overlays */}
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.45} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[0, 5, 2]} intensity={0.6} />
            <hemisphereLight skyColor={"#e6eef8"} groundColor={"#0b1221"} intensity={0.5} />
            <Environment preset="sunset" />
            <GlassShape mouse={mouse} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <TextReveal delay={0.2}>
          <div className="flex items-center gap-2 mb-10">
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-muted-foreground uppercase tracking-widest">
              Available for work
            </span>
          </div>
        </TextReveal>

        <TextReveal delay={0.4}>
          <h1 className="font-display font-extrabold text-[clamp(3rem,10vw,9rem)] leading-[0.9]">
            Aum
          </h1>
        </TextReveal>

        <TextReveal delay={0.5}>
          <h1 className="font-display font-extrabold text-[clamp(3rem,10vw,9rem)] leading-[0.9]">
            <span className="text-gradient">Aswar</span>
          </h1>
        </TextReveal>

        <div className="mt-8 h-8 overflow-hidden">
          <motion.div
            key={roleIndex}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-muted-foreground"
          >
            {roles[roleIndex]}
          </motion.div>
        </div>

        <TextReveal delay={0.8}>
          <div className="mt-12 flex gap-4">
            <MagneticButton
              onClick={() => navigate("/projects")}
              className="bg-primary text-primary-foreground px-8 py-4 uppercase text-sm"
            >
              View Projects
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollToSection("contact")}
              className="border border-border px-8 py-4 uppercase text-sm"
            >
              Get in Touch
            </MagneticButton>
          </div>
        </TextReveal>
      </div>
    </motion.section>
  );
};

export default HeroSection;