import styles from "./WhoWeServe.module.css";

type Tile = {
  label: string;
  image: string;
};

const TILES: Tile[] = [
  {
    label: "Creators & Designers",
    image: "/images/audiences/creators-designers.jpg",
  },
  {
    label: "Trades & Local Services",
    image: "/images/audiences/trades-local-services.jpg",
  },
  {
    label: "Studios & Media",
    image: "/images/audiences/studios-media.png",
  },
];

export default function WhoWeServe() {
  return (
    <section id="who-we-serve" className={styles.section}>
      <div className={styles.header}>
        <span className={`${styles.eyebrow} eyebrow glide`}>Who We Serve</span>
        <h2 className={`${styles.headline} display glide glide-headline`}>
          For every visionary and venture
        </h2>
      </div>

      <div className={styles.carousel}>
        <div className={styles.track}>
          {[...TILES, ...TILES].map((tile, i) => (
            <article key={i} className={styles.card}>
              <div
                className={styles.photo}
                style={{ backgroundImage: `url(${tile.image})` }}
                role="img"
                aria-label={tile.label}
              />
              <div className={styles.scrim} />
              <h3 className={styles.label}>{tile.label}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
