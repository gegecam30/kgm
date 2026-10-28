"use client";

import Link from "next/link";
import { kgm } from "@/data/kgm-data";
import { useSectionIndex } from "./SiteShell";

export default function Navbar() {
  const { identity, nav, sections } = kgm;
  const index = useSectionIndex();
  const onQuote = sections[index]?.href === "/cotizacion/";

  return (
    <header className="sticky top-0 z-40 border-b border-grain bg-canvas/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-baseline gap-4">
          <Link href="/" className="font-serif text-xl tracking-tight text-ink transition-opacity hover:opacity-80">
            <span className="sm:hidden">{identity.shortName}</span>
            <span className="hidden sm:inline">{identity.name}</span>
          </Link>
          <span className="hidden font-mono text-xs tabular-nums text-muted lg:inline">
            {nav.rucLabel} {identity.ruc}
          </span>
        </div>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {sections.map((s, i) => (
              <li key={s.href}>
                <NavLink href={s.href} active={i === index}>
                  {s.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/cotizacion/"
          aria-current={onQuote ? "page" : undefined}
          className={`shrink-0 rounded-[4px] border border-terracotta px-3.5 py-2 text-sm font-medium text-canvas transition-colors sm:px-4 ${
            onQuote ? "bg-terracotta-hover" : "bg-terracotta hover:border-terracotta-hover hover:bg-terracotta-hover"
          }`}
        >
          <span className="sm:hidden">Cotizar</span>
          <span className="hidden sm:inline">{nav.cta}</span>
        </Link>
      </div>

      {/* Móvil: acceso directo a cada sección */}
      <nav aria-label="Secciones (móvil)" className="border-t border-grain md:hidden">
        <ul className="mx-auto flex max-w-7xl justify-between px-4">
          {sections.map((s, i) => (
            <li key={s.href}>
              <NavLink href={s.href} active={i === index} compact>
                {s.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  active,
  compact,
  children,
}: {
  href: string;
  active: boolean;
  compact?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative inline-block font-mono text-xs transition-colors ${compact ? "py-2.5" : "py-1"} ${
        active
          ? `font-semibold text-ink after:absolute after:inset-x-0 after:h-[2px] after:bg-terracotta ${compact ? "after:bottom-0" : "after:-bottom-1"}`
          : "text-muted hover:text-ink"
      }`}
    >
      {children}
    </Link>
  );
}
