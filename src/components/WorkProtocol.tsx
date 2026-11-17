import Link from "next/link";
import { kgm } from "@/data/kgm-data";

export default function WorkProtocol() {
  const { protocol } = kgm;

  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-14 grid items-end gap-6 border-b border-grain pb-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="font-display text-4xl font-semibold leading-none text-ink sm:text-5xl lg:text-6xl">{protocol.title}</h1>
          </div>
          <p className="max-w-[52ch] text-base leading-relaxed text-graphite lg:col-span-5">{protocol.intro}</p>
        </header>

        {/* Secuencia real: la numeración indica el orden de las etapas */}
        <h2 className="sr-only">{protocol.stepsTitle}</h2>
        <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {protocol.steps.map((s) => (
            <li key={s.code} className="border-t-[3px] border-ink pt-4">
              <span className="block font-display text-6xl font-bold leading-none text-accent">{s.code}</span>
              <p className="mt-4 font-display text-2xl font-semibold leading-snug text-ink">{s.title}</p>
              <p className="mt-2 max-w-[38ch] text-[0.95rem] leading-relaxed text-graphite">{s.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 border-t border-grain pt-10">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="font-display text-2xl font-semibold text-ink">{protocol.risksTitle}</h2>
            <Link
              href="/cotizacion/"
              className="self-start rounded-[2px] bg-accent px-5 py-3 font-display text-lg font-semibold text-white transition-colors hover:bg-accent-hover sm:self-auto"
            >
              Solicitar trabajo bajo este protocolo
            </Link>
          </div>
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {protocol.risks.map((r) => (
              <li key={r.title} className="border-t-2 border-steel pt-3">
                <p className="font-display text-xl font-semibold text-ink">{r.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-graphite">{r.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
