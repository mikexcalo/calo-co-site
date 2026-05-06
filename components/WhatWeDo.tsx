"use client";
import { useState } from "react";
import styles from "./WhatWeDo.module.css";

type Capability = {
  num: string;
  label: string;
  proof: string;
};

const CAPABILITIES: Capability[] = [
  {
    num: "01",
    label: "Brand",
    proof: "Identity systems built to compound. Logos, type, color, voice — and the rules that hold them together.",
  },
  {
    num: "02",
    label: "Web",
    proof: "Sites that load fast, convert, and feel like the product. Editorial layouts, not template SaaS.",
  },
  {
    num: "03",
    label: "Growth",
    proof: "Positioning, pricing, and packaging — the unglamorous work that decides whether marketing actually moves revenue.",
  },
  {
    num: "04",
    label: "Outbound",
    proof: "Cold systems that feel warm. Sequences, lists, and copy that get reply rates founders can't believe.",
  },
  {
    num: "05",
    label: "Operations",
    proof: "The boring middle layer that keeps a business legible — CRM, invoicing, reporting, decisions.",
  },
  {
    num: "06",
    label: "AI",
    proof: "Custom GPTs, agentic workflows, and AI-native operating systems built for your team's actual work.",
  },
];

export default function WhatWeDo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = CAPABILITIES[activeIndex];

  return (
    <section id="what-we-do" className={styles.section}>
      <div className={styles.inner}>
        <span className={`${styles.eyebrow} eyebrow glide`}>What We Do</span>
        <h2 className={`${styles.headline} display glide glide-headline`}>
          Six capabilities. <em>One operating system.</em>
        </h2>

        <div className={styles.row} role="tablist">
          {CAPABILITIES.map((cap, i) => (
            <button
              key={cap.num}
              role="tab"
              aria-selected={i === activeIndex}
              className={`${styles.cell} ${i === activeIndex ? styles.cellActive : ""}`}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => setActiveIndex(i)}
            >
              <span className={`${styles.num} mono`}>{cap.num}</span>
              <span className={styles.label}>{cap.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.proofWrap}>
          <p key={active.num} className={styles.proof}>
            {active.proof}
          </p>
        </div>
      </div>
    </section>
  );
}
