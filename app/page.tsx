import RevealProvider from "@/components/RevealProvider";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <RevealProvider />
      <Nav />
      <Hero />
      <main style={{ padding: "120px 48px", maxWidth: "900px", margin: "0 auto", minHeight: "40vh", background: "#0a0a0c", color: "var(--dark-text)" }}>
        <span className="eyebrow" style={{ display: "block", marginBottom: 24, color: "var(--dark-muted)" }}>
          Stage 4a — Hero ported
        </span>
        <p style={{ fontSize: "18px", color: "var(--dark-muted)", maxWidth: "600px" }}>
          Next sections coming in subsequent stages. The dark zone here previews
          where the "Who We Are" section will sit in Stage 4b.
        </p>
      </main>
      <Footer />
    </>
  );
}
