import RevealProvider from "@/components/RevealProvider";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import WhatWeDo from "@/components/WhatWeDo";
import WhoWeServe from "@/components/WhoWeServe";
import HowWeWork from "@/components/HowWeWork";
import Journey from "@/components/Journey";
import Spotlight from "@/components/Spotlight";
import FounderMemo from "@/components/FounderMemo";
import Testimonial from "@/components/Testimonial";
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
      <WhatWeDo />
      <WhoWeServe />
      <HowWeWork />
      <Journey />
      <Spotlight />
      <FounderMemo />
      <Testimonial />
      <ContactCTA />
      <Footer />
      <ContactModal />
    </>
  );
}
