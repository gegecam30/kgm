"use client";

import { useEffect, useRef, useState } from "react";
import { kgm, publicPath, type GalleryItem } from "@/data/kgm-data";

export default function Gallery() {
  const { gallery, services } = kgm;
  const specialtyTitle = (slug: string) => services.items.find((s) => s.slug === slug)?.title ?? "";

  return (
    <section id="trabajos" aria-labelledby="trabajos-titulo" className="scroll-mt-20 border-b border-grain bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
        <header className="mb-8 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent">{gallery.eyebrow}</p>
            <h2 id="trabajos-titulo" className="text-balance font-display text-2xl sm:text-3xl lg:text-4xl">
              {gallery.title}
            </h2>
          </div>
          <p className="max-w-[48ch] self-end text-base leading-relaxed text-muted lg:col-span-5">{gallery.intro}</p>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.items.map((item, i) => (
            <li key={i}>
              <figure className="overflow-hidden rounded-[4px] border border-grain bg-canvas">
                <Photo item={item} />
                <figcaption className="border-t border-grain px-4 py-3">
                  <p className="text-sm font-medium text-ink">{item.caption}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted">{specialtyTitle(item.specialty)}</p>
                </figcaption>
              </figure>
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
function Photo({ item }: { item: GalleryItem }) {
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
        <span className="font-mono text-xs">{label}</span>
      </span>
    </div>
  );
}
