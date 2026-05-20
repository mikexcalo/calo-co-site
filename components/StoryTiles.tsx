import styles from './StoryTiles.module.css'

const tiles = [
  {
    eyebrow: "STEVIE'S POEM STORE",
    headline: 'A typewriter poet, found by a national brand',
    body: '[PLACEHOLDER — Stevie story copy: from typewriter poems on a Portland street corner to LL Bean reaching out through her website. Replace with final approved copy.]',
    name: 'Stevie Treviño',
    role: 'Founder',
  },
  {
    eyebrow: 'LG FLOORING INSTALLATION CO',
    headline: 'From subcontractor to a brand of his own',
    body: "[PLACEHOLDER — LG Flooring story copy: from contract work for Lowe's to a full brand identity, website, and field sales positioning. Replace with final approved copy.]",
    name: 'Leandro Gazolla',
    role: 'Founder',
  },
]

export default function StoryTiles() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={`${styles.headline} display`}>
          Wherever you are on <em>your journey</em>
        </h2>
        <div className={styles.grid}>
          {tiles.map((tile) => (
            <article key={tile.eyebrow} className={styles.tile}>
              <div className={styles.imagePlaceholder}>
                <span className={styles.placeholderLabel}>[IMAGE PLACEHOLDER]</span>
              </div>
              <div className={styles.content}>
                <span className={styles.eyebrow}>{tile.eyebrow}</span>
                <h3 className={styles.tileHeadline}>{tile.headline}</h3>
                <p className={styles.body}>{tile.body}</p>
                <p className={styles.attribution}>{tile.name}, {tile.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
