"use client";
import { useState } from "react";
import styles from "./FAQ.module.css";

type FAQItem = {
  q: string;
  a: React.ReactNode;
};

const FAQS: FAQItem[] = [
  {
    q: "Who does CALO&CO work with?",
    a: (
      <>
        <p>
          We work with founders and operators of independent businesses across
          five categories: creators, retail &amp; CPG, trades, hospitality, and
          software.
        </p>
        <p>
          The common thread isn&apos;t industry — it&apos;s ambition. We partner
          with people building businesses worth remembering.
        </p>
      </>
    ),
  },
  {
    q: "How is CALO&CO different from a typical agency?",
    a: (
      <>
        <p>
          Most agencies sell you hours. We partner on outcomes. Most agencies
          hand you deliverables. We hand you an operating system.
        </p>
        <p>
          Every CALO&amp;CO engagement is built on Helm — our proprietary platform
          for brand, growth, and operations. You don&apos;t just get the work;
          you get the rails it runs on, long after we&apos;re done.
        </p>
      </>
    ),
  },
  {
    q: "What does an engagement actually look like?",
    a: (
      <>
        <p>
          We work in three modes:
        </p>
        <p>
          <strong>Launch</strong> — a focused 4–6 week sprint to take you from
          idea to operating brand. Identity, site, first growth motions.
        </p>
        <p>
          <strong>Grow</strong> — an ongoing partnership where we run growth,
          ops, and creative as an extension of your team.
        </p>
        <p>
          <strong>Command</strong> — fractional CMO/COO embed for founders ready
          to scale and need a partner in the room.
        </p>
      </>
    ),
  },
  {
    q: "How much does it cost?",
    a: (
      <>
        <p>
          Pricing is tailored to scope. Launch engagements typically start in
          the mid-five-figures. Grow and Command are monthly retainers sized to
          your stage.
        </p>
        <p>
          The fastest way to get a real number is to{" "}
          <a href="#" data-modal-trigger className={styles.inlineLink}>
            tell us about your business
          </a>
          {" "}— we&apos;ll come back with a scoped proposal within a week.
        </p>
      </>
    ),
  },
  {
    q: "Do I have to use Helm?",
    a: (
      <>
        <p>
          Helm is how we work — it&apos;s where your brand, contacts, projects,
          and assets live. Engagements include access by default.
        </p>
        <p>
          You can keep using Helm after we wrap, or export everything and walk
          away. Your data, your call, always.
        </p>
      </>
    ),
  },
  {
    q: "How quickly can we start?",
    a: (
      <>
        <p>
          Launch engagements typically kick off 1–2 weeks after a signed
          agreement. Grow and Command depend on capacity — we deliberately keep
          our roster small.
        </p>
        <p>
          The right next step is a conversation. We&apos;ll tell you within one
          call whether we&apos;re the right fit and when we could realistically
          start.
        </p>
      </>
    ),
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
          Frequently asked <em>questions</em>.
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
                    {item.a}
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
