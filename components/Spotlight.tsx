"use client";
import { useState } from "react";
import styles from "./Spotlight.module.css";

type Slide = {
  quote: React.ReactNode;
  name: string;
  role: string;
  company: string;
  portrait: string;
};

const SLIDES: Slide[] = [
  {
    quote:
      <>CALO<span className="amp">&</span>CO didn&apos;t just rebrand my business — they handed me an operating system. Six months in and I&apos;m still finding leverage in what they built.</>,
    name: "Stevie Treviño",
    role: "Founder",
    company: "Stevie's Poem Store",
    portrait:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop",
  },
  {
    quote:
      "I came in needing a website. I left with a brand, a system, and a clear runway. Mike runs his agency the way he tells me to run my company.",
    name: "Leandro Gazolla",
    role: "Owner",
    company: "LG Flooring",
    portrait:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop",
  },
  {
    quote:
      <>The difference is they actually finish things. Most agencies hand you a deck. CALO<span className="amp">&</span>CO hands you a business that runs.</>,
    name: "Christina Lau",
    role: "Co-Founder",
    company: "Mammoth Construction",
    portrait:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80&auto=format&fit=crop",
  },
];

export default function Spotlight() {
  const [active, setActive] = useState(0);

  const go = (dir: -1 | 1) => {
    setActive((prev) => {
      const next = prev + dir;
      if (next < 0) return SLIDES.length - 1;
      if (next >= SLIDES.length) return 0;
      return next;
    });
  };

  const slide = SLIDES[active];

  return (
    <section id="spotlight" className={`${styles.section} section-dark`}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={`${styles.eyebrow} eyebrow glide`}>Spotlight</span>
          <div className={styles.controls}>
            <span className={`${styles.counter} mono`}>
              {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
            </span>
            <div className={styles.arrows}>
              <button
                className={styles.arrowBtn}
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <button
                className={styles.arrowBtn}
                onClick={() => go(1)}
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div key={active} className={styles.stage}>
          <div className={styles.portraitWrap}>
            <div
              className={styles.portrait}
              style={{ backgroundImage: `url(${slide.portrait})` }}
              role="img"
              aria-label={slide.name}
            />
          </div>
          <div className={styles.body}>
            <blockquote className={`${styles.quote} display`}>
              <span className={styles.openMark}>&ldquo;</span>
              {slide.quote}
            </blockquote>
            <div className={styles.attrib}>
              <p className={styles.name}>{slide.name}</p>
              <p className={styles.role}>
                {slide.role}, <span className={styles.company}>{slide.company}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
