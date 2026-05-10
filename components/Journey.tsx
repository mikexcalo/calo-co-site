import styles from "./Journey.module.css";

export default function Journey() {
  return (
    <section className={`${styles.section} section-dark`}>
      <div className={styles.inner}>
        <h2 className={`${styles.headline} display`}>
          Wherever you are on <em>your journey,</em><br />
          <em>we&apos;ll steer.</em>
        </h2>
        <p className={styles.sub}>
          Start with a conversation. We&apos;ll figure out where you are, where you want to go,
          and whether we&apos;re the right team to get you there.
        </p>
        <a href="#" className={styles.ctaBtn} data-modal-trigger>
          Book a call <span className={styles.arrow}>&rarr;</span>
        </a>
      </div>
    </section>
  );
}
