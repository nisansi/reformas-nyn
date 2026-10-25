import { type ReactNode } from 'react';
import { useReveal } from '@/lib/useReveal';

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li' | 'header' | 'figure';
  delay?: number;
}

/** Envoltorio que aplica la animación de aparición al hacer scroll. */
export function Reveal({ children, className = '', as = 'div', delay = 0 }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  const Tag = as as 'div';
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
