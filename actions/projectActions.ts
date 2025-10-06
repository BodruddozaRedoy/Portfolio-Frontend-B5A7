'use server'

import { revalidatePath } from 'next/cache'

export async function createProjectAction(formData: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  if (!res.ok) throw new Error('Failed to create project')

  // ✅ Trigger ISR revalidation
  revalidatePath('/projects')
  revalidatePath('/')

  return res.json()
}

export async function updateProjectAction(id: number, data: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error('Failed to update project')

  revalidatePath('/projects')
  revalidatePath('/')

  return res.json()
}

export async function deleteProjectAction(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) throw new Error('Failed to delete project')

  revalidatePath('/projects')
  revalidatePath('/')

  return { id }
}
