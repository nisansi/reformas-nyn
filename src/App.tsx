import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import ServiceDetail from '@/pages/ServiceDetail';
import Gallery from '@/pages/Gallery';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Legal from '@/pages/Legal';
import Privacy from '@/pages/Privacy';
import Cookies from '@/pages/Cookies';
import NotFound from '@/pages/NotFound';
import Admin from '@/pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* El panel de administración se renderiza sin el layout público */}
        <Route path="/admin/*" element={<Admin />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/servicios/:slug" element={<ServiceDetail />} />
          <Route path="/proyectos" element={<Gallery />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/aviso-legal" element={<Legal />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
