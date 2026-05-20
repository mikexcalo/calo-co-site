'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './HowWeWork.module.css'

const steps = [
  { num: '01', title: 'Discovery', body: "A real conversation, not a pitch. We learn what you\u2019re building, what\u2019s working, and what\u2019s in the way." },
  { num: '02', title: 'Charting', body: "Within a week, you get a written plan and a fixed quote. What we\u2019ll do, in what order, how long, how much." },
  { num: '03', title: 'Voyage', body: "We build it for you, with you, or teach you how. Whichever fits where you are." },
  { num: '04', title: 'Course correction', body: "Launch isn\u2019t the end. We measure what\u2019s working, fix what isn\u2019t, and keep adjusting as you grow." },
]

export default function HowWeWork() {
  const [activeIdx, setActiveIdx] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const update = () => {
      const mid = window.innerHeight / 2
      let closest = 0
      let closestDist = Infinity
      stepRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const dist = Math.abs(center - mid)
        if (dist < closestDist) {
          closestDist = dist
          closest = i
        }
      })
      setActiveIdx(closest)
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section className={`${styles.section} section-dark`}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.eyebrow}>How we work</div>
          <h2 className={styles.headline}>
            A clear path from <em>first call to launch</em>
          </h2>
          <p className={styles.subhead}>
            No mystery, no bloated process. Four steps, every time.
          </p>
          <div className={styles.progress}>
            <span className={styles.progressCur}>{String(activeIdx + 1).padStart(2, '0')}</span>
            <span>/ 04</span>
          </div>
        </div>

        <div className={styles.right}>
          {steps.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => { stepRefs.current[i] = el }}
              className={`${styles.step} ${i === activeIdx ? styles.stepActive : ''}`}
            >
              <div className={styles.rail}>
                <span className={styles.dot} />
              </div>
              <div className={styles.body}>
                <div className={styles.label}>Step {step.num}</div>
                <h3 className={styles.stepTitle}><em>{step.title}</em></h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
