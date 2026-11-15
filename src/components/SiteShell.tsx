"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { kgm, whatsappHref } from "@/data/kgm-data";
import Navbar from "./Navbar";
import { KgmMark } from "./KgmLogo";

const SECTIONS = kgm.sections;

/** "/especialidades" y "/especialidades/" son la misma sección. */
export function normalizePath(p: string | null): string {
  if (!p) return "/";
  return p.endsWith("/") ? p : `${p}/`;
}

export function useSectionIndex(): number {
  const pathname = normalizePath(usePathname());
  return SECTIONS.findIndex((s) => s.href === pathname);
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Línea de progreso superior: se dispara en cada cambio de ruta, no en la carga inicial.
  const [progressKey, setProgressKey] = useState(0);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setProgressKey((k) => k + 1);
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen flex-col bg-canvas text-ink">
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px]">
        {progressKey > 0 && <div key={progressKey} className="h-full bg-accent animate-top-progress" />}
      </div>

      <Navbar />

      <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}

function SiteFooter() {
  const { identity, contact, services, footer, footerNote } = kgm;
  const wa = whatsappHref();
  const heading = "mb-3 font-label text-base font-semibold text-white";
  const link = "inline-block py-1 text-white/70 transition-colors hover:text-white";

  return (
    <footer className="border-t-[3px] border-accent bg-night pb-[env(safe-area-inset-bottom)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p className="flex items-center gap-3 font-display text-2xl font-bold tracking-wide">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white p-0.5">
              <KgmMark className="h-full w-full" />
            </span>
            {identity.name}
          </p>
          <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-white/70">{footer.about}</p>
          <p className="mt-5 font-label text-base text-white/60">
            RUC {identity.ruc} <span className="text-white/30">|</span> Proveedor RNP <span className="text-white/30">|</span> SCTR vigente
          </p>
        </div>

        <nav aria-labelledby="pie-especialidades" className="lg:col-span-3">
          <h2 id="pie-especialidades" className={heading}>
            Especialidades
          </h2>
          <ul className="grid gap-0.5 text-sm">
            {services.items.map((s) => (
              <li key={s.slug}>
                <Link href={`/especialidades/#${s.slug}`} className={link}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="pie-sitio" className="lg:col-span-2">
          <h2 id="pie-sitio" className={heading}>
            Sitio
          </h2>
          <ul className="grid gap-0.5 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className={link}>
                  {s.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacidad/" className={link}>
                Política de privacidad
              </Link>
            </li>
            {contact.complaintsBookUrl && (
              <li>
                <a href={contact.complaintsBookUrl} target="_blank" rel="noopener noreferrer" className={link}>
                  Libro de Reclamaciones
                </a>
              </li>
            )}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className={heading}>Contacto</h2>
          <ul className="grid gap-2.5 text-sm text-white/70">
            <li>
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-white/25 underline-offset-4 hover:text-white">
                {contact.address}
              </a>
            </li>
            {contact.phone && (
              <li>
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="hover:text-white">
                  {contact.phone}
                </a>
              </li>
            )}
            {contact.landline && (
              <li>
                <a href={`tel:+511${contact.landline.replace(/\D/g, "").replace(/^01/, "")}`} className="hover:text-white">
                  {contact.landline}
                </a>
              </li>
            )}
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${contact.email}`} className="break-all hover:text-white">
                {contact.email}
              </a>
            </li>
            <li>{contact.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {identity.name}
          </p>
          <p>{footerNote}</p>
        </div>
      </div>
    </footer>
  );
}

/** Botón flotante de WhatsApp. Solo aparece si hay número configurado. */
function WhatsAppFloat() {
  const wa = whatsappHref("Hola, quisiera una cotización técnica.");
  if (!wa) return null;
  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-signal text-white shadow-lg"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
      </svg>
    </a>
  );
}
