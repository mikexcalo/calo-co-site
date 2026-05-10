import styles from "./Journey.module.css";

export default function Journey() {
  return (
    <section className={`${styles.section} section-dark`}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <h2 className={`${styles.headline} display`}>
            Wherever you are on <em>your journey.</em>
          </h2>
          <div className={styles.actionStack}>
            <p className={styles.subhead}>
              Not sure where to begin? Tell us what you&apos;re thinking &mdash; <em className={styles.subheadEm}>we&apos;ll steer.</em>
            </p>
            <a href="#" className={styles.ctaBtn} data-modal-trigger>
              Book a call <span className={styles.arrow}>&rarr;</span>
            </a>
          </div>
        </div>

        <div className={styles.phases}>
          <div>
            <h3 className={styles.phaseName}><em>Discovery</em> call</h3>
            <p className={styles.phaseBody}>A real conversation, not a pitch. We hear what you&apos;re working on, what&apos;s broken, what&apos;s working, and where you want to take it.</p>
          </div>
          <div>
            <h3 className={styles.phaseName}><em>Plan</em> with a quote</h3>
            <p className={styles.phaseBody}>Within a week, you get a written plan and a fixed quote. What we&apos;ll do, in what order, how long it&apos;ll take, and what it costs.</p>
          </div>
          <div>
            <h3 className={styles.phaseName}><em>Build, operate,</em> sustain, teach</h3>
            <p className={styles.phaseBody}>We do the work, then run it with you, refine what&apos;s working, and teach your team how to keep it going.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
