"use client";
import { useRef } from "react";
import styles from "./WhoWeServe.module.css";

type Pillar = {
  num: string;
  label: string;
  blurb: string;
  image: string;
};

const PILLARS: Pillar[] = [
  {
    num: "01",
    label: "Creators",
    blurb: "Solo founders, artists, and personal brands turning audience into business.",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=900&q=80&auto=format&fit=crop",
  },
  {
    num: "02",
    label: "Retail & CPG",
    blurb: "Independent product companies — beauty, beverage, food, apparel — building real category share.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80&auto=format&fit=crop",
  },
  {
    num: "03",
    label: "Trades",
    blurb: "Skilled-trade operators — construction, flooring, contracting — modernizing how they win and run jobs.",
    image: "https://images.unsplash.com/photo-1581094488379-6b80232763a2?w=900&q=80&auto=format&fit=crop",
  },
  {
    num: "04",
    label: "Hospitality",
    blurb: "Restaurants, hotels, and experience-led brands where service is the product.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&auto=format&fit=crop",
  },
  {
    num: "05",
    label: "Software",
    blurb: "B2B SaaS and AI-native tools that need GTM rigor without enterprise bloat.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=900&q=80&auto=format&fit=crop",
  },
];

export default function WhoWeServe() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(`.${styles.card}`);
    const step = card ? card.offsetWidth + 24 : 400;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section id="who-we-serve" className={styles.section}>
      <div className={styles.header}>
        <span className={`${styles.eyebrow} eyebrow glide`}>Who We Serve</span>
        <h2 className={`${styles.headline} display glide glide-headline`}>
          Five categories. <em>One playbook.</em>
        </h2>
        <div className={styles.controls}>
          <button className={styles.arrowBtn} onClick={() => scroll(-1)} aria-label="Previous">
            ←
          </button>
          <button className={styles.arrowBtn} onClick={() => scroll(1)} aria-label="Next">
            →
          </button>
        </div>
      </div>

      <div ref={trackRef} className={styles.track}>
        {PILLARS.map((p) => (
          <article key={p.num} className={styles.card}>
            <div
              className={styles.photo}
              style={{ backgroundImage: `url(${p.image})` }}
              role="img"
              aria-label={p.label}
            />
            <div className={styles.body}>
              <span className={`${styles.num} mono`}>{p.num}</span>
              <h3 className={styles.label}>{p.label}</h3>
              <p className={styles.blurb}>{p.blurb}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
