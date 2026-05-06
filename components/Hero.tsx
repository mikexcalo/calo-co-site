import styles from "./Hero.module.css";

const LOGOS = [
  "Pangaea", "Fuego", "Mammoth", "LG Flooring", "Stevie's Poem Store",
  "Hero's Journey", "Wayback", "Helm",
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={`${styles.headline} display emerge`}>
          <span className={styles.line}>
            <span className={styles.piece}>We chart</span>{" "}
            <span className={styles.piece}>the course,</span>
          </span>
          <span className={styles.line}>
            you make <em>waves</em>.
          </span>
        </h1>
        <p className={styles.sub}>
          CALO&amp;CO is a growth partner for independent brands and businesses
          ready to scale.
        </p>
        <div className={styles.ctas}>
          <button className={`${styles.btn} ${styles.btnPrimary}`} data-modal-trigger>
            Climb Aboard <span className={styles.arrow}>→</span>
          </button>
          <a className={`${styles.btn} ${styles.btnSecondary}`} href="#stories">
            See Our Work
          </a>
        </div>
      </div>

      <div className={styles.marquee} aria-label="Clients">
        <div className={styles.track}>
          {[...LOGOS, ...LOGOS, ...LOGOS].map((name, i) => (
            <span key={i} className={styles.logo}>{name}</span>
          ))}
        </div>
      </div>

      <div className={styles.fade} aria-hidden="true" />
    </section>
  );
}
