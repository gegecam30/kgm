import Link from "next/link";
import { kgm, yearsOperating } from "@/data/kgm-data";

export default function HeroEditorial() {
  const { hero, credentials, identity, services } = kgm;
  const years = yearsOperating();

  // El cajetín toma los datos de la ficha: encabezado (razón social + RUC),
  // celdas intermedias en dos columnas y la sede a todo el ancho.
  const [, , ...rest] = credentials;
  const sede = rest.find((c) => c.label === "Sede operativa");
  const cells = rest.filter((c) => c !== sede);

  return (
    <>
      <section className="border-b border-grain">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-7">
            <p className="mb-8 flex items-center gap-3 font-mono text-xs text-muted">
              <span aria-hidden className="inline-block h-2 w-2 bg-terracotta" />
              {hero.eyebrow}
            </p>
            <h1 className="max-w-[20ch] text-balance [hyphens:auto] sm:[hyphens:manual] font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.75rem]">
              {hero.headline}
            </h1>
            <p className="mt-8 max-w-[52ch] font-serif text-lg leading-relaxed text-muted sm:text-xl">{hero.summary}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/cotizacion/"
                className="rounded-[4px] border border-terracotta bg-terracotta px-5 py-3 text-sm font-medium text-canvas transition-colors hover:border-terracotta-hover hover:bg-terracotta-hover"
              >
                {hero.primaryCta}
              </Link>
              <Link
                href="/especialidades/"
                className="rounded-[4px] border border-rule px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface"
              >
                {hero.secondaryCta}
              </Link>
            </div>
          </div>

          {/* Cajetín de plano: la ficha técnica se presenta como el rótulo de un plano de obra */}
          <aside className="lg:col-span-5 lg:pt-2" aria-labelledby="ficha-tecnica">
            <div className="relative border-[1.5px] border-ink bg-paper">
              <Registration className="-left-[5px] -top-[5px]" />
              <Registration className="-right-[5px] -top-[5px]" />
              <Registration className="-bottom-[5px] -left-[5px]" />
              <Registration className="-bottom-[5px] -right-[5px]" />

              <div className="flex items-center justify-between border-b border-ink px-4 py-2">
                <h2 id="ficha-tecnica" className="font-mono text-xs font-semibold text-ink">
                  {hero.credentialsTitle}
                </h2>
                <span className="font-mono text-xs tabular-nums text-muted">Hoja 01 / 04</span>
              </div>

              <div className="border-b border-grain px-4 py-4">
                <p className="font-serif text-2xl leading-tight tracking-tight">{identity.name}</p>
                <p className="mt-1 font-mono text-sm tabular-nums text-muted">RUC {identity.ruc}</p>
              </div>

              <dl className="grid grid-cols-2">
                {cells.map((c, i) => (
                  <div
                    key={c.label}
                    className={`border-b border-grain px-4 py-3 ${
                      // si queda una celda impar al final, ocupa las dos columnas
                      i === cells.length - 1 && i % 2 === 0 ? "col-span-2" : i % 2 === 0 ? "border-r" : ""
                    }`}
                  >
                    <dt className="font-mono text-[0.6875rem] text-muted">{c.label}</dt>
                    <dd className="mt-1 text-sm font-medium leading-snug text-ink">{c.value}</dd>
                  </div>
                ))}
                {sede && (
                  <div className="col-span-2 border-b border-ink px-4 py-3">
                    <dt className="font-mono text-[0.6875rem] text-muted">{sede.label}</dt>
                    <dd className="mt-1 text-sm font-medium leading-snug text-ink">{sede.value}</dd>
                  </div>
                )}
              </dl>

              <dl className="grid grid-cols-3 font-mono text-xs">
                <div className="border-r border-grain px-4 py-2.5">
                  <dt className="text-[0.6875rem] text-muted">Años en operación</dt>
                  <dd className="mt-0.5 text-base font-semibold tabular-nums text-terracotta">{years}</dd>
                </div>
                <div className="border-r border-grain px-4 py-2.5">
                  <dt className="text-[0.6875rem] text-muted">Actividad</dt>
                  <dd className="mt-0.5 tabular-nums text-ink">{identity.ciiu.map((c) => c.replace("CIIU ", "")).join(" / ")}</dd>
                </div>
                <div className="px-4 py-2.5">
                  <dt className="text-[0.6875rem] text-muted">Ámbito</dt>
                  <dd className="mt-0.5 text-ink">Lima</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* Índice de especialidades: acceso directo a cada pilar */}
      <section aria-labelledby="indice-especialidades" className="border-b border-grain">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="indice-especialidades" className="font-serif text-2xl tracking-tight sm:text-3xl">
              Especialidades
            </h2>
            <Link href="/especialidades/" className="font-mono text-xs text-muted underline-offset-4 hover:text-ink hover:underline">
              Ver los cuatro esquemas técnicos
            </Link>
          </div>
          {/* gap-px sobre fondo grain = líneas de 1px entre celdas en cualquier número de columnas */}
          <ul className="grid gap-px border-y border-grain border-t-ink bg-grain sm:grid-cols-2 lg:grid-cols-4">
            {services.items.map((s) => (
              <li key={s.code} className="bg-canvas">
                <Link
                  href={`/especialidades/#${s.slug}`}
                  className="group flex h-full flex-col gap-3 p-5 transition-colors hover:bg-paper lg:min-h-[13rem]"
                >
                  <span className="flex items-baseline justify-between font-mono text-xs text-muted">
                    <span className="font-serif text-2xl text-terracotta">{s.code}</span>
                    {s.ciiu && <span className="tabular-nums">{s.ciiu}</span>}
                  </span>
                  <span className="font-serif text-lg leading-snug tracking-tight text-ink group-hover:underline group-hover:decoration-terracotta group-hover:underline-offset-4">
                    {s.title}
                  </span>
                  <span className="text-sm leading-relaxed text-muted">{s.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

/** Marca de registro en las esquinas del cajetín, como en un plano impreso. */
function Registration({ className }: { className: string }) {
  return <span aria-hidden className={`absolute h-2 w-2 bg-terracotta ${className}`} />;
}
