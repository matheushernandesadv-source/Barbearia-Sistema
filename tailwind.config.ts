import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fbf7ea",
          100: "#f4ebc7",
          200: "#e9d68f",
          300: "#dcbd5c",
          400: "#d1a838",
          500: "#c19325",
          600: "#a6791d",
          700: "#835c1b",
          800: "#6c4a1c",
          900: "#5c3f1c",
        },
        ink: {
          900: "#08090b",
          850: "#0c0e12",
          800: "#111318",
          700: "#181b21",
          600: "#22262e",
          500: "#2e333d",
          400: "#454b57",
          300: "#6b7280",
          200: "#9aa1ad",
          100: "#c9ced6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(209,168,56,0.25), 0 8px 30px -8px rgba(209,168,56,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
