import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, MessageCircle, Phone, Check } from 'lucide-react';
import { SERVICES, getServiceBySlug, whatsappLink, telLink, COMPANY } from '@/lib/constants';
import { serviceImage } from '@/lib/images';
import { useSeo } from '@/lib/useSeo';
import { Reveal } from '@/components/Reveal';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  useSeo({
    title: service?.metaTitle ?? 'Servicio | Reformas N&N',
    description: service?.metaDescription,
    canonicalPath: service ? `/servicios/${service.slug}` : undefined,
    structuredData: service
      ? {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.name,
          description: service.description,
          provider: { '@type': 'LocalBusiness', name: 'Reformas N&N' },
          areaServed: 'Valencia y alrededores',
        }
      : undefined,
  });

  if (!service) return <Navigate to="/servicios" replace />;

  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 6);
  const faqStructured = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900">
        <img
          src={serviceImage(service.slug)}
          alt={service.name}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-900/80 to-ink-900/50" />
        <div className="container-app relative z-10 py-20 md:py-28">
          <Reveal>
            <Link to="/servicios" className="inline-flex items-center gap-1 text-sm text-teal-300 hover:text-teal-200">
              <ArrowLeft className="h-4 w-4" /> Servicios
            </Link>
            <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl md:text-6xl text-balance">
              {service.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-200">{service.short}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/contacto" className="btn-primary">
                Solicitar presupuesto <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a href={telLink()} className="btn-outline border-white/30 bg-white/10 text-white hover:bg-white/20">
                <Phone className="h-4 w-4" /> {COMPANY.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Descripción */}
      <section className="bg-ink-50 py-20 md:py-28">
        <div className="container-app">
          <div className="grid gap-12 md:grid-cols-3">
            <Reveal className="md:col-span-2">
              <span className="section-eyebrow">En qué consiste</span>
              <h2 className="section-title mt-4">Descripción del servicio</h2>
              <p className="mt-6 leading-relaxed text-ink-600">{service.description}</p>
              <p className="mt-4 leading-relaxed text-ink-600">{service.longDescription}</p>
            </Reveal>
            <Reveal delay={150}>
              <div className="rounded-2xl overflow-hidden shadow-lift">
                <img
                  src={serviceImage(service.slug)}
                  alt={service.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-app">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow justify-center">Ventajas</span>
            <h2 className="section-title mt-4">Por qué elegir este servicio</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((b, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="card h-full p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm text-ink-600">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ink-50 py-20 md:py-28">
        <div className="container-app">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow justify-center">Preguntas frecuentes</span>
            <h2 className="section-title mt-4">Dudas habituales</h2>
          </Reveal>
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {service.faq.map((f, i) => (
              <Reveal key={i} delay={i * 60}>
                <details className="group rounded-2xl border border-ink-100 bg-white p-6 [&_summary]:cursor-pointer">
                  <summary className="flex items-center justify-between font-display text-lg text-ink-900">
                    {f.q}
                    <span className="ml-4 text-teal-600 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-ink-600 leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
          {/* Datos estructurados FAQ (sin render) */}
          <script type="application/ld+json">{JSON.stringify(faqStructured)}</script>
        </div>
      </section>

      {/* Otros servicios */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-app">
          <Reveal>
            <h2 className="section-title">Otros servicios</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <Link to={`/servicios/${s.slug}`} className="group block h-full">
                  <article className="card h-full overflow-hidden hover:-translate-y-1 hover:shadow-lift">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={serviceImage(s.slug)}
                        alt={s.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg text-ink-900">{s.name}</h3>
                      <p className="mt-2 text-sm text-ink-500">{s.short}</p>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
