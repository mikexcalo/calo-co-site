import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`${styles.footer} section-dark`}>
      <div className={styles.inner}>
        <div className={styles.wordmark}>CALO<span className="amp">&amp;</span>CO</div>

        <div className={styles.row}>
          <p className={styles.tagline}>
            Your success is <em>our success</em>.
          </p>

          <div className={styles.contact}>
            <div className={styles.colLabel}>Contact</div>
            <a href="mailto:hello@caloandco.com" className={styles.link}>hello@caloandco.com</a>
            <span className={styles.muted}>Portland, Maine</span>
            <a href="https://www.linkedin.com/in/mikexcalo" target="_blank" rel="noopener" className={styles.link}>LinkedIn</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>&copy; 2026 CALO<span className="amp">&amp;</span>CO</span>
        </div>
      </div>
    </footer>
  );
}
