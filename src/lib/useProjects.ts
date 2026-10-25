import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import type { Project, ProjectImage, Category } from './types';

interface ProjectsResult {
  projects: (Project & { images: ProjectImage[] })[];
  loading: boolean;
  error: string | null;
}

/**
 * Obtiene los proyectos publicados (con sus imágenes) desde la base de datos.
 * Si Supabase no está configurado, devuelve lista vacía con error descriptivo.
 */
export function usePublishedProjects(): ProjectsResult {
  const [projects, setProjects] = useState<(Project & { images: ProjectImage[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!isSupabaseConfigured()) {
        setLoading(false);
        setError('storage-no-configurado');
        return;
      }

      const { data, error } = await supabase
        .from('projects')
        .select('*, category:categories(*), images:project_images(*)')
        .eq('published', true)
        .order('sort_order', { ascending: true })
        .order('sort_order', { referencedTable: 'images', ascending: true });

      if (!active) return;

      if (error) {
        setError(error.message);
        setProjects([]);
      } else {
        setProjects((data ?? []) as unknown as (Project & { images: ProjectImage[]; category: Category | null })[]);
        setError(null);
      }
      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return { projects, loading, error };
}
