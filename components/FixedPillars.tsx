'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './FixedPillars.module.css';

/* ── Icon components (simple stroke SVGs) ── */

function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function IconPen() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}
function IconMic() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}
function IconPrinter() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}
function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
function IconEye() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IconMap() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  );
}
function IconEdit() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconTrendingUp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
function IconFilter() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function IconBarChart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
function IconMonitor() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function IconCreditCard() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}
function IconZap() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function IconLink() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
function IconServer() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconActivity() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
function IconRefresh() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}
function IconCompass() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.featureIcon}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

/* ── Pillar data ── */

const PILLARS = [
  {
    num: '01',
    tag: 'Brand + Design',
    headline: <>Stand out in a sea of <em>sameness</em>.</>,
    desc: 'The look, voice, and identity that make people stop, trust, and remember you. From positioning to logo to every asset your business puts in the world.',
    features: [
      { icon: <IconTarget />, label: 'Brand strategy' },
      { icon: <IconPen />, label: 'Logo & identity' },
      { icon: <IconMic />, label: 'Voice & messaging' },
      { icon: <IconPrinter />, label: 'Print & signage' },
      { icon: <IconBook />, label: 'Guidelines & kit' },
      { icon: <IconEye />, label: 'Creative direction' },
    ],
  },
  {
    num: '02',
    tag: 'Marketing + Sales',
    headline: <>Turn attention into <em>customers</em>.</>,
    desc: 'The campaigns, content, and sales motion that bring the right people in — and the system that keeps them coming back.',
    features: [
      { icon: <IconMap />, label: 'GTM strategy' },
      { icon: <IconEdit />, label: 'Content & social' },
      { icon: <IconTrendingUp />, label: 'Paid & organic' },
      { icon: <IconFilter />, label: 'Lead funnels' },
      { icon: <IconMail />, label: 'Email & CRM' },
      { icon: <IconBarChart />, label: 'Reporting' },
    ],
  },
  {
    num: '03',
    tag: 'Websites + Systems',
    headline: <>The engine behind the <em>business</em>.</>,
    desc: 'The website, tools, and automations that make the day-to-day run itself — built to scale as you grow.',
    features: [
      { icon: <IconMonitor />, label: 'Design & build' },
      { icon: <IconCalendar />, label: 'Scheduling' },
      { icon: <IconCreditCard />, label: 'Payments' },
      { icon: <IconZap />, label: 'Automation' },
      { icon: <IconLink />, label: 'Integrations' },
      { icon: <IconServer />, label: 'Hosting' },
    ],
  },
  {
    num: '04',
    tag: 'Support + Growth',
    headline: <>A partner that stays in your <em>corner</em>.</>,
    desc: 'Ongoing strategy, optimization, and hands-on help — so the work keeps performing long after launch day.',
    features: [
      { icon: <IconUsers />, label: 'Dedicated team' },
      { icon: <IconActivity />, label: 'Performance reviews' },
      { icon: <IconRefresh />, label: 'Optimization' },
      { icon: <IconCompass />, label: 'Roadmap planning' },
      { icon: <IconShield />, label: 'Priority support' },
      { icon: <IconLayers />, label: 'Quarterly strategy' },
    ],
  },
];

// Use the longest pillar (04) as the sizer to guarantee height
const SIZER_INDEX = 3;

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function PaneContent({ pillar }: { pillar: typeof PILLARS[number] }) {
  return (
    <>
      <h2 className={styles.headline}>{pillar.headline}</h2>
      <p className={styles.description}>{pillar.desc}</p>
      <div className={styles.features}>
        {pillar.features.map((f, i) => (
          <div key={i} className={styles.feature}>
            {f.icon}
            <span className={styles.featureLabel}>{f.label}</span>
          </div>
        ))}
      </div>
      <a href="#contact" className={styles.cta}>Get in touch</a>
    </>
  );
}

export default function FixedPillars() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const copyPaneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visualPaneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastActiveRef = useRef(-1);

  const onFrame = useCallback(() => {
    const runway = runwayRef.current;
    const frame = frameRef.current;
    if (!runway || !frame) return;

    const rect = runway.getBoundingClientRect();
    const inView = rect.top <= 0 && rect.bottom >= window.innerHeight;

    if (inView) {
      if (!frame.classList.contains(styles.frameVisible)) {
        frame.classList.add(styles.frameVisible);
      }
      const total = rect.height - window.innerHeight;
      const p = clamp(-rect.top / total, 0, 1);
      const activeIndex = Math.min(3, Math.floor(p / 0.25));

      if (activeIndex !== lastActiveRef.current) {
        lastActiveRef.current = activeIndex;

        // Update number label
        if (numberRef.current) {
          numberRef.current.textContent = `${PILLARS[activeIndex].num}  /  ${PILLARS[activeIndex].tag}`;
        }

        // Toggle copy panes
        for (let i = 0; i < 4; i++) {
          const el = copyPaneRefs.current[i];
          if (!el) continue;
          if (i === activeIndex) el.classList.add(styles.copyPaneActive);
          else el.classList.remove(styles.copyPaneActive);
        }

        // Toggle visual panes
        for (let i = 0; i < 4; i++) {
          const el = visualPaneRefs.current[i];
          if (!el) continue;
          if (i === activeIndex) el.classList.add(styles.visualPaneActive);
          else el.classList.remove(styles.visualPaneActive);
        }
      }
    } else {
      if (frame.classList.contains(styles.frameVisible)) {
        frame.classList.remove(styles.frameVisible);
        lastActiveRef.current = -1;
      }
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
    <div ref={runwayRef} className={styles.runway}>
      <div ref={frameRef} className={styles.frame}>
        <div className={styles.wrap}>
          <div className={styles.row}>
            {/* Left column */}
            <div className={styles.copy}>
              <div className={styles.numberLabel}>
                <span ref={numberRef} className={styles.numberText}>
                  {PILLARS[0].num}  /  {PILLARS[0].tag}
                </span>
                <span className={styles.numberBar} />
              </div>

              <div className={styles.copyPanes}>
                {/* Invisible sizer for height */}
                <div className={styles.copySizer} aria-hidden="true">
                  <PaneContent pillar={PILLARS[SIZER_INDEX]} />
                </div>

                {/* Actual cross-fading panes */}
                {PILLARS.map((pillar, i) => (
                  <div
                    key={i}
                    ref={(el) => { copyPaneRefs.current[i] = el; }}
                    className={`${styles.copyPane} ${i === 0 ? styles.copyPaneActive : ''}`}
                  >
                    <PaneContent pillar={pillar} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className={styles.visual}>
              {PILLARS.map((pillar, i) => (
                <div
                  key={i}
                  ref={(el) => { visualPaneRefs.current[i] = el; }}
                  className={`${styles.visualPane} ${i === 0 ? styles.visualPaneActive : ''}`}
                >
                  <span className={styles.visualPlaceholder}>{pillar.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
