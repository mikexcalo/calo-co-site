'use client'
import { useEffect, useRef } from 'react'
import styles from './StoryTiles.module.css'

export default function StoryTiles() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      section.setAttribute('data-revealed', 'true')
      return
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            section.setAttribute('data-revealed', 'true')
            obs.disconnect()
          }
        })
      },
      { threshold: 0.25 }
    )
    io.observe(section)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Start here</span>
        <h2 className={styles.headline}>
          <span className={styles.word}>Wherever</span>{' '}
          <span className={styles.word}>you</span>{' '}
          <span className={styles.word}>are</span>{' '}
          <br className={styles.mBreak} />
          <span className={styles.word}>on</span>{' '}
          <span className={styles.word}>your</span>{' '}
          <span className={styles.word}>journey</span>
        </h2>
        <p className={styles.subhead}>
          Not sure where to begin? Tell us what you&apos;re thinking — we&apos;ll steer.
        </p>
        <a href="#contact" className={styles.cta} data-modal-trigger>
          Book a discovery call
        </a>
      </div>
    </section>
  )
}
