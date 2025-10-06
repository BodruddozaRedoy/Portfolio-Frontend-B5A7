"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useGetAllBlogs from "@/hooks/useGetAllBlogs";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Blogs() {
  const { blogs, loading } = useGetAllBlogs();

  return (
    <section id="blogs" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Latest Blogs
        </h2>

        {/* === Skeleton Loader === */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <article
                key={i}
                className="bg-gray-900 p-6 rounded-lg border border-gray-800 flex flex-col space-y-4"
              >
                {/* Date + Meta */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-12" />
                </div>

                {/* Category Tag */}
                <Skeleton className="h-6 w-20 rounded-full" />

                {/* Title */}
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-2/3" />

                {/* Excerpt */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>

                {/* Button */}
                <div className="pt-4">
                  <Skeleton className="h-8 w-24 rounded-md" />
                </div>
              </article>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-400">No blogs available.</p>
        ) : (
          <>
            {/* === Blog Grid === */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {blogs?.map((blog) => (
                <article
                  key={blog.id}
                  className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-blue-500 transition-colors group"
                >
                  <div className="flex items-center text-gray-400 text-sm mb-4">
                    <Calendar size={16} className="mr-2" />
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{blog.published ? "Published" : "Draft"}</span>
                  </div>

                  {blog.tags?.[0] && (
                    <span className="inline-block px-3 py-1 bg-blue-900 text-blue-300 rounded-full text-sm mb-4">
                      {blog.tags[0]}
                    </span>
                  )}

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
                    {blog.content.slice(0, 120)}...
                  </p>

                  <Button
                    asChild
                    variant="ghost"
                    className="p-0 text-blue-400 hover:text-blue-300 group"
                  >
                    <Link href={`/blogs/${blog?.id}`}>
                      Read More
                      <ArrowRight
                        size={16}
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </Button>
                </article>
              ))}
            </div>

            {/* === View All Button === */}
            <div className="text-center mt-12">
              <Link href={"/blogs"}>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  View All Blogs
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
