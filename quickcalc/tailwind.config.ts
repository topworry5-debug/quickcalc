import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        base: {
          bg: "var(--base-bg)",
          card: "var(--card-bg)",
        },
        ink: {
          DEFAULT: "var(--text-ink)",
          muted: "var(--text-muted)",
        },
        brand: {
          primary: "#0D9488", // emerald-teal
          secondary: "#4F46E5", // indigo
          accent: "#F59E0B", // amber
        },
        surface: {
          border: "var(--border-color)",
          muted: "var(--surface-muted)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        lg: "0.75rem", // 12px
        xl: "0.875rem", // 14px
        "2xl": "1rem", // 16px
      },
    },
  },
  plugins: [],
};
export default config;
