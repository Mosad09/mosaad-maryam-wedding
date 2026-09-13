import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import weddingData from "../data/weddingData.js";
import ShareButton from "./ShareButton.jsx";
import CalendarButton from "./CalendarButton.jsx";
import QRCode from "./QRCode.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const EASE = [0.22, 1, 0.36, 1];

// One day-of helper's contact button. Tapping it doesn't call/message
// directly — it opens a small menu so the guest picks WhatsApp or a
// phone call themselves.
function HelperContact({ name, phone }) {
  const [open, setOpen] = useState(false);
  const waUrl = `https://wa.me/2${phone}`;
  const telUrl = `tel:+2${phone}`;

  return (
    <div className="relative flex flex-col items-center gap-2">
      <p className="font-display text-sm text-charcoal/60 dark:text-champagne/60">
        اضغط هنا للتواصل
      </p>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        whileTap={{ scale: 0.95 }}
        aria-expanded={open}
        className="rounded-full bg-gold text-warmwhite px-12 py-4 font-display text-xl tracking-widest shadow-md hover:brightness-110 transition"
      >
        {name}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* click-away layer */}
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="absolute top-full mt-2 z-20 flex flex-col gap-2 rounded-lg bg-warmwhite dark:bg-dark gold-border shadow-xl p-2 w-40"
            >
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#25D366] text-white text-sm py-2 text-center font-display tracking-wide hover:brightness-105 active:scale-95 transition"
              >
                واتساب
              </a>
              <a
                href={telUrl}
                className="rounded-md gold-border text-gold text-sm py-2 text-center font-display tracking-wide hover:bg-gold/10 active:scale-95 transition"
              >
                مكالمة
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const { t, pick } = useLanguage();
  const { helpers, intro } = weddingData.contacts;
  const primary = helpers[0];

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
        <p className="font-body text-sm text-charcoal/70 dark:text-champagne/70 max-w-sm mx-auto leading-relaxed">
          {pick(intro)}
        </p>

        <div className="mt-8 flex flex-wrap items-start justify-center gap-10">
          {helpers.map((h) => (
            <HelperContact key={h.phone} name={h.name} phone={h.phone} />
          ))}
        </div>

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
          href={`https://wa.me/2${primary.phone}`}
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
