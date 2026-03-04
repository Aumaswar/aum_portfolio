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
    slug: "pingmenot",
    title: "PingMeNot — Anonymous Real-Time Chat Platform",
    category: "Real-Time Chat Platform",
    description: `Developed a responsive anonymous chat platform enabling users to communicate securely without revealing their identity, focusing on intuitive UI/UX and smooth user interaction.
Implemented real-time messaging functionality and scalable front-end architecture while ensuring session-based anonymity and optimized performance.`,
    tech: ["React", "JavaScript", "HTML", "CSS", "Node.js", "WebSockets"],
    year: "Jan 2024",
  },
  {
    id: 2,
    slug: "stock-prediction",
    title: "Stock Price Prediction System",
    category: "Machine Learning Application",
    description: `Built a Python application that predicts stock price trends using historical market data and machine learning models. Increased sales by 20% by implementing effective upselling and cross-selling strategies.
Performed data preprocessing, visualization, and predictive modeling using libraries such as Pandas, NumPy, and Scikit-learn to generate data-driven insights.`,
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Machine Learning"],
    year: "Jun 2024 - Dec 2024",
  },
  {
    id: 3,
    slug: "neural-research-copilot",
    title: "Neural Research Copilot — AI Knowledge Assistant",
    category: "AI Knowledge Assistant",
    description: `Building an AI-powered research assistant that summarizes documents and answers user queries using Retrieval-Augmented Generation (RAG) and large language models.
Implemented semantic search with vector embeddings and modern AI frameworks to retrieve relevant information from PDFs and documents through natural language queries.`,
    tech: ["Python", "Artificial Intelligence", "Large Language Models", "Vector Embeddings", "RAG", "React"],
    year: "Dec 2024 - Present",
  },
];

