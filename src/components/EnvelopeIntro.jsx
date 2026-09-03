import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { useMusic } from "../context/MusicContext.jsx";
import weddingData from "../data/weddingData.js";

// Minimal opening: a single tap-to-open screen — needed only so the click
// itself can serve as the user gesture that unlocks audio on mobile —
// followed by a quick gold fade straight into the site. No wax seal, no
// envelope animation, no card slide.
export default function EnvelopeIntro({ onComplete }) {
  const { t, dir, pick } = useLanguage();
  const { start } = useMusic();
  const [phase, setPhase] = useState("idle"); // idle -> wipe -> done
  const [reducedMotion, setReducedMotion] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const begin = useCallback(() => {
    if (phase !== "idle") return;
    start(); // user-gesture click unlocks audio playback
    if (reducedMotion) {
      onComplete();
      return;
    }
    setPhase("wipe");
    const id = setTimeout(() => onComplete(), 550);
    timers.current.push(id);
  }, [phase, reducedMotion, start, onComplete]);

  return (
    <div
      dir={dir}
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-ivory"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 38%, rgba(201,162,39,0.08), transparent 60%)",
      }}
    >
      <AnimatePresence>
        {phase === "idle" && (
          <motion.button
            key="idle"
            onClick={begin}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-5 px-8"
            aria-label={t("intro.tapToOpen")}
          >
            <span className="font-couple-names text-4xl text-gold mb-1">
              {weddingData.couple.monogram}
            </span>
            <p className="font-display text-sm md:text-base text-charcoal/75 max-w-xs text-center leading-relaxed">
              {pick(weddingData.openingMessage)}
            </p>
            <p className="font-couple-names text-3xl text-gold">
              {weddingData.couple.groom.nameAr} &amp; {weddingData.couple.bride.nameAr}
            </p>
            <span className="mt-1 inline-block rounded-full bg-gold text-warmwhite px-7 py-3 font-display text-sm tracking-widest shadow-md hover:brightness-105 transition">
              {t("intro.tapToOpen")}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "wipe" && (
          <motion.div
            key="wipe"
            className="absolute inset-0 z-20"
            style={{
              background: "radial-gradient(circle, #f7f3ea 0%, #e8d7a8 45%, #c9a227 100%)",
            }}
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            transition={{ duration: 0.55, ease: [0.83, 0, 0.17, 1] }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
