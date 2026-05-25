import styles from './HowWeWork.module.css'

const steps = [
  { num: '01', title: 'Discovery', body: "A real conversation, not a pitch. We learn what you\u2019re building, what\u2019s working, and what\u2019s in the way." },
  { num: '02', title: 'Charting', body: "Within a week, you get a written plan and a fixed quote. What we\u2019ll do, in what order, how long, how much." },
  { num: '03', title: 'Voyage', body: "We build it for you, with you, or teach you how. Whichever fits where you are." },
  { num: '04', title: 'Course correction', body: "Launch isn\u2019t the end. We measure what\u2019s working, fix what isn\u2019t, and keep adjusting as you grow." },
]

export default function HowWeWork() {
  return (
    <section className={`${styles.section} section-dark`}>
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

        <div className={styles.timeline}>
          <div className={styles.rail} />
          <div className={styles.steps}>
            {steps.map((step, i) => (
              <div key={step.num} className={`${styles.step} ${i === 0 ? styles.stepActive : ''}`}>
                <span className={styles.dot} />
                <div className={styles.label}>Step {step.num}</div>
                <h3 className={styles.stepTitle}><em>{step.title}</em></h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
