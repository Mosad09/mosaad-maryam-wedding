import React from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import weddingData from "../data/weddingData.js";
import ShareButton from "./ShareButton.jsx";
import CalendarButton from "./CalendarButton.jsx";
import QRCode from "./QRCode.jsx";

export default function Contact() {
  const { t } = useLanguage();
  const { whatsappUrl } = weddingData.contacts;

  return (
    <section id="contact" className="py-20 px-6 bg-beige/40 dark:bg-charcoal/30">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-display text-4xl text-gold">{t("contact.title")}</h2>
        <div className="section-divider" />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 rounded-full bg-gold text-warmwhite px-7 py-3 font-display text-sm tracking-widest hover:brightness-110 transition"
        >
          {t("contact.whatsapp")}
        </a>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <ShareButton />
          <CalendarButton />
        </div>

        <div className="mt-12">
          <QRCode />
        </div>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform text-sm"
      >
        ✆
      </a>
    </section>
  );
}
