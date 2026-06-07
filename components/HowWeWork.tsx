import styles from './HowWeWork.module.css'

const steps = [
  {
    num: '01',
    tag: 'DISCOVERY',
    title: 'Understand the business',
    body: 'We take time to learn the concept, the brand, the business. Where you are now, and where you\u2019re trying to get to.',
  },
  {
    num: '02',
    tag: 'PLANNING',
    title: 'Scope it to your budget',
    body: 'We build a plan around your budget and what matters most. Nothing you don\u2019t need.',
  },
  {
    num: '03',
    tag: 'PARTNERSHIP',
    title: 'Build, guide, or teach',
    body: 'From there we build it for you, build it with you, or show you how. Then we leave you the tools to keep going on your own.',
  },
]

export default function HowWeWork() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.headline}>
            Every business starts <em>somewhere different</em>
          </h2>
          <p className={styles.subhead}>
            A partner for the long run. We learn yours first, then build the plan around it.
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.num} className={styles.step}>
              <div className={styles.eyebrow}>
                <span className={styles.eyeNum}>{step.num}</span>
                <span className={styles.eyeSep}> &middot; </span>
                <span className={styles.eyeTag}>{step.tag}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
