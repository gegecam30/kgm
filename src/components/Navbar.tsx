"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { kgm } from "@/data/kgm-data";

/** "/especialidades" y "/especialidades/" son la misma ruta. */
function normalizePath(p: string | null): string {
  if (!p) return "/";
  return p.endsWith("/") ? p : `${p}/`;
}

export default function Navbar() {
  const { identity, nav, contact } = kgm;
  const pathname = normalizePath(usePathname());
  const [open, setOpen] = useState(false);
  const onQuote = pathname === "/cotizacion/";

  // El menú móvil se cierra al cambiar de página.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => !href.includes("#") && href === pathname;

  return (
    <header className="sticky top-0 z-40 border-b border-grain bg-canvas/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3 py-1 text-ink transition-opacity hover:opacity-80">
          <span aria-hidden className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-navy font-mono text-sm font-semibold text-white">
            KGM
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-base">
              <span className="sm:hidden">{identity.shortName}</span>
              <span className="hidden sm:inline">{identity.name}</span>
            </span>
            <span className="hidden font-mono text-xs tabular-nums text-muted sm:block">
              {nav.rucLabel} {identity.ruc}
            </span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`relative py-1 text-sm font-medium transition-colors ${
                    isActive(l.href)
                      ? "text-ink after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] after:bg-accent"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {contact.phone && (
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="hidden whitespace-nowrap px-2 font-mono text-sm text-ink hover:text-accent xl:inline"
            >
              {contact.phone}
            </a>
          )}
          <Link
            href="/cotizacion/"
            aria-current={onQuote ? "page" : undefined}
            className={`hidden min-h-11 items-center rounded-[4px] border border-accent px-4 text-sm font-medium text-white transition-colors sm:inline-flex ${
              onQuote ? "bg-accent-hover" : "bg-accent hover:border-accent-hover hover:bg-accent-hover"
            }`}
          >
            {nav.cta}
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex min-h-11 items-center gap-2 rounded-[4px] border border-rule px-3 text-sm font-medium text-ink hover:bg-surface lg:hidden"
          >
            <span aria-hidden className="relative block h-3 w-4">
              <span className={`absolute left-0 h-[2px] w-4 bg-current transition-transform ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-[5px] h-[2px] w-4 bg-current ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-[2px] w-4 bg-current transition-transform ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
            </span>
            Menú
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Principal (móvil)" className="border-t border-grain bg-canvas lg:hidden">
          <ul className="mx-auto grid max-w-7xl px-4 py-2 sm:px-6">
            {nav.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`flex min-h-12 items-center border-b border-grain text-base ${
                    isActive(l.href) ? "font-semibold text-accent" : "text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {contact.phone && (
              <li>
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="flex min-h-12 items-center border-b border-grain font-mono text-base text-ink">
                  Llamar: {contact.phone}
                </a>
              </li>
            )}
            <li className="py-3 sm:hidden">
              <Link
                href="/cotizacion/"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-center rounded-[4px] bg-accent text-base font-medium text-white hover:bg-accent-hover"
              >
                {nav.cta}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
