import { motion } from "framer-motion";
import { ScrollTextReveal } from "./TextReveal";

const Highlight = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <span className="relative inline-block">
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[0.08em] top-[55%] rounded-sm bg-primary/10"
        style={{ originX: 0 }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: [0.33, 1, 0.68, 1] }}
      />
      <span className="relative">{children}</span>
    </span>
  );
};

const technologies = [
  "Python",
  "Artificial Intelligence",
  "Machine Learning",
  "Data Analysis",
  "React",
  "JavaScript",
  "HTML",
  "CSS",
  "SQL",
  "Git",
  "APIs",
  "Flask",
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
                A Computer Science Engineering student,{" "}
                <span className="text-gradient">specializing in AI & Web</span>.
              </h2>
            </ScrollTextReveal>
            <ScrollTextReveal delay={0.2}>
              <p className="mt-8 text-muted-foreground font-body text-lg leading-relaxed">
                I’m an engineering student specializing in Artificial Intelligence, Python development,
                and modern Front-End technologies. I enjoy building{" "}
                <Highlight delay={0.15}>responsive web applications</Highlight> and
                solving real-world problems through <Highlight delay={0.25}>practical projects</Highlight>.
              </p>
            </ScrollTextReveal>
            <ScrollTextReveal delay={0.3}>
              <p className="mt-4 text-muted-foreground font-body text-lg leading-relaxed">
                Currently, I'm focused on developing intelligent software systems using{" "}
                Machine Learning and <Highlight delay={0.2}>Data Analysis</Highlight>.
                I’m excited to combine strong analytical thinking and fast learning
                ability to build <Highlight delay={0.35}>user-focused software</Highlight>.
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
            { num: "New", label: "Frontend Journey" },
            { num: "Building", label: "Projects as I Learn" },
            { num: "Open", label: "To Opportunities" },
            { num: "Daily", label: "Learning Habit" },
          ].map((stat, i) => (
            <ScrollTextReveal key={stat.label} delay={i * 0.1} className="py-1">
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
