'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './WhatWeDoScroll.module.css';

/* ── Icon SVG paths (feather-style, stroke only) ── */
const ICONS: Record<string, string> = {
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  funnel: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  card: '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4z"/>',
  mic: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>',
  printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  editsq: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/>',
  megaphone: '<path d="M3 11l18-5v12L3 14z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  msgsq: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  trending: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  video: '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  tag: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  msgcircle: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  form: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
};

function Icon({ name }: { name: string }) {
  return (
    <svg className={styles.ci} viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICONS[name] || '' }} />
  );
}

/* ── Pillar data ── */
const PILLARS = [
  {
    eye: 'Identity',
    stmt: 'We craft unforgettable brands that capture attention and command a premium.',
    caps: [
      ['target', 'Brand Strategy'], ['msgsq', 'Story & Positioning'], ['pen', 'Logo & Identity'],
      ['mic', 'Messaging & Voice'], ['printer', 'Print & Signage'], ['editsq', 'Brand Assets'],
    ],
  },
  {
    eye: 'Presence',
    stmt: 'We build stunning websites designed to turn visitors into customers.',
    caps: [
      ['monitor', 'Website Design'], ['bag', 'Online Stores'], ['calendar', 'Booking & Scheduling'],
      ['card', 'Payments & Checkout'], ['pin', 'Search & Visibility'], ['shield', 'Hosting & Support'],
    ],
  },
  {
    eye: 'Growth',
    stmt: 'We develop winning strategies custom-built to accelerate growth.',
    caps: [
      ['megaphone', 'Marketing Campaigns'], ['msgsq', 'Content & Social'], ['trending', 'Paid Advertising'],
      ['msgcircle', 'Direct Outreach'], ['calendar', 'Events & Activations'], ['activity', 'Sales Support'],
    ],
  },
  {
    eye: 'Operations',
    stmt: 'We engineer the systems behind a profitable, sustainable business.',
    caps: [
      ['tag', 'Pricing Strategy'], ['form', 'Quotes & Estimates'], ['card', 'Invoicing & Billing'],
      ['users', 'Client Management'], ['link', 'Connected Tools'], ['cpu', 'AI & Automation'],
    ],
  },
];

/* ── Browser mock ── */
function BrowserMock() {
  return (
    <div className={styles.browser}>
      <div className={styles.bbar}>
        <span className={styles.bdot} /><span className={styles.bdot} /><span className={styles.bdot} />
        <div className={styles.burl}>mammothconstruction.com</div>
      </div>
      <div className={styles.bview}>
        <div className={styles.bpage}>
          <div className={styles.phero}>
            <div className={styles.pn}>MAMMOTH CONSTRUCTION</div>
            <div className={styles.ph}>Built to last.</div>
          </div>
          <div className={styles.pblk}>
            <div className={styles.pgrid}><div className={styles.pcard} /><div className={styles.pcard} /><div className={styles.pcard} /></div>
            <div style={{ height: 18 }} />
            <div className={`${styles.pbar} ${styles.pbarM}`} />
            <div className={`${styles.pbar} ${styles.pbarS}`} />
            <div className={`${styles.pbar} ${styles.pbarM}`} />
            <div className={styles.pgrid} style={{ marginTop: 18 }}><div className={styles.pcard} /><div className={styles.pcard} /><div className={styles.pcard} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Brand mock ── */
function BrandMock() {
  return (
    <div className={styles.brand}>
      <div className={`${styles.blayer} ${styles.before}`}>
        <span className={`${styles.btag} ${styles.btagL}`}>BEFORE</span>
        <div className={styles.beforeMark}>Mammoth Co.</div>
        <div className={styles.beforeSub}>general contractor</div>
      </div>
      <div className={`${styles.blayer} ${styles.after}`}>
        <span className={`${styles.btag} ${styles.btagR}`}>AFTER</span>
        <div className={styles.mlogo} />
        <div className={styles.afterMark}>MAMMOTH</div>
        <div className={styles.afterSub}>BUILT TO LAST</div>
      </div>
    </div>
  );
}

/* ── Radar chart (Growth visual) ── */
function RadarChart() {
  const cx = 260, cy = 180, R = 112, RL = R + 20;
  const labels = ['CAMPAIGNS', 'CONTENT', 'PAID ADS', 'OUTREACH', 'EVENTS', 'SALES'];
  const angles = [-90, -30, 30, 90, 150, 210].map(d => (d * Math.PI) / 180);
  const profiles = [
    [0.52, 0.42, 0.64, 0.46, 0.40, 0.66],
    [0.82, 0.64, 0.90, 0.70, 0.58, 0.94],
    [0.60, 0.86, 0.68, 0.90, 0.82, 0.54],
  ];

  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const shape = svg.querySelector('#rShape') as SVGPolygonElement;
    const verts = svg.querySelectorAll<SVGCircleElement>('.rv');
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    let cur = 0, nx = 1, ph: 'hold' | 't' = 'hold', t0 = performance.now();
    const H = 1100, T = 950;

    function render(v: number[]) {
      const pts = angles.map((a, i) => [cx + R * v[i] * Math.cos(a), cy + R * v[i] * Math.sin(a)]);
      shape.setAttribute('points', pts.map(p => `${p[0]},${p[1]}`).join(' '));
      pts.forEach((p, i) => { verts[i]?.setAttribute('cx', String(p[0])); verts[i]?.setAttribute('cy', String(p[1])); });
    }

    let raf: number;
    function f(now: number) {
      const dt = now - t0;
      if (ph === 'hold') { render(profiles[cur]); if (dt >= H) { ph = 't'; t0 = now; } }
      else { const e = ease(Math.min(dt / T, 1)); render(profiles[cur].map((v, i) => v + (profiles[nx][i] - v) * e)); if (dt >= T) { cur = nx; nx = (nx + 1) % profiles.length; ph = 'hold'; t0 = now; } }
      raf = requestAnimationFrame(f);
    }
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, []);

  const gridLevels = [0.34, 0.67, 1];

  return (
    <svg ref={ref} className={styles.svgv} viewBox="0 0 520 360">
      {gridLevels.map((lv, i) => (
        <polygon key={i} points={angles.map(a => `${cx + R * lv * Math.cos(a)},${cy + R * lv * Math.sin(a)}`).join(' ')} fill="none" stroke="#F5F5F5" strokeOpacity="0.12" />
      ))}
      {angles.map((a, i) => (
        <line key={i} x1={cx} y1={cy} x2={cx + R * Math.cos(a)} y2={cy + R * Math.sin(a)} stroke="#F5F5F5" strokeOpacity="0.1" />
      ))}
      <polygon id="rShape" fill="#F5F5F5" fillOpacity="0.1" stroke="#F5F5F5" strokeWidth="2" strokeLinejoin="round" />
      {angles.map((a, i) => {
        const cosA = Math.cos(a), sinA = Math.sin(a);
        const lx = cx + RL * cosA, ly = cy + RL * sinA;
        const anchor = Math.abs(cosA) < 0.2 ? 'middle' : cosA > 0 ? 'start' : 'end';
        const dy = sinA < -0.5 ? -2 : sinA > 0.5 ? 14 : 4;
        return (
          <g key={i}>
            <circle className="rv" r="3.5" fill="#F5F5F5" />
            <text x={lx} y={ly + dy} textAnchor={anchor} className={styles.glabel} fillOpacity="0.55">{labels[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── Engine diagram (Operations visual) — delta #3 ── */
function EngineDiagram() {
  const center = { x: 260, y: 180 };
  const nodes = [
    { x: 118, y: 88, label: 'LEADS' },
    { x: 402, y: 88, label: 'QUOTES' },
    { x: 118, y: 272, label: 'CLIENTS' },
    { x: 402, y: 272, label: 'PAYMENTS' },
  ];

  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const dots = svg.querySelectorAll<SVGCircleElement>('.pd');
    const halos = svg.querySelectorAll<SVGCircleElement>('.nh');
    const coreHalo = svg.querySelector('#sCoreHalo') as SVGCircleElement;
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const DUR = 1500, GAP = 420, start = performance.now();

    let raf: number;
    function f(now: number) {
      let cf = 0;
      nodes.forEach((n, i) => {
        let t = ((now - start - i * GAP) % (DUR + GAP)) / DUR;
        const d = dots[i], h = halos[i];
        if (t < 0 || t > 1) { d?.setAttribute('opacity', '0'); h?.setAttribute('fill-opacity', '0'); return; }
        const e = ease(t);
        d?.setAttribute('cx', String(n.x + (center.x - n.x) * e));
        d?.setAttribute('cy', String(n.y + (center.y - n.y) * e));
        d?.setAttribute('opacity', (t < 0.12 ? t / 0.12 : t > 0.9 ? (1 - t) / 0.1 : 1).toFixed(3));
        h?.setAttribute('fill-opacity', (t < 0.2 ? 0.18 * (1 - t / 0.2) : 0).toFixed(3));
        if (t > 0.88) cf = Math.max(cf, (t - 0.88) / 0.12);
      });
      coreHalo?.setAttribute('fill-opacity', (cf * 0.16).toFixed(3));
      raf = requestAnimationFrame(f);
    }
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg ref={ref} className={styles.svgv} viewBox="0 0 520 360">
      {nodes.map((n, i) => (
        <line key={i} x1={n.x} y1={n.y} x2={center.x} y2={center.y} stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.25" />
      ))}
      {nodes.map((_, i) => <circle key={i} className="pd" r="3.5" fill="#F5F5F5" opacity="0" />)}
      <circle id="sCoreHalo" cx="260" cy="180" r="34" fill="#F5F5F5" fillOpacity="0" />
      <circle cx="260" cy="180" r="20" fill="#F5F5F5" />
      {nodes.map((n, i) => (
        <g key={i}>
          <circle className="nh" cx={n.x} cy={n.y} r="16" fill="#F5F5F5" fillOpacity="0" />
          <circle cx={n.x} cy={n.y} r="7" fill="#1A1A1A" stroke="#F5F5F5" strokeWidth="1.75" />
          <text x={n.x} y={n.y < center.y ? n.y - 18 : n.y + 28} textAnchor="middle" className={styles.glabel} fillOpacity="0.6">{n.label}</text>
        </g>
      ))}
    </svg>
  );
}

const VISUALS = [BrandMock, BrowserMock, RadarChart, EngineDiagram];

/* ── Main component ── */
export default function WhatWeDoScroll() {
  const [active, setActive] = useState(0);
  const [headerIn, setHeaderIn] = useState(false);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeaderIn(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    if (headerRef.current) io.observe(headerRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 861px)');
    if (!mq.matches) return; // mobile: skip scroll listener entirely (cards-stack is pure CSS)

    let raf = 0;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = window.innerHeight / 2;
        let best = 0, bd = 1e9;
        blocksRef.current.forEach((b, i) => {
          if (!b) return;
          const r = b.getBoundingClientRect();
          const d = Math.abs(r.top + r.height / 2 - mid);
          if (d < bd) { bd = d; best = i; }
        });
        setActive(best);
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div ref={headerRef} className={`${styles.mhead} ${styles.reveal} ${headerIn ? styles.revealIn : ''}`}>
          <p className={styles.kicker}>What we do</p>
          <h2 className={styles.headline}>You know your business. We know how to build it.</h2>
          <p className={styles.subhead}>Everything it takes to look the part, win the work, and run it well — handled in one place.</p>
        </div>

        <div className={styles.cols}>
          <div className={styles.media}>
            {VISUALS.map((V, i) => (
              <div key={i} className={`${styles.mstage} ${active === i ? styles.mstageOn : ''}`}>
                <V />
              </div>
            ))}
          </div>
          <div>
            {PILLARS.map((p, i) => (
              <div
                key={i}
                ref={el => { blocksRef.current[i] = el; }}
                className={`${styles.block} ${active === i ? styles.blockOn : ''}`}
                style={{ zIndex: i + 1 }}
              >
                <p className={styles.eye}>{p.eye}</p>
                <h3 className={styles.stmt}>{p.stmt}</h3>
                <div className={styles.inlineVisual}>
                  {(() => { const V = VISUALS[i]; return <V />; })()}
                </div>
                <div className={styles.caps}>
                  {p.caps.map(([icon, label], ci) => (
                    <div key={ci} className={styles.cap}>
                      <Icon name={icon} />
                      <span className={styles.capLabel}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
