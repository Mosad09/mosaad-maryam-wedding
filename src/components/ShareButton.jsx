import React, { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import weddingData from "../data/weddingData.js";

export default function ShareButton() {
  const { t, lang } = useLanguage();
  const [showToast, setShowToast] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const title = weddingData.seo.title;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* user cancelled or share failed — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleShare}
        className="rounded-full gold-border px-6 py-3 font-display text-sm tracking-widest text-gold hover:bg-gold/10 transition-colors"
      >
        {t("share.button")}
      </button>
      {showToast && (
        <div
          role="status"
          dir={lang === "ar" ? "rtl" : "ltr"}
          className="absolute left-1/2 -translate-x-1/2 -bottom-11 whitespace-nowrap rounded-full bg-charcoal text-warmwhite text-xs px-4 py-2 shadow-lg"
        >
          {t("share.copied")}
        </div>
      )}
    </div>
  );
}
