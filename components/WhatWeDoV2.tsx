'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './WhatWeDoV2.module.css'

const LighthouseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2.5 L15.5 6 H8.5 Z" />
    <path d="M9.5 6 V9 H14.5 V6" />
    <path d="M10 9 L8.7 21 H15.3 L14 9" />
    <path d="M9.4 15 H14.6" />
    <path d="M7 21 H17" />
    <path d="M16.5 7 L19 6" />
    <path d="M16.5 9 L19 10" />
  </svg>
)

const SpyglassIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 16.5 L15 5 L19 9 L6.5 19 Z" />
    <path d="M8 12.5 L11.5 16" />
    <path d="M12 8.5 L15.5 12" />
  </svg>
)

const HelmIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2.2" />
    <line x1="15" y1="12" x2="21" y2="12" />
    <line x1="9" y1="12" x2="3" y2="12" />
    <line x1="12" y1="9" x2="12" y2="3" />
    <line x1="12" y1="15" x2="12" y2="21" />
    <line x1="14.12" y1="9.88" x2="18.36" y2="5.64" />
    <line x1="9.88" y1="9.88" x2="5.64" y2="5.64" />
    <line x1="9.88" y1="14.12" x2="5.64" y2="18.36" />
    <line x1="14.12" y1="14.12" x2="18.36" y2="18.36" />
  </svg>
)

const CompassIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
)

const pillars = [
  {
    label: 'Brand + Design',
    Icon: LighthouseIcon,
    headline: (
      <>
        Stand out in a sea<br />of <em>sameness</em>
      </>
    ),
    description:
      'The look, voice, and identity that make people stop, trust, and remember you. From positioning to logo to every asset your business puts in the world.',
    bullets: [
      'Brand strategy and visual identity',
      'Logos, print, and signage that earn attention',
      'Voice and messaging that sound like you',
    ],
  },
  {
    label: 'Marketing + Sales',
    Icon: SpyglassIcon,
    headline: (
      <>
        Meet your customers<br />where they <em>are</em>
      </>
    ),
    description:
      'The plan and the playbook for finding the right people and turning them into business. Strategy on one side, sales tactics on the other.',
    bullets: [
      'Marketing strategy and campaigns',
      'Lead generation and outbound',
      'Sales positioning and enablement',
    ],
  },
  {
    label: 'Web + Systems',
    Icon: HelmIcon,
    headline: (
      <>
        Build the <em>engine</em> that<br />runs your business
      </>
    ),
    description:
      "The website, tools, and infrastructure that move you from scrappy to scalable. Built so you can run them yourself when you're ready.",
    bullets: [
      'Websites that work as hard as you do',
      'CRM, quoting, and invoicing tools',
      'AI and automation, built in',
    ],
  },
]

export default function WhatWeDoV2() {
  const outerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [hl, setHl] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const pill = pillRefs.current[active]
    if (pill) setHl({ left: pill.offsetLeft, width: pill.offsetWidth })
  }, [active])

  useEffect(() => {
    const onResize = () => {
      const pill = pillRefs.current[active]
      if (pill) setHl({ left: pill.offsetLeft, width: pill.offsetWidth })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active])

  useEffect(() => {
    const outer = outerRef.current
    const track = trackRef.current
    if (!outer || !track) return

    const N = pillars.length
    const isMobile = () => window.matchMedia('(max-width: 900px)').matches
    let raf = 0

    const update = () => {
      raf = 0
      if (isMobile()) {
        track.style.transform = 'none'
        return
      }
      const rect = outer.getBoundingClientRect()
      const scrollable = outer.offsetHeight - window.innerHeight
      const p = Math.max(0, Math.min(1, -rect.top / scrollable))
      const pos = p * (N - 1)
      track.style.transform = `translate3d(${-pos * 100}%, 0, 0)`
      cardRefs.current.forEach((c, i) => {
        if (!c) return
        const dist = Math.min(Math.abs(pos - i), 1)
        c.style.transform = `scale(${1 - dist * 0.07})`
        c.style.opacity = String(1 - dist * 0.55)
      })
      const idx = Math.round(pos)
      setActive((prev) => (prev === idx ? prev : idx))
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const goTo = (i: number) => {
    const outer = outerRef.current
    if (!outer) return
    const scrollable = outer.offsetHeight - window.innerHeight
    window.scrollTo({
      top: outer.offsetTop + (i / (pillars.length - 1)) * scrollable,
      behavior: 'smooth',
    })
  }

  return (
    <div ref={outerRef} className={`${styles.outer} section-dark`}>
      <div className={styles.pin}>
        <h2 className={styles.title}>
          Everything your business needs to <em>grow</em>
        </h2>

        <div className={styles.pillsWrap}>
          <div className={styles.pills}>
            <span
              className={styles.pillHl}
              style={{ transform: `translateX(${hl.left - 6}px)`, width: hl.width }}
              aria-hidden="true"
            />
            {pillars.map((p, i) => {
              const Icon = p.Icon
              return (
                <button
                  key={p.label}
                  ref={(el) => {
                    pillRefs.current[i] = el
                  }}
                  className={`${styles.pill} ${i === active ? styles.pillActive : ''}`}
                  aria-pressed={i === active}
                  onClick={() => goTo(i)}
                >
                  <Icon />
                  <span>{p.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className={styles.stage}>
          <div ref={trackRef} className={styles.track}>
            {pillars.map((p, i) => (
              <div
                key={p.label}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                className={styles.card}
              >
                <div className={styles.cardGrid}>
                  <div className={styles.imageBlock} aria-hidden="true" />
                  <div className={styles.textCol}>
                    <h3 className={styles.headline}>{p.headline}</h3>
                    <p className={styles.body}>{p.description}</p>
                    <ul className={styles.bullets}>
                      {p.bullets.map((b) => (
                        <li key={b} className={styles.bulletItem}>
                          <CompassIcon />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
