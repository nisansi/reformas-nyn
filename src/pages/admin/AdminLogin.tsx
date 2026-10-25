import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Loader2, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function AdminLogin() {
  const { session, isAdmin, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-50">
        <Loader2 className="h-8 w-8 animate-spin text-teal-700" />
      </div>
    );
  }

  if (session && isAdmin) return <Navigate to="/admin/proyectos" replace />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    const { error } = await signIn(username.trim(), password);
    setSubmitting(false);
    if (error) {
      setError(error);
    } else {
      navigate('/admin/proyectos');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lift">
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-700 font-display text-base font-bold text-white">N&amp;N</span>
          <div>
            <h1 className="font-display text-xl text-ink-900">Panel de administración</h1>
            <p className="text-xs text-ink-500">Reformas N&amp;N</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <div>
            <label className="label" htmlFor="ad-user">Nombre de usuario</label>
            <input
              id="ad-user"
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              placeholder="Neizan Galvez"
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="ad-pass">Contraseña</label>
            <input
              id="ad-pass"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-ink-400">
          Acceso restringido al propietario. Si no tienes cuenta, consulta las instrucciones para
          crear el primer administrador.
        </p>
      </div>
    </div>
  );
}
