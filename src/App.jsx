import React, { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen.jsx";
import EnvelopeIntro from "./components/EnvelopeIntro.jsx";
import BackgroundLines from "./components/BackgroundLines.jsx";
import Navbar from "./components/Navbar.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import Hero from "./components/Hero.jsx";
import ChildhoodSection from "./components/ChildhoodSection.jsx";
import EngagementSection from "./components/EngagementSection.jsx";
import KatbKetabSection from "./components/KatbKetabSection.jsx";
import WeddingSection from "./components/WeddingSection.jsx";
import VenueSection from "./components/VenueSection.jsx";
import Guestbook from "./components/Guestbook.jsx";
import FAQ from "./components/FAQ.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setTimeout(() => setLoading(false), reducedMotion ? 150 : 900);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      {/* The real site is mounted from the very first paint — it just sits
          quietly behind the loading screen and the envelope, both opaque
          full-screen overlays. Opening the envelope then reveals this same
          tree in place instead of unmounting one page and mounting another,
          so there's no handoff/seam between "the envelope" and "the site"
          (no flash of a stale navbar state, no separate crossfade to keep
          in sync — it's one continuous scene). Hero's entrance animation is
          gated on `opened` rather than firing on mount for the same reason:
          otherwise it would already be sitting still by the time the
          envelope fades away. */}
      <BackgroundLines />

      <div className="relative z-10 min-h-screen">
        <Navbar />
        <MusicPlayer />
        <main>
          <Hero revealed={opened} />
          <div id="story">
            <ChildhoodSection />
          </div>
          <div id="events">
            <EngagementSection />
            <KatbKetabSection />
            <WeddingSection />
          </div>
          <VenueSection />
          <Guestbook />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>

      {loading && <LoadingScreen />}
      {!loading && !opened && <EnvelopeIntro onComplete={() => setOpened(true)} />}
    </>
  );
}
