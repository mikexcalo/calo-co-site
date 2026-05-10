import RevealProvider from "@/components/RevealProvider";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import WhatWeDo from "@/components/WhatWeDo";
import WhoWeServe from "@/components/WhoWeServe";
import Journey from "@/components/Journey";
import Spotlight from "@/components/Spotlight";
import HowWeWork from "@/components/HowWeWork";
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
      <Journey />
      <Spotlight />
      <HowWeWork />
      <FounderMemo />
      <Testimonial />
      <ContactCTA />
      <Footer />
      <ContactModal />
    </>
  );
}
