'use client'
import { useEffect, useRef, useState } from 'react'
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
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const shelfRef = useRef<HTMLDivElement>(null)
  const pauseUntilRef = useRef<number>(0)

  const pauseAutoplay = () => {
    pauseUntilRef.current = Date.now() + 8000
  }

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.intersectionRatio >= 0.5)
      },
      { threshold: 0.5 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return
      setActiveId((prev) => {
        const idx = prev === null ? -1 : audiences.findIndex((a) => a.id === prev)
        return audiences[((idx === -1 ? -1 : idx) + 1 + audiences.length) % audiences.length].id
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [isInView])

  const handleArrow = (direction: 'next' | 'prev') => {
    pauseAutoplay()
    setActiveId((prev) => {
      const idx = prev === null ? -1 : audiences.findIndex((a) => a.id === prev)
      if (idx === -1) {
        return direction === 'next' ? audiences[0].id : audiences[audiences.length - 1].id
      }
      return audiences[(idx + (direction === 'next' ? 1 : -1) + audiences.length) % audiences.length].id
    })
    const shelf = shelfRef.current
    if (!shelf) return
    const firstTile = shelf.querySelector('[data-tile]') as HTMLElement | null
    const step = firstTile ? firstTile.offsetWidth + 18 : 338
    shelf.scrollBy({ left: direction === 'next' ? step : -step, behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.head}>
        <h2 className={`${styles.title} display`}>
          For every visionary <em>and venture</em>
        </h2>
        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => handleArrow('prev')}
            aria-label="Previous"
          >
            ←
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => handleArrow('next')}
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>

      <div className={styles.shelfWrap}>
        <div className={styles.shelf} ref={shelfRef}>
          {audiences.map((a) => {
            const isActive = activeId === a.id
            return (
              <article
                key={a.id}
                data-tile
                className={`${styles.tile} ${isActive ? styles.active : ''}`}
                onClick={() => {
                  pauseAutoplay()
                  setActiveId((prev) => prev === a.id ? null : a.id)
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    pauseAutoplay()
                    setActiveId((prev) => prev === a.id ? null : a.id)
                  }
                }}
              >
                {a.image ? (
                  <div
                    className={styles.tileBg}
                    style={{ backgroundImage: `url(${a.image})` }}
                  />
                ) : (
                  <div className={`${styles.tileBg} ${styles.tileBgPlaceholder}`} />
                )}
                <div className={styles.tileContent}>
                  <h3 className={styles.tileLabel}>{a.label}</h3>
                  <div className={styles.tileDetail}>
                    <p className={styles.tileDesc}>{a.description}</p>
                    <div className={styles.tilePills}>
                      {a.pills.map((pill) => (
                        <span key={pill} className={styles.tilePill}>
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
