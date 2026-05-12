import styles from "./FounderMemo.module.css";

export default function FounderMemo() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>A note from the founder</span>
        <blockquote className={styles.quote}>
          Every business deserves to look as serious as it actually is. <em>That&apos;s the whole job.</em>
        </blockquote>
        <div className={styles.signatureBlock}>
          <div className={styles.signature} aria-hidden="true">Mike</div>
          <p className={styles.signatureLabel}>
            Mike Calo
            <br />
            <span className={styles.signatureRole}>
              Founder, CALO<span className="amp">&amp;</span>CO
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
