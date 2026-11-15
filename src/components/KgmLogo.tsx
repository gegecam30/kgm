/**
 * Logo oficial de KGM INDUSTRIAS redibujado en vector a partir del membrete:
 * anillo de acero partido en tres segmentos, tres tornillos y las letras KGM en rojo.
 */

import { useId } from "react";

const RED = "#C21A1F";
const SCREW_ANGLES = [90, 210, 330]; // grados, sentido antihorario desde las 3 en punto
const GAP_ANGLES = [30, 150, 270]; // ranuras entre segmentos

function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: 100 + r * Math.cos(rad), y: 100 - r * Math.sin(rad) };
}

/** Sin `title` el logo es decorativo (acompaña al nombre escrito) y se oculta a lectores de pantalla. */
export function KgmMark({ className = "", title }: { className?: string; title?: string }) {
  // Ids únicos: el logo aparece varias veces por página (menú, placa, pie).
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 200" className={className} {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}>
      <defs>
        <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#DCDEE0" />
          <stop offset="0.45" stopColor="#A4A8AC" />
          <stop offset="1" stopColor="#6C7075" />
        </linearGradient>
        <mask id={`${id}-ring`}>
          <rect width="200" height="200" fill="black" />
          <circle cx="100" cy="100" r="92" fill="white" />
          <circle cx="100" cy="100" r="54" fill="black" />
          {GAP_ANGLES.map((a) => (
            <rect key={a} x="100" y="95" width="100" height="10" fill="black" transform={`rotate(${-a} 100 100)`} />
          ))}
        </mask>
      </defs>

      <circle cx="100" cy="100" r="92" fill={`url(#${id}-steel)`} mask={`url(#${id}-ring)`} />

      {SCREW_ANGLES.map((a) => {
        const { x, y } = polar(86, a);
        return (
          <g key={a}>
            <circle cx={x} cy={y} r="14" fill="#FFFFFF" stroke="#2A2D31" strokeWidth="3.5" />
            <line x1={x - 8} y1={y - 5} x2={x + 8} y2={y + 5} stroke="#2A2D31" strokeWidth="3.5" />
          </g>
        );
      })}

      {/* Letras KGM, trazo cuadrado con esquinas redondeadas */}
      <g transform="translate(49.6 85.6) scale(0.72)" fill="none" stroke={RED} strokeWidth="9" strokeLinejoin="round">
        <path d="M4.5 0 V40 M9 20 L40 2 M9 20 L40 38" />
        <path d="M91 4.5 H60.5 a8 8 0 0 0 -8 8 V27.5 a8 8 0 0 0 8 8 H83 a8 8 0 0 0 8 -8 V20 H72" />
        <path d="M104.5 40 V12.5 a8 8 0 0 1 8 -8 H127.5 a8 8 0 0 1 8 8 V40 M120 4.5 V40" />
      </g>
    </svg>
  );
}

/** Marca con la palabra INDUSTRIAS debajo, como en el membrete. */
export function KgmLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      <KgmMark className="h-auto w-full" title="KGM Industrias" />
      <span className="mt-1 font-sans text-[0.7em] font-medium tracking-[0.12em] text-graphite">INDUSTRIAS</span>
    </span>
  );
}
