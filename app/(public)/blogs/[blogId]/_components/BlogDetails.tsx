import { Calendar, Clock, User, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Blog } from '@/types/blog.type';

interface BlogDetailsProps {
  blog: Blog;
}

export function BlogDetails({ blog }: BlogDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const readingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 mt-20">
      {/* Header Section */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant={blog.published ? "default" : "secondary"}>
            {blog.published ? "Published" : "Draft"}
          </Badge>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readingTime(blog.content)}</span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {blog.title}
        </h1>

        {/* Author Info */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={blog.user?.avatarUrl} alt={blog.user?.name} />
                <AvatarFallback>
                  {getInitials(blog.user?.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{blog.user?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {blog.user?.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-auto max-h-96 object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div 
          className="whitespace-pre-wrap leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Last updated: {formatDate(blog.updatedAt)}</span>
          <span>Blog Number: #{blog.id}</span>
        </div>
      </footer>
    </article>
  );
}