import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F4F3EE", // fondo general
        paper: "#FAF9F5", // superficies elevadas (planos, formularios)
        surface: "#EBE9E1", // superficies hundidas / hover
        ink: "#141413",
        muted: "#605F5B",
        terracotta: { DEFAULT: "#B8332A", hover: "#962820" },
        grain: "#DCDAD0", // líneas finas
        rule: "#C8C5B8", // bordes de campos y hover de bordes
        signal: "#2F7A4F", // estado "disponible"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
