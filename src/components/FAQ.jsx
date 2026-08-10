import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import weddingData from "../data/weddingData.js";

export default function FAQ() {
  const { t, pick } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-4xl text-gold text-center">{t("faq.title")}</h2>
        <div className="section-divider" />

        <div className="mt-10 space-y-3">
          {weddingData.faq.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={i} className="gold-border rounded-sm overflow-hidden">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left rtl:text-right font-display text-charcoal dark:text-champagne"
                  aria-expanded={open}
                >
                  <span>{pick(item.q)}</span>
                  <span className="text-gold ml-3 rtl:ml-0 rtl:mr-3">{open ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="px-5 overflow-hidden"
                    >
                      <p className="font-body text-sm text-charcoal/75 dark:text-champagne/75 pb-4">
                        {pick(item.a)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
