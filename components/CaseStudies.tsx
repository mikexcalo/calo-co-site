import styles from './CaseStudies.module.css'

const stories = [
  {
    client: 'Fuego',
    tag: 'Fintech',
    headline: 'Built a fintech brand worth swiping for.',
    body: 'A complete identity and on-demand pay app for hospitality workers. From naming through launch in twelve weeks.',
    visualClass: 'fuego',
  },
  {
    client: "Stevie's Poem Store",
    tag: 'Retail',
    headline: 'Turned a side hustle into a shop people order from.',
    body: 'Brand, e-commerce, and ops for an independent poet selling custom verses online — packaging, automation, the works.',
    visualClass: 'stevie',
  },
  {
    client: 'LG Flooring',
    tag: 'Local services',
    headline: '3.4× monthly inbound in two quarters.',
    body: 'A site that ranks, a quoting flow that closes, and lead generation that runs without anyone watching it.',
    visualClass: 'lg',
  },
  {
    client: 'Mammoth Construction',
    tag: 'Construction',
    headline: 'Cleared 60 days off the receivable cycle.',
    body: 'Invoicing, payments, and project tracking wired into Helm so jobs get paid in days, not months.',
    visualClass: 'mammoth',
  },
]

export default function CaseStudies() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Recent work</span>
          <h2 className={`${styles.headline} display`}>
            Work worth <em>remembering</em>.
          </h2>
        </div>

        <div className={styles.grid}>
          {stories.map((story) => (
            <article key={story.client} className={styles.card}>
              <div className={`${styles.visual} ${styles[story.visualClass]}`}>
                <span className={styles.wordmark}>{story.client}</span>
              </div>
              <div className={styles.content}>
                <span className={styles.tag}>{story.tag}</span>
                <h3 className={`${styles.cardHeadline} display`}>
                  {story.headline}
                </h3>
                <p className={styles.body}>{story.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
