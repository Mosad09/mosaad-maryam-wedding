import React, { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen.jsx";
import EnvelopeIntro from "./components/EnvelopeIntro.jsx";
import Navbar from "./components/Navbar.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import Hero from "./components/Hero.jsx";
import ChildhoodSection from "./components/ChildhoodSection.jsx";
import EngagementSection from "./components/EngagementSection.jsx";
import KatbKetabSection from "./components/KatbKetabSection.jsx";
import WeddingSection from "./components/WeddingSection.jsx";
import WeddingSchedule from "./components/WeddingSchedule.jsx";
import VenueSection from "./components/VenueSection.jsx";
import PhotoStory from "./components/PhotoStory.jsx";
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

  if (loading) return <LoadingScreen />;

  if (!opened) {
    return <EnvelopeIntro onComplete={() => setOpened(true)} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <MusicPlayer />
      <main>
        <Hero />
        <div id="story">
          <ChildhoodSection />
        </div>
        <div id="events">
          <EngagementSection />
          <KatbKetabSection />
          <WeddingSection />
          <WeddingSchedule />
        </div>
        <VenueSection />
        <PhotoStory />
        <Guestbook />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
