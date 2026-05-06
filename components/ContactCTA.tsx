import styles from "./ContactCTA.module.css";

export default function ContactCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={`${styles.eyebrow} eyebrow glide`}>
          Ready when you are
        </span>
        <h2 className={`${styles.headline} display glide glide-headline`}>
          Let&apos;s build something <em>worth remembering</em>.
        </h2>
        <p className={`${styles.sub} glide`}>
          Tell us what you&apos;re building. We&apos;ll come back within 48 hours
          with a real conversation — no decks, no sales theater.
        </p>
        <div className={`${styles.ctaWrap} glide`}>
          <button
            type="button"
            className={styles.cta}
            data-modal-trigger
          >
            Climb Aboard <span className={styles.arrow}>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
