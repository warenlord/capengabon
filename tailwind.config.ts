import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Extracted from the CAPEN logo (leaf green) + earth tones from the field photography
        capen: {
          green: {
            50: "#F1F7EB",
            100: "#E1EFD3",
            200: "#C3DFA8",
            300: "#9FCB78",
            400: "#7CB74F",
            500: "#5C9A34", // primary
            600: "#487A29",
            700: "#396122",
            800: "#2E4D1C",
            900: "#233A15",
          },
          earth: {
            50: "#FAF4EC",
            100: "#F0E1CC",
            200: "#DEC19A",
            300: "#C69A69",
            400: "#AD7A47",
            500: "#8F5F33", // secondary / accent
            600: "#734A27",
            700: "#5A3A20",
            800: "#432B18",
            900: "#2E1D10",
          },
          cream: "#F8F6EF",
          ink: "#211E19",
          paper: "#FFFEFC",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1240px",
      },
      boxShadow: {
        card: "0 2px 10px rgba(33, 30, 25, 0.06), 0 1px 2px rgba(33, 30, 25, 0.08)",
        cardHover: "0 12px 30px rgba(33, 30, 25, 0.12)",
      },
      borderRadius: {
        card: "0.875rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
