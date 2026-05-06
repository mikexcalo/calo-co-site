"use client";
import { useState } from "react";
import styles from "./Tiers.module.css";

type Tier = {
  num: string;
  name: string;
  tag: string;
  blurb: string;
  bullets: string[];
  best: string;
};

const TIERS: Tier[] = [
  {
    num: "01",
    name: "Launch",
    tag: "Idea → operating brand in 4–6 weeks",
    blurb:
      "A focused sprint to take you from concept to launch-ready. Identity, site, first growth motions — the rails of a real business.",
    bullets: [
      "Brand identity system",
      "Editorial marketing site",
      "First growth motions wired",
      "Helm operating system",
    ],
    best: "Founders pre-launch or in the first 12 months.",
  },
  {
    num: "02",
    name: "Grow",
    tag: "Ongoing partnership, monthly cadence",
    blurb:
      "We run growth, ops, and creative as an extension of your team. Real strategy, real shipping — not retainer theater.",
    bullets: [
      "Brand evolution + creative",
      "Growth experiments + reporting",
      "Outbound systems",
      "Operations layer (Helm)",
    ],
    best: "Operating businesses ready to compound.",
  },
  {
    num: "03",
    name: "Command",
    tag: "Fractional CMO/COO embed",
    blurb:
      "Senior leadership in the room. We sit in your Slack, your standups, your strategy. A partner, not a vendor.",
    bullets: [
      "Weekly leadership cadence",
      "Strategic positioning + GTM",
      "Hiring + team architecture",
      "Board / investor materials",
    ],
    best: "Founders ready to scale and need a partner in the room.",
  },
];

export default function Tiers() {
  const [active, setActive] = useState(1); // Grow expanded by default

  return (
    <section id="tiers" className={styles.section}>
      <div className={styles.header}>
        <span className={`${styles.eyebrow} eyebrow glide`}>How We Engage</span>
        <h2 className={`${styles.headline} display glide glide-headline`}>
          Three ways to <em>work with us</em>.
        </h2>
        <p className={`${styles.sub} glide`}>
          One studio. Three engagement modes — sized to your stage. All three
          run on Helm, our proprietary operating system.
        </p>
      </div>

      <div className={styles.row}>
        {TIERS.map((tier, i) => {
          const isActive = i === active;
          return (
            <button
              key={tier.num}
              className={`${styles.tier} ${isActive ? styles.tierActive : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <div className={styles.tierTop}>
                <span className={`${styles.num} mono`}>{tier.num}</span>
                <h3 className={styles.tierName}>{tier.name}</h3>
                <p className={styles.tierTag}>{tier.tag}</p>
              </div>

              <div className={styles.tierStage}>
                <p className={styles.tierBlurb}>{tier.blurb}</p>
                <ul className={styles.bullets}>
                  {tier.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className={styles.bestFor}>
                  <span className={`${styles.bestLabel} mono`}>Best for</span>
                  <span className={styles.bestText}>{tier.best}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
