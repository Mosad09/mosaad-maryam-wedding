/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gold: "#C9A227",
        champagne: "#E8D7A8",
        warmwhite: "#FFFDF8",
        ivory: "#E9D8A8",
        beige: "#EDE5D5",
        charcoal: "#24211D",
        dark: "#151311",
      },
      fontFamily: {
        // Arabic fallbacks appended after the Latin display/body faces so
        // every Arabic character (headings, dates, body copy) renders in
        // Amiri/Noto Naskh Arabic instead of silently falling back to the
        // browser's generic serif/sans-serif — Playfair Display and Inter
        // carry no Arabic glyphs at all.
        display: ["'Playfair Display'", "'Cormorant Garamond'", "'Amiri'", "'Noto Naskh Arabic'", "serif"],
        body: ["'Inter'", "'Noto Naskh Arabic'", "'Amiri'", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%, 100%": { opacity: 0.75, filter: "brightness(1)" },
          "50%": { opacity: 1, filter: "brightness(1.25)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
