export interface Blog {
  id: number
  title: string
  excerpt: string
  content?: string
  image: string
  category: string
  date: string
  readTime: string
  slug: string
  tags?: string[]
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: "Getting Started with Next.js 14: A Complete Guide",
    excerpt: "Explore the latest features in Next.js 14 including App Router, Server Components, and improved performance optimizations.",
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
    category: "Web Development",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    slug: "getting-started-with-nextjs-14",
    tags: ["Next.js", "React", "JavaScript", "Web Development"]
  },
  {
    id: 2,
    title: "Mastering TypeScript: Advanced Types and Patterns",
    excerpt: "Deep dive into advanced TypeScript concepts including conditional types, mapped types, and utility types for better code quality.",
    image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
    category: "TypeScript",
    date: "Dec 10, 2024",
    readTime: "12 min read",
    slug: "mastering-typescript-advanced-types",
    tags: ["TypeScript", "JavaScript", "Programming", "Web Development"]
  },
  {
    id: 3,
    title: "Building Responsive UIs with Tailwind CSS",
    excerpt: "Learn how to create beautiful, responsive user interfaces using Tailwind CSS utility classes and best practices.",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
    category: "CSS",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    slug: "building-responsive-uis-with-tailwind",
    tags: ["CSS", "Tailwind", "Responsive Design", "Frontend"]
  },
  {
    id: 4,
    title: "State Management in React: Redux vs Zustand vs Context",
    excerpt: "Compare different state management solutions in React and learn when to use each approach for optimal performance.",
    image: "https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg",
    category: "React",
    date: "Nov 28, 2024",
    readTime: "10 min read",
    slug: "react-state-management-comparison",
    tags: ["React", "Redux", "Zustand", "State Management"]
  },
  {
    id: 5,
    title: "Optimizing Web Performance: Core Web Vitals",
    excerpt: "Essential techniques for improving your website's Core Web Vitals scores and overall user experience.",
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
    category: "Performance",
    date: "Nov 20, 2024",
    readTime: "9 min read",
    slug: "optimizing-web-performance-core-vitals",
    tags: ["Performance", "Web Vitals", "SEO", "Optimization"]
  },
  {
    id: 6,
    title: "Database Design Patterns for Modern Applications",
    excerpt: "Explore database design patterns, normalization strategies, and performance optimization techniques for scalable applications.",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
    category: "Database",
    date: "Nov 15, 2024",
    readTime: "14 min read",
    slug: "database-design-patterns-modern-apps",
    tags: ["Database", "PostgreSQL", "Design Patterns", "Backend"]
  }
]