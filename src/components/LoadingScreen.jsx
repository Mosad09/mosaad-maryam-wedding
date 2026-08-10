import React from "react";
import { motion } from "framer-motion";
import weddingData from "../data/weddingData.js";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-6 bg-ivory dark:bg-dark">
      <motion.span
        className="font-couple-names text-5xl text-gold"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {weddingData.couple.monogram}
      </motion.span>
      <div className="w-32 h-px bg-gold/30 overflow-hidden">
        <motion.div
          className="h-full bg-gold"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
