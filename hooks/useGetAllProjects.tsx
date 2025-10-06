'use client'
import { useEffect, useState } from 'react'
import { Project, ProjectFormData } from '@/types/project.type'
import {
  createProjectAction,
  updateProjectAction,
  deleteProjectAction,
} from '@/actions/projectActions'

export default function useGetAllProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  // ✅ Fetch all projects
  const fetchProjects = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
        next: { tags: ['projects'] },
      })
      if (!res.ok) throw new Error('Failed to fetch projects')
      const data = await res.json()
      setProjects(data?.data || [])
    } catch (err) {
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  // ✅ Create a project (with ISR revalidation)
  const createProject = async (formData: ProjectFormData & { userId: number; slug: string }) => {
    const res = await createProjectAction(formData)
    setProjects((prev) => [res.data, ...prev])
    return res
  }

  // ✅ Update a project
  const updateProject = async (id: number, data: Partial<ProjectFormData>) => {
    const res = await updateProjectAction(id, data)
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...res.data } : p)))
    return res
  }

  // ✅ Delete a project
  const deleteProject = async (id: number) => {
    await deleteProjectAction(id)
    setProjects((prev) => prev.filter((p) => p.id !== id))
    return id
  }

  return { projects, loading, fetchProjects, createProject, updateProject, deleteProject }
}
