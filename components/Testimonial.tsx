'use client';

import { useEffect, useRef } from 'react';
import styles from './Testimonial.module.css';

const QUOTE = "Mike is a master of his craft and comes highly recommended.";

export default function Testimonial() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const signatureRef = useRef<HTMLDivElement | null>(null);

  const words = ['\u201C', ...QUOTE.split(' '), '\u201D'];

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
      const wordsProgress = Math.max(0, Math.min(1, (progress - 0.18) / 0.60));
      const sigProgress = Math.max(0, Math.min(1, (progress - 0.78) / 0.20));

      if (contentRef.current) {
        const slideY = (1 - slideProgress) * 60;
        const opacity = slideProgress;
        contentRef.current.style.transform = `translateY(${slideY}px)`;
        contentRef.current.style.opacity = String(0.3 + opacity * 0.7);
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
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.sticky}>
        <div ref={contentRef} className={styles.content} style={{ opacity: 0, transform: 'translateY(60px)' }}>
          <div className={`${styles.stars} emerge`}>
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={styles.starWrap}
                style={{ "--i": i } as React.CSSProperties}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.4c.32 0 .61.19.74.49l2.27 5.36 5.82.52a.8.8 0 0 1 .46 1.4l-4.42 3.85 1.34 5.71a.8.8 0 0 1-1.19.87L12 17.7l-4.99 2.9a.8.8 0 0 1-1.19-.87l1.34-5.71L2.74 10.17a.8.8 0 0 1 .46-1.4l5.82-.52L11.26 2.9c.13-.3.42-.49.74-.49z"/>
                </svg>
              </span>
            ))}
          </div>
          <blockquote className={`${styles.quote} emerge`}>
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
