import React from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import weddingData from "../data/weddingData.js";

export default function Footer() {
  const { t, pick } = useLanguage();
  const { groom, bride } = weddingData.couple;

  return (
    <footer className="py-14 px-6 text-center border-t gold-border bg-ivory dark:bg-dark">
      <p className="font-couple-names text-3xl text-gold">
        {groom.nameAr} &amp; {bride.nameAr}
      </p>
      <p className="font-display text-sm tracking-widest text-charcoal/70 dark:text-champagne/70 mt-2">
        {pick(weddingData.weddingDateDisplay)}
      </p>
      <p className="font-display italic text-charcoal/60 dark:text-champagne/60 mt-4 text-sm">
        {t("footer.thankYou")}
      </p>
    </footer>
  );
}
