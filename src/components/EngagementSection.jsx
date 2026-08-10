import React from "react";
import EventSection from "./EventSection.jsx";
import weddingData from "../data/weddingData.js";

export default function EngagementSection() {
  return <EventSection id="engagement" event={weddingData.events.engagement} />;
}
