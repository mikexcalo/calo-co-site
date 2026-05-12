'use client';

import { useEffect, useRef, useState } from 'react';
import styles from "./FounderMemo.module.css";

export default function FounderMemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${inView ? styles.inView : ''}`}
    >
      <div className={styles.split}>
        <div
          className={styles.portrait}
          style={{ backgroundImage: "url(/images/founder/mike-portrait.jpg)" }}
          role="img"
          aria-label="Mike Calo, Founder of CALO&CO"
        />
        <div className={styles.copyCol}>
          <div className={styles.copyInner}>
            <span className={styles.eyebrow}>A note from the founder</span>
            <blockquote className={styles.quote}>
              Every business deserves to look as serious as it actually is. <em>That&apos;s the whole job.</em>
            </blockquote>
            <div className={styles.signatureBlock}>
              <div className={styles.signature} aria-hidden="true">Mike</div>
              <p className={styles.signatureLabel}>
                Mike Calo
                <br />
                <span className={styles.signatureRole}>
                  Founder, CALO<span className="amp">&amp;</span>CO
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
