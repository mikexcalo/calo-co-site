import styles from "./ContactCTA.module.css";

export default function ContactCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.inner}>
        <h2 className={`${styles.headline} display`}>
          Create your <em>future</em>
        </h2>
        <p className={styles.sub}>
          Tell us where you want to go. We&apos;ll build the way there.
        </p>
        <div className={styles.ctaWrap}>
          <button
            type="button"
            className={styles.cta}
            data-modal-trigger
          >
            Get started <span className={styles.arrow}>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
