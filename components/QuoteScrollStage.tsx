'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './QuoteScrollStage.module.css';

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function map(v: number, inA: number, inB: number, outA: number, outB: number) {
  return clamp((v - inA) / (inB - inA), 0, 1) * (outB - outA) + outA;
}

interface QuoteScrollStageProps {
  quote: React.ReactNode;
  founder: React.ReactNode;
  faq: React.ReactNode;
}

export default function QuoteScrollStage({ quote, founder, faq }: QuoteScrollStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const onFrame = useCallback(() => {
    const stage = stageRef.current;
    const founderEl = founderRef.current;
    const faqEl = faqRef.current;
    if (!stage || !founderEl || !faqEl) return;

    const rect = stage.getBoundingClientRect();
    const p = clamp(-rect.top / (rect.height - window.innerHeight), 0, 1);

    // FounderMemo lift
    const founderY = map(p, 0, 0.16, 0, -106);
    const founderOpacity = map(p, 0.10, 0.16, 1, 0);
    founderEl.style.transform = `translateY(${founderY}%)`;
    founderEl.style.opacity = String(founderOpacity);

    // FAQ rise (hold between 0.62–0.74, then rise)
    const faqY = map(p, 0.74, 0.96, 106, 0);
    faqEl.style.transform = `translateY(${faqY}%)`;
  }, []);

  useEffect(() => {
    let rafId: number;

    const tick = () => {
      onFrame();
      rafId = requestAnimationFrame(tick);
    };

    // Use scroll + resize to keep raf running only when needed
    // Actually, simpler: just run raf loop while mounted
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [onFrame]);

  return (
    <div ref={stageRef} className={styles.stage}>
      <div className={styles.pin}>
        <div className={styles.layerQuote}>
          {quote}
        </div>
        <div ref={founderRef} className={styles.layerFounder}>
          {founder}
        </div>
        <div ref={faqRef} className={styles.layerFaq}>
          {faq}
        </div>
      </div>
    </div>
  );
}
