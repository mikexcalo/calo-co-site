import RevealProvider from "@/components/RevealProvider";
import Nav from "@/components/Nav";
import HeroPlunge from "@/components/HeroPlunge";
import ScrollCover from "@/components/ScrollCover";
import FixedPillars from "@/components/FixedPillars";
import WhoWeServe from "@/components/WhoWeServe";
import ExpandingQuote from "@/components/ExpandingQuote";
import StoryTiles from "@/components/StoryTiles";
import SteerBand from "@/components/SteerBand";
import HowWeWork from "@/components/HowWeWork";
import FAQ from "@/components/FAQ";
import FounderMemo from "@/components/FounderMemo";
import Testimonial from "@/components/Testimonial";
import QuoteScrollStage from "@/components/QuoteScrollStage";
import ContactCTA from "@/components/ContactCTA";
import Draft from "@/components/Draft";
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
      <ScrollCover />
      <FixedPillars />
      <WhoWeServe />
      <StoryTiles />
      <ExpandingQuote />
      <HowWeWork />
      <SteerBand />
      <QuoteScrollStage
        quote={<Testimonial />}
        founder={<FounderMemo />}
        faq={<FAQ />}
      />
      <ContactCTA />
      <Draft />
      <Footer />
      <ContactModal />
    </>
  );
}
