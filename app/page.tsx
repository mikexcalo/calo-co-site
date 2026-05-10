import RevealProvider from "@/components/RevealProvider";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import WhoWeAre from "@/components/WhoWeAre";
import WhoWeServe from "@/components/WhoWeServe";
import Journey from "@/components/Journey";
import Spotlight from "@/components/Spotlight";
import FounderMemo from "@/components/FounderMemo";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  return (
    <>
      <RevealProvider />
      <Nav />
      <Hero />
      <WhatWeDo />
      <WhoWeAre />
      <WhoWeServe />
      <Journey />
      <Spotlight />
      <FounderMemo />
      <ContactCTA />
      <Footer />
      <ContactModal />
    </>
  );
}
