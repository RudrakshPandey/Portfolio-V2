export const personal = {
  name: "Rudraksh Pandey",
  role: [
    { text: "Full Stack Developer",    color: "#ef4444" },
    { text: "Frontend Engineer",       color: "#3178C6" },
    { text: "React & Next.js Expert",  color: "#61DAFB" },
    { text: "UI/UX Craftsman",         color: "#22c55e" },
  ],
  tagline: "Based In Indore, India.",
  bio: "Frontend-focused Full Stack Developer with 2.5+ years at TCS building Next.js & React frontends for high-scale e-commerce systems processing 10M+ daily transactions. I craft performant, pixel-perfect web experiences with clean architecture.",
  bio2: "On the side I build full-stack products — a Notion-like collaborative workspace (Collabo) and a social media platform (The Lekh). I believe great software lives at the intersection of engineering precision and thoughtful design.",
  email: "rudrakshpandey8@gmail.com",
  location: "Indore, India",
  phone: "+91-9340845161",
  social: {
    github:   "https://github.com/RudrakshPandey",
    linkedin: "www.linkedin.com/in/rudraksh-pandey-b21000135",
    portfolio:"https://rudrakshpandey.github.io/Portfolio-V2/",
  },
};

export const skills = [
  { name: "JavaScript",  icon: "SiJavascript",  color: "#F7DF1E", featured: true,  level: 92, years: 3, desc: "ES6+, async/await, closures, event loop mastery and performance patterns." },
  { name: "TypeScript",  icon: "SiTypescript",  color: "#3178C6", featured: true,  level: 88, years: 2, desc: "Advanced types, generics, utility types and full-stack typed architectures." },
  { name: "React",       icon: "SiReact",       color: "#61DAFB", featured: true,  level: 93, years: 3, desc: "Hooks, context, concurrent features and 85%+ coverage with Jest + RTL." },
  { name: "Next.js",     icon: "SiNextdotjs",   color: "#000000", featured: true,  level: 90, years: 2, desc: "App Router, SSR/SSG/ISR, middleware, edge deployments, Core Web Vitals." },
  { name: "Node.js",     icon: "SiNodedotjs",   color: "#339933", featured: false, level: 80, years: 2, desc: "REST & GraphQL APIs, Express, NestJS, WebSocket gateways." },
  { name: "NestJS",      icon: "SiNestjs",      color: "#E0234E", featured: false, level: 75, years: 1, desc: "Modular architecture, guards, interceptors, Prisma ORM integration." },
  { name: "PostgreSQL",  icon: "SiPostgresql",  color: "#4169E1", featured: false, level: 78, years: 2, desc: "Schema design, Prisma ORM, query optimisation, relational modelling." },
  { name: "MongoDB",     icon: "SiMongodb",     color: "#47A248", featured: false, level: 76, years: 2, desc: "Document modelling, aggregation pipelines, MERN stack projects." },
  { name: "Redux",       icon: "SiRedux",       color: "#764ABC", featured: false, level: 82, years: 2, desc: "Redux Toolkit, Zustand for state management in complex React apps." },
  { name: "GraphQL",     icon: "SiGraphql",     color: "#E10098", featured: false, level: 74, years: 2, desc: "Schema design, resolvers, Apollo Client, microservices API integration." },
  { name: "Docker",      icon: "SiDocker",      color: "#2496ED", featured: false, level: 70, years: 1, desc: "Containerisation, Docker Compose, CI/CD pipeline deployment." },
  { name: "AWS",         icon: "SiAmazonaws",   color: "#FF9900", featured: false, level: 72, years: 1, desc: "S3, EC2, Lambda, CloudFront, Redis — certified Solutions Architect." },
  { name: "Jest",        icon: "SiJest",        color: "#C21325", featured: false, level: 80, years: 2, desc: "Unit & integration tests, 85%+ coverage, React Testing Library." },
  { name: "Tailwind",    icon: "SiTailwindcss", color: "#06B6D4", featured: false, level: 85, years: 2, desc: "Utility-first workflow, JIT, custom design tokens, responsive systems." },
];

export const experience = [
  {
    id: 1,
    company: "Tata Consultancy Services",
    role: "Software Development Engineer",
    period: "Jun 2023 – Present",
    location: "Remote",
    description: "Migrated a monolithic codebase to a Next.js + React Nucleus modular architecture, improving performance by 70% and cutting maintenance overhead by 80%. Engineered 20+ reusable React components with 85% code coverage. Integrated multiple payment gateways processing 10M+ daily transactions with 99.9% uptime.",
    highlights: [
      "70% performance improvement via Next.js migration",
      "20+ reusable components, 85% code coverage (Jest + RTL)",
      "10M+ daily transactions, 99.9% uptime",
      "60% conversion rate increase via payment gateway integrations",
      "CI/CD with Docker, GitHub Copilot for AI-assisted development",
    ],
    tags: ["Next.js", "React", "TypeScript", "GraphQL", "Docker", "Jest"],
    logo: "TCS",
    logoColor: "#000000",
    featured: true,
  },
];

export const projects = [
  {
    id: 1,
    title: "Collabo",
    subtitle: "Real-Time Collaborative Workspace",
    description: "A Notion-like collaborative editor with real-time multi-user editing via WebSocket Gateway, supporting 5+ simultaneous editors with <200ms sync latency. JWT auth, OAuth, RBAC, and PostgreSQL with Prisma ORM.",
    tags: ["Next.js 14", "NestJS", "PostgreSQL", "Socket.io", "JWT", "Docker"],
    year: "Ongoing",
    featured: true,
    dark: true,
    link: "https://github.com/RudrakshPandey/collabo",
  },
  {
    id: 2,
    title: "The Lekh",
    subtitle: "Full-Stack Social Media Platform",
    description: "Full-stack blogging platform serving 500+ active users with 99% uptime. Real-time WebSocket notifications, Google Gemini AI for automated blog generation — reducing content creation time by 70% and growing user content 3×.",
    tags: ["MERN Stack", "Redux", "WebSocket", "OAuth", "Gemini AI"],
    year: "March 2025",
    featured: true,
    dark: false,
    link: "https://thelekh.vercel.app",
  },
];

export const certifications = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    level: "Associate Level",
    issuer: "Amazon Web Services",
    logo: "AWS",
    logoColor: "#FF9900",
    dark: true,
  },
  {
    id: 2,
    title: "GitHub Foundations",
    level: "Certification",
    issuer: "GitHub",
    logo: "GH",
    logoColor: "#24292F",
    dark: false,
  },
  {
    id: 3,
    title: "GitHub Copilot",
    level: "Certification",
    issuer: "GitHub",
    logo: "GH",
    logoColor: "#24292F",
    dark: false,
  },
  {
    id: 4,
    title: "Google Cloud Generative AI",
    level: "Leader",
    issuer: "Google Cloud",
    logo: "GCP",
    logoColor: "#4285F4",
    dark: true,
  },
];
