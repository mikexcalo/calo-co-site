import RevealProvider from "@/components/RevealProvider";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import WhoWeServe from "@/components/WhoWeServe";
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
      <WhoWeAre />
      <WhoWeServe />
      <Spotlight />
      <FounderMemo />
      <ContactCTA />
      <Footer />
      <ContactModal />
    </>
  );
}
