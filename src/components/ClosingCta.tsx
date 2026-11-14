import Link from "next/link";
import { kgm, whatsappHref } from "@/data/kgm-data";

/** Llamado final antes del pie: cotizar o contactar directamente. */
export default function ClosingCta() {
  const { closing, contact, nav } = kgm;
  const wa = whatsappHref("Hola, quisiera coordinar una inspección técnica.");

  return (
    <section aria-labelledby="cierre" className="bg-navy text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-16">
        <div>
          <h2 id="cierre" className="text-balance font-display text-2xl sm:text-3xl">
            {closing.title}
          </h2>
          <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-white/80">{closing.text}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link
            href="/cotizacion/"
            className="rounded-[4px] border border-accent bg-accent px-5 py-3.5 text-center text-sm font-medium text-white transition-colors hover:border-accent-hover hover:bg-accent-hover"
          >
            {nav.cta}
          </Link>
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[4px] border border-white/40 px-5 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Escribir por WhatsApp
            </a>
          ) : (
            <a
              href={`mailto:${contact.email}`}
              className="rounded-[4px] border border-white/40 px-5 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              {contact.email}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
