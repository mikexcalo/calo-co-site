import styles from './StoryTiles.module.css'

export default function StoryTiles() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={`${styles.headline} display`}>
          Wherever you are on <em>your journey</em>
        </h2>
        <p className={styles.subhead}>
          Whether you&apos;re just starting out, finding your footing, or
          competing to win, we meet you where you are — and build what gets
          you to the next stage.
        </p>
      </div>
    </section>
  )
}
