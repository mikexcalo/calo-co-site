'use client';

import { useEffect, useRef } from 'react';
import styles from './HeroPlunge.module.css';

export default function HeroPlunge() {
  const blockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const block = blockRef.current;
    if (!block) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = block.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = block.offsetHeight - vh;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      block.style.setProperty('--p', p.toFixed(4));
      document.documentElement.style.setProperty('--p', p.toFixed(4));
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={blockRef} className={styles.plunge}>
      <div className={styles.stage}>

        {/* Subtle bottom fade on hero (fades out as you dive) */}
        <div className={styles.heroFade} aria-hidden="true"></div>

        {/* HERO layer */}
        <div className={`${styles.layer} ${styles.layerHero}`}>
          <h1 className={`${styles.heroHeadline} display`}>
            We chart the course,<br />you make <em>waves</em>.
          </h1>
          <p className={styles.heroSub}>
            CALO&amp;CO is a marketing and growth partner<br />
            for independent brands and businesses ready to level up.
          </p>
          <div className={styles.heroCtas}>
            <button className={styles.btnPrimary} data-modal-trigger="true">
              Climb Aboard <span>&rarr;</span>
            </button>
            <a className={styles.btnSecondary} href="#stories">See Our Work</a>
          </div>
        </div>

        {/* MARQUEE — fades out by --p = 0.3 */}
        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
            <span className={styles.marqueeLogo}>Pangaea</span>
            <span className={styles.marqueeLogo}>Fuego</span>
            <span className={styles.marqueeLogo}>Mammoth</span>
            <span className={styles.marqueeLogo}>LG Flooring</span>
            <span className={styles.marqueeLogo}>Stevie&apos;s Poem Store</span>
            <span className={styles.marqueeLogo}>Hero&apos;s Journey</span>
            <span className={styles.marqueeLogo}>Wayback</span>
            <span className={styles.marqueeLogo}>Nautilus</span>
            <span className={styles.marqueeLogo}>Pangaea</span>
            <span className={styles.marqueeLogo}>Fuego</span>
            <span className={styles.marqueeLogo}>Mammoth</span>
            <span className={styles.marqueeLogo}>LG Flooring</span>
            <span className={styles.marqueeLogo}>Stevie&apos;s Poem Store</span>
            <span className={styles.marqueeLogo}>Hero&apos;s Journey</span>
            <span className={styles.marqueeLogo}>Wayback</span>
            <span className={styles.marqueeLogo}>Nautilus</span>
          </div>
        </div>

        {/* WHO WE ARE layer */}
        <div className={`${styles.layer} ${styles.layer02}`}>
          <span className={`${styles.wwEyebrow} eyebrow`}>Who We Are</span>
          <h2 className={`${styles.wwHeadline} display`}>
            We are <em>navigators</em>, builders, and signal-makers for ambitious independents.
          </h2>
          <p className={styles.wwLede}>
            CALO&amp;CO is a small studio with a long horizon. We partner with founders building businesses worth remembering — not the loudest in the room, but the ones with the strongest signal.
          </p>
        </div>

      </div>
    </div>
  );
}
