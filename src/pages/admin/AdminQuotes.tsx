import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Trash2, Mail, Phone, MapPin, AlertCircle, Inbox } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import type { Quote } from '@/lib/types';

export default function AdminQuotes() {
  const { signOut } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      setError(error.message);
    } else {
      setQuotes((data ?? []) as Quote[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar esta solicitud?')) return;
    const { error } = await supabase.from('quotes').delete().eq('id', id);
    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      setQuotes((prev) => prev.filter((q) => q.id !== id));
    }
  }

  return (
    <div className="min-h-screen bg-ink-50">
      <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/90 backdrop-blur">
        <div className="container-app flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 font-display text-sm font-bold text-white">N&amp;N</span>
            <div>
              <h1 className="font-display text-lg text-ink-900">Solicitudes de presupuesto</h1>
              <p className="text-xs text-ink-500">{quotes.length} solicitudes</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/admin/proyectos" className="btn-ghost">Proyectos</Link>
            <Link to="/" className="btn-ghost">Ver web</Link>
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

        {loading ? (
          <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-teal-700" /></div>
        ) : quotes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-12 text-center">
            <Inbox className="mx-auto h-12 w-12 text-ink-300" />
            <h2 className="mt-4 font-display text-xl text-ink-900">Aún no hay solicitudes</h2>
            <p className="mt-2 text-ink-500">Las solicitudes del formulario aparecerán aquí.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {quotes.map((q) => (
              <article key={q.id} className="card p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h2 className="font-display text-lg text-ink-900">{q.name}</h2>
                    <p className="text-xs text-ink-400">{new Date(q.created_at).toLocaleString('es-ES')}</p>
                  </div>
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">{q.service}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-ink-600">
                  <a href={`tel:${q.phone}`} className="flex items-center gap-1.5 hover:text-teal-700"><Phone className="h-4 w-4" /> {q.phone}</a>
                  {q.email && <a href={`mailto:${q.email}`} className="flex items-center gap-1.5 hover:text-teal-700"><Mail className="h-4 w-4" /> {q.email}</a>}
                  {q.locality && <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {q.locality}</span>}
                </div>
                <p className="mt-3 text-sm text-ink-700">{q.description}</p>
                {q.photo_urls.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {q.photo_urls.map((url, i) => (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                        <img src={url} alt={`Referencia ${i + 1}`} className="h-20 w-20 rounded-lg object-cover" />
                      </a>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex justify-end">
                  <button type="button" onClick={() => handleDelete(q.id)} className="btn-outline border-red-200 text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" /> Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
