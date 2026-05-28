'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './WhatWeDoTiles.module.css';

/* ── Icons ── */

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: styles.featureIcon,
};

function IcoTarget() { return <svg {...iconProps}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>; }
function IcoPen() { return <svg {...iconProps}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>; }
function IcoMic() { return <svg {...iconProps}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>; }
function IcoPrinter() { return <svg {...iconProps}><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>; }
function IcoBook() { return <svg {...iconProps}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>; }
function IcoMap() { return <svg {...iconProps}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></svg>; }
function IcoEdit() { return <svg {...iconProps}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>; }
function IcoTrendingUp() { return <svg {...iconProps}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>; }
function IcoFilter() { return <svg {...iconProps}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>; }
function IcoMail() { return <svg {...iconProps}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>; }
function IcoMonitor() { return <svg {...iconProps}><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>; }
function IcoCalendar() { return <svg {...iconProps}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>; }
function IcoCreditCard() { return <svg {...iconProps}><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>; }
function IcoZap() { return <svg {...iconProps}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>; }
function IcoLink() { return <svg {...iconProps}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>; }
function IcoUsers() { return <svg {...iconProps}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>; }
function IcoActivity() { return <svg {...iconProps}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>; }
function IcoRefresh() { return <svg {...iconProps}><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>; }
function IcoCompass() { return <svg {...iconProps}><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>; }
function IcoShield() { return <svg {...iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>; }

/* ── Pillar data ── */

const PILLARS = [
  {
    label: 'Brand & Design',
    kicker: 'Brand & Design',
    statement: <>The brand they <em>won&rsquo;t forget</em>.</>,
    features: [
      { icon: <IcoTarget />, text: 'Brand strategy' },
      { icon: <IcoPen />, text: 'Logo & identity' },
      { icon: <IcoMic />, text: 'Voice' },
      { icon: <IcoPrinter />, text: 'Print & signage' },
      { icon: <IcoBook />, text: 'Guidelines' },
    ],
  },
  {
    label: 'Marketing & Sales',
    kicker: 'Marketing & Sales',
    statement: <>Attention, turned <em>into customers</em>.</>,
    features: [
      { icon: <IcoMap />, text: 'GTM strategy' },
      { icon: <IcoEdit />, text: 'Content & social' },
      { icon: <IcoTrendingUp />, text: 'Paid & organic' },
      { icon: <IcoFilter />, text: 'Lead funnels' },
      { icon: <IcoMail />, text: 'Email & CRM' },
    ],
  },
  {
    label: 'Websites & Systems',
    kicker: 'Websites & Systems',
    statement: <>The engine that <em>scales with you</em>.</>,
    features: [
      { icon: <IcoMonitor />, text: 'Design & build' },
      { icon: <IcoCalendar />, text: 'Scheduling' },
      { icon: <IcoCreditCard />, text: 'Payments' },
      { icon: <IcoZap />, text: 'Automation' },
      { icon: <IcoLink />, text: 'Integrations' },
    ],
  },
  {
    label: 'Support & Growth',
    kicker: 'Support & Growth',
    statement: <>A partner <em>in your corner</em>.</>,
    features: [
      { icon: <IcoUsers />, text: 'Dedicated team' },
      { icon: <IcoActivity />, text: 'Performance reviews' },
      { icon: <IcoRefresh />, text: 'Optimization' },
      { icon: <IcoCompass />, text: 'Roadmap' },
      { icon: <IcoShield />, text: 'Priority support' },
    ],
  },
];

export default function WhatWeDoTiles() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);
  const [entrancePhase, setEntrancePhase] = useState(true);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setEntered(true);
      setEntrancePhase(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
          // Remove entrance delay class after tiles have landed
          setTimeout(() => setEntrancePhase(false), 1400);
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} section-dark ${entered ? styles.entered : ''} ${entrancePhase ? styles.entranceDelay : ''}`}
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>What we do</span>
          <h2 className={styles.headline}>
            Everything your business needs,<br /><em>in one place</em>.
          </h2>
        </div>

        <div className={styles.tileRow}>
          {PILLARS.map((p, i) => (
            <div
              key={i}
              className={`${styles.tile} ${active === i ? styles.tileActive : ''}`}
              onClick={() => setActive(i)}
            >
              <span className={styles.collapsedLabel}>{p.label}</span>

              <div className={styles.activeContent}>
                <div>
                  <div className={styles.kicker}>{p.kicker}</div>
                  <h3 className={styles.statement}>{p.statement}</h3>
                  <a href="#contact" className={styles.ctaLink}>Get in touch &rarr;</a>
                </div>
                <div className={styles.featuresCol}>
                  {p.features.map((f, fi) => (
                    <div key={fi} className={styles.featureRow}>
                      {f.icon}
                      <span className={styles.featureLabel}>{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
