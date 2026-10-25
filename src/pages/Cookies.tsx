import { LegalPage } from '@/components/LegalPage';

export default function Cookies() {
  return (
    <LegalPage
      title="Política de cookies"
      description="Política de cookies de la web Reformas N&N."
      path="/cookies"
    >
      <div className="space-y-6">
        <section>
          <h2 className="font-display text-xl text-ink-900">1. Qué son las cookies</h2>
          <p>
            Las cookies son pequeños archivos que se almacenan en tu navegador para recordar tu
            configuración y mejorar tu experiencia de navegación.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink-900">2. Cookies que utilizamos</h2>
          <p>
            Esta web utiliza únicamente cookies técnicas necesarias para su funcionamiento
            (mantener sesión, gestionar el formulario y la galería). No se instalan cookies de
            seguimiento ni de publicidad sin tu consentimiento.
          </p>
          <p className="mt-2 rounded-lg border border-sand-200 bg-sand-50 p-3 text-sm text-ink-600">
            Si en el futuro se añaden herramientas de analítica o de seguimiento, se habilitará un
            banner de consentimiento previo, según exige la normativa.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink-900">3. Cómo gestionarlas</h2>
          <p>
            Puedes configurar tu navegador para aceptar, bloquear o eliminar las cookies. Ten en
            cuenta que bloquear las cookies técnicas puede impedir que algunas funciones de la web
            funcionen correctamente.
          </p>
        </section>
      </div>
    </LegalPage>
  );
}
