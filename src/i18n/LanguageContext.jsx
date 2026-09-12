import React, { createContext, useContext, useEffect } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

// The site is Arabic-only by design — no language switcher. lang/dir are
// fixed constants rather than state so nothing can toggle them at runtime.
const lang = "ar";
const dir = "rtl";

export function LanguageProvider({ children }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, []);

  // t("nav.home") -> "الرئيسية"
  const t = (path) => {
    const parts = path.split(".");
    let node = translations[lang];
    for (const p of parts) {
      node = node?.[p];
      if (node === undefined) return path;
    }
    return node;
  };

  // Pick the Arabic value from a { en, ar } object in weddingData.js
  const pick = (obj) => (obj ? obj[lang] ?? obj.en : "");

  return (
    <LanguageContext.Provider value={{ lang, dir, t, pick }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
