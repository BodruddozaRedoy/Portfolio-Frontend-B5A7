import { notFound } from "next/navigation";
import { BlogDetails } from "./_components/BlogDetails";
import { Blog } from "@/types/blog.type";

// ✅ 1. Static params generator (replaces getStaticPaths)
export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`);
    const data = await res.json();

    // Pre-render only published blogs
    return (
      data?.data?.map((blog: Blog) => ({
        blogId: blog.id.toString(),
      })) || []
    );
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// ✅ 2. ISR revalidation option on the fetch
export default async function BlogDetailsPage({
  params,
}: {
  params: { blogId: string };
}) {
  const { blogId } = params;

  if (!blogId || isNaN(Number(blogId))) {
    notFound();
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`,
      {
        next: { revalidate: 60 }, // ✅ ISR every 60 seconds
      }
    );

    if (!res.ok) {
      if (res.status === 404) notFound();
      throw new Error("Failed to fetch blog");
    }

    const data = await res.json();
    const blog = data?.data;

    if (!blog) notFound();

    return <BlogDetails blog={blog} />;
  } catch (error) {
    console.error("Error fetching blog:", error);
    notFound();
  }
}

// ✅ 3. Optional SEO metadata (like getStaticProps + Head)
export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}) {
  const { blogId } = params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`,
      { next: { revalidate: 300 } } // cache metadata for 5 mins
    );

    if (!res.ok) {
      return { title: "Blog Not Found" };
    }

    const data = await res.json();
    const blog = data?.data;

    return {
      title: blog?.title || "Blog Post",
      description:
        blog?.content?.substring(0, 160) + "..." || "Read this blog post",
      openGraph: {
        title: blog?.title,
        description: blog?.content?.substring(0, 160) + "...",
        images: blog?.coverImage ? [blog.coverImage] : [],
        type: "article",
        publishedTime: blog?.createdAt,
        authors: blog?.user?.name ? [blog.user.name] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return { title: "Blog Post" };
  }
}
