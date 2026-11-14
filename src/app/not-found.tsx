import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <p className="mb-6 text-sm text-muted">
              Error 404
      </p>
      <h1 className="max-w-[22ch] font-display text-4xl leading-tight tracking-tight sm:text-5xl">
        Esta página no existe o cambió de dirección.
      </h1>
      <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted">
        Revise la dirección o vuelva al inicio para ver nuestras especialidades.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="rounded-[2px] border border-accent bg-accent px-5 py-3 text-sm font-medium text-white hover:bg-accent-hover">
          Ir al inicio
        </Link>
        <Link href="/cotizacion/" className="rounded-[2px] border border-rule px-5 py-3 text-sm font-medium text-ink hover:bg-surface">
          Solicitar cotización
        </Link>
      </div>
    </section>
  );
}
