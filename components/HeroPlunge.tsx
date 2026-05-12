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

        {/* WHERE ART MEETS SCIENCE layer */}
        <div className={`${styles.layer} ${styles.layer02}`}>
          <h2 className={`${styles.wwHeadline} display`}>
            Where art meets <em>science</em>.
          </h2>
          <p className={styles.wwSubhead}>
            Where creative thinking meets <em>strategic execution</em>.
          </p>
          <div className={styles.wwGrid}>
            <div className={styles.wwCell}>
              <span className={styles.wwCellTag}>01 &middot; Brand + Design</span>
              <h3 className={styles.wwCellName}>Stand out in a sea of <em>sameness</em>.</h3>
              <p className={styles.wwCellBody}>People decide how they feel about your business before they ever talk to you. We build the look, the voice, and the story that makes them want to.</p>
              <span className={styles.wwCellCaps}>Logo design &middot; Visual identity &middot; Brand systems &middot; Voice &amp; tone &middot; Positioning &middot; Naming &middot; Storytelling</span>
            </div>
            <div className={styles.wwCell}>
              <span className={styles.wwCellTag}>02 &middot; Marketing + Campaigns</span>
              <h3 className={styles.wwCellName}>Reach your customers <em>where they are</em>.</h3>
              <p className={styles.wwCellBody}>Getting in front of the right people is half the work — saying the right thing when you do is the other half. We handle both.</p>
              <span className={styles.wwCellCaps}>Website copy &middot; Sales decks &middot; Case studies &middot; Email campaigns &middot; Social content &middot; SEO &middot; Paid media &middot; Events</span>
            </div>
            <div className={styles.wwCell}>
              <span className={styles.wwCellTag}>03 &middot; Growth + Systems</span>
              <h3 className={styles.wwCellName}>Build a sustainable <em>growth engine</em>.</h3>
              <p className={styles.wwCellBody}>The website that brings in jobs, the way you send quotes, collect payment, and follow up without dropping the ball. We build it, wire it together, and teach you how to run it.</p>
              <span className={styles.wwCellCaps}>Websites &middot; Quoting &amp; invoicing &middot; Lead generation &middot; Local SEO &middot; Automations &middot; AI workflows &middot; Internal dashboards</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
