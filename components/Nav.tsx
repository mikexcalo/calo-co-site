"use client";
import { useEffect } from "react";
import styles from "./Nav.module.css";

export default function Nav() {
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

  return (
    <header className={styles.header}>
      <div className={styles.wordmark}>CALO<span className="amp">&amp;</span>CO</div>
      <button className={styles.navCta} data-modal-trigger>
        Get in Touch
      </button>
    </header>
  );
}
