import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, ArrowRight, Wrench, Layers } from 'lucide-react';
import { SERVICES, whatsappLink } from '@/lib/constants';
import { IMAGES } from '@/lib/images';
import { useSeo } from '@/lib/useSeo';
import { usePublishedProjects } from '@/lib/useProjects';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Project, ProjectImage } from '@/lib/types';
import { Reveal } from '@/components/Reveal';

type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  url: string;
};

export default function Gallery() {
  useSeo({
    title: 'Galería de proyectos de reformas en Valencia | Reformas N&N',
    description:
      'Galería de proyectos de reformas en Valencia. Reformas integrales, baños, cocinas y más. Filtra por categoría y mira los detalles de cada proyecto.',
    canonicalPath: '/proyectos',
  });

  const { projects, loading, error } = usePublishedProjects();
  const [filter, setFilter] = useState<string>('todas');
  const [lightbox, setLightbox] = useState<{ items: GalleryItem[]; index: number } | null>(null);

  const items: GalleryItem[] = useMemo(() => {
    const list: GalleryItem[] = projects.flatMap((p) =>
      (p.images ?? []).map((img) => ({
        id: img.id,
        title: p.title,
        description: p.description,
        category: p.category?.slug ?? 'reforma',
        url: img.url,
      })),
    );
    return list;
  }, [projects]);

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return ['todas', ...Array.from(set)];
  }, [items]);

  const filtered = filter === 'todas' ? items : items.filter((i) => i.category === filter);

  // Antes / después: proyectos marcados is_before_after con imágenes before+after
  const beforeAfter = useMemo(() => {
    const result: { project: Project; before: ProjectImage; after: ProjectImage }[] = [];
    for (const p of projects) {
      if (!p.is_before_after) continue;
      const imgs = p.images ?? [];
      const before = imgs.find((i) => i.image_type === 'before');
      const after = imgs.find((i) => i.image_type === 'after');
      if (before && after) result.push({ project: p, before, after });
    }
    return result;
  }, [projects]);

  const closeLightbox = () => setLightbox(null);
  const prev = () =>
    setLightbox((lb) => (lb ? { ...lb, index: (lb.index - 1 + lb.items.length) % lb.items.length } : null));
  const next = () =>
    setLightbox((lb) => (lb ? { ...lb, index: (lb.index + 1) % lb.items.length } : null));

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  const hasProjects = items.length > 0;
  const configured = isSupabaseConfigured() && !error;

  return (
    <div className="pt-16 md:pt-20">
      <section className="bg-ink-900 py-20 text-center text-white md:py-28">
        <div className="container-app">
          <Reveal>
            <span className="section-eyebrow text-teal-300 justify-center">Galería</span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-balance">
              Nuestros proyectos de reformas
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-ink-200">
              Una selección de reformas realizadas en Valencia y alrededores. Filtra por
              categoría y haz clic en una imagen para verla en grande.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink-50 py-20 md:py-28">
        <div className="container-app">
          {/* Filtros */}
          {configured && hasProjects && (
            <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                    filter === c
                      ? 'bg-teal-700 text-white'
                      : 'bg-white text-ink-700 hover:bg-ink-100 border border-ink-200'
                  }`}
                >
                  {c === 'todas'
                    ? 'Todas'
                    : SERVICES.find((s) => s.slug === c)?.name ?? c}
                </button>
              ))}
            </Reveal>
          )}

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-ink-200/60" />
              ))}
            </div>
          ) : hasProjects ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, i) => (
                <Reveal key={item.id} delay={(i % 3) * 60}>
                  <button
                    type="button"
                    onClick={() =>
                      setLightbox({ items: filtered, index: filtered.indexOf(item) })
                    }
                    className="group relative block w-full overflow-hidden rounded-2xl shadow-card hover:shadow-lift"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink-950/80 to-transparent p-5 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-xs font-semibold uppercase tracking-wider text-teal-300">
                        {SERVICES.find((s) => s.slug === item.category)?.name ?? 'Reforma'}
                      </p>
                      <h3 className="mt-1 font-display text-lg text-white">{item.title}</h3>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-12 text-center">
                <Wrench className="mx-auto h-12 w-12 text-ink-300" />
                <h2 className="mt-4 font-display text-xl text-ink-900">Próximamente nuestros proyectos</h2>
                <p className="mx-auto mt-2 max-w-md text-ink-500">
                  {error === 'storage-no-configurado'
                    ? 'La galería se alimentará desde el panel de administración en cuanto se configure la base de datos.'
                    : 'Estamos preparando la galería con nuestros trabajos. Mientras tanto, te mostramos algunas imágenes de referencia y puedes pedirnos tu presupuesto.'}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link to="/contacto" className="btn-primary">
                    Solicitar presupuesto <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          )}

          {/* Antes y después */}
          <div className="mt-20">
            <Reveal className="text-center">
              <span className="section-eyebrow justify-center">Antes y después</span>
              <h2 className="section-title mt-4">La transformación, en imágenes</h2>
              <p className="mx-auto mt-4 max-w-xl text-ink-500">
                Cada pareja de imágenes corresponde a una misma obra real. Cuando el propietario
                suba parejas auténticas desde el panel, se mostrarán aquí.
              </p>
            </Reveal>

            {beforeAfter.length > 0 ? (
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                {beforeAfter.map(({ project, before, after }, i) => (
                  <Reveal key={project.id} delay={i * 80}>
                    <div className="grid grid-cols-2 gap-3">
                      <figure className="overflow-hidden rounded-2xl">
                        <img src={before.url} alt={`${project.title} (antes)`} className="aspect-square w-full object-cover" loading="lazy" />
                        <figcaption className="bg-ink-900 px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white">Antes</figcaption>
                      </figure>
                      <figure className="overflow-hidden rounded-2xl">
                        <img src={after.url} alt={`${project.title} (después)`} className="aspect-square w-full object-cover" loading="lazy" />
                        <figcaption className="bg-teal-700 px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white">Después</figcaption>
                      </figure>
                      <h3 className="col-span-2 mt-1 text-center font-display text-lg text-ink-900">{project.title}</h3>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal className="mt-10">
                <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-ink-200 bg-white p-8 text-center">
                  <Layers className="mx-auto h-8 w-8 text-ink-300" />
                  <p className="mt-3 text-sm text-ink-500">
                    Aún no hay parejas de antes y después publicadas. Se mostrarán aquí cuando se
                    añadan desde el panel de administración.
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/90 backdrop-blur-sm animate-fade-in"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imágenes"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Cerrar"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <figure className="mx-auto max-w-4xl px-6" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.items[lightbox.index].url}
              alt={lightbox.items[lightbox.index].title}
              className="mx-auto max-h-[80vh] w-auto rounded-xl object-contain animate-scale-in"
            />
            <figcaption className="mt-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-300">
                {SERVICES.find((s) => s.slug === lightbox.items[lightbox.index].category)?.name ?? 'Reforma'}
              </p>
              <h3 className="mt-1 font-display text-xl text-white">{lightbox.items[lightbox.index].title}</h3>
              {lightbox.items[lightbox.index].description && (
                <p className="mt-1 text-sm text-ink-300">{lightbox.items[lightbox.index].description}</p>
              )}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}

// Evita aviso de no-uso mientras Supabase no se conecta (referencia reservada).
void supabase;
