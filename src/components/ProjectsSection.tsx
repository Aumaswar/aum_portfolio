import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollTextReveal } from "./TextReveal";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  year: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Nebula Dashboard",
    category: "Web Application",
    description:
      "A real-time analytics dashboard with fluid animations and data-driven visualizations. Built for a fintech startup processing millions of transactions.",
    tech: ["React", "TypeScript", "D3.js", "Framer Motion"],
    year: "2025",
  },
  {
    id: 2,
    title: "Synthetik Studio",
    category: "Creative Platform",
    description:
      "An experimental music creation platform with WebAudio API integration, real-time waveform visualization, and collaborative editing features.",
    tech: ["Next.js", "WebAudio", "Three.js", "WebSockets"],
    year: "2024",
  },
  {
    id: 3,
    title: "Monolith Agency",
    category: "Agency Website",
    description:
      "An award-winning agency website featuring scroll-driven storytelling, GSAP animations, and a fully custom CMS-powered project showcase.",
    tech: ["Astro", "GSAP", "Sanity CMS", "Tailwind"],
    year: "2024",
  },
  {
    id: 4,
    title: "Flux Commerce",
    category: "E-Commerce",
    description:
      "A performance-optimized e-commerce experience with sub-second page loads, smooth product transitions, and an immersive shopping flow.",
    tech: ["Next.js", "Shopify API", "Framer Motion", "Stripe"],
    year: "2023",
  },
];

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section className="section-padding relative" id="projects">
      <div className="max-w-7xl mx-auto">
        <ScrollTextReveal>
          <span className="text-sm font-body text-primary tracking-widest uppercase mb-4 block">
            Selected Work
          </span>
        </ScrollTextReveal>
        <ScrollTextReveal delay={0.1}>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-16 md:mb-24">
            Projects that <span className="text-gradient">move</span>.
          </h2>
        </ScrollTextReveal>

        {/* Project list */}
        <div className="space-y-0">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group border-t border-border last:border-b"
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer">
                <div className="flex-1">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="font-body text-xs text-muted-foreground">
                      0{project.id}
                    </span>
                    <motion.h3
                      className="font-display font-bold text-2xl md:text-4xl lg:text-5xl"
                      animate={{
                        x: activeProject === project.id ? 20 : 0,
                        color:
                          activeProject === project.id
                            ? "hsl(75 80% 60%)"
                            : "hsl(0 0% 95%)",
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {project.title}
                    </motion.h3>
                  </div>
                  <span className="font-body text-sm text-muted-foreground ml-8 md:ml-10">
                    {project.category}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-body text-sm text-muted-foreground">
                    {project.year}
                  </span>
                  <motion.div
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center"
                    animate={{
                      borderColor:
                        activeProject === project.id
                          ? "hsl(75 80% 60%)"
                          : "hsl(240 4% 20%)",
                      rotate: activeProject === project.id ? 45 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="text-foreground"
                    >
                      <path
                        d="M1 13L13 1M13 1H3M13 1V11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>

              {/* Expanded details */}
              <AnimatePresence>
                {activeProject === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 md:pb-12 ml-8 md:ml-10 max-w-2xl">
                      <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 rounded-full text-xs font-body border border-border text-secondary-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
