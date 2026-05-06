import RevealProvider from "@/components/RevealProvider";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import WhatWeDo from "@/components/WhatWeDo";
import WhoWeServe from "@/components/WhoWeServe";
import Tiers from "@/components/Tiers";
import Spotlight from "@/components/Spotlight";
import FAQ from "@/components/FAQ";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <RevealProvider />
      <Nav />
      <Hero />
      <WhoWeAre />
      <WhatWeDo />
      <WhoWeServe />
      <Tiers />
      <Spotlight />
      <FAQ />
      <ContactCTA />
      <Footer />
    </>
  );
}
