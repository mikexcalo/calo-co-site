"use client";
import { useEffect, useState } from "react";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.topbar} ${scrolled ? styles.scrolled : ""}`} id="topbar">
      <div className={styles.wordmark}>CALO&amp;CO</div>
      <button className={styles.navCta} data-modal-trigger>
        Get in Touch
      </button>
    </nav>
  );
}
