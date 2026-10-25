import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { COMPANY, NAV_LINKS, whatsappLink } from '@/lib/constants';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 font-display text-sm font-bold text-white transition-transform group-hover:scale-105 md:h-10 md:w-10 md:text-base">
              N&amp;N
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-ink-900 md:text-xl">
              Reformas N&amp;N
            </span>
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

      {/* Menú móvil */}
      <div
        className={`md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        } transition-opacity duration-300`}
      >
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
    </header>
  );
}
