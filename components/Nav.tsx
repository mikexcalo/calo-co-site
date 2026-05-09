import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.header}>
      <div className={styles.wordmark}>CALO&amp;CO</div>
      <button className={styles.navCta} data-modal-trigger>
        Get in Touch
      </button>
    </header>
  );
}
