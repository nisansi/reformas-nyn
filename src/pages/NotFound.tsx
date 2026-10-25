import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useSeo } from '@/lib/useSeo';
import { Reveal } from '@/components/Reveal';

export default function NotFound() {
  useSeo({
    title: 'Página no encontrada | Reformas N&N',
    description: 'La página que buscas no existe o se ha movido.',
    canonicalPath: '/404',
  });
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 px-4">
      <Reveal className="text-center">
        <p className="font-display text-7xl text-teal-700 md:text-9xl">404</p>
        <h1 className="mt-4 font-display text-2xl text-ink-900 md:text-3xl">Página no encontrada</h1>
        <p className="mx-auto mt-3 max-w-md text-ink-500">
          La página que buscas no existe o se ha movido. Vuelve al inicio para seguir navegando.
        </p>
        <Link to="/" className="btn-primary mt-8">
          <Home className="h-4 w-4" /> Volver al inicio
        </Link>
      </Reveal>
    </div>
  );
}
