import styles from './TaglineBanner.module.css'

export default function TaglineBanner() {
  return (
    <section className={`${styles.section} section-dark`}>
      <div className={styles.inner}>
        <h2 className={`${styles.headline} display`}>
          We chart the course, you make <em>waves</em>.
        </h2>
      </div>
    </section>
  )
}
