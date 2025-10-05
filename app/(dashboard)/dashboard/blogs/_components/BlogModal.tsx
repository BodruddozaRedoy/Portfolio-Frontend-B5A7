'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Blog, BlogFormData } from '@/types/blog.type';

// Helper to generate a clean slug from the title
const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')  // remove special characters
    .replace(/\s+/g, '-')      // replace spaces with hyphens
    .replace(/-+/g, '-');      // collapse multiple hyphens
};

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BlogFormData) => void;
  blog?: Blog | null;
  isEditing?: boolean;
}

export default function BlogModal({
  isOpen,
  onClose,
  onSubmit,
  blog,
  isEditing = false
}: BlogModalProps) {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    content: '',
    coverImage: '',
    tags: [],
    published: false,
  });
  const [tagInput, setTagInput] = useState('');

  // Pre-fill when editing
  useEffect(() => {
    if (blog && isEditing) {
      setFormData({
        title: blog.title,
        slug: blog.slug || generateSlug(blog.title),
        content: blog.content,
        coverImage: blog.coverImage || '',
        tags: blog.tags || [],
        published: blog.published,
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        content: '',
        coverImage: '',
        tags: [],
        published: false,
      });
    }
  }, [blog, isEditing]);

  // Auto-generate slug when title changes
  useEffect(() => {
    if (!isEditing || (isEditing && !blog?.slug)) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(prev.title),
      }));
    }
  }, [formData.title]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 text-gray-100 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold">
            {isEditing ? 'Edit Blog' : 'Create New Blog'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
              placeholder="Enter blog title"
            />
          </div>

          {/* Slug (auto-generated) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Slug (auto-generated)
            </label>
            <input
              type="text"
              value={formData.slug}
              readOnly
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-400 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              This slug is generated automatically from the title.
            </p>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content *
            </label>
            <textarea
              required
              rows={6}
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
              placeholder="Write your blog content..."
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Cover Image URL
            </label>
            <input
              type="url"
              value={formData.coverImage}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  coverImage: e.target.value,
                }))
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
                placeholder="Add a tag and press Enter"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 bg-blue-800/40 text-blue-300 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:text-blue-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Publish Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  published: e.target.checked,
                }))
              }
              className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
            />
            <label htmlFor="published" className="ml-2 text-sm text-gray-300">
              Publish this blog
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700 border border-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {isEditing ? 'Update Blog' : 'Create Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
