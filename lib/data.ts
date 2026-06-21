export interface Project {
  slug: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  language?: string
  stars?: number
  image: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  tags: string[]
}

export interface TimelineItem {
  year: string
  title: string
  company: string
  description: string
  tags: string[]
}

export interface Skill {
  name: string
  category: "frontend" | "backend" | "tools" | "other"
  level: number
}

export const projects: Project[] = [
  {
    slug: "agent-org",
    title: "Agent Org",
    description: "AI-native multi-agent system that turns a single idea into a full production-ready codebase through orchestrated AI agents.",
    longDescription: "An open-source multi-agent engineering framework powered by the Claude Agent SDK and OpenRouter. It parallel-executes a structured team of specialized AI agents (CEO, PM, CTO, DevOps, QA) to generate product requirements, technical architecture designs (ADRs), security threat models (STRIDE), and full-stack code scaffolds from a single prompt. Features human-in-the-loop approval gates, Git integration, and a real-time web dashboard.",
    tags: ["Claude SDK", "OpenRouter", "TypeScript", "Multi-Agent"],
    language: "TypeScript",
    stars: 1,
    image: "/images/project-1.jpg",
    githubUrl: "https://github.com/aliihtsham-debug/agent-org",
    featured: true,
  },
  {
    slug: "alpha-council",
    title: "Alpha Council",
    description: "AI-powered investment committee that brings hedge-fund-style decision-making to crypto investing through multi-agent debate.",
    longDescription: "A decentralized, multi-agent financial reasoning platform built for the BNB Hack AI Trading Agent Edition. Recreates institutional hedge-fund committee mechanics by staging real-time transparent debates between specialized agent personas (Bull, Bear, Risk, and Portfolio Managers) using CoinMarketCap intelligence and Trust Wallet integrations.",
    tags: ["AI Agents", "Web3", "Crypto", "Next.js"],
    language: "TypeScript",
    stars: 0,
    image: "/images/project-2.jpg",
    liveUrl: "https://alphacouncil.vercel.app",
    githubUrl: "https://github.com/aliihtsham-debug/alphacouncil",
    featured: true,
  },
  {
    slug: "nova",
    title: "Nova",
    description: "Transform a declarative .nova DSL into a production-ready Next.js application with full type safety.",
    longDescription: "A declarative domain-specific language that generates production-ready Next.js 14+ applications. Write high-level specs in the .nova DSL and get a fully typed, scaffolded Next.js app with best practices baked in — from API routes to component architecture.",
    tags: ["Next.js", "DSL", "Code Generation", "TypeScript"],
    language: "TypeScript",
    stars: 0,
    image: "/images/project-5.jpg",
    githubUrl: "https://github.com/aliihtsham-debug/nova",
    featured: true,
  },
  {
    slug: "reactflow",
    title: "ReactFlow",
    description: "Interactive node-based UI builder with drag-and-drop workflow canvas powered by React Flow.",
    longDescription: "A visual workflow builder leveraging React Flow for creating interactive, node-based interfaces. Features draggable nodes, custom edge types, and a responsive SVG/HTML canvas for building complex workflow diagrams.",
    tags: ["React", "HTML", "Workflow", "UI Builder"],
    language: "HTML",
    stars: 0,
    image: "/images/project-6.jpg",
    githubUrl: "https://github.com/aliihtsham-debug/reactflow",
    featured: false,
  },
  {
    slug: "leadforge",
    title: "LeadForge",
    description: "Python-based lead generation and outreach automation toolkit for scaling client acquisition.",
    longDescription: "An automation toolkit for lead generation and outreach workflows. Built with Python, it streamlines prospecting, qualification, and engagement pipelines to help scale client acquisition efficiently.",
    tags: ["Python", "Automation", "Lead Gen", "Outreach"],
    language: "Python",
    stars: 0,
    image: "/images/project-7.jpg",
    githubUrl: "https://github.com/aliihtsham-debug/LeadForge",
    featured: false,
  },
  {
    slug: "architectjs",
    title: "ArchitectJS",
    description: "Architectural scaffolding tool for structuring large-scale TypeScript applications with best practices.",
    longDescription: "A scaffolding and architecture tool for TypeScript projects, designed to enforce clean architecture patterns, dependency management, and scalable project structure for enterprise-grade applications.",
    tags: ["TypeScript", "Architecture", "Scaffolding", "Best Practices"],
    language: "TypeScript",
    stars: 0,
    image: "/images/project-8.jpg",
    githubUrl: "https://github.com/aliihtsham-debug/ArchitectJS",
    featured: false,
  },
  {
    slug: "alphacouncil",
    title: "Alpha Council (Legacy)",
    description: "Original Alpha Council project — the Web3 investment committee that started it all.",
    longDescription: "A decentralized, multi-agent financial reasoning platform built for the BNB Hack AI Trading Agent Edition. Recreates institutional hedge-fund committee mechanics by staging real-time transparent debates between specialized agent personas.",
    tags: ["AI Agents", "Web3", "Crypto", "Next.js"],
    language: "TypeScript",
    stars: 0,
    image: "/images/project-2.jpg",
    githubUrl: "https://github.com/aliihtsham-debug/alphacouncil",
    featured: false,
  },
]

export const blogPosts: BlogPost[] = [
  {
    slug: "agent-org-phase-5",
    title: "Agent Org Phase 5: Human-in-the-Loop Approval Gates",
    excerpt: "How I added human-in-the-loop approval gates to Agent Org — making autonomous AI systems controllably autonomous with audit trails and configurable gates.",
    date: "2026-06-14",
    readingTime: "6 min read",
    tags: ["AI Agents", "Open Source"],
  },
  {
    slug: "agent-org-introduction",
    title: "I Built a Team of AI Agents That Ship Production-Ready Software",
    excerpt: "How Agent Org parallel-executes 5 specialized AI agents to generate complete full-stack scaffolds from a single prompt — no templates, no shortcuts.",
    date: "2026-06-07",
    readingTime: "8 min read",
    tags: ["AI", "Multi-Agent Systems"],
  },
  {
    slug: "local-first-ai",
    title: "The Next Frontier of AI Isn't in Your Browser — It's on Your Machine",
    excerpt: "Why local-first agent orchestration with Rust + SQLite is the future, and why cloud-dependent chatbots are leaving a massive design space unexplored.",
    date: "2026-06-01",
    readingTime: "7 min read",
    tags: ["Rust", "AI Architecture"],
  },
  {
    slug: "dsl-to-production",
    title: "From DSL to Production App: Building an AI-Native Development Framework",
    excerpt: "How a custom declarative language built with Chevrotain can generate type-safe TypeScript, Prisma schemas, Zod validators, and full Next.js applications.",
    date: "2026-05-25",
    readingTime: "9 min read",
    tags: ["TypeScript", "Code Generation"],
  },
  {
    slug: "alpha-council-bnb-hack",
    title: "Introducing Alpha Council: AI-Powered Investment Committee for Web3",
    excerpt: "How I built a multi-agent AI investment committee that recreates hedge-fund-style decision-making for crypto investors using transparent AI debate.",
    date: "2026-05-18",
    readingTime: "6 min read",
    tags: ["Web3", "AI", "Crypto"],
  },
]

export const timeline: TimelineItem[] = [
  {
    year: "2025 - Present",
    title: "Founder & Principal Engineer",
    company: "Code Brand Studio",
    description: "Lead an elite engineering studio operating at the intersection of high-performance full-stack systems and autonomous AI architectures. Architecting state-of-the-art autonomous multi-agent networks and custom developer tooling. Hand-crafting minimalist, conversion-focused digital experiences from scratch using Next.js and Tailwind CSS for high-ticket consultants and executives — achieving rapid page load speeds (<2s) and driving up to +143% inbound lead growth.",
    tags: ["AI Systems", "Next.js", "Multi-Agent"],
  },
  {
    year: "2022 - 2024",
    title: "Chief Executive Officer / Lead Engineer",
    company: "Developing Freaks",
    description: "Directed operations and technical delivery for a freelance development collective catering to international clients and small businesses. Oversaw end-to-end development lifecycles of custom web applications, established version control workflows, responsive UI design systems, and component-driven architecture frameworks.",
    tags: ["Leadership", "Web Development", "Client Strategy"],
  },
  {
    year: "2021 - 2022",
    title: "Frontend Developer / Project Manager",
    company: "Brave Mind Studio",
    description: "Worked full-time as a frontend developer while also serving as a project manager. Handled front-end development, content writing, process improvement, and IT consulting for various clients.",
    tags: ["Frontend", "Project Management", "Consulting"],
  },
]

export const skills: Skill[] = [
  { name: "React", category: "frontend", level: 5 },
  { name: "Next.js", category: "frontend", level: 5 },
  { name: "TypeScript", category: "frontend", level: 5 },
  { name: "Tailwind CSS", category: "frontend", level: 5 },
  { name: "AI / LLMs", category: "frontend", level: 5 },
  { name: "Multi-Agent Systems", category: "frontend", level: 5 },
  { name: "Three.js / R3F", category: "frontend", level: 3 },
  { name: "Framer Motion", category: "frontend", level: 4 },
  { name: "Rust", category: "backend", level: 4 },
  { name: "Tauri", category: "backend", level: 4 },
  { name: "SQLite", category: "backend", level: 4 },
  { name: "Prisma", category: "backend", level: 4 },
  { name: "Zod", category: "backend", level: 4 },
  { name: "Node.js", category: "backend", level: 4 },
  { name: "Python", category: "backend", level: 3 },
  { name: "Git", category: "tools", level: 5 },
  { name: "Docker", category: "tools", level: 3 },
  { name: "OpenRouter API", category: "tools", level: 5 },
  { name: "Claude SDK", category: "tools", level: 5 },
  { name: "VS Code / LSP", category: "tools", level: 4 },
  { name: "Power BI", category: "tools", level: 3 },
  { name: "Data Warehousing", category: "other", level: 3 },
  { name: "Blockchain / Web3", category: "other", level: 3 },
  { name: "SEO", category: "other", level: 3 },
]
