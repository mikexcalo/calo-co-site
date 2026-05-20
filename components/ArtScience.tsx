'use client'
import { useState } from 'react'
import styles from './ArtScience.module.css'

type Pillar = 'brand' | 'marketing' | 'growth'

const pillars: Array<{
  id: Pillar
  tag: string
  label: string
  headline: React.ReactNode
  body: string
  services: React.ReactNode
}> = [
  {
    id: 'brand',
    tag: '01 · Brand + Design',
    label: 'Brand + Design',
    headline: <>Stand out in a sea of <em>sameness</em>.</>,
    body: 'People decide how they feel about your business before they ever talk to you. We build the look, the voice, and the story that makes them want to.',
    services: <>Logo design · Visual identity · Brand systems · Voice <span className="amp">&amp;</span> tone · Positioning · Naming · Storytelling</>,
  },
  {
    id: 'marketing',
    tag: '02 · Marketing + Campaigns',
    label: 'Marketing + Campaigns',
    headline: <>Reach customers <em>where they are</em>.</>,
    body: 'Getting in front of the right people is half the work — saying the right thing when you do is the other half. We handle both.',
    services: <>Website copy · Sales decks · Case studies · Email campaigns · Social content · SEO · Paid media · Events</>,
  },
  {
    id: 'growth',
    tag: '03 · Growth + Systems',
    label: 'Growth + Systems',
    headline: <>Build a sustainable <em>growth engine</em>.</>,
    body: 'The website that brings in jobs, the way you send quotes, collect payment, and follow up without dropping the ball. We build it, wire it together, and teach you how to run it.',
    services: <>Websites · Quoting <span className="amp">&amp;</span> invoicing · Lead generation · Local SEO · Automations · AI workflows · Internal dashboards</>,
  },
]

export default function ArtScience() {
  const [expanded, setExpanded] = useState<Pillar>('brand')

  return (
    <section className={`${styles.section} section-dark`}>
      <div className={styles.inner}>
        <div className={styles.triptych} role="tablist">
          {pillars.map((pillar) => {
            const isExpanded = expanded === pillar.id
            return (
              <button
                key={pillar.id}
                type="button"
                className={`${styles.panel} ${styles[pillar.id]} ${isExpanded ? styles.expanded : ''}`}
                onClick={() => setExpanded(pillar.id)}
                aria-expanded={isExpanded}
                role="tab"
              >
                <div className={styles.panelTop}>
                  <span className={styles.panelTag}>{pillar.tag}</span>
                </div>

                <div className={styles.panelBottom}>
                  <h3 className={`${styles.panelLabel} display`}>{pillar.label}</h3>
                  <div className={styles.panelDetail}>
                    <h4 className={`${styles.panelHeadline} display`}>{pillar.headline}</h4>
                    <p className={styles.panelBody}>{pillar.body}</p>
                    <div className={styles.panelServices}>{pillar.services}</div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
