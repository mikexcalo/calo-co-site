import styles from "./Process.module.css";

export default function Process() {
  return (
    <section id="process" className={styles.section}>
      <div className={styles.inner}>
        <span className={`${styles.eyebrow} eyebrow glide`}>How We Work</span>
        <h2 className={`${styles.headline} display glide glide-headline`}>
          Three phases. <em>One trajectory.</em>
        </h2>
        <p className={`${styles.sub} glide`}>
          Every CALO&amp;CO engagement follows the same arc — discovery, build,
          and run. Where it lands depends on what you need next.
        </p>

        <div className={styles.track}>
          {/* Node 01 */}
          <div className={`${styles.node} glide`}>
            <div className={styles.nodeHeader}>
              <span className={`${styles.num} mono`}>01</span>
              <span className={`${styles.duration} mono`}>Week 1–2</span>
            </div>
            <h3 className={styles.nodeTitle}>Discover</h3>
            <p className={styles.nodeBody}>
              Deep dive on your business, market, and ambition. We come back
              with a strategic POV and a scoped path forward.
            </p>
            <ul className={styles.nodeList}>
              <li>Founder + team interviews</li>
              <li>Market &amp; competitive read</li>
              <li>Strategic POV + plan</li>
            </ul>
          </div>

          {/* Connector */}
          <div className={styles.connector} aria-hidden="true" />

          {/* Node 02 */}
          <div className={`${styles.node} glide`}>
            <div className={styles.nodeHeader}>
              <span className={`${styles.num} mono`}>02</span>
              <span className={`${styles.duration} mono`}>Week 3–6</span>
            </div>
            <h3 className={styles.nodeTitle}>Build</h3>
            <p className={styles.nodeBody}>
              We ship. Brand, site, growth motions, operating system —
              everything you need to launch in market.
            </p>
            <ul className={styles.nodeList}>
              <li>Brand identity system</li>
              <li>Editorial marketing site</li>
              <li>First growth motions live</li>
              <li>Helm OS configured</li>
            </ul>
          </div>

          {/* Connector */}
          <div className={styles.connector} aria-hidden="true" />

          {/* Node 03 — Run */}
          <div className={`${styles.node} ${styles.nodeRun} glide`}>
            <div className={styles.nodeHeader}>
              <span className={`${styles.num} mono`}>03</span>
              <span className={`${styles.duration} mono`}>Week 7+</span>
            </div>
            <h3 className={styles.nodeTitle}>Run</h3>
            <p className={styles.nodeBody}>
              You take the keys, or we keep going together. Your call,
              your stage.
            </p>

            <div className={styles.fork}>
              <div className={styles.path}>
                <span className={`${styles.pathLabel} mono`}>Path A</span>
                <p className={styles.pathTitle}>Launch — handoff</p>
                <p className={styles.pathBody}>
                  We hand you the system, walk you through it, and step out.
                  Helm stays yours.
                </p>
              </div>
              <div className={styles.path}>
                <span className={`${styles.pathLabel} mono`}>Path B</span>
                <p className={styles.pathTitle}>Grow / Command — ongoing</p>
                <p className={styles.pathBody}>
                  We stay on as your growth partner. Monthly cadence, real
                  shipping, real partnership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
