import styles from './WhatWeDo.module.css';

export default function WhatWeDo() {
  return (
    <section className={`${styles.section} section-dark`}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>What We Do</span>
        <h2 className={styles.headline}>
          [Placeholder headline — everything we offer and everything
          they get, said in one confident line.]
        </h2>
        <p className={styles.sub}>
          [Placeholder supporting line — a sentence on the breadth of
          services and the outcome clients walk away with.]
        </p>
      </div>
    </section>
  );
}
