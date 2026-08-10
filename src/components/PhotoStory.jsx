import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import weddingData from "../data/weddingData.js";

export default function PhotoStory() {
  const { pick } = useLanguage();

  return (
    <>
      {weddingData.photoStory.map((slide, i) => (
        <section
          key={i}
          className="relative h-[70vh] min-h-[420px] flex items-center justify-center overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-dark/50" />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9 }}
            className="relative font-display italic text-2xl md:text-4xl text-warmwhite text-center px-6 max-w-xl"
          >
            {pick(slide.text)}
          </motion.p>
        </section>
      ))}
    </>
  );
}
