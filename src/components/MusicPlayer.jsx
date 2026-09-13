import React from "react";
import { motion } from "framer-motion";
import { useMusic } from "../context/MusicContext.jsx";

export default function MusicPlayer() {
  const { playing, muted, toggle, toggleMute } = useMusic();

  return (
    <div className="fixed bottom-6 left-6 rtl:left-auto rtl:right-6 z-40 flex items-center gap-2">
      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.9 }}
        aria-label={playing ? "Pause music" : "Play music"}
        className="w-11 h-11 rounded-full bg-warmwhite/90 dark:bg-charcoal/90 gold-border shadow-lg flex items-center justify-center text-gold hover:scale-105 transition-transform"
      >
        {playing ? "❚❚" : "▶"}
      </motion.button>
      <motion.button
        onClick={toggleMute}
        whileTap={{ scale: 0.9 }}
        aria-label={muted ? "Unmute" : "Mute"}
        className="w-9 h-9 rounded-full bg-warmwhite/90 dark:bg-charcoal/90 gold-border shadow-lg flex items-center justify-center text-gold text-xs hover:scale-105 transition-transform"
      >
        {muted ? "🔇" : "🔊"}
      </motion.button>
    </div>
  );
}
