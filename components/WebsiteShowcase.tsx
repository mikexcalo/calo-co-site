import styles from "./WebsiteShowcase.module.css";

export default function WebsiteShowcase() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.frame}>
          <div className={styles.laptop}>
            <div className={styles.screen}>
              <div className={styles.screenInner}>
                <img
                  className={styles.shot}
                  src="/images/work/showcase.jpg"
                  alt="Client website built by CALO&CO"
                />
              </div>
            </div>
            <div className={styles.base} />
          </div>
          <figure className={styles.quoteCard}>
            <span className={styles.eyebrow}>Selected work</span>
            <blockquote className={styles.quote}>
              They kept the <em>weird</em> that makes it ours.
            </blockquote>
            <figcaption>
              <div className={styles.sig}>Stevie Treviño</div>
              <div className={styles.role}>Founder, Stevie&apos;s Poem Store</div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
