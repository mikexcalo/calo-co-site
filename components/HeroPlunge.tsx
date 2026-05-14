'use client';

import { useEffect, useRef } from 'react';
import styles from './HeroPlunge.module.css';

const brands = [
  { name: "Mammoth", logo: "/logos/Mammoth-Flat-White.png", alt: "Mammoth Construction" },
  { name: "LG Flooring", logo: "/logos/LG-FLOORING-WHITE.png", alt: "LG Flooring Installation Co." },
  { name: "Stevie's Poem Store", logo: null, alt: null },
  { name: "Hero's Journey", logo: null, alt: null },
  { name: "Pangaea", logo: "/logos/pangaea_logo_white.png", alt: "Pangaea" },
  { name: "Wayback", logo: null, alt: null },
  { name: "Nautilus", logo: null, alt: null },
  { name: "CL Cleaning", logo: "/logos/CL_Cleaning_Logo_White.png", alt: "CL Cleaning Services, Portland Maine" },
  { name: "Contra Energy", logo: "/logos/Contra_Energy_2025.png", alt: "Contra Energy" },
  { name: "Frank's", logo: "/logos/Franks_Logo_2025_White.png", alt: "Frank's" },
  { name: "Fuego", logo: null, alt: null },
];

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
            CALO<span className="amp">&amp;</span>CO is a growth partner for brands and businesses ready to level up.
          </p>
          <div className={styles.heroCtas}>
            <button className={styles.btnPrimary} data-modal-trigger="true">
              Climb Aboard <span>&rarr;</span>
            </button>
          </div>
        </div>

        {/* MARQUEE — fades out by --p = 0.3 */}
        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
            {[...brands, ...brands].map((b, i) => (
              <span key={i} className={styles.marqueeItem}>
                {b.logo ? (
                  <img src={b.logo} alt={b.alt || b.name} className={styles.marqueeImg} />
                ) : (
                  <span className={styles.marqueeText}>{b.name}</span>
                )}
              </span>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
}
