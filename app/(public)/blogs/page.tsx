'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { Blog } from '@/types/blog.type';
import useUserClient from '@/hooks/useGetUserClient';
import useGetAllBlogs from '@/hooks/useGetAllBlogs';
import BlogCard from '@/app/(dashboard)/dashboard/blogs/_components/BlogCard';
import BlogCardSkeleton from '@/components/common/BlogSkeleton';

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const { blogs, loading } = useGetAllBlogs();
  const { user } = useUserClient();

  // ✅ Get unique categories dynamically
  const categories = useMemo(() => {
    if (!blogs) return [];
    const unique = Array.from(new Set(blogs.map((b: Blog) => b.category).filter(Boolean)));
    return unique;
  }, [blogs]);

  // ✅ Filtering logic
  const filteredBlogs = useMemo(() => {
    let filtered = blogs || [];

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((blog: Blog) => blog.category === categoryFilter);
    }

    // Search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (blog: Blog) =>
          blog.title?.toLowerCase().includes(search) ||
          blog.content?.toLowerCase().includes(search) ||
          blog.tags?.some((tag) => tag.toLowerCase().includes(search))
      );
    }

    // Sort
    filtered = filtered.sort((a: Blog, b: Blog) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [blogs, searchTerm, categoryFilter, sortOrder]);

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-gray-100 mt-20">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-white">All Blogs</h1>
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

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
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
          <div className="grid grid-cols-3 gap-2 w-full">
            {[...Array(6)].map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No blogs found.</p>
        )}
      </div>
    </div>
  );
}
