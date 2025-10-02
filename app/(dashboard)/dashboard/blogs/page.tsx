'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Plus, SortAsc, SortDesc } from 'lucide-react';
import { Blog, BlogFormData } from '@/types/blog.type';
import BlogCard from './_components/BlogCard';
import BlogModal from './_components/BlogModal';
import DeleteConfirmModal from './_components/DeleteConfirmModal';

// Mock data - replace with actual API calls
const mockBlogs: Blog[] = [
  {
    id: 1,
    title: 'Getting Started with Next.js',
    slug: 'getting-started-with-nextjs',
    content: 'Learn how to build modern web applications with Next.js...',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500',
    tags: ['Next.js', 'React', 'Web Development'],
    published: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    userId: 1
  },
  {
    id: 2,
    title: 'Mastering Tailwind CSS',
    slug: 'mastering-tailwind-css',
    content: 'Discover the power of utility-first CSS with Tailwind...',
    tags: ['Tailwind', 'CSS', 'Design'],
    published: false,
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
    userId: 1
  }
];

export default function BlogsDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>(mockBlogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    return blogs
      .filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesStatus = statusFilter === 'all' || 
                            (statusFilter === 'published' && blog.published) ||
                            (statusFilter === 'draft' && !blog.published);
        
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
  }, [blogs, searchTerm, statusFilter, sortOrder]);

  const handleCreateBlog = (formData: BlogFormData) => {
    const newBlog: Blog = {
      id: Math.max(...blogs.map(b => b.id)) + 1,
      title: formData.title,
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      content: formData.content,
      coverImage: formData.coverImage,
      tags: formData.tags,
      published: formData.published,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 1
    };
    
    setBlogs(prev => [newBlog, ...prev]);
    setIsCreateModalOpen(false);
  };

  const handleEditBlog = (formData: BlogFormData) => {
    if (!selectedBlog) return;
    
    setBlogs(prev => prev.map(blog => 
      blog.id === selectedBlog.id 
        ? {
            ...blog,
            ...formData,
            updatedAt: new Date().toISOString()
          }
        : blog
    ));
    
    setIsEditModalOpen(false);
    setSelectedBlog(null);
  };

  const handleDeleteBlog = () => {
    if (!selectedBlog) return;
    
    setBlogs(prev => prev.filter(blog => blog.id !== selectedBlog.id));
    setIsDeleteModalOpen(false);
    setSelectedBlog(null);
  };

  const openEditModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-gray-100">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Blog Dashboard</h1>
            <p className="text-gray-400 mt-2">Manage your blog posts</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Blog
          </button>
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
              onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
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
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map(blog => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No blogs found
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by creating your first blog post.'}
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Blog
              </button>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="text-2xl font-bold text-white">{blogs.length}</div>
            <div className="text-gray-400">Total Blogs</div>
          </div>
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="text-2xl font-bold text-green-400">
              {blogs.filter(b => b.published).length}
            </div>
            <div className="text-gray-400">Published</div>
          </div>
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <div className="text-2xl font-bold text-yellow-400">
              {blogs.filter(b => !b.published).length}
            </div>
            <div className="text-gray-400">Drafts</div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BlogModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateBlog}
      />

      <BlogModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedBlog(null);
        }}
        onSubmit={handleEditBlog}
        blog={selectedBlog}
        isEditing={true}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedBlog(null);
        }}
        onConfirm={handleDeleteBlog}
        blogTitle={selectedBlog?.title || ''}
      />
    </div>
  );
}
