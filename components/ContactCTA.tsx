"use client";
import { useState } from "react";
import styles from "./ContactCTA.module.css";

const FAQS = [
  {
    q: "What does CALO&CO do?",
    a: "We're a marketing and growth partner for independent brands. Strategy, brand identity, websites, content, paid media, and the operational scaffolding around all of it — but only the parts your business actually needs.",
  },
  {
    q: "Who do you work with?",
    a: "Independent operators with the instinct to build — across creators, trades, studios and media, retail, CPG, and digital products. Founders running real businesses who want to look as serious as they actually are.",
  },
  {
    q: "How much does it cost?",
    a: "Every engagement is scoped to the business. Some clients work with us on a single project, others retain us monthly. Pricing reflects scope, not a menu. We'll tell you what something costs once we understand what you're trying to do.",
  },
  {
    q: "How long is a typical engagement?",
    a: "Project work runs from a few weeks to a few months. Retainers usually start at three months — long enough for the work to compound and the strategy to show up in numbers.",
  },
  {
    q: "How do we start?",
    a: "A short intro call. If both sides want to keep going, a paid one-to-two-week discovery where we audit what's there and come back with a recommended path. From there: a project, a retainer, or part friends.",
  },
];

export default function ContactCTA() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <>
      {/* CTA section — dark */}
      <section className={`${styles.ctaSection} section-dark`}>
        <div className={styles.inner}>
          <span className={`${styles.eyebrow} eyebrow glide`}>
            Ready when you are
          </span>
          <h2 className={`${styles.headline} display glide glide-headline`}>
            Let&apos;s build something <em>worth remembering</em>.
          </h2>
          <p className={`${styles.sub} glide`}>
            Tell us what you&apos;re building. We&apos;ll come back within 48 hours
            with a real conversation — no decks, no sales theater.
          </p>
          <div className={`${styles.ctaWrap} glide`}>
            <button
              type="button"
              className={styles.cta}
              data-modal-trigger
            >
              Climb Aboard <span className={styles.arrow}>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ section — ivory */}
      <section className={styles.faqSection}>
        <div className={styles.faqBlock}>
          <h3 className={`${styles.faqHeadline} display`}>Frequently asked questions</h3>
          <ul className={styles.faqList}>
            {FAQS.map((faq, i) => {
              const isOpen = openIdx === i;
              return (
                <li key={i} className={styles.faqItem}>
                  <button
                    className={styles.faqQ}
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    <span className={styles.faqQText}>{faq.q}</span>
                    <span className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ""}`}>+</span>
                  </button>
                  <div className={`${styles.faqA} ${isOpen ? styles.faqAOpen : ""}`}>
                    <div className={styles.faqAInner}>
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
