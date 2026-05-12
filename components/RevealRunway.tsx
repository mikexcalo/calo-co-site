"use client";

import { useEffect, useRef } from "react";
import FounderMemo from "./FounderMemo";
import Testimonial from "./Testimonial";
import styles from "./RevealRunway.module.css";

export default function RevealRunway() {
  const runwayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const runway = runwayRef.current;
    if (!runway) return;

    let raf = 0;
    const update = () => {
      const rect = runway.getBoundingClientRect();
      const winH = window.innerHeight;
      const scrolled = -rect.top;
      const total = rect.height - winH;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      runway.style.setProperty("--reveal", progress.toFixed(4));
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={runwayRef} className={styles.runway}>
      <Testimonial />
      <FounderMemo />
    </div>
  );
}
