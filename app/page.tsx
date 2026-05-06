import RevealProvider from "@/components/RevealProvider";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import CaseList from "@/components/CaseList";
import WhatWeDo from "@/components/WhatWeDo";
import WhoWeServe from "@/components/WhoWeServe";
import Tiers from "@/components/Tiers";
import Spotlight from "@/components/Spotlight";
import Process from "@/components/Process";
import FounderMemo from "@/components/FounderMemo";
import FAQ from "@/components/FAQ";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  return (
    <>
      <RevealProvider />
      <Nav />
      <Hero />
      <WhoWeAre />
      <CaseList />
      <WhatWeDo />
      <WhoWeServe />
      <Tiers />
      <Spotlight />
      <Process />
      <FounderMemo />
      <FAQ />
      <ContactCTA />
      <Footer />
      <ContactModal />
    </>
  );
}
