import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { useMusic } from "../context/MusicContext.jsx";
import weddingData from "../data/weddingData.js";
import WaxSeal from "./WaxSeal.jsx";

const EASE = [0.22, 1, 0.36, 1];

// Envelope accent palette (used for the fold trim, not as a full fill)
const LIGHT = "#E7DFD7";
const MID = "#D3B774";
const DARK = "#C1A984";
const PAPER = "#FBF8F2"; // white card-stock base
const INTERIOR = "#E9D8A8"; // warm lining color, revealed once opened

// A thin ribbon-style trim line tracing a fold edge: a darker base stroke
// under a lighter hairline, giving it a subtle foil/beveled look instead
// of a flat single-color line.
function TrimLine(x1, y1, x2, y2, key) {
  return (
    <g key={key}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={DARK} strokeWidth={3} strokeLinecap="round" />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={LIGHT} strokeWidth={1} strokeLinecap="round" />
    </g>
  );
}

// Timings (ms) for each stage of the automatic open sequence, kicked off by
// a single tap — that tap doubles as the user gesture that unlocks audio.
const T_OPEN = 600; // flap folds open on a 3D hinge, seal rides along with it
const T_RISE = 650; // invitation card fades/rises out of the envelope
const T_HOLD = 1000; // pause so the revealed card can be read
const T_WIPE = 750; // zoom into the envelope, into the site
const T_REVEAL = 450; // this overlay itself fades away, revealing the site
                        // (already sitting there, unmoved) right through it

export default function EnvelopeIntro({ onComplete }) {
  const { t, pick } = useLanguage();
  const { start } = useMusic();
  // idle -> opening -> rising -> wipe
  const [phase, setPhase] = useState("idle");
  const [reducedMotion, setReducedMotion] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const after = useCallback((ms, fn) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const begin = useCallback(() => {
    if (phase !== "idle") return;
    start(); // user-gesture click unlocks audio playback
    if (reducedMotion) {
      onComplete();
      return;
    }
    setPhase("opening");
    after(T_OPEN, () => setPhase("rising"));
    after(T_OPEN + T_RISE + T_HOLD, () => setPhase("wipe"));
    after(T_OPEN + T_RISE + T_HOLD + T_WIPE, () => setPhase("reveal"));
    after(T_OPEN + T_RISE + T_HOLD + T_WIPE + T_REVEAL, () => onComplete());
  }, [phase, reducedMotion, start, onComplete, after]);

  const { groom, bride } = weddingData.couple;
  const flapOpen = phase === "opening" || phase === "rising" || phase === "wipe" || phase === "reveal";
  const cardVisible = phase === "rising" || phase === "wipe" || phase === "reveal";
  const zoomed = phase === "wipe" || phase === "reveal";
  // the message text fades out the instant the zoom starts, instead of
  // scaling up along with the rest of the scene — a huge blurred wall of
  // text is not the point, a clean color is
  const messageVisible = phase === "rising";

  return (
    <motion.div
      dir="rtl"
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden px-6"
      style={{
        backgroundImage:
          zoomed
            ? "none"
            : "radial-gradient(ellipse at 50% 38%, rgba(201,162,39,0.08), transparent 60%)",
        transformOrigin: "50% 46%",
        willChange: "transform, background-color, opacity",
        pointerEvents: zoomed ? "none" : "auto",
      }}
      initial={{ scale: 1, backgroundColor: "#E9D8A8", opacity: 1 }}
      animate={{
        scale: zoomed ? 16 : 1,
        backgroundColor: zoomed ? INTERIOR : "#E9D8A8",
        opacity: phase === "reveal" ? 0 : 1,
      }}
      transition={{
        scale: { duration: T_WIPE / 1000, ease: [0.45, 0, 0.2, 1] },
        backgroundColor: { duration: T_WIPE / 1000, ease: [0.45, 0, 0.2, 1] },
        opacity: { duration: T_REVEAL / 1000, ease: EASE },
      }}
    >
      <motion.button
        type="button"
        onClick={begin}
        disabled={phase !== "idle"}
        aria-label={t("intro.tapToOpen")}
        className="relative flex flex-col items-center gap-7 focus:outline-none"
        animate={phase === "idle" ? { y: [0, -6, 0] } : { y: 0 }}
        transition={phase === "idle" ? { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 1.1 } : { duration: 0.3 }}
        whileTap={phase === "idle" ? { scale: 0.97 } : undefined}
      >
        {/* couple names appear first, then the envelope rises into place
            underneath them */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-couple-names text-3xl md:text-4xl text-gold"
        >
          {groom.nameAr} <span className="text-2xl align-middle">&amp;</span> {bride.nameAr}
        </motion.p>

        <motion.div
          className="relative"
          style={{ width: "min(78vw, 300px)", aspectRatio: "3 / 2", perspective: 1400 }}
          initial={{ opacity: 0, y: 46 }}
          animate={{ opacity: zoomed ? 0 : 1, y: 0 }}
          transition={{
            y: { duration: 0.65, delay: 0.4, ease: EASE },
            opacity: zoomed
              ? { duration: 0.15, ease: "easeOut" }
              : { duration: 0.65, delay: 0.4, ease: EASE },
          }}
        >
          {/* envelope body — white card stock; the fold lines and a soft
              directional light (not color-blocked facets) give it shape.
              It turns the same warm lining color the instant the zoom
              starts, so nothing white is left anywhere in the frame for
              the zoom to reveal partway through — only the gap triangle
              shows that color beforehand, while the card is being read. */}
          <motion.div
            className="absolute inset-0 rounded-md"
            style={{
              border: `1.5px solid ${DARK}`,
              boxShadow: zoomed ? "none" : "0 18px 38px rgba(21,19,17,0.2)",
            }}
            initial={{ backgroundColor: PAPER }}
            animate={{ backgroundColor: zoomed ? INTERIOR : PAPER }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-md pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 24% 18%, rgba(255,255,255,0.9), transparent 60%), radial-gradient(ellipse 60% 55% at 82% 92%, rgba(193,169,132,0.28), transparent 60%)",
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: zoomed ? 0 : 1 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          />

          {/* pocket fold lines (static — unaffected by the flap opening) */}
          <svg viewBox="0 0 300 200" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            {TrimLine(0, 200, 150, 90, "pocket-l")}
            {TrimLine(300, 200, 150, 90, "pocket-r")}
            {TrimLine(150, 90, 150, 200, "seam-bottom")}
          </svg>

          {/* the gap left behind by the flap — once it swings away this
              triangle (its old spot) is empty space inside the envelope,
              so it's what turns the warm lining color, not the flap
              itself. The zoom later grows out of this same color, so the
              reveal reads as one continuous motion from "inside the open
              envelope" to "the site". */}
          <motion.div
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{
              height: "50%",
              clipPath: "polygon(0% 0%, 100% 0%, 50% 90%)",
              zIndex: 20,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: flapOpen ? 1 : 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="absolute inset-0" style={{ background: INTERIOR }} />
          </motion.div>

          {/* flap — folds back on a top hinge and stays there, open, as a
              backdrop behind the rising message, rather than flipping all
              the way and disappearing */}
          <motion.div
            className="absolute inset-x-0 top-0"
            style={{
              height: "50%",
              clipPath: "polygon(0% 0%, 100% 0%, 50% 90%)",
              transformOrigin: "top center",
              zIndex: 30,
              filter: zoomed ? "none" : "drop-shadow(0 8px 10px rgba(21,19,17,0.15))",
            }}
            initial={{ rotateX: 0, backgroundColor: PAPER }}
            animate={{ rotateX: flapOpen ? -180 : 0, backgroundColor: zoomed ? INTERIOR : PAPER }}
            transition={{
              rotateX: { duration: T_OPEN / 1000, ease: EASE },
              backgroundColor: { duration: 0.15, ease: "easeOut" },
            }}
          >
            {!cardVisible && (
              <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                {TrimLine(0, 0, 150, 90, "flap-l")}
                {TrimLine(300, 0, 150, 90, "flap-r")}
                {TrimLine(150, 0, 150, 90, "seam-top")}
              </svg>
            )}
          </motion.div>

          {/* the message — rises into view once the envelope is open,
              sitting directly on the interior color instead of a card */}
          <motion.div
            className="absolute left-1/2 text-center"
            style={{ width: "86%", x: "-50%", zIndex: 40 }}
            initial={false}
            animate={{
              top: cardVisible ? "-46%" : "30%",
              opacity: messageVisible ? 1 : 0,
            }}
            transition={{
              top: { duration: T_RISE / 1000, ease: EASE },
              opacity: { duration: messageVisible ? T_RISE / 1000 : 0.25, ease: EASE },
            }}
          >
            <p className="font-display italic text-[10px] tracking-[0.2em] text-charcoal/60 uppercase mb-2">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ
            </p>
            <AnimatePresence>
              {cardVisible && (
                <motion.p
                  initial={{ opacity: 0, filter: "blur(4px)", y: 6 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
                  className="font-couple-names text-3xl text-gold leading-tight"
                >
                  {groom.nameAr} <span className="text-xl align-middle">&amp;</span> {bride.nameAr}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="section-divider" />
            <p className="font-display text-xs text-charcoal/70 leading-relaxed">
              {pick(weddingData.openingMessage)}
            </p>
          </motion.div>

          {/* the seal fades away as the flap folds back, rather than
              flipping (mirrored) along with it or splitting apart */}
          <motion.div
            className="absolute z-40"
            style={{ top: "calc(45% - 40px)", left: "50%", x: "-50%" }}
            animate={{ opacity: flapOpen ? 0 : 1, scale: flapOpen ? 0.7 : 1 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <WaxSeal size={80} />
          </motion.div>

          {/* the couple's initials, flanking the seal on the envelope's
              own left/right facets — independent of the flap/seal, so they
              stay put through the whole open sequence and only leave with
              the final zoom */}
          {!zoomed && (
            <>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ duration: 0.5, delay: 0.75 }}
                className="absolute font-couple-names text-2xl text-gold"
                style={{ top: "45%", left: "17%", transform: "translate(-50%, -50%)" }}
              >
                {groom.nameAr[0]}
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ duration: 0.5, delay: 0.75 }}
                className="absolute font-couple-names text-2xl text-gold"
                style={{ top: "45%", left: "83%", transform: "translate(-50%, -50%)" }}
              >
                {bride.nameAr[0]}
              </motion.span>
            </>
          )}

        </motion.div>

        {phase === "idle" && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="inline-block rounded-full bg-gold text-warmwhite px-7 py-3 font-display text-sm tracking-widest shadow-md hover:brightness-105 active:scale-95 transition"
          >
            {t("intro.tapToOpen")}
          </motion.span>
        )}
      </motion.button>
    </motion.div>
  );
}
