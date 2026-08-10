import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function EventSection({ id, event, reverse, mapLink, mapLabel, children }) {
  const { pick } = useLanguage();

  return (
    <section id={id} className="py-20 px-6">
      <div
        className={`max-w-4xl mx-auto flex flex-col ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } items-center gap-10`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-1/2 aspect-[4/3] gold-border rounded-sm overflow-hidden shadow-lg"
        >
          <img
            src={event.photo}
            alt={pick(event.title)}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml;utf8," +
                encodeURIComponent(
                  `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='450'><rect width='100%' height='100%' fill='%23EDE5D5'/><text x='50%' y='50%' font-size='22' fill='%23C9A227' text-anchor='middle' dominant-baseline='middle'>${pick(
                    event.title
                  )}</text></svg>`
                );
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-1/2 text-center md:text-left rtl:md:text-right"
        >
          <h2 className="font-display text-4xl text-gold">{pick(event.title)}</h2>
          <div className="section-divider md:mx-0 md:rtl:mr-0 md:rtl:ml-auto mx-auto" />
          <p className="font-display text-charcoal dark:text-champagne text-lg">
            {pick(event.time) ? `${pick(event.date)} — ${pick(event.time)}` : pick(event.date)}
          </p>
          {event.location && (
            <p className="font-display text-charcoal/70 dark:text-champagne/70 mt-1">
              {pick(event.location)}
            </p>
          )}
          <p className="font-body text-sm text-charcoal/70 dark:text-champagne/70 mt-4 leading-relaxed">
            {pick(event.description)}
          </p>

          {mapLink && (
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 text-xs tracking-widest uppercase gold-border rounded-full px-5 py-2 text-gold hover:bg-gold/10 transition-colors"
            >
              {mapLabel}
            </a>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
