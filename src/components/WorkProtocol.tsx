import Link from "next/link";
import { kgm } from "@/data/kgm-data";

export default function WorkProtocol() {
  const { protocol } = kgm;

  return (
    <section className="bg-ink py-16 text-canvas lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-16 grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-4 flex items-center gap-2 font-mono text-xs text-canvas/70">
              <span aria-hidden className="inline-block h-2 w-2 bg-terracotta" />
              Garantía operativa y mitigación de riesgos
            </p>
            <h1 className="font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl">{protocol.title}</h1>
          </div>
          <p className="max-w-[52ch] text-base leading-relaxed text-canvas/75 lg:col-span-5">{protocol.intro}</p>
        </header>

        {/* Secuencia real: la numeración indica el orden de las etapas */}
        <h2 className="sr-only">{protocol.stepsTitle}</h2>
        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-0">
          {/* Línea de recorrido que une las tres etapas */}
          <span aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-white/20 md:block" />
          {protocol.steps.map((s, i) => (
            <li key={s.code} className="relative md:pr-10">
              <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center border border-terracotta bg-ink font-serif text-2xl text-terracotta">
                {s.code}
              </span>
              <p className="mt-6 font-serif text-2xl leading-snug">{s.title}</p>
              <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-canvas/75">{s.description}</p>
              {i < protocol.steps.length - 1 && (
                <span aria-hidden className="absolute left-6 top-12 h-10 w-px bg-white/20 md:hidden" />
              )}
            </li>
          ))}
        </ol>

        <div className="mt-20 border-t border-white/15 pt-12">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="font-mono text-xs text-canvas/70">{protocol.risksTitle}</h2>
            <Link
              href="/cotizacion/"
              className="self-start rounded-[4px] border border-terracotta bg-terracotta px-4 py-2.5 text-sm font-medium text-canvas transition-colors hover:border-terracotta-hover hover:bg-terracotta-hover sm:self-auto"
            >
              Solicitar trabajo bajo este protocolo
            </Link>
          </div>
          <ul className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {protocol.risks.map((r) => (
              <li key={r.title} className="bg-ink p-5">
                <p className="font-serif text-lg text-canvas">{r.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-canvas/75">{r.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
