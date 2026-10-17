"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar, { type ViewScenario } from "@/components/Navbar";
import HeroEditorial from "@/components/HeroEditorial";
import ServicesGrid from "@/components/ServicesGrid";
import WorkProtocol from "@/components/WorkProtocol";
import TechnicalFooter from "@/components/TechnicalFooter";

const SCENARIOS: { id: ViewScenario; code: string; label: string }[] = [
  { id: "inicio", code: "01", label: "Inicio" },
  { id: "especialidades", code: "02", label: "Especialidades" },
  { id: "protocolo", code: "03", label: "Protocolo" },
  { id: "cotizacion", code: "04", label: "Cotización" },
];

export default function Page() {
  const [currentView, setCurrentView] = useState<ViewScenario>("inicio");
  const [transitionKey, setTransitionKey] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleNavigate = useCallback(
    (target: ViewScenario) => {
      if (target === currentView) return;
      setIsTransitioning(true);
      setTransitionKey((k) => k + 1);
      setCurrentView(target);
      window.scrollTo({ top: 0, behavior: "instant" });

      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 350);

      return () => clearTimeout(timer);
    },
    [currentView]
  );

  // Keyboard navigation between scenarios (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      const currentIndex = SCENARIOS.findIndex((s) => s.id === currentView);
      if (e.key === "ArrowRight" && currentIndex < SCENARIOS.length - 1) {
        handleNavigate(SCENARIOS[currentIndex + 1].id);
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        handleNavigate(SCENARIOS[currentIndex - 1].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentView, handleNavigate]);

  const currentIndex = SCENARIOS.findIndex((s) => s.id === currentView);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink relative selection:bg-terracotta selection:text-canvas">
      {/* Top Technical Progress Line (Terracotta) */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-grain/20">
        {isTransitioning && (
          <div
            key={`progress-${transitionKey}`}
            className="h-full bg-terracotta animate-top-progress"
          />
        )}
      </div>

      {/* Main Navbar */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Viewport Workspace: When isTransitioning completes, the animation class is released so text stays 100% crisp */}
      <main className="flex-1 pb-20">
        <div
          key={`${currentView}-${transitionKey}`}
          className={isTransitioning ? "mechanical-slide-scenario" : ""}
        >
          {currentView === "inicio" && <HeroEditorial onNavigate={handleNavigate} />}
          {currentView === "especialidades" && <ServicesGrid onNavigate={handleNavigate} />}
          {currentView === "protocolo" && <WorkProtocol onNavigate={handleNavigate} />}
          {currentView === "cotizacion" && <TechnicalFooter onNavigate={handleNavigate} />}
        </div>
      </main>

      {/* -----------------------------------------------------------------
          BOTTOM TECHNICAL BAR (FIXED, STRAIGHT 1PX BORDER, ZERO PILL SHAPES)
          ----------------------------------------------------------------- */}
      <footer
        aria-label="Controles técnicos de navegación"
        className="fixed bottom-0 left-0 right-0 z-40 h-14 border-t border-grain bg-canvas/95 backdrop-blur-md"
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          {/* Left: Indicator [ 01 / 04 ] and active scenario title */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="font-bold text-ink">
              [ 0{currentIndex + 1} / 04 ]
            </span>
            <span className="hidden sm:inline text-grain">|</span>
            <span className="hidden sm:inline text-muted uppercase tracking-wider">
              ESCENARIO ACTIVO: {SCENARIOS[currentIndex].label}
            </span>
          </div>

          {/* Center: Rectangular Technical Tabs with 2px straight borders */}
          <div className="hidden md:flex items-center gap-1.5">
            {SCENARIOS.map((s) => {
              const isActive = s.id === currentView;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleNavigate(s.id)}
                  className={`relative rounded-[2px] border px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                    isActive
                      ? "border-terracotta bg-[#FAF9F5] text-ink font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-terracotta"
                      : "border-grain bg-canvas text-muted hover:border-[#C8C5B8] hover:text-ink hover:bg-surface/50"
                  }`}
                >
                  <span className={isActive ? "text-terracotta font-semibold mr-1.5" : "text-muted mr-1.5"}>
                    {s.code}
                  </span>
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* Right: Technical Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Escenario anterior"
              disabled={currentIndex === 0}
              onClick={() => currentIndex > 0 && handleNavigate(SCENARIOS[currentIndex - 1].id)}
              className="rounded-[2px] border border-grain bg-canvas px-3 py-1 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:bg-surface disabled:opacity-30 disabled:pointer-events-none"
            >
              ← Anterior
            </button>
            <button
              type="button"
              aria-label="Siguiente escenario"
              disabled={currentIndex === SCENARIOS.length - 1}
              onClick={() =>
                currentIndex < SCENARIOS.length - 1 && handleNavigate(SCENARIOS[currentIndex + 1].id)
              }
              className="rounded-[2px] border border-grain bg-canvas px-3 py-1 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:bg-surface disabled:opacity-30 disabled:pointer-events-none"
            >
              Siguiente →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
