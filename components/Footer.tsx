import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`${styles.footer} section-dark`}>
      <div className={styles.inner}>
        <div className={`${styles.col} ${styles.colBrand}`}>
          <div className={styles.word}>CALO&amp;CO</div>
          <p className={styles.tagline}>
            Your success is <em>our success</em>.
          </p>
        </div>
        <div className={styles.col}>
          <div className={styles.colLabel}>Explore</div>
          <ul className={styles.links}>
            <li><a href="#process">Process</a></li>
            <li><a href="#">Outcomes</a></li>
            <li><a href="#">Engagements</a></li>
            <li><a href="#" data-modal-trigger>Get in Touch</a></li>
          </ul>
        </div>
        <div className={styles.col}>
          <div className={styles.colLabel}>Contact</div>
          <ul className={styles.links}>
            <li><a href="mailto:hello@caloandco.com">hello@caloandco.com</a></li>
            <li><span className={styles.muted}>Portland, Maine</span></li>
            <li>
              <a href="https://www.linkedin.com/in/mikexcalo" target="_blank" rel="noopener">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.copyright}>© 2026 CALO&amp;CO</div>
        <div className={styles.coords}>EST. PORTLAND, MAINE · 43°N 70°W</div>
      </div>
    </footer>
  );
}
