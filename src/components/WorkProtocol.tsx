import Link from "next/link";
import { kgm } from "@/data/kgm-data";

/** En /protocolo/ es el título de la página (h1); en el inicio es una sección más (h2). */
export default function WorkProtocol({ asPage = false }: { asPage?: boolean }) {
  const { protocol } = kgm;
  const Title = asPage ? "h1" : "h2";

  return (
    <section id="protocolo" aria-labelledby="protocolo-titulo" className="scroll-mt-20 border-b border-grain">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
        <header className="mb-12 grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent">Garantía operativa</p>
            <Title id="protocolo-titulo" className={`font-display ${asPage ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl sm:text-3xl lg:text-4xl"}`}>
              {protocol.title}
            </Title>
          </div>
          <p className="max-w-[52ch] text-base leading-relaxed text-muted lg:col-span-5">{protocol.intro}</p>
        </header>

        {/* Secuencia real: la numeración indica el orden de las etapas */}
        <h3 className="sr-only">{protocol.stepsTitle}</h3>
        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-0">
          {/* Línea de recorrido que une las tres etapas */}
          <span aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-grain md:block" />
          {protocol.steps.map((s, i) => (
            <li key={s.code} className="relative md:pr-10">
              <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy font-display text-lg text-white">
                {s.code}
              </span>
              <p className="mt-5 font-display text-xl leading-snug">{s.title}</p>
              <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-muted">{s.description}</p>
              {i < protocol.steps.length - 1 && (
                <span aria-hidden className="absolute left-6 top-12 h-10 w-px bg-grain md:hidden" />
              )}
            </li>
          ))}
        </ol>

        {/* Franja oscura acotada: los riesgos que el protocolo cubre */}
        <div className="mt-14 rounded-[6px] bg-navy p-6 text-white sm:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h3 className="font-display text-lg">{protocol.risksTitle}</h3>
            <Link
              href="/cotizacion/"
              className="self-start rounded-[4px] border border-accent bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-accent-hover hover:bg-accent-hover sm:self-auto"
            >
              Solicitar trabajo bajo este protocolo
            </Link>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-[4px] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {protocol.risks.map((r) => (
              <li key={r.title} className="bg-navy p-5">
                <p className="font-display text-base">{r.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{r.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
