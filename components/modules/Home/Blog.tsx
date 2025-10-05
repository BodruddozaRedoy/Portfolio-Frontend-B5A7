import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blogs = [
  {
    title: "Building Scalable React Applications",
    excerpt: "Learn how to structure your React applications for scalability and maintainability with best practices and patterns.",
    date: "Dec 15, 2023",
    readTime: "5 min read",
    category: "React"
  },
  {
    title: "The Power of TypeScript in Modern Web Development",
    excerpt: "Exploring how TypeScript can improve your development workflow and catch errors before they reach production.",
    date: "Nov 28, 2023",
    readTime: "8 min read",
    category: "TypeScript"
  },
  {
    title: "Mastering CSS Grid and Flexbox",
    excerpt: "A comprehensive guide to creating responsive layouts with CSS Grid and Flexbox techniques.",
    date: "Nov 12, 2023",
    readTime: "6 min read",
    category: "CSS"
  }
];

export default function Blogs() {
  return (
    <section id="blogs" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Latest Blogs
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogs.map((blog, index) => (
            <article 
              key={index}
              className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-blue-500 transition-colors group"
            >
              <div className="flex items-center text-gray-400 text-sm mb-4">
                <Calendar size={16} className="mr-2" />
                <span>{blog.date}</span>
                <span className="mx-2">•</span>
                <span>{blog.readTime}</span>
              </div>
              
              <span className="inline-block px-3 py-1 bg-blue-900 text-blue-300 rounded-full text-sm mb-4">
                {blog.category}
              </span>
              
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {blog.title}
              </h3>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                {blog.excerpt}
              </p>
              
              <Button variant="ghost" className="p-0 text-blue-400 hover:text-blue-300 group">
                Read More
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href={"/blogs"}>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
            View All Blogs
          </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}