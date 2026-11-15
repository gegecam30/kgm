"use client";

import { useState } from "react";
import Link from "next/link";
import { kgm, suggestSpecialty } from "@/data/kgm-data";

/**
 * Diagnóstico rápido: el visitante marca lo que observa en su instalación,
 * se sugiere la especialidad y los síntomas viajan a la cotización (?area=…&sintomas=…).
 */
export default function QuickDiagnosis() {
  const { diagnosis, services } = kgm;
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const suggestion = suggestSpecialty(selected);
  const href = suggestion
    ? `/cotizacion/?area=${suggestion.slug}&sintomas=${selected.join(",")}`
    : "/cotizacion/";

  return (
    <section aria-labelledby="diagnostico" className="border-b border-grain">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-12 lg:py-16">
        <header className="mb-8 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-3 text-sm text-muted">
              {diagnosis.eyebrow}
            </p>
            <h2 id="diagnostico" className="text-balance font-display text-2xl tracking-tight sm:text-3xl">
              {diagnosis.title}
            </h2>
          </div>
          <p className="max-w-[48ch] self-end text-base leading-relaxed text-muted lg:col-span-5">{diagnosis.intro}</p>
        </header>

        <div className="grid gap-px border-y border-grain border-t-ink bg-grain sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((s) => {
            const highlighted = suggestion?.slug === s.slug;
            return (
              <fieldset key={s.slug} className={`min-w-0 p-5 transition-colors ${highlighted ? "bg-paper" : "bg-canvas"}`}>
                <legend className="float-left mb-4 flex w-full items-baseline gap-2 font-label text-sm">
                  <span className={highlighted ? "font-semibold text-accent" : "text-muted"}>{s.code}</span>
                  <span className="text-ink">{s.title}</span>
                </legend>
                <ul className="clear-left grid gap-2">
                  {s.symptoms.map((x) => {
                    const checked = selected.includes(x.id);
                    return (
                      <li key={x.id}>
                        <label
                          className={`flex cursor-pointer items-start gap-3 rounded-[2px] border px-3 py-2.5 text-sm leading-snug transition-colors ${
                            checked ? "border-accent bg-paper text-ink" : "border-grain text-muted hover:border-rule hover:text-ink"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggle(x.id)}
                            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-accent"
                          />
                          {x.label}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </fieldset>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" aria-live="polite">
          <p className="text-sm text-muted">
            {suggestion ? (
              <>
                Especialidad sugerida:{" "}
                <span className="font-medium text-ink">
                  {suggestion.code} · {suggestion.title}
                </span>
                <span className="font-label text-sm"> ({selected.length} {selected.length === 1 ? "síntoma" : "síntomas"})</span>
              </>
            ) : (
              diagnosis.empty
            )}
          </p>
          {suggestion ? (
            <Link
              href={href}
              className="shrink-0 rounded-[2px] border border-accent bg-accent px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:border-accent-hover hover:bg-accent-hover"
            >
              {diagnosis.cta}
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="shrink-0 cursor-default rounded-[2px] border border-grain px-5 py-3 text-center text-sm font-medium text-muted"
            >
              {diagnosis.cta}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
