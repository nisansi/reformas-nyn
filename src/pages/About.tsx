import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, ClipboardList, Wrench, Users } from 'lucide-react';
import { COMPANY, SERVICES } from '@/lib/constants';
import { IMAGES } from '@/lib/images';
import { useSeo } from '@/lib/useSeo';
import { Reveal } from '@/components/Reveal';

export default function About() {
  useSeo({
    title: 'Nosotros | Reformas N&N — Reformas en Valencia con +25 años de experiencia',
    description:
      'Reformas N&N: más de 25 años de experiencia en reformas en Valencia y alrededores. Trabajamos para particulares, empresas, viviendas y locales comerciales.',
    canonicalPath: '/nosotros',
  });

  const values = [
    { icon: ShieldCheck, title: 'Experiencia', text: `Más de ${COMPANY.experienceYears} años realizando reformas en ${COMPANY.workArea}.` },
    { icon: Wrench, title: 'Servicio completo', text: 'Cubrimos todas las disciplinas necesarias en una reforma.' },
    { icon: ClipboardList, title: 'Presupuesto sin compromiso', text: 'Estudiamos tu proyecto y te damos un presupuesto gratuito.' },
    { icon: Users, title: 'Para todos', text: 'Particulares, empresas, viviendas y locales comerciales.' },
  ];

  return (
    <div className="pt-16 md:pt-20">
      <section className="relative overflow-hidden bg-ink-900 py-20 md:py-28">
        <img src={IMAGES.presentation} alt={IMAGES.presentationAlt} className="absolute inset-0 h-full w-full object-cover opacity-30" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 to-ink-900/50" />
        <div className="container-app relative z-10">
          <Reveal className="max-w-2xl">
            <span className="section-eyebrow text-teal-300">Nosotros</span>
            <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl md:text-6xl text-balance">
              Reformas N&amp;N, experiencia que se nota
            </h1>
            <p className="mt-6 text-lg text-ink-200">
              Más de {COMPANY.experienceYears} años realizando reformas en {COMPANY.workArea} para
              particulares, empresas y propietarios de viviendas y locales comerciales.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink-50 py-20 md:py-28">
        <div className="container-app">
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <h2 className="section-title">Quiénes somos</h2>
              <div className="mt-6 space-y-4 leading-relaxed text-ink-600">
                <p>
                  En Reformas N&amp;N llevamos más de {COMPANY.experienceYears} años trabajando en
                  reformas en {COMPANY.workArea}. Nuestra actividad abarca desde reformas
                  integrales de viviendas hasta intervenciones puntuales en baños, cocinas,
                  instalaciones y acabados.
                </p>
                <p>
                  Coordinamos todos los oficios necesarios en una reforma para que el proceso sea
                  ordenado y el resultado responda a lo que esperas. Trabajamos con materiales de
                  calidad y prestamos atención a los detalles que marcan la diferencia en el
                  acabado final.
                </p>
                <p>
                  Atendemos a particulares y a propietarios de viviendas y locales comerciales. Si
                  tienes un proyecto en mente, te ofrecemos un presupuesto gratuito y sin
                  compromiso.
                </p>
              </div>
              <Link to="/contacto" className="btn-primary mt-8">
                Solicitar presupuesto <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <Reveal delay={150}>
              <div className="grid grid-cols-2 gap-4">
                {SERVICES.slice(0, 6).map((s) => (
                  <Link
                    key={s.slug}
                    to={`/servicios/${s.slug}`}
                    className="card flex items-center gap-3 p-4 hover:-translate-y-1 hover:shadow-lift"
                  >
                    <Wrench className="h-5 w-5 text-teal-600" />
                    <span className="text-sm font-medium text-ink-800">{s.name}</span>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-app">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow justify-center">Lo que nos define</span>
            <h2 className="section-title mt-4">Nuestra forma de trabajar</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="card h-full p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg text-ink-900">{v.title}</h3>
                  <p className="mt-2 text-sm text-ink-500">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
