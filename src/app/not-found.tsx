import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <p className="mb-6 flex items-center gap-3 font-mono text-xs text-muted">
        <span aria-hidden className="inline-block h-2 w-2 bg-terracotta" />
        Error 404
      </p>
      <h1 className="max-w-[22ch] font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
        Esta página no existe o cambió de dirección.
      </h1>
      <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted">
        Revise la dirección o vuelva al inicio para ver nuestras especialidades.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="rounded-[4px] border border-terracotta bg-terracotta px-5 py-3 text-sm font-medium text-canvas hover:bg-terracotta-hover">
          Ir al inicio
        </Link>
        <Link href="/cotizacion/" className="rounded-[4px] border border-rule px-5 py-3 text-sm font-medium text-ink hover:bg-surface">
          Solicitar cotización
        </Link>
      </div>
    </section>
  );
}
