import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F4F3EE",
        surface: "#EBE9E1",
        ink: "#141413",
        muted: "#605F5B",
        terracotta: { DEFAULT: "#B8332A", hover: "#962820" },
        grain: "#DCDAD0",
        "border-grain": "#DCDAD0",
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
