import React from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function LanguageSwitcher() {
  const { lang, toggleLang } = useLanguage();
  return (
    <button
      onClick={toggleLang}
      className="rounded-full gold-border px-3 py-1 text-xs tracking-wide text-charcoal dark:text-champagne hover:bg-gold/10 transition-colors"
      aria-label="Toggle language"
    >
      {lang === "en" ? "العربية" : "English"}
    </button>
  );
}
