import RevealProvider from "@/components/RevealProvider";

export default function Home() {
  return (
    <>
      <RevealProvider />
      <main style={{ padding: "120px 48px", maxWidth: "900px", margin: "0 auto" }}>
        <span className="eyebrow glide" style={{ display: "block", marginBottom: 24 }}>
          Stage 2 verification
        </span>
        <h1 className="display emerge" style={{ fontSize: "72px", marginBottom: 32 }}>
          We chart the course, you make <em>waves</em>.
        </h1>
        <p className="glide" style={{ fontSize: "18px", color: "var(--muted)", maxWidth: "600px" }}>
          If you can see this in Lora italic for the word "waves", and the headline
          animated word-by-word on load, the foundation is working.
        </p>
        <p className="mono" style={{ fontSize: "12px", marginTop: 48, color: "var(--muted)" }}>
          STAGE 02 · FOUNDATION · TYPOGRAPHY + MOTION
        </p>
      </main>
    </>
  );
}
