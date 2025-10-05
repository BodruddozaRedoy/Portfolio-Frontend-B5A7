'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const generateSlug = (text: string) =>
  text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

export default function ProjectModal({ isOpen, onClose, onSubmit, project, isEditing = false }: any) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    techStack: [] as string[],
    githubUrl: '',
    liveUrl: '',
    thumbnail: '',
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (project && isEditing) {
      setFormData({
        title: project.title,
        slug: project.slug || generateSlug(project.title),
        description: project.description,
        techStack: project.techStack || [],
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        thumbnail: project.thumbnail || '',
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        description: '',
        techStack: [],
        githubUrl: '',
        liveUrl: '',
        thumbnail: '',
      });
    }
  }, [project, isEditing]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, slug: generateSlug(prev.title) }));
  }, [formData.title]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addTech = () => {
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tech),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 text-gray-100 rounded-lg w-full max-w-2xl border border-gray-700 shadow-lg overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold">
            {isEditing ? 'Edit Project' : 'Create Project'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              required
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Slug</label>
            <input
              type="text"
              readOnly
              value={formData.slug}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Description *</label>
            <textarea
              rows={5}
              value={formData.description}
              required
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Tech Stack</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md"
                placeholder="Add technology and press Enter"
              />
              <button type="button" onClick={addTech} className="px-4 py-2 bg-blue-600 rounded-md">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-3 py-1 bg-blue-800/40 text-blue-300 rounded-full text-sm"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTech(tech)}
                    className="ml-2 hover:text-blue-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">GitHub URL</label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Live URL</label>
            <input
              type="url"
              value={formData.liveUrl}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Thumbnail URL</label>
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md border border-gray-700 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {isEditing ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
