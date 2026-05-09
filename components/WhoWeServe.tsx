"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./WhoWeServe.module.css";

type Tile = {
  label: string;
  image: string | null;
};

const TILES: Tile[] = [
  { label: "Trades & Local Services", image: "/images/audiences/trades-local-services.jpg" },
  { label: "Studios & Media", image: "/images/audiences/studios-media.png" },
  { label: "Retail & Accessories", image: null },
  { label: "CPG & Consumables", image: null },
  { label: "Apps & Digital Products", image: null },
  { label: "Creators & Designers", image: "/images/audiences/creators-designers.jpg" },
];

const TILE_WIDTH = 480;
const TILE_GAP = 24;
const STEP = TILE_WIDTH + TILE_GAP;
const COUNT = TILES.length;

export default function WhoWeServe() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [inView, setInView] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0]?.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const advance = useCallback(() => {
    setIndex((prev) => prev + 1);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, 5800);
  }, [advance]);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      advance();
      startTimer();
    }, 5000);
    return () => {
      clearTimeout(timeout);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [inView, advance, startTimer]);

  // Seamless loop: when reaching duplicate set, snap back
  useEffect(() => {
    if (index < COUNT) return;
    const track = trackRef.current;
    if (!track) return;

    const onEnd = () => {
      setAnimate(false);
      setIndex(0);
      // Force reflow then re-enable
      requestAnimationFrame(() => {
        track.offsetWidth; // force reflow
        requestAnimationFrame(() => setAnimate(true));
      });
    };

    track.addEventListener("transitionend", onEnd, { once: true });
    return () => track.removeEventListener("transitionend", onEnd);
  }, [index]);

  const manualStep = (dir: -1 | 1) => {
    setIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return COUNT - 1;
      return next;
    });
    startTimer();
  };

  const offset = -(index * STEP);

  return (
    <section id="who-we-serve" className={styles.section} ref={sectionRef}>
      <div className={styles.header}>
        <h2 className={`${styles.headline} display glide glide-headline`}>
          For every visionary and<br />venture
        </h2>
        <div className={styles.controls}>
          <button className={styles.arrowBtn} onClick={() => manualStep(-1)} aria-label="Previous">
            ←
          </button>
          <button className={styles.arrowBtn} onClick={() => manualStep(1)} aria-label="Next">
            →
          </button>
        </div>
      </div>

      <div className={styles.carousel}>
        <div
          ref={trackRef}
          className={styles.track}
          style={{
            transform: `translateX(${offset}px)`,
            transition: animate ? "transform 800ms ease" : "none",
          }}
        >
          {[...TILES, ...TILES].map((tile, i) => (
            <article key={i} className={tile.image ? styles.card : styles.cardPlaceholder}>
              {tile.image ? (
                <>
                  <div
                    className={styles.photo}
                    style={{ backgroundImage: `url(${tile.image})` }}
                    role="img"
                    aria-label={tile.label}
                  />
                  <div className={styles.scrim} />
                  <h3 className={styles.label}>{tile.label}</h3>
                </>
              ) : (
                <div className={styles.placeholderInner}>
                  <h3 className={styles.placeholderLabel}>{tile.label}</h3>
                  <span className={styles.placeholderCaption}>— Coming soon</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
