import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import weddingData from "../data/weddingData.js";

const EASE = [0.22, 1, 0.36, 1];

export default function FAQ() {
  const { t, pick } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="font-display text-4xl text-gold text-center"
        >
          {t("faq.title")}
        </motion.h2>
        <div className="section-divider" />

        <div className="mt-10 space-y-3">
          {weddingData.faq.map((item, i) => {
            const open = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                className="gold-border rounded-sm overflow-hidden"
              >
                <motion.button
                  onClick={() => setOpenIndex(open ? null : i)}
                  whileHover={{ backgroundColor: "rgba(201,162,39,0.06)" }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                  className="w-full flex items-center justify-between px-5 py-4 text-left rtl:text-right font-display text-charcoal dark:text-champagne"
                  aria-expanded={open}
                >
                  <span>{pick(item.q)}</span>
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="text-gold ml-3 rtl:ml-0 rtl:mr-3"
                  >
                    {open ? "−" : "+"}
                  </motion.span>
                </motion.button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="px-5 overflow-hidden"
                    >
                      <p className="font-body text-sm text-charcoal/75 dark:text-champagne/75 pb-4">
                        {pick(item.a)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
