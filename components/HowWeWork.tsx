import styles from "./HowWeWork.module.css";

export default function HowWeWork() {
  return (
    <section id="process" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={`${styles.title} display`}>
            How <em>we work</em>
          </h2>
        </div>

        <div className={styles.timeline}>
          <div className={styles.railBase} />

          <div className={styles.step}>
            <span className={styles.node} />
            <div className={styles.icon}>
              <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 11 C5 8.5 7 7 9 7 L20 7 C22 7 24 8.5 24 11 L24 18 C24 20 22 21.5 20 21.5 L13 21.5 L9 25 L9 21.5 C7 21.5 5 20 5 18 Z" />
                <path d="M14 14 C14 12 16 11 18 11 L29 11 C31 11 33 12 33 14 L33 21 C33 23 31 24 29 24 L24 24" />
              </svg>
            </div>
            <div className={styles.num}>Step 01</div>
            <h3 className={`${styles.stepTitle} display`}><em>Discovery</em></h3>
            <p className={styles.stepBody}>A real conversation, not a pitch. We learn what you&apos;re building, what&apos;s working, and what&apos;s in the way.</p>
          </div>

          <div className={styles.step}>
            <span className={styles.node} />
            <div className={styles.icon}>
              <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 5 L23 5 L29 11 L29 31 L9 31 Z" />
                <path d="M23 5 L23 11 L29 11" />
                <line x1="13" y1="17" x2="25" y2="17" />
                <line x1="13" y1="21" x2="25" y2="21" />
                <line x1="13" y1="25" x2="20" y2="25" />
              </svg>
            </div>
            <div className={styles.num}>Step 02</div>
            <h3 className={`${styles.stepTitle} display`}><em>Charting</em></h3>
            <p className={styles.stepBody}>Within a week, you get a written plan and a fixed quote. What we&apos;ll do, in what order, how long, how much.</p>
          </div>

          <div className={styles.step}>
            <span className={styles.node} />
            <div className={styles.icon}>
              <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="18" cy="18" r="11" />
                <circle cx="18" cy="7" r="2" fill="currentColor" stroke="none" />
                <circle cx="29" cy="18" r="2" />
                <circle cx="18" cy="29" r="2" />
                <circle cx="7" cy="18" r="2" />
              </svg>
            </div>
            <div className={styles.num}>Step 03</div>
            <h3 className={`${styles.stepTitle} display`}><em>Voyage</em></h3>
            <p className={styles.stepBody}>We build it for you, with you, or teach you how. Whichever fits where you are.</p>
          </div>

          <div className={styles.step}>
            <span className={styles.node} />
            <div className={styles.icon}>
              <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M30 18 C30 24.6 24.6 30 18 30 C13.5 30 9.6 27.6 7.5 24" />
                <path d="M6 18 C6 11.4 11.4 6 18 6 C22.5 6 26.4 8.4 28.5 12" />
                <polyline points="28.5,6 28.5,12 22.5,12" />
                <polyline points="7.5,30 7.5,24 13.5,24" />
              </svg>
            </div>
            <div className={styles.num}>Step 04</div>
            <h3 className={`${styles.stepTitle} display`}><em>Course correction</em></h3>
            <p className={styles.stepBody}>Launch isn&apos;t the end. We measure what&apos;s working, fix what isn&apos;t, and keep adjusting as you grow.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
