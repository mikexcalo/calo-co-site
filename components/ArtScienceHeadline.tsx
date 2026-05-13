import styles from './ArtScienceHeadline.module.css'

export default function ArtScienceHeadline() {
  return (
    <section className={`${styles.section} section-dark`}>
      <div className={styles.inner}>
        <h2 className={`${styles.headline} display`}>
          Where <em>art</em> meets science.
        </h2>
      </div>
    </section>
  )
}
