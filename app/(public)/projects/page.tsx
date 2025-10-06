'use client';

import { useState } from 'react';
import { Search, Filter, Plus, SortAsc, SortDesc } from 'lucide-react';
import { Blog, BlogFormData } from '@/types/blog.type';
import useUserClient from '@/hooks/useGetUserClient';
import { toast } from 'sonner';
import useGetAllBlogs from '@/hooks/useGetAllBlogs';
import { createBlogAction, deleteBlogAction, updateBlogAction } from '@/actions/blogActions';
import BlogCard from '@/app/(dashboard)/dashboard/blogs/_components/BlogCard';
import BlogCardSkeleton from '@/components/common/BlogSkeleton';
import useGetAllProjects from '@/hooks/useGetAllProjects';
import ProjectCard from '@/app/(dashboard)/dashboard/projects/_components/ProjectCard';


export default function ProjectPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const { projects, loading } = useGetAllProjects();


  // const filteredProjects = projects?.filter((prev: any) => prev.published === true)

  console.log(projects)

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-gray-100 mt-20">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">All Projects</h1>
            {/* <p className="text-gray-400 mt-2">Manage your blog posts</p> */}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Sort Order */}
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'))
              }
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors text-gray-200"
            >
              {sortOrder === 'newest' ? (
                <SortDesc className="w-5 h-5" />
              ) : (
                <SortAsc className="w-5 h-5" />
              )}
              {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
            </button>
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className='grid grid-cols-3 gap-2 w-full'>
            {[...Array(6)].map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : projects?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No projects found.</p>
        )}

      </div>
    </div>
  );
}
