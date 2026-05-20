import styles from "./ContactCTA.module.css";

export default function ContactCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.inner}>
        <h2 className={`${styles.headline} display glide glide-headline`}>
          Let&apos;s build <em>your dream</em>.
        </h2>
        <div className={`${styles.ctaWrap} glide`}>
          <button
            type="button"
            className={styles.cta}
            data-modal-trigger
          >
            Get started <span className={styles.arrow}>→</span>
          </button>
        </div>
        <p className={`${styles.timeNote} glide`}>14 seconds. We timed it.</p>
      </div>
    </section>
  );
}
