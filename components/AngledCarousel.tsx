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
      centerRef.current = (centerRef.current + 1) % N
      setCenter(centerRef.current)
    }, DWELL)
    return () => clearInterval(timer)
  }, [])

  const slotOf = (i: number) => {
    let s = ((i - center) % N + N) % N
    if (s > 2) s -= N
    return s
  }

  return (
    <section className={styles.section}>
      <div className={styles.stage}>
        {cases.map((c, i) => {
          const s = slotOf(i)
          const visible = s >= -2 && s <= 2
          const k = s + 2
          const style: React.CSSProperties = visible
            ? {
                transform: `translateX(${SLOT.x[k]}%) translateY(${SLOT.y[k]}%) scale(${SLOT.s[k]}) rotate(${SLOT.r[k]}deg)`,
                opacity: SLOT.o[k],
                zIndex: k === 2 ? 5 : 3 - Math.abs(k - 2),
              }
            : { opacity: 0, zIndex: 0 }
          return (
            <article
              key={c.id}
              className={`${styles.card} ${s === 0 ? styles.center : ''}`}
              style={style}
            >
              {c.image ? (
                <img src={c.image} alt={c.label} className={styles.cardImg} />
              ) : (
                <span className={styles.cardLabel}>{c.label}</span>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
