'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './QuoteScrollStage.module.css';

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function map(v: number, inA: number, inB: number, outA: number, outB: number) {
  return clamp((v - inA) / (inB - inA), 0, 1) * (outB - outA) + outA;
}

function shade(a: number) {
  return `rgba(245,245,245,${0.10 + 0.90 * clamp(a, 0, 1)})`;
}

const STAR_COUNT = 5;
const FEATHER = 6.0;

interface QuoteScrollStageProps {
  quote: React.ReactNode;
  founder: React.ReactNode;
}

export default function QuoteScrollStage({ quote, founder }: QuoteScrollStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const quoteLayerRef = useRef<HTMLDivElement>(null);

  // Cached DOM element arrays — populated once after mount
  const starsRef = useRef<HTMLElement[]>([]);
  const lettersRef = useRef<HTMLElement[]>([]);
  const signatureRef = useRef<HTMLElement | null>(null);
  const wordCountRef = useRef(0);
  const totalLettersRef = useRef(0);

  useEffect(() => {
    const layer = quoteLayerRef.current;
    if (!layer) return;

    starsRef.current = Array.from(layer.querySelectorAll<HTMLElement>('[data-star]'));
    lettersRef.current = Array.from(layer.querySelectorAll<HTMLElement>('[data-letter]'));
    signatureRef.current = layer.querySelector<HTMLElement>('[data-signature]');
    totalLettersRef.current = lettersRef.current.length;

    // Count words by finding the highest word boundary
    // We know the words array from Testimonial — derive word count from letter groupings
    // Actually simpler: count unique parent inline-block spans
    const wordSet = new Set<Node>();
    lettersRef.current.forEach((el) => {
      if (el.parentElement) wordSet.add(el.parentElement);
    });
    wordCountRef.current = wordSet.size;
  }, []);

  const onFrame = useCallback(() => {
    const stage = stageRef.current;
    const founderEl = founderRef.current;
    if (!stage || !founderEl) return;

    const rect = stage.getBoundingClientRect();
    const p = clamp(-rect.top / (rect.height - window.innerHeight), 0, 1);

    // FounderMemo lift
    const founderY = map(p, 0, 0.16, 0, -106);
    const founderOpacity = map(p, 0.10, 0.16, 1, 0);
    founderEl.style.transform = `translateY(${founderY}%)`;
    founderEl.style.opacity = String(founderOpacity);

    // Quote reveal
    const totalUnits = STAR_COUNT + wordCountRef.current;
    const edge = p * totalUnits;

    // Stars
    const stars = starsRef.current;
    for (let i = 0; i < stars.length; i++) {
      stars[i].style.color = shade((edge - i + 0.35) / 0.85);
    }

    // Letters
    const letters = lettersRef.current;
    const letterEdge = (edge - STAR_COUNT) * FEATHER;
    for (let gi = 0; gi < letters.length; gi++) {
      letters[gi].style.color = shade(letterEdge - gi);
    }

    // Signature — fade in once all letters are lit
    const sig = signatureRef.current;
    if (sig) {
      sig.style.opacity = letterEdge >= totalLettersRef.current ? '1' : '0';
    }
  }, []);

  useEffect(() => {
    let rafId: number;

    const tick = () => {
      onFrame();
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [onFrame]);

  return (
    <div ref={stageRef} className={styles.stage}>
      <div className={styles.pin}>
        <div ref={quoteLayerRef} className={styles.layerQuote}>
          {quote}
        </div>
        <div ref={founderRef} className={styles.layerFounder}>
          {founder}
        </div>
      </div>
    </div>
  );
}
