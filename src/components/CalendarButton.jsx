import React from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import weddingData from "../data/weddingData.js";

function formatICSDate(isoString) {
  const d = new Date(isoString);
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function downloadICS() {
  const { wedding } = weddingData.events;
  const start = formatICSDate(weddingData.countdownDateISO);
  const endDate = new Date(weddingData.countdownDateISO);
  endDate.setHours(endDate.getHours() + 5);
  const end = endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding-invitation`,
    `DTSTAMP:${start}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${weddingData.couple.groom.nameEn} & ${weddingData.couple.bride.nameEn}'s Wedding`,
    `LOCATION:${wedding.address.en}`,
    `DESCRIPTION:${wedding.venue.en}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "wedding-invitation.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function CalendarButton() {
  const { t } = useLanguage();
  return (
    <button
      onClick={downloadICS}
      className="rounded-full bg-gold text-warmwhite px-6 py-3 font-display text-sm tracking-widest hover:brightness-110 transition"
    >
      {t("calendar.button")}
    </button>
  );
}
