import styles from "./Hero.module.css";

const LOGO_COUNT = 8;

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={`${styles.headline} display emerge`}>
          We chart the course,{" "}
          you make <em>waves</em>.
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

      <div className={styles.logoStrip}>
        {Array.from({ length: LOGO_COUNT }, (_, i) => (
          <img
            key={i}
            src={`/logos/logo-${i + 1}.png`}
            alt=""
            className={styles.logoImg}
          />
        ))}
      </div>

      <div className={styles.fade} aria-hidden="true" />
    </section>
  );
}
