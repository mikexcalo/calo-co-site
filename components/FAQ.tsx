"use client";
import { useState } from "react";
import styles from "./FAQ.module.css";

const FAQS = [
  {
    q: "What does CALO&CO do?",
    a: "We\u2019re a growth partner for independent brands and businesses. Brand and design, marketing and sales, websites and systems \u2014 the strategy and the execution, scoped to what your business actually needs.",
  },
  {
    q: "Who do you work with?",
    a: "Independent operators with the instinct to build \u2014 founders, creators, trades, studios, retail, and digital products. People running real businesses who want to look as serious as they actually are.",
  },
  {
    q: "How much does it cost?",
    a: "Every engagement is scoped to the business. Some clients work with us on a single project, others partner with us over time. We\u2019ll talk through what you need and what it costs once we understand what you\u2019re building.",
  },
  {
    q: "How long does it take?",
    a: "It depends on scope. Some projects run a few weeks, others a few months. We\u2019ll give you a clear timeline before anything starts \u2014 no open-ended engagements.",
  },
  {
    q: "How do we start?",
    a: "A short intro call. If it\u2019s a fit, we move into a discovery phase, then come back with a recommended path. No pressure, no obligation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpenIndex((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section
      id="fqs"
      className={styles.section}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className={styles.inner}>
        <span className={`${styles.eyebrow} eyebrow glide`}>FAQ</span>
        <h2 className={`${styles.headline} display glide glide-headline`}>
          Frequently asked <em>questions</em>
        </h2>

        <ul className={styles.list}>
          {FAQS.map((item, i) => {
            const isOpen = openIndex.has(i);
            return (
              <li
                key={i}
                className={styles.item}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  className={styles.qButton}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => toggle(i)}
                >
                  <span className={styles.qText} itemProp="name">
                    {item.q}
                  </span>
                  <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`} aria-hidden>
                    +
                  </span>
                </button>
                <div
                  id={`faq-a-${i}`}
                  className={`${styles.answer} ${isOpen ? styles.answerOpen : ""}`}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div className={styles.answerInner} itemProp="text">
                    <p>{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
