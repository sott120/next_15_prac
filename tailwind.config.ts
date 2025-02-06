import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nanum: ["NanumSquare"],
      },
      screens: {
        sm: "375px",
        md: "744px",
        lg: "1200px",
        xl: "1920px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        slate: {
          900: "#0F172A",
          800: "#1E293B",
          500: "#64748B",
          400: "#94A3B8",
          300: "#CBD5E1",
          200: "#E2E8F0",
          100: "#F1F5F9",
        },
        violet: {
          600: "#7C3AED",
          100: "#EDE9FE",
        },
        rose: {
          500: "#F43F5E",
        },
        lime: {
          300: "#BEF264",
        },
        amber: {
          800: "#92400E",
        },
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".break-point": {
          "@apply max-sm:w-[375px] max-md:w-[744px] max-lg:w-[1200px] max-xl:w-[100%]":
            "",
        },
      });
    }),
  ],
} satisfies Config;
