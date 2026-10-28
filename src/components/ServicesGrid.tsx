"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { kgm } from "@/data/kgm-data";
import {
  TurbineCisternDiagram,
  StructuralIsometricDiagram,
  SanitaryElectricalDiagram,
  PrecisionGearsDiagram,
} from "./Diagrams";

const DIAGRAMS: Record<string, { fig: string; status: string; Component: () => JSX.Element }> = {
  bombeo: { fig: "Fig. 01 · Electrobomba centrífuga y cisterna", status: "Presurización", Component: TurbineCisternDiagram },
  acondicionamiento: { fig: "Fig. 02 · Isométrico de tabique en drywall", status: "Cotas en mm", Component: StructuralIsometricDiagram },
  redes: { fig: "Fig. 03 · Red de agua y tablero trifásico", status: "Flujo continuo", Component: SanitaryElectricalDiagram },
  suministro: { fig: "Fig. 04 · Transmisión por engranajes", status: "i = 1.33", Component: PrecisionGearsDiagram },
};

export default function ServicesGrid() {
  const { services } = kgm;
  const items = services.items;
  const [active, setActive] = useState(items[0].slug);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // La especialidad activa vive en el hash (#bombeo, #redes…) para poder enlazarla y compartirla.
  useEffect(() => {
    const fromHash = () => {
      const slug = window.location.hash.replace("#", "");
      if (items.some((s) => s.slug === slug)) setActive(slug);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [items]);

  const select = useCallback((slug: string) => {
    setActive(slug);
    window.history.replaceState(null, "", `#${slug}`);
  }, []);

  // Patrón de pestañas WAI-ARIA: flechas, Inicio y Fin mueven el foco y la selección.
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = items.length - 1;
    const keyMap: Record<string, number> = {
      ArrowDown: i === last ? 0 : i + 1,
      ArrowRight: i === last ? 0 : i + 1,
      ArrowUp: i === 0 ? last : i - 1,
      ArrowLeft: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    };
    const target = keyMap[e.key];
    if (target === undefined) return;
    e.preventDefault();
    select(items[target].slug);
    tabRefs.current[target]?.focus();
  };

  const current = items.find((s) => s.slug === active) ?? items[0];
  const { fig, status, Component } = DIAGRAMS[current.slug];

  return (
    <section className="border-b border-grain py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-10 grid gap-6 border-b border-grain pb-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-3 flex items-center gap-2 font-mono text-xs text-muted">
              <span aria-hidden className="inline-block h-2 w-2 bg-terracotta" />
              Ingeniería aplicada
            </p>
            <h1 className="text-balance font-serif text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {services.title}
            </h1>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5">
            <p className="max-w-[48ch] text-base leading-relaxed text-muted">{services.intro}</p>
          </div>
        </header>

        <div className="grid items-start gap-8 lg:grid-cols-12">
          <div
            role="tablist"
            aria-label="Especialidades"
            aria-orientation="vertical"
            className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1"
          >
            {items.map((s, i) => {
              const selected = s.slug === current.slug;
              return (
                <button
                  key={s.slug}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`tab-${s.slug}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="panel-especialidad"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(s.slug)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`animate-hydraulic-${i} relative rounded-[4px] border p-5 text-left transition-colors ${
                    selected
                      ? "border-terracotta bg-paper before:absolute before:inset-y-3 before:left-0 before:w-[3px] before:bg-terracotta"
                      : "border-grain bg-surface/40 hover:border-rule hover:bg-surface"
                  }`}
                >
                  <span className="flex items-baseline justify-between gap-4">
                    <span className={`font-serif text-3xl tracking-tight ${selected ? "text-terracotta" : "text-ink"}`}>
                      {s.code}
                    </span>
                    {s.ciiu && (
                      <span className="rounded-[2px] border border-grain px-1.5 py-0.5 font-mono text-xs tabular-nums text-muted">
                        {s.ciiu}
                      </span>
                    )}
                  </span>
                  <span className="mt-2.5 block font-serif text-lg font-medium leading-snug tracking-tight text-ink">
                    {s.title}
                  </span>
                  <span className={`mt-1.5 block text-sm leading-relaxed text-muted ${selected ? "" : "line-clamp-2"}`}>
                    {s.description}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="panel-especialidad"
            role="tabpanel"
            aria-labelledby={`tab-${current.slug}`}
            className="rounded-[4px] border border-grain bg-paper p-5 sm:p-7 lg:sticky lg:top-24 lg:col-span-7"
          >
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-grain pb-4">
              <div>
                <p className="font-mono text-xs font-medium text-terracotta">Esquema {current.code}</p>
                <h2 className="mt-1 font-serif text-xl tracking-tight text-ink sm:text-2xl">{current.title}</h2>
              </div>
              <p className="font-mono text-xs text-muted">Esquema ilustrativo · sin escala</p>
            </div>

            <figure className="mt-5 overflow-hidden rounded-[2px] border border-grain bg-canvas">
              <div className="flex items-center justify-between gap-3 border-b border-grain bg-paper px-4 py-2.5 font-mono text-xs">
                <figcaption className="min-w-0 truncate text-muted">{fig}</figcaption>
                <span className="flex shrink-0 items-center gap-2 font-semibold text-terracotta">
                  <span aria-hidden className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-terracotta" />
                  {status}
                </span>
              </div>
              <div key={current.slug} className="diagram-enter p-3 sm:p-4">
                <Component />
              </div>
            </figure>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Dibujo de referencia. Las cifras son orientativas y no corresponden a una instalación concreta.
            </p>

            <div className="mt-6 flex flex-col justify-between gap-4 border-t border-grain pt-5 sm:flex-row sm:items-center">
              <p className="max-w-md text-sm leading-relaxed text-ink">{current.description}</p>
              <Link
                href={`/cotizacion/?area=${current.slug}`}
                className="shrink-0 whitespace-nowrap rounded-[4px] border border-terracotta bg-terracotta px-4 py-2.5 text-sm font-medium text-canvas transition-colors hover:border-terracotta-hover hover:bg-terracotta-hover"
              >
                Cotizar esta especialidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
