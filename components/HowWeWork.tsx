"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./HowWeWork.module.css";

const TOTAL = 4;
const TRANSITION_MS = 450;

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const stepEls = useRef<(HTMLDivElement | null)[]>([]);
  const railBaseRef = useRef<HTMLDivElement>(null);

  const activeIdx = useRef(-1);
  const isAnimating = useRef(false);
  const pinActive = useRef(false);
  const lastScrollY = useRef(0);
  const touchStartY = useRef<number | null>(null);
  const [, forceRender] = useState(0);

  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lastScrollY.current = window.scrollY;
  }, []);

  const isMobile = useCallback(() => {
    return typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches;
  }, []);

  const paint = useCallback((idx: number) => {
    activeIdx.current = idx;
    const p = idx < 0 ? 0 : Math.max(0, Math.min(1, (idx + 1) / TOTAL));
    const fill = fillRef.current;
    if (fill) {
      fill.style.transform = isMobile() ? `scaleY(${p})` : `scaleX(${p})`;
    }
    stepEls.current.forEach((el, i) => {
      if (!el) return;
      el.classList.toggle(styles.lit, i <= idx);
      el.classList.toggle(styles.active, i === idx);
    });
    forceRender((n) => n + 1);
  }, [isMobile]);

  const releasePin = useCallback((direction: "down" | "up") => {
    if (!pinActive.current) return;
    pinActive.current = false;
    const section = sectionRef.current;
    if (section) section.classList.remove(styles.pinning);
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    if (section) {
      const rect = section.getBoundingClientRect();
      const absTop = rect.top + window.scrollY;
      if (direction === "down") {
        window.scrollTo({ top: absTop + section.offsetHeight + 1, behavior: "instant" as ScrollBehavior });
      } else {
        window.scrollTo({ top: absTop - window.innerHeight - 1, behavior: "instant" as ScrollBehavior });
      }
    }
  }, []);

  const enablePin = useCallback((fromDirection: "down" | "up") => {
    if (pinActive.current || reducedMotion.current || isMobile()) return;
    pinActive.current = true;
    const section = sectionRef.current;
    if (section) section.classList.add(styles.pinning);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    activeIdx.current = fromDirection === "down" ? -1 : TOTAL - 1;
    paint(activeIdx.current);
  }, [isMobile, paint]);

  const advance = useCallback((direction: number) => {
    if (isAnimating.current) return;
    const next = activeIdx.current + direction;
    if (next >= TOTAL) { releasePin("down"); return; }
    if (next < 0) { releasePin("up"); return; }
    isAnimating.current = true;
    paint(next);
    setTimeout(() => { isAnimating.current = false; }, TRANSITION_MS);
  }, [paint, releasePin]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      if (!pinActive.current) return;
      e.preventDefault();
      if (isAnimating.current) return;
      advance(e.deltaY > 0 ? 1 : -1);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!pinActive.current) return;
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!pinActive.current) return;
      e.preventDefault();
      if (isAnimating.current || touchStartY.current == null) return;
      const dy = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(dy) < 24) return;
      advance(dy > 0 ? 1 : -1);
      touchStartY.current = e.touches[0].clientY;
    };

    const onKey = (e: KeyboardEvent) => {
      if (!pinActive.current) return;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        advance(1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        advance(-1);
      }
    };

    const onScrollDesktop = () => {
      if (reducedMotion.current || isMobile() || pinActive.current) {
        lastScrollY.current = window.scrollY;
        return;
      }
      const rect = section.getBoundingClientRect();
      const direction = window.scrollY >= lastScrollY.current ? "down" : "up";
      if (direction === "down" && rect.top <= 0 && rect.bottom > 0) {
        enablePin("down");
      } else if (direction === "up" && rect.bottom >= window.innerHeight && rect.top < window.innerHeight) {
        enablePin("up");
      }
      lastScrollY.current = window.scrollY;
    };

    const onScrollMobile = () => {
      if (!isMobile()) return;
      const railBase = railBaseRef.current;
      if (!railBase) return;
      const rect = railBase.getBoundingClientRect();
      const vh = window.innerHeight;
      const enter = vh * 0.7;
      const exit = vh * 0.3;
      const total = rect.height + (enter - exit);
      const p = Math.max(0, Math.min(1, (enter - rect.top) / total));
      const reached = Math.min(TOTAL, Math.floor(p * TOTAL + 0.15));
      const snapP = reached / TOTAL;
      const fill = fillRef.current;
      if (fill) fill.style.transform = `scaleY(${snapP})`;
      stepEls.current.forEach((el, i) => {
        if (!el) return;
        el.classList.toggle(styles.lit, i < reached);
        el.classList.toggle(styles.active, i === reached - 1);
      });
    };

    const onScroll = () => {
      if (isMobile()) onScrollMobile();
      else onScrollDesktop();
    };

    const onResize = () => {
      if (pinActive.current) releasePin("down");
      activeIdx.current = -1;
      const fill = fillRef.current;
      if (fill) fill.style.transform = isMobile() ? "scaleY(0)" : "scaleX(0)";
      stepEls.current.forEach((el) => {
        if (!el) return;
        el.classList.remove(styles.lit, styles.active);
      });
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      if (pinActive.current) releasePin("down");
    };
  }, [advance, enablePin, releasePin, paint, isMobile]);

  return (
    <section id="process" ref={sectionRef} className={styles.section}>
      <div ref={innerRef} className={styles.inner}>
        <div className={styles.head}>
          <h2 className={`${styles.title} display`}>
            How <em>we work.</em>
          </h2>
        </div>

        <div className={styles.timeline}>
          <div ref={railBaseRef} className={styles.railBase} />
          <div ref={fillRef} className={styles.railFill} />

          <div
            className={styles.step}
            data-idx="0"
            ref={(el) => { stepEls.current[0] = el; }}
          >
            <span className={styles.node} />
            <div className={styles.icon}>
              <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 11 C5 8.5 7 7 9 7 L20 7 C22 7 24 8.5 24 11 L24 18 C24 20 22 21.5 20 21.5 L13 21.5 L9 25 L9 21.5 C7 21.5 5 20 5 18 Z" />
                <path d="M14 14 C14 12 16 11 18 11 L29 11 C31 11 33 12 33 14 L33 21 C33 23 31 24 29 24 L24 24" />
              </svg>
            </div>
            <div className={styles.num}>Step 01</div>
            <h3 className={`${styles.stepTitle} display`}><em>Discovery</em></h3>
            <p className={styles.stepBody}>A real conversation, not a pitch. We learn what you&apos;re building, what&apos;s working, and what&apos;s in the way.</p>
          </div>

          <div
            className={styles.step}
            data-idx="1"
            ref={(el) => { stepEls.current[1] = el; }}
          >
            <span className={styles.node} />
            <div className={styles.icon}>
              <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 5 L23 5 L29 11 L29 31 L9 31 Z" />
                <path d="M23 5 L23 11 L29 11" />
                <line x1="13" y1="17" x2="25" y2="17" />
                <line x1="13" y1="21" x2="25" y2="21" />
                <line x1="13" y1="25" x2="20" y2="25" />
              </svg>
            </div>
            <div className={styles.num}>Step 02</div>
            <h3 className={`${styles.stepTitle} display`}><em>Charting</em></h3>
            <p className={styles.stepBody}>Within a week, you get a written plan and a fixed quote. What we&apos;ll do, in what order, how long, how much.</p>
          </div>

          <div
            className={styles.step}
            data-idx="2"
            ref={(el) => { stepEls.current[2] = el; }}
          >
            <span className={styles.node} />
            <div className={styles.icon}>
              <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="18" cy="18" r="11" />
                <circle cx="18" cy="7" r="2" fill="currentColor" stroke="none" />
                <circle cx="29" cy="18" r="2" />
                <circle cx="18" cy="29" r="2" />
                <circle cx="7" cy="18" r="2" />
              </svg>
            </div>
            <div className={styles.num}>Step 03</div>
            <h3 className={`${styles.stepTitle} display`}><em>Voyage</em></h3>
            <p className={styles.stepBody}>We build it for you, with you, or teach you how. Whichever fits where you are.</p>
          </div>

          <div
            className={styles.step}
            data-idx="3"
            ref={(el) => { stepEls.current[3] = el; }}
          >
            <span className={styles.node} />
            <div className={styles.icon}>
              <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M30 18 C30 24.6 24.6 30 18 30 C13.5 30 9.6 27.6 7.5 24" />
                <path d="M6 18 C6 11.4 11.4 6 18 6 C22.5 6 26.4 8.4 28.5 12" />
                <polyline points="28.5,6 28.5,12 22.5,12" />
                <polyline points="7.5,30 7.5,24 13.5,24" />
              </svg>
            </div>
            <div className={styles.num}>Step 04</div>
            <h3 className={`${styles.stepTitle} display`}><em>Course correction</em></h3>
            <p className={styles.stepBody}>Launch isn&apos;t the end. We measure what&apos;s working, fix what isn&apos;t, and keep adjusting as you grow.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
