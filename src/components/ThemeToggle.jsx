import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext.jsx";

// `floating` renders it as a circular icon button matching the fixed
// bottom-corner buttons (music player, WhatsApp) instead of the small
// pill used inline in the navbar.
export default function ThemeToggle({ floating = false }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      className={
        floating
          ? "w-10 h-10 rounded-full bg-warmwhite/90 dark:bg-charcoal/90 gold-border shadow-md flex items-center justify-center text-gold hover:scale-105 transition-transform"
          : "rounded-full gold-border px-3 py-1 text-xs tracking-wide text-charcoal dark:text-champagne hover:bg-gold/10 transition-colors"
      }
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? "☀" : "☾"}
    </motion.button>
  );
}
