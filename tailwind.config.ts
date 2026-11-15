import type { Config } from "tailwindcss";

// Marca KGM: rojo, plata de metal y negro.
// Los colores viven en variables CSS (globals.css) para tener modo claro y oscuro.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: token("canvas"), // fondo general: aluminio claro / acero oscuro
        paper: token("paper"), // superficies elevadas (formularios, paneles)
        surface: token("surface"), // superficies hundidas / hover
        steel: token("steel"), // plata de metal: bordes fuertes
        ink: token("ink"), // texto principal y barras de estructura
        graphite: token("graphite"), // texto largo
        muted: token("muted"), // texto secundario
        accent: { DEFAULT: token("accent"), hover: token("accent-hover") }, // rojo KGM (logo oficial)
        grain: token("grain"), // líneas finas
        rule: token("rule"), // bordes de campos y hover de bordes
        signal: token("signal"), // estado "disponible"
        night: token("night"), // pie de página: oscuro en ambos modos
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Narrow", "sans-serif"],
        label: ["var(--font-display)", "Arial Narrow", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: {
        shimmer: "shimmer 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
