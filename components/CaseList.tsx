import styles from "./CaseList.module.css";

type CaseRow = {
  index: string;
  client: string;
  category: string;
  metric: string;
  metricLabel: string;
  tagline: string;
  href: string;
};

const CASES: CaseRow[] = [
  {
    index: "01",
    client: "Pangaea",
    category: "Coffee &amp; CPG",
    metric: "+187%",
    metricLabel: "DTC revenue, 90 days",
    tagline: "Rebrand, e-commerce, retail-ready packaging system.",
    href: "#",
  },
  {
    index: "02",
    client: "Fuego",
    category: "FinTech / Card",
    metric: "$2.4M",
    metricLabel: "in pre-launch deposits",
    tagline: "Brand identity, marketing site, and early growth motions.",
    href: "#",
  },
  {
    index: "03",
    client: "Mammoth",
    category: "Construction",
    metric: "10x",
    metricLabel: "lead-to-bid efficiency",
    tagline: "Operating system, sales pipeline, and brand modernization.",
    href: "#",
  },
];

export default function CaseList() {
  return (
    <section id="stories" className={styles.section}>
      <div className={styles.header}>
        <span className={`${styles.eyebrow} eyebrow glide`}>Selected Work</span>
        <h2 className={`${styles.headline} display glide glide-headline`}>
          Outcomes worth <em>signing off on</em>.
        </h2>
        <p className={`${styles.sub} glide`}>
          A small sample of what shipping with CALO&amp;CO looks like. Every
          engagement runs on Helm — you can see how the system evolves with
          each business.
        </p>
      </div>

      <ul className={styles.list}>
        {CASES.map((c) => (
          <li key={c.index} className={styles.item}>
            <a href={c.href} className={styles.row}>
              <span className={`${styles.idx} mono`}>{c.index}</span>
              <div className={styles.identity}>
                <span className={styles.client}>{c.client}</span>
                <span className={`${styles.category} mono`} dangerouslySetInnerHTML={{ __html: c.category }} />
              </div>
              <div className={styles.metric}>
                <span className={styles.metricNum}>{c.metric}</span>
                <span className={styles.metricLabel}>{c.metricLabel}</span>
              </div>
              <p className={styles.tagline}>{c.tagline}</p>
              <span className={styles.arrow} aria-hidden>→</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
