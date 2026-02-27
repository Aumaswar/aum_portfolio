export interface FeaturedProject {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  year: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: 1,
    slug: "lumenflow",
    title: "LumenFlow — Production-Grade SaaS Application",
    category: "SaaS Platform",
    description: `Build and deploy a real multi-user SaaS with authentication, role-based access control, payments (test mode), and proper database design.
Implement monitoring, error boundaries, logging, and CI/CD for production readiness.
Demonstrate architectural decisions, scalability considerations, and measurable performance improvements.`,
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Stripe", "Docker", "GitHub Actions", "Sentry"],
    year: "2025",
  },
  {
    id: 2,
    slug: "syncforge",
    title: "SyncForge — Real-Time Collaborative Engine",
    category: "Real-Time Collaboration",
    description: `A CRDT-powered multi-user editing system with presence awareness and offline reconciliation.
Built using WebSockets for low-latency state synchronization across distributed clients.
Implements conflict resolution, optimistic updates, and network recovery handling.`,
    tech: ["TypeScript", "React", "WebSockets", "CRDT (Yjs)", "Node.js", "Redis", "IndexedDB"],
    year: "2024",
  },
  {
    id: 3,
    slug: "pulserender",
    title: "PulseRender — Frontend Performance Lab",
    category: "Performance Engineering",
    description: `A deliberately heavy web application engineered and optimized for production-grade performance.
Reduced Core Web Vitals through route-level code splitting, streaming SSR, and bundle analysis.
Includes documented before/after metrics with architectural trade-off analysis.`,
    tech: ["Next.js", "React", "TypeScript", "Lighthouse", "Web Vitals", "Bundle Analyzer"],
    year: "2024",
  },
  {
    id: 4,
    slug: "nebulaviz",
    title: "NebulaViz — Large-Scale Data Interaction Platform",
    category: "Data Visualization Platform",
    description: "A performance-optimized e-commerce experience with sub-second page loads, smooth product transitions, and an immersive shopping flow.",
    tech: ["React", "TypeScript", "D3.js", "WebGL", "deck.gl", "Web Workers", "TanStack Query"],
    year: "2023",
  },
];

