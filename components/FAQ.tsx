"use client";
import { useState } from "react";
import styles from "./FAQ.module.css";

const FAQS = [
  {
    q: "What does CALO&CO actually do?",
    a: "We\u2019re a small growth and creative studio. We help local service businesses with three things \u2014 how they look, how they get customers, and the tools that keep it all running \u2014 with one team you actually get to know.",
  },
  {
    q: "Do I have to buy all three services?",
    a: "Not at all. We don\u2019t sell fixed packages. We start with your goals and your budget, then build the right mix \u2014 that might be one discipline or all three. Plenty of clients start with just a brand or just a website.",
  },
  {
    q: "How much does this cost?",
    a: "It depends on what you need, so we scope every project to the outcome you\u2019re after. Most start in the low five figures, and you\u2019ll always get a clear, fixed price before any work begins.",
  },
  {
    q: "I'm not sure what I even need. Is that okay?",
    a: "Completely. Most people who call us know something\u2019s off but can\u2019t name it. That first conversation is us helping you figure out what would actually move the needle \u2014 no pressure, no cost.",
  },
  {
    q: "Do I own everything at the end?",
    a: "Always. Every file, account, and tool is yours to keep. We build things so your own team can run them \u2014 we never hold your business hostage to keep you as a client.",
  },
];

export default function FAQ() {
  const [masterOpen, setMasterOpen] = useState(false);
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
        <div className={`${styles.master} ${masterOpen ? styles.masterOpen : ""}`}>
          <button
            className={styles.masterRow}
            aria-expanded={masterOpen}
            aria-controls="faq-body"
            onClick={() => setMasterOpen((v) => !v)}
          >
            <span className={styles.masterTitle}>
              Still have questions? We have <em>answers</em>.
            </span>
            <span className={styles.masterSign} aria-hidden />
          </button>

          <div id="faq-body" className={styles.body}>
            <div className={styles.bodyClip}>
              <ul className={styles.grid}>
                {FAQS.map((item, i) => {
                  const isOpen = openIndex.has(i);
                  return (
                    <li
                      key={i}
                      className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
                      itemScope
                      itemProp="mainEntity"
                      itemType="https://schema.org/Question"
                    >
                      <button
                        className={styles.row}
                        aria-expanded={isOpen}
                        aria-controls={`faq-a-${i}`}
                        onClick={() => toggle(i)}
                      >
                        <span className={styles.qText} itemProp="name">
                          {item.q}
                        </span>
                        <span className={styles.sign} aria-hidden />
                      </button>
                      <div
                        id={`faq-a-${i}`}
                        className={styles.answer}
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
          </div>
        </div>
      </div>
    </section>
  );
}
