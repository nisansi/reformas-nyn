/*
# Esquema inicial de Reformas N&N

## Resumen
Crea las tablas necesarias para la web de Reformas N&N: categorías de servicios,
proyectos, imágenes de proyectos, solicitudes de presupuesto y opiniones.
También crea el bucket de almacenamiento para fotos de proyectos y define las
políticas de seguridad (RLS) y los permisos.

## Tablas nuevas
1. `categories` — categorías de proyectos/servicios (para filtros de la galería).
   - id (uuid, pk), slug (text, único), name (text), sort_order (int), created_at.
2. `projects` — proyectos de la galería.
   - id (uuid, pk), title (text), description (text), category_id (uuid FK → categories),
     published (bool, default false), sort_order (int), is_before_after (bool, default false),
     created_at, updated_at.
3. `project_images` — imágenes asociadas a un proyecto.
   - id (uuid, pk), project_id (uuid FK → projects ON DELETE CASCADE),
     storage_path (text), url (text), title (text), description (text),
     image_type (text: 'normal'|'before'|'after'), sort_order (int), created_at.
4. `quotes` — solicitudes de presupuesto del formulario público.
   - id (uuid, pk), name (text), phone (text), email (text), service (text),
     description (text), locality (text), photo_urls (text[]), created_at.
5. `reviews` — opiniones de clientes (gestionadas desde el panel).
   - id (uuid, pk), author (text), content (text), rating (int 1-5),
     published (bool, default false), sort_order (int), created_at.

## Seguridad
- Se habilita RLS en todas las tablas.
- `is_admin()` función SECURITY DEFINER que comprueba `raw_app_meta_data.is_admin = 'true'`.
- Lectura pública (anon + authenticated) para proyectos/imágenes/categorías/opiniones PUBLICADAS.
- Escritura (INSERT/UPDATE/DELETE) restringida a administradores autenticados.
- `quotes`: inserción pública (anon + authenticated), lectura/eliminación solo admin.
- Permisos GRANT mínimos por tabla y rol.
- Storage bucket `project-images` con políticas públicas de lectura y admin de escritura.

## Notas importantes
1. El flag de administrador se establece en `raw_app_meta_data` del usuario
   (NO en `raw_user_meta_data`). Ver tutorial para crear el primer admin.
2. Las imágenes se almacenan en el bucket `project-images`. Las URLs públicas
   se generan desde el frontend.
3. Las fechas usan timestamptz con DEFAULT now().
*/

-- ============================================================
-- Función auxiliar: is_admin()
-- ============================================================
-- Comprueba si el usuario autenticado tiene el flag is_admin en raw_app_meta_data.
-- Es SECURITY DEFINER para poder leer auth.users sin exponer la tabla.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (auth.uid() IS NOT NULL
     AND EXISTS (
       SELECT 1
       FROM auth.users u
       WHERE u.id = auth.uid()
         AND u.raw_app_meta_data->>'is_admin' = 'true'
     )),
    false
  );
$$;

-- Solo ejecutable por roles autenticados/anon (sin secretos): la lógica ya comprueba auth.uid()
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, anon;

-- ============================================================
-- Tabla: categories
-- ============================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Lectura pública (todos pueden listar categorías para los filtros)
GRANT SELECT ON public.categories TO anon, authenticated;
-- Escritura solo admin
GRANT INSERT, UPDATE, DELETE ON public.categories TO authenticated;

DROP POLICY IF EXISTS "public_read_categories" ON public.categories;
CREATE POLICY "public_read_categories"
  ON public.categories FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "admin_insert_categories" ON public.categories;
CREATE POLICY "admin_insert_categories"
  ON public.categories FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_update_categories" ON public.categories;
CREATE POLICY "admin_update_categories"
  ON public.categories FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_delete_categories" ON public.categories;
CREATE POLICY "admin_delete_categories"
  ON public.categories FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ============================================================
-- Tabla: projects
-- ============================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  published boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  is_before_after boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS projects_published_idx ON public.projects (published, sort_order);
CREATE INDEX IF NOT EXISTS projects_category_idx ON public.projects (category_id);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.projects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.projects TO authenticated;

-- Pública: solo proyectos publicados visibles para anónimos y autenticados no-admin
DROP POLICY IF EXISTS "public_read_published_projects" ON public.projects;
CREATE POLICY "public_read_published_projects"
  ON public.projects FOR SELECT
  TO anon, authenticated
  USING (published = true OR public.is_admin());

DROP POLICY IF EXISTS "admin_insert_projects" ON public.projects;
CREATE POLICY "admin_insert_projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_update_projects" ON public.projects;
CREATE POLICY "admin_update_projects"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_delete_projects" ON public.projects;
CREATE POLICY "admin_delete_projects"
  ON public.projects FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ============================================================
-- Tabla: project_images
-- ============================================================
CREATE TABLE IF NOT EXISTS public.project_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  storage_path text NOT NULL,
  url text NOT NULL,
  title text,
  description text,
  image_type text NOT NULL DEFAULT 'normal' CHECK (image_type IN ('normal','before','after')),
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS project_images_project_idx ON public.project_images (project_id, sort_order);

ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.project_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.project_images TO authenticated;

-- Pública: imágenes de proyectos publicados (o cualquier imagen si es admin)
DROP POLICY IF EXISTS "public_read_project_images" ON public.project_images;
CREATE POLICY "public_read_project_images"
  ON public.project_images FOR SELECT
  TO anon, authenticated
  USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.projects p
      WHERE p.id = project_images.project_id AND p.published = true
    )
  );

DROP POLICY IF EXISTS "admin_insert_project_images" ON public.project_images;
CREATE POLICY "admin_insert_project_images"
  ON public.project_images FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_update_project_images" ON public.project_images;
CREATE POLICY "admin_update_project_images"
  ON public.project_images FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_delete_project_images" ON public.project_images;
CREATE POLICY "admin_delete_project_images"
  ON public.project_images FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ============================================================
-- Tabla: quotes
-- ============================================================
CREATE TABLE IF NOT EXISTS public.quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  service text NOT NULL,
  description text NOT NULL,
  locality text,
  photo_urls text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS quotes_created_idx ON public.quotes (created_at DESC);

ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- El público puede insertar solicitudes; solo admin las lee/borra
GRANT INSERT ON public.quotes TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.quotes TO authenticated;

DROP POLICY IF EXISTS "anon_insert_quotes" ON public.quotes;
CREATE POLICY "anon_insert_quotes"
  ON public.quotes FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_quotes" ON public.quotes;
CREATE POLICY "admin_read_quotes"
  ON public.quotes FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "admin_update_quotes" ON public.quotes;
CREATE POLICY "admin_update_quotes"
  ON public.quotes FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_delete_quotes" ON public.quotes;
CREATE POLICY "admin_delete_quotes"
  ON public.quotes FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ============================================================
-- Tabla: reviews
-- ============================================================
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author text NOT NULL,
  content text NOT NULL,
  rating int NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  published boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS reviews_published_idx ON public.reviews (published, sort_order);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.reviews TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.reviews TO authenticated;

DROP POLICY IF EXISTS "public_read_published_reviews" ON public.reviews;
CREATE POLICY "public_read_published_reviews"
  ON public.reviews FOR SELECT
  TO anon, authenticated
  USING (published = true OR public.is_admin());

DROP POLICY IF EXISTS "admin_insert_reviews" ON public.reviews;
CREATE POLICY "admin_insert_reviews"
  ON public.reviews FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_update_reviews" ON public.reviews;
CREATE POLICY "admin_update_reviews"
  ON public.reviews FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_delete_reviews" ON public.reviews;
CREATE POLICY "admin_delete_reviews"
  ON public.reviews FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ============================================================
-- Storage bucket: project-images
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Lectura pública del bucket
DROP POLICY IF EXISTS "public_read_project_images_bucket" ON storage.objects;
CREATE POLICY "public_read_project_images_bucket"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'project-images');

-- Escritura solo admin (autenticado con flag is_admin)
DROP POLICY IF EXISTS "admin_insert_project_images_bucket" ON storage.objects;
CREATE POLICY "admin_insert_project_images_bucket"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-images' AND public.is_admin());

DROP POLICY IF EXISTS "admin_update_project_images_bucket" ON storage.objects;
CREATE POLICY "admin_update_project_images_bucket"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'project-images' AND public.is_admin())
  WITH CHECK (bucket_id = 'project-images' AND public.is_admin());

DROP POLICY IF EXISTS "admin_delete_project_images_bucket" ON storage.objects;
CREATE POLICY "admin_delete_project_images_bucket"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-images' AND public.is_admin());
