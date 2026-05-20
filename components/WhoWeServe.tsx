'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './WhoWeServe.module.css'

type Audience = {
  id: string
  label: React.ReactNode
  image: string | null
  description: string
  pills: string[]
}

const audiences: Audience[] = [
  {
    id: 'creators',
    label: <>Creators <span className="amp">&amp;</span> Designers</>,
    image: '/images/audiences/creators-designers.jpg',
    description: 'Solo founders, artists, and personal brands turning audience into business worth remembering.',
    pills: ['Artist', 'Designer', 'Writer', 'Maker', 'Freelance'],
  },
  {
    id: 'trades',
    label: <>Trades <span className="amp">&amp;</span> Local Services</>,
    image: '/images/audiences/trades-local-services.jpg',
    description: 'Skilled-trade operators — construction, flooring, contracting — modernizing how they win and run jobs.',
    pills: ['Construction', 'Flooring', 'Landscaping', 'Plumbing', 'Electrical'],
  },
  {
    id: 'studios',
    label: <>Studios <span className="amp">&amp;</span> Media</>,
    image: '/images/audiences/studios-media.png',
    description: 'Photographers, videographers, podcasters, and content studios turning craft into scalable business.',
    pills: ['Photography', 'Video', 'Podcast', 'Content', 'Production'],
  },
  {
    id: 'retail',
    label: <>Retail <span className="amp">&amp;</span> Accessories</>,
    image: null,
    description: 'Independent product brands navigating brick-and-mortar, e-commerce, and the increasingly blurred line between.',
    pills: ['Apparel', 'Jewelry', 'Home', 'Accessories', 'Boutique'],
  },
  {
    id: 'cpg',
    label: <>CPG <span className="amp">&amp;</span> Consumables</>,
    image: null,
    description: 'Food, beverage, beauty, and wellness brands building distribution, awareness, and loyalty in a crowded shelf.',
    pills: ['Food', 'Beverage', 'Beauty', 'Wellness', 'Supplements'],
  },
  {
    id: 'apps',
    label: <>Apps <span className="amp">&amp;</span> Digital Products</>,
    image: null,
    description: 'SaaS, mobile, newsletters, and digital products solving real problems. Positioning, growth, and the GTM motion that compounds.',
    pills: ['SaaS', 'Mobile', 'Newsletter', 'Web Tool', 'Marketplace'],
  },
]

export default function WhoWeServe() {
  const shelfRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const pauseUntilRef = useRef(0)
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Auto-scroll marquee
  useEffect(() => {
    const shelf = shelfRef.current
    if (!shelf || reducedMotion.current) return

    let raf = 0
    const tick = () => {
      if (!isHovering && Date.now() >= pauseUntilRef.current) {
        shelf.scrollLeft += 0.5
        const half = shelf.scrollWidth / 2
        if (shelf.scrollLeft >= half) {
          shelf.scrollLeft -= half
        }
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isHovering])

  const scrollBy = useCallback((direction: 'prev' | 'next') => {
    pauseUntilRef.current = Date.now() + 4000
    const shelf = shelfRef.current
    if (!shelf) return
    const firstTile = shelf.querySelector('[data-tile]') as HTMLElement | null
    const step = firstTile ? firstTile.offsetWidth + 18 : 400
    shelf.scrollBy({ left: direction === 'next' ? step : -step, behavior: 'smooth' })
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={`${styles.title} display`}>
          For every visionary and venture
        </h2>
        <div className={styles.arrows}>
          <button type="button" className={styles.arrow} onClick={() => scrollBy('prev')} aria-label="Previous">&larr;</button>
          <button type="button" className={styles.arrow} onClick={() => scrollBy('next')} aria-label="Next">&rarr;</button>
        </div>
      </div>

      <div
        className={styles.shelfWrap}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className={styles.shelf} ref={shelfRef}>
          {[...audiences, ...audiences].map((a, i) => (
            <article key={`${a.id}-${i}`} data-tile className={styles.tile}>
              {a.image ? (
                <div className={styles.tileBg} style={{ backgroundImage: `url(${a.image})` }} />
              ) : (
                <div className={`${styles.tileBg} ${styles.tileBgPlaceholder}`} />
              )}
              <div className={styles.tileContent}>
                <h3 className={styles.tileLabel}>{a.label}</h3>
                <p className={styles.tileDesc}>{a.description}</p>
                <div className={styles.tilePills}>
                  {a.pills.map((pill) => (
                    <span key={pill} className={styles.tilePill}>{pill}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
