"use client";

import { kgm } from "@/data/kgm-data";
import type { ViewScenario } from "./Navbar";

interface HeroEditorialProps {
  onNavigate?: (view: ViewScenario) => void;
}

export default function HeroEditorial({ onNavigate }: HeroEditorialProps) {
  const { hero, credentials } = kgm;

  return (
    <section className="border-b border-grain bg-canvas">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-7">
          <p className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-muted">
            <span aria-hidden className="inline-block h-2 w-2 bg-terracotta" />
            {hero.eyebrow}
          </p>
          <h1 className="max-w-[22ch] font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-8 max-w-[56ch] font-serif text-lg leading-relaxed text-muted">{hero.summary}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate?.("cotizacion")}
              className="rounded-[4px] border border-terracotta bg-terracotta px-5 py-3 text-sm font-medium text-canvas transition-all hover:border-terracotta-hover hover:bg-terracotta-hover"
            >
              {hero.primaryCta}
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.("especialidades")}
              className="rounded-[4px] border border-grain bg-canvas px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface"
            >
              {hero.secondaryCta}
            </button>
          </div>
        </div>

        <aside className="lg:col-span-5 lg:pt-3" aria-labelledby="credenciales">
          <h2 id="credenciales" className="border-b border-grain pb-3 font-mono text-xs uppercase tracking-wider text-muted">
            {hero.credentialsTitle}
          </h2>
          <dl>
            {credentials.map((row) => (
              <div key={row.label} className="grid gap-1 border-b border-grain py-3.5 sm:grid-cols-5 sm:gap-4">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted sm:col-span-2">{row.label}</dt>
                <dd className="font-mono text-sm sm:col-span-3">{row.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
