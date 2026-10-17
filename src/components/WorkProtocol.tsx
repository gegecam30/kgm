"use client";

import { kgm } from "@/data/kgm-data";
import type { ViewScenario } from "./Navbar";

interface WorkProtocolProps {
  onNavigate?: (view: ViewScenario) => void;
}

export default function WorkProtocol({ onNavigate }: WorkProtocolProps) {
  const { protocol } = kgm;

  return (
    <section className="bg-ink text-canvas py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 grid gap-6 lg:grid-cols-12 items-end">
          <div className="lg:col-span-7">
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-canvas/60">
              <span className="inline-block h-2 w-2 bg-terracotta" />
              Garantía Operativa y Mitigación de Riesgos
            </p>
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl">{protocol.title}</h2>
          </div>
          <p className="max-w-[52ch] text-canvas/70 text-base leading-relaxed lg:col-span-5">{protocol.intro}</p>
        </div>

        <ol className="grid divide-y divide-white/15 md:grid-cols-3 md:divide-x md:divide-y-0">
          {protocol.steps.map((s) => (
            <li key={s.code} className="py-8 first:pt-0 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0">
              <span className="font-serif text-5xl leading-none text-terracotta">{s.code}</span>
              <p className="mt-6 font-serif text-2xl leading-snug">{s.title}</p>
              <p className="mt-3 max-w-[40ch] leading-relaxed text-canvas/70 text-sm">{s.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-20 border-t border-white/15 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h3 className="font-mono text-xs uppercase tracking-wider text-canvas/60">{protocol.risksTitle}</h3>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("cotizacion")}
                className="font-mono text-xs uppercase tracking-wider text-terracotta hover:underline self-start sm:self-auto"
              >
                Solicitar ejecución bajo este protocolo →
              </button>
            )}
          </div>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {protocol.risks.map((r) => (
              <li key={r.title} className="rounded border border-white/10 p-5 bg-white/[0.02]">
                <p className="font-mono text-sm text-canvas font-medium">{r.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-canvas/70">{r.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
