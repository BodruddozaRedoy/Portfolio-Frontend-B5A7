export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface BlogFormData {
  title: string;
  content: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
}