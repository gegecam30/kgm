/**
 * Fuente única de contenido del sitio.
 * Editar textos, datos de contacto y servicios aquí; los componentes solo los muestran.
 */

export interface Credential { label: string; value: string }
/** Síntoma observable que lleva a una especialidad (diagnóstico rápido y cotización). */
export interface Symptom { id: string; label: string }
export interface Specialty {
  code: string;
  /** Ancla usada en la URL: /especialidades/#<slug> */
  slug: string;
  title: string;
  description: string;
  ciiu?: string;
  /** Señales que el cliente puede reconocer en su instalación. */
  symptoms: Symptom[];
}
export interface ProtocolStep { code: string; title: string; description: string }
export interface Risk { title: string; description: string }
export interface GalleryItem {
  /**
   * Ruta de la foto dentro de /public (ej. "/galeria/cuarto-de-bombas.jpg").
   * Vacía = se muestra el marco "Foto pendiente".
   */
  src: string;
  /**
   * Versión diminuta y borrosa de la misma foto (ej. "/galeria/cuarto-de-bombas-mini.jpg", ~40 px de ancho).
   * Opcional: se ve mientras carga la foto grande, útil con mala señal.
   */
  lqip?: string;
  alt: string;
  caption: string;
  /** slug de la especialidad relacionada */
  specialty: string;
}
export interface Section { href: string; code: string; label: string; title: string; description: string }

export interface KgmData {
  identity: { name: string; shortName: string; ruc: string; status: string; ciiu: readonly string[]; foundedISO: string };
  site: { origin: string; basePath: string };
  seo: { title: string; description: string; keywords: string[] };
  sections: Section[];
  nav: { rucLabel: string; cta: string };
  hero: { eyebrow: string; headline: string; summary: string; primaryCta: string; secondaryCta: string; credentialsTitle: string };
  credentials: Credential[];
  services: { title: string; intro: string; items: Specialty[] };
  gallery: { eyebrow: string; title: string; intro: string; items: GalleryItem[] };
  diagnosis: { eyebrow: string; title: string; intro: string; empty: string; cta: string; scopeHeading: string };
  protocol: { title: string; intro: string; risksTitle: string; risks: Risk[]; stepsTitle: string; steps: ProtocolStep[] };
  contact: {
    title: string;
    intro: string;
    legalTitle: string;
    labels: { address: string; email: string; phone: string; whatsapp: string; hours: string };
    address: string;
    email: string;
    /** Enlace a Google Maps de la sede. */
    mapsUrl: string;
    /**
     * Endpoint de un servicio de formularios (Formspree, Web3Forms…) que recibe POST en JSON.
     * Vacío = el formulario abre el programa de correo del visitante (mailto).
     */
    formEndpoint: string;
    /** URL del Libro de Reclamaciones virtual. Vacío = no se muestra en el pie. */
    complaintsBookUrl: string;
    /**
     * Teléfono público, formato libre (ej. "+51 1 234 5678").
     * Dejar vacío para ocultarlo: el sitio no muestra datos de relleno.
     */
    phone: string;
    /**
     * Número de WhatsApp en formato internacional SOLO dígitos (ej. "51987654321").
     * Dejar vacío para ocultar el botón de WhatsApp.
     */
    whatsapp: string;
    hours: string;
    form: {
      name: string; company: string; email: string; phone: string; area: string; scope: string;
      scopePlaceholder: string; submit: string; success: string; fallback: string;
      subjectPrefix: string;
      send: string; sending: string; sentOk: string; error: string; privacyNote: string;
    };
  };
  footerNote: string;
  footer: { about: string };
}

const services: Specialty[] = [
  {
    code: "01",
    slug: "bombeo",
    title: "Sistemas hidroneumáticos y cisternas",
    description:
      "Mantenimiento preventivo y correctivo de bombas de agua, tableros alternadores automáticos, válvulas check, rebobinado y desinfección de cisternas.",
    symptoms: [
      { id: "bomba-ciclado", label: "La bomba arranca y se detiene a cada rato" },
      { id: "baja-presion", label: "Baja presión de agua en los pisos altos" },
      { id: "ruido-bomba", label: "Ruido o vibración en el cuarto de bombas" },
      { id: "cisterna", label: "La cisterna no se limpia ni desinfecta hace más de seis meses" },
    ],
  },
  {
    code: "02",
    slug: "acondicionamiento",
    title: "Acondicionamiento de edificios",
    ciiu: "CIIU 4329",
    description:
      "Remodelación de interiores corporativos y comerciales, divisiones en drywall, falsos techos, pintura epóxica e industrial y estructuras metálicas.",
    symptoms: [
      { id: "remodelacion", label: "Oficina o local por remodelar o redistribuir" },
      { id: "pintura", label: "Pintura desprendida o pisos industriales desgastados" },
      { id: "corrosion", label: "Estructura metálica con corrosión" },
    ],
  },
  {
    code: "03",
    slug: "redes",
    title: "Redes sanitarias y eléctricas",
    description:
      "Solución de fugas complejas, tuberías en termofusión (PPR) y PVC pesado, balanceo de cargas eléctricas y mantenimiento de tableros generales.",
    symptoms: [
      { id: "fuga", label: "Fuga o humedad sin origen visible" },
      { id: "termicas", label: "Llaves térmicas que saltan con frecuencia" },
      { id: "tablero", label: "Tablero eléctrico caliente o con olor a quemado" },
    ],
  },
  {
    code: "04",
    slug: "suministro",
    title: "Suministro y equipos refaccionados",
    ciiu: "CIIU 4774",
    description:
      "Venta e instalación de motores, electrobombas y equipamiento técnico reacondicionado con garantía operativa.",
    symptoms: [
      { id: "equipo-parado", label: "Motor o electrobomba fuera de servicio" },
      { id: "reemplazo", label: "Necesita un equipo de reemplazo con garantía" },
    ],
  },
];

export const kgm: KgmData = {
  identity: {
    name: "KGM INDUSTRIAS E.I.R.L.",
    shortName: "KGM Industrias",
    ruc: "20556454346",
    status: "ACTIVO / HABIDO",
    ciiu: ["CIIU 4329", "CIIU 4774"],
    foundedISO: "2014-07-01",
  },
  site: {
    // Dominio público. Con dominio propio: origin = "https://www.dominio.pe" y basePath = "".
    // basePath debe coincidir con el de next.config.mjs.
    origin: "https://gegecam30.github.io",
    basePath: "/kgm",
  },
  seo: {
    title: "KGM INDUSTRIAS E.I.R.L. | Ingeniería de mantenimiento en Lima",
    description:
      "Mantenimiento de sistemas de bombeo, acondicionamiento de edificios y redes sanitarias y eléctricas en Lima. Proveedor habilitado RNP, personal con SCTR vigente. Operando desde 2014.",
    keywords: ["mantenimiento de bombas", "sistemas hidroneumáticos", "cisternas", "acondicionamiento de edificios", "RNP", "Lima"],
  },
  sections: [
    {
      href: "/",
      code: "01",
      label: "Inicio",
      title: "KGM INDUSTRIAS E.I.R.L. | Ingeniería de mantenimiento en Lima",
      description:
        "Mantenimiento de sistemas de bombeo, acondicionamiento de edificios y redes sanitarias y eléctricas en Lima desde 2014.",
    },
    {
      href: "/especialidades/",
      code: "02",
      label: "Especialidades",
      title: "Especialidades",
      description:
        "Sistemas hidroneumáticos y cisternas, acondicionamiento de edificios, redes sanitarias y eléctricas, y suministro de equipos refaccionados.",
    },
    {
      href: "/protocolo/",
      code: "03",
      label: "Protocolo",
      title: "Protocolo de trabajo",
      description:
        "Inspección en sitio, presupuesto por hitos y ejecución con SCTR y acta de conformidad.",
    },
    {
      href: "/trabajos/",
      code: "04",
      label: "Trabajos",
      title: "Trabajos realizados",
      description: "Registro fotográfico de mantenimientos, remodelaciones y redes ejecutadas por KGM en Lima.",
    },
    {
      href: "/cotizacion/",
      code: "05",
      label: "Cotización",
      title: "Cotización técnica",
      description: "Solicite una cotización técnica: describa la instalación y le respondemos con fecha de inspección.",
    },
  ],
  nav: {
    rucLabel: "RUC",
    cta: "Solicitar cotización",
  },
  hero: {
    eyebrow: "Operaciones en Lima desde 2014",
    headline: "Ingeniería de mantenimiento, sistemas de bombeo y acondicionamiento de infraestructura.",
    summary:
      "Atendemos edificios residenciales, oficinas corporativas e instituciones del Estado en Lima Metropolitana, con alcance y costo fijados por escrito antes de intervenir.",
    primaryCta: "Solicitar cotización técnica",
    secondaryCta: "Ver especialidades",
    credentialsTitle: "Ficha técnica",
  },
  credentials: [
    { label: "Razón social", value: "KGM INDUSTRIAS E.I.R.L." },
    { label: "RUC", value: "20556454346" },
    { label: "Estado SUNAT", value: "ACTIVO / HABIDO" },
    { label: "Inicio de operaciones", value: "Julio de 2014" },
    { label: "Registro estatal", value: "Proveedor habilitado RNP (OSCE)" },
    { label: "Cobertura laboral", value: "Personal con SCTR vigente" },
    { label: "Situación tributaria", value: "Sin deuda coactiva SUNAT" },
    { label: "Sede operativa", value: "Av. La Paz 2420, Urb. Miramar, San Miguel, Lima" },
  ],
  services: {
    title: "Cuatro especialidades, un mismo estándar de ejecución.",
    intro: "Cada frente de trabajo se cotiza y se entrega con especificaciones técnicas y conformidad por escrito.",
    items: services,
  },
  gallery: {
    eyebrow: "Trabajos realizados",
    title: "Instalaciones que mantenemos",
    intro: "Registro fotográfico de intervenciones en edificios, oficinas e instituciones de Lima.",
    // TODO: colocar las fotos en public/galeria/ y completar src (y opcionalmente lqip).
    items: [
      { src: "", alt: "Cuarto de bombas con electrobombas y tablero alternador", caption: "Mantenimiento de electrobombas y tablero alternador", specialty: "bombeo" },
      { src: "", alt: "Cisterna limpia después de la desinfección", caption: "Limpieza y desinfección de cisterna", specialty: "bombeo" },
      { src: "", alt: "Oficina remodelada con divisiones de drywall", caption: "Remodelación de oficinas en drywall", specialty: "acondicionamiento" },
      { src: "", alt: "Piso con pintura epóxica en área industrial", caption: "Pintura epóxica en piso industrial", specialty: "acondicionamiento" },
      { src: "", alt: "Tablero eléctrico general después del mantenimiento", caption: "Mantenimiento de tablero general", specialty: "redes" },
      { src: "", alt: "Tuberías de termofusión PPR instaladas", caption: "Red de agua en termofusión PPR", specialty: "redes" },
    ],
  },
  diagnosis: {
    eyebrow: "Diagnóstico rápido",
    title: "¿Qué está fallando en su instalación?",
    intro: "Marque lo que observa. Le indicamos la especialidad que corresponde y llevamos esos datos a la cotización.",
    empty: "Seleccione uno o más síntomas.",
    cta: "Cotizar con este diagnóstico",
    scopeHeading: "Síntomas observados",
  },
  protocol: {
    title: "Protocolo de trabajo",
    intro: "Un flujo de tres etapas que fija alcance, costo y responsabilidad antes de intervenir.",
    risksTitle: "Riesgos que el protocolo mitiga",
    risks: [
      { title: "Riesgo laboral", description: "Todo el personal en obra cuenta con SCTR vigente." },
      { title: "Riesgo tributario", description: "Sin deuda coactiva en SUNAT; condición ACTIVO / HABIDO verificable." },
      { title: "Riesgo de contratación pública", description: "Proveedor habilitado en el RNP del OSCE." },
      { title: "Riesgo de sobrecosto", description: "Presupuesto por hitos con marcas y especificaciones definidas." },
    ],
    stepsTitle: "Flujo en tres etapas",
    steps: [
      { code: "01", title: "Inspección técnica en sitio", description: "Visita de campo para diagnosticar el estado real de la instalación." },
      { code: "02", title: "Presupuesto transparente", description: "Cotización por hitos y especificaciones de marca, sin partidas ocultas." },
      { code: "03", title: "Ejecución asegurada", description: "Trabajo cubierto por SCTR y entrega con acta de conformidad." },
    ],
  },
  contact: {
    title: "Cotización técnica",
    intro: "Describa la instalación y el alcance. Respondemos con una fecha para la inspección en sitio.",
    legalTitle: "Sede legal y operativa",
    labels: { address: "Dirección", email: "Correo", phone: "Teléfono", whatsapp: "WhatsApp", hours: "Horario" },
    address: "Av. La Paz 2420, Urb. Miramar, San Miguel, Lima, Perú",
    // TODO: confirmar que este buzón existe y recibe correo antes de publicar.
    email: "contacto@kgmindustrias.com.pe",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+La+Paz+2420+San+Miguel+Lima",
    // TODO: crear el formulario en Formspree (o similar) y pegar aquí su URL, ej. "https://formspree.io/f/xxxxxx".
    formEndpoint: "",
    // TODO: URL del Libro de Reclamaciones virtual.
    complaintsBookUrl: "",
    // TODO: completar con el número real. Vacío = no se muestra.
    phone: "",
    // TODO: completar con el número de WhatsApp (solo dígitos, con 51). Vacío = no se muestra.
    whatsapp: "",
    hours: "Lunes a viernes, 8:00 a 18:00",
    form: {
      name: "Nombre y apellido",
      company: "Empresa o institución",
      email: "Correo de contacto",
      phone: "Teléfono (opcional)",
      area: "Especialidad",
      scope: "Alcance del trabajo",
      scopePlaceholder: "Ej.: mantenimiento de dos electrobombas y tablero alternador en edificio de 12 pisos.",
      submit: "Preparar correo de solicitud",
      success: "Su programa de correo se abrió con la solicitud lista. Revísela y envíela desde ahí.",
      fallback: "¿No se abrió? Escríbanos directamente a",
      subjectPrefix: "Solicitud de cotización técnica",
      send: "Enviar solicitud",
      sending: "Enviando…",
      sentOk: "Recibimos su solicitud. Le responderemos con una fecha para la inspección.",
      error: "No se pudo enviar. Revise su conexión o escríbanos directamente a",
      privacyNote: "Usaremos estos datos solo para responder su solicitud.",
    },
  },
  footerNote: "Todos los derechos reservados.",
  footer: {
    about:
      "Mantenimiento de sistemas de bombeo, acondicionamiento de edificios y redes sanitarias y eléctricas en Lima Metropolitana desde 2014.",
  },
};

/** Años completos desde el inicio de operaciones (se calcula al generar el sitio). */
export function yearsOperating(now: Date = new Date()): number {
  const founded = new Date(kgm.identity.foundedISO);
  let years = now.getFullYear() - founded.getFullYear();
  const beforeAnniversary =
    now.getMonth() < founded.getMonth() ||
    (now.getMonth() === founded.getMonth() && now.getDate() < founded.getDate());
  if (beforeAnniversary) years -= 1;
  return years;
}

/** URL absoluta pública para metadatos (canonical, sitemap). */
export function absoluteUrl(path: string): string {
  return `${kgm.site.origin}${kgm.site.basePath}${path}`;
}

export function whatsappHref(message?: string): string | null {
  const n = kgm.contact.whatsapp.replace(/\D/g, "");
  if (!n) return null;
  return `https://wa.me/${n}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

/** Síntomas seleccionados (por id) junto con la especialidad a la que pertenecen. */
export function findSymptoms(ids: readonly string[]): { symptom: Symptom; specialty: Specialty }[] {
  return kgm.services.items.flatMap((specialty) =>
    specialty.symptoms.filter((s) => ids.includes(s.id)).map((symptom) => ({ symptom, specialty }))
  );
}

/** Especialidad con más síntomas marcados; en empate gana la primera del listado. */
export function suggestSpecialty(ids: readonly string[]): Specialty | null {
  let best: Specialty | null = null;
  let bestCount = 0;
  for (const s of kgm.services.items) {
    const count = s.symptoms.filter((x) => ids.includes(x.id)).length;
    if (count > bestCount) {
      best = s;
      bestCount = count;
    }
  }
  return best;
}

/** Prefijo de rutas para recursos de /public que no pasan por next/link ni next/image. */
export function publicPath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
