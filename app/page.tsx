import RevealProvider from "@/components/RevealProvider";
import Nav from "@/components/Nav";
import HeroPlunge from "@/components/HeroPlunge";
import ArtScienceHeadline from "@/components/ArtScienceHeadline";
import WhatWeDo from "@/components/WhatWeDo";
import WhoWeServe from "@/components/WhoWeServe";
import QuoteSpotlight from "@/components/QuoteSpotlight";
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
      <ArtScienceHeadline />
      <WhatWeDo />
      <QuoteSpotlight />
      <WhoWeServe />
      <HowWeWork />
      <RevealRunway />
      <ContactCTA />
      <Footer />
      <ContactModal />
    </>
  );
}
