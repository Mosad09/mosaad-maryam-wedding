import React from "react";
import { motion } from "framer-motion";

// Very faint drifting lines behind the whole site — a subtle "alive"
// texture visible through any section without its own solid background,
// not a decoration meant to be consciously noticed.
export default function BackgroundLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-20">
      <motion.svg
        viewBox="0 0 800 800"
        preserveAspectRatio="none"
        className="w-full h-full"
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="-50" y1="80" x2="850" y2="220" stroke="#C9A227" strokeWidth="1" />
        <line x1="-50" y1="260" x2="850" y2="120" stroke="#C9A227" strokeWidth="1" />
        <line x1="-50" y1="420" x2="850" y2="560" stroke="#C9A227" strokeWidth="1" />
        <line x1="-50" y1="600" x2="850" y2="440" stroke="#C9A227" strokeWidth="1" />
        <line x1="-50" y1="740" x2="850" y2="680" stroke="#C9A227" strokeWidth="1" />
      </motion.svg>
    </div>
  );
}
