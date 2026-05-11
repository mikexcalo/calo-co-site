'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './WhatWeDo.module.css';

type Pillar = 'brand' | 'story' | 'growth' | 'build';

const PILLARS: { id: Pillar; name: string; body: string; caps: string[] }[] = [
  {
    id: 'brand',
    name: 'Brand',
    body: "What people say about you when you're not in the room. It's also what they see before they ever meet you — your website, your invoice, your truck, your business card. We build the foundation underneath all of it so everything you put out feels like the same company.",
    caps: ['Logo', 'Brand systems', 'Voice', 'Photo direction', 'Naming'],
  },
  {
    id: 'story',
    name: 'Story',
    body: "The reason someone picks you instead of the guy down the street. It's every place you make the case — the website, the pitch, the proposal. We figure out what your buyer actually needs to hear to say yes, and we build the thing that says it.",
    caps: ['Website copy', 'Sales decks', 'Case studies', 'Proposals', 'Email campaigns'],
  },
  {
    id: 'growth',
    name: 'Growth',
    body: "The difference between busy and booked. It's who you're for, why you're different, where they find you, and what gets them to call. We build the engine, run it with you, and pay attention to what's actually bringing in work versus what just feels like progress.",
    caps: ['Positioning', 'Pricing', 'Lead generation', 'Local SEO', 'Email marketing', 'Events'],
  },
  {
    id: 'build',
    name: 'Build',
    body: "Everything happening behind the scenes that makes the business run. The website that brings in jobs, the way you send quotes, collect payment, and keep track of customers without dropping the ball. We build it, wire it together, and teach you how to run it.",
    caps: ['Websites', 'Quoting tools', 'Invoicing & payments', 'Customer tracking', 'AI workflows'],
  },
];

const ICONS: Record<Pillar, React.ReactNode> = {
  brand: (
    <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="14"/>
      <circle cx="18" cy="18" r="2.5" fill="currentColor" stroke="none"/>
      <path d="M18 4 L20.5 18 L18 32 L15.5 18 Z" fill="currentColor"/>
      <path d="M4 18 L18 15.5 L32 18 L18 20.5 Z" opacity="0.4" fill="currentColor"/>
    </svg>
  ),
  story: (
    <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 8 C8 6 9 5 10.5 5 L25.5 5 C27 5 28 6 28 8 L28 26"/>
      <path d="M28 26 C28 28 27 29 25.5 29 L11 29 C9 29 8 28 8 26 L8 8"/>
      <line x1="12" y1="11" x2="24" y2="11"/>
      <line x1="12" y1="15" x2="24" y2="15"/>
      <line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="4" x2="18" y2="30"/>
      <path d="M18 6 C24 8 28 12 29 18 C26 19 22 19 18 18 Z" fill="currentColor" fillOpacity="0.12"/>
      <path d="M18 18 C22 20 26 22 28 26 C25 27 21 27 18 26 Z" fill="currentColor" fillOpacity="0.08"/>
      <line x1="10" y1="30" x2="26" y2="30"/>
    </svg>
  ),
  build: (
    <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="8" r="2.5"/>
      <line x1="18" y1="10.5" x2="18" y2="28"/>
      <line x1="13" y1="14" x2="23" y2="14"/>
      <path d="M8 22 C8 26 12 29 18 29 C24 29 28 26 28 22"/>
    </svg>
  ),
};

export default function WhatWeDo() {
  const [active, setActive] = useState<Pillar>('brand');
  const pillarRefs = useRef<Map<Pillar, HTMLDivElement | null>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-pillar') as Pillar;
            if (id) setActive(id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    pillarRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.split}>

        {/* LEFT: sticky headline + visual */}
        <div className={styles.visualCol}>
          <h2 className={`${styles.headline} display`}>
            Where <em>art</em> meets <em>science.</em>
          </h2>

          <div className={styles.visualWrap}>

            {/* BRAND — Fuego */}
            <div className={`${styles.vp} ${styles.vpFuego} ${active === 'brand' ? styles.active : ''}`}>
              <div className={styles.fuegoStage}>
                <div className={styles.fuegoLeft}>
                  <div className={styles.fuegoTag}>Fuego &middot; Fintech identity</div>
                  <div className={styles.fuegoMark}>Fuego</div>
                  <div className={styles.fuegoSwatches}>
                    <div className={styles.fuegoSw} style={{ background: '#DC2626' }} />
                    <div className={styles.fuegoSw} style={{ background: '#0F0F11' }} />
                    <div className={styles.fuegoSw} style={{ background: '#F5EFE4' }} />
                    <div className={styles.fuegoSw} style={{ background: '#1a1a1d' }} />
                  </div>
                </div>
                <div className={styles.fuegoCard}>
                  <div className={styles.fuegoChip} />
                  <div className={styles.fuegoCardBottom}>
                    <div className={styles.fuegoCardName}>Fuego</div>
                    <div className={styles.fuegoCardNum}>&bull;&bull;&bull;&bull; 4729</div>
                  </div>
                </div>
              </div>
            </div>

            {/* STORY — Stevie's */}
            <div className={`${styles.vp} ${styles.vpStevie} ${active === 'story' ? styles.active : ''}`}>
              <div className={styles.stevieStage}>
                <div className={styles.stevieCluster}>
                  <div className={styles.stevieCard}>
                    <div className={styles.steviePrice}>$12</div>
                    <div className={styles.stevieNum}>Poem No. 047</div>
                    <div className={styles.steviePoem}>
                      &ldquo;She wasn&rsquo;t lost.<br />She was<br /><em>between maps.</em>&rdquo;
                    </div>
                    <div className={styles.stevieAuthor}>&mdash; Stevie T.</div>
                  </div>
                </div>
                <div className={styles.stevieSide}>
                  <div className={styles.stevieSideLabel}>The case</div>
                  <div className={styles.stevieSideTitle}>A poem that pays the rent.</div>
                  <div className={styles.stevieTag}>Stevie&rsquo;s Poem Store</div>
                </div>
              </div>
            </div>

            {/* GROWTH — LG */}
            <div className={`${styles.vp} ${styles.vpLg} ${active === 'growth' ? styles.active : ''}`}>
              <div className={styles.lgStage}>
                <div className={styles.lgMetric}><div className={styles.lgmLabel}>Monthly inbound</div><div className={styles.lgmValue}>3.4&times;</div><div className={styles.lgmTrend}>vs baseline</div></div>
                <div className={styles.lgMetric}><div className={styles.lgmLabel}>Local rank</div><div className={styles.lgmValue}>#1</div><div className={styles.lgmTrend}>3 keywords</div></div>
                <div className={styles.lgMetric}><div className={styles.lgmLabel}>Quote-to-close</div><div className={styles.lgmValue}>42%</div><div className={styles.lgmTrend}>+ 18 pts</div></div>
                <div className={styles.lgMetric}><div className={styles.lgmLabel}>Avg ticket</div><div className={styles.lgmValue}>$8.4k</div><div className={styles.lgmTrend}>+ 22%</div></div>
                <div className={styles.lgPin}>
                  <span className={styles.lgpTag}>LG Flooring</span>
                  <span>Tri-county metro</span>
                  <span className={styles.lgpDot} />
                </div>
              </div>
            </div>

            {/* BUILD — Mammoth */}
            <div className={`${styles.vp} ${styles.vpMammoth} ${active === 'build' ? styles.active : ''}`}>
              <div className={styles.mammothStage}>
                <div className={styles.mammothWindow}>
                  <div className={styles.mwBar}>
                    <span className={styles.mwDot} /><span className={styles.mwDot} /><span className={styles.mwDot} />
                    <span className={styles.mwTitle}>Nautilus &middot; Mammoth</span>
                  </div>
                  <div className={styles.mwBody}>
                    <div className={styles.mwInvoiceNum}>INV-MAM-024</div>
                    <div className={styles.mwAmount}>$18,450</div>
                    <div className={styles.mwRow}><span>Foundation pour</span><span className={styles.mwRowAmt}>$12,200</span></div>
                    <div className={styles.mwRow}><span>Materials</span><span className={styles.mwRowAmt}>$4,180</span></div>
                    <div className={styles.mwRow}><span>Labor (3 days)</span><span className={styles.mwRowAmt}>$2,070</span></div>
                    <div className={styles.mwRow}><span>Total</span><span className={styles.mwRowAmt}>$18,450</span></div>
                  </div>
                </div>
                <div className={styles.mwSide}>
                  <div className={styles.mwStatus}>Paid &middot; in 4 days</div>
                  <div className={styles.mwNote}>Auto-tracked<br />in Nautilus</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT: scrolling pillar list */}
        <div className={styles.pillars}>
          {PILLARS.map((p) => (
            <div
              key={p.id}
              ref={(el) => { pillarRefs.current.set(p.id, el); }}
              data-pillar={p.id}
              className={`${styles.pillar} ${active === p.id ? styles.active : ''}`}
            >
              <div className={styles.pillarHead}>
                <span className={styles.pillarIcon}>{ICONS[p.id]}</span>
                <h3 className={`${styles.pillarName} display`}>{p.name}</h3>
              </div>
              <p className={styles.pillarText}>{p.body}</p>
              <div className={styles.pillarCaps}>
                {p.caps.map((cap, i) => (
                  <span key={cap}>
                    {cap}{i < p.caps.length - 1 && <em className={styles.pillarCapsSep}> &middot; </em>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
