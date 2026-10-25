// Tipos que reflejan las tablas de la base de datos (public.*).

export interface Category {
  id: string;
  slug: string;
  name: string;
  sort_order: number;
  created_at: string;
}

export type ImageType = 'normal' | 'before' | 'after';

export interface ProjectImage {
  id: string;
  project_id: string;
  storage_path: string;
  url: string;
  title: string | null;
  description: string | null;
  image_type: ImageType;
  sort_order: number;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  category_id: string | null;
  published: boolean;
  sort_order: number;
  is_before_after: boolean;
  created_at: string;
  updated_at: string;
  category?: Category | null;
  images?: ProjectImage[];
}

export interface Quote {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  description: string;
  locality: string | null;
  photo_urls: string[];
  created_at: string;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  rating: number;
  published: boolean;
  sort_order: number;
  created_at: string;
}
