import React from 'react';
import { notFound } from 'next/navigation';
import { BlogDetails } from './_components/BlogDetails';

interface PageProps {
  params: Promise<{ blogId: string }>;
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { blogId } = await params;

  if (!blogId || isNaN(Number(blogId))) {
    notFound();
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`,
      {
        next: { 
          revalidate: 60 // Revalidate every 60 seconds
        }
      }
    );

    if (!res.ok) {
      if (res.status === 404) {
        notFound();
      }
      throw new Error('Failed to fetch blog');
    }

    const data = await res.json();
    const blog = data?.data;

    if (!blog) {
      notFound();
    }

    // If blog is not published, you might want to add additional checks here
    // For example, check if the current user is the author

    return <BlogDetails blog={blog} />;
  } catch (error) {
    console.error('Error fetching blog:', error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { blogId } = await params;
  
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`
    );
    
    if (!res.ok) {
      return {
        title: 'Blog Not Found',
      };
    }

    const data = await res.json();
    const blog = data?.data;

    return {
      title: blog?.title || 'Blog Post',
      description: blog?.content?.substring(0, 160) + '...' || 'Read this blog post',
      openGraph: {
        title: blog?.title,
        description: blog?.content?.substring(0, 160) + '...',
        images: blog?.coverImage ? [blog.coverImage] : [],
        type: 'article',
        publishedTime: blog?.createdAt,
        authors: [blog?.user.name],
      },
    };
  } catch (error) {
    return {
      title: 'Blog Post',
    };
  }
}