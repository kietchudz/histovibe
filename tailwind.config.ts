import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neon: {
          pink: "#FF2E97",
          blue: "#00D4FF",
          purple: "#A855F7",
          green: "#39FF14",
          yellow: "#FFE600",
          orange: "#FF6B35",
        },
        cyber: {
          dark: "#0A0A0F",
          darker: "#050508",
          surface: "#12121A",
          card: "#1A1A25",
          border: "#2A2A3A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        "slide-up": "slide-up 0.3s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        glow: "glow 2s ease-in-out infinite alternate",
        progress: "progress 5s linear",
      },
      keyframes: {
        "pulse-neon": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px currentColor, 0 0 10px currentColor" },
          "100%": { boxShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor" },
        },
        progress: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      boxShadow: {
        "neon-pink": "0 0 20px rgba(255, 46, 151, 0.5)",
        "neon-blue": "0 0 20px rgba(0, 212, 255, 0.5)",
        "neon-purple": "0 0 20px rgba(168, 85, 247, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
