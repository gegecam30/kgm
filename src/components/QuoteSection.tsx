"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { kgm, findSymptoms, whatsappHref } from "@/data/kgm-data";

interface QuoteForm {
  name: string;
  company: string;
  email: string;
  phone: string;
  area: string;
  scope: string;
}

const fieldClass =
  "w-full rounded-[2px] border border-rule bg-paper px-3.5 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:text-sm";
const labelClass = "font-label text-sm text-muted";

export default function QuoteSection() {
  const { contact, identity, services } = kgm;
  const { form } = contact;
  const options = services.items;

  const [values, setValues] = useState<QuoteForm>({
    name: "",
    company: "",
    email: "",
    phone: "",
    area: options[0].slug,
    scope: "",
  });
  // "sent" = se abrió el correo (mailto) · "ok" = el servicio de formularios confirmó la recepción
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "ok" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const useEndpoint = Boolean(contact.formEndpoint);

  // Preselecciona la especialidad cuando se llega desde "Cotizar esta especialidad" (?area=redes)
  // y, si viene del diagnóstico rápido (?sintomas=fuga,tablero), deja los síntomas en el alcance.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const area = params.get("area");
    if (area && options.some((o) => o.slug === area)) setValues((v) => ({ ...v, area }));
    const found = findSymptoms((params.get("sintomas") ?? "").split(","));
    if (found.length) {
      const lines = found.map(({ symptom }) => `- ${symptom.label}`);
      setValues((v) => ({ ...v, scope: `${kgm.diagnosis.scopeHeading}:\n${lines.join("\n")}\n\n` }));
    }
  }, [options]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const areaTitle = options.find((o) => o.slug === values.area)?.title ?? "";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (useEndpoint) {
      setStatus("sending");
      try {
        const res = await fetch(contact.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...values, area: areaTitle, _subject: `${form.subjectPrefix}: ${areaTitle}` }),
        });
        setStatus(res.ok ? "ok" : "error");
      } catch {
        setStatus("error");
      }
      return;
    }
    const subject = `${form.subjectPrefix}: ${areaTitle}`;
    const body = [
      `${form.name}: ${values.name}`,
      `${form.company}: ${values.company}`,
      `${form.email}: ${values.email}`,
      values.phone ? `Teléfono: ${values.phone}` : null,
      `${form.area}: ${areaTitle}`,
      "",
      `${form.scope}:`,
      values.scope,
    ]
      .filter((l): l is string => l !== null)
      .join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const wa = whatsappHref(`Hola, quisiera una cotización técnica para: ${areaTitle}.`);

  const legal = [
    { label: contact.labels.address, value: contact.address },
    { label: contact.labels.email, value: contact.email, href: `mailto:${contact.email}` },
    contact.phone && { label: contact.labels.phone, value: contact.phone, href: `tel:${contact.phone.replace(/[^\d+]/g, "")}` },
    { label: contact.labels.hours, value: contact.hours },
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-12 border-b border-grain pb-8">
          <p className="mb-3 text-sm text-muted">
              Atención directa en Lima Metropolitana
          </p>
          <h1 className="font-display text-4xl font-semibold leading-none sm:text-5xl lg:text-6xl">{contact.title}</h1>
          <p className="mt-3 max-w-[56ch] text-base leading-relaxed text-muted">{contact.intro}</p>
        </header>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 rounded-[2px] border border-grain bg-surface/30 p-5 sm:p-8 lg:col-span-7">
            <h2 className="mb-6 font-label text-sm font-medium text-accent">Pliego de requerimiento técnico</h2>

            <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
              <Field label={form.name}>
                <input required autoComplete="name" placeholder="Ej.: Ing. Carlos Mendoza" name="name" value={values.name} onChange={onChange} className={fieldClass} />
              </Field>
              <Field label={form.company}>
                <input required autoComplete="organization" placeholder="Empresa o edificio" name="company" value={values.company} onChange={onChange} className={fieldClass} />
              </Field>
              <Field label={form.email}>
                <input required type="email" autoComplete="email" placeholder="correo@empresa.pe" name="email" value={values.email} onChange={onChange} className={fieldClass} />
              </Field>
              <Field label={form.phone}>
                <input type="tel" autoComplete="tel" inputMode="tel" placeholder="9XX XXX XXX" name="phone" value={values.phone} onChange={onChange} className={fieldClass} />
              </Field>
              <Field label={form.area} wide>
                <select name="area" value={values.area} onChange={onChange} className={`${fieldClass} cursor-pointer`}>
                  {options.map((o) => (
                    <option key={o.slug} value={o.slug}>
                      {o.title}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={form.scope} wide>
                <textarea required rows={5} name="scope" value={values.scope} onChange={onChange} placeholder={form.scopePlaceholder} className={fieldClass} />
              </Field>

              <div className="flex flex-col gap-3 pt-2 sm:col-span-2">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full rounded-[2px] border border-accent bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:border-accent-hover hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                  >
                    {useEndpoint ? (status === "sending" ? form.sending : form.send) : form.submit}
                  </button>
                  {status === "idle" && !useEndpoint && (
                    <p className="text-sm text-muted">Se abrirá su programa de correo con los datos completos.</p>
                  )}
                </div>
                <p className="text-xs text-muted">
                  {form.privacyNote}{" "}
                  <Link href="/privacidad/" className="underline underline-offset-4 hover:text-ink">
                    Política de privacidad
                  </Link>
                </p>
                <div role="status" aria-live="polite">
                  {status === "ok" && (
                    <div className="rounded-[2px] border-l-[3px] border-signal bg-paper px-4 py-3 text-sm leading-relaxed text-ink">
                      {form.sentOk}
                    </div>
                  )}
                  {(status === "sent" || status === "error") && (
                    <div className="rounded-[2px] border-l-[3px] border-accent bg-paper px-4 py-3 text-sm leading-relaxed text-ink">
                      {status === "sent" && <p>{form.success}</p>}
                      <p className={status === "sent" ? "mt-1 text-muted" : ""}>
                        {status === "sent" ? form.fallback : form.error}{" "}
                        <a href={`mailto:${contact.email}`} className="inline-block break-all py-1 font-medium text-ink underline underline-offset-4">
                          {contact.email}
                        </a>{" "}
                        <button type="button" onClick={copyEmail} className="ml-1 min-h-10 px-1 font-label text-sm text-accent underline-offset-4 hover:underline">
                          {copied ? "Copiado" : "Copiar"}
                        </button>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          <aside className="min-w-0 rounded-[2px] border border-grain bg-paper p-5 sm:p-8 lg:col-span-5" aria-labelledby="sede">
            <h2 id="sede" className="border-b border-grain pb-3 font-label text-sm font-medium text-accent">
              {contact.legalTitle}
            </h2>

            <div className="mt-6 border-b border-grain pb-5">
              <p className="font-display text-2xl leading-snug tracking-tight">{identity.name}</p>
              <p className="mt-1 font-label text-sm tabular-nums text-muted">
                RUC {identity.ruc} · {identity.status}
              </p>
            </div>

            <dl className="mt-6 grid gap-5">
              {legal.map(({ label, value, href }) => (
                <div key={label} className="border-b border-grain/60 pb-3 last:border-0 last:pb-0">
                  <dt className={labelClass}>{label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink">
                    {href ? (
                      <a href={href} className="inline-block break-all py-1 underline decoration-grain underline-offset-4 hover:decoration-accent">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-between gap-3 rounded-[2px] border border-ink px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface"
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-signal" />
                  Escribir por WhatsApp
                </span>
                <span aria-hidden>↗</span>
              </a>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({ label, wide, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <label className={`grid gap-2 ${wide ? "sm:col-span-2" : ""}`}>
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}
