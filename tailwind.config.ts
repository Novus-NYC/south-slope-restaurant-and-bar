import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F6F1E6",
          deep: "#ECE4D3",
        },
        charcoal: {
          DEFAULT: "#1B1B19",
          soft: "#2A2A27",
        },
        green: {
          deep: "#0B5D3B",
          deeper: "#07432B",
          leaf: "#4CC96A",
          pale: "#DDF0E2",
        },
        wood: {
          DEFAULT: "#C8924F",
          light: "#E3B778",
        },
        ink: {
          DEFAULT: "#1B1B19",
          muted: "#5C5A53",
        },
        line: "#D9D0BC",
      },
      fontFamily: {
        display: ['"Fraunces Variable"', "Georgia", "serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
      },
      fontSize: {
        /** Secondary body copy: notes, ledes under facts, button labels. */
        body: ["0.95rem", { lineHeight: "1.6" }],
        /** Uppercase section labels, always with `tracking-eyebrow`. */
        eyebrow: ["0.75rem", { lineHeight: "1rem" }],
      },
      letterSpacing: {
        eyebrow: "0.2em",
      },
      maxWidth: {
        site: "76rem",
      },
      transitionDuration: {
        DEFAULT: "250ms",
      },
    },
  },
  plugins: [],
}
export default config
