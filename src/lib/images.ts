// Mapa central de imágenes placeholder (fotografías profesionales).
// Estas son fotos de stock para ilustrar la web. NO son trabajos de Reformas N&N.
// Para sustituirlas por fotos reales de la empresa, el propietario puede subirlas
// desde el panel de administración; las imágenes del panel reemplazan estas
// placeholders en la galería y proyectos.

export const IMAGES = {
  hero: 'https://images.pexels.com/photos/8146144/pexels-photo-8146144.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  heroAlt: 'Salón moderno y luminoso con suelo de madera y cocina abierta tras una reforma integral',
  presentation: 'https://images.pexels.com/photos/7533848/pexels-photo-7533848.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  presentationAlt: 'Interior reformado con sofá y zona de comedor, suelo de madera y paredes blancas',
  cta: 'https://images.pexels.com/photos/8146336/pexels-photo-8146336.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ctaAlt: 'Vivienda reformada y amueblada con grandes ventanales y suelo de madera',

  // Imágenes por servicio (slug → url)
  services: {
    'reformas-integrales': 'https://images.pexels.com/photos/8146144/pexels-photo-8146144.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'reformas-de-banos': 'https://images.pexels.com/photos/35868664/pexels-photo-35868664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'reformas-de-cocinas': 'https://images.pexels.com/photos/6510984/pexels-photo-6510984.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'albanileria': 'https://images.pexels.com/photos/19688828/pexels-photo-19688828.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'fontaneria': 'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'electricidad': 'https://images.pexels.com/photos/28950842/pexels-photo-28950842.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'pintura': 'https://images.pexels.com/photos/5583116/pexels-photo-5583116.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'suelos-y-alicatados': 'https://images.pexels.com/photos/11806490/pexels-photo-11806490.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'pladur-y-techos': 'https://images.pexels.com/photos/4981812/pexels-photo-4981812.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'carpinteria-y-puertas': 'https://images.pexels.com/photos/11051736/pexels-photo-11051736.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'impermeabilizacion-y-humedades': 'https://images.pexels.com/photos/8858787/pexels-photo-8858787.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'reformas-de-locales-comerciales': 'https://images.pexels.com/photos/5531542/pexels-photo-5531542.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  } as Record<string, string>,

  // Galería placeholder (cuadrícula de proyectos antes de que el admin suba los suyos)
  gallery: [
    'https://images.pexels.com/photos/8146336/pexels-photo-8146336.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/6510984/pexels-photo-6510984.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/35868664/pexels-photo-35868664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7533848/pexels-photo-7533848.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/8146158/pexels-photo-8146158.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/19666087/pexels-photo-19666087.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
};

export function serviceImage(slug: string): string {
  return IMAGES.services[slug] ?? IMAGES.hero;
}
