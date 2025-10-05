'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

const BASE_API = process.env.NEXT_PUBLIC_BASE_API!;

// Create
export async function createBlogAction(formData: any) {
  const res = await fetch(`${BASE_API}/blog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Failed to create blog");

  revalidatePath("/blogs");
  revalidatePath("/dashboard/blogs");
  revalidateTag("blogs");

  return res.json();
}

// Update
export async function updateBlogAction(id: number, data: any) {
  const res = await fetch(`${BASE_API}/blog/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update blog");

  revalidatePath("/blogs");
  revalidatePath("/dashboard/blogs");
  revalidateTag("blogs");
  revalidateTag(`blog-${id}`);

  return res.json();
}

// Delete
export async function deleteBlogAction(id: number) {
  const res = await fetch(`${BASE_API}/blog/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete blog");

  revalidatePath("/blogs");
  revalidatePath("/dashboard/blogs");
  revalidateTag("blogs");
  revalidateTag(`blog-${id}`);

  return { success: true };
}
