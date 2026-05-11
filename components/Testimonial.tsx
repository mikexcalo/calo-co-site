'use client';

import { useEffect, useRef } from 'react';
import styles from './Testimonial.module.css';

const QUOTE = "Mike is a master of his craft and comes highly recommended.";

export default function Testimonial() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const signatureRef = useRef<HTMLDivElement | null>(null);

  const words = QUOTE.split(' ');

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const viewportH = window.innerHeight;
      const scrollable = sectionH - viewportH;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));

      const wordsProgress = Math.min(1, progress / 0.75);
      const sigProgress = Math.max(0, Math.min(1, (progress - 0.75) / 0.20));

      const total = wordRefs.current.length;
      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        const wordStart = i / total;
        const wordEnd = (i + 0.7) / total;
        const local = Math.max(0, Math.min(1, (wordsProgress - wordStart) / Math.max(0.0001, wordEnd - wordStart)));
        const opacity = 0.15 + local * 0.85;
        el.style.opacity = String(opacity);
      });

      if (signatureRef.current) {
        signatureRef.current.style.opacity = String(sigProgress);
        signatureRef.current.style.transform = `translateY(${(1 - sigProgress) * 12}px)`;
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section} section-dark`}>
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <div className={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5L18.2 22 12 17.3 5.8 22l2.4-8.1L2 9.4h7.6z" />
              </svg>
            ))}
          </div>
          <blockquote className={styles.quote}>
            <span className={styles.openMark}>&ldquo;</span>
            {words.map((word, i) => (
              <span
                key={i}
                ref={(el) => { wordRefs.current[i] = el; }}
                className={styles.word}
                style={{ opacity: 0.15 }}
              >
                {word}{i < words.length - 1 ? ' ' : ''}
              </span>
            ))}
            <span className={styles.closeMark}>&rdquo;</span>
          </blockquote>
          <div
            ref={signatureRef}
            className={styles.signature}
            style={{ opacity: 0, transform: 'translateY(12px)' }}
          >
            <div className={styles.signatureName}>JoAnn Dorio</div>
            <p className={styles.signatureRole}>Founder, Hero&rsquo;s Journey Coaching</p>
          </div>
        </div>
      </div>
    </section>
  );
}
