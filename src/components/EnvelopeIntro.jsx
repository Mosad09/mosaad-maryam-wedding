import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { useMusic } from "../context/MusicContext.jsx";
import weddingData from "../data/weddingData.js";
import WaxSeal from "./WaxSeal.jsx";
import InvitationCard from "./InvitationCard.jsx";

// Fast, light, luxury-paper-feel opening — click to wipe is ~4.6s.
export default function EnvelopeIntro({ onComplete }) {
  const { t, dir, pick } = useLanguage();
  const { start } = useMusic();
  const [phase, setPhase] = useState("idle"); // idle -> seal -> crack -> envelope -> card -> names -> wipe -> done
  const [reducedMotion, setReducedMotion] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const schedule = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };

  const begin = useCallback(() => {
    if (phase !== "idle") return;
    start(); // user-gesture click unlocks audio playback
    if (reducedMotion) {
      setPhase("names");
      schedule(() => setPhase("wipe"), 900);
      schedule(() => onComplete(), 1500);
      return;
    }
    setPhase("seal");
    schedule(() => setPhase("crack"), 700);
    schedule(() => setPhase("envelope"), 1500);
    schedule(() => setPhase("card"), 2200);
    schedule(() => setPhase("names"), 2800);
    schedule(() => setPhase("wipe"), 3900);
    schedule(() => onComplete(), 4600);
  }, [phase, reducedMotion, start, onComplete]);

  const skip = useCallback(() => {
    timers.current.forEach(clearTimeout);
    onComplete();
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      dir={dir}
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-ivory"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 38%, rgba(201,162,39,0.08), transparent 60%)",
      }}
    >
      {phase !== "idle" && <GoldDust />}

      <AnimatePresence>
        {phase === "idle" && (
          <motion.button
            key="idle"
            onClick={begin}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
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

      {phase !== "idle" && (
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {(phase === "seal" || phase === "crack") && (
              <WaxSeal key="seal" cracking={phase === "crack"} />
            )}
            {(phase === "envelope" || phase === "card" || phase === "names") && (
              <Envelope key="envelope" stage={phase} />
            )}
          </AnimatePresence>
        </div>
      )}

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
            transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
          />
        )}
      </AnimatePresence>

      {phase !== "idle" && phase !== "wipe" && (
        <button
          onClick={skip}
          className="absolute bottom-6 right-6 rtl:right-auto rtl:left-6 z-30 font-display text-xs tracking-widest uppercase text-charcoal/50 hover:text-gold transition-colors"
        >
          {t("intro.skip")}
        </button>
      )}
    </div>
  );
}

function Envelope({ stage }) {
  const flapOpen = stage !== "envelope" ? -172 : 0;

  return (
    <motion.div
      className="relative w-72 max-w-[80vw]"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative w-full" style={{ height: 190 }}>
        <div className="absolute inset-0 z-[2]">
          <InvitationCard stage={stage} />
        </div>

        <div
          className="absolute inset-0 rounded-sm shadow-xl border gold-border"
          style={{ background: "linear-gradient(180deg, #f7f3ea 0%, #ece2c9 100%)" }}
        />

        <motion.div
          className="absolute top-0 left-0 right-0 border-b gold-border"
          style={{
            height: 130,
            background: "linear-gradient(160deg, #efe4c4 0%, #d9c691 100%)",
            clipPath: "polygon(0 0, 100% 0, 50% 78%)",
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
          }}
          animate={{ rotateX: flapOpen }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>
    </motion.div>
  );
}

function GoldDust() {
  const particles = React.useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 5 + Math.random() * 3,
        size: 2 + Math.random() * 2,
      })),
    []
  );
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: -10,
            width: p.size,
            height: p.size,
            background: "radial-gradient(circle, #e8d7a8 0%, rgba(201,162,39,0) 70%)",
          }}
          animate={{ y: [-10, -320], opacity: [0, 0.5, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}
