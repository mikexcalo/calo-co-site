import styles from './Testimonial.module.css';

export default function Testimonial() {
  return (
    <section className={`${styles.section} section-dark`}>
      <div className={styles.sticky}>
        <div className={styles.content}>
          <div className={styles.stars}>
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
          <blockquote className={styles.quote}>
            <span className={styles.word} style={{ "--start": 0.050 } as React.CSSProperties}>{"\u201C"}</span>
            <span className={styles.word} style={{ "--start": 0.075 } as React.CSSProperties}>Mike </span>
            <span className={styles.word} style={{ "--start": 0.100 } as React.CSSProperties}>is </span>
            <span className={styles.word} style={{ "--start": 0.125 } as React.CSSProperties}>a </span>
            <span className={styles.word} style={{ "--start": 0.150 } as React.CSSProperties}>master </span>
            <span className={styles.word} style={{ "--start": 0.175 } as React.CSSProperties}>of </span>
            <span className={styles.word} style={{ "--start": 0.200 } as React.CSSProperties}>his </span>
            <span className={styles.word} style={{ "--start": 0.225 } as React.CSSProperties}>craft </span>
            <span className={styles.word} style={{ "--start": 0.250 } as React.CSSProperties}>and </span>
            <span className={styles.word} style={{ "--start": 0.275 } as React.CSSProperties}>comes </span>
            <span className={styles.word} style={{ "--start": 0.300 } as React.CSSProperties}>highly </span>
            <span className={styles.word} style={{ "--start": 0.325 } as React.CSSProperties}>recommended.</span>
            <span className={styles.word} style={{ "--start": 0.350 } as React.CSSProperties}>{"\u201D"}</span>
          </blockquote>
          <div className={styles.signature}>
            <div className={styles.signatureName}>JoAnn Dorio</div>
            <p className={styles.signatureRole}>Founder, Hero&apos;s Journey Coaching</p>
          </div>
        </div>
      </div>
    </section>
  );
}
