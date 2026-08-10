import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import weddingData from "../data/weddingData.js";

export default function InvitationCard({ stage }) {
  const { pick } = useLanguage();
  const cardOut = stage === "card" || stage === "names";
  const { groom, bride } = weddingData.couple;

  return (
    <motion.div
      className="relative w-[86%] max-w-xs mx-auto min-h-[240px] bg-warmwhite border gold-border rounded-sm shadow-2xl px-6 py-8 text-center"
      animate={cardOut ? { y: -168, opacity: 1 } : { y: 40, opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="font-display italic text-[11px] tracking-[0.2em] text-charcoal/70 uppercase mb-2">
        بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ
      </p>

      <AnimatePresence>
        {stage === "names" && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(3px)", y: 6 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="font-couple-names text-gold text-4xl leading-tight py-2"
          >
            <div>{groom.nameAr}</div>
            <div className="text-2xl my-1">&amp;</div>
            <div>{bride.nameAr}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="font-display text-[11px] tracking-widest text-charcoal/60 mt-3">
        Together with their families
      </p>
      <div className="section-divider" />
      <p className="font-display text-sm tracking-[0.25em] text-charcoal/80">
        {pick(weddingData.weddingDateDisplay)}
      </p>
    </motion.div>
  );
}
