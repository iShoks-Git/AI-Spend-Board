/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        ink: {
          950: "#08080a",
          900: "#0b0b0f",
          800: "#111118",
          700: "#1a1a24",
          600: "#262633",
        },
        bone: "#ece8df",
        ember: "#ff5b1f",
        copper: "#c97b3a",
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
      animation: {
        "shimmer": "shimmer 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
