'use client';

import { Calendar, Edit2, Trash2, Github, Globe } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    slug?: string;
    description: string;
    techStack: string[];
    githubUrl?: string | null;
    liveUrl?: string | null;
    thumbnail?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  onEdit: (project: any) => void;
  onDelete: (project: any) => void;
}

export default function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg border border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-200">
      {/* Thumbnail */}
      {project.thumbnail ? (
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-400 text-sm">
          No Thumbnail
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-white line-clamp-2">
            {project.title}
          </h3>
          <span className="text-xs text-gray-400">{formatDate(project.createdAt)}</span>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 mb-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-300 hover:text-blue-400 text-sm"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-300 hover:text-green-400 text-sm"
            >
              <Globe className="w-4 h-4" />
              Live
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Updated {formatDate(project.updatedAt)}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(project)}
              className="p-2 text-blue-500 hover:bg-blue-900/30 rounded-md transition-colors"
              title="Edit project"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(project)}
              className="p-2 text-red-500 hover:bg-red-900/30 rounded-md transition-colors"
              title="Delete project"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
