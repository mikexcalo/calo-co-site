import styles from "./Journey.module.css";

export default function Journey() {
  return (
    <section className={`${styles.section} section-dark`}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={`${styles.headline} display`}>
            Wherever you are on <em>your journey.</em>
          </h2>
        </div>
        <div className={styles.right}>
          <p className={styles.sub}>
            Not sure where to begin? Tell us what you&apos;re thinking &mdash; <em>we&apos;ll steer.</em>
          </p>
          <a href="#" className={styles.ctaBtn} data-modal-trigger>
            Book a call <span className={styles.arrow}>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
