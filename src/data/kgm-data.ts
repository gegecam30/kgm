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
  /** Dirección de su ficha: /trabajos/<slug>/ */
  slug: string;
  /** Texto de la ficha del trabajo. Vacío = la ficha indica que está en preparación. */
  description?: string;
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
export interface Reference { name: string; detail?: string }
export interface Section { href: string; code: string; label: string; title: string; description: string }

export interface KgmData {
  identity: { name: string; shortName: string; ruc: string; status: string; ciiu: readonly string[]; foundedISO: string };
  site: { origin: string; basePath: string };
  seo: { title: string; description: string; keywords: string[] };
  sections: Section[];
  nav: { rucLabel: string; cta: string };
  hero: { proof: string; headline: string; summary: string; primaryCta: string; secondaryCta: string; credentialsTitle: string };
  credentials: Credential[];
  services: { title: string; intro: string; items: Specialty[] };
  gallery: { eyebrow: string; title: string; intro: string; items: GalleryItem[] };
  references: { buildingsTitle: string; buildings: Reference[]; clientsTitle: string; clients: string[] };
  diagnosis: { eyebrow: string; title: string; intro: string; empty: string; cta: string; scopeHeading: string };
  protocol: { title: string; intro: string; risksTitle: string; risks: Risk[]; stepsTitle: string; steps: ProtocolStep[] };
  contact: {
    title: string;
    intro: string;
    legalTitle: string;
    labels: { address: string; email: string; phone: string; landline: string; whatsapp: string; hours: string };
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
    /** Teléfono fijo, formato libre. Vacío = no se muestra. */
    landline: string;
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
    slug: "contraincendio",
    title: "Sistemas contra incendio",
    description:
      "Diseño, instalación y mantenimiento bajo normas NFPA: redes de rociadores, gabinetes, bombas contra incendio, detección y alarma, agentes limpios, protección pasiva, escaleras presurizadas y extracción de monóxido. Emitimos certificado de operatividad.",
    symptoms: [
      { id: "certificado", label: "Necesita el certificado de operatividad del sistema contra incendio" },
      { id: "bomba-ci", label: "La bomba contra incendio o la jockey no arranca en la prueba" },
      { id: "detectores", label: "El panel de alarma marca fallas o los detectores no responden" },
      { id: "itse", label: "La inspección de Defensa Civil (ITSE) observó el sistema" },
    ],
  },
  {
    code: "02",
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
    code: "03",
    slug: "estructuras",
    title: "Estructuras metálicas y soldadura",
    description:
      "Fabricación y montaje de estructuras metálicas, trabajos en acero inoxidable y soldadura MIG, TIG y plasma. Fabricamos maquinaria y estructuras industriales a medida.",
    symptoms: [
      { id: "fabricar-estructura", label: "Necesita fabricar o reforzar una estructura o soporte metálico" },
      { id: "inox", label: "Trabajos en acero inoxidable con soldadura TIG o MIG" },
    ],
  },
  {
    code: "04",
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
    code: "05",
    slug: "redes",
    title: "Redes sanitarias y eléctricas",
    description:
      "Solución de fugas complejas, tuberías en termofusión (PPR) y PVC pesado, balanceo de cargas eléctricas y mantenimiento de tableros generales. Sistemas de vapor, aire comprimido y gas.",
    symptoms: [
      { id: "fuga", label: "Fuga o humedad sin origen visible" },
      { id: "termicas", label: "Llaves térmicas que saltan con frecuencia" },
      { id: "tablero", label: "Tablero eléctrico caliente o con olor a quemado" },
    ],
  },
  {
    code: "06",
    slug: "suministro",
    title: "Suministro y equipos refaccionados",
    ciiu: "CIIU 4774",
    description:
      "Venta e instalación de bombas contra incendio, electrobombas, tanques hidroneumáticos, tableros de control y equipamiento reacondicionado con garantía operativa.",
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
    title: "KGM INDUSTRIAS E.I.R.L. | Sistemas contra incendio y bombeo en Lima",
    description:
      "Diseño, instalación y mantenimiento de sistemas contra incendio (NFPA), bombeo, redes y estructuras metálicas en Lima. Certificados de operatividad. Más de 15 años de trayectoria.",
    keywords: ["sistemas contra incendio", "certificado de operatividad", "NFPA 25", "rociadores", "detección de humo", "estructuras metálicas", "mantenimiento de bombas", "sistemas hidroneumáticos", "cisternas", "acondicionamiento de edificios", "RNP", "Lima"],
  },
  sections: [
    {
      href: "/",
      code: "01",
      label: "Inicio",
      title: "KGM INDUSTRIAS E.I.R.L. | Sistemas contra incendio y bombeo en Lima",
      description:
        "Sistemas contra incendio, bombeo, estructuras metálicas y redes para edificios e industria en Lima.",
    },
    {
      href: "/especialidades/",
      code: "02",
      label: "Especialidades",
      title: "Especialidades",
      description:
        "Sistemas contra incendio, bombeo y cisternas, estructuras metálicas y soldadura, acondicionamiento de edificios, redes y suministro de equipos.",
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
      description: "Obras de referencia y registro fotográfico de sistemas contra incendio, bombeo y estructuras ejecutados por KGM en Lima.",
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
    proof: "Más de 15 años en Lima. Obras: edificios Tempo, Switch, Sky Tower, B‑51 y Allegro, entre otras.",
    // El edificio Tempo (38 pisos) es la obra más alta del brochure: el titular nombra ese recorrido.
    headline: "Del cuarto de bombas al piso 38.",
    summary:
      "Diseñamos, instalamos y mantenemos sistemas contra incendio en edificios e industrias de Lima: rociadores, bombas y alarmas, con certificado de operatividad. También bombeo, estructuras metálicas y redes.",
    primaryCta: "Solicitar cotización técnica",
    secondaryCta: "Ver especialidades",
    credentialsTitle: "Ficha técnica",
  },
  credentials: [
    { label: "Razón social", value: "KGM INDUSTRIAS E.I.R.L." },
    { label: "RUC", value: "20556454346" },
    { label: "Estado SUNAT", value: "ACTIVO / HABIDO" },
    { label: "Trayectoria", value: "Más de 15 años" },
    { label: "Registro estatal", value: "Proveedor habilitado RNP (OSCE)" },
    { label: "Cobertura laboral", value: "Personal con SCTR vigente" },
    { label: "Situación tributaria", value: "Sin deuda coactiva SUNAT" },
    { label: "Sede operativa", value: "Av. La Paz 2420, Urb. Miramar, San Miguel, Lima" },
  ],
  services: {
    title: "Qué instalamos y mantenemos",
    intro: "Cada frente de trabajo se cotiza y se entrega con especificaciones técnicas y conformidad por escrito.",
    items: services,
  },
  gallery: {
    eyebrow: "Trabajos realizados",
    title: "Instalaciones que mantenemos",
    intro: "Registro fotográfico de intervenciones en edificios, oficinas e instituciones de Lima.",
    // TODO: colocar las fotos en public/galeria/ y completar src (y opcionalmente lqip y description).
    items: [
      { slug: "red-de-rociadores", src: "", alt: "Red de rociadores automáticos instalada en techo", caption: "Red de rociadores automáticos", specialty: "contraincendio" },
      { slug: "cuarto-de-bombas-contra-incendio", src: "", alt: "Cuarto de bombas contra incendio con bomba principal y jockey", caption: "Cuarto de bombas contra incendio", specialty: "contraincendio" },
      { slug: "panel-de-deteccion-y-alarma", src: "", alt: "Panel de detección y alarma contra incendio", caption: "Panel de detección y alarma", specialty: "contraincendio" },
      { slug: "electrobombas-y-tablero-alternador", src: "", alt: "Cuarto de bombas con electrobombas y tablero alternador", caption: "Electrobombas y tablero alternador", specialty: "bombeo" },
      { slug: "estructura-metalica-soldada", src: "", alt: "Estructura metálica soldada en planta industrial", caption: "Estructura metálica soldada", specialty: "estructuras" },
      { slug: "mantenimiento-de-tablero-general", src: "", alt: "Tablero eléctrico general después del mantenimiento", caption: "Mantenimiento de tablero general", specialty: "redes" },
    ],
  },
  references: {
    buildingsTitle: "Obras de referencia",
    // Fuente: brochure KGM 2025.
    buildings: [
      { name: "Edificio Tempo", detail: "38 pisos" },
      { name: "Edificio Switch", detail: "20 pisos" },
      { name: "Edificio Sky Tower", detail: "Magdalena" },
      { name: "Edificio B-51", detail: "Miraflores" },
      { name: "Edificio Allegro" },
      { name: "Edificio Homelife" },
      { name: "Edificio Bonavi" },
      { name: "Edificio Qupula" },
      { name: "Edificio Tudela" },
      { name: "Edificio Salazar" },
    ],
    clientsTitle: "Clientes",
    clients: [
      "Viviendas del Perú S.A.C.",
      "Inversiones Pamarena S.A.C.",
      "Constructora Wong S.A.C.",
      "Constructora Urbana Perú",
      "Constructora Kacegui S.A.C.",
      "Consorcio Chilca (Planta SATECI)",
      "Smart Pharma",
      "Tiendas Lancaster",
      "Universidad Privada San Juan Bautista",
      "Colegio Hiram Bingham",
      "Instituto de Cocina D'Gallia",
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
      { code: "02", title: "Presupuesto por hitos", description: "Cada partida con su marca y especificación, aprobada por escrito antes de empezar." },
      { code: "03", title: "Ejecución y entrega", description: "Trabajo cubierto por SCTR y entrega con acta de conformidad; en sistemas contra incendio, con certificado de operatividad." },
    ],
  },
  contact: {
    title: "Cotización técnica",
    intro: "Describa la instalación y el alcance. Respondemos con una fecha para la inspección en sitio.",
    legalTitle: "Sede legal y operativa",
    labels: { address: "Dirección", email: "Correo", phone: "Celular", landline: "Teléfono fijo", whatsapp: "WhatsApp", hours: "Horario" },
    address: "Av. La Paz 2420, Urb. Miramar, San Miguel, Lima, Perú",
    email: "kgm-industrias@hotmail.com",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+La+Paz+2420+San+Miguel+Lima",
    // TODO: crear el formulario en Formspree (o similar) y pegar aquí su URL, ej. "https://formspree.io/f/xxxxxx".
    formEndpoint: "",
    // TODO: URL del Libro de Reclamaciones virtual.
    complaintsBookUrl: "",
    phone: "998 075 193",
    landline: "(01) 726-4011",
    whatsapp: "51998075193",
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
      "Sistemas contra incendio, bombeo, estructuras metálicas y redes para edificios e industria en Lima. Más de 15 años de trayectoria.",
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
