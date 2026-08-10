import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import weddingData from "../data/weddingData.js";

export default function WeddingSchedule() {
  const { t, pick } = useLanguage();

  return (
    <section className="py-20 px-6 bg-beige/40 dark:bg-charcoal/30">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-4xl text-gold">{t("schedule.title")}</h2>
        <div className="section-divider" />

        <div className="mt-10 space-y-6">
          {weddingData.schedule.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="flex items-center justify-center gap-4 font-display"
            >
              <span className="text-gold tracking-widest text-sm w-24 text-right rtl:text-left">
                {pick(item.time)}
              </span>
              <span className="w-2 h-2 rounded-full bg-gold" />
              <span className="text-charcoal dark:text-champagne text-lg">{pick(item.label)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
