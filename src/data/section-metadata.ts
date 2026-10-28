import type { Metadata } from "next";
import { kgm, absoluteUrl } from "./kgm-data";

/** Metadatos propios de cada sección (título, descripción y URL canónica). */
export function sectionMetadata(href: string): Metadata {
  const s = kgm.sections.find((x) => x.href === href);
  if (!s) return {};
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: absoluteUrl(s.href) },
    openGraph: {
      title: `${s.title} | ${kgm.identity.name}`,
      description: s.description,
      url: absoluteUrl(s.href),
      siteName: kgm.identity.name,
      locale: "es_PE",
      type: "website",
    },
  };
}
