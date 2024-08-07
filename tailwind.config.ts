import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        black: "var(--color-black)",
        white: "var(--color-white)",
        gray50: "var(--color-gray50)",
        gray100: "var(--color-gray100)",
        gray200: "var(--color-gray200)",
        gray300: "var(--color-gray300)",
        gray400: "var(--color-gray400)",
        gray500: "var(--color-gray500)",
        gray600: "var(--color-gray600)",
        gray800: "var(--color-gray800)",
        green100: "var(--color-green100)",
        green200: "var(--color-green200)",
        green300: "var(--color-green300)",
        red100: "var(--color-red100)",
        red300: "var(--color-red300)",
        purple: "var(--color-purple)",
        yellow: "var(--color-yellow)",
        gray10: "var(--color-gray10)",
        gray20: "var(--color-gray20)",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translate3d(0, 20%, 0)" },
          to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s",
      },
    },
  },
  plugins: [],
};
export default config;
