import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import weddingData from "../data/weddingData.js";
import ShareButton from "./ShareButton.jsx";
import CalendarButton from "./CalendarButton.jsx";
import QRCode from "./QRCode.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const EASE = [0.22, 1, 0.36, 1];

export default function Contact() {
  const { t } = useLanguage();
  const { whatsappUrl } = weddingData.contacts;

  return (
    <section id="contact" className="py-20 px-6 bg-beige/40 dark:bg-charcoal/30">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="max-w-xl mx-auto text-center"
      >
        <h2 className="font-display text-4xl text-gold">{t("contact.title")}</h2>
        <div className="section-divider" />

        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.95 }}
          className="inline-block mt-6 rounded-full bg-gold text-warmwhite px-7 py-3 font-display text-sm tracking-widest hover:brightness-110 transition"
        >
          {t("contact.whatsapp")}
        </motion.a>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <ShareButton />
          <CalendarButton />
        </div>

        <div className="mt-12">
          <QRCode />
        </div>
      </motion.div>

      <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 flex items-center gap-2">
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform text-sm"
        >
          ✆
        </motion.a>
        <ThemeToggle floating />
      </div>
    </section>
  );
}
