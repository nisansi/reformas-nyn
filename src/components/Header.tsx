import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { COMPANY, NAV_LINKS, whatsappLink } from '@/lib/constants';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Cierra el menú móvil al cambiar de ruta (enlaces, botón atrás/adelante)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Cierra el menú móvil si la pantalla pasa a tamaño escritorio
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloquea el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-ink-50/90 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="container-app">
        <nav className="flex h-16 items-center justify-between md:h-20" aria-label="Navegación principal">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2"
            onClick={() => setOpen(false)}
            aria-label="Reformas N&N — Inicio"
          >
            <img
              src="/logo-reformas-nyn.jpg"
              alt="Reformas N&N"
              width={1142}
              height={861}
              className="h-14 w-auto md:h-16"
            />
          </Link>

          {/* Navegación escritorio */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-teal-700' : 'text-ink-700 hover:text-ink-900 hover:bg-ink-100/70'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* CTA escritorio */}
          <div className="hidden items-center gap-2 md:flex">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              aria-label="Contactar por WhatsApp"
            >
              WhatsApp
            </a>
            <Link to="/contacto" className="btn-primary">
              Solicitar presupuesto
            </Link>
          </div>

          {/* Botón móvil */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-800 transition-colors hover:bg-ink-100 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Menú móvil: solo se monta cuando está abierto, para que no ocupe espacio dentro del header fijo */}
      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto md:hidden">
        <div className="container-app pb-6">
          <div className="card animate-fade-up p-4">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive ? 'bg-teal-50 text-teal-700' : 'text-ink-800 hover:bg-ink-100'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2 border-t border-ink-100 pt-4">
              <Link
                to="/contacto"
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                Solicitar presupuesto
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full"
              >
                WhatsApp
              </a>
              <a href={`tel:${COMPANY.phone.replace(/\s+/g, '')}`} className="btn-ghost w-full">
                <Phone className="h-4 w-4" /> {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
        </div>
      )}
    </header>
  );
}
  );
}
