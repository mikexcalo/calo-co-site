import styles from './WhatWeDo.module.css'

type Pillar = {
  number: string
  label: string
  headline: React.ReactNode
  description: string
  bullets: string[]
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
    imageAlt: 'Web and systems work sample',
  },
]

export default function WhatWeDo() {
  return (
    <section className={`${styles.section} section-dark`}>
      {pillars.map((pillar) => (
        <div key={pillar.number} className={styles.row}>
          <div className={styles.imageCol}>
            {/* TODO: replace with pillar hero image */}
            <div
              className={styles.imagePlaceholder}
              role="img"
              aria-label={pillar.imageAlt}
            />
          </div>
          <div className={styles.textCol}>
            <div className={styles.numberLabel}>
              <span className={styles.numberLine} aria-hidden="true" />
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
                    className={styles.ringIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  )
}
