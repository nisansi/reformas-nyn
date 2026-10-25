import { LegalPage } from '@/components/LegalPage';
import { COMPANY } from '@/lib/constants';

export default function Legal() {
  return (
    <LegalPage
      title="Aviso legal"
      description="Aviso legal de la web Reformas N&N."
      path="/aviso-legal"
    >
      <div className="space-y-6">
        <section>
          <h2 className="font-display text-xl text-ink-900">1. Identificación del titular</h2>
          <p>
            El titular de esta web es {COMPANY.name}, empresa de reformas con domicilio en{' '}
            {COMPANY.workArea}. Los datos fiscales completos (razón social, NIF y domicilio) se
            facilitarán en este apartado antes de la publicación definitiva.
          </p>
          <p className="mt-2 rounded-lg border border-sand-200 bg-sand-50 p-3 text-sm text-ink-600">
            <strong>Pendiente:</strong> el titular debe facilitar razón social, NIF y domicilio
            fiscal para completar este apartado.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink-900">2. Objeto</h2>
          <p>
            Esta web tiene como finalidad informar sobre los servicios de reformas que ofrece{' '}
            {COMPANY.name} y facilitar la solicitud de presupuestos sin compromiso.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink-900">3. Condiciones de uso</h2>
          <p>
            El acceso a esta web es libre. El usuario se compromete a utilizarla de forma lícita y a
            no introducir información falsa en los formularios.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink-900">4. Propiedad intelectual</h2>
          <p>
            Los contenidos de esta web (textos, imágenes y diseño) son titularidad de{' '}
            {COMPANY.name} o de sus proveedores, salvo las imágenes de stock, que se utilizan con
            fines ilustrativos y no representan trabajos realizados por la empresa.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink-900">5. Contacto</h2>
          <p>
            Puedes contactar con {COMPANY.name} en el correo {COMPANY.email} o en el teléfono{' '}
            {COMPANY.phone}.
          </p>
        </section>
      </div>
    </LegalPage>
  );
}
