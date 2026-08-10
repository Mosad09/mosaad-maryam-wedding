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
        ivory: "#F7F3EA",
        beige: "#EDE5D5",
        charcoal: "#24211D",
        dark: "#151311",
      },
      fontFamily: {
        arabicDisplay: ["'Aref Ruqaa Ink'", "'Aref Ruqaa'", "serif"],
        arabicBody: ["'Amiri'", "'Noto Naskh Arabic'", "serif"],
        display: ["'Playfair Display'", "'Cormorant Garamond'", "serif"],
        body: ["'Inter'", "sans-serif"],
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
