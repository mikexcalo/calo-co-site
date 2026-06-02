'use client';

import { useEffect, useRef } from 'react';
import styles from './HeroPlunge.module.css';

const brands = [
  { name: "Mammoth", logo: "/images/logos/Mammoth-Flat-White.png", alt: "Mammoth Construction", wide: false },
  { name: "LG Flooring", logo: "/images/logos/LG-FLOORING-WHITE.png", alt: "LG Flooring Installation Co.", wide: false },
  { name: "Stevie's Poem Store", logo: "/images/logos/stevies-poem-store-white.png", alt: "Stevie's Poem Store", wide: false },
  { name: "Pangaea", logo: "/images/logos/pangaea logo_white.png", alt: "Pangaea", wide: true },
  { name: "Loyal Construction", logo: "/images/logos/loyal-construction-white.png", alt: "Loyal Construction", wide: true },
  { name: "CL Cleaning", logo: "/images/logos/CL Cleaning Logo_White.png", alt: "CL Cleaning Services, Portland Maine", wide: true },
  { name: "Contra Energy", logo: "/images/logos/Contra Energy 2025.png", alt: "Contra Energy", wide: false },
  { name: "Frank's", logo: "/images/logos/Franks Logo 2025_White.png", alt: "Frank's", wide: true },
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

        {/* HERO BACKGROUND VIDEO */}
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Scrim over video for text legibility */}
        <div className={styles.heroScrim} aria-hidden="true"></div>

        {/* Subtle bottom fade on hero (fades out as you dive) */}
        <div className={styles.heroFade} aria-hidden="true"></div>

        {/* HERO layer */}
        <div className={`${styles.layer} ${styles.layerHero}`}>
          <h1 className={`${styles.heroHeadline} display`}>
            We chart the course,<br />you make <em>waves</em>.
          </h1>
          <p className={styles.heroSub}>
            Accelerate sustainable growth that scales.
          </p>
          <div className={styles.heroCtas}>
            <button className={styles.btnPrimary} data-modal-trigger="true">
              Get Started
            </button>
          </div>
        </div>

        {/* Module 02 text removed — now handled by ScrollCover */}

        {/* MARQUEE SCRIM — dark band so white logos are visible */}
        <div className={styles.marqueeScrim} aria-hidden="true"></div>

        {/* MARQUEE — fades out by --p = 0.3 */}
        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
            {[...brands, ...brands].map((b, i) => (
              <span key={i} className={styles.marqueeItem}>
                {b.logo ? (
                  <img
                    src={b.logo}
                    alt={b.alt || b.name}
                    className={`${styles.marqueeImg} ${b.wide ? styles.marqueeImgWide : ''}`}
                  />
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
