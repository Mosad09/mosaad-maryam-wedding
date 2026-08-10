import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function QRCodeBlock() {
  const { t } = useLanguage();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, window.location.href, {
      width: 140,
      margin: 1,
      color: { dark: "#24211D", light: "#FFFDF800" },
    }).catch(() => {
      /* QR generation failed — fail silently, section is decorative */
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="p-3 bg-warmwhite gold-border rounded-sm shadow-md">
        <canvas ref={canvasRef} />
      </div>
      <p className="font-display text-xs tracking-widest uppercase text-charcoal/60 dark:text-champagne/60">
        {t("qr.title")}
      </p>
    </div>
  );
}
