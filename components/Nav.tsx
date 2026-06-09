"use client";
import { useEffect, useState } from "react";
import styles from "./Nav.module.css";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const navHeight = 80;

    function updateNav() {
      const darkSections = document.querySelectorAll(".section-dark");
      let isDark = false;
      darkSections.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top < navHeight && r.bottom > navHeight) isDark = true;
      });
      if (isDark) document.body.classList.add("dark-nav");
      else document.body.classList.remove("dark-nav");
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateNav();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateNav);
    updateNav();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateNav);
      document.body.classList.remove("dark-nav");
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.wordmark}>CALO<span className="amp">&amp;</span>CO</div>

      <div className={styles.navRight}>
        <a href="https://nautilusapp.vercel.app/welcome" className={styles.navLogin}>Log in</a>
        <button className={styles.navCta} data-modal-trigger>
          Get Started
        </button>
      </div>

      <button
        className={styles.hamburger}
        aria-label="Open menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(true)}
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <line x1="4" y1="9" x2="22" y2="9" />
          <line x1="4" y1="17" x2="22" y2="17" />
        </svg>
      </button>

      <div
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.drawerHead}>
          <div className={styles.wordmark}>CALO<span className="amp">&amp;</span>CO</div>
          <button
            className={styles.drawerClose}
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <line x1="6" y1="6" x2="20" y2="20" />
              <line x1="20" y1="6" x2="6" y2="20" />
            </svg>
          </button>
        </div>
        <div className={styles.drawerBody}>
          <a
            href="https://nautilusapp.vercel.app/welcome"
            className={styles.drawerLogin}
            onClick={() => setMenuOpen(false)}
          >
            Log in
          </a>
          <button
            className={styles.drawerCta}
            data-modal-trigger
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
