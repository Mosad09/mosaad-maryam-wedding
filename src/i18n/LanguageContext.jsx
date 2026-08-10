import React, { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);
const STORAGE_KEY = "wedding_language_preference";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ar") return saved;
    } catch {
      /* ignore */
    }
    return "en";
  });

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang, dir]);

  const toggleLang = () => setLang((l) => (l === "en" ? "ar" : "en"));

  // t("nav.home") -> "Home" / "الرئيسية"
  const t = (path) => {
    const parts = path.split(".");
    let node = translations[lang];
    for (const p of parts) {
      node = node?.[p];
      if (node === undefined) return path;
    }
    return node;
  };

  // Pick the right-language value from a { en, ar } object in weddingData.js
  const pick = (obj) => (obj ? obj[lang] ?? obj.en : "");

  return (
    <LanguageContext.Provider value={{ lang, dir, toggleLang, t, pick }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
