'use client';

import { useEffect, useRef } from 'react';
import styles from './Testimonial.module.css';

const QUOTE = "Mike is a master of his craft and comes highly recommended.";

export default function Testimonial() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const starsRef = useRef<HTMLDivElement | null>(null);
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

      const slideProgress = Math.min(1, progress / 0.18);
      const starsProgress = Math.min(1, progress / 0.15);
      const wordsProgress = Math.max(0, Math.min(1, (progress - 0.18) / 0.60));
      const sigProgress = Math.max(0, Math.min(1, (progress - 0.78) / 0.20));

      if (contentRef.current) {
        const slideY = (1 - slideProgress) * 60;
        const opacity = slideProgress;
        contentRef.current.style.transform = `translateY(${slideY}px)`;
        contentRef.current.style.opacity = String(0.3 + opacity * 0.7);
      }

      if (starsRef.current) {
        const scale = 0.85 + starsProgress * 0.15;
        starsRef.current.style.opacity = String(starsProgress);
        starsRef.current.style.transform = `scale(${scale})`;
      }

      const total = wordRefs.current.length;
      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        const wordStart = i / total;
        const wordEnd = (i + 0.7) / total;
        const local = Math.max(0, Math.min(1, (wordsProgress - wordStart) / Math.max(0.0001, wordEnd - wordStart)));
        el.style.opacity = String(0.15 + local * 0.85);
      });

      if (signatureRef.current) {
        signatureRef.current.style.opacity = String(sigProgress);
        signatureRef.current.style.transform = `translateY(${(1 - sigProgress) * 16}px)`;
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
        <div ref={contentRef} className={styles.content} style={{ opacity: 0, transform: 'translateY(60px)' }}>
          <div ref={starsRef} className={styles.stars} style={{ opacity: 0, transform: 'scale(0.85)' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5L18.2 22 12 17.3 5.8 22l2.4-8.1L2 9.4h7.6z" />
              </svg>
            ))}
          </div>
          <blockquote className={styles.quote}>
            <span className={styles.mark}>&ldquo;</span>
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
            <span className={styles.mark}>&rdquo;</span>
          </blockquote>
          <div
            ref={signatureRef}
            className={styles.signature}
            style={{ opacity: 0, transform: 'translateY(16px)' }}
          >
            <div className={styles.signatureName}>JoAnn Dorio</div>
            <p className={styles.signatureRole}>Founder, Hero&rsquo;s Journey Coaching</p>
          </div>
        </div>
      </div>
    </section>
  );
}
