// tailwind.config.js (ESM)
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      "heading1-bold": ["36px", { lineHeight: "100%", fontWeight: "700" }],
      "heading2-bold": ["30px", { lineHeight: "140%", fontWeight: "700" }],
      "heading3-bold": ["24px", { lineHeight: "140%", fontWeight: "700" }],
      "heading4-bold": ["20px", { lineHeight: "140%", fontWeight: "700" }],
      "body-bold":    ["18px", { lineHeight: "140%", fontWeight: "700" }],
      "body-medium":  ["18px", { lineHeight: "140%", fontWeight: "500" }],
      "base-bold":    ["16px", { lineHeight: "140%", fontWeight: "600" }],
      "base-medium":  ["16px", { lineHeight: "140%", fontWeight: "500" }],
      "base-light":   ["16px", { lineHeight: "140%", fontWeight: "400" }],
      "small-bold":   ["14px", { lineHeight: "140%", fontWeight: "600" }],
      "small-medium": ["14px", { lineHeight: "140%", fontWeight: "500" }],
      "subtle-medium":["12px", { lineHeight: "16px",  fontWeight: "500" }],
      "tiny-medium":  ["10px", { lineHeight: "140%", fontWeight: "500" }],
      "x-small-bold": ["7px",  { lineHeight: "9.318px", fontWeight: "600" }],
    },
    extend: {
      colors: {
        white: "var(--color-white)",
        light: "var(--color-light)",
        dark: "var(--color-dark)",
        gray: "var(--color-gray)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        black: "var(--color-black)",
        success: "var(--color-success)",
        danger: "var(--color-danger)",
        "blue-1": "#0A065C",
        "blue-2": "#F5F7FB",
        "blue-3": "#04A1E3",
        "grey-1": "#737373",
        "grey-2": "#f0f0f0",
        "grey-3": "#8B8B8B",
        "red-1": "#FF5252",
        "purple-1": "#C6D4FF",
        "purple-2": "#4D426D",
        "green-1": "#13E0E0",
        "pink-1": "#FDDAD6",
      },
      backgroundImage: {
        bgHaui:
          "url('https://xdcs.cdnchinhphu.vn/446259493575335936/2024/1/4/t94467-1704321705073-17043217052481641427499.jpg')",
      },
      screens: { xs: "480px" },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};
