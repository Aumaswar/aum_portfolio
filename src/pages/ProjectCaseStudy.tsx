import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import TextReveal from "@/components/TextReveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { featuredProjects } from "@/data/featuredProjects";

const ProjectCaseStudy = () => {
  const { slug } = useParams();
  const project = featuredProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="noise-bg min-h-screen">
        <ScrollProgress />
        <Navigation />
        <main className="section-padding pt-28">
          <div className="max-w-3xl mx-auto">
            <TextReveal delay={0.1}>
              <h1 className="font-display font-bold text-4xl md:text-5xl">Project not found</h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="mt-6 text-muted-foreground font-body text-lg">
                That case study doesn’t exist (yet).
              </p>
            </TextReveal>
            <div className="mt-10 flex gap-4">
              <Link className="font-body underline hover:text-foreground" to="/projects">
                Back to Projects
              </Link>
              <Link className="font-body underline hover:text-foreground" to="/">
                Back to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const paragraphs = project.description.split("\n").filter(Boolean);

  return (
    <div className="noise-bg min-h-screen">
      <ScrollProgress />
      <Navigation />

      <main className="section-padding pt-28">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <TextReveal delay={0.05}>
              <div className="flex items-center gap-3">
                <Link to="/projects" className="font-body text-sm text-foreground/70 hover:text-foreground transition-colors">
                  ← Projects
                </Link>
              </div>
            </TextReveal>

            <TextReveal delay={0.15}>
              <h1 className="mt-6 font-display font-bold text-4xl md:text-6xl leading-tight">
                {project.title}
              </h1>
            </TextReveal>

            <TextReveal delay={0.25}>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="bg-secondary/40">
                  {project.category}
                </Badge>
                <Badge variant="outline" className="border-border/60">
                  {project.year}
                </Badge>
              </div>
            </TextReveal>
          </div>

          <section className="space-y-6">
            {paragraphs.map((text, i) => (
              <TextReveal key={i} delay={0.25 + i * 0.05}>
                <p className="text-muted-foreground font-body text-lg leading-relaxed">{text}</p>
              </TextReveal>
            ))}
          </section>

          <section className="mt-12">
            <TextReveal delay={0.15}>
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-6">Stack</h2>
            </TextReveal>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.2), ease: [0.33, 1, 0.68, 1] }}
                >
                  <Badge variant="outline" className="border-border/70">
                    {t}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <TextReveal delay={0.15}>
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-6">Highlights</h2>
            </TextReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Clear architecture and trade-offs",
                "Production-ready reliability patterns",
                "Measurable performance improvements",
                "Readable, maintainable codebase structure",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.33, 1, 0.68, 1] }}
                >
                  <Card className="border-border/70 bg-card/30 backdrop-blur">
                    <CardContent className="p-6">
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{item}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          <div className="mt-16 pt-10 border-t border-border/60 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Link to="/projects" className="font-body text-sm underline hover:text-foreground">
              ← Back to Projects
            </Link>
            <Link to="/" className="font-body text-sm underline hover:text-foreground">
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectCaseStudy;

