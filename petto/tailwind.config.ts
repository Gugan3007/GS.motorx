import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          900: "#0f1217",
          800: "#141922",
          700: "#1a202b"
        },
        navy: {
          900: "#0b1a2b",
          800: "#122235",
          700: "#1b2c46"
        },
        gray: {
          100: "#f8f9fb",
          200: "#f3f4f6",
          300: "#e5e7eb",
          400: "#d1d5db"
        },
        accent: {
          gold: "#b08d57",
          steel: "#4b6b8b",
          forest: "#2e5a3f"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Ubuntu", "Noto Sans", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"]
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem"
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.08)",
        panel: "0 8px 30px rgba(0,0,0,0.12)"
      }
    }
  },
  plugins: []
} satisfies Config;