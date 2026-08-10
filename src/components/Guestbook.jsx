import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import weddingData from "../data/weddingData.js";

export default function Guestbook() {
  const { t } = useLanguage();
  const [entries, setEntries] = useLocalStorage(weddingData.guestbook.storageKey, []);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setEntries([{ name: name.trim(), message: message.trim(), at: Date.now() }, ...entries]);
    setName("");
    setMessage("");
  };

  return (
    <section id="guestbook" className="py-24 px-6 bg-beige/40 dark:bg-charcoal/30">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-display text-4xl text-gold">{t("guestbook.title")}</h2>
        <p className="font-display italic text-charcoal/70 dark:text-champagne/80 mt-2">
          {t("guestbook.subtitle")}
        </p>
        <div className="section-divider" />

        <form onSubmit={submit} className="mt-8 flex flex-col gap-3 text-left rtl:text-right">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("guestbook.name")}
            className="rounded-sm gold-border bg-warmwhite dark:bg-dark px-4 py-3 font-body text-charcoal dark:text-champagne focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("guestbook.message")}
            rows={3}
            className="rounded-sm gold-border bg-warmwhite dark:bg-dark px-4 py-3 font-body text-charcoal dark:text-champagne focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <button
            type="submit"
            className="mt-1 rounded-full bg-gold text-warmwhite px-6 py-3 font-display tracking-widest text-sm hover:brightness-110 transition"
          >
            {t("guestbook.submit")}
          </button>
        </form>

        <div className="mt-10 space-y-4 text-left rtl:text-right">
          {entries.length === 0 && (
            <p className="font-display italic text-charcoal/50 dark:text-champagne/50">
              {t("guestbook.empty")}
            </p>
          )}
          {entries.map((entry, i) => (
            <motion.div
              key={entry.at ?? i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="gold-border rounded-sm bg-warmwhite dark:bg-dark px-4 py-3"
            >
              <p className="font-display text-gold text-sm">{entry.name}</p>
              <p className="font-body text-charcoal dark:text-champagne text-sm mt-1">
                {entry.message}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
