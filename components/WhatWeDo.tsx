'use client'

import { useEffect, useRef } from 'react'
import styles from './WhatWeDo.module.css'

const pillars = [
  {
    eyebrow: 'BRAND + DESIGN',
    headlinePrefix: 'Stand out in a sea of',
    italicWord: 'sameness',
    headlineSuffix: '',
    description: 'The look, voice, and identity that make people stop, trust, and remember you. From positioning to logo to every asset your business puts in the world.',
    bullets: [
      'Brand strategy and visual identity',
      'Logos, print, and signage that earn attention',
      'Voice and messaging that sound like you',
    ],
  },
  {
    eyebrow: 'MARKETING + SALES',
    headlinePrefix: 'Meet your customers where they',
    italicWord: 'are',
    headlineSuffix: '',
    description: 'The plan and the playbook for finding the right people and turning them into business. Strategy on one side, sales tactics on the other.',
    bullets: [
      'Marketing strategy and campaigns',
      'Lead generation and outbound',
      'Sales positioning and enablement',
    ],
  },
  {
    eyebrow: 'WEB + SYSTEMS',
    headlinePrefix: 'Build the',
    italicWord: 'engine',
    headlineSuffix: 'that runs your business',
    description: "The website, tools, and infrastructure that move you from scrappy to scalable. Built so you can run them yourself when you're ready.",
    bullets: [
      'Websites that work as hard as you do',
      'CRM, quoting, and invoicing tools',
      'AI and automation, built in',
    ],
  },
]

const CompassIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
)

export default function WhatWeDo() {
  const outerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const track = trackRef.current
    if (!outer || !track) return

    const isMobile = () => window.matchMedia('(max-width: 900px)').matches

    const update = () => {
      if (isMobile()) {
        track.style.transform = 'none'
        return
      }
      const rect = outer.getBoundingClientRect()
      const scrollable = outer.offsetHeight - window.innerHeight
      const p = Math.max(0, Math.min(1, -rect.top / scrollable))
      const maxX = track.scrollWidth - window.innerWidth + 128
      track.style.transform = `translate3d(-${p * maxX}px, 0, 0)`
    }

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        update()
      })
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

  return (
    <div ref={outerRef} className={`${styles.outer} section-dark`}>
      <div className={styles.pin}>
        <div className={styles.stage}>
          <div ref={trackRef} className={styles.track}>
            {pillars.map((pillar) => (
              <div key={pillar.eyebrow} className={styles.card}>
                <div className={styles.imageBlock} />
                <div className={styles.textCol}>
                  <div className={styles.eyebrow}>{pillar.eyebrow}</div>
                  <h3 className={`${styles.headline} display`}>
                    {pillar.headlinePrefix} <em>{pillar.italicWord}</em>
                    {pillar.headlineSuffix ? ` ${pillar.headlineSuffix}` : ''}
                  </h3>
                  <p className={styles.body}>{pillar.description}</p>
                  <ul className={styles.bullets}>
                    {pillar.bullets.map((bullet) => (
                      <li key={bullet} className={styles.bulletItem}>
                        <CompassIcon />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
