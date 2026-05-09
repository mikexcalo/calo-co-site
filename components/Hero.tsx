import styles from "./Hero.module.css";

const LOGOS = [
  "Pangaea", "Fuego", "Mammoth", "LG Flooring",
  "Stevie's Poem Store", "Hero's Journey", "Wayback", "Nautilus",
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={`${styles.headline} display`}>
          We chart the course,<br />
          you make <em>waves</em>.
        </h1>
        <p className={styles.sub}>
          CALO&amp;CO is a marketing and growth partner<br />
          for independent brands and businesses ready to level up.
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

      <div className={styles.marquee}>
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
