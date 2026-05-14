import styles from './WhatWeDo.module.css'

type Pillar = {
  number: string
  label: string
  headline: React.ReactNode
  description: string
  bullets: string[]
  ctaLabel: string
  ctaHref: string
  imageAlt: string
}

const pillars: Pillar[] = [
  {
    number: '01',
    label: 'BRAND + DESIGN',
    headline: <>Stand out in a sea of <em>sameness</em>.</>,
    description: 'The look, voice, and identity that make people stop, trust, and remember you. From positioning to logo to every asset your business puts in the world.',
    bullets: [
      'Brand strategy and visual identity',
      'Logos, print, and signage that earn attention',
      'Voice and messaging that sound like you',
    ],
    ctaLabel: 'EXPLORE BRAND + DESIGN',
    ctaHref: '#',
    imageAlt: 'Brand and design work sample',
  },
  {
    number: '02',
    label: 'MARKETING + SALES',
    headline: <>Meet your customers where they <em>are</em>.</>,
    description: 'The plan and the playbook for finding the right people and turning them into business. Strategy on one side, sales tactics on the other.',
    bullets: [
      'Marketing strategy and campaigns',
      'Lead generation and outbound',
      'Sales positioning and enablement',
    ],
    ctaLabel: 'EXPLORE MARKETING + SALES',
    ctaHref: '#',
    imageAlt: 'Marketing and sales work sample',
  },
  {
    number: '03',
    label: 'WEB + SYSTEMS',
    headline: <>Build the <em>engine</em> that runs your business.</>,
    description: "The website, tools, and infrastructure that move you from scrappy to scalable. Built so you can run them yourself when you're ready.",
    bullets: [
      'Websites that work as hard as you do',
      'CRM, quoting, and invoicing tools',
      'AI and automation, built in',
    ],
    ctaLabel: 'EXPLORE WEB + SYSTEMS',
    ctaHref: '#',
    imageAlt: 'Web and systems work sample',
  },
]

export default function WhatWeDo() {
  return (
    <section className={`${styles.section} section-dark`}>
      {pillars.map((pillar, i) => {
        // Even index (0, 2): text-left, image-right
        // Odd index (1): image-left, text-right
        const flipped = i % 2 !== 0
        return (
          <div
            key={pillar.number}
            className={`${styles.row} ${flipped ? styles.rowFlipped : ''}`}
          >
            <div className={styles.textCol}>
              <div className={styles.numberLabel}>
                {pillar.number} / {pillar.label}
              </div>
              <h2 className={`${styles.headline} display`}>
                {pillar.headline}
              </h2>
              <p className={styles.description}>{pillar.description}</p>
              <ul className={styles.bullets}>
                {pillar.bullets.map((bullet) => (
                  <li key={bullet} className={styles.bulletItem}>
                    <svg
                      className={styles.checkIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <a href={pillar.ctaHref} className={styles.cta}>
                {pillar.ctaLabel}
                <svg
                  className={styles.arrowIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
            <div className={styles.imageCol}>
              {/* TODO: replace with brand collateral hero image */}
              <div
                className={styles.imagePlaceholder}
                role="img"
                aria-label={pillar.imageAlt}
              />
            </div>
          </div>
        )
      })}
    </section>
  )
}
