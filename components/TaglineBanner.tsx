import styles from './TaglineBanner.module.css'

export default function TaglineBanner() {
  return (
    <section className={`${styles.section} section-dark`}>
      <div className={styles.inner}>
        <h2 className={`${styles.headline} display`}>
          CALO<span className="amp">&amp;</span>CO is a <em>growth partner</em> for brands and businesses ready to level up.
        </h2>
      </div>
    </section>
  )
}
