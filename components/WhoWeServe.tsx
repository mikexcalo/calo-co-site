'use client'
import { useRef, useState } from 'react'
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
  const [activeId, setActiveId] = useState<string>(audiences[0].id)
  const shelfRef = useRef<HTMLDivElement>(null)

  const scrollBy = (direction: 'prev' | 'next') => {
    const shelf = shelfRef.current
    if (!shelf) return
    const firstTile = shelf.querySelector('[data-tile]') as HTMLElement | null
    const step = firstTile ? firstTile.offsetWidth + 18 : 338
    shelf.scrollBy({ left: direction === 'next' ? step : -step, behavior: 'smooth' })
  }

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={`${styles.title} display`}>
          For every visionary <em>and venture</em>
        </h2>
        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollBy('prev')}
            aria-label="Previous"
          >
            ←
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollBy('next')}
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
                onClick={() => setActiveId(a.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveId(a.id)
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
