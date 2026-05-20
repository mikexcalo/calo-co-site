import styles from './SteerBand.module.css'

export default function SteerBand() {
  return (
    <section className={`${styles.band} section-dark`}>
      <div className={styles.inner}>
        <p className={styles.line}>
          Don&apos;t know where to start? Tell us what you&apos;re thinking &mdash; <em>we&apos;ll steer.</em>
        </p>
        <a href="#" className={styles.cta} data-modal-trigger="true">
          Book a call <span className={styles.arrow}>&rarr;</span>
        </a>
      </div>
    </section>
  )
}
