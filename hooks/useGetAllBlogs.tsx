import { useEffect, useState } from "react";
import { Blog, BlogFormData } from "@/types/blog.type";

export default function useGetAllBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
        next: { tags: ["blogs"] },
      });
      if (!res.ok) {
        console.log(res)
        throw new Error("Failed to fetch blogs");
      }
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

  return { blogs, loading, fetchBlogs, setBlogs };
}
