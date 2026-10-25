import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppFloat } from './WhatsAppFloat';
import { ScrollToTop } from './ScrollToTop';

export function Layout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">{children ?? <Outlet />}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
