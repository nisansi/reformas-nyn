import { useEffect, useRef } from 'react';

/**
 * Hook para revelar elementos al hacer scroll usando IntersectionObserver.
 * Añade la clase `is-visible` al elemento cuando entra en el viewport.
 * Respeta prefers-reduced-motion (la transición CSS se anula vía media query).
 *
 * Uso:
 *   const ref = useReveal<HTMLDivElement>();
 *   <div ref={ref} className="reveal">...</div>
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Si el navegador no soporta IntersectionObserver, mostramos el elemento.
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
