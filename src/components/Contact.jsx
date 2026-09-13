import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import weddingData from "../data/weddingData.js";
import ShareButton from "./ShareButton.jsx";
import CalendarButton from "./CalendarButton.jsx";
import QRCode from "./QRCode.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const EASE = [0.22, 1, 0.36, 1];

// Very faint drifting lines behind the section — a subtle "alive"
// texture, not a decoration meant to be consciously noticed.
function BackgroundLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
      <motion.svg
        viewBox="0 0 800 400"
        preserveAspectRatio="none"
        className="w-full h-full"
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="-50" y1="60" x2="850" y2="140" stroke="#C9A227" strokeWidth="1" />
        <line x1="-50" y1="190" x2="850" y2="90" stroke="#C9A227" strokeWidth="1" />
        <line x1="-50" y1="300" x2="850" y2="380" stroke="#C9A227" strokeWidth="1" />
        <line x1="-50" y1="410" x2="850" y2="260" stroke="#C9A227" strokeWidth="1" />
      </motion.svg>
    </div>
  );
}

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
        animate={{ y: [0, -5, 0], backgroundColor: "#C9A227" }}
        transition={{
          y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
          backgroundColor: { duration: 0.4, ease: EASE },
        }}
        whileHover={{
          scale: 1.08,
          backgroundColor: "#8F6F1F",
          transition: { duration: 0.35, ease: EASE },
        }}
        whileTap={{ scale: 0.95 }}
        aria-expanded={open}
        className="rounded-full text-warmwhite px-12 py-4 font-display text-xl tracking-widest shadow-md transition-shadow hover:shadow-xl"
      >
        {name}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* click-away layer */}
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.85 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute top-full mt-3 z-20 flex flex-col gap-3 rounded-xl bg-warmwhite dark:bg-dark gold-border shadow-2xl p-4 w-56"
            >
              <motion.a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                animate={{ backgroundColor: "#25D366" }}
                whileHover={{
                  scale: 1.06,
                  backgroundColor: "#1DA851",
                  transition: { duration: 0.3, ease: EASE },
                }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg text-white text-lg py-3 text-center font-display tracking-wide shadow-md"
              >
                واتساب
              </motion.a>
              <motion.a
                href={telUrl}
                animate={{ backgroundColor: "rgba(201,162,39,0)" }}
                whileHover={{
                  scale: 1.06,
                  backgroundColor: "#C9A227",
                  color: "#FFFDF8",
                  transition: { duration: 0.3, ease: EASE },
                }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg gold-border text-gold text-lg py-3 text-center font-display tracking-wide"
              >
                مكالمة
              </motion.a>
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
    <section id="contact" className="relative overflow-hidden py-20 px-6 bg-beige/40 dark:bg-charcoal/30">
      <BackgroundLines />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative z-10 max-w-xl mx-auto text-center"
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
