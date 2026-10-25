import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import { IMAGES } from '@/lib/images';
import { useSeo } from '@/lib/useSeo';
import { Reveal } from '@/components/Reveal';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Servicios de Reformas N&N',
  itemListElement: SERVICES.map((s) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: s.name, description: s.short },
  })),
};

export default function Services() {
  useSeo({
    title: 'Servicios de reformas en Valencia | Reformas N&N',
    description:
      'Todos los servicios de reformas en Valencia: reformas integrales, baños, cocinas, albañilería, fontanería, electricidad, pintura, suelos, pladur, carpintería e impermeabilización. Presupuesto gratis.',
    canonicalPath: '/servicios',
    structuredData,
  });

  return (
    <div className="pt-16 md:pt-20">
      <section className="bg-ink-900 py-20 text-center text-white md:py-28">
        <div className="container-app">
          <Reveal>
            <span className="section-eyebrow text-teal-300 justify-center">Nuestros servicios</span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-balance">
              Reformas completas en Valencia y alrededores
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-ink-200">
              Cubrimos todas las disciplinas que necesitas para reformar tu vivienda o local.
              Pide tu presupuesto gratis y sin compromiso.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink-50 py-20 md:py-28">
        <div className="container-app">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 80}>
                <Link to={`/servicios/${s.slug}`} className="group block h-full">
                  <article className="card h-full overflow-hidden hover:-translate-y-1 hover:shadow-lift">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={IMAGES.services[s.slug]}
                        alt={s.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex h-full flex-col p-6">
                      <h2 className="font-display text-xl text-ink-900">{s.name}</h2>
                      <p className="mt-2 flex-1 text-sm text-ink-500">{s.short}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700">
                        Ver servicio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
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
