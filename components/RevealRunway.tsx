"use client";

import { useEffect, useRef, useState } from "react";
import FounderMemo from "./FounderMemo";
import Testimonial from "./Testimonial";
import styles from "./RevealRunway.module.css";

export default function RevealRunway() {
  const runwayRef = useRef<HTMLDivElement | null>(null);
  const [debug, setDebug] = useState("reveal: 0.00");

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
      setDebug(`reveal: ${progress.toFixed(2)}`);
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
    <>
      <div ref={runwayRef} className={styles.runway}>
        <Testimonial />
        <FounderMemo />
      </div>
      <div style={{
        position: "fixed",
        top: 16,
        right: 16,
        background: "rgba(26,26,26,0.85)",
        color: "#F5F5F5",
        padding: "6px 12px",
        borderRadius: 4,
        fontFamily: "monospace",
        fontSize: 11,
        letterSpacing: "0.1em",
        zIndex: 9999,
        pointerEvents: "none",
      }}>{debug}</div>
    </>
  );
}
