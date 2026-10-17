"use client";

import { useState } from "react";
import { kgm } from "@/data/kgm-data";
import type { ViewScenario } from "./Navbar";

interface ServicesGridProps {
  onNavigate?: (view: ViewScenario) => void;
}

const BLUEPRINT_META: Record<string, { fig: string; status: string }> = {
  "01": {
    fig: "FIG. 01 — GRUPO ELECTROBOMBA CENTRÍFUGA & MONITOR DE CISTERNA",
    status: "ESTADO: PRESURIZACIÓN ACTIVA",
  },
  "02": {
    fig: "FIG. 02 — ISOMÉTRICO ESTRUCTURAL TABIQUERÍA METÁLICA & DRYWALL (CIIU 4329)",
    status: "COTAS DINÁMICAS: ISO-128",
  },
  "03": {
    fig: "FIG. 03 — DISTRIBUCIÓN HIDRÁULICA PPR PN-16 & TABLERO 220V 3Ø",
    status: "PULSO ACTIVO: FLUJO CONTINUO",
  },
  "04": {
    fig: "FIG. 04 — ACOPLAMIENTO CINEMÁTICO ENGRANAJES HELICOIDALES (CIIU 4774)",
    status: "RELACIÓN: i = 1.33 · SINCRONIZADO",
  },
};

export default function ServicesGrid({ onNavigate }: ServicesGridProps) {
  const { services } = kgm;
  const [activeCode, setActiveCode] = useState<string>("01");

  const currentService = services.items.find((s) => s.code === activeCode) || services.items[0];
  const blueprintMeta = BLUEPRINT_META[activeCode] || BLUEPRINT_META["01"];

  return (
    <section className="border-b border-grain bg-canvas py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-6">
        {/* Scenario Header */}
        <div className="mb-10 grid gap-6 border-b border-grain pb-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
              <span className="inline-block h-2 w-2 bg-terracotta" />
              Ingeniería Aplicada · Especificaciones ISO / DIN
            </p>
            <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {services.title}
            </h2>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5">
            <p className="text-base leading-relaxed text-muted">{services.intro}</p>
            <div className="mt-4 flex items-center gap-3 font-mono text-xs text-muted">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>SELECCIONA UN PILAR PARA REVISAR SU DIAGRAMA TÉCNICO</span>
            </div>
          </div>
        </div>

        {/* 2-Column Interactive Workspace */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: 4 Staggered Hydraulic Impulse Pillars */}
          <div className="grid gap-3.5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {services.items.map((s, idx) => {
              const isSelected = s.code === activeCode;
              const delayClass =
                idx === 0
                  ? "animate-hydraulic-0"
                  : idx === 1
                  ? "animate-hydraulic-1"
                  : idx === 2
                  ? "animate-hydraulic-2"
                  : "animate-hydraulic-3";

              return (
                <button
                  key={s.code}
                  type="button"
                  onClick={() => setActiveCode(s.code)}
                  className={`text-left p-5 transition-all duration-300 rounded-[4px] border ${delayClass} ${
                    isSelected
                      ? "border-terracotta bg-[#FAF9F5] shadow-sm ring-1 ring-terracotta/20"
                      : "border-grain bg-surface/50 hover:bg-surface hover:border-[#C8C5B8]"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span
                      className={`font-serif text-3xl font-medium tracking-tight transition-colors ${
                        isSelected ? "text-terracotta" : "text-ink"
                      }`}
                    >
                      {s.code}
                    </span>
                    <div className="flex items-center gap-2">
                      {s.ciiu && (
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted px-1.5 py-0.5 border border-grain rounded-[2px]">
                          {s.ciiu}
                        </span>
                      )}
                      <span
                        className={`font-mono text-[11px] uppercase tracking-wider transition-colors ${
                          isSelected ? "text-terracotta font-medium" : "text-muted"
                        }`}
                      >
                        {isSelected ? "● En pantalla" : "Explorar →"}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-2.5 font-serif text-lg leading-snug tracking-tight text-ink font-medium">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted line-clamp-2">
                    {s.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Prominent Engineering Blueprint Stage */}
          <div className="lg:col-span-7 rounded-[4px] border border-grain bg-[#FAF9F5] p-5 sm:p-7">
            {/* Blueprint Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-grain pb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-terracotta font-medium">
                  PLANO DE INGENIERÍA · PILAR {currentService.code}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl tracking-tight text-ink mt-0.5">
                  {currentService.title}
                </h4>
              </div>
              <div className="text-right font-mono text-[11px] text-muted">
                <div>ESCALA 1:20 · TRAZOS 1px</div>
                <div className="text-ink font-medium">REVISIÓN ISO-9001 CONFORME</div>
              </div>
            </div>

            {/* Blueprint Box with Separated HTML Flexbox Header to guarantee zero text collision */}
            <div className="mt-5 rounded-[4px] border border-grain bg-canvas shadow-inner overflow-hidden">
              {/* HTML Flexbox Header: Guarantees zero horizontal overlap */}
              <div className="flex flex-wrap justify-between items-center gap-2 border-b border-grain bg-[#FAF9F5] px-4 py-2.5 text-xs font-mono">
                <span className="text-muted tracking-wider truncate max-w-[70%] sm:max-w-none">
                  {blueprintMeta.fig}
                </span>
                <span className="text-terracotta font-semibold tracking-wider whitespace-nowrap">
                  {blueprintMeta.status}
                </span>
              </div>

              {/* SVG CAD Blueprint Canvas */}
              <div className="p-3 sm:p-4">
                {activeCode === "01" && <TurbineCisternDiagram />}
                {activeCode === "02" && <StructuralIsometricDiagram />}
                {activeCode === "03" && <SanitaryElectricalDiagram />}
                {activeCode === "04" && <PrecisionGearsDiagram />}
              </div>
            </div>

            {/* Technical Detail & CTA Footer */}
            <div className="mt-6 pt-5 border-t border-grain flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-md">
                <p className="text-xs leading-relaxed text-muted">
                  {currentService.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate?.("cotizacion")}
                className="whitespace-nowrap rounded-[4px] border border-terracotta bg-terracotta px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-canvas transition-colors hover:border-terracotta-hover hover:bg-terracotta-hover"
              >
                Cotizar este servicio →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// PILAR 01: TURBINA / IMPULSOR HIDRONEUMÁTICO & MEDIDOR DE CISTERNA
// =========================================================================
function TurbineCisternDiagram() {
  return (
    <svg
      viewBox="0 30 540 310"
      className="w-full h-auto select-none"
      aria-label="Esquema técnico de turbina hidroneumática y nivel de cisterna"
    >
      <defs>
        <pattern id="grid1" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#DCDAD0" strokeWidth="0.5" strokeOpacity="0.5" />
        </pattern>
      </defs>

      <rect y="30" width="540" height="310" fill="url(#grid1)" />

      {/* ----------------- LEFT: IMPULSOR / TURBINA CENTRÍFUGA ----------------- */}
      {/* Outer casing */}
      <circle cx="150" cy="170" r="95" fill="none" stroke="#141413" strokeWidth="1" strokeDasharray="6 3" />
      <circle cx="150" cy="170" r="82" fill="#FAF9F5" stroke="#141413" strokeWidth="1.25" />

      {/* Suction & discharge nozzles */}
      <rect x="135" y="45" width="30" height="44" fill="#FAF9F5" stroke="#141413" strokeWidth="1" />
      <line x1="125" y1="45" x2="175" y2="45" stroke="#141413" strokeWidth="2" />
      <text x="150" y="40" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#605F5B">DESCARGA Ø 1½"</text>

      <rect x="25" y="155" width="44" height="30" fill="#FAF9F5" stroke="#141413" strokeWidth="1" />
      <line x1="25" y1="145" x2="25" y2="195" stroke="#141413" strokeWidth="2" />
      <text x="25" y="140" textAnchor="start" fontFamily="monospace" fontSize="9" fill="#605F5B">SUCCIÓN Ø 2"</text>

      {/* Bolt circles */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const bx = 150 + 88 * Math.cos(rad);
        const by = 170 + 88 * Math.sin(rad);
        return <circle key={deg} cx={bx} cy={by} r="2.5" fill="#141413" stroke="#FAF9F5" strokeWidth="0.75" />;
      })}

      {/* Continuous Rotating Impeller Assembly */}
      <g className="spin-impeller" style={{ transformOrigin: "150px 170px" }}>
        {/* Impeller body */}
        <circle cx="150" cy="170" r="70" fill="none" stroke="#B8332A" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="150" cy="170" r="22" fill="#FAF9F5" stroke="#141413" strokeWidth="1.25" />
        <circle cx="150" cy="170" r="8" fill="#141413" />

        {/* Impeller backward-curved vanes */}
        {[0, 60, 120, 180, 240, 300].map((rot) => (
          <g key={rot} transform={`rotate(${rot} 150 170)`}>
            <path
              d="M 150 148 Q 175 130 195 115"
              fill="none"
              stroke="#141413"
              strokeWidth="1.5"
            />
            <path
              d="M 150 148 Q 175 130 195 115"
              fill="none"
              stroke="#B8332A"
              strokeWidth="0.75"
              strokeDasharray="2 3"
            />
          </g>
        ))}
      </g>

      {/* Hydraulic flow indicators */}
      <path d="M 45 170 L 105 170" stroke="#B8332A" strokeWidth="1" />
      <path d="M 150 120 L 150 60" stroke="#B8332A" strokeWidth="1" />
      <text x="150" y="280" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#141413">
        TURBINA HIDRONEUMÁTICA · 1750 RPM
      </text>

      {/* Manometer callout */}
      <g transform="translate(195, 75)">
        <circle cx="20" cy="20" r="18" fill="#FAF9F5" stroke="#141413" strokeWidth="1" />
        <line x1="20" y1="20" x2="30" y2="12" stroke="#B8332A" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="2" fill="#141413" />
        <text x="44" y="23" fontFamily="monospace" fontSize="9" fill="#B8332A" fontWeight="bold">
          4.2 BAR
        </text>
      </g>

      {/* ----------------- RIGHT: MEDIDOR VERTICAL DE CISTERNA ----------------- */}
      {/* Cistern tank outline */}
      <rect x="340" y="55" width="160" height="230" rx="3" fill="#FAF9F5" stroke="#141413" strokeWidth="1.25" />

      {/* Water level with dynamic oscillating CSS animation */}
      <rect
        x="342"
        y="125"
        width="156"
        height="158"
        fill="#B8332A"
        fillOpacity="0.08"
        stroke="#B8332A"
        strokeWidth="1"
        style={{ animation: "cisternWaveLevel 4s ease-in-out infinite" }}
      />

      {/* Wave surface line */}
      <path
        d="M 342 125 Q 380 120 420 125 T 498 125"
        fill="none"
        stroke="#B8332A"
        strokeWidth="1.5"
      />

      {/* Level Ruler Graduations */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => {
        const yPos = 75 + idx * 24;
        const label = `${(4.0 - idx * 0.5).toFixed(1)}m`;
        return (
          <g key={idx}>
            <line x1="340" y1={yPos} x2="352" y2={yPos} stroke="#141413" strokeWidth="1" />
            <text x="356" y={yPos + 3} fontFamily="monospace" fontSize="8" fill="#605F5B">
              {label}
            </text>
          </g>
        );
      })}

      {/* Float sensor cable & boya */}
      <line x1="450" y1="55" x2="450" y2="125" stroke="#141413" strokeWidth="1" strokeDasharray="3 2" />
      <rect x="442" y="120" width="16" height="12" rx="2" fill="#B8332A" stroke="#141413" strokeWidth="1" />

      {/* Telemetry panel inside cistern */}
      <rect x="360" y="215" width="120" height="55" fill="#FAF9F5" stroke="#141413" strokeWidth="0.75" />
      <text x="370" y="232" fontFamily="monospace" fontSize="9" fill="#141413" fontWeight="bold">
        NIVEL CISTERNA
      </text>
      <text x="370" y="246" fontFamily="monospace" fontSize="9" fill="#B8332A">
        ● 78.4% ÓPTIMO
      </text>
      <text x="370" y="260" fontFamily="monospace" fontSize="8" fill="#605F5B">
        CAPACIDAD: 24,000 L
      </text>

      <text x="420" y="305" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#141413">
        SENSOR AUTOMÁTICO DE CORTE SECO
      </text>
    </svg>
  );
}

// =========================================================================
// PILAR 02: ACONDICIONAMIENTO (ISOMÉTRICO CON COTAS DINÁMICAS TRAZADAS)
// =========================================================================
function StructuralIsometricDiagram() {
  return (
    <svg
      viewBox="0 30 540 310"
      className="w-full h-auto select-none"
      aria-label="Plano técnico isométrico y líneas de cota dinámicas"
    >
      <defs>
        <pattern id="isoGrid" width="30" height="17.32" patternUnits="userSpaceOnUse">
          <path d="M 0 0 L 30 17.32 M 30 0 L 0 17.32" stroke="#DCDAD0" strokeWidth="0.5" strokeOpacity="0.4" />
        </pattern>
      </defs>

      <rect y="30" width="540" height="310" fill="url(#isoGrid)" />

      {/* Floor baseline grid */}
      <polygon points="60,250 240,310 460,230 280,170" fill="#FAF9F5" stroke="#DCDAD0" strokeWidth="1" />

      {/* Structural Steel Studs / Columns (Isometric 3D) */}
      {/* Base Track (Canal inferior) */}
      <path d="M 120 230 L 340 160 L 340 168 L 120 238 Z" fill="#EBE9E1" stroke="#141413" strokeWidth="1" />

      {/* Vertical Studs (Parantes PG-90) spaced at modular 406mm intervals */}
      {[0, 1, 2, 3, 4].map((i) => {
        const baseX = 140 + i * 45;
        const baseY = 224 - i * 14;
        const height = 140;
        return (
          <g key={i}>
            {/* Stud Front Face */}
            <path
              d={`M ${baseX} ${baseY} L ${baseX} ${baseY - height} L ${baseX + 12} ${baseY - height - 4} L ${baseX + 12} ${baseY - 4} Z`}
              fill="#FAF9F5"
              stroke="#141413"
              strokeWidth="1"
            />
            {/* Flange / return */}
            <line x1={baseX} y1={baseY - 70} x2={baseX + 12} y2={baseY - 74} stroke="#B8332A" strokeWidth="1" strokeDasharray="2 2" />
          </g>
        );
      })}

      {/* Top Track (Canal superior) */}
      <path d="M 120 90 L 340 20 L 340 28 L 120 98 Z" fill="#EBE9E1" stroke="#141413" strokeWidth="1" />

      {/* Gypsum board cutaway panel */}
      <polygon
        points="230,195 340,160 340,20 230,55"
        fill="#FAF9F5"
        fillOpacity="0.85"
        stroke="#141413"
        strokeWidth="1.25"
      />
      {/* Hatching on cutaway */}
      <line x1="240" y1="185" x2="330" y2="155" stroke="#DCDAD0" strokeWidth="0.75" />
      <line x1="240" y1="150" x2="330" y2="120" stroke="#DCDAD0" strokeWidth="0.75" />
      <line x1="240" y1="115" x2="330" y2="85" stroke="#DCDAD0" strokeWidth="0.75" />
      <text x="285" y="105" fontFamily="monospace" fontSize="8" fill="#605F5B" transform="rotate(-15 285 105)">
        PLACA GYPSUM 1/2"
      </text>

      {/* ---------------- DYNAMIC TRACED DIMENSION LINES (COTAS) ---------------- */}
      {/* Horizontal length cota */}
      <g className="trace-cota-anim">
        <line x1="120" y1="260" x2="340" y2="190" stroke="#B8332A" strokeWidth="1.25" />
        <line x1="115" y1="250" x2="125" y2="270" stroke="#B8332A" strokeWidth="1.25" />
        <line x1="335" y1="180" x2="345" y2="200" stroke="#B8332A" strokeWidth="1.25" />
      </g>
      <text x="225" y="240" fontFamily="monospace" fontSize="10" fill="#B8332A" fontWeight="bold">
        L = 3,600 mm (MODULAR)
      </text>

      {/* Vertical height cota */}
      <g className="trace-cota-anim">
        <line x1="370" y1="160" x2="370" y2="20" stroke="#B8332A" strokeWidth="1.25" />
        <line x1="362" y1="160" x2="378" y2="160" stroke="#B8332A" strokeWidth="1.25" />
        <line x1="362" y1="20" x2="378" y2="20" stroke="#B8332A" strokeWidth="1.25" />
      </g>
      <text x="382" y="95" fontFamily="monospace" fontSize="10" fill="#B8332A" fontWeight="bold">
        H = 2,750 mm
      </text>

      {/* Stud spacing indicator */}
      <g className="trace-cota-anim">
        <line x1="140" y1="248" x2="185" y2="234" stroke="#141413" strokeWidth="1" strokeDasharray="3 2" />
      </g>
      <text x="145" y="266" fontFamily="monospace" fontSize="8" fill="#141413">
        E = 406 mm O.C.
      </text>

      {/* Laser level alignment mark */}
      <circle cx="120" cy="230" r="3" fill="#B8332A" />
      <text x="45" y="225" fontFamily="monospace" fontSize="9" fill="#B8332A">
        NPT +0.00 (LÁSER)
      </text>
      <line x1="90" y1="225" x2="115" y2="230" stroke="#B8332A" strokeWidth="0.75" strokeDasharray="2 2" />

      {/* Technical Spec Box */}
      <rect x="25" y="275" width="490" height="42" fill="#FAF9F5" stroke="#141413" strokeWidth="0.75" />
      <text x="40" y="292" fontFamily="monospace" fontSize="9" fill="#141413" fontWeight="bold">
        SISTEMA CONSTRUCTIVO: PARANTES ACERO GALVANIZADO 0.45mm · ANCLAJES HILTI 3/8"
      </text>
      <text x="40" y="306" fontFamily="monospace" fontSize="8" fill="#605F5B">
        CONFORMIDAD ACÚSTICA & SÍSMICA · PINTURA EPÓXICA Y ACABADOS CORPORATIVOS
      </text>
    </svg>
  );
}

// =========================================================================
// PILAR 03: REDES SANITARIAS Y ELÉCTRICAS (CIRCUITO CON PULSO TÉCNICO)
// =========================================================================
function SanitaryElectricalDiagram() {
  return (
    <svg
      viewBox="0 30 540 310"
      className="w-full h-auto select-none"
      aria-label="Esquema técnico de redes sanitarias y circuitos con pulso activo"
    >
      <defs>
        <pattern id="grid3" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#DCDAD0" strokeWidth="0.5" strokeOpacity="0.5" />
        </pattern>
      </defs>

      <rect y="30" width="540" height="310" fill="url(#grid3)" />

      {/* ----------------- NETWORK PIPING RUNS (RED SANITARIA) ----------------- */}
      {/* Structural pipe outlines */}
      <path
        d="M 40 100 L 160 100 L 160 210 L 320 210 L 320 120 L 480 120"
        fill="none"
        stroke="#141413"
        strokeWidth="6"
        strokeLinecap="square"
      />
      <path
        d="M 40 100 L 160 100 L 160 210 L 320 210 L 320 120 L 480 120"
        fill="none"
        stroke="#FAF9F5"
        strokeWidth="3"
        strokeLinecap="square"
      />

      {/* Continuous Technical Terracotta Pulse traveling along the piping */}
      <path
        d="M 40 100 L 160 100 L 160 210 L 320 210 L 320 120 L 480 120"
        fill="none"
        stroke="#B8332A"
        strokeWidth="2.5"
        className="pulse-flow-anim"
      />

      {/* Secondary distribution branches */}
      <path d="M 160 210 L 160 280 L 250 280" fill="none" stroke="#141413" strokeWidth="3" />
      <path d="M 160 210 L 160 280 L 250 280" fill="none" stroke="#B8332A" strokeWidth="1.5" className="pulse-flow-anim" />

      <path d="M 320 210 L 320 280 L 420 280" fill="none" stroke="#141413" strokeWidth="3" />
      <path d="M 320 210 L 320 280 L 420 280" fill="none" stroke="#B8332A" strokeWidth="1.5" className="pulse-flow-anim" />

      {/* Valves & Fittings */}
      <g transform="translate(100, 100)">
        <polygon points="-8,-8 8,8 8,-8 -8,8" fill="#141413" stroke="#141413" strokeWidth="1" />
        <circle cx="0" cy="0" r="3" fill="#B8332A" />
        <line x1="0" y1="-8" x2="0" y2="-16" stroke="#141413" strokeWidth="1.5" />
        <line x1="-6" y1="-16" x2="6" y2="-16" stroke="#B8332A" strokeWidth="2" />
        <text x="0" y="-20" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#605F5B">V-01</text>
      </g>

      <g transform="translate(240, 210)">
        <circle cx="0" cy="0" r="12" fill="#FAF9F5" stroke="#141413" strokeWidth="1" />
        <polygon points="-5,-6 6,0 -5,6" fill="#B8332A" />
        <text x="0" y="-16" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#605F5B">CHECK</text>
      </g>

      {/* ----------------- ELECTRICAL SUB-PANEL & BUSWAY ----------------- */}
      <rect x="360" y="45" width="130" height="60" fill="#FAF9F5" stroke="#141413" strokeWidth="1.25" />
      <line x1="360" y1="65" x2="490" y2="65" stroke="#141413" strokeWidth="0.75" />
      <text x="370" y="58" fontFamily="monospace" fontSize="8" fill="#141413" fontWeight="bold">
        TABLERO GENERAL TG-1
      </text>

      {[0, 1, 2, 3].map((b) => (
        <rect key={b} x={375 + b * 26} y={72} width="16" height="24" fill="#EBE9E1" stroke="#141413" strokeWidth="0.75" />
      ))}

      {/* Grounding busbar indicator */}
      <line x1="480" y1="105" x2="510" y2="105" stroke="#141413" strokeWidth="1" />
      <line x1="510" y1="105" x2="510" y2="140" stroke="#141413" strokeWidth="1" />
      <line x1="502" y1="140" x2="518" y2="140" stroke="#141413" strokeWidth="1.5" />
      <line x1="505" y1="144" x2="515" y2="144" stroke="#141413" strokeWidth="1" />
      <line x1="508" y1="148" x2="512" y2="148" stroke="#141413" strokeWidth="1" />
      <text x="495" y="160" fontFamily="monospace" fontSize="8" fill="#605F5B">PAT &lt; 5Ω</text>

      {/* Pulsing Nodes at Critical Junctions */}
      {[
        { cx: 160, cy: 100, label: "NODO-A" },
        { cx: 160, cy: 210, label: "NODO-B" },
        { cx: 320, cy: 210, label: "NODO-C" },
        { cx: 320, cy: 120, label: "NODO-D" },
      ].map((node) => (
        <g key={node.label}>
          <circle cx={node.cx} cy={node.cy} r="4" fill="#B8332A" />
          <circle cx={node.cx} cy={node.cy} r="8" fill="none" stroke="#B8332A" strokeWidth="0.75" opacity="0.6" />
          <text x={node.cx + 7} y={node.cy - 7} fontFamily="monospace" fontSize="8" fill="#141413">
            {node.label}
          </text>
        </g>
      ))}

      {/* Data Callout Cards */}
      <rect x="40" y="240" width="105" height="48" fill="#FAF9F5" stroke="#141413" strokeWidth="0.75" />
      <text x="48" y="255" fontFamily="monospace" fontSize="8" fill="#605F5B">PRESIÓN DE RED</text>
      <text x="48" y="270" fontFamily="monospace" fontSize="11" fill="#B8332A" fontWeight="bold">
        45.2 PSI
      </text>
      <text x="48" y="282" fontFamily="monospace" fontSize="7" fill="#605F5B">PPR TERMOFUSIÓN</text>

      <rect x="360" y="170" width="130" height="48" fill="#FAF9F5" stroke="#141413" strokeWidth="0.75" />
      <text x="368" y="185" fontFamily="monospace" fontSize="8" fill="#605F5B">TENSIÓN ELÉCTRICA</text>
      <text x="368" y="200" fontFamily="monospace" fontSize="11" fill="#141413" fontWeight="bold">
        220 V · 3 FASES
      </text>
      <text x="368" y="212" fontFamily="monospace" fontSize="7" fill="#B8332A">BALANCEO: 99.2%</text>

      {/* Footer Specs */}
      <text x="270" y="320" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#141413">
        NORMATIVA NTP 399.002 / CNE SUMINISTRO · CERO FUGAS & PROTECCIÓN DIFERENCIAL 30mA
      </text>
    </svg>
  );
}

// =========================================================================
// PILAR 04: EQUIPOS Y MOTORES (DOS ENGRANAJES TÉCNICOS SINCRONIZADOS)
// =========================================================================
function PrecisionGearsDiagram() {
  return (
    <svg
      viewBox="0 30 540 310"
      className="w-full h-auto select-none"
      aria-label="Dos engranajes técnicos de precisión rotando sincronizados"
    >
      <defs>
        <pattern id="grid4" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#DCDAD0" strokeWidth="0.5" strokeOpacity="0.5" />
        </pattern>
      </defs>

      <rect y="30" width="540" height="310" fill="url(#grid4)" />

      {/* Center line connecting both shafts */}
      <line x1="165" y1="170" x2="275" y2="170" stroke="#B8332A" strokeWidth="1" strokeDasharray="4 2" />

      {/* ----------------- GEAR A (DRIVE GEAR - 20 DIENTES, R=65, CLOCKWISE) ----------------- */}
      <g className="spin-gear-a" style={{ transformOrigin: "165px 170px" }}>
        {/* Outer pitch circle indicator */}
        <circle cx="165" cy="170" r="65" fill="#FAF9F5" stroke="#141413" strokeWidth="1.25" />
        <circle cx="165" cy="170" r="50" fill="none" stroke="#B8332A" strokeWidth="0.75" strokeDasharray="3 3" />

        {/* 20 Spur Gear Teeth */}
        {Array.from({ length: 20 }).map((_, idx) => {
          const angle = (idx * 360) / 20;
          return (
            <rect
              key={idx}
              x="160"
              y="97"
              width="10"
              height="16"
              rx="1.5"
              fill="#FAF9F5"
              stroke="#141413"
              strokeWidth="1.2"
              transform={`rotate(${angle} 165 170)`}
            />
          );
        })}

        {/* Weight-reduction cutouts */}
        {[0, 90, 180, 270].map((deg) => (
          <circle
            key={deg}
            cx={165 + 32 * Math.cos((deg * Math.PI) / 180)}
            cy={170 + 32 * Math.sin((deg * Math.PI) / 180)}
            r="10"
            fill="#EBE9E1"
            stroke="#141413"
            strokeWidth="0.75"
          />
        ))}

        {/* Shaft & Keyway */}
        <circle cx="165" cy="170" r="16" fill="#FAF9F5" stroke="#141413" strokeWidth="1.5" />
        <rect x="162" y="152" width="6" height="8" fill="#141413" />
        <circle cx="165" cy="170" r="4" fill="#B8332A" />

        {/* Calibration rim marks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={165 + 61 * Math.cos(rad)}
              y1={170 + 61 * Math.sin(rad)}
              x2={165 + 65 * Math.cos(rad)}
              y2={170 + 65 * Math.sin(rad)}
              stroke="#B8332A"
              strokeWidth="1.5"
            />
          );
        })}
      </g>

      {/* ----------------- GEAR B (DRIVEN GEAR - 15 DIENTES, R=45, COUNTER-CLOCKWISE) ----------------- */}
      <g className="spin-gear-b" style={{ transformOrigin: "275px 170px" }}>
        {/* Outer pitch circle indicator */}
        <circle cx="275" cy="170" r="45" fill="#FAF9F5" stroke="#141413" strokeWidth="1.25" />
        <circle cx="275" cy="170" r="34" fill="none" stroke="#B8332A" strokeWidth="0.75" strokeDasharray="3 3" />

        {/* 15 Spur Gear Teeth */}
        {Array.from({ length: 15 }).map((_, idx) => {
          const angle = (idx * 360) / 15;
          return (
            <rect
              key={idx}
              x="270"
              y="119"
              width="10"
              height="14"
              rx="1.5"
              fill="#FAF9F5"
              stroke="#141413"
              strokeWidth="1.2"
              transform={`rotate(${angle} 275 170)`}
            />
          );
        })}

        {/* Cutouts */}
        {[0, 120, 240].map((deg) => (
          <circle
            key={deg}
            cx={275 + 22 * Math.cos((deg * Math.PI) / 180)}
            cy={170 + 22 * Math.sin((deg * Math.PI) / 180)}
            r="8"
            fill="#EBE9E1"
            stroke="#141413"
            strokeWidth="0.75"
          />
        ))}

        {/* Shaft & Keyway */}
        <circle cx="275" cy="170" r="14" fill="#FAF9F5" stroke="#141413" strokeWidth="1.5" />
        <rect x="272" y="154" width="6" height="6" fill="#141413" />
        <circle cx="275" cy="170" r="4" fill="#B8332A" />
      </g>

      {/* Pitch Point Contact Marker */}
      <circle cx="225" cy="170" r="3" fill="#B8332A" />
      <line x1="225" y1="140" x2="225" y2="200" stroke="#B8332A" strokeWidth="1" strokeDasharray="2 2" />
      <text x="225" y="132" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#B8332A">
        PUNTO DE CONTACTO
      </text>

      {/* Rotation arrows indicator */}
      <path d="M 125 105 A 75 75 0 0 1 185 98" fill="none" stroke="#141413" strokeWidth="1.5" />
      <polygon points="185,95 192,99 184,103" fill="#141413" />
      <text x="145" y="85" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#605F5B">
        HORARIO (1750 RPM)
      </text>

      <path d="M 295 120 A 55 55 0 0 0 255 122" fill="none" stroke="#B8332A" strokeWidth="1.5" />
      <polygon points="255,126 248,121 256,118" fill="#B8332A" />
      <text x="285" y="105" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#B8332A">
        ANTIHORARIO (2333 RPM)
      </text>

      {/* Right Column Specs Card */}
      <rect x="360" y="60" width="155" height="215" fill="#FAF9F5" stroke="#141413" strokeWidth="1" />
      <text x="372" y="82" fontFamily="monospace" fontSize="9" fill="#141413" fontWeight="bold">
        CONTROL DE CALIBRACIÓN
      </text>
      <line x1="360" y1="92" x2="515" y2="92" stroke="#DCDAD0" strokeWidth="1" />

      <text x="372" y="112" fontFamily="monospace" fontSize="8" fill="#605F5B">MÓDULO DE ENGRANE</text>
      <text x="372" y="126" fontFamily="monospace" fontSize="11" fill="#141413" fontWeight="bold">m = 2.5 mm</text>

      <text x="372" y="148" fontFamily="monospace" fontSize="8" fill="#605F5B">HOLGURA (BACKLASH)</text>
      <text x="372" y="162" fontFamily="monospace" fontSize="11" fill="#B8332A" fontWeight="bold">0.04 mm ±0.01</text>

      <text x="372" y="184" fontFamily="monospace" fontSize="8" fill="#605F5B">POTENCIA NOMINAL</text>
      <text x="372" y="198" fontFamily="monospace" fontSize="11" fill="#141413" fontWeight="bold">7.5 HP (5.5 kW)</text>

      <text x="372" y="220" fontFamily="monospace" fontSize="8" fill="#605F5B">AISLAMIENTO TÉRMICO</text>
      <text x="372" y="234" fontFamily="monospace" fontSize="10" fill="#141413">CLASE H (180°C)</text>

      <rect x="370" y="246" width="135" height="20" fill="#EBE9E1" />
      <text x="378" y="260" fontFamily="monospace" fontSize="8" fill="#B8332A" fontWeight="bold">
        GARANTÍA OPERATIVA KGM
      </text>

      {/* Footer text */}
      <text x="240" y="315" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#141413">
        SUMINISTRO, REBOBINADO Y PRUEBAS EN BANCO HIDROSTÁTICO / DINAMÓMETRO
      </text>
    </svg>
  );
}
