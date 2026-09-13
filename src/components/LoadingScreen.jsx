import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import weddingData from "../data/weddingData.js";

// A brief, elegant fade — not a spinner or looping animation. Respects
// prefers-reduced-motion by rendering with no motion at all.
export default function LoadingScreen() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-4 bg-ivory dark:bg-dark">
      <motion.p
        className="font-couple-names text-4xl md:text-5xl text-gold"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut" }}
      >
        {weddingData.couple.groom.nameAr} &amp; {weddingData.couple.bride.nameAr}
      </motion.p>

      {!reducedMotion && (
        <div className="h-[3px] w-20 rounded-full bg-gold/20 overflow-hidden">
          <motion.div
            className="h-full w-1/3 rounded-full bg-gold"
            animate={{ x: ["-100%", "260%"] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}
    </div>
  );
}
