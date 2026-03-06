import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "var(--font-space-grotesk)", ...fontFamily.sans],
        display: ["Oxanium", "var(--font-oxanium)", ...fontFamily.sans]
      },
      colors: {
        night: {
          900: "#0a0e1a",
          800: "#0f1526",
          700: "#151d33"
        },
        accent: {
          blue: "#00d9ff",
          cyan: "#00ff88",
          magenta: "#ff006e"
        }
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 20% 20%, rgba(0,217,255,0.12) 0, rgba(0,217,255,0) 40%), radial-gradient(circle at 80% 0%, rgba(0,255,136,0.15) 0, rgba(0,255,136,0) 50%), radial-gradient(circle at 50% 60%, rgba(255,0,110,0.08) 0, rgba(255,0,110,0) 45%)",
        "accent-gradient": "linear-gradient(120deg, #ff006e 0%, #7209b7 50%, #00d9ff 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(0,217,255,0.1), rgba(0,255,136,0.05))"
      },
      boxShadow: {
        glass: "0 10px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,217,255,0.1)",
        neon: "0 0 30px rgba(0,217,255,0.6), 0 0 60px rgba(0,255,136,0.3)",
        card: "0 20px 80px rgba(0,0,0,0.6), 0 0 40px rgba(255,0,110,0.15)"
      },
      borderRadius: {
        hero: "32px"
      },
      blur: {
        glass: "18px"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.6s ease forwards",
        shimmer: "shimmer 1.8s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
