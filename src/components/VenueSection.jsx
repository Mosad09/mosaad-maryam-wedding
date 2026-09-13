import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import weddingData from "../data/weddingData.js";

export default function VenueSection() {
  const { t, pick } = useLanguage();
  const { venue } = weddingData;

  return (
    <section id="venue" className="py-20 px-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-1/2 flex justify-center order-first"
        >
          {/* framed print, like the engagement/katb-ketab photos — tall and
              never cropped, shown in full via object-contain. Tapping it
              opens the same maps link as the button below. */}
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("venue.openMaps")}
            className="group inline-block bg-warmwhite dark:bg-charcoal/40 p-3 gold-border shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-sm overflow-hidden cursor-pointer"
          >
            <img
              src={venue.photo}
              alt={pick(venue.name)}
              loading="lazy"
              className="w-full max-w-xs md:max-w-sm max-h-[600px] object-contain transition-transform duration-700 group-hover:scale-[1.03]"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml;utf8," +
                  encodeURIComponent(
                    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='450'><rect width='100%' height='100%' fill='%23EDE5D5'/><text x='50%' y='50%' font-size='20' fill='%23C9A227' text-anchor='middle' dominant-baseline='middle'>${pick(
                      venue.name
                    )}</text></svg>`
                  );
              }}
            />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-1/2 text-center md:text-left rtl:md:text-right"
        >
          <h2 className="font-display text-4xl text-gold">{t("venue.title")}</h2>
          <div className="section-divider md:mx-0 md:rtl:mr-0 md:rtl:ml-auto mx-auto" />
          <p className="font-display text-xl text-charcoal dark:text-champagne">{pick(venue.name)}</p>
          <p className="font-display text-charcoal/70 dark:text-champagne/70 mt-1">
            {pick(venue.address)}
          </p>

          <motion.a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            className="mt-5 inline-flex items-center gap-2 text-xs tracking-widest uppercase gold-border rounded-full px-6 py-3 text-gold hover:bg-gold/10 transition-colors"
          >
            <motion.span
              aria-hidden="true"
              className="text-sm"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              📍
            </motion.span>
            {t("venue.openMaps")}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
