import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import TextReveal from "@/components/TextReveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { featuredProjects } from "@/data/featuredProjects";

type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
};

const GITHUB_USERNAME = "Aumaswar";

function formatDate(dateIso: string) {
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

async function fetchGithubRepos(): Promise<GithubRepo[]> {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
  if (!res.ok) {
    throw new Error(`GitHub API request failed: ${res.status}`);
  }
  return res.json();
}

const Projects = () => {
  const [query, setQuery] = useState("");

  const reposQuery = useQuery({
    queryKey: ["github-repos", GITHUB_USERNAME],
    queryFn: fetchGithubRepos,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

  const repos = useMemo(() => {
    const list = reposQuery.data ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return list.filter((r) => !r.fork);
    return list.filter((r) => {
      if (r.fork) return false;
      return (
        r.name.toLowerCase().includes(q) ||
        (r.description?.toLowerCase().includes(q) ?? false) ||
        (r.language?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [reposQuery.data, query]);

  return (
    <div className="noise-bg min-h-screen">
      <ScrollProgress />
      <Navigation />

      <main className="section-padding pt-28">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <TextReveal delay={0.1}>
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-body text-primary tracking-widest uppercase block">Projects</span>
              </div>
            </TextReveal>

            <TextReveal delay={0.25}>
              <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight">
                Built with <span className="text-gradient">curiosity</span>.
              </h1>
            </TextReveal>

            <TextReveal delay={0.35}>
              <p className="mt-6 text-muted-foreground font-body text-lg leading-relaxed max-w-3xl">
                Featured case studies + a GitHub-style list of my public repositories.
              </p>
            </TextReveal>
          </div>

          <section className="mb-16">
            <TextReveal delay={0.1}>
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-6">Featured</h2>
            </TextReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.33, 1, 0.68, 1] }}
                >
                  <Link to={`/projects/${p.slug}`} className="block">
                    <Card className="border-border/70 bg-card/40 backdrop-blur hover:border-primary/50 transition-colors">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between gap-4">
                          <CardTitle className="font-display text-xl md:text-2xl">{p.title}</CardTitle>
                          <span className="font-body text-xs text-muted-foreground">{p.year}</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge variant="secondary" className="bg-secondary/40">
                            {p.category}
                          </Badge>
                          {p.tech.slice(0, 4).map((t) => (
                            <Badge key={t} variant="outline" className="border-border/60">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground font-body text-sm leading-relaxed whitespace-pre-line">
                          {p.description}
                        </p>
                        <p className="mt-4 font-body text-sm text-foreground/80 underline underline-offset-4">
                          Read case study
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
              <div>
                <TextReveal delay={0.1}>
                  <h2 className="font-display font-bold text-2xl md:text-3xl">GitHub Repositories</h2>
                </TextReveal>
                <TextReveal delay={0.2}>
                  <p className="mt-2 text-muted-foreground font-body text-sm">
                    Pulling from{" "}
                    <a
                      className="underline hover:text-foreground"
                      href={`https://github.com/${GITHUB_USERNAME}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {`github.com/${GITHUB_USERNAME}`}
                    </a>
                  </p>
                </TextReveal>
              </div>
              <div className="w-full md:w-80">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search repos (name, tech, description)"
                  className="w-full bg-transparent border border-border rounded-md px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {reposQuery.isLoading && (
              <div className="border border-border/70 rounded-lg p-6 text-muted-foreground font-body">
                Loading repositories…
              </div>
            )}

            {reposQuery.isError && (
              <div className="border border-border/70 rounded-lg p-6">
                <p className="font-body text-muted-foreground">
                  Couldn’t load repos from GitHub right now. (This can happen due to API rate limits.)
                </p>
                <a
                  className="mt-3 inline-block font-body underline hover:text-foreground"
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open GitHub profile
                </a>
              </div>
            )}

            {!reposQuery.isLoading && !reposQuery.isError && (
              <div className="space-y-3">
                {repos.length === 0 ? (
                  <div className="border border-border/70 rounded-lg p-6 text-muted-foreground font-body">
                    No repositories match your search.
                  </div>
                ) : (
                  repos.map((r, i) => (
                    <motion.a
                      key={r.id}
                      href={r.html_url}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.45, delay: Math.min(i * 0.02, 0.2), ease: [0.33, 1, 0.68, 1] }}
                      className="block border border-border/70 rounded-lg p-5 hover:border-primary/60 transition-colors bg-card/30 backdrop-blur"
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                        <div>
                          <div className="font-display font-bold text-lg">{r.name}</div>
                          {r.description && (
                            <div className="mt-1 font-body text-sm text-muted-foreground leading-relaxed">
                              {r.description}
                            </div>
                          )}
                        </div>
                        <div className="font-body text-xs text-muted-foreground">
                          Updated {formatDate(r.updated_at)}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-body text-muted-foreground">
                        {r.language && (
                          <span className="inline-flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary/70" />
                            {r.language}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          {r.stargazers_count}
                        </span>
                      </div>
                    </motion.a>
                  ))
                )}
              </div>
            )}
          </section>

          <div className="mt-16 pt-10 border-t border-border/60 flex justify-center">
            <TextReveal delay={0.05}>
              <Link
                to="/"
                className="inline-flex items-center gap-2 font-body text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                <span aria-hidden="true">←</span>
                Back to Home
              </Link>
            </TextReveal>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;

