'use client';

import styles from './Testimonial.module.css';

const QUOTE = "Mike is a master of his craft and comes highly recommended.";

export default function Testimonial() {
  const words = ['\u201C', ...QUOTE.split(' '), '\u201D'];

  return (
    <section className={`${styles.section} section-dark`}>
      <div className={styles.sticky}>
        <div className={`${styles.content} emerge`}>
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
                className={styles.word}
              >
                {word}{i < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </blockquote>
          <div className={`${styles.signature} emerge`}>
            <div className={styles.signatureName}>JoAnn Dorio</div>
            <p className={styles.signatureRole}>Founder, Hero&rsquo;s Journey Coaching</p>
          </div>
        </div>
      </div>
    </section>
  );
}
