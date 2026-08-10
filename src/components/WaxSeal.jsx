import React from "react";
import { motion } from "framer-motion";
import weddingData from "../data/weddingData.js";

export default function WaxSeal({ cracking }) {
  const monogram = weddingData.couple.monogram;

  return (
    <motion.div
      className="relative w-40 h-40"
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ clipPath: "inset(0 50% 0 0)" }}
        animate={
          cracking
            ? { x: -46, y: 18, rotate: -22, opacity: 0 }
            : { x: 0, y: 0, rotate: 0, opacity: 1 }
        }
        transition={{ duration: 0.55, ease: [0.55, 0, 1, 0.45] }}
      >
        <SealSVG monogram={monogram} />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{ clipPath: "inset(0 0 0 50%)" }}
        animate={
          cracking
            ? { x: 46, y: 18, rotate: 22, opacity: 0 }
            : { x: 0, y: 0, rotate: 0, opacity: 1 }
        }
        transition={{ duration: 0.55, ease: [0.55, 0, 1, 0.45] }}
      >
        <SealSVG monogram={monogram} />
      </motion.div>

      {cracking && (
        <motion.svg
          viewBox="0 0 160 160"
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.25 }}
        >
          <motion.path
            d="M80 8 C 74 40, 90 55, 78 80 C 68 100, 92 120, 80 152"
            stroke="#3a2c08"
            strokeWidth="1.6"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.85 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </motion.svg>
      )}
    </motion.div>
  );
}

function SealSVG({ monogram }) {
  return (
    <svg viewBox="0 0 160 160" width="160" height="160" style={{ filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.5))" }}>
      <defs>
        <radialGradient id="sealGrad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#e8d7a8" />
          <stop offset="45%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#8a6a17" />
        </radialGradient>
      </defs>
      <circle cx="80" cy="80" r="72" fill="url(#sealGrad)" stroke="#6e5411" strokeWidth="1" />
      <circle cx="80" cy="80" r="60" fill="none" stroke="#7a5c14" strokeWidth="1" opacity="0.6" />
      <text
        x="80"
        y="96"
        textAnchor="middle"
        style={{ fontFamily: "'Aref Ruqaa Ink', 'Aref Ruqaa', serif", fontSize: 34, fill: "#3a2c08" }}
      >
        {monogram}
      </text>
    </svg>
  );
}
