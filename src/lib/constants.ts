// Datos centralizados de la empresa y servicios. Modifica aquí para cambiar valores en toda la web.

export const COMPANY = {
  name: 'Reformas N&N',
  experienceYears: 25,
  workArea: 'Valencia y alrededores',
  phone: '619 45 34 12',
  phoneIntl: '+34619453412',
  whatsapp: '34619453412',
  whatsappMessage: 'Hola, estoy interesado/a en solicitar un presupuesto para una reforma',
  email: 'Reformasnyn@hotmail.com',
};

export function whatsappLink(message?: string): string {
  const text = encodeURIComponent(message ?? COMPANY.whatsappMessage);
  return `https://wa.me/${COMPANY.whatsapp}?text=${text}`;
}

export function telLink(): string {
  return `tel:${COMPANY.phone.replace(/\s+/g, '')}`;
}

export function mailLink(subject?: string): string {
  const s = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${COMPANY.email}${s}`;
}

export interface ServiceInfo {
  slug: string;
  name: string;
  short: string;
  description: string;
  longDescription: string;
  benefits: string[];
  faq: { q: string; a: string }[];
  imageQuery: string;
  metaTitle: string;
  metaDescription: string;
}

export const SERVICES: ServiceInfo[] = [
  {
    slug: 'reformas-integrales',
    name: 'Reformas integrales de viviendas',
    short: 'Renovación completa de tu vivienda, de principio a fin.',
    description:
      'Coordinamos todas las disciplinas necesarias para reformar tu vivienda por completo, desde la demolición hasta los acabados finales.',
    longDescription:
      'Una reforma integral abarca todas las intervucciones necesarias para actualizar y modernizar una vivienda: distribución, instalaciones, revestimientos, carpintería y acabados. En Reformas N&N coordinamos cada fase para que el proceso sea ordenado, limpio y respetuoso con los plazos acordados. Trabajamos con particulares y propietarios de viviendas en Valencia y alrededores, adaptándonos al estilo de vida y al presupuesto de cada cliente.',
    benefits: [
      'Coordinación única de todos los oficios: albañilería, fontanería, electricidad, pintura y más.',
      'Estudio previo del proyecto y presupuesto detallado y sin compromiso.',
      'Materiales y acabados seleccionables según tus preferencias y tu presupuesto.',
      'Seguimiento de la obra y comunicación cercana durante todo el proceso.',
    ],
    faq: [
      {
        q: '¿Cuánto dura una reforma integral?',
        a: 'El plazo depende del alcance de la obra y del estado inicial de la vivienda. Tras estudiar tu proyecto te indicamos una estimación de tiempos sin compromiso.',
      },
      {
        q: '¿El presupuesto es gratuito?',
        a: 'Sí. Realizamos un estudio de tu proyecto y te enviamos un presupuesto detallado sin coste y sin compromiso.',
      },
      {
        q: '¿Trabajáis en pisos amueblados?',
        a: 'Sí. Tomamos las precauciones necesarias para proteger mobiliario y zonas no reformadas durante la obra.',
      },
    ],
    imageQuery: 'modern renovated living room interior',
    metaTitle: 'Reformas integrales en Valencia | Reformas N&N',
    metaDescription:
      'Reformas integrales de viviendas en Valencia y alrededores. Coordinamos albañilería, fontanería, electricidad, pintura y acabados. Presupuesto gratis.',
  },
  {
    slug: 'reformas-de-banos',
    name: 'Reformas de baños',
    short: 'Baños funcionales y duraderos, con acabados de calidad.',
    description:
      'Renovamos tu baño mejorando la distribución, las instalaciones y los acabados.',
    longDescription:
      'Una reforma de baño bien planteada mejora el aprovechamiento del espacio, actualiza las instalaciones de agua y desagüe y renueva los revestimientos. En Reformas N&N trabajamos la albañilería, fontanería, impermeabilización, alicatado y acabados para que el resultado sea funcional, estético y duradero. Sustituimos sanitarios, grifería, mamparas y mobiliario según las necesidades de cada cliente en Valencia y alrededores.',
    benefits: [
      'Mejora de la distribución y el aprovechamiento del espacio.',
      'Impermeabilización correcta de la zona de ducha y suelo para evitar humedades.',
      'Sustitución de instalaciones de agua y desagüe con materiales de primera calidad.',
      'Acabados modernos: alicatado, sanitarios, grifería y mamparas a tu elección.',
    ],
    faq: [
      {
        q: '¿Cuánto tarda una reforma de baño?',
        a: 'Depende del alcance, pero un baño completo suele requerir varios días de obra. Te damos una estimación tras ver el espacio.',
      },
      {
        q: '¿Impermeabilizáis antes de alicatar?',
        a: 'Sí. La impermeabilización de la zona de ducha y el suelo es parte del proceso para prevenir humedades futuras.',
      },
      {
        q: '¿Puedo elegir los materiales?',
        a: 'Por supuesto. Te orientamos y te dejamos decidir sanitarios, grifería, azulejos y mobiliario según tu gusto y presupuesto.',
      },
    ],
    imageQuery: 'modern renovated bathroom interior',
    metaTitle: 'Reformas de baños en Valencia | Reformas N&N',
    metaDescription:
      'Reformas de baños en Valencia: impermeabilización, albañilería, fontanería y acabados. Baños funcionales y duraderos. Presupuesto gratis y sin compromiso.',
  },
  {
    slug: 'reformas-de-cocinas',
    name: 'Reformas de cocinas',
    short: 'Cocinas prácticas y bien equipadas para el día a día.',
    description:
      'Renovamos tu cocina mejorando distribución, instalaciones y acabados.',
    longDescription:
      'La cocina es uno de los espacios más utilizados de la casa. Una reforma de cocina bien planteada combina distribución, instalaciones eléctricas y de agua, carpintería, encimeras y acabados. En Reformas N&N coordinamos todos los oficios para que el resultado sea práctico, resistente y agradable. Trabajamos en cocinas de viviendas particulares y locales en Valencia y alrededores.',
    benefits: [
      'Distribución optimizada para aprovechar el espacio y facilitar el uso diario.',
      'Actualización de instalaciones eléctricas y de agua según normativa.',
      'Carpintería a medida, encimeras y acabados de calidad.',
      'Coordinación de todos los oficios en un único proyecto.',
    ],
    faq: [
      {
        q: '¿Trabajáis con cocinas de vivienda habitual?',
        a: 'Sí. Realizamos reformas de cocina en viviendas particulares, adaptándonos al espacio y a las necesidades de la familia.',
      },
      {
        q: '¿Puedo conservar algunos elementos?',
        a: 'En muchos casos sí. Tras estudiar la cocina te indicamos qué se puede conservar y qué conviene renovar.',
      },
      {
        q: '¿Incluye electricidad y fontanería?',
        a: 'Sí, la reforma de cocina suele incluir la adaptación de las instalaciones eléctricas y de agua necesarias.',
      },
    ],
    imageQuery: 'modern renovated kitchen interior',
    metaTitle: 'Reformas de cocinas en Valencia | Reformas N&N',
    metaDescription:
      'Reformas de cocinas en Valencia: distribución, electricidad, fontanería, carpintería y acabados. Cocinas prácticas y duraderas. Presupuesto gratis.',
  },
  {
    slug: 'albanileria',
    name: 'Albañilería',
    short: 'Obra de albañilería para reformas y reparaciones.',
    description:
      'Trabajos de albañilería: tabiques, revestimientos, enfoscados, reparaciones y más.',
    longDescription:
      'La albañilería es la base de muchas reformas y reparaciones. En Reformas N&N realizamos tabiquería, revestimientos, enfoscados, saneamiento de muros, reparaciones de fisuras y todo tipo de obra de albañilería. Trabajamos tanto en reformas integrales como en intervenciones puntuales en viviendas y locales de Valencia y alrededores.',
    benefits: [
      'Trabajo de obra limpia y cuidadoso, preparado para los acabados posteriores.',
      'Reparación de fisuras, humedades y desperfectos en muros y techos.',
      'Tabiquería y redistribución de espacios según tu proyecto.',
      'Experiencia de más de 25 años en obra de albañilería.',
    ],
    faq: [
      {
        q: '¿Hacéis pequeñas reparaciones de albañilería?',
        a: 'Sí. Además de reformas completas, realizamos reparaciones puntuales como fisuras, huecos y desperfectos en muros.',
      },
      {
        q: '¿Preparáis los muros para pintura?',
        a: 'Sí. El trabajo de albañilería incluye preparar y nivelar las superficies para que el acabado de pintura quede correcto.',
      },
    ],
    imageQuery: 'bricklayer masonry work wall',
    metaTitle: 'Albañilería en Valencia | Reformas N&N',
    metaDescription:
      'Trabajos de albañilería en Valencia: tabiquería, revestimientos, enfoscados y reparaciones. Más de 25 años de experiencia. Presupuesto gratis.',
  },
  {
    slug: 'fontaneria',
    name: 'Fontanería',
    short: 'Instalaciones y reparaciones de fontanería.',
    description:
      'Instalación y reparación de fontanería: agua, desagües, sanitarios y grifería.',
    longDescription:
      'Una instalación de fontanería correcta es esencial para el funcionamiento y la durabilidad de baños, cocinas y viviendas en general. En Reformas N&N realizamos instalación y sustitución de tuberías de agua y desagüe, sanitarios, grifería, termos y calderas, así como reparaciones de fugas y averías. Trabajamos en viviendas y locales de Valencia y alrededores.',
    benefits: [
      'Instalación y sustitución de tuberías con materiales de calidad.',
      'Reparación de fugas y averías de agua y desagüe.',
      'Sustitución de sanitarios, grifería y elementos de baño y cocina.',
      'Detección y solución de problemas de presión y drenaje.',
    ],
    faq: [
      {
        q: '¿Reparáis fugas de agua?',
        a: 'Sí. Localizamos la fuga y realizamos la reparación necesaria para evitar daños mayores.',
      },
      {
        q: '¿Sustituís calderas o termos?',
        a: 'Realizamos la instalación y sustitución de termos y la adaptación de las instalaciones necesarias.',
      },
    ],
    imageQuery: 'plumbing pipes installation',
    metaTitle: 'Fontanería en Valencia | Reformas N&N',
    metaDescription:
      'Fontanería en Valencia: instalación y reparación de agua, desagües, sanitarios y grifería. Presupuesto gratis y sin compromiso.',
  },
  {
    slug: 'electricidad',
    name: 'Electricidad',
    short: 'Instalaciones eléctricas seguras y actualizadas.',
    description:
      'Instalación y renovación de electricidad para viviendas y locales.',
    longDescription:
      'Una instalación eléctrica actualizada y segura es fundamental. En Reformas N&N realizamos instalación y renovación de cuadros eléctricos, cableado, puntos de luz, enchufes y mecanismos, así como la adaptación de instalaciones en reformas integrales. Trabajamos en viviendas y locales de Valencia y alrededores respetando la normativa vigente.',
    benefits: [
      'Renovación de cuadros eléctricos y cableado según normativa.',
      'Instalación de puntos de luz, enchufes y mecanismos.',
      'Adaptación de la instalación en reformas integrales y de estancias concretas.',
      'Trabajo ordenado y seguro, con materiales de calidad.',
    ],
    faq: [
      {
        q: '¿Renováis el cuadro eléctrico?',
        a: 'Sí. Renovamos cuadros antiguos y los adaptamos a las necesidades actuales de la vivienda.',
      },
      {
        q: '¿Añadís enchufes y puntos de luz?',
        a: 'Sí. Ampliamos la instalación con nuevos puntos según tus necesidades.',
      },
    ],
    imageQuery: 'electrical wiring installation home',
    metaTitle: 'Electricidad en Valencia | Reformas N&N',
    metaDescription:
      'Instalación y renovación de electricidad en Valencia: cuadros, cableado, enchufes e iluminación. Presupuesto gratis y sin compromiso.',
  },
  {
    slug: 'pintura',
    name: 'Pintura',
    short: 'Pintura interior y exterior con acabados limpios.',
    description:
      'Pintura de paredes y techos, preparación de superficies y acabados.',
    longDescription:
      'Un buen trabajo de pintura transforma cualquier estancia. En Reformas N&N preparamos las superficies, reparamos pequeñas imperfecciones y aplicamos pintura interior y exterior con acabado uniforme y duradero. Trabajamos en viviendas y locales de Valencia y alrededores, con pinturas de calidad y una ejecución limpia y cuidada.',
    benefits: [
      'Preparación de superficies: lijado, masillado y reparación de imperfecciones.',
      'Pintura interior y exterior con materiales de calidad.',
      'Acabados lisos y uniformes, con protección de mobiliario y suelos.',
      'Renovación estética rápida y económica de cualquier estancia.',
    ],
    faq: [
      {
        q: '¿Preparáis las paredes antes de pintar?',
        a: 'Sí. Reparamos grietas e imperfecciones y preparamos la superficie para que el acabado sea uniforme.',
      },
      {
        q: '¿Pintáis exteriores?',
        a: 'Sí. Realizamos pintura de fachadas y exteriores con productos aptos para exterior.',
      },
    ],
    imageQuery: 'painter painting wall interior',
    metaTitle: 'Pintura en Valencia | Reformas N&N',
    metaDescription:
      'Pintura interior y exterior en Valencia: preparación de superficies y acabados de calidad. Presupuesto gratis y sin compromiso.',
  },
  {
    slug: 'suelos-y-alicatados',
    name: 'Suelos y alicatados',
    short: 'Colocación de suelo y alicatado de paredes.',
    description:
      'Instalación de suelos cerámicos, porcelánicos y alicatado de paredes.',
    longDescription:
      'Los suelos y alicatados definen el aspecto y la durabilidad de cualquier estancia. En Reformas N&N colocamos suelos cerámicos, porcelánicos y otros materiales, así como alicatado de paredes en baños, cocinas y otras estancias. Preparamos la superficie, aseguramos la nivelación y garantizamos un acabado limpio y resistente en viviendas y locales de Valencia y alrededores.',
    benefits: [
      'Colocación de suelos cerámicos, porcelánicos y otros materiales.',
      'Alicatado de paredes en baños, cocinas y zonas húmedas.',
      'Nivelación y preparación del soporte para un acabado duradero.',
      'Reemplazo de baldosas sueltas o deterioradas sin obra mayor cuando es posible.',
    ],
    faq: [
      {
        q: '¿Colocáis suelo porcelánico?',
        a: 'Sí. Trabajamos con porcelánico, cerámica y otros materiales según tu elección.',
      },
      {
        q: '¿Se puede alicatar sobre azulejo existente?',
        a: 'En algunos casos es posible alicatar sobre el azulejo existente; lo valoramos según el estado de la pared.',
      },
    ],
    imageQuery: 'tile installation floor bathroom',
    metaTitle: 'Suelos y alicatados en Valencia | Reformas N&N',
    metaDescription:
      'Colocación de suelos y alicatados en Valencia: cerámica, porcelánico y alicatado de paredes. Presupuesto gratis y sin compromiso.',
  },
  {
    slug: 'pladur-y-techos',
    name: 'Pladur y techos',
    short: 'Tabiques, techos falsos y soluciones de Pladur.',
    description:
      'Tabiquería de Pladur, techos falsos y revestimientos de yeso.',
    longDescription:
      'El Pladur permite redistribuir espacios, ocultar instalaciones y crear techos falsos de forma rápida y limpia. En Reformas N&N realizamos tabiquería de Pladur, techos continuos, falsos techos, trasdosados y revestimientos de yeso. Es una solución ideal para renovar distribuciones, ocultar cableado o mejorar el aislamiento acústico y térmico en viviendas y locales de Valencia y alrededores.',
    benefits: [
      'Tabiquería de Pladur para redistribuir espacios con rapidez.',
      'Techos falsos y continuos para ocultar instalaciones y mejorar el acabado.',
      'Trasdosados para mejorar el aislamiento acústico y térmico.',
      'Solución limpia y veloz, ideal para reformas integrales.',
    ],
    faq: [
      {
        q: '¿Sirve el Pladur para insonorizar?',
        a: 'Con trasdosados y aislantes adecuados, el Pladur mejora notablemente el aislamiento acústico de una estancia.',
      },
      {
        q: '¿Podéis hacer un falso techo?',
        a: 'Sí. Realizamos techos falsos para ocultar instalaciones y dar un acabado uniforme.',
      },
    ],
    imageQuery: 'drywall plasterboard ceiling installation',
    metaTitle: 'Pladur y techos en Valencia | Reformas N&N',
    metaDescription:
      'Tabiquería de Pladur, techos falsos y trasdosados en Valencia. Redistribución de espacios e instalación limpia. Presupuesto gratis.',
  },
  {
    slug: 'carpinteria-y-puertas',
    name: 'Carpintería y puertas',
    short: 'Puertas y carpintería interior con buen acabado.',
    description:
      'Instalación y sustitución de puertas y carpintería interior.',
    longDescription:
      'Las puertas y la carpintería interior influyen tanto en la estética como en el aislamiento y el confort. En Reformas N&N instalamos y sustituimos puertas de paso, puertas correderas, rodapiés y elementos de carpintería interior. Ajustamos, nivelamos y garantizamos un cierre correcto y un acabado limpio en viviendas y locales de Valencia y alrededores.',
    benefits: [
      'Sustitución de puertas de paso y puertas correderas.',
      'Ajuste y nivelación para un cierre y un desplazamiento correctos.',
      'Renovación de rodapiés y elementos de carpintería interior.',
      'Mejora del aislamiento acústico de paso entre estancias.',
    ],
    faq: [
      {
        q: '¿Instaláis puertas correderas?',
        a: 'Sí. Instalamos puertas correderas y de paso, incluida la adaptación del hueco si es necesario.',
      },
      {
        q: '¿Puedo elegir el modelo de puerta?',
        a: 'Por supuesto. Te orientamos y trabajamos con el modelo que elijas según tu estilo y presupuesto.',
      },
    ],
    imageQuery: 'interior door wood installation',
    metaTitle: 'Carpintería y puertas en Valencia | Reformas N&N',
    metaDescription:
      'Instalación y sustitución de puertas y carpintería interior en Valencia. Puertas de paso y correderas. Presupuesto gratis y sin compromiso.',
  },
  {
    slug: 'impermeabilizacion-y-humedades',
    name: 'Impermeabilización y humedades',
    short: 'Solución de humedades e impermeabilización.',
    description:
      'Tratamiento de humedades e impermeabilización de muros, suelos y techos.',
    longDescription:
      'Las humedades deterioran muros, suelos y techos y pueden afectar a la salud de la vivienda. En Reformas N&N diagnosticamos el origen de la humedad (filtración, capilaridad, condensación o fisuras) y aplicamos la solución adecuada: impermeabilización de muros y suelos, tratamiento de juntas y reparación de fisuras. Trabajamos en viviendas y locales de Valencia y alrededores.',
    benefits: [
      'Diagnóstico del origen de la humedad antes de actuar.',
      'Impermeabilización de muros, suelos y techos.',
      'Tratamiento de juntas y fisuras para evitar filtraciones.',
      'Soluciones adaptadas al tipo de humedad detectado.',
    ],
    faq: [
      {
        q: '¿Cómo sabéis de dónde viene la humedad?',
        a: 'Inspeccionamos la zona afectada para identificar el origen (filtración, capilaridad, condensación o fisuras) antes de proponer la solución.',
      },
      {
        q: '¿Garantizáis que no vuelva la humedad?',
        a: 'Aplicamos la solución adecuada al origen detectado. Si la causa persiste por factores externos no tratados, te lo indicamos antes de actuar.',
      },
    ],
    imageQuery: 'waterproofing wall moisture treatment',
    metaTitle: 'Impermeabilización y humedades en Valencia | Reformas N&N',
    metaDescription:
      'Tratamiento de humedades e impermeabilización en Valencia. Diagnóstico del origen y solución duradera. Presupuesto gratis y sin compromiso.',
  },
  {
    slug: 'reformas-de-locales-comerciales',
    name: 'Reformas de locales comerciales',
    short: 'Reformas para locales, tiendas y comercios.',
    description:
      'Adaptación y reforma de locales comerciales para tu negocio.',
    longDescription:
      'Un local bien reformado favorece la imagen de tu negocio y el funcionamiento diario. En Reformas N&N adaptamos y reformamos locales comerciales coordinando albañilería, instalaciones, pintura, suelos y acabados. Trabajamos en locales de Valencia y alrededores, compatibilizando la reforma con la actividad del negocio cuando es necesario.',
    benefits: [
      'Coordinación de todos los oficios en un único proyecto.',
      'Adaptación del local a la actividad y la imagen del negocio.',
      'Actualización de instalaciones eléctricas y de fontanería.',
      'Acabados resistentes al uso diario de un local comercial.',
    ],
    faq: [
      {
        q: '¿Reformáis locales en funcionamiento?',
        a: 'Sí. Cuando es necesario, organizamos la obra para minimizar el impacto en la actividad del negocio.',
      },
      {
        q: '¿Adaptáis el local a la normativa?',
        a: 'Adaptamos las instalaciones eléctricas y de fontanería a las exigencias habituales; te indicamos si tu actividad requiere trámites adicionales.',
      },
    ],
    imageQuery: 'retail shop interior renovation',
    metaTitle: 'Reformas de locales comerciales en Valencia | Reformas N&N',
    metaDescription:
      'Reformas de locales comerciales en Valencia: albañilería, instalaciones, pintura y acabados. Adaptamos el local a tu negocio. Presupuesto gratis.',
  },
];

export function getServiceBySlug(slug: string): ServiceInfo | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export const CATEGORY_SLUGS = SERVICES.map((s) => s.slug);

export interface NavLink {
  label: string;
  to: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Proyectos', to: '/proyectos' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contacto', to: '/contacto' },
];
