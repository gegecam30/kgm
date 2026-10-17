"use client";

import { kgm } from "@/data/kgm-data";

export type ViewScenario = "inicio" | "especialidades" | "protocolo" | "cotizacion";

interface NavbarProps {
  currentView: ViewScenario;
  onNavigate: (view: ViewScenario) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const { identity, nav } = kgm;

  const navItems: { label: string; view: ViewScenario }[] = [
    { label: "Inicio", view: "inicio" },
    { label: "Especialidades", view: "especialidades" },
    { label: "Protocolo", view: "protocolo" },
    { label: "Cotización", view: "cotizacion" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-grain bg-canvas/95 backdrop-blur-md">
      <nav aria-label="Principal" className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        {/* Brand identity & clean plain RUC */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate("inicio")}
            className="text-left font-serif text-xl tracking-tight text-ink transition-opacity hover:opacity-80"
          >
            {identity.name}
          </button>
          {/* Plain clean text for RUC, without badge border */}
          <span className="hidden font-mono text-xs tracking-wider text-muted sm:inline-block">
            {nav.rucLabel} {identity.ruc}
          </span>
        </div>

        {/* Desktop scenario navigation links */}
        <ul className="hidden items-center gap-8 text-sm md:flex">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <li key={item.view}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.view)}
                  className={`relative py-1 font-mono text-xs uppercase tracking-wider transition-colors ${
                    isActive
                      ? "text-ink font-semibold after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-terracotta"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Action CTA */}
        <button
          type="button"
          onClick={() => onNavigate("cotizacion")}
          className={`rounded-[4px] border px-4 py-2 text-sm font-medium transition-all ${
            currentView === "cotizacion"
              ? "border-terracotta bg-terracotta-hover text-canvas shadow-sm"
              : "border-terracotta bg-terracotta text-canvas hover:border-terracotta-hover hover:bg-terracotta-hover"
          }`}
        >
          {nav.cta}
        </button>
      </nav>
    </header>
  );
}
