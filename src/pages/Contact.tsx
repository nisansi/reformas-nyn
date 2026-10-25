import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { COMPANY, whatsappLink, telLink, mailLink } from '@/lib/constants';
import { useSeo } from '@/lib/useSeo';
import { Reveal } from '@/components/Reveal';
import { QuoteForm } from '@/components/QuoteForm';

export default function Contact() {
  useSeo({
    title: 'Contacto y presupuesto | Reformas N&N',
    description:
      'Contacta con Reformas N&N para solicitar tu presupuesto gratis y sin compromiso. Reformas en Valencia y alrededores con más de 25 años de experiencia.',
    canonicalPath: '/contacto',
  });

  return (
    <div className="pt-16 md:pt-20">
      <section className="bg-ink-900 py-20 text-center text-white md:py-28">
        <div className="container-app">
          <Reveal>
            <span className="section-eyebrow text-teal-300 justify-center">Contacto</span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-balance">
              Pide tu presupuesto gratis
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-ink-200">
              Cuéntanos tu proyecto y te responderemos lo antes posible. También puedes
              contactarnos directamente por teléfono o WhatsApp.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink-50 py-20 md:py-28">
        <div className="container-app">
          <div className="grid gap-10 lg:grid-cols-5">
            <Reveal className="lg:col-span-2">
              <h2 className="section-title">Datos de contacto</h2>
              <p className="mt-4 text-ink-500">
                Reformas N&amp;N atiende en {COMPANY.workArea}. Estaremos encantados de ayudarte
                con tu reforma.
              </p>
              <ul className="mt-8 space-y-4">
                <li>
                  <a href={telLink()} className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-soft hover:shadow-card transition-shadow">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700"><Phone className="h-5 w-5" /></span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-ink-400">Teléfono</span>
                      <span className="font-medium text-ink-900">{COMPANY.phone}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-soft hover:shadow-card transition-shadow">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700"><MessageCircle className="h-5 w-5" /></span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-ink-400">WhatsApp</span>
                      <span className="font-medium text-ink-900">{COMPANY.phone}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={mailLink('Solicitud de presupuesto')} className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-soft hover:shadow-card transition-shadow">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700"><Mail className="h-5 w-5" /></span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-ink-400">Correo</span>
                      <span className="break-all font-medium text-ink-900">{COMPANY.email}</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-soft">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700"><MapPin className="h-5 w-5" /></span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-ink-400">Zona de trabajo</span>
                    <span className="font-medium text-ink-900">{COMPANY.workArea}</span>
                  </span>
                </li>
              </ul>
            </Reveal>

            <Reveal className="lg:col-span-3" delay={150}>
              <h2 className="section-title">Formulario de presupuesto</h2>
              <p className="mt-4 text-ink-500">
                Rellena el formulario y te enviaremos un presupuesto sin compromiso. Los campos con
                * son obligatorios.
              </p>
              <div className="mt-6">
                <QuoteForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
