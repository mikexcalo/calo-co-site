'use client'
import { useEffect, useRef } from 'react'
import styles from './ExpandingQuote.module.css'

export default function ExpandingQuote() {
  const moduleRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const moduleEl = moduleRef.current
    const panelEl = panelRef.current
    if (!moduleEl || !panelEl) return

    const ease = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3))
    const seg = (p: number, a: number, b: number) =>
      ease(Math.max(0, Math.min(1, (p - a) / (b - a))))

    let raf = 0
    let revealed = false
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) { revealed = true; panelEl.setAttribute('data-revealed', 'true') }
    const update = () => {
      raf = 0
      const rect = moduleEl.getBoundingClientRect()
      const total = moduleEl.offsetHeight - window.innerHeight
      const p = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0
      const openP = seg(p, 0, 0.3)
      const exit =
        total > 0
          ? Math.max(0, Math.min(1, (-rect.top - total) / window.innerHeight))
          : 0
      const closeP = ease(exit)
      const pv = openP * (1 - closeP)
      panelEl.style.setProperty('--p', pv.toFixed(4))
      if (!revealed && p >= 0.3) {
        revealed = true
        panelEl.setAttribute('data-revealed', 'true')
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className={styles.module} ref={moduleRef}>
      {/* Desktop: sticky + motion */}
      <div className={styles.sticky}>
        <div className={styles.panel} ref={panelRef} style={{ ['--p' as string]: 0 }}>
          <img src="/images/audiences/stevie-trevino.jpg" alt="Stevie Treviño of Stevie's Poem Store" />
          <div className={styles.scrimL} />
          <div className={styles.scrimBR} />
          <div className={styles.qzone}>
            <p className={styles.qText}>
              {'When I started, it was just me and my typewriter on the sidewalk. I never imagined it would turn into a brand, a website, and a collaboration with L.L.Bean.'.split(' ').flatMap((w, i) => [
                <span key={i} className={styles.word} style={{ transitionDelay: `${(0.15 + i * 0.11).toFixed(2)}s` }}>{w}</span>,
                ' ',
              ])}
            </p>
            <div className={`${styles.qSig} ${styles.fi}`} style={{ transitionDelay: '3.40s' }}>Stevie Treviño</div>
            <div className={`${styles.qRole} ${styles.fi}`} style={{ transitionDelay: '3.52s' }}>Founder, Stevie&rsquo;s Poem Store</div>
            <a className={`${styles.qLink} ${styles.fi}`} style={{ transitionDelay: '3.64s' }} href="https://steviespoemstore.com" target="_blank" rel="noopener noreferrer">Visit Stevie&rsquo;s Poem Store &rarr;</a>
          </div>
        </div>
      </div>

      {/* Mobile: static Square layout */}
      <div className={styles.mobileCard}>
        <div className={styles.mobilePhoto}>
          <img src="/images/audiences/stevie-trevino.jpg" alt="Stevie Treviño of Stevie's Poem Store" />
          <div className={styles.mobileGrad} />
          <div className={styles.mobileAttrib}>
            <div className={styles.mobileAttribName}>Stevie Treviño</div>
            <div className={styles.mobileAttribRole}>Founder, Stevie&rsquo;s Poem Store</div>
          </div>
        </div>
        <div className={styles.mobileBody}>
          <p className={styles.mobileQuote}>
            When I started, it was just me and my typewriter on the sidewalk. I never imagined it would turn into a brand, a website, and a collaboration with L.L.Bean.
          </p>
          <a className={styles.mobileBtn} href="https://steviespoemstore.com" target="_blank" rel="noopener noreferrer">Visit Stevie&rsquo;s Poem Store</a>
        </div>
      </div>
    </div>
  )
}
