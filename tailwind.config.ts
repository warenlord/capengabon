import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Extracted from the CAPEN logo (leaf green) + earth tones from the field photography
        capen: {
          green: {
            50: "#F0FDF4",
            100: "#DCFCE7",
            200: "#BBF7D0",
            300: "#86EFAC",
            400: "#4ADE80",
            500: "#25D366", // primary — vert WhatsApp
            600: "#15803D",
            700: "#166534",
            800: "#14532D",
            900: "#0F3D22",
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
