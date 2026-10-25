import { LegalPage } from '@/components/LegalPage';
import { COMPANY } from '@/lib/constants';

export default function Privacy() {
  return (
    <LegalPage
      title="Política de privacidad"
      description="Política de privacidad de la web Reformas N&N."
      path="/privacidad"
    >
      <div className="space-y-6">
        <section>
          <h2 className="font-display text-xl text-ink-900">1. Responsable del tratamiento</h2>
          <p>
            El responsable del tratamiento de los datos es {COMPANY.name}. Los datos de contacto
            completos se añadirán a este apartado antes de la publicación definitiva.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink-900">2. Finalidad</h2>
          <p>
            Los datos que facilitas a través del formulario de presupuesto se utilizan única y
            exclusivamente para atender tu solicitud, prepararte un presupuesto y responderte. No
            los utilizaremos para enviar publicidad sin tu consentimiento.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink-900">3. Legitimación</h2>
          <p>
            La base legal para el tratamiento de tus datos es tu consentimiento, que das al enviar
            el formulario, y la solicitud de presupuesto que nos planteas.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink-900">4. Conservación</h2>
          <p>
            Conservaremos tus datos el tiempo necesario para atender tu solicitud y, después,
            durante los plazos legalmente exigibles.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink-900">5. Destinatarios</h2>
          <p>
            No cederemos tus datos a terceros, salvo obligación legal. Las imágenes que subas se
            almacenan en el proveedor de almacenamiento que utiliza la web para gestionar las
            solicitudes.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink-900">6. Derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación
            y portabilidad escribiendo a {COMPANY.email}.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink-900">7. Más información</h2>
          <p>
            Para cualquier duda sobre el tratamiento de tus datos, contacta con {COMPANY.name} en{' '}
            {COMPANY.email}.
          </p>
        </section>
      </div>
    </LegalPage>
  );
}
