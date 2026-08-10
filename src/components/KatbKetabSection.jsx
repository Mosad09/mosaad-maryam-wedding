import React from "react";
import EventSection from "./EventSection.jsx";
import weddingData from "../data/weddingData.js";

export default function KatbKetabSection() {
  const event = weddingData.events.katbKetab;
  // No location/map shown here by design — the map only lives in VenueSection.
  return <EventSection id="katb-ketab" event={event} reverse />;
}
