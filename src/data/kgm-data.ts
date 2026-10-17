export interface Credential { label: string; value: string }
export interface Specialty { code: string; title: string; description: string; ciiu?: string }
export interface ProtocolStep { code: string; title: string; description: string }
export interface Risk { title: string; description: string }

export interface KgmData {
  identity: { name: string; ruc: string; status: string; ciiu: readonly string[] };
  seo: { title: string; description: string; keywords: string[] };
  nav: { rucLabel: string; cta: string; links: { label: string; href: string }[] };
  hero: { eyebrow: string; headline: string; summary: string; primaryCta: string; secondaryCta: string; credentialsTitle: string };
  credentials: Credential[];
  services: { title: string; intro: string; items: Specialty[] };
  protocol: { title: string; intro: string; risksTitle: string; risks: Risk[]; stepsTitle: string; steps: ProtocolStep[] };
  contact: {
    title: string;
    intro: string;
    legalTitle: string;
    labels: { address: string; email: string; phone: string; hours: string };
    address: string;
    email: string;
    phone: string;
    hours: string;
    form: {
      name: string; company: string; email: string; area: string; scope: string;
      scopePlaceholder: string; submit: string; sending: string; success: string;
      subjectPrefix: string; options: string[];
    };
  };
  footerNote: string;
}

export const kgm: KgmData = {
  identity: {
    name: "KGM INDUSTRIAS E.I.R.L.",
    ruc: "20556454346",
    status: "ACTIVO / HABIDO",
    ciiu: ["CIIU 4329", "CIIU 4774"],
  },
  seo: {
    title: "KGM INDUSTRIAS E.I.R.L. | Ingeniería de mantenimiento en Lima",
    description:
      "Mantenimiento de sistemas de bombeo, acondicionamiento de edificios y redes sanitarias y eléctricas en Lima. Proveedor habilitado RNP, personal con SCTR vigente. Operando desde 2014.",
    keywords: ["mantenimiento de bombas", "sistemas hidroneumáticos", "cisternas", "acondicionamiento de edificios", "RNP", "Lima"],
  },
  nav: {
    rucLabel: "RUC",
    cta: "Solicitar cotización",
    links: [
      { label: "Especialidades", href: "#especialidades" },
      { label: "Protocolo", href: "#protocolo" },
      { label: "Contacto", href: "#cotizacion" },
    ],
  },
  hero: {
    eyebrow: "OPERACIONES EN LIMA DESDE 2014 · CIIU 4329",
    headline: "Ingeniería de mantenimiento, sistemas de bombeo y acondicionamiento de infraestructura.",
    summary:
      "Operando desde julio de 2014 en Lima para edificios residenciales, corporativos e instituciones del Estado.",
    primaryCta: "Solicitar cotización técnica",
    secondaryCta: "Ver especialidades",
    credentialsTitle: "Ficha técnica y credenciales",
  },
  credentials: [
    { label: "Razón social", value: "KGM INDUSTRIAS E.I.R.L." },
    { label: "RUC", value: "20556454346" },
    { label: "Estado SUNAT", value: "ACTIVO / HABIDO" },
    { label: "Inicio de operaciones", value: "01 / Julio / 2014 (+12 años)" },
    { label: "Registro estatal", value: "Proveedor Habilitado RNP (OSCE)" },
    { label: "Cobertura legal", value: "Personal con SCTR Vigente / Cero Deuda Coactiva SUNAT" },
    { label: "Sede operativa", value: "Av. La Paz 2420, Urb. Miramar, San Miguel, Lima" },
  ],
  services: {
    title: "Cuatro especialidades, un mismo estándar de ejecución.",
    intro: "Cada frente de trabajo se cotiza y se entrega con especificaciones técnicas y conformidad por escrito.",
    items: [
      {
        code: "01",
        title: "Sistemas hidroneumáticos y cisternas",
        description:
          "Mantenimiento preventivo y correctivo de bombas de agua, tableros alternadores automáticos, válvulas check, rebobinado y desinfección certificada de cisternas.",
      },
      {
        code: "02",
        title: "Acondicionamiento de edificios",
        ciiu: "CIIU 4329",
        description:
          "Remodelación de interiores corporativos y comerciales, divisiones en drywall, falsos techos, pintura epóxica/industrial y estructuras metálicas.",
      },
      {
        code: "03",
        title: "Redes sanitarias y eléctricas",
        description:
          "Solución de fugas complejas, tuberías en termofusión (PPR) y PVC pesado, balanceo de cargas eléctricas y mantenimiento de tableros generales.",
      },
      {
        code: "04",
        title: "Suministro y equipos refaccionados",
        ciiu: "CIIU 4774",
        description:
          "Venta e instalación de motores, electrobombas y equipamiento técnico reacondicionado con garantía operativa.",
      },
    ],
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
    intro: "Describa la instalación y el alcance. Respondemos con fecha de inspección en sitio.",
    legalTitle: "Sede legal y operativa",
    labels: { address: "DIRECCIÓN", email: "CORREO", phone: "TELÉFONO", hours: "HORARIO" },
    address: "Av. La Paz 2420, Urb. Miramar, San Miguel, Lima, Perú",
    email: "contacto@kgmindustrias.com.pe",
    phone: "+51 1 000 0000",
    hours: "Lunes a viernes, 8:00 a 18:00",
    form: {
      name: "Nombre y apellido",
      company: "Empresa o institución",
      email: "Correo de contacto",
      area: "Especialidad",
      scope: "Alcance del trabajo",
      scopePlaceholder: "Ej.: mantenimiento de dos electrobombas y tablero alternador en edificio de 12 pisos.",
      submit: "Enviar solicitud",
      sending: "Abriendo su correo…",
      success: "Solicitud preparada. Envíela desde su cliente de correo.",
      subjectPrefix: "Solicitud de cotización técnica",
      options: [
        "Sistemas hidroneumáticos y cisternas",
        "Acondicionamiento de edificios",
        "Redes sanitarias y eléctricas",
        "Suministro y equipos refaccionados",
      ],
    },
  },
  footerNote: "Todos los derechos reservados.",
};
