import { motion } from "framer-motion";
import { ScrollTextReveal } from "./TextReveal";

const technologies = [
  "React", "TypeScript", "Next.js", "Framer Motion",
  "Three.js", "GSAP", "Tailwind CSS", "Node.js",
  "WebGL", "Figma", "Vite", "GraphQL",
];

const AboutSection = () => {
  return (
    <section className="section-padding relative" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <ScrollTextReveal>
              <span className="text-sm font-body text-primary tracking-widest uppercase mb-4 block">
                About
              </span>
            </ScrollTextReveal>
            <ScrollTextReveal delay={0.1}>
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
                Building the web,{" "}
                <span className="text-gradient">one pixel</span> at a time.
              </h2>
            </ScrollTextReveal>
            <ScrollTextReveal delay={0.2}>
              <p className="mt-8 text-muted-foreground font-body text-lg leading-relaxed">
                I'm a front-end developer obsessed with the intersection of design
                and engineering. I craft interfaces that don't just work — they feel
                alive. Every transition is intentional, every interaction tells a
                story, and every pixel earns its place.
              </p>
            </ScrollTextReveal>
            <ScrollTextReveal delay={0.3}>
              <p className="mt-4 text-muted-foreground font-body text-lg leading-relaxed">
                With 5+ years of experience shipping products for startups and
                agencies, I bring both creative vision and production-grade code.
              </p>
            </ScrollTextReveal>
          </div>

          {/* Right - Tech cloud */}
          <div className="flex items-center">
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.1, backgroundColor: "hsl(75 80% 60% / 0.15)" }}
                  className="px-5 py-3 rounded-full border border-border font-body text-sm text-secondary-foreground cursor-default transition-colors"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          {[
            { num: "5+", label: "Years Experience" },
            { num: "40+", label: "Projects Shipped" },
            { num: "15+", label: "Happy Clients" },
            { num: "∞", label: "Cups of Coffee" },
          ].map((stat, i) => (
            <ScrollTextReveal key={stat.label} delay={i * 0.1}>
              <div>
                <div className="font-display font-bold text-4xl md:text-5xl text-gradient">
                  {stat.num}
                </div>
                <div className="mt-2 font-body text-sm text-muted-foreground tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            </ScrollTextReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
