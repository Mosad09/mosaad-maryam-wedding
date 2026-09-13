import React from "react";
import weddingData from "../data/weddingData.js";

// A heart-shaped monogram medallion for the envelope's flap. It's a plain
// child of the flap in EnvelopeIntro, so it rides up and away with the
// fold when the envelope opens rather than animating on its own.
export default function WaxSeal({ size = 96 }) {
  const { groom, bride } = weddingData.couple;
  const monogram = { left: groom.nameAr[0], right: bride.nameAr[0] };

  // A heart icon's path in its own 24x24 box, scaled and centered into
  // the 160x160 canvas below.
  const heartPath =
    "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

  return (
    <svg
      viewBox="0 0 160 160"
      width={size}
      height={size}
      style={{ filter: "drop-shadow(0 3px 8px rgba(21,19,17,0.22))" }}
    >
      <g transform="translate(80,84) scale(6.6) translate(-12,-12)">
        <path d={heartPath} fill="#FBF5E6" stroke="#C9A227" strokeWidth="0.6" />
      </g>
      <text
        x="60"
        y="78"
        textAnchor="middle"
        style={{ fontFamily: "'Aref Ruqaa Ink', 'Aref Ruqaa', serif", fontSize: 24, fill: "#B8912A" }}
      >
        {monogram.right}
      </text>
      <text
        x="100"
        y="78"
        textAnchor="middle"
        style={{ fontFamily: "'Aref Ruqaa Ink', 'Aref Ruqaa', serif", fontSize: 24, fill: "#B8912A" }}
      >
        {monogram.left}
      </text>
    </svg>
  );
}
