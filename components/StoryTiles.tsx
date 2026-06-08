import styles from './StoryTiles.module.css'

export default function StoryTiles() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Start here</span>
        <h2 className={styles.headline}>
          Wherever you are on <em>your journey</em>
        </h2>
        <p className={styles.subhead}>
          Not sure where to begin? Tell us what you&apos;re thinking — we&apos;ll steer.
        </p>
        <a href="#contact" className={styles.cta} data-modal-trigger>
          Book a call
        </a>
      </div>
    </section>
  )
}
