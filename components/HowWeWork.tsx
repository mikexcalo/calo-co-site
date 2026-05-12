"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HowWeWork.module.css";

type Step = {
  tag: string;
  title: string;
  body: string;
  detail: string;
  icon: React.ReactNode;
};

const STEPS: Step[] = [
  {
    tag: "Step 01",
    title: "Discovery call",
    body: "A real conversation, not a pitch. We hear what you're working on, what's broken, what's working, and where you want to take it.",
    detail: "About 30 minutes. Always free.",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 11 C5 8.5 7 7 9 7 L20 7 C22 7 24 8.5 24 11 L24 18 C24 20 22 21.5 20 21.5 L13 21.5 L9 25 L9 21.5 C7 21.5 5 20 5 18 Z" />
        <path d="M14 14 C14 12 16 11 18 11 L29 11 C31 11 33 12 33 14 L33 21 C33 23 31 24 29 24 L24 24" />
      </svg>
    ),
  },
  {
    tag: "Step 02",
    title: "Plan with a quote",
    body: "Within a week, you get a written plan and a fixed quote. What we'll do, in what order, how long it'll take, and what it costs.",
    detail: "Fixed price. No surprises.",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 5 L23 5 L29 11 L29 31 L9 31 Z" />
        <path d="M23 5 L23 11 L29 11" />
        <line x1="13" y1="17" x2="25" y2="17" />
        <line x1="13" y1="21" x2="25" y2="21" />
        <line x1="13" y1="25" x2="20" y2="25" />
      </svg>
    ),
  },
  {
    tag: "Step 03",
    title: "Build, operate, sustain, teach",
    body: "We do the work, then run it with you, refine what's working, and teach your team how to keep it going.",
    detail: "Project, retainer, or part-friends.",
    icon: (
      <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="18" cy="18" r="11" />
        <circle cx="18" cy="7" r="2" fill="currentColor" stroke="none" />
        <circle cx="29" cy="18" r="2" />
        <circle cx="18" cy="29" r="2" />
        <circle cx="7" cy="18" r="2" />
      </svg>
    ),
  },
];

export default function HowWeWork() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.5) {
            const idx = Number((e.target as HTMLElement).dataset.idx || "0");
            setActive(idx);
          }
        });
      },
      { threshold: [0.5] }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" className={styles.section}>
      <div className={styles.inner}>
        <aside className={styles.left}>
          <h2 className={`${styles.headline} display`}>
            How <em>we work.</em>
          </h2>
          <ol className={styles.stepper}>
            {STEPS.map((s, i) => (
              <li
                key={s.tag}
                className={`${styles.stepperItem} ${i === active ? styles.stepperItemActive : ""}`}
              >
                <span className={styles.stepperDot} aria-hidden="true" />
                <span className={styles.stepperNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.stepperLabel}>{s.title}</span>
              </li>
            ))}
          </ol>
        </aside>

        <div className={styles.right}>
          {STEPS.map((s, i) => (
            <div
              key={s.tag}
              data-idx={i}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className={`${styles.step} ${i === active ? styles.stepActive : ""}`}
            >
              <div className={styles.stepIcon}>{s.icon}</div>
              <span className={styles.stepTag}>{s.tag}</span>
              <h3 className={`${styles.stepTitle} display`}>{s.title}</h3>
              <p className={styles.stepBody}>{s.body}</p>
              <div className={styles.stepDetail}>
                <span className={styles.stepDetailDot} aria-hidden="true" />
                <span>{s.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
