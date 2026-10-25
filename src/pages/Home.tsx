import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, ShieldCheck, ClipboardList, Wrench, Users } from 'lucide-react';
import { COMPANY, SERVICES, whatsappLink, telLink } from '@/lib/constants';
import { IMAGES } from '@/lib/images';
import { useSeo } from '@/lib/useSeo';
import { usePublishedProjects } from '@/lib/useProjects';
import type { Project, ProjectImage } from '@/lib/types';
import { Reveal } from '@/components/Reveal';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Reformas N&N',
  description: 'Empresa de reformas en Valencia con más de 25 años de experiencia.',
  telephone: '+34619453412',
  email: 'Reformasnyn@hotmail.com',
  areaServed: 'Valencia y alrededores',
  url: 'https://reformasnyn.es',
};

const STEPS = [
  { n: '01', title: 'Contacto y proyecto', text: 'Nos cuentas qué necesitas reformar y cómo imaginas el resultado.' },
  { n: '02', title: 'Estudio de necesidades', text: 'Analizamos el espacio y las intervenciones necesarias para tu reforma.' },
  { n: '03', title: 'Presupuesto sin compromiso', text: 'Preparamos un presupuesto detallado y claro, sin coste para ti.' },
  { n: '04', title: 'Ejecución coordinada', text: 'Realizamos la obra coordinando todos los oficios con cuidado.' },
];

export default function Home() {
  useSeo({
    title: 'Reformas N&N | Reformas en Valencia con más de 25 años de experiencia',
    description:
      'Reformas N&N: empresa de reformas en Valencia y alrededores con más de 25 años de experiencia. Reformas integrales, baños, cocinas, albañilería, fontanería, electricidad y más. Presupuesto gratis y sin compromiso.',
    canonicalPath: '/',
    structuredData,
  });

  const { projects, loading, error } = usePublishedProjects();

  return (
    <>
      <Hero />
      <Presentation />
      <FeaturedServices />
      <ProjectsPreview projects={projects} loading={loading} error={error} />
      <WhyUs />
      <Process />
      <Reviews />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-ink-900">
      <img
        src={IMAGES.hero}
        alt={IMAGES.heroAlt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ink-950/85 via-ink-900/70 to-ink-900/40" />
      <div className="container-app relative z-10 py-24">
        <div className="max-w-2xl">
          <Reveal>
            <span className="section-eyebrow text-teal-300">Reformas en Valencia · +25 años</span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 font-display text-4xl leading-tight text-white text-balance sm:text-5xl md:text-6xl">
              Transformamos espacios. Construimos confianza.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200">
              Más de 25 años de experiencia en reformas en Valencia y alrededores. Cuéntanos tu
              proyecto y solicita tu presupuesto sin compromiso.
            </p>
          </Reveal>
          <Reveal delay={300}>
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
                <MessageCircle className="h-4 w-4" /> Contactar por WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Presentation() {
  return (
    <section className="bg-ink-50 py-20 md:py-28">
      <div className="container-app">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <span className="section-eyebrow">Quiénes somos</span>
            <h2 className="section-title mt-4">
              Más de 25 años reformando espacios en Valencia
            </h2>
            <div className="mt-6 space-y-4 text-ink-600 leading-relaxed">
              <p>
                En Reformas N&amp;N llevamos más de {COMPANY.experienceYears} años realizando
                reformas para particulares, empresas y propietarios de viviendas y locales
                comerciales en {COMPANY.workArea}.
              </p>
              <p>
                Trabajamos todas las disciplinas necesarias en una reforma: albañilería,
                fontanería, electricidad, pintura, alicatados, pladur, carpintería e
                impermeabilización. Coordinamos cada fase para que el proceso sea ordenado y
                el resultado responda a lo que esperas.
              </p>
              <p>
                Si tienes un proyecto en mente, te ofrecemos un presupuesto gratuito y sin
                compromiso. Nos adaptamos a tus necesidades y a tu forma de vivir el espacio.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/nosotros" className="btn-secondary">
                Conócenos
              </Link>
              <Link to="/servicios" className="btn-ghost">
                Ver servicios
              </Link>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="overflow-hidden rounded-2xl shadow-lift">
              <img
                src={IMAGES.presentation}
                alt={IMAGES.presentationAlt}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeaturedServices() {
  const featured = SERVICES.slice(0, 6);
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-app">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow justify-center">Servicios destacados</span>
          <h2 className="section-title mt-4">Soluciones para cada reforma</h2>
          <p className="mt-4 text-ink-500">
            Desde una reforma integral hasta una intervención puntual: cubrimos todas las
            disciplinas que necesitas.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80}>
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
                  <div className="p-6">
                    <h3 className="font-display text-xl text-ink-900">{s.name}</h3>
                    <p className="mt-2 text-sm text-ink-500">{s.short}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700">
                      Ver servicio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link to="/servicios" className="btn-secondary">
            Ver todos los servicios <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectsPreview({
  projects,
  loading,
  error,
}: {
  projects: (Project & { images: ProjectImage[] })[];
  loading: boolean;
  error: string | null;
}) {
  const hasProjects = projects.length > 0;
  const preview = projects.slice(0, 4);

  return (
    <section className="bg-ink-100/60 py-20 md:py-28">
      <div className="container-app">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="section-eyebrow">Proyectos</span>
            <h2 className="section-title mt-4">Algunos de nuestros trabajos</h2>
          </div>
          <Link to="/proyectos" className="btn-ghost">
            Ver galería <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        {loading ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-2xl bg-ink-200/60" />
            ))}
          </div>
        ) : hasProjects ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {preview.map((p, i) => {
              const cover = p.images?.[0]?.url ?? IMAGES.gallery[0];
              return (
                <Reveal key={p.id} delay={i * 80}>
                  <Link to="/proyectos" className="group block overflow-hidden rounded-2xl shadow-card hover:shadow-lift">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={cover}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                        {p.category?.name ?? 'Reforma'}
                      </p>
                      <h3 className="mt-1 font-display text-lg text-ink-900">{p.title}</h3>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <Reveal className="mt-12">
            <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-10 text-center">
              <Wrench className="mx-auto h-10 w-10 text-ink-300" />
              <p className="mt-4 text-ink-500">
                {error === 'storage-no-configurado'
                  ? 'La galería se alimentará desde el panel de administración en cuanto se configure la base de datos.'
                  : 'En breve subiremos nuestros proyectos a la galería. Mientras tanto, pídenos tu presupuesto sin compromiso.'}
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    {
      icon: ShieldCheck,
      title: 'Más de 25 años de experiencia',
      text: 'Una trayectoria de décadas en reformas en Valencia y alrededores.',
    },
    {
      icon: Wrench,
      title: 'Variedad de servicios',
      text: 'Cubrimos albañilería, fontanería, electricidad, pintura, alicatados y más.',
    },
    {
      icon: ClipboardList,
      title: 'Presupuesto gratis',
      text: 'Estudiamos tu proyecto y te enviamos un presupuesto sin compromiso.',
    },
    {
      icon: Users,
      title: 'Para todos los clientes',
      text: 'Particulares, empresas, propietarios de viviendas y locales comerciales.',
    },
  ];
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-app">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow justify-center">Por qué elegirnos</span>
          <h2 className="section-title mt-4">Razones para confiar en Reformas N&amp;N</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 80}>
              <div className="card h-full p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <it.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg text-ink-900">{it.title}</h3>
                <p className="mt-2 text-sm text-ink-500">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="bg-ink-50 py-20 md:py-28">
      <div className="container-app">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow justify-center">Proceso de trabajo</span>
          <h2 className="section-title mt-4">Cómo trabajamos</h2>
          <p className="mt-4 text-ink-500">
            Un proceso sencillo y claro, pensado para que sepas en todo momento en qué punto está
            tu proyecto. Los plazos concretos se acuerdan según cada reforma.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="relative h-full rounded-2xl border border-ink-100 bg-white p-6">
                <span className="font-display text-3xl text-teal-600">{s.n}</span>
                <h3 className="mt-3 font-display text-lg text-ink-900">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-500">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  // Estado vacío elegante: la sección se alimenta desde el panel cuando el
  // propietario añada opiniones reales. No se inventan reseñas.
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-app">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow justify-center">Opiniones</span>
          <h2 className="section-title mt-4">Lo que dicen nuestros clientes</h2>
        </Reveal>
        <Reveal className="mt-12">
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-ink-200 bg-ink-50 p-10 text-center">
            <p className="text-ink-500">
              Próximamente publicaremos opiniones reales de nuestros clientes. Si ya has trabajado
              con nosotros, estaremos encantados de compartir tu experiencia.
            </p>
            <Link to="/contacto" className="btn-primary mt-6">
              Contar mi experiencia
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-20 md:py-28">
      <img src={IMAGES.cta} alt={IMAGES.ctaAlt} className="absolute inset-0 h-full w-full object-cover opacity-30" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 to-ink-900/60" />
      <div className="container-app relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-white sm:text-4xl md:text-5xl text-balance">
            ¿Tienes una reforma en mente?
          </h2>
          <p className="mt-4 text-ink-200">
            Pide tu presupuesto gratis y sin compromiso. Te respondemos lo antes posible.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/contacto" className="btn-primary">
              Solicitar presupuesto <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={telLink()} className="btn-outline border-white/30 bg-white/10 text-white hover:bg-white/20">
              {COMPANY.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
