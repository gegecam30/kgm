import type { Config } from "tailwindcss";

// Marca KGM: rojo, plata de metal y negro.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#EEEFF0", // fondo general: aluminio claro, frío
        paper: "#F8F8F9", // superficies elevadas (formularios, paneles)
        surface: "#E2E4E6", // superficies hundidas / hover
        steel: "#B9BEC3", // plata de metal: placas, bordes fuertes
        ink: "#000000", // negro de marca
        graphite: "#24272B", // texto largo y pie de página
        muted: "#5A6067", // texto secundario
        accent: { DEFAULT: "#C8102E", hover: "#A00C24" }, // rojo KGM
        grain: "#D3D6D9", // líneas finas
        rule: "#AEB3B8", // bordes de campos y hover de bordes
        signal: "#2F7A4F", // estado "disponible"
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
