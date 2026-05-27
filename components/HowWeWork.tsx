'use client'

import { useEffect, useRef, useCallback } from 'react'
import styles from './HowWeWork.module.css'

const cards = [
  {
    num: '01',
    tag: 'Discovery',
    title: 'Chart the course',
    body: 'We dig into your business, your market, and your goals. You leave with a plan built on evidence \u2014 not a guess.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="5" r="3" />
        <path d="M6 21l2-12h8l2 12" />
        <path d="M8 9l1.5 6M16 9l-1.5 6" />
        <line x1="9" y1="13" x2="15" y2="13" />
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
        <path d="M1 6l7-3 8 4 7-3v15l-7 3-8-4-7 3V6z" />
        <line x1="8" y1="7" x2="8" y2="22" />
        <line x1="16" y1="3" x2="16" y2="18" />
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
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="3" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="21" />
        <line x1="3" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="21" y2="12" />
        <line x1="5.6" y1="5.6" x2="7.8" y2="7.8" />
        <line x1="16.2" y1="16.2" x2="18.4" y2="18.4" />
        <line x1="18.4" y1="5.6" x2="16.2" y2="7.8" />
        <line x1="7.8" y1="16.2" x2="5.6" y2="18.4" />
      </svg>
    ),
  },
]

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v))
}

export default function HowWeWork() {
  const runwayRef = useRef<HTMLElement>(null)
  const tileRefs = useRef<(HTMLDivElement | null)[]>([])
  const lastActiveRef = useRef(-1)

  const onFrame = useCallback(() => {
    const runway = runwayRef.current
    if (!runway) return

    const rect = runway.getBoundingClientRect()
    const pinnedScroll = runway.offsetHeight - window.innerHeight

    let active = -1
    if (rect.top > 0) {
      // not arrived yet
      active = -1
    } else if (rect.bottom < window.innerHeight) {
      // released past
      active = 2
    } else {
      const p = clamp(-rect.top / pinnedScroll, 0, 1)
      active = Math.min(2, Math.floor(p * 3))
    }

    if (active !== lastActiveRef.current) {
      lastActiveRef.current = active
      for (let i = 0; i < 3; i++) {
        const el = tileRefs.current[i]
        if (!el) continue
        if (i === active) {
          el.classList.add(styles.on)
          el.classList.remove(styles.dim)
        } else if (active >= 0) {
          el.classList.remove(styles.on)
          el.classList.add(styles.dim)
        } else {
          el.classList.remove(styles.on)
          el.classList.remove(styles.dim)
        }
      }
    }
  }, [])

  useEffect(() => {
    let rafId: number
    const tick = () => {
      onFrame()
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [onFrame])

  return (
    <section ref={runwayRef} className={styles.runway}>
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <div className={styles.head}>
            <span className={styles.eyebrow}>How we work</span>
            <h2 className={styles.headline}>
              A clear path from <em>first call to launch</em>
            </h2>
            <p className={styles.subhead}>
              No mystery, no bloated process. Three steps, every time.
            </p>
          </div>

          <div className={styles.grid}>
            {cards.map((card, i) => (
              <div
                key={card.num}
                ref={(el) => { tileRefs.current[i] = el }}
                className={styles.card}
              >
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
      </div>
    </section>
  )
}
