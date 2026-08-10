import React, { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import weddingData from "../data/weddingData.js";

const SECTIONS = ["home", "story", "events", "venue", "contact"];

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
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-500 ${
        scrolled ? "bg-warmwhite/90 dark:bg-dark/90 backdrop-blur-md gold-border border-t-0 border-x-0" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">
        <button onClick={() => scrollTo("home")} className="font-couple-names text-2xl text-gold">
          {weddingData.couple.monogram}
        </button>

        <div className="hidden md:flex items-center gap-7 font-display text-sm tracking-wide text-charcoal dark:text-champagne">
          {SECTIONS.map((s) => (
            <button key={s} onClick={() => scrollTo(s)} className="hover:text-gold transition-colors">
              {t(`nav.${s}`)}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <button
          className="md:hidden text-2xl text-gold"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-warmwhite dark:bg-dark flex flex-col items-center justify-center gap-8 font-display text-xl text-charcoal dark:text-champagne">
          {SECTIONS.map((s) => (
            <button key={s} onClick={() => scrollTo(s)}>
              {t(`nav.${s}`)}
            </button>
          ))}
          <div className="flex gap-3 pt-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
