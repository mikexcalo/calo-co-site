import RevealProvider from "@/components/RevealProvider";
import Nav from "@/components/Nav";
import HeroPlunge from "@/components/HeroPlunge";
import TaglineBanner from "@/components/TaglineBanner";
import WhatWeDo from "@/components/WhatWeDo";
import WhoWeServe from "@/components/WhoWeServe";
import StoryTiles from "@/components/StoryTiles";
import SteerBand from "@/components/SteerBand";
import HowWeWork from "@/components/HowWeWork";
import RevealRunway from "@/components/RevealRunway";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <RevealProvider />
      <div className={styles.navStickyRegion}>
        <Nav />
        <HeroPlunge />
      </div>
      <TaglineBanner />
      <WhatWeDo />
      <WhoWeServe />
      <StoryTiles />
      <SteerBand />
      <HowWeWork />
      <RevealRunway />
      <ContactCTA />
      <Footer />
      <ContactModal />
    </>
  );
}
