import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import weddingData from "../data/weddingData.js";

const MusicContext = createContext(null);
const STORAGE_KEY = "wedding_music_preference";

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return !!saved.muted;
    } catch {
      return false;
    }
  });
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const audio = new Audio(weddingData.music.src);
    audio.loop = true;
    audio.muted = muted;
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ muted }));
    } catch {
      /* ignore */
    }
  }, [muted]);

  // Called from the "Open Invitation" click — the user gesture that
  // unlocks audio playback on mobile browsers.
  const start = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setFailed(true));
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (failed) {
      // manual retry through the music control
      audio
        .play()
        .then(() => {
          setPlaying(true);
          setFailed(false);
        })
        .catch(() => setFailed(true));
      return;
    }
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setFailed(true));
    }
  };

  const toggleMute = () => setMuted((m) => !m);

  return (
    <MusicContext.Provider value={{ playing, muted, failed, start, toggle, toggleMute }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
