export interface Project {
  id?: number;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
  userId: number;
}

export interface ProjectFormData {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  thumbnail?: string;
}
