import styles from './StoryTiles.module.css'

const stages = [
  {
    title: '[Just starting out]',
    descriptor: '[Placeholder — a line about businesses at the earliest stage.]',
    body: '[Placeholder — what CALO&CO does for businesses at this stage.]',
  },
  {
    title: '[Finding traction]',
    descriptor: '[Placeholder — a line about growing businesses.]',
    body: '[Placeholder — what CALO&CO does for businesses at this stage.]',
  },
  {
    title: '[Competing to win]',
    descriptor: '[Placeholder — a line about established businesses competing in their category.]',
    body: '[Placeholder — what CALO&CO does for businesses at this stage.]',
  },
]

export default function StoryTiles() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={`${styles.headline} display`}>
          Wherever you are on <em>your journey</em>
        </h2>
        <div className={styles.columns}>
          {stages.map((stage, i) => (
            <div key={i} className={styles.col}>
              <h3 className={styles.colTitle}>{stage.title}</h3>
              <p className={styles.colDesc}>{stage.descriptor}</p>
              <hr className={styles.rule} />
              <p className={styles.colBody}>{stage.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
