// frontend/src/pages/HomePage.jsx
import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero.jsx";
import DudhwaZones from "../components/DudhwaZones.jsx";
import SafariCTA from "../components/SafariCTA.jsx";
import HowToReach from "../components/HowToReach.jsx";
import MapSection from "../components/MapSection.jsx";
import GallerySection from "../components/GallerySection.jsx";
import BigFiveSection from "../components/BigFiveSection.jsx";
import TopThingsSection from "../components/TopThingsSection.jsx";
import MediaSection from "../components/MediaSection.jsx";
import WildlifeStatistics from "../components/WildlifeStatistics.jsx";

export default function HomePage() {
  return (
    <div className="dudhwa-website-layout">
      <main>
        <Hero />
        <DudhwaZones />
        <SafariCTA />
        <HowToReach />
        <MapSection />
        <GallerySection />
        <BigFiveSection />
        <TopThingsSection />
        <MediaSection />
        <WildlifeStatistics />
      </main>
    </div>
  );
}
