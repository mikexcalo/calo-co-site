import RevealProvider from "@/components/RevealProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <RevealProvider />
      <Nav />
      <main style={{ padding: "120px 48px", maxWidth: "900px", margin: "0 auto", minHeight: "60vh" }}>
        <span className="eyebrow glide" style={{ display: "block", marginBottom: 24 }}>
          Stage 3 verification
        </span>
        <h1 className="display emerge" style={{ fontSize: "72px", marginBottom: 32 }}>
          Bookends in place. Sections coming next.
        </h1>
        <p className="glide" style={{ fontSize: "18px", color: "var(--muted)", maxWidth: "600px" }}>
          The topbar above and the footer below are ported. Scroll up and the topbar
          should pick up a faint border. Scroll down to see the footer.
        </p>
      </main>
      <Footer />
    </>
  );
}
