'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Testimonial.module.css';

const serif = 'var(--font-lora), Georgia, serif';
const mono = 'var(--font-ibm-plex-mono), monospace';

export default function Testimonial() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.25 - rect.height;
      const p = (start - rect.top) / (start - end);
      setProgress(Math.max(0, Math.min(1, p)));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const text = "Mike is a master of his craft and comes highly recommended.";
  const words = text.split(' ');
  const quoteEnd = 0.85;
  const wordsRevealed = Math.ceil(Math.min(progress / quoteEnd, 1) * words.length);
  const signatureOpacity = Math.max(0, Math.min(1, (progress - 0.9) * 10));

  return (
    <section className={`${styles.section} section-dark`}>
      <div ref={ref} className={styles.inner}>

        {/* Stars */}
        <div className={styles.stars}>
          {[0,1,2,3,4].map(i => (
            <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5L18.2 22 12 17.3 5.8 22l2.4-8.1L2 9.4h7.6z"/>
            </svg>
          ))}
        </div>

        {/* Quote */}
        <blockquote className={styles.quote} style={{ fontFamily: serif }}>
          <span>&ldquo;</span>
          {words.map((word, i) => (
            <span
              key={i}
              className={styles.word}
              style={{ opacity: i < wordsRevealed ? 1 : 0.15 }}
            >
              {word}{i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
          <span>&rdquo;</span>
        </blockquote>

        {/* Signature */}
        <div className={styles.signature} style={{ opacity: signatureOpacity }}>
          <div className={styles.signatureName} style={{ fontFamily: 'Allura, cursive' }}>
            JoAnn Dorio
          </div>
          <p className={styles.signatureRole} style={{ fontFamily: mono }}>
            Founder, Hero&apos;s Journey Coaching
          </p>
        </div>

      </div>
    </section>
  );
}
