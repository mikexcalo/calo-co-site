'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Testimonial.module.css'

const words = [
  '\u201C', 'Mike', 'is', 'a', 'master', 'of', 'his',
  'craft', 'and', 'comes', 'highly', 'recommended.', '\u201D',
]

export default function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null)
  const [jsReady, setJsReady] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    setJsReady(true)
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} section-dark ${jsReady ? styles.jsReady : ''} ${inView ? styles.inView : ''}`}
    >
      <div className={styles.sticky}>
        <div className={styles.content}>
          <div className={styles.stars}>
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className={styles.starWrap}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.4c.32 0 .61.19.74.49l2.27 5.36 5.82.52a.8.8 0 0 1 .46 1.4l-4.42 3.85 1.34 5.71a.8.8 0 0 1-1.19.87L12 17.7l-4.99 2.9a.8.8 0 0 1-1.19-.87l1.34-5.71L2.74 10.17a.8.8 0 0 1 .46-1.4l5.82-.52L11.26 2.9c.13-.3.42-.49.74-.49z"/>
                </svg>
              </span>
            ))}
          </div>
          <blockquote className={styles.quote}>
            {words.map((word, i) => {
              const isOpen = word === '\u201C'
              const isClose = word === '\u201D'
              const needsSpaceBefore = i > 0 && !isClose && words[i - 1] !== '\u201C'
              return (
                <span key={i}>
                  {needsSpaceBefore && ' '}
                  <span
                    className={styles.word}
                    style={{ '--i': i } as React.CSSProperties}
                  >{word}</span>
                </span>
              )
            })}
          </blockquote>
          <div className={styles.signature}>
            <div className={styles.signatureName}>JoAnn Dorio</div>
            <p className={styles.signatureRole}>Founder, Hero&apos;s Journey Coaching</p>
          </div>
        </div>
      </div>
    </section>
  )
}
