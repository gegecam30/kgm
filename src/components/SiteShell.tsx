import Link from "next/link";
import { kgm, whatsappHref } from "@/data/kgm-data";
import Navbar from "./Navbar";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-canvas text-ink">
      <Navbar />

      <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}

function SiteFooter() {
  const { identity, contact, services, nav, footer, footerNote } = kgm;
  const wa = whatsappHref();
  const linkClass = "inline-block py-1 text-white/80 transition-colors hover:text-white";

  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p className="font-display text-xl">{identity.name}</p>
          <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-white/75">{footer.about}</p>
          <ul className="mt-5 grid gap-1 font-mono text-xs text-white/70">
            <li>RUC {identity.ruc} · {identity.status}</li>
            <li>Proveedor habilitado RNP (OSCE)</li>
            <li>Personal con SCTR vigente</li>
          </ul>
        </div>

        <nav aria-labelledby="pie-especialidades" className="lg:col-span-3">
          <h2 id="pie-especialidades" className="mb-3 font-mono text-xs uppercase tracking-wider text-white/60">
            Especialidades
          </h2>
          <ul className="grid gap-1 text-sm">
            {services.items.map((s) => (
              <li key={s.slug}>
                <Link href={`/especialidades/#${s.slug}`} className={linkClass}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="pie-empresa" className="lg:col-span-2">
          <h2 id="pie-empresa" className="mb-3 font-mono text-xs uppercase tracking-wider text-white/60">
            Empresa
          </h2>
          <ul className="grid gap-1 text-sm">
            {nav.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacidad/" className={linkClass}>
                Política de privacidad
              </Link>
            </li>
            {contact.complaintsBookUrl && (
              <li>
                <a href={contact.complaintsBookUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Libro de Reclamaciones
                </a>
              </li>
            )}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-white/60">Contacto</h2>
          <ul className="grid gap-3 text-sm text-white/80">
            <li>
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {contact.address} <span aria-hidden>↗</span>
              </a>
            </li>
            {contact.phone && (
              <li>
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="hover:text-white">
                  {contact.phone}
                </a>
              </li>
            )}
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${contact.email}`} className="break-all hover:text-white">
                {contact.email}
              </a>
            </li>
            <li className="text-white/65">{contact.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-5 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {identity.name}
          </p>
          <p>{footerNote}</p>
        </div>
      </div>
    </footer>
  );
}

/** Botón flotante de WhatsApp. Solo aparece si hay número configurado. */
function WhatsAppFloat() {
  const wa = whatsappHref("Hola, quisiera una cotización técnica.");
  if (!wa) return null;
  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-signal text-white shadow-lg transition-transform hover:scale-105"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
      </svg>
    </a>
  );
}
