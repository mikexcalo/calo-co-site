"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./WhoWeServe.module.css";

type Tile = {
  label: string;
  image: string | null;
  imagePosition?: string;
  description: string;
  pills: string[];
};

const TILES: Tile[] = [
  {
    label: "Creators & Designers",
    image: "/images/audiences/creators-designers.jpg",
    imagePosition: "50% 55%",
    description: "Solo founders, artists, and personal brands turning audience into business worth remembering.",
    pills: ["Artist", "Designer", "Writer", "Maker", "Freelance"],
  },
  {
    label: "Trades & Local Services",
    image: "/images/audiences/trades-local-services.jpg",
    imagePosition: "50% 50%",
    description: "Skilled-trade operators — construction, flooring, contracting — modernizing how they win and run jobs.",
    pills: ["Construction", "Flooring", "Landscaping", "Plumbing", "Electrical"],
  },
  {
    label: "Studios & Media",
    image: "/images/audiences/studios-media.png",
    imagePosition: "50% 50%",
    description: "Photographers, videographers, podcasters, and content studios turning craft into scalable business.",
    pills: ["Photography", "Video", "Podcast", "Content", "Production"],
  },
  {
    label: "Retail & Accessories",
    image: null,
    description: "Independent product brands navigating brick-and-mortar, e-commerce, and the increasingly blurred line between.",
    pills: ["Apparel", "Jewelry", "Home", "Accessories", "Boutique"],
  },
  {
    label: "CPG & Consumables",
    image: null,
    description: "Food, beverage, beauty, and wellness brands building distribution, awareness, and loyalty in a crowded shelf.",
    pills: ["Food", "Beverage", "Beauty", "Wellness", "Supplements"],
  },
  {
    label: "Apps & Digital Products",
    image: null,
    description: "SaaS, mobile, newsletters, and digital products solving real problems. Positioning, growth, and the GTM motion that compounds.",
    pills: ["SaaS", "Mobile", "Newsletter", "Web Tool", "Marketplace"],
  },
];

const TILE_WIDTH = 312;
const TILE_GAP = 20;
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

  const pauseTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

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

  useEffect(() => {
    if (index < COUNT) return;
    const track = trackRef.current;
    if (!track) return;
    const onEnd = () => {
      setAnimate(false);
      setIndex(0);
      requestAnimationFrame(() => {
        track.offsetWidth;
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
    <section id="who-we-serve" className={`${styles.section} section-dark`} ref={sectionRef}>
      <div className={styles.header}>
        <h2 className={`${styles.headline} display glide glide-headline`}>
          For every visionary and venture
        </h2>
        <div className={styles.controls}>
          <button className={styles.arrowBtn} onClick={() => manualStep(-1)} aria-label="Previous">←</button>
          <button className={styles.arrowBtn} onClick={() => manualStep(1)} aria-label="Next">→</button>
        </div>
      </div>

      <div
        className={styles.carousel}
        onMouseEnter={pauseTimer}
        onMouseLeave={() => { if (inView) startTimer(); }}
      >
        <div
          ref={trackRef}
          className={styles.track}
          style={{
            transform: `translateX(${offset}px)`,
            transition: animate ? "transform 800ms ease" : "none",
          }}
        >
          {[...TILES, ...TILES].map((tile, i) => (
            <article key={i} className={styles.tile}>
              {tile.image ? (
                <div className={styles.photo} style={{ backgroundImage: `url(${tile.image})`, backgroundPosition: tile.imagePosition || 'center' }} role="img" aria-label={tile.label} />
              ) : (
                <div className={styles.placeholderBg} />
              )}
              <div className={styles.scrim} />
              <div className={styles.content}>
                <h3 className={styles.label}>{tile.label}</h3>
                <div className={styles.reveal}>
                  <p className={styles.desc}>{tile.description}</p>
                  <div className={styles.pills}>
                    {tile.pills.map((p) => <span key={p} className={styles.pill}>{p}</span>)}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
