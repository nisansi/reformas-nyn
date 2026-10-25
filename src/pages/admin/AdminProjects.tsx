import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Loader2, Plus, Pencil, Trash2, Upload, X, Image as ImageIcon, ArrowLeft, Save, AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { supabase, STORAGE_BUCKET } from '@/lib/supabase';
import type { Project, ProjectImage, Category } from '@/lib/types';

type ProjectWithImages = Project & { images: ProjectImage[]; category: Category | null };

export default function AdminProjects() {
  const { signOut } = useAuth();
  const [projects, setProjects] = useState<ProjectWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<ProjectWithImages | null>(null);
  const [creating, setCreating] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('projects')
      .select('*, category:categories(*), images:project_images(*)')
      .order('created_at', { ascending: false });
    if (error) {
      setError(error.message);
    } else {
      setProjects((data ?? []) as unknown as ProjectWithImages[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-ink-50">
      <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/90 backdrop-blur">
        <div className="container-app flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 font-display text-sm font-bold text-white">N&amp;N</span>
            <div>
              <h1 className="font-display text-lg text-ink-900">Panel de administración</h1>
              <p className="text-xs text-ink-500">Gestión de proyectos e imágenes</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="btn-ghost"><ArrowLeft className="h-4 w-4" /> Ver web</Link>
            <button type="button" onClick={() => signOut()} className="btn-outline">Cerrar sesión</button>
          </div>
        </div>
      </header>

      <main className="container-app py-8">
        {error && (
          <div className="mb-6 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-ink-900">Proyectos</h2>
          <button type="button" onClick={() => setCreating(true)} className="btn-primary">
            <Plus className="h-4 w-4" /> Nuevo proyecto
          </button>
        </div>

        {loading ? (
          <div className="mt-10 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-teal-700" /></div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article key={p.id} className="card overflow-hidden">
                <div className="aspect-video overflow-hidden bg-ink-100">
                  {p.images[0] ? (
                    <img src={p.images[0].url} alt={p.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-ink-300"><ImageIcon className="h-10 w-10" /></div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg text-ink-900">{p.title}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${p.published ? 'bg-teal-50 text-teal-700' : 'bg-ink-100 text-ink-500'}`}>
                      {p.published ? 'Publicado' : 'Borrador'}
                    </span>
                  </div>
                  {p.description && <p className="mt-1 line-clamp-2 text-sm text-ink-500">{p.description}</p>}
                  <p className="mt-2 text-xs text-ink-400">{p.images.length} imágenes · {p.category?.name ?? 'Sin categoría'}</p>
                  {p.is_before_after && <p className="text-xs text-teal-600">Antes/después</p>}
                  <div className="mt-4 flex gap-2">
                    <button type="button" onClick={() => setEditing(p)} className="btn-outline flex-1">
                      <Pencil className="h-4 w-4" /> Editar
                    </button>
                    <DeleteButton project={p} onDeleted={load} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {(creating || editing) && (
        <ProjectDrawer
          project={editing}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSaved={() => { setEditing(null); setCreating(false); load(); }}
        />
      )}
    </div>
  );
}

function DeleteButton({ project, onDeleted }: { project: ProjectWithImages; onDeleted: () => void }) {
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    setBusy(true);
    // Borrar imágenes del storage
    for (const img of project.images) {
      await supabase.storage.from(STORAGE_BUCKET).remove([img.storage_path]);
    }
    const { error } = await supabase.from('projects').delete().eq('id', project.id);
    setBusy(false);
    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      setConfirming(false);
      onDeleted();
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <button type="button" onClick={handleDelete} disabled={busy} className="rounded-xl bg-red-600 px-3 py-2 text-sm text-white">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirmar'}
        </button>
        <button type="button" onClick={() => setConfirming(false)} className="rounded-xl px-3 py-2 text-sm text-ink-500">Cancelar</button>
      </div>
    );
  }
  return (
    <button type="button" onClick={() => setConfirming(true)} className="btn-outline border-red-200 text-red-600 hover:bg-red-50">
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

interface DrawerProps {
  project: ProjectWithImages | null;
  onClose: () => void;
  onSaved: () => void;
}

function ProjectDrawer({ project, onClose, onSaved }: DrawerProps) {
  const [title, setTitle] = useState(project?.title ?? '');
  const [description, setDescription] = useState(project?.description ?? '');
  const [categoryId, setCategoryId] = useState<string>(project?.category_id ?? '');
  const [published, setPublished] = useState(project?.published ?? false);
  const [isBeforeAfter, setIsBeforeAfter] = useState(project?.is_before_after ?? false);
  const [sortOrder, setSortOrder] = useState(project?.sort_order ?? 0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<ProjectImage[]>(project?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.from('categories').select('*').order('name').then(({ data }) => {
      if (data) setCategories(data as Category[]);
    });
  }, []);

  async function handleUpload(list: FileList | null) {
    if (!list || list.length === 0 || !project) return;
    setUploading(true);
    setError(null);
    for (const file of Array.from(list)) {
      if (!file.type.startsWith('image/')) continue;
      if (file.size > 5 * 1024 * 1024) { setError('Cada imagen debe pesar menos de 5MB.'); continue; }
      const ext = file.name.split('.').pop() ?? 'jpg';
      const path = `projects/${project.id}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, { upsert: false });
      if (upErr) { setError(upErr.message); continue; }
      const { data: pub } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
      const { data: ins, error: insErr } = await supabase.from('project_images').insert({
        project_id: project.id,
        storage_path: path,
        url: pub.publicUrl,
        image_type: 'normal',
        sort_order: images.length,
      }).select().single();
      if (insErr) { setError(insErr.message); continue; }
      setImages((prev) => [...prev, ins as ProjectImage]);
    }
    setUploading(false);
  }

  async function updateImageType(img: ProjectImage, type: 'normal' | 'before' | 'after') {
    const { data, error } = await supabase.from('project_images').update({ image_type: type }).eq('id', img.id).select().single();
    if (error) { setError(error.message); return; }
    setImages((prev) => prev.map((p) => (p.id === img.id ? (data as ProjectImage) : p)));
  }

  async function deleteImage(img: ProjectImage) {
    if (!confirm('¿Eliminar esta imagen?')) return;
    await supabase.storage.from(STORAGE_BUCKET).remove([img.storage_path]);
    const { error } = await supabase.from('project_images').delete().eq('id', img.id);
    if (error) { setError(error.message); return; }
    setImages((prev) => prev.filter((p) => p.id !== img.id));
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setError(null);
    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      category_id: categoryId || null,
      published,
      is_before_after: isBeforeAfter,
      sort_order: sortOrder,
    };
    let pid = project?.id;
    if (project) {
      const { error } = await supabase.from('projects').update(payload).eq('id', project.id);
      if (error) { setError(error.message); setSaving(false); return; }
    } else {
      const { data, error } = await supabase.from('projects').insert(payload).select().single();
      if (error) { setError(error.message); setSaving(false); return; }
      pid = (data as Project).id;
    }
    setSaving(false);
    // Recargar para reflejar cambios; si era nuevo, abrimos el proyecto recién creado
    if (!project && pid) {
      window.location.assign(`/admin/proyectos?new=${pid}`);
    } else {
      onSaved();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink-950/40" onClick={onClose}>
      <div
        className="h-full w-full max-w-2xl overflow-y-auto bg-ink-50 p-6 shadow-lift animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-ink-900">{project ? 'Editar proyecto' : 'Nuevo proyecto'}</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar"><X className="h-6 w-6 text-ink-500" /></button>
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="mt-6 space-y-4">
          <div>
            <label className="label" htmlFor="p-title">Título</label>
            <input id="p-title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="label" htmlFor="p-desc">Descripción</label>
            <textarea id="p-desc" className="input min-h-[100px] resize-y" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="p-cat">Categoría</label>
              <select id="p-cat" className="input" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Sin categoría</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="p-order">Orden</label>
              <input id="p-order" type="number" className="input" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
            </div>
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="h-4 w-4" />
            <span className="text-sm text-ink-700">Publicado (visible en la web)</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isBeforeAfter} onChange={(e) => setIsBeforeAfter(e.target.checked)} className="h-4 w-4" />
            <span className="text-sm text-ink-700">Marcar como antes/después</span>
          </label>

          <button type="submit" className="btn-primary w-full" disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {project ? 'Guardar cambios' : 'Crear proyecto'}
          </button>
        </form>

        {project && (
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-ink-900">Imágenes ({images.length})</h3>
              <label className="btn-outline cursor-pointer">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                Subir imágenes
                <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleUpload(e.target.files)} />
              </label>
            </div>
            {isBeforeAfter && (
              <p className="mt-2 text-xs text-ink-500">
                Marca cada imagen como «Antes» o «Después». La sección pública mostrará solo las parejas completas.
              </p>
            )}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {images.map((img) => (
                <div key={img.id} className="rounded-xl bg-white p-3 shadow-soft">
                  <img src={img.url} alt={img.title ?? ''} className="aspect-video w-full rounded-lg object-cover" />
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <select
                      className="input flex-1 py-1.5 text-xs"
                      value={img.image_type}
                      onChange={(e) => updateImageType(img, e.target.value as 'normal' | 'before' | 'after')}
                    >
                      <option value="normal">Normal</option>
                      <option value="before">Antes</option>
                      <option value="after">Después</option>
                    </select>
                    <button type="button" onClick={() => deleteImage(img)} className="rounded-lg p-2 text-red-600 hover:bg-red-50" aria-label="Eliminar imagen">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
