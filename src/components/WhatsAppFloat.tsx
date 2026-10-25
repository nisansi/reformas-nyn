import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/constants';

/** Botón flotante de WhatsApp visible en todas las páginas. */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white shadow-lift transition-all duration-300 hover:bg-teal-700 hover:scale-105 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <span className="absolute inset-0 rounded-full bg-teal-500 opacity-50 animate-ping" aria-hidden="true" />
      <MessageCircle className="relative h-7 w-7" />
    </a>
  );
}
