import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo } from "@/components/Gallery";
import { kgm, absoluteUrl } from "@/data/kgm-data";

// Una ficha por trabajo de la galería (sitio estático: se generan todas al compilar).
export function generateStaticParams() {
  return kgm.gallery.items.map((g) => ({ slug: g.slug }));
}

function findItem(slug: string) {
  return kgm.gallery.items.find((g) => g.slug === slug);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = findItem(params.slug);
  if (!item) return {};
  return {
    title: item.caption,
    description: item.description || item.alt,
    alternates: { canonical: absoluteUrl(`/trabajos/${item.slug}/`) },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const item = findItem(params.slug);
  if (!item) notFound();
  const specialty = kgm.services.items.find((s) => s.slug === item.specialty);

  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Link href="/trabajos/" className="text-sm font-medium text-muted underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-accent">
          Volver a trabajos
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="border border-steel p-2">
              <Photo item={item} />
            </div>
          </div>

          <div className="lg:col-span-4">
            {specialty && (
              <Link href={`/especialidades/#${specialty.slug}`} className="text-sm text-muted hover:text-accent">
                {specialty.title}
              </Link>
            )}
            <h1 className="mt-2 text-balance font-display text-4xl font-semibold leading-none text-ink sm:text-5xl">{item.caption}</h1>
            <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-graphite">
              {item.description || "Estamos preparando la ficha de este trabajo, con el alcance, los equipos instalados y el registro fotográfico completo."}
            </p>
            <Link
              href={`/cotizacion/?area=${item.specialty}`}
              className="mt-8 inline-block rounded-[2px] bg-accent px-6 py-3.5 font-display text-lg font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Cotizar un trabajo similar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
