'use client';

import { useState } from 'react';

type Pillar = 'brand' | 'story' | 'growth' | 'build';

const pillars: { id: Pillar; name: string; body: string; caps: string[] }[] = [
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
    caps: ['Website copy', 'Sales decks', 'Case studies', 'Proposals', 'Email campaigns', 'Social content'],
  },
  {
    id: 'growth',
    name: 'Growth',
    body: "The difference between busy and booked. It's who you're for, why you're different, where they find you, and what gets them to call. We build the engine, run it with you, and pay attention to what's actually bringing in work versus what just feels like progress.",
    caps: ['Positioning', 'Pricing', 'Lead generation', 'Email marketing', 'Local SEO', 'Reviews & referrals', 'Event strategy'],
  },
  {
    id: 'build',
    name: 'Build',
    body: "Everything happening behind the scenes that makes the business run. The website that brings in jobs, the way you send quotes, collect payment, and keep track of customers without dropping the ball. We build it, wire it together, and teach you how to run it.",
    caps: ['Websites', 'Quoting tools', 'Invoicing & payments', 'Customer tracking', 'AI workflows', 'Automations', 'Internal dashboards'],
  },
];

const serif = 'var(--font-lora), Georgia, serif';
const sans = 'var(--font-geist), system-ui, sans-serif';
const mono = 'var(--font-ibm-plex-mono), monospace';

export default function WhatWeDo() {
  const [active, setActive] = useState<Pillar | null>('brand');
  const [lastActive, setLastActive] = useState<Pillar>('brand');

  const toggle = (p: Pillar) => {
    if (active === p) {
      setActive(null);
    } else {
      setActive(p);
      setLastActive(p);
    }
  };

  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px' }}>
      <h2 className="display" style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(36px, 4.2vw, 52px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: '#111113', marginBottom: 56, maxWidth: 800 }}>
        Where <em style={{ fontStyle: 'italic', fontWeight: 500 }}>art</em> meets <em style={{ fontStyle: 'italic', fontWeight: 500 }}>science.</em>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48, alignItems: 'start' }} className="md-grid">

        {/* Accordion */}
        <div style={{ borderTop: '1px solid #E2E2DD', order: 2 }} className="md-order-1">
          {pillars.map((p) => {
            const isOpen = active === p.id;
            return (
              <div key={p.id} style={{ borderBottom: '1px solid #E2E2DD' }}>
                <button
                  onClick={() => toggle(p.id)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', padding: isOpen ? '22px 0 12px' : '22px 0', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: sans, transition: 'padding 300ms' }}
                >
                  <span style={{ fontWeight: 600, fontSize: 19, color: '#111113', letterSpacing: '-0.012em' }}>{p.name}</span>
                  <span style={{ width: 18, height: 18, position: 'relative', flexShrink: 0 }}>
                    <span style={{ position: 'absolute', top: '50%', left: '50%', width: 13, height: 1.5, background: '#111113', transform: 'translate(-50%, -50%)' }} />
                    <span style={{ position: 'absolute', top: '50%', left: '50%', width: 1.5, height: 13, background: '#111113', transform: `translate(-50%, -50%) scaleY(${isOpen ? 0 : 1})`, transition: 'transform 300ms' }} />
                  </span>
                </button>
                <div style={{ overflow: 'hidden', maxHeight: isOpen ? 360 : 0, opacity: isOpen ? 1 : 0, paddingBottom: isOpen ? 28 : 0, transition: 'all 400ms' }}>
                  <p style={{ fontFamily: sans, fontWeight: 300, fontSize: 15, lineHeight: 1.6, color: '#1A1A1A', marginBottom: 20, maxWidth: 480 }}>{p.body}</p>
                  <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 13, lineHeight: 1.8, color: '#6B6B6B', maxWidth: 480 }}>
                    {p.caps.map((cap, i) => (
                      <span key={cap} style={{ display: 'inline-flex', alignItems: 'center' }}>
                        {cap}
                        {i < p.caps.length - 1 && <span style={{ margin: '0 14px', color: '#E2E2DD', fontWeight: 500 }}>·</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual frame */}
        <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', minHeight: 480, isolation: 'isolate', order: 1 }} className="md-order-2">

          {/* FUEGO / Brand */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, background: '#0F0F11', opacity: lastActive === 'brand' ? 1 : 0, zIndex: lastActive === 'brand' ? 10 : 0, pointerEvents: lastActive === 'brand' ? 'auto' : 'none', transition: 'opacity 500ms' }}>
            <div style={{ position: 'absolute', top: '38%', left: '50%', width: 380, height: 380, transform: 'translate(-50%, -50%)', pointerEvents: 'none', background: 'radial-gradient(circle, rgba(220,38,38,0.32) 0%, transparent 60%)' }} />
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, maxWidth: 340 }}>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Fuego · Fintech identity</div>
              <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(60px, 6.5vw, 84px)', lineHeight: 1, letterSpacing: '-0.035em', color: 'white' }}>Fuego</div>
              <div style={{ width: 250, height: 158, background: '#1a1a1d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 24px 60px rgba(220,38,38,0.15)' }}>
                <div style={{ width: 32, height: 24, border: '1px solid rgba(255,255,255,0.3)', borderRadius: 4 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 500, fontSize: 17, color: 'white', letterSpacing: '-0.02em' }}>Fuego</div>
                  <div style={{ fontFamily: mono, fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em' }}>•••• 4729</div>
                </div>
              </div>
            </div>
          </div>

          {/* STEVIE / Story */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, background: '#F5EFE4', opacity: lastActive === 'story' ? 1 : 0, zIndex: lastActive === 'story' ? 10 : 0, pointerEvents: lastActive === 'story' ? 'auto' : 'none', transition: 'opacity 500ms' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: 340, height: 340 }}>
              <div style={{ position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%) rotate(-2deg)', width: 270, background: 'white', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 10, padding: '30px 28px 26px', boxShadow: '0 24px 50px rgba(0,0,0,0.07)', zIndex: 20 }}>
                <div style={{ position: 'absolute', top: -14, right: -14, background: '#111113', color: 'white', borderRadius: '50%', width: 46, height: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 11, letterSpacing: '0.06em', zIndex: 30, transform: 'rotate(8deg)' }}>$12</div>
                <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#6B6B6B', marginBottom: 18 }}>Poem No. 047</div>
                <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 19, lineHeight: 1.35, color: '#111113', marginBottom: 20 }}>
                  &ldquo;She wasn&apos;t lost.<br />She was<br /><em>between maps.</em>&rdquo;
                </div>
                <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#6B6B6B' }}>— Stevie T.</div>
              </div>
              <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', background: 'white', border: '1px solid rgba(0,0,0,0.06)', padding: '8px 14px', borderRadius: 999, fontFamily: mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#1A1A1A', zIndex: 40 }}>Stevie&apos;s Poem Store</div>
            </div>
          </div>

          {/* LG / Growth */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, background: '#E6F4EF', opacity: lastActive === 'growth' ? 1 : 0, zIndex: lastActive === 'growth' ? 10 : 0, pointerEvents: lastActive === 'growth' ? 'auto' : 'none', transition: 'opacity 500ms' }}>
            <div style={{ width: '100%', maxWidth: 330, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Monthly inbound', value: '3.4×', trend: 'vs baseline' },
                { label: 'Local rank', value: '#1', trend: '3 keywords' },
                { label: 'Quote-to-close', value: '42%', trend: '+ 18 pts' },
              ].map((m) => (
                <div key={m.label} style={{ background: 'white', border: '1px solid rgba(0,0,0,0.05)', borderRadius: 10, padding: '14px 18px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 14 }}>
                  <div>
                    <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#6B6B6B', marginBottom: 4 }}>{m.label}</div>
                    <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 500, fontSize: 25, lineHeight: 1, color: '#111113', letterSpacing: '-0.02em' }}>{m.value}</div>
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 9, color: '#00A879', letterSpacing: '0.05em', textAlign: 'right' }}>↑ {m.trend}</div>
                </div>
              ))}
              <div style={{ background: '#111113', color: 'white', borderRadius: 10, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10, fontFamily: sans, fontSize: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>LG Flooring</span>
                <span>Tri-county metro</span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#14F0B5', marginLeft: 'auto', boxShadow: '0 0 8px #14F0B5' }} />
              </div>
            </div>
          </div>

          {/* MAMMOTH / Build */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, background: '#F2F1EC', opacity: lastActive === 'build' ? 1 : 0, zIndex: lastActive === 'build' ? 10 : 0, pointerEvents: lastActive === 'build' ? 'auto' : 'none', transition: 'opacity 500ms' }}>
            <div style={{ width: '100%', maxWidth: 350, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 10, overflow: 'hidden', boxShadow: '0 24px 50px rgba(0,0,0,0.05)' }}>
                <div style={{ padding: '11px 16px', borderBottom: '1px solid #EAE9E3', display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#E2E2DD' }} />
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#E2E2DD' }} />
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#E2E2DD' }} />
                  <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6B6B6B', marginLeft: 'auto' }}>Nautilus · Mammoth</span>
                </div>
                <div style={{ padding: '22px 22px 18px' }}>
                  <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.14em', color: '#6B6B6B', marginBottom: 6 }}>INV-MAM-024</div>
                  <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 500, fontSize: 38, color: '#111113', lineHeight: 1, marginBottom: 18, letterSpacing: '-0.025em' }}>$18,450</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                      ['Foundation pour', '$12,200'],
                      ['Materials', '$4,180'],
                      ['Labor (3 days)', '$2,070'],
                      ['Total', '$18,450'],
                    ].map(([label, amt], i, arr) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: sans, fontSize: 12, color: '#1A1A1A', padding: '9px 0', borderBottom: i < arr.length - 1 ? '1px solid #EAE9E3' : 'none', fontWeight: i === arr.length - 1 ? 500 : 400, paddingTop: i === arr.length - 1 ? 11 : 9 }}>
                        <span>{label}</span>
                        <span style={{ fontFamily: mono, fontSize: 11 }}>{amt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ background: '#111113', color: 'white', borderRadius: 10, padding: '12px 20px', fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#14F0B5', boxShadow: '0 0 8px #14F0B5' }} />
                Paid · in 4 days
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .md-grid { grid-template-columns: 1fr 1fr !important; }
          .md-order-1 { order: 1 !important; }
          .md-order-2 { order: 2 !important; }
        }
      `}</style>
    </section>
  );
}
