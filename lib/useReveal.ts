"use client";
import { useEffect } from "react";

/**
 * Splits .emerge elements into word spans, sets up IntersectionObserver
 * for both .glide and .emerge classes. Mirrors v139 behavior 1:1.
 *
 * Call once from a root client component (e.g. <RevealProvider />).
 */
export function useReveal() {
  useEffect(() => {
    // Split .emerge elements into word spans
    document.querySelectorAll<HTMLElement>(".emerge").forEach((el) => {
      // Skip if already processed
      if (el.querySelector(".emerge-word")) return;

      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      let n: Node | null;
      while ((n = walker.nextNode())) textNodes.push(n as Text);

      let wordIndex = 0;
      textNodes.forEach((textNode) => {
        const parent = textNode.parentNode;
        if (!parent) return;
        const parts = textNode.nodeValue?.split(/(\s+)/) ?? [];
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else if (part.length > 0) {
            const span = document.createElement("span");
            span.className = "emerge-word";
            span.style.setProperty("--i", String(wordIndex++));
            span.textContent = part;
            frag.appendChild(span);
          }
        });
        parent.replaceChild(frag, textNode);
      });
    });

    if (!("IntersectionObserver" in window)) return;

    const makeHandler = () => (entries: IntersectionObserverEntry[]) => {
      entries.forEach((e) => {
        const el = e.target as HTMLElement;
        if (e.isIntersecting) {
          el.classList.add("in-view");
        } else {
          // Bidirectional: also remove when out of view, with from-above hint
          const rect = e.boundingClientRect;
          const wasAbove = rect.top < 0;
          el.classList.remove("in-view");
          el.classList.toggle("glide-from-above", wasAbove);
        }
      });
    };

    const glideObs = new IntersectionObserver(makeHandler(), {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px",
    });
    document.querySelectorAll(".glide").forEach((el) => glideObs.observe(el));

    const emergeObs = new IntersectionObserver(makeHandler(), {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px",
    });
    document.querySelectorAll(".emerge").forEach((el) => emergeObs.observe(el));

    return () => {
      glideObs.disconnect();
      emergeObs.disconnect();
    };
  }, []);
}
