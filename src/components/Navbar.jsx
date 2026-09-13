import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import weddingData from "../data/weddingData.js";

const SECTIONS = ["home", "story", "events", "venue", "contact"];
const EASE = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-500 ${
          scrolled ? "bg-warmwhite/90 dark:bg-dark/90 backdrop-blur-md gold-border border-t-0 border-x-0" : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">
          <button
            onClick={() => scrollTo("home")}
            className="font-couple-names text-2xl text-gold transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            {weddingData.couple.monogram}
          </button>

          <div className="hidden md:flex items-center gap-7 font-display text-sm tracking-wide text-charcoal dark:text-champagne">
            {SECTIONS.map((s) => (
              <button key={s} onClick={() => scrollTo(s)} className="hover:text-gold transition-colors">
                {t(`nav.${s}`)}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <ThemeToggle />
          </div>

          <button
            className="md:hidden text-2xl text-gold p-2 -m-2 transition-transform duration-200 hover:scale-110 active:scale-90"
            onClick={() => setOpen((o) => !o)}
            aria-label="فتح القائمة"
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </nav>
      </header>

      {/* Rendered as a sibling of <header> rather than nested inside it —
          header gets `backdrop-blur` once scrolled, and a backdrop-filter
          ancestor establishes a new containing block for fixed/absolute
          descendants in some engines, which can detach a nested fixed
          overlay from the viewport. Keeping this menu a sibling avoids
          that entirely and keeps it reliably full-screen. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="md:hidden fixed inset-0 top-16 z-50 bg-warmwhite dark:bg-dark flex flex-col items-center justify-center gap-8 font-display text-xl text-charcoal dark:text-champagne"
          >
            {SECTIONS.map((s, i) => (
              <motion.button
                key={s}
                onClick={() => scrollTo(s)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.06 + i * 0.05, ease: EASE }}
              >
                {t(`nav.${s}`)}
              </motion.button>
            ))}
            <motion.div
              className="pt-2"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.06 + SECTIONS.length * 0.05, ease: EASE }}
            >
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
