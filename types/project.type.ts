import { User } from "./user.types";

export interface Project {
  id: number;
  title: string;
  slug?: string | null;
  description: string;
  techStack: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  thumbnail?: string | null;
  createdAt: string;
  updatedAt: string;

  userId: number;
  user?: User;
}


export interface ProjectFormData {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  thumbnail?: string;
}
