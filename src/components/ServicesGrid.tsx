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
  const scrollerRef = useRef<HTMLDivElement>(null);

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

  const select = useCallback(
    (slug: string) => {
      setActive(slug);
      window.history.replaceState(null, "", `#${slug}`);
      const i = items.findIndex((s) => s.slug === slug);
      tabRefs.current[i]?.scrollIntoView({ block: "nearest", inline: "nearest" });
      scrollerRef.current?.scrollTo({ left: 0 });
    },
    [items]
  );

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
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent">
              Ingeniería aplicada
            </p>
            <h1 className="text-balance font-display text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {services.title}
            </h1>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5">
            <p className="max-w-[48ch] text-base leading-relaxed text-muted">{services.intro}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <div
            role="tablist"
            aria-label="Especialidades"
            className="-mx-6 flex min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] lg:col-span-5 lg:mx-0 lg:grid lg:grid-cols-1 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
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
                  className={`animate-hydraulic-${i} relative w-[14.5rem] shrink-0 snap-start rounded-[4px] border p-4 text-left transition-colors lg:w-auto lg:p-5 ${
                    selected
                      ? "border-accent bg-paper before:absolute before:inset-y-3 before:left-0 before:w-[3px] before:bg-accent"
                      : "border-grain bg-surface/40 hover:border-rule hover:bg-surface"
                  }`}
                >
                  <span className="flex items-baseline justify-between gap-4">
                    <span className={`font-display text-2xl tracking-tight lg:text-3xl ${selected ? "text-accent" : "text-ink"}`}>
                      {s.code}
                    </span>
                    {s.ciiu && (
                      <span className="rounded-[2px] border border-grain px-1.5 py-0.5 font-mono text-xs tabular-nums text-muted">
                        {s.ciiu}
                      </span>
                    )}
                  </span>
                  <span className="mt-2 block font-display text-base font-medium leading-snug tracking-tight text-ink lg:mt-2.5 lg:text-lg">
                    {s.title}
                  </span>
                  <span className={`mt-1.5 hidden text-sm leading-relaxed text-muted lg:block ${selected ? "" : "lg:line-clamp-2"}`}>
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
            className="min-w-0 rounded-[4px] border border-grain bg-paper p-4 sm:p-7 lg:sticky lg:top-24 lg:col-span-7"
          >
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-grain pb-4">
              <div>
                <p className="font-mono text-xs font-medium text-accent">Esquema {current.code}</p>
                <h2 className="mt-1 font-display text-xl tracking-tight text-ink sm:text-2xl">{current.title}</h2>
              </div>
              <p className="font-mono text-xs text-muted">Esquema ilustrativo · sin escala</p>
            </div>

            <figure className="mt-5 overflow-hidden rounded-[2px] border border-grain bg-canvas">
              <div className="flex items-center justify-between gap-3 border-b border-grain bg-paper px-4 py-2.5 font-mono text-xs">
                <figcaption className="min-w-0 truncate text-muted">{fig}</figcaption>
                <span className="flex shrink-0 items-center gap-2 font-semibold text-accent">
                  <span aria-hidden className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  {status}
                </span>
              </div>
              <div className="relative">
                <div
                  ref={scrollerRef}
                  tabIndex={0}
                  aria-label="Esquema técnico; deslice horizontalmente para recorrerlo"
                  className="overflow-x-auto overscroll-x-contain focus-visible:outline-offset-[-2px] sm:overflow-visible"
                >
                  <div key={current.slug} className="diagram-enter min-w-[38rem] p-3 sm:min-w-0 sm:p-4">
                    <Component />
                  </div>
                </div>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-canvas to-transparent sm:hidden"
                />
              </div>
            </figure>
            <p className="mt-2 flex items-center gap-2 font-mono text-xs text-muted sm:hidden">
              <span aria-hidden>↔</span> Deslice para recorrer el esquema completo
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted sm:mt-3">
              Dibujo de referencia. Las cifras son orientativas y no corresponden a una instalación concreta.
            </p>

            <div className="mt-6 border-t border-grain pt-5">
              <p className="max-w-prose text-sm leading-relaxed text-ink">{current.description}</p>
              <h3 className="mt-5 font-mono text-xs text-muted">Señales de que su instalación lo necesita</h3>
              <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {current.symptoms.map((x) => (
                  <li key={x.id} className="flex items-start gap-2 text-sm leading-snug text-ink">
                    <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 bg-accent" />
                    {x.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex flex-col justify-end gap-4 sm:flex-row sm:items-center">
              <Link
                href={`/cotizacion/?area=${current.slug}`}
                className="shrink-0 rounded-[4px] text-center sm:whitespace-nowrap border border-accent bg-accent px-4 py-2.5 text-sm font-medium text-canvas transition-colors hover:border-accent-hover hover:bg-accent-hover"
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
