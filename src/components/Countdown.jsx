import React, { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import weddingData from "../data/weddingData.js";

function getTimeLeft() {
  const target = new Date(weddingData.countdownDateISO).getTime();
  const diff = Math.max(0, target - Date.now());
  return {
    total: diff,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const { t } = useLanguage();
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (time.total <= 0) {
    return (
      <p className="text-center font-display italic text-xl text-gold">{t("countdown.today")}</p>
    );
  }

  const units = [
    { label: t("countdown.days"), value: time.days },
    { label: t("countdown.hours"), value: time.hours },
    { label: t("countdown.minutes"), value: time.minutes },
    { label: t("countdown.seconds"), value: time.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-display italic text-sm tracking-widest text-charcoal/70 dark:text-champagne/80 uppercase">
        {t("countdown.title")}
      </p>
      <div className="flex gap-4 md:gap-8">
        {units.map((u) => (
          <div key={u.label} className="flex flex-col items-center min-w-[60px]">
            <span className="font-display text-4xl md:text-5xl text-gold tabular-nums">
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="font-display text-xs tracking-[0.2em] uppercase text-charcoal/70 dark:text-champagne/70 mt-1">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
