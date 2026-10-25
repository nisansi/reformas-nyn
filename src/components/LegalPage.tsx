import { type ReactNode } from 'react';
import { useSeo } from '@/lib/useSeo';
import { Reveal } from '@/components/Reveal';

interface LegalPageProps {
  title: string;
  description: string;
  path: string;
  children: ReactNode;
}

export function LegalPage({ title, description, path, children }: LegalPageProps) {
  useSeo({ title, description, canonicalPath: path });
  return (
    <div className="pt-16 md:pt-20">
      <section className="bg-ink-900 py-16 text-center text-white md:py-20">
        <div className="container-app">
          <Reveal>
            <span className="section-eyebrow text-teal-300 justify-center">Información legal</span>
            <h1 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl">{title}</h1>
          </Reveal>
        </div>
      </section>
      <section className="bg-ink-50 py-16 md:py-20">
        <div className="container-app">
          <Reveal className="prose-muted mx-auto max-w-3xl space-y-4 leading-relaxed text-ink-600">
            {children}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
