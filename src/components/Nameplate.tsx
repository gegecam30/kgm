"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

/**
 * Placa de aluminio cepillado. Al pasar el puntero, el reflejo del metal lo sigue
 * (variables --mx/--my sin re-render). En pantallas táctiles queda fijo.
 * Los tornillos se aprietan uno tras otro cuando la placa termina de asentarse.
 */
export default function Nameplate({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
    ref.current.style.setProperty("--glow", "1");
  };
  const onLeave = () => ref.current?.style.removeProperty("--glow");

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="nameplate plate-settle relative rounded-[3px] p-3 sm:p-4">
      <Screw className="left-2 top-2" delay={1050} />
      <Screw className="right-2 top-2" delay={1170} />
      <Screw className="bottom-2 right-2" delay={1290} />
      <Screw className="bottom-2 left-2" delay={1410} />
      {children}
    </div>
  );
}

function Screw({ className, delay }: { className: string; delay: number }) {
  return (
    <span
      aria-hidden
      style={{ animationDelay: `${delay}ms` }}
      className={`rivet screw-tighten absolute h-2.5 w-2.5 rounded-full ${className}`}
    />
  );
}
