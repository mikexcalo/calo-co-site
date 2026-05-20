'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './WhoWeServe.module.css'

type Audience = {
  id: string
  label: React.ReactNode
  plainLabel: string
  image: string | null
  description: string
  pills: string[]
}

const audiences: Audience[] = [
  {
    id: 'creators',
    label: <>Creators <span className="amp">&amp;</span> Designers</>,
    plainLabel: 'Creators & Designers',
    image: '/images/audiences/creators-designers.jpg',
    description: 'Solo founders, artists, and personal brands turning audience into business worth remembering.',
    pills: ['Artist', 'Designer', 'Writer', 'Maker', 'Freelance'],
  },
  {
    id: 'trades',
    label: <>Trades <span className="amp">&amp;</span> Local Services</>,
    plainLabel: 'Trades & Local Services',
    image: '/images/audiences/trades-local-services.jpg',
    description: 'Skilled-trade operators — construction, flooring, contracting — modernizing how they win and run jobs.',
    pills: ['Construction', 'Flooring', 'Landscaping', 'Plumbing', 'Electrical'],
  },
  {
    id: 'studios',
    label: <>Studios <span className="amp">&amp;</span> Media</>,
    plainLabel: 'Studios & Media',
    image: '/images/audiences/studios-media.png',
    description: 'Photographers, videographers, podcasters, and content studios turning craft into scalable business.',
    pills: ['Photography', 'Video', 'Podcast', 'Content', 'Production'],
  },
  {
    id: 'retail',
    label: <>Retail <span className="amp">&amp;</span> Accessories</>,
    plainLabel: 'Retail & Accessories',
    image: null,
    description: 'Independent product brands navigating brick-and-mortar, e-commerce, and the increasingly blurred line between.',
    pills: ['Apparel', 'Jewelry', 'Home', 'Accessories', 'Boutique'],
  },
  {
    id: 'cpg',
    label: <>CPG <span className="amp">&amp;</span> Consumables</>,
    plainLabel: 'CPG & Consumables',
    image: null,
    description: 'Food, beverage, beauty, and wellness brands building distribution, awareness, and loyalty in a crowded shelf.',
    pills: ['Food', 'Beverage', 'Beauty', 'Wellness', 'Supplements'],
  },
  {
    id: 'apps',
    label: <>Apps <span className="amp">&amp;</span> Digital Products</>,
    plainLabel: 'Apps & Digital Products',
    image: null,
    description: 'SaaS, mobile, newsletters, and digital products solving real problems. Positioning, growth, and the GTM motion that compounds.',
    pills: ['SaaS', 'Mobile', 'Newsletter', 'Web Tool', 'Marketplace'],
  },
]

export default function WhoWeServe() {
  const shelfRef = useRef<HTMLDivElement>(null)
  const [drawerId, setDrawerId] = useState<string | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Auto-scroll marquee
  useEffect(() => {
    const shelf = shelfRef.current
    if (!shelf) return
    if (reducedMotion.current) return

    let raf = 0
    let speed = 0.5 // px per frame

    const tick = () => {
      if (!isHovering && !drawerId) {
        shelf.scrollLeft += speed
        // Loop: when we've scrolled past the first set, reset
        const half = shelf.scrollWidth / 2
        if (shelf.scrollLeft >= half) {
          shelf.scrollLeft -= half
        }
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isHovering, drawerId])

  const scrollBy = useCallback((direction: 'prev' | 'next') => {
    const shelf = shelfRef.current
    if (!shelf) return
    const firstTile = shelf.querySelector('[data-tile]') as HTMLElement | null
    const step = firstTile ? firstTile.offsetWidth + 18 : 400
    shelf.scrollBy({ left: direction === 'next' ? step : -step, behavior: 'smooth' })
  }, [])

  const openDrawer = (id: string) => setDrawerId(id)
  const closeDrawer = () => setDrawerId(null)

  useEffect(() => {
    if (!drawerId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawerId])

  const drawerAudience = drawerId ? audiences.find((a) => a.id === drawerId) : null

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={`${styles.title} display`}>
          For every visionary<br />and venture
        </h2>
        <div className={styles.arrows}>
          <button type="button" className={styles.arrow} onClick={() => scrollBy('prev')} aria-label="Previous">←</button>
          <button type="button" className={styles.arrow} onClick={() => scrollBy('next')} aria-label="Next">→</button>
        </div>
      </div>

      <div
        className={styles.shelfWrap}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className={styles.shelf} ref={shelfRef}>
          {[...audiences, ...audiences].map((a, i) => (
            <article
              key={`${a.id}-${i}`}
              data-tile
              className={styles.tile}
              onClick={() => openDrawer(a.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openDrawer(a.id)
                }
              }}
            >
              {a.image ? (
                <div className={styles.tileBg} style={{ backgroundImage: `url(${a.image})` }} />
              ) : (
                <div className={`${styles.tileBg} ${styles.tileBgPlaceholder}`} />
              )}
              <div className={styles.tileContent}>
                <h3 className={styles.tileLabel}>{a.label}</h3>
                <p className={styles.tileDesc}>{a.description}</p>
                <span className={styles.viewMore}>View more →</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Detail drawer */}
      {drawerAudience && (
        <div className={styles.drawerBackdrop} onClick={closeDrawer}>
          <aside className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <button type="button" className={styles.drawerClose} onClick={closeDrawer} aria-label="Close">×</button>
            <h3 className={styles.drawerTitle}>{drawerAudience.plainLabel}</h3>
            <p className={styles.drawerDesc}>{drawerAudience.description}</p>
            <div className={styles.drawerPills}>
              {drawerAudience.pills.map((pill) => (
                <span key={pill} className={styles.drawerPill}>{pill}</span>
              ))}
            </div>
          </aside>
        </div>
      )}
    </section>
  )
}
