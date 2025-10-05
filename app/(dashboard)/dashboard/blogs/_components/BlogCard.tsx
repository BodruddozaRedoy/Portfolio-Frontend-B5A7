'use client';

import { Blog } from '@/types/blog.type';
import { Calendar, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

interface BlogCardProps {
  blog: Blog;
  onEdit?: (blog: Blog) => void;
  onDelete?: (blog: Blog) => void;
}

export default function BlogCard({ blog, onEdit, onDelete }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link href={`/blogs/${blog?.id}`}>
      <div className="bg-gray-800 text-white rounded-lg border border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-white line-clamp-2">
              {blog.title}
            </h3>
            {
              onEdit && <span className={`px-2 py-1 text-xs rounded-full ${blog.published
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
                }`}>
                {blog.published == true ? 'Published' : 'Draft'}
              </span>
            }
          </div>

          <p className="text-white text-sm mb-4 line-clamp-3">
            {blog.content}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {blog?.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                {blog.published ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {
                onEdit && <button
                  onClick={() => onEdit(blog)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="Edit blog"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              }
              {
                onDelete && <button
                  onClick={() => onDelete(blog)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete blog"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}