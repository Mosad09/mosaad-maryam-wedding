import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import weddingData from "../data/weddingData.js";

export default function ChildhoodSection() {
  const { pick } = useLanguage();
  const { childhood } = weddingData;

  return (
    <section className="py-20 px-6 bg-ivory dark:bg-dark">
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block bg-warmwhite p-3 pb-6 gold-border shadow-lg rounded-sm"
        >
          <img
            src={childhood.photo}
            alt="Mosaad & Maryam, together as children"
            loading="lazy"
            className="w-72 h-72 md:w-80 md:h-80 object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml;utf8," +
                encodeURIComponent(
                  `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='100%' height='100%' fill='%23EDE5D5'/><text x='50%' y='50%' font-size='16' fill='%23C9A227' text-anchor='middle' dominant-baseline='middle'>Photo</text></svg>`
                );
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-display italic text-lg md:text-xl text-charcoal/80 dark:text-champagne/90 mt-6"
        >
          {pick(childhood.title)}
        </motion.p>
      </div>
    </section>
  );
}
