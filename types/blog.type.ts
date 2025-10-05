import { User } from "./user.types";

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  coverImage?: string | null;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;

  userId: number;
  user?: User;
}


export interface BlogFormData {
  title: string;
  content: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
}