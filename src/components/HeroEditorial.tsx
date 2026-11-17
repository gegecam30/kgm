import Link from "next/link";
import { kgm } from "@/data/kgm-data";
import { KgmMark } from "./KgmLogo";
import Nameplate from "./Nameplate";

export default function HeroEditorial() {
  const { hero, credentials, identity, services } = kgm;

  // La placa toma los datos de credenciales: la razón social va en la franja roja,
  // el resto en celdas de dos columnas y la sede a todo el ancho.
  const [, ...rest] = credentials;
  const sede = rest.find((c) => c.label === "Sede operativa");
  const cells = rest.filter((c) => c !== sede);

  return (
    <>
      <section className="border-b border-grain">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 sm:py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-7">
            <h1 className="headline-reveal max-w-[16ch] text-balance font-display text-[2.9rem] font-semibold leading-[0.95] text-ink sm:text-7xl lg:text-[5.2rem]">
              {hero.headline}
            </h1>
            <p className="mt-8 max-w-[50ch] text-lg leading-relaxed text-graphite">{hero.summary}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/cotizacion/"
                className="rounded-[2px] bg-accent px-6 py-3.5 text-center font-display text-lg font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                {hero.primaryCta}
              </Link>
              <Link
                href="/especialidades/"
                className="rounded-[2px] border-2 border-ink px-6 py-3 text-center font-display text-lg font-semibold text-ink transition-colors hover:bg-ink hover:text-canvas"
              >
                {hero.secondaryCta}
              </Link>
            </div>
            <p className="mt-8 max-w-[56ch] text-[0.95rem] leading-relaxed text-muted">{hero.proof}</p>
          </div>

          {/* Placa de características: la ficha de la empresa se presenta como la placa remachada de un equipo */}
          <aside className="lg:col-span-5 lg:pt-2" aria-labelledby="ficha-tecnica">
            <Nameplate>

              <div className="mx-3 flex items-center justify-between gap-3 rounded-[1px] bg-accent px-3 py-2 text-white sm:mx-4">
                <span className="flex min-w-0 items-center gap-3">
                  <KgmMark badge className="h-11 w-11 shrink-0" />
                  <h2 id="ficha-tecnica" className="font-display text-xl font-bold tracking-wide">
                    {identity.name}
                  </h2>
                </span>
                <span className="shrink-0 font-display text-sm font-medium text-white/85">{hero.credentialsTitle}</span>
              </div>

              <dl className="engraved mx-3 mt-3 grid grid-cols-2 border border-black/25 sm:mx-4">
                {cells.map((c, i) => (
                  <div
                    key={c.label}
                    className={`border-b border-black/20 px-3 py-2.5 ${
                      // si queda una celda impar al final, ocupa las dos columnas
                      i === cells.length - 1 && i % 2 === 0 ? "col-span-2" : i % 2 === 0 ? "border-r" : ""
                    }`}
                  >
                    <dt className="font-label text-[0.8rem] font-medium text-black/60">{c.label}</dt>
                    <dd className="font-display text-[1.05rem] font-semibold leading-snug text-black">{c.value}</dd>
                  </div>
                ))}
                {sede && (
                  <div className="col-span-2 px-3 py-2.5">
                    <dt className="font-label text-[0.8rem] font-medium text-black/60">{sede.label}</dt>
                    <dd className="font-display text-[1.05rem] font-semibold leading-snug text-black">{sede.value}</dd>
                  </div>
                )}
              </dl>

              <dl className="engraved mx-3 mb-3 mt-3 grid grid-cols-3 gap-2 sm:mx-4">
                <Stamp label="Edificios" value="Hasta 38 pisos" />
                <Stamp label="Normas" value="NFPA" />
                <Stamp label="Ámbito" value="Lima" />
              </dl>
            </Nameplate>
          </aside>
        </div>
      </section>

      {/* Índice de especialidades: acceso directo a cada pilar */}
      <section aria-labelledby="indice-especialidades" className="border-b border-grain">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 id="indice-especialidades" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Especialidades
            </h2>
            <Link href="/especialidades/" className="py-2 text-sm font-medium text-graphite underline decoration-rule underline-offset-4 hover:decoration-accent">
              Ver los esquemas técnicos
            </Link>
          </div>
          <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {services.items.map((s) => (
              <li key={s.slug} className="border-t-[3px] border-ink pt-4">
                <Link href={`/especialidades/#${s.slug}`} className="group block">
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-2xl font-semibold leading-tight text-ink group-hover:text-accent">{s.title}</span>
                    {s.ciiu && <span className="shrink-0 font-label text-sm text-muted">{s.ciiu}</span>}
                  </span>
                  <span className="mt-2 block max-w-[60ch] text-[0.95rem] leading-relaxed text-graphite">{s.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}


/** Celda estampada inferior de la placa (años, actividad, ámbito). */
function Stamp({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-black/25 px-2.5 py-1.5">
      <dt className="font-label text-[0.75rem] font-medium text-black/60">{label}</dt>
      <dd className="font-display text-lg font-bold leading-tight tabular-nums text-black">{value}</dd>
    </div>
  );
}
