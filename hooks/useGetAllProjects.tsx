import { useEffect, useState } from "react";
import { Project, ProjectFormData } from "@/types/project.type";

export default function useGetAllProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data?.data || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Create a project
  const createProject = async (formData: ProjectFormData & { userId: number; slug: string }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create project");

      const responseData = await res.json();
      const newProject = responseData?.data || responseData;

      setProjects((prev) => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      console.error("Error creating project:", err);
      throw err;
    }
  };

  // ✅ Update a project
  const updateProject = async (id: number, data: Partial<ProjectFormData>) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update project");

      const responseData = await res.json();
      const updatedProject = responseData?.data || responseData;

      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedProject } : p))
      );
      return updatedProject;
    } catch (err) {
      console.error("Error updating project:", err);
      throw err;
    }
  };

  // ✅ Delete a project
  const deleteProject = async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete project");

      setProjects((prev) => prev.filter((p) => p.id !== id));
      return id;
    } catch (err) {
      console.error("Error deleting project:", err);
      throw err;
    }
  };

  return {
    projects,
    loading,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}
