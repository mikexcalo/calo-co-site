import RevealProvider from "@/components/RevealProvider";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <RevealProvider />
      <Nav />
      <Hero />
      <WhoWeAre />
      <Footer />
    </>
  );
}
