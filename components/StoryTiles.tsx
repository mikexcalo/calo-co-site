import styles from './StoryTiles.module.css'

export default function StoryTiles() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={`${styles.headline} display`}>
          Wherever you are on <em>your journey</em>
        </h2>
      </div>
    </section>
  )
}
