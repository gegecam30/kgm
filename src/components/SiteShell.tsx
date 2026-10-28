"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { kgm } from "@/data/kgm-data";
import Navbar from "./Navbar";

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
  const router = useRouter();
  const index = useSectionIndex();
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

  // Flechas izquierda/derecha para pasar de sección (sin interferir con formularios).
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || e.defaultPrevented) return;
      const el = e.target as HTMLElement | null;
      if (el && (["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName) || el.isContentEditable)) return;
      if (el?.closest("[role='tablist']")) return; // las pestañas usan las flechas
      if (index < 0) return;
      if (e.key === "ArrowRight" && index < SECTIONS.length - 1) router.push(SECTIONS[index + 1].href);
      if (e.key === "ArrowLeft" && index > 0) router.push(SECTIONS[index - 1].href);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, router]);

  const prev = index > 0 ? SECTIONS[index - 1] : null;
  const next = index >= 0 && index < SECTIONS.length - 1 ? SECTIONS[index + 1] : null;

  return (
    <div className="relative flex min-h-screen flex-col bg-canvas text-ink">
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px]">
        {progressKey > 0 && <div key={progressKey} className="h-full bg-terracotta animate-top-progress" />}
      </div>

      <Navbar />

      <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>

      <SiteFooter />

      {/* Barra técnica inferior: índice de secciones y paso anterior/siguiente */}
      <nav
        aria-label="Secciones"
        className="fixed inset-x-0 bottom-0 z-40 h-14 border-t border-grain bg-canvas/95 backdrop-blur-md"
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <p className="flex min-w-0 items-center gap-3 font-mono text-xs">
            <span className="font-semibold tabular-nums text-ink">
              [ {index >= 0 ? SECTIONS[index].code : "--"} / {String(SECTIONS.length).padStart(2, "0")} ]
            </span>
            {index >= 0 && <span className="hidden truncate text-muted lg:inline">{SECTIONS[index].label}</span>}
          </p>

          <ol className="hidden items-center gap-1.5 md:flex">
            {SECTIONS.map((s, i) => {
              const active = i === index;
              return (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block rounded-[2px] border px-3 py-1 font-mono text-xs transition-colors ${
                      active
                        ? "border-terracotta bg-paper font-semibold text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-terracotta"
                        : "border-grain text-muted hover:border-rule hover:bg-surface/60 hover:text-ink"
                    }`}
                  >
                    <span className={active ? "mr-1.5 text-terracotta" : "mr-1.5"}>{s.code}</span>
                    {s.label}
                  </Link>
                </li>
              );
            })}
          </ol>

          <div className="flex shrink-0 items-center gap-2">
            <StepLink section={prev} direction="prev" />
            <StepLink section={next} direction="next" />
          </div>
        </div>
      </nav>
    </div>
  );
}

function StepLink({ section, direction }: { section: (typeof SECTIONS)[number] | null; direction: "prev" | "next" }) {
  const label = direction === "prev" ? "Anterior" : "Siguiente";
  const base =
    "inline-flex items-center gap-1.5 rounded-[2px] border border-grain px-3 py-1.5 font-mono text-xs text-ink transition-colors";
  const content = (
    <>
      {direction === "prev" && <span aria-hidden>←</span>}
      <span>{label}</span>
      {direction === "next" && <span aria-hidden>→</span>}
    </>
  );
  if (!section) {
    return (
      <span aria-disabled="true" className={`${base} cursor-default opacity-30`}>
        {content}
      </span>
    );
  }
  return (
    <Link href={section.href} aria-label={`${label}: ${section.label}`} className={`${base} hover:bg-surface`}>
      {content}
    </Link>
  );
}

function SiteFooter() {
  const { identity, footerNote } = kgm;
  return (
    // pb-20 deja espacio para la barra inferior fija
    <footer className="border-t border-grain pb-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {identity.name} · RUC {identity.ruc}
        </p>
        <p>{footerNote}</p>
      </div>
    </footer>
  );
}
