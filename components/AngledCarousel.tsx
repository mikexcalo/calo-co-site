'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './AngledCarousel.module.css'

// Placeholder data — swap label/image when real case studies are ready.
const cases = [
  { id: 'case-1', label: 'Case Study 01', image: null as string | null },
  { id: 'case-2', label: 'Case Study 02', image: null as string | null },
  { id: 'case-3', label: 'Case Study 03', image: null as string | null },
  { id: 'case-4', label: 'Case Study 04', image: null as string | null },
  { id: 'case-5', label: 'Case Study 05', image: null as string | null },
]

// slot transforms for relative positions -2..2 (index 0..4)
const SLOT = {
  x: [-200, -100, 0, 100, 200],
  y: [10, 5, 0, 5, 10],
  s: [0.8, 0.88, 1, 0.88, 0.8],
  r: [-4, -2, 0, 2, 4],
  o: [0, 1, 1, 1, 0],
}
const DWELL = 4000
const N = cases.length

export default function AngledCarousel() {
  const [center, setCenter] = useState(0)
  const centerRef = useRef(0)

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>
    timer = setInterval(() => {
      const next = (centerRef.current + 1) % N
      centerRef.current = next
      setCenter(next)
    }, DWELL)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className={`${styles.section} section-dark`}>
      <div className={styles.stage}>
        {cases.map((c, i) => {
          let rel = i - center
          if (rel > N / 2) rel -= N
          if (rel < -N / 2) rel += N
          const slot = rel + 2
          const visible = slot >= 0 && slot <= 4
          const style = visible
            ? {
                transform: `translate(-50%, -50%) translateX(${SLOT.x[slot]}px) translateY(${SLOT.y[slot]}px) scale(${SLOT.s[slot]}) rotate(${SLOT.r[slot]}deg)`,
                opacity: SLOT.o[slot],
                zIndex: 10 - Math.abs(rel),
              }
            : { opacity: 0, pointerEvents: 'none' as const }
          return (
            <article key={c.id} className={styles.card} style={style}>
              <div className={styles.cardInner}>
                {c.image ? (
                  <img src={c.image} alt={c.label} className={styles.cardImage} />
                ) : (
                  <span className={styles.cardLabel}>{c.label}</span>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
