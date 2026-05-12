import styles from "./FounderMemo.module.css";

type Principle = {
  headline: string;
  body: React.ReactNode;
};

const PRINCIPLES: Principle[] = [
  {
    headline: "We work with few. By design.",
    body: "Most agencies optimize for headcount and hours. We optimize for outcomes — which means a small roster of clients we go deep with, not a long roster we phone in. If you sign with us, you have our full attention.",
  },
  {
    headline: "Outcomes outrank deliverables.",
    body: "We don't sell decks. We don't sell retainers. We sell traction. Every engagement is measured against the metrics that actually decide whether your business is winning — revenue, conversion, retention, speed.",
  },
  {
    headline: "The system stays after we leave.",
    body: <>Every CALO<span className="amp">&</span>CO engagement is built on Helm, our proprietary operating system. When we step out — or scale back — you keep everything: the brand, the site, the data, the rails. The system compounds long after we&apos;re done.</>,
  },
];

export default function FounderMemo() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={`${styles.headline} display glide glide-headline`}>
            Three beliefs that <em>guide our work</em>.
          </h2>

          <div className={`${styles.founder} glide`}>
            <div
              className={styles.portrait}
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&auto=format&fit=crop)`,
              }}
              role="img"
              aria-label="Mike Calo, Founder of CALO&CO"
            />
            <div className={styles.signature} aria-hidden="true">
              Mike
            </div>
            <p className={styles.signatureLabel}>
              Mike Calo
              <br />
              <span className={styles.signatureRole}>Founder, CALO<span className="amp">&amp;</span>CO</span>
            </p>
          </div>
        </div>

        <div className={styles.right}>
          {PRINCIPLES.map((p, i) => (
            <div key={i} className={`${styles.principle} glide`}>
              <h3 className={styles.principleHeadline}>{p.headline}</h3>
              <p className={styles.principleBody}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
