export interface Project {
  id: number
  title: string
  description: string
  image: string
  category: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  year: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution with React, Next.js, and Stripe integration. Features include product management, cart functionality, and secure payments.",
    image: "https://images.pexels.com/photos/4050430/pexels-photo-4050430.jpeg",
    category: "E-commerce",
    technologies: ["Next.js", "React", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    year: "2024"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, team collaboration features, and advanced filtering options.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    category: "Web App",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Material-UI"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    year: "2024"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg",
    category: "Web App",
    technologies: ["Vue.js", "Chart.js", "OpenWeather API", "SCSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    year: "2023"
  },
  {
    id: 4,
    title: "Fitness Tracking App",
    description: "Mobile application for tracking workouts, nutrition, and fitness goals with social features and progress analytics.",
    image: "https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg",
    category: "Mobile App",
    technologies: ["React Native", "Firebase", "Redux", "Chart.js"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    year: "2023"
  },
  {
    id: 5,
    title: "Restaurant Website",
    description: "A stunning restaurant website with online reservations, menu management, and customer reviews system.",
    image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
    category: "Portfolio",
    technologies: ["Next.js", "Sanity CMS", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    year: "2023"
  },
  {
    id: 6,
    title: "Crypto Trading Platform",
    description: "A secure cryptocurrency trading platform with real-time market data, portfolio tracking, and advanced trading tools.",
    image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg",
    category: "Web App",
    technologies: ["React", "Node.js", "WebSocket", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    year: "2024"
  }
]