import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import weddingData from "../data/weddingData.js";

export default function WeddingSection() {
  const { pick } = useLanguage();
  const { wedding } = weddingData.events;
  const { groom, bride } = weddingData.couple;

  return (
    <section id="wedding" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${wedding.photo})` }}
      />
      <div className="absolute inset-0 -z-10 bg-dark/70" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="font-display text-sm tracking-[0.3em] uppercase text-champagne/90 mb-2">
          {pick(wedding.title)}
        </h2>
        <p className="font-couple-names text-5xl md:text-6xl text-gold">
          {groom.nameAr} &amp; {bride.nameAr}
        </p>
        <div className="section-divider" />
        <p className="font-display text-lg text-warmwhite">
          {pick(wedding.date)} — {pick(wedding.time)}
        </p>
        <p className="font-display text-warmwhite/80 mt-1">{pick(wedding.venue)}</p>
        <p className="font-display text-warmwhite/60 text-sm">{pick(wedding.address)}</p>
      </motion.div>
    </section>
  );
}
