import RevealProvider from "@/components/RevealProvider";
import Nav from "@/components/Nav";
import HeroPlunge from "@/components/HeroPlunge";
import WhatWeDo from "@/components/WhatWeDo";
import WhoWeServe from "@/components/WhoWeServe";
import Journey from "@/components/Journey";
import Spotlight from "@/components/Spotlight";
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
      <WhatWeDo />
      <WhoWeServe />
      <Journey />
      <Spotlight />
      <HowWeWork />
      <RevealRunway />
      <ContactCTA />
      <Footer />
      <ContactModal />
    </>
  );
}
