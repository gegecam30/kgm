"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { kgm, publicPath, type GalleryItem } from "@/data/kgm-data";

export default function Gallery() {
  const { gallery, services, references } = kgm;
  const [filter, setFilter] = useState<string | null>(null);
  const specialtyTitle = (slug: string) => services.items.find((s) => s.slug === slug)?.title ?? "";
  const items = gallery.items.filter((g) => !filter || g.specialty === filter);

  return (
    <section aria-labelledby="trabajos-titulo" className="py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-10 grid gap-6 border-b border-grain pb-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-3 text-sm text-muted">{gallery.eyebrow}</p>
            <h1 id="trabajos-titulo" className="text-balance font-display text-4xl font-semibold leading-none text-ink sm:text-5xl lg:text-6xl">
              {gallery.title}
            </h1>
          </div>
          <p className="max-w-[48ch] self-end text-base leading-relaxed text-graphite lg:col-span-5">{gallery.intro}</p>
        </header>

        {/* Obras y clientes de referencia (brochure KGM) */}
        <div className="mb-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="border-t-[3px] border-ink pt-3 font-display text-2xl font-semibold text-ink">{references.buildingsTitle}</h2>
            <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
              {references.buildings.map((b) => (
                <li key={b.name} className="flex items-baseline justify-between gap-4 border-b border-grain py-2.5">
                  <span className="font-display text-lg font-medium text-ink">{b.name}</span>
                  {b.detail && <span className="shrink-0 font-label text-base text-accent">{b.detail}</span>}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <h2 className="border-t-[3px] border-ink pt-3 font-display text-2xl font-semibold text-ink">{references.clientsTitle}</h2>
            <ul className="mt-4 grid gap-1.5 text-[0.95rem] leading-snug text-graphite">
              {references.clients.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="mb-4 border-t-[3px] border-ink pt-3 font-display text-2xl font-semibold text-ink">Registro fotográfico</h2>

        {/* Filtro por especialidad: útil cuando la galería crezca */}
        <div role="group" aria-label="Filtrar por especialidad" className="mb-8 flex flex-wrap gap-2">
          {[{ slug: null, title: "Todas" }, ...services.items].map((s) => {
            const active = filter === s.slug;
            return (
              <button
                key={s.slug ?? "todas"}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(s.slug)}
                className={`rounded-[2px] border px-3 py-1.5 font-label text-base transition-colors ${
                  active ? "border-ink bg-ink text-canvas" : "border-rule text-graphite hover:border-ink"
                }`}
              >
                {s.title}
              </button>
            );
          })}
        </div>

        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.slug}>
              {/* Al pasar el cursor la tarjeta se eleva, la foto se acerca y aparece el filo rojo */}
              <Link
                href={`/trabajos/${item.slug}/`}
                className="group block transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:-translate-y-1"
              >
                <figure>
                  <div className="overflow-hidden border border-steel p-1.5 transition-[border-color,box-shadow] duration-300 group-hover:border-accent group-hover:shadow-[0_18px_30px_-18px_rgba(0,0,0,0.55)] group-focus-visible:border-accent">
                    <div className="overflow-hidden">
                      <div className="transition-transform duration-500 ease-out group-hover:scale-[1.05] group-focus-visible:scale-[1.05]">
                        <Photo item={item} />
                      </div>
                    </div>
                  </div>
                  <figcaption className="mt-3">
                    <p className="font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-accent">{item.caption}</p>
                    <p className="mt-0.5 flex items-baseline justify-between gap-3 text-sm text-muted">
                      {specialtyTitle(item.specialty)}
                      <span className="translate-x-[-4px] font-medium text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                        Ver ficha
                      </span>
                    </p>
                    <span aria-hidden className="mt-2 block h-[3px] w-0 bg-accent transition-[width] duration-500 ease-out group-hover:w-full group-focus-visible:w-full" />
                  </figcaption>
                </figure>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type Status = "pending" | "loading" | "loaded" | "error";

/**
 * Foto con marco de carga: mientras llega la imagen se ve un esqueleto animado
 * (o la versión borrosa `lqip` si existe), así el espacio nunca queda vacío con mala señal.
 * El marco tiene proporción fija para que la página no salte al cargar.
 */
export function Photo({ item }: { item: GalleryItem }) {
  const [status, setStatus] = useState<Status>(item.src ? "loading" : "pending");
  const imgRef = useRef<HTMLImageElement>(null);

  // Si la foto ya estaba en caché, puede terminar de cargar antes de que React escuche onLoad.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) setStatus(img.naturalWidth > 0 ? "loaded" : "error");
  }, []);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-surface">
      {status !== "loaded" && <Skeleton status={status} />}

      {item.src && item.lqip && status !== "loaded" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={publicPath(item.lqip)} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover blur-lg" />
      )}

      {item.src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={publicPath(item.src)}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}

function Skeleton({ status }: { status: Exclude<Status, "loaded"> }) {
  const label = { pending: "Foto pendiente", loading: "Cargando foto…", error: "No se pudo cargar la foto" }[status];
  return (
    <div role={status === "loading" ? "status" : undefined} className="absolute inset-0 flex items-center justify-center">
      {status === "loading" && (
        <span aria-hidden className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      )}
      <span className="relative flex flex-col items-center gap-2 text-muted">
        <svg aria-hidden viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <circle cx="9" cy="10" r="1.75" />
          <path d="m21 16-5-5-8 8" />
        </svg>
        <span className="font-label text-sm">{label}</span>
      </span>
    </div>
  );
}
