"use client";
import { useEffect, useRef, useState } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrolling, setScrolling] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Start marquee 5s after section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) return;

    let timeout: ReturnType<typeof setTimeout> | null = null;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !scrolling) {
            timeout = setTimeout(() => setScrolling(true), 5000);
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      if (timeout) clearTimeout(timeout);
    };
  }, [scrolling]);

  const scrollByTile = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    // Pause auto-scroll
    setScrolling(false);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);

    // Get card width + gap
    const card = track.querySelector<HTMLElement>(`.${styles.card}`);
    const step = card ? card.offsetWidth + 24 : 444;
    const current = parseFloat(getComputedStyle(track).transform.split(",")[4] || "0");

    // Apply manual shift
    track.style.animation = "none";
    track.style.transform = `translateX(${current + step * dir * -1}px)`;
    track.style.transition = "transform 0.5s ease";

    // Resume auto-scroll after 3s
    resumeTimer.current = setTimeout(() => {
      track.style.transition = "";
      track.style.transform = "";
      track.style.animation = "";
      setScrolling(true);
    }, 3000);
  };

  return (
    <section id="who-we-serve" className={styles.section} ref={sectionRef}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={`${styles.eyebrow} eyebrow glide`}>Who We Serve</span>
          <h2 className={`${styles.headline} display glide glide-headline`}>
            For every visionary and venture
          </h2>
        </div>
        <div className={styles.controls}>
          <button className={styles.arrowBtn} onClick={() => scrollByTile(-1)} aria-label="Previous">
            ←
          </button>
          <button className={styles.arrowBtn} onClick={() => scrollByTile(1)} aria-label="Next">
            →
          </button>
        </div>
      </div>

      <div className={styles.carousel}>
        <div
          ref={trackRef}
          className={`${styles.track} ${scrolling ? styles.trackScrolling : ""}`}
        >
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
