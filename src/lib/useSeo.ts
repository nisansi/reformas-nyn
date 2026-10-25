import { useEffect } from 'react';

interface SeoOptions {
  title: string;
  description?: string;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: Record<string, unknown>;
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Hook para actualizar los metadatos SEO por página en una SPA.
 * Ajusta title, description, canonical, Open Graph y datos estructurados.
 */
export function useSeo({ title, description, canonicalPath, ogType = 'website', ogImage, structuredData }: SeoOptions) {
  useEffect(() => {
    document.title = title;
    if (description) setMeta('description', description);
    if (canonicalPath) {
      const base = 'https://reformasnyn.es';
      setLink('canonical', `${base}${canonicalPath}`);
      setMeta('og:url', `${base}${canonicalPath}`, 'property');
    }
    setMeta('og:title', title, 'property');
    if (description) setMeta('og:description', description, 'property');
    setMeta('og:type', ogType, 'property');
    if (ogImage) setMeta('og:image', ogImage, 'property');

    // Datos estructurados (JSON-LD)
    const existing = document.getElementById('page-structured-data');
    if (existing) existing.remove();
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'page-structured-data';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, canonicalPath, ogType, ogImage, structuredData]);
}
