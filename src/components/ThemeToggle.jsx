import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="rounded-full gold-border px-3 py-1 text-xs tracking-wide text-charcoal dark:text-champagne hover:bg-gold/10 transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
