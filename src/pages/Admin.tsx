import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/lib/auth';
import AdminLogin from './admin/AdminLogin';
import AdminProjects from './admin/AdminProjects';
import AdminQuotes from './admin/AdminQuotes';
import { Loader2, Mail, FolderClosed } from 'lucide-react';

function AdminShell() {
  const { session, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-50">
        <Loader2 className="h-8 w-8 animate-spin text-teal-700" />
      </div>
    );
  }

  if (!session || !isAdmin) {
    return <AdminLogin />;
  }

  // Ruta /admin o /admin/ → redirige a proyectos
  if (location.pathname === '/admin' || location.pathname === '/admin/') {
    return <Navigate to="/admin/proyectos" replace />;
  }

  return (
    <div className="min-h-screen bg-ink-50">
      <nav className="border-b border-ink-100 bg-white">
        <div className="container-app flex h-12 items-center gap-2">
          <Link to="/admin/proyectos" className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-ink-700 hover:text-teal-700">
            <FolderClosed className="h-4 w-4" /> Proyectos
          </Link>
          <Link to="/admin/solicitudes" className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-ink-700 hover:text-teal-700">
            <Mail className="h-4 w-4" /> Solicitudes
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="proyectos" element={<AdminProjects />} />
        <Route path="solicitudes" element={<AdminQuotes />} />
        <Route path="*" element={<Navigate to="/admin/proyectos" replace />} />
      </Routes>
    </div>
  );
}

export default function Admin() {
  return (
    <AuthProvider>
      <AdminShell />
    </AuthProvider>
  );
}
