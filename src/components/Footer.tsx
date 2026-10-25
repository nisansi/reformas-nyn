import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { COMPANY, NAV_LINKS, SERVICES, whatsappLink, mailLink } from '@/lib/constants';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className="container-app py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Marca */}
          <div className="md:col-span-1">
            <img
              src="/logo-reformas-nyn.jpg"
              alt="Reformas N&N"
              width={1142}
              height={861}
              className="h-auto w-56 max-w-full rounded-lg bg-white"
            />
            <p className="mt-4 text-sm leading-relaxed text-ink-400">
              Más de {COMPANY.experienceYears} años de experiencia en reformas en {COMPANY.workArea}.
              Presupuesto gratis y sin compromiso.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-200">Navegación</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-ink-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-200">Servicios</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link to={`/servicios/${s.slug}`} className="text-ink-400 transition-colors hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/servicios" className="text-teal-400 transition-colors hover:text-teal-300">
                  Ver todos los servicios
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-200">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`tel:${COMPANY.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-ink-400 hover:text-white">
                  <Phone className="h-4 w-4 text-teal-400" />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-ink-400 hover:text-white">
                  <MessageCircle className="h-4 w-4 text-teal-400" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={mailLink('Solicitud de presupuesto')} className="flex items-center gap-2 break-all text-ink-400 hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-teal-400" />
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-ink-400">
                <MapPin className="h-4 w-4 text-teal-400" />
                {COMPANY.workArea}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink-800 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Reformas N&amp;N. Todos los derechos reservados.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link to="/aviso-legal" className="hover:text-ink-200">Aviso legal</Link>
            <Link to="/privacidad" className="hover:text-ink-200">Privacidad</Link>
            <Link to="/cookies" className="hover:text-ink-200">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
