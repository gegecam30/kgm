"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { kgm } from "@/data/kgm-data";
import type { ViewScenario } from "./Navbar";

interface QuoteForm {
  name: string;
  company: string;
  email: string;
  area: string;
  scope: string;
}

interface TechnicalFooterProps {
  onNavigate?: (view: ViewScenario) => void;
}

// User specified input styling: background #FAF9F5, border #C8C5B8, focus border #B8332A
const fieldClass =
  "w-full rounded-[4px] border border-[#C8C5B8] bg-[#FAF9F5] px-3.5 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-terracotta focus:ring-1 focus:ring-terracotta focus:outline-none shadow-sm";
const labelClass = "font-mono text-xs uppercase tracking-wider text-muted";

export default function TechnicalFooter({ onNavigate }: TechnicalFooterProps) {
  const { contact, identity, footerNote } = kgm;
  const { form } = contact;
  const [values, setValues] = useState<QuoteForm>({
    name: "",
    company: "",
    email: "",
    area: form.options[0],
    scope: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const subject = `${form.subjectPrefix}: ${values.area}`;
    const body = [
      `${form.name}: ${values.name}`,
      `${form.company}: ${values.company}`,
      `${form.email}: ${values.email}`,
      "",
      `${form.scope}:`,
      values.scope,
    ].join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("done");
  };

  const legal = [
    { label: contact.labels.address, value: contact.address },
    { label: contact.labels.email, value: contact.email },
    { label: contact.labels.phone, value: contact.phone },
    { label: contact.labels.hours, value: contact.hours },
  ];

  return (
    <section className="bg-canvas py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Scenario Header */}
        <div className="mb-12 border-b border-grain pb-8">
          <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
            <span className="inline-block h-2 w-2 bg-terracotta" />
            Atención Directa · Lima Metropolitana
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl">
                {contact.title}
              </h2>
              <p className="mt-3 max-w-[56ch] text-muted text-base leading-relaxed">
                {contact.intro}
              </p>
            </div>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("inicio")}
                className="font-mono text-xs uppercase tracking-wider text-muted hover:text-ink self-start lg:self-auto"
              >
                ← Volver al inicio
              </button>
            )}
          </div>
        </div>

        {/* Main 2-Column Panel: Quote Form + Operational Headquarters */}
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Quote Form Container */}
          <div className="lg:col-span-7 rounded-[4px] border border-grain bg-surface/30 p-6 sm:p-8">
            <h3 className="font-mono text-xs uppercase tracking-wider text-terracotta font-medium mb-6">
              Pliego de requerimiento técnico
            </h3>

            <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
              <label className="grid gap-2 text-sm">
                <span className={labelClass}>{form.name}</span>
                <input
                  required
                  placeholder="Ej. Ing. Carlos Mendoza"
                  name="name"
                  value={values.name}
                  onChange={onChange}
                  className={fieldClass}
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span className={labelClass}>{form.company}</span>
                <input
                  required
                  placeholder="Empresa o Edificio Residencial"
                  name="company"
                  value={values.company}
                  onChange={onChange}
                  className={fieldClass}
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span className={labelClass}>{form.email}</span>
                <input
                  required
                  type="email"
                  placeholder="correo@empresa.pe"
                  name="email"
                  value={values.email}
                  onChange={onChange}
                  className={fieldClass}
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span className={labelClass}>{form.area}</span>
                <select
                  name="area"
                  value={values.area}
                  onChange={onChange}
                  className={`${fieldClass} cursor-pointer`}
                >
                  {form.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm sm:col-span-2">
                <span className={labelClass}>{form.scope}</span>
                <textarea
                  required
                  rows={4}
                  name="scope"
                  value={values.scope}
                  onChange={onChange}
                  placeholder={form.scopePlaceholder}
                  className={fieldClass}
                />
              </label>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="rounded-[4px] border border-terracotta bg-terracotta px-6 py-3.5 text-sm font-medium text-canvas transition-colors hover:border-terracotta-hover hover:bg-terracotta-hover shadow-sm"
                >
                  {form.submit}
                </button>
                <p role="status" aria-live="polite" className="text-sm font-mono text-muted">
                  {status === "sending" && form.sending}
                  {status === "done" && form.success}
                </p>
              </div>
            </form>
          </div>

          {/* Operational Headquarters & Legal Credentials */}
          <aside className="lg:col-span-5 rounded-[4px] border border-grain bg-[#FAF9F5] p-6 sm:p-8">
            <h3 className={`${labelClass} border-b border-grain pb-3 text-terracotta font-medium`}>
              {contact.legalTitle}
            </h3>

            <div className="mt-6 border-b border-grain pb-5">
              <p className="font-serif text-2xl leading-snug tracking-tight">{identity.name}</p>
              <p className="mt-1 font-mono text-sm text-muted">
                RUC {identity.ruc} · {identity.status}
              </p>
            </div>

            <dl className="mt-6 grid gap-5">
              {legal.map(({ label, value }) => (
                <div key={label} className="border-b border-grain/60 pb-3 last:border-0 last:pb-0">
                  <dt className={labelClass}>{label}</dt>
                  <dd className="mt-1 font-mono text-sm leading-relaxed text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 pt-5 border-t border-grain">
              <div className="flex items-center gap-2 font-mono text-xs text-muted">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-600" />
                <span>Atención telefónica y WhatsApp disponible</span>
              </div>
            </div>
          </aside>
        </div>

        {/* Technical Footer Note */}
        <div className="mt-16 border-t border-grain pt-6 text-center sm:text-left">
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            © {new Date().getFullYear()} {identity.name} · RUC {identity.ruc} · {footerNote}
          </p>
        </div>
      </div>
    </section>
  );
}
