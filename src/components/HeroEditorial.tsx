import Link from "next/link";
import { kgm, yearsOperating } from "@/data/kgm-data";

export default function HeroEditorial() {
  const { hero, credentials, identity, services } = kgm;
  const years = yearsOperating();

  // La ficha toma los datos de credenciales: encabezado (razón social + RUC),
  // celdas intermedias en dos columnas y la sede a todo el ancho.
  const [, , ...rest] = credentials;
  const sede = rest.find((c) => c.label === "Sede operativa");
  const cells = rest.filter((c) => c !== sede);

  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 sm:py-16 lg:grid-cols-12 lg:gap-14 lg:py-24">
          <div className="lg:col-span-7">
            <p className="mb-6 font-mono text-xs uppercase tracking-wider text-white/70">{hero.eyebrow}</p>
            <h1 className="max-w-[22ch] text-balance break-words font-display text-[2rem] leading-[1.12] sm:text-5xl lg:text-[3.4rem]">
              {hero.headline}
            </h1>
            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-white/80 sm:mt-8">{hero.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
              <Link
                href="/cotizacion/"
                className="rounded-[4px] border border-accent bg-accent px-5 py-3.5 text-center text-sm font-medium text-white transition-colors hover:border-accent-hover hover:bg-accent-hover"
              >
                {hero.primaryCta}
              </Link>
              <Link
                href="/especialidades/"
                className="rounded-[4px] border border-white/40 px-5 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                {hero.secondaryCta}
              </Link>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6">
              <div>
                <dt className="text-xs text-white/65">Años en operación</dt>
                <dd className="mt-1 font-display text-3xl tabular-nums">{years}</dd>
              </div>
              <div>
                <dt className="text-xs text-white/65">Especialidades</dt>
                <dd className="mt-1 font-display text-3xl tabular-nums">{services.items.length}</dd>
              </div>
              <div>
                <dt className="text-xs text-white/65">Ámbito</dt>
                <dd className="mt-1 font-display text-3xl">Lima</dd>
              </div>
            </dl>
          </div>

          <aside className="lg:col-span-5" aria-labelledby="ficha-tecnica">
            <div className="overflow-hidden rounded-[6px] bg-canvas text-ink shadow-xl shadow-black/20">
              <div className="flex items-center justify-between border-b border-grain bg-paper px-5 py-3">
                <h2 id="ficha-tecnica" className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
                  {hero.credentialsTitle}
                </h2>
                <span className="flex items-center gap-2 font-mono text-xs text-signal">
                  <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                  {identity.status}
                </span>
              </div>

              <div className="border-b border-grain px-5 py-4">
                <p className="font-display text-xl leading-tight">{identity.name}</p>
                <p className="mt-1 font-mono text-sm tabular-nums text-muted">RUC {identity.ruc}</p>
              </div>

              <dl className="grid grid-cols-2">
                {cells.map((c, i) => (
                  <div
                    key={c.label}
                    className={`border-b border-grain px-5 py-3 ${
                      // si queda una celda impar al final, ocupa las dos columnas
                      i === cells.length - 1 && i % 2 === 0 ? "col-span-2" : i % 2 === 0 ? "border-r" : ""
                    }`}
                  >
                    <dt className="text-xs text-muted">{c.label}</dt>
                    <dd className="mt-1 text-sm font-medium leading-snug text-ink">{c.value}</dd>
                  </div>
                ))}
                {sede && (
                  <div className="col-span-2 px-5 py-3">
                    <dt className="text-xs text-muted">{sede.label}</dt>
                    <dd className="mt-1 text-sm font-medium leading-snug text-ink">{sede.value}</dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* Índice de especialidades: acceso directo a cada pilar */}
      <section aria-labelledby="indice-especialidades" className="border-b border-grain">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent">Qué hacemos</p>
              <h2 id="indice-especialidades" className="font-display text-2xl sm:text-3xl lg:text-4xl">
                {services.title}
              </h2>
            </div>
            <Link href="/especialidades/" className="py-2 text-sm font-medium text-ink underline decoration-rule underline-offset-4 hover:decoration-accent">
              Ver esquemas técnicos →
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.items.map((s) => (
              <li key={s.code}>
                <Link
                  href={`/especialidades/#${s.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-[6px] border border-grain bg-canvas p-5 transition-all hover:-translate-y-0.5 hover:border-rule hover:shadow-md"
                >
                  <span className="flex items-baseline justify-between font-mono text-xs text-muted">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-[4px] bg-navy/5 font-display text-base text-navy">
                      {s.code}
                    </span>
                    {s.ciiu && <span className="tabular-nums">{s.ciiu}</span>}
                  </span>
                  <span className="font-display text-lg leading-snug text-ink group-hover:text-accent">{s.title}</span>
                  <span className="text-sm leading-relaxed text-muted">{s.description}</span>
                  <span className="mt-auto pt-2 text-sm font-medium text-accent">Ver más →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
