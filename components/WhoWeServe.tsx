'use client'
import { useEffect, useRef } from 'react'
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
    label: <>Artists <span className="amp">&amp;</span> Creatives</>,
    image: '/images/audiences/artist-teacher.jpg',
    description: 'Solo founders, artists, and personal brands turning audience into business worth remembering.',
    pills: ['Artist', 'Designer', 'Writer', 'Maker', 'Freelance'],
  },
  {
    id: 'trades',
    label: <>Trades <span className="amp">&amp;</span> Contractors</>,
    image: '/images/audiences/builders-contractors.jpg',
    description: 'Construction, flooring, cleaning, landscaping, and the skilled-trade operators modernizing how they win and run jobs.',
    pills: ['Construction', 'Flooring', 'Landscaping', 'Plumbing', 'Electrical'],
  },
  {
    id: 'studios',
    label: <>Studios <span className="amp">&amp;</span> Creators</>,
    image: '/images/audiences/studios-media.png',
    description: 'Photographers, videographers, artists, and content creators turning craft into a brand and a business.',
    pills: ['Photography', 'Video', 'Podcast', 'Content', 'Production'],
  },
  {
    id: 'retail',
    label: <>Shops <span className="amp">&amp;</span> Storefronts</>,
    image: '/images/audiences/designers-boutiques.jpg',
    description: 'Brick-and-mortar shops, boutiques, and local retail building a brand people travel for.',
    pills: ['Retail', 'Boutique', 'Storefront', 'E-commerce', 'Local'],
  },
  {
    id: 'cpg',
    label: <>Makers <span className="amp">&amp;</span> Merchants</>,
    image: null,
    description: 'Product and small-batch brands — spice blends, packaged goods, the makers turning a product into something people buy on sight.',
    pills: ['Packaged Goods', 'Small Batch', 'Beauty', 'Wellness', 'CPG'],
  },
  {
    id: 'apps',
    label: <>Founders <span className="amp">&amp;</span> Startups</>,
    image: '/images/audiences/founders-startups.jpg',
    description: 'SaaS, mobile, newsletters, and digital products solving real problems. Positioning, growth, and the GTM motion that compounds.',
    pills: ['SaaS', 'Mobile', 'Newsletter', 'Web Tool', 'Marketplace'],
  },
  {
    id: 'salons',
    label: <>Stylists <span className="amp">&amp;</span> Salons</>,
    image: '/images/audiences/stylists-salons.jpg',
    description: 'Hair stylists, barbers, estheticians, and salon owners building a brand clients come back to.',
    pills: ['Hair', 'Barber', 'Spa', 'Nails', 'Esthetics'],
  },
  {
    id: 'fooddrink',
    label: <>Food <span className="amp">&amp;</span> Drink</>,
    image: '/images/audiences/food-drink.jpg',
    description: 'Food trucks, cafés, caterers, and the operators turning a food business into a name people seek out.',
    pills: ['Food Truck', 'Café', 'Catering', 'Coffee', 'Hospitality'],
  },
]

const orderedAudiences: Audience[] = ['trades', 'retail', 'fooddrink', 'cpg', 'apps', 'studios']
  .map((id) => audiences.find((a) => a.id === id))
  .filter((a): a is Audience => Boolean(a))

export default function WhoWeServe() {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const pendingRef = useRef(0)
  const pausedRef = useRef(false)
  const stepRef = useRef(378)
  const dragRef = useRef<{ active: boolean; lastX: number; lastT: number; vel: number }>({
    active: false, lastX: 0, lastT: 0, vel: 0,
  })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const SPEED = isMobile ? 1.5 : 1.2
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let half = 0
    let scrollStarted = reduce // if reduced-motion, allow scroll immediately

    const measure = () => {
      const tile = track.querySelector('[data-tile]') as HTMLElement | null
      if (!tile) return
      const gap = parseFloat(getComputedStyle(track).columnGap || '18') || 18
      stepRef.current = tile.offsetWidth + gap
      half = stepRef.current * audiences.length
    }

    const frame = () => {
      if (scrollStarted && !dragRef.current.active && !pausedRef.current && !reduce) offsetRef.current += SPEED
      if (!dragRef.current.active && Math.abs(pendingRef.current) > 0.4) {
        const s = pendingRef.current * 0.12
        offsetRef.current += s
        pendingRef.current -= s
      }
      if (half > 0) {
        if (offsetRef.current >= half) offsetRef.current -= half
        if (offsetRef.current < 0) offsetRef.current += half
      }
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
      raf = requestAnimationFrame(frame)
    }

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      dragRef.current = { active: true, lastX: t.clientX, lastT: e.timeStamp, vel: 0 }
      pendingRef.current = 0
      pausedRef.current = true
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!dragRef.current.active) return
      const t = e.touches[0]
      const dx = t.clientX - dragRef.current.lastX
      const dt = e.timeStamp - dragRef.current.lastT || 16
      offsetRef.current -= dx
      dragRef.current.vel = dx / dt
      dragRef.current.lastX = t.clientX
      dragRef.current.lastT = e.timeStamp
    }
    const onTouchEnd = () => {
      if (!dragRef.current.active) return
      dragRef.current.active = false
      pendingRef.current = -dragRef.current.vel * 220
      pausedRef.current = false
    }

    const track2 = track
    track2.addEventListener('touchstart', onTouchStart, { passive: true })
    track2.addEventListener('touchmove', onTouchMove, { passive: true })
    track2.addEventListener('touchend', onTouchEnd, { passive: true })
    track2.addEventListener('touchcancel', onTouchEnd, { passive: true })

    const section = track.closest('section')
    if (section && !reduce) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            section.setAttribute('data-revealed', 'true')
            obs.disconnect()
            // release auto-scroll after the entrance choreography completes
            window.setTimeout(() => { scrollStarted = true }, 2800)
          }
        })
      }, { threshold: 0.25 })
      io.observe(section)
    } else if (section) {
      section.setAttribute('data-revealed', 'true')
    }

    measure()
    raf = requestAnimationFrame(frame)
    window.addEventListener('resize', measure)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measure)
      track2.removeEventListener('touchstart', onTouchStart)
      track2.removeEventListener('touchmove', onTouchMove)
      track2.removeEventListener('touchend', onTouchEnd)
      track2.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [])

  const nudge = (dir: 1 | -1) => {
    pendingRef.current += dir * stepRef.current
  }

  return (
    <section className={`${styles.section} section-dark`}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>Who we serve</span>
        <h2 className={styles.title}>
          <span className={styles.word}>For</span>{' '}
          <span className={styles.word}>every</span>{' '}
          <span className={styles.word}>visionary</span>
          <br />
          <span className={styles.word}>and</span>{' '}
          <span className={styles.word}>venture</span>
        </h2>
        <p className={styles.subhead}>
          From solo founders to skilled-trade teams, we&rsquo;re here to help navigate the brand or business you&rsquo;re building, all at your pace.
        </p>
      </div>

      <div
        className={styles.shelfWrap}
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
      >
        <div className={styles.shelf} ref={trackRef}>
          {[...orderedAudiences, ...orderedAudiences].map((a, i) => (
            <article key={`${a.id}-${i}`} data-tile className={styles.tile}>
              {a.image ? (
                <div className={styles.tileBg} style={{ backgroundImage: `url(${a.image})` }} />
              ) : (
                <div className={`${styles.tileBg} ${styles.tileBgPlaceholder}`} />
              )}
              <div className={styles.tileContent}>
                <h3 className={styles.tileLabel}>{a.label}</h3>
                <p className={styles.tileDesc}>{a.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.arrowBar}>
        <button type="button" className={styles.arrow} onClick={() => nudge(-1)} aria-label="Previous">&larr;</button>
        <button type="button" className={styles.arrow} onClick={() => nudge(1)} aria-label="Next">&rarr;</button>
      </div>
    </section>
  )
}
