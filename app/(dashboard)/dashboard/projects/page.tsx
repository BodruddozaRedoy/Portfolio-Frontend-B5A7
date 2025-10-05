'use client';

import { useState } from 'react';
import { Search, Filter, Plus, SortAsc, SortDesc } from 'lucide-react';
import { toast } from 'sonner';
import useUserClient from '@/hooks/useGetUserClient';
import DeleteConfirmModal from '../blogs/_components/DeleteConfirmModal';
import ProjectCard from './_components/ProjectCard';
import ProjectModal from './_components/ProjectModal';
import useGetAllProjects from '@/hooks/useGetAllProjects';

// Helper to generate slugs
const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export default function ProjectDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const { projects, createProject, updateProject, deleteProject } = useGetAllProjects();
  const { user } = useUserClient();

  // Create Project
  const handleCreateProject = async (formData: any) => {
    if (!user?.id) return toast.error("User not found!");

    try {
      const slug = generateSlug(formData.title);
      await createProject({ ...formData, slug, userId: Number(user.id) });
      toast.success("Project created successfully!");
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create project");
    }
  };

  // Edit Project
  const handleEditProject = async (formData: any) => {
    if (!selectedProject) return;
    try {
      const slug = generateSlug(formData.title);
      await updateProject(selectedProject.id, { ...formData, slug });
      toast.success("Project updated successfully!");
      setIsEditModalOpen(false);
      setSelectedProject(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update project");
    }
  };

  // Delete Project
  const handleDeleteProject = async () => {
    if (!selectedProject) return;
    try {
      await deleteProject(selectedProject.id);
      toast.success("Project deleted!");
      setIsDeleteModalOpen(false);
      setSelectedProject(null);
    } catch {
      toast.error("Failed to delete project");
    }
  };

  const openEditModal = (project: any) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (project: any) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-gray-100">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Projects Dashboard</h1>
            <p className="text-gray-400 mt-2">Manage your development projects</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Project
          </button>
        </div>

        {/* Search and Sort */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-6 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
            />
          </div>

          <button
            onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg hover:bg-gray-700 text-gray-200"
          >
            {sortOrder === 'newest' ? <SortDesc className="w-5 h-5" /> : <SortAsc className="w-5 h-5" />}
            {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
          </button>
        </div>

        {/* Projects Grid */}
        {projects?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <Search className="w-16 h-16 mx-auto mb-4" />
            No projects found. Start by creating one!
            <div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Project
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProject}
      />

      <ProjectModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProject(null);
        }}
        onSubmit={handleEditProject}
        project={selectedProject}
        isEditing
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteProject}
        blogTitle={selectedProject?.title || ''}
      />
    </div>
  );
}
