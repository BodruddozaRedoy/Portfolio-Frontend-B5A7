import { Blog } from "./blog.type";
import { Project } from "./project.type";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  bio?: string | null;
  avatarUrl?: string | null;
  skills: string[];
  social?: Record<string, string> | null;
  createdAt: string; // or Date, depending on your usage
  updatedAt: string;

  projects?: Project[];
  blogs?: Blog[];
}