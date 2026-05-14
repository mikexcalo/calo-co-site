'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './WhatWeDo.module.css'

type Pillar = {
  label: string
  headline: React.ReactNode
  description: string
  bullets: string[]
  imageAlt: string
}

const pillars: Pillar[] = [
  {
    label: 'BRAND + DESIGN',
    headline: <>Stand out in a sea of <em>sameness</em>.</>,
    description: 'The look, voice, and identity that make people stop, trust, and remember you. From positioning to logo to every asset your business puts in the world.',
    bullets: [
      'Brand strategy and visual identity',
      'Logos, print, and signage that earn attention',
      'Voice and messaging that sound like you',
    ],
    imageAlt: 'Brand and design work sample',
  },
  {
    label: 'MARKETING + SALES',
    headline: <>Meet your customers where they <em>are</em>.</>,
    description: 'The plan and the playbook for finding the right people and turning them into business. Strategy on one side, sales tactics on the other.',
    bullets: [
      'Marketing strategy and campaigns',
      'Lead generation and outbound',
      'Sales positioning and enablement',
    ],
    imageAlt: 'Marketing and sales work sample',
  },
  {
    label: 'WEB + SYSTEMS',
    headline: <>Build the <em>engine</em> that runs your business.</>,
    description: "The website, tools, and infrastructure that move you from scrappy to scalable. Built so you can run them yourself when you're ready.",
    bullets: [
      'Websites that work as hard as you do',
      'CRM, quoting, and invoicing tools',
      'AI and automation, built in',
    ],
    imageAlt: 'Web and systems work sample',
  },
]

const CompassIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
)

export default function WhatWeDo() {
  const [activeIndex, setActiveIndex] = useState(0)
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx)
            if (!isNaN(idx)) setActiveIndex(idx)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )
    blockRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={`${styles.section} section-dark`}>
      {/* Desktop: two-column sticky layout */}
      <div className={styles.split}>
        <div className={styles.imageStack}>
          <div className={styles.imageInner}>
            {pillars.map((pillar, i) => (
              <div
                key={pillar.label}
                className={`${styles.imageLayer} ${i === activeIndex ? styles.imageLayerActive : ''}`}
                role="img"
                aria-label={pillar.imageAlt}
              />
            ))}
          </div>
        </div>

        <div className={styles.textStack}>
          {pillars.map((pillar, i) => (
            <div
              key={pillar.label}
              data-idx={i}
              ref={(el) => { blockRefs.current[i] = el }}
              className={`${styles.textBlock} ${i === activeIndex ? styles.textBlockActive : ''}`}
            >
              <div className={styles.numberLabel}>
                {pillar.label}
              </div>
              <h2 className={`${styles.headline} display`}>
                {pillar.headline}
              </h2>
              <p className={styles.description}>{pillar.description}</p>
              <ul className={styles.bullets}>
                {pillar.bullets.map((bullet) => (
                  <li key={bullet} className={styles.bulletItem}>
                    <CompassIcon className={styles.compassIcon} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: stacked rows */}
      <div className={styles.mobileRows}>
        {pillars.map((pillar) => (
          <div key={pillar.label} className={styles.mobileRow}>
            <div className={styles.mobileImage} role="img" aria-label={pillar.imageAlt} />
            <div className={styles.textCol}>
              <div className={styles.numberLabel}>
                {pillar.label}
              </div>
              <h2 className={`${styles.headline} display`}>
                {pillar.headline}
              </h2>
              <p className={styles.description}>{pillar.description}</p>
              <ul className={styles.bullets}>
                {pillar.bullets.map((bullet) => (
                  <li key={bullet} className={styles.bulletItem}>
                    <CompassIcon className={styles.compassIcon} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
