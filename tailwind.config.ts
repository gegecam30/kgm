import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#FFFFFF", // fondo general
        paper: "#F7F9FB", // superficies de apoyo (formularios, fichas, secciones alternas)
        surface: "#EDF1F4", // superficies hundidas / hover
        ink: "#0F1E2A", // texto principal
        muted: "#4E5D6A", // texto secundario
        navy: { DEFAULT: "#0F2A3D", deep: "#0A1D2B" }, // franjas oscuras y pie de página
        accent: { DEFAULT: "#C2410C", hover: "#9A3412" }, // acciones (cotizar, enviar)
        grain: "#DCE2E8", // líneas finas
        rule: "#C2CBD3", // bordes de campos y hover de bordes
        signal: "#2F7A4F", // estado "disponible"
      },
      fontFamily: {
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
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
