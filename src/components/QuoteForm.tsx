import { useRef, useState, type FormEvent } from 'react';
import { AlertCircle, Check, Loader2, Upload, X } from 'lucide-react';
import { supabase, isSupabaseConfigured, STORAGE_BUCKET } from '@/lib/supabase';
import { SERVICES } from '@/lib/constants';

interface QuoteFormProps {
  compact?: boolean;
  defaultService?: string;
}

interface FormState {
  name: string;
  phone: string;
  service: string;
  description: string;
  email: string;
  locality: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

// Endpoint público de Formspree (los avisos llegan a Reformasnyn@hotmail.com)
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwllvdaz';

const MAX_FILES = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function validate(state: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!state.name.trim()) errors.name = 'El nombre es obligatorio.';
  if (!state.phone.trim()) errors.phone = 'El teléfono es obligatorio.';
  else if (!/^[0-9+\s()-]{6,}$/.test(state.phone)) errors.phone = 'Introduce un teléfono válido.';
  if (!state.service) errors.service = 'Selecciona un servicio.';
  if (!state.description.trim()) errors.description = 'Describe tu reforma.';
  else if (state.description.trim().length < 10) errors.description = 'Añade un poco más de detalle.';
  if (state.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) errors.email = 'Correo no válido.';
  return errors;
}

export function QuoteForm({ compact = false, defaultService }: QuoteFormProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    service: defaultService ?? '',
    description: '',
    email: '',
    locality: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string>('');
  // Evita duplicar la solicitud en la BD si falla el aviso por correo y se reintenta
  const savedPhotoUrls = useRef<string[] | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: '' }));
  }

  function handleFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list).slice(0, MAX_FILES);
    const valid: File[] = [];
    let msg = '';
    for (const f of incoming) {
      if (!f.type.startsWith('image/')) {
        msg = 'Solo se permiten imágenes.';
        continue;
      }
      if (f.size > MAX_FILE_SIZE) {
        msg = 'Cada imagen debe pesar menos de 5MB.';
        continue;
      }
      valid.push(f);
    }
    setFiles((prev) => {
      const merged = [...prev, ...valid].slice(0, MAX_FILES);
      return merged;
    });
    setFileError(msg);
  }

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;

    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus('submitting');
    setErrorMsg('');

    try {
      if (!isSupabaseConfigured()) {
        throw new Error('La base de datos aún no está configurada. Mira las instrucciones para conectarla.');
      }

      let photoUrls = savedPhotoUrls.current;

      if (photoUrls === null) {
        // Subir fotos de referencia al bucket
        photoUrls = [];
        for (const file of files) {
          const ext = file.name.split('.').pop() ?? 'jpg';
          const path = `quotes/${crypto.randomUUID()}.${ext}`;
          const { error: upErr } = await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(path, file, { upsert: false });
          if (upErr) throw new Error(`No se pudo subir la imagen: ${upErr.message}`);
          const { data: pub } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
          photoUrls.push(pub.publicUrl);
        }

        // Guardar la solicitud en la tabla quotes
        const { error: insertErr } = await supabase.from('quotes').insert({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || null,
          service: form.service,
          description: form.description.trim(),
          locality: form.locality.trim() || null,
          photo_urls: photoUrls,
        });

        if (insertErr) throw new Error(`No se pudo guardar la solicitud: ${insertErr.message}`);
        savedPhotoUrls.current = photoUrls;
      }

      // Enviar el aviso por correo con Formspree
      let sent = false;
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: `Nueva solicitud de presupuesto — ${form.service}`,
            name: form.name.trim(),
            phone: form.phone.trim(),
            service: form.service,
            locality: form.locality.trim(),
            description: form.description.trim(),
            photos: photoUrls.join('\n'),
            ...(form.email.trim() ? { email: form.email.trim() } : {}),
          }),
        });
        sent = res.ok;
      } catch {
        sent = false;
      }

      if (!sent) {
        throw new Error(
          'Hemos guardado tu solicitud, pero no hemos podido enviar el aviso por correo. Pulsa "Enviar solicitud de presupuesto" para reintentarlo o contáctanos por teléfono o WhatsApp.',
        );
      }

      savedPhotoUrls.current = null;
      setStatus('success');
      setForm({ name: '', phone: '', service: '', description: '', email: '', locality: '' });
      setFiles([]);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Error inesperado. Inténtalo de nuevo.');
    }
  }

  if (status === 'success') {
    return (
      <div className={`rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center ${compact ? '' : 'shadow-card'}`}>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-display text-2xl text-ink-900">¡Solicitud enviada!</h3>
        <p className="mt-2 text-ink-600">
          Gracias por contactar con Reformas N&amp;N. Te responderemos lo antes posible.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="btn-outline mt-6"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`space-y-5 ${compact ? '' : 'rounded-2xl bg-white p-6 shadow-card sm:p-8'}`}>
      {status === 'error' && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="qf-name">Nombre *</label>
          <input
            id="qf-name"
            type="text"
            className="input"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label className="label" htmlFor="qf-phone">Teléfono *</label>
          <input
            id="qf-phone"
            type="tel"
            className="input"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="qf-service">Servicio *</label>
          <select
            id="qf-service"
            className="input"
            value={form.service}
            onChange={(e) => update('service', e.target.value)}
            aria-invalid={Boolean(errors.service)}
          >
            <option value="">Selecciona un servicio</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
            <option value="Otro">Otro / No estoy seguro</option>
          </select>
          {errors.service && <p className="mt-1 text-xs text-red-600">{errors.service}</p>}
        </div>
        <div>
          <label className="label" htmlFor="qf-locality">Localidad</label>
          <input
            id="qf-locality"
            type="text"
            className="input"
            value={form.locality}
            onChange={(e) => update('locality', e.target.value)}
            placeholder="Opcional"
          />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="qf-email">Correo electrónico</label>
        <input
          id="qf-email"
          type="email"
          className="input"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="Opcional"
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label className="label" htmlFor="qf-description">Descripción de la reforma *</label>
        <textarea
          id="qf-description"
          className="input min-h-[120px] resize-y"
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          aria-invalid={Boolean(errors.description)}
          placeholder="Cuéntanos qué quieres reformar, el estado actual, los metros aproximados…"
        />
        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
      </div>

      <div>
        <label className="label">Fotografías de referencia (opcional)</label>
        <div className="flex flex-wrap items-center gap-3">
          <label className="btn-outline cursor-pointer">
            <Upload className="h-4 w-4" /> Añadir imágenes
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>
          <span className="text-xs text-ink-500">Máximo {MAX_FILES} imágenes · 5MB cada una</span>
        </div>
        {fileError && <p className="mt-2 text-xs text-red-600">{fileError}</p>}
        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((f, i) => (
              <li key={i} className="flex items-center justify-between rounded-lg bg-ink-100 px-3 py-2 text-sm">
                <span className="truncate text-ink-700">{f.name}</span>
                <button type="button" onClick={() => removeFile(i)} className="text-ink-500 hover:text-red-600" aria-label="Quitar">
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" className="btn-primary w-full" disabled={status === 'submitting'}>
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
          </>
        ) : (
          'Enviar solicitud de presupuesto'
        )}
      </button>

      <p className="text-center text-xs text-ink-400">
        Al enviar aceptas que tratemos tus datos según nuestra{' '}
        política de privacidad. No los compartiremos con terceros.
      </p>
    </form>
  );
}

}
