import styles from "./ContactCTA.module.css";

export default function ContactCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.inner}>
        <h2 className={`${styles.headline} display`}>
          Create your <em>future</em>
        </h2>
        <div className={styles.ctaWrap}>
          <button
            type="button"
            className={styles.cta}
            data-modal-trigger
          >
            Get started <span className={styles.arrow}>→</span>
          </button>
        </div>
        <div className={styles.riser} aria-hidden="true">
          <svg width="18" height="40" viewBox="0 0 18 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="9" y1="38" x2="9" y2="4" />
            <polyline points="3 11 9 4 15 11" />
          </svg>
        </div>
        <p className={styles.timeNote}>14 seconds. We timed it.</p>
      </div>
    </section>
  );
}
