import styles from "./WhoWeAre.module.css";

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className={styles.section}>
      <div className={styles.inner}>
        <span className={`${styles.eyebrow} eyebrow glide`}>
          Who We Are
        </span>
        <h2 className={`${styles.headline} display glide glide-headline`}>
          We are <em>navigators</em>, builders, and signal-makers
          for ambitious independents.
        </h2>
        <p className={`${styles.lede} glide`}>
          CALO&amp;CO is a small studio with a long horizon. We partner with
          founders building businesses worth remembering — not the loudest in
          the room, but the ones with the strongest signal.
        </p>
      </div>
    </section>
  );
}
