'use client';
import { useEffect, useRef } from 'react';
import styles from './ScrollCover.module.css';

const TILES = [
  { id: 't1', label: 'Case Study 01' },
  { id: 't2', label: 'Case Study 02' },
  { id: 't3', label: 'Case Study 03' },
];

// per tile: [enterAt, exitAt, restX(vw)]
const CFG = {
  t1: [0.22, 0.99, -15],
  t2: [0.41, 1.18, 15],
  t3: [0.60, 1.37, 0],
} as const;

const START_Y = 120;
const END_Y = -128;
const CUT_AT = 14;   // vh: tile-3 centre Y where the text cuts out
const SLIVER = 2;    // vh: near-instant transition width

const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1);
const tileY = (p: number, s: number, e: number) =>
  START_Y + (END_Y - START_Y) * easeInOut(seg(p, s, e));

export default function ScrollCover() {
  const trackRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const t1Ref = useRef<HTMLDivElement>(null);
  const t2Ref = useRef<HTMLDivElement>(null);
  const t3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const text = textRef.current;
    const refs = { t1: t1Ref.current, t2: t2Ref.current, t3: t3Ref.current };
    if (!track || !text) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = track.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const p = clamp(-r.top / total, 0, 1);
        let t3y = START_Y;
        (['t1', 't2', 't3'] as const).forEach((k) => {
          const [s, e, x] = CFG[k];
          const y = tileY(p, s, e);
          if (k === 't3') t3y = y;
          const el = refs[k];
          if (el) el.style.transform =
            `translate(calc(-50% + ${x}vw), ${y}vh)`;
        });
        const fade = clamp((CUT_AT - t3y) / SLIVER, 0, 1);
        text.style.opacity = String(1 - fade);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={trackRef} className={styles.track}>
      <div className={styles.rail}>
        <div ref={textRef} className={styles.textmod}>
          <span className={styles.eyebrow}>Who we are</span>
          <h2 className={styles.headline}>
            CALO&amp;CO is a <em>growth partner</em> for independent brands and businesses ready
            to level up.
          </h2>
        </div>
        <div ref={t1Ref} className={`${styles.tile} ${styles.t1}`}>{TILES[0].label}</div>
        <div ref={t2Ref} className={`${styles.tile} ${styles.t2}`}>{TILES[1].label}</div>
        <div ref={t3Ref} className={`${styles.tile} ${styles.t3}`}>{TILES[2].label}</div>
      </div>
    </section>
  );
}
