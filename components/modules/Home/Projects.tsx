"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useGetAllProjects from "@/hooks/useGetAllProjects";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

export default function Projects() {
  const { projects, loading } = useGetAllProjects();

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Featured Projects
        </h2>

        {/* === Skeleton Loader while fetching === */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 flex flex-col"
              >
                <Skeleton className="h-48 w-full" />

                <div className="p-6 flex-1 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />

                  <div className="flex gap-2 flex-wrap mt-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-6 w-16 rounded-full" />
                    ))}
                  </div>
                </div>

                <div className="flex justify-center gap-4 border-t border-gray-700 p-4">
                  <Skeleton className="h-10 w-24 rounded-md" />
                  <Skeleton className="h-10 w-24 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-400">No projects available.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all flex flex-col shadow-md hover:shadow-lg hover:shadow-blue-500/10"
              >
                {/* Thumbnail */}
                {project.thumbnail ? (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-semibold">
                    {project.title}
                  </div>
                )}

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="mt-auto flex space-x-4 items-center justify-center border-t border-gray-700 pt-4">
                    {project.githubUrl && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 !py-5 !px-6 text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white transition"
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={16} />
                          Code
                        </a>
                      </Button>
                    )}

                    {project.liveUrl && (
                      <Button
                        asChild
                        size="sm"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 !py-5 !px-6 text-white transition"
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
