import type { Metadata } from "next";
import { kgm, absoluteUrl } from "@/data/kgm-data";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Tratamiento de datos personales de ${kgm.identity.name}.`,
  alternates: { canonical: absoluteUrl("/privacidad/") },
};

// Texto base conforme a la Ley N.° 29733. Revisar con asesoría legal antes de publicar.
export default function Page() {
  const { identity, contact } = kgm;
  return (
    <section className="mx-auto max-w-3xl px-6 py-12 lg:py-20">
      <h1 className="font-display text-3xl sm:text-4xl">Política de privacidad</h1>

      <div className="mt-8 grid gap-6 text-base leading-relaxed text-ink [&_h2]:font-display [&_h2]:text-lg [&_p]:text-muted">
        <div>
          <h2>Responsable</h2>
          <p>
            {identity.name}, RUC {identity.ruc}, con domicilio en {contact.address}, es responsable de los datos personales que
            usted nos envía a través de este sitio.
          </p>
        </div>
        <div>
          <h2>Qué datos tratamos y para qué</h2>
          <p>
            Nombre, empresa o institución, correo, teléfono y la descripción del trabajo que solicita. Los usamos únicamente
            para responder su solicitud de cotización, coordinar la inspección técnica y dar seguimiento al servicio.
          </p>
        </div>
        <div>
          <h2>Conservación</h2>
          <p>
            Conservamos los datos mientras dure la relación comercial o el tiempo necesario para atender su solicitud y cumplir
            obligaciones legales.
          </p>
        </div>
        <div>
          <h2>Sus derechos</h2>
          <p>
            Puede ejercer sus derechos de acceso, rectificación, cancelación y oposición conforme a la Ley N.° 29733, Ley de
            Protección de Datos Personales, escribiendo a{" "}
            <a href={`mailto:${contact.email}`} className="text-ink underline underline-offset-4">
              {contact.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
