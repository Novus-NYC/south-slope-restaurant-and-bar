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
