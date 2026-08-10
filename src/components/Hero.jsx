import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import weddingData from "../data/weddingData.js";
import Countdown from "./Countdown.jsx";

export default function Hero() {
  const { pick } = useLanguage();
  const { groom, bride } = weddingData.couple;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 overflow-hidden bg-ivory dark:bg-dark"
    >
      {/* very subtle warm paper texture / vignette, static — no moving gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 30%, rgba(201,162,39,0.07), transparent 55%)",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-display text-[11px] md:text-xs tracking-[0.35em] text-charcoal/60 dark:text-champagne/70 uppercase mb-3"
      >
        Together with their families
      </motion.p>

      <div className="relative">
        {/* soft warm spotlight directly behind the names, nothing else */}
        <div
          className="absolute inset-0 -z-10 blur-2xl opacity-70 dark:opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(232,215,168,0.55), transparent 75%)",
          }}
          aria-hidden="true"
        />
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-couple-names text-6xl md:text-8xl text-gold leading-tight px-4"
        >
          {groom.nameAr} &amp; {bride.nameAr}
        </motion.h1>
      </div>

      <div className="section-divider" />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="font-display text-lg md:text-2xl text-charcoal dark:text-champagne italic"
      >
        {pick(weddingData.hero.headline)}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="font-display tracking-[0.3em] text-sm md:text-base text-charcoal/70 dark:text-champagne/80 mt-3"
      >
        {pick(weddingData.weddingDateDisplay)}
      </motion.p>

      <div className="mt-14 w-full">
        <Countdown />
      </div>

      <motion.div
        className="absolute bottom-8 text-gold/70 text-lg"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        ↓
      </motion.div>
    </section>
  );
}
