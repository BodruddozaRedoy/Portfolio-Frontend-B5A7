import { useEffect, useState } from "react";
import { Blog, BlogFormData } from "@/types/blog.type";

export default function useGetAllBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Create blog
  const createBlog = async (formData: BlogFormData & { userId: number }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error("Failed to create blog");
    const newBlog = await res.json();
    setBlogs((prev) => [newBlog, ...prev]); // update local state
    return newBlog;
  };

  // Update blog
  const updateBlog = async (id: number, data: Partial<BlogFormData>) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update blog");
    const updated = await res.json();
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updated } : b))
    );
    return updated;
  };

  // Delete blog
  const deleteBlog = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete blog");
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    return id;
  };

  return { blogs, loading, createBlog, updateBlog, deleteBlog, fetchBlogs };
}
