import styles from './HowWeWork.module.css'

const cards = [
  {
    num: '01',
    tag: 'Discovery',
    title: 'Chart the course',
    body: 'We dig into your business, your market, and your goals. You leave with a plan built on evidence \u2014 not a guess.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <polygon points="15.5 8.5 10.5 10.5 8.5 15.5 13.5 13.5 15.5 8.5" />
      </svg>
    ),
  },
  {
    num: '02',
    tag: 'Design & build',
    title: 'Build the kit',
    body: 'Brand, website, and systems \u2014 designed and built by one team, in sync, with nothing lost between handoffs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.5 5.5l4 4" />
        <path d="M3 21l3.5-1 11-11-2.5-2.5-11 11L3 21z" />
        <path d="M15 4l5 5" />
      </svg>
    ),
  },
  {
    num: '03',
    tag: 'Growth',
    title: 'Launch & steer',
    body: 'We put it live and run the growth \u2014 campaigns, lead flow, and the tuning that turns traffic into revenue.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 17l6-6 4 4 8-8" />
        <polyline points="14 7 21 7 21 14" />
      </svg>
    ),
  },
  {
    num: '04',
    tag: 'Handover',
    title: 'Hand on the wheel',
    body: 'Everything is built so your team can run it. You get the keys, the training, and the confidence \u2014 never a lock-in.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
      </svg>
    ),
  },
]

export default function HowWeWork() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>How we work</span>
          <h2 className={styles.headline}>
            A clear path from <em>first call to launch</em>
          </h2>
          <p className={styles.subhead}>
            No mystery, no bloated process. Four steps, every time.
          </p>
        </div>

        <div className={styles.grid}>
          {cards.map((card) => (
            <div key={card.num} className={styles.card}>
              <div className={styles.kicker}>
                <span className={styles.kickerNum}>{card.num}</span>
                <span className={styles.kickerSep}> · </span>
                <span className={styles.kickerTag}>{card.tag}</span>
              </div>
              <div className={styles.icon}>{card.icon}</div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardBody}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
