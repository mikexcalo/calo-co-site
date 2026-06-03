'use client';
import { useState, useEffect, useRef } from 'react';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap');
.mc-root{--bg:#F6F4EF;--ink:#1C1B19;--mid:rgba(28,27,25,0.74);--soft:rgba(28,27,25,0.5);--line:rgba(28,27,25,0.13);--sans:'Geist',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--ink);font-family:var(--sans);font-weight:300;line-height:1.55;min-height:100vh;-webkit-font-smoothing:antialiased;transition:background .4s,color .4s}
.mc-root.dark{--bg:#1C1B19;--ink:#F6F4EF;--mid:rgba(246,244,239,0.72);--soft:rgba(246,244,239,0.48);--line:rgba(246,244,239,0.15)}
.mc-root *{margin:0;padding:0;box-sizing:border-box}
.mc-root{scroll-behavior:smooth}
.mc-theme{position:fixed;top:18px;right:22px;z-index:60;width:38px;height:38px;border:1px solid var(--line);border-radius:50%;background:var(--bg);color:var(--ink);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:border-color .2s}
.mc-theme:hover{border-color:var(--soft)}
.mc-shell{display:grid;grid-template-columns:290px 1fr;min-height:100vh;max-width:1500px;margin:0 auto}
@media(max-width:880px){.mc-shell{grid-template-columns:1fr}}
.mc-rail{border-right:1px solid var(--line);padding:48px 42px;display:flex;flex-direction:column;position:sticky;top:0;height:100vh}
@media(max-width:880px){.mc-rail{position:static;height:auto;border-right:none;border-bottom:1px solid var(--line)}}
.mc-avatar{width:46px;height:46px;border-radius:50%;object-fit:cover;margin-bottom:28px;display:block}
.mc-name{font-weight:600;font-size:40px;line-height:1.02;letter-spacing:-.025em}
.mc-role{font-size:12px;letter-spacing:.04em;color:var(--soft);margin-top:14px;line-height:1.55}
.mc-nav{margin-top:auto;display:flex;flex-direction:column;gap:13px}
.mc-nav a{color:var(--ink);text-decoration:none;font-size:16px;opacity:.85;transition:opacity .2s,padding-left .2s}
.mc-nav a:hover{opacity:1;padding-left:6px}
.mc-social{margin-top:30px}
.mc-social a{color:var(--soft);font-size:13px;text-decoration:none;transition:color .2s}
.mc-social a:hover{color:var(--ink)}
.mc-main{padding:0 60px 110px}
@media(max-width:880px){.mc-main{padding:0 26px 70px}}
.mc-pillbar{position:sticky;top:0;z-index:20;display:flex;justify-content:center;padding:20px 0 12px;background:linear-gradient(var(--bg) 72%,transparent)}
.mc-pills{display:inline-flex;border:1px solid var(--line);border-radius:999px;padding:4px;gap:2px;background:var(--bg)}
.mc-pills button{font-family:inherit;font-size:14px;color:var(--soft);background:none;border:none;padding:7px 15px;border-radius:999px;cursor:pointer;transition:all .25s}
.mc-pills button.active{color:var(--ink);border:1px solid var(--line)}
.mc-pills button:hover{color:var(--ink)}
.mc-root section{padding-top:30px;scroll-margin-top:74px}
.mc-label{font-size:12px;letter-spacing:.13em;text-transform:uppercase;color:var(--soft);margin-bottom:22px;font-weight:500}
.mc-hook{font-weight:500;font-size:30px;line-height:1.22;letter-spacing:-.02em;max-width:20ch}
@media(max-width:880px){.mc-hook{font-size:25px}}
.mc-bio{font-size:17px;max-width:60ch;margin-top:24px}
.mc-bio p{margin-bottom:15px}
.mc-org{margin-bottom:26px}
.mc-orghead{display:flex;align-items:center;gap:11px;margin-bottom:5px}
.mc-logo{width:26px;height:26px;border-radius:6px;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:500;flex-shrink:0;overflow:hidden}
.mc-logo img{width:100%;height:100%;object-fit:contain}
.mc-orgname{font-size:18px;font-weight:600;letter-spacing:-.01em}
.mc-q{position:relative;display:inline-flex;align-items:center;justify-content:center;width:15px;height:15px;border:1px solid var(--line);border-radius:50%;font-size:9px;color:var(--soft);cursor:help;flex-shrink:0}
.mc-q:hover{color:var(--ink);border-color:var(--soft)}
.mc-tip{position:absolute;left:0;top:150%;transform:translateY(4px);background:var(--ink);color:var(--bg);font-size:12.5px;font-weight:300;line-height:1.45;padding:9px 12px;border-radius:8px;width:250px;opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;z-index:40;box-shadow:0 8px 22px rgba(0,0,0,.16)}
.mc-q:hover .mc-tip,.mc-q:focus-within .mc-tip{opacity:1;transform:translateY(0)}
.mc-tip:before{content:'';position:absolute;bottom:100%;left:9px;border:5px solid transparent;border-bottom-color:var(--ink)}
.mc-row{position:relative;display:flex;align-items:baseline;gap:12px;width:100%;background:none;border:none;cursor:pointer;text-align:left;font-family:inherit;padding:7px 0 7px 37px;transition:color .2s}
.mc-tog{position:absolute;left:5px;top:7px;width:19px;height:19px;border:1px solid var(--line);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;line-height:1;color:var(--soft);transition:all .2s}
.mc-row:hover .mc-tog{border-color:var(--soft);color:var(--ink)}
.mc-row.open .mc-tog{border-color:var(--ink);color:var(--ink)}
.mc-pos{font-size:15px;white-space:nowrap;color:var(--mid)}
.mc-row:hover .mc-pos{color:var(--ink)}
.mc-dots{flex:1;border-bottom:1px dotted var(--line);transform:translateY(-4px);min-width:24px}
.mc-yr{font-size:13px;color:var(--soft);white-space:nowrap;letter-spacing:.02em;font-variant-numeric:tabular-nums}
.mc-panel{max-height:0;overflow:hidden;transition:max-height .45s ease}
.mc-panel.open{max-height:640px}
.mc-panel ul{padding:2px 0 14px 37px}
.mc-panel li{font-size:14.5px;color:var(--mid);margin-bottom:9px;list-style:none;position:relative;padding-left:20px;max-width:70ch;line-height:1.5}
.mc-panel li:before{content:'';position:absolute;left:0;top:11px;width:9px;height:1px;background:var(--soft)}
.mc-rule{height:1px;background:var(--line);margin:44px 0 0}
.mc-contact{font-size:26px;font-weight:500;letter-spacing:-.01em;margin-top:6px}
.mc-contact a{color:var(--ink);text-decoration:none;border-bottom:1px solid var(--ink)}
.mc-contact a:hover{opacity:.6}
.mc-foot{font-size:12px;color:var(--soft);margin-top:64px;letter-spacing:.02em}
`;

const ORGS = [
  { logo:{img:'/logos/fourth.png'}, name:'Fourth (HotSchedules)', tip:'Workforce and operations software for restaurants and hospitality — scheduling, labor, and back-office management.', roles:[
    { title:'Head of Product Marketing', dates:'2024 — Present', bullets:[
      'Rebuilt the product marketing function from the ground up, re-establishing positioning, launch, and enablement as the engine connecting product, sales, and customers.',
      'Architected the U.S. go-to-market for Fourth iQ, positioning the company as a category leader in AI-driven restaurant technology.',
      'Created "Built for the Hustle," the company\'s first YouTube brand campaign — 24M+ impressions at a $0.063 CPC (67% below benchmark), a +245% branded-search spike, and a +22pp traffic lift in targeted markets.',
      'Designed a promotional monetization program that generated $2M in new ARR across 162 deals, returning $4.60 for every dollar comped.',
      'Drove 7x year-over-year bookings on a FinTech product line, lifting win rates from 10% to 78% through sharper messaging, enablement, and offer design.',
      'Leading the shift to product-led growth and a company-wide AI transformation, applying GTM rigor to how the business plans, ships, and sells.' ]},
    { title:'Senior Product Marketing Lead', dates:'2022 — 2024', bullets:[
      'Owned go-to-market for the payments and FinTech ecosystem while leading rebranding and ABM across the enterprise product line.',
      'Coordinated positioning and launches across overlapping FinTech and enterprise lines, each with its own audience and sales motion.',
      'Built the enablement backbone — battle cards, pitch decks, and collateral — that simplified complex conversations and shortened enterprise deal cycles.' ]},
  ]},
  { logo:{text:'CC'}, name:'CALO&CO', tip:'Boutique growth and creative studio based in Portland, Maine.', roles:[
    { title:'Founder', dates:'2024 — Present', bullets:[
      'Founded an independent growth and creative studio, partnering with small and mid-sized businesses on brand, positioning, and go-to-market.' ]},
  ]},
  { logo:{img:'/logos/crunchtime.png'}, name:'Crunchtime', tip:'Operations-management software for multi-unit restaurants — inventory, labor, and food-cost control.', roles:[
    { title:'Senior Product Marketing Manager', dates:'2021 — 2022', bullets:[
      'Joined as the first product marketing hire and built the discipline from scratch — personas, competitive intelligence, and the enablement frameworks the sales team came to rely on.',
      'Repositioned the legacy portfolio, cutting sales cycles roughly 20% and lifting win rates about 15%.',
      'Launched the company\'s first e-book and caselet series, driving inbound engagement 200% above prior benchmarks.' ]},
  ]},
  { logo:{img:'/logos/state-street.jpg'}, name:'State Street', tip:'Global financial-services firm and one of the world\'s largest asset managers and custodian banks.', roles:[
    { title:'Senior Demand Generation Marketing Manager', dates:'2019 — 2021', bullets:[
      'Ran paid and organic social for the firm\'s ETF portfolios, partnering with creative and content on full-funnel digital campaigns.',
      'Turned complex financial products into demand-generating programs that lifted engagement and qualified leads.' ]},
  ]},
  { logo:{img:'/logos/liberty-mutual.png'}, name:'Liberty Mutual', tip:'One of the largest property-and-casualty insurance companies in the United States.', roles:[
    { title:'Partnerships & Field Marketing Manager', dates:'2016 — 2018', bullets:[
      'Designed and launched a scalable field-marketing program for partner dealerships, with a performance leaderboard and incentive structure built to expand.',
      'Ran email and direct-mail programs for strategic partners across the connected-home and insurance verticals.' ]},
  ]},
  { logo:{img:'/logos/edx.png'}, name:'edX', tip:'Online learning platform offering university-level courses, originally founded by Harvard and MIT.', roles:[
    { title:'Product Marketing Specialist', dates:'2015 — 2017', bullets:[
      'Owned marketing for the website and course catalog, A/B testing listings to lift engagement and conversion.',
      'Shaped positioning and go-to-market for the MicroMasters program launch.',
      'Built the affiliate partner program from zero to 55+ partners in its first year.' ]},
  ]},
  { logo:{img:'/logos/dell.png'}, name:'EMC (Dell)', tip:'Enterprise data-storage and cloud-infrastructure company, now part of Dell Technologies.', roles:[
    { title:'Product Marketing Rotational Program', dates:'2013 — 2015', bullets:[
      'Delivered sales enablement for early-stage cloud and big-data products, supporting adoption across a global sales force.',
      'Partnered across product, channel, and field teams to align messaging with the sales motion.' ]},
  ]},
  { logo:{img:'/logos/boston-college.svg'}, name:'Boston College', tip:'Private research university near Boston; the Carroll School of Management is its business school.', roles:[
    { title:'B.S. Business Administration (Marketing) \u00b7 Minor: History', dates:'2013', bullets:[
      'Studied marketing at the Carroll School of Management, with a minor in History.' ]},
  ]},
];

export default function MikeCalo(){
  const [dark,setDark]=useState(false);
  const [open,setOpen]=useState<Record<string,boolean>>({});
  const [active,setActive]=useState('intro');
  const ids=['intro','experience','contact'];
  useEffect(()=>{
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setActive(e.target.id);}),{rootMargin:'-45% 0px -50% 0px'});
    ids.forEach(id=>{const el=document.getElementById(id);if(el)io.observe(el);});
    return()=>io.disconnect();
  },[]);
  const go=(id: string)=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});
  const toggle=(k: string)=>setOpen(o=>({...o,[k]:!o[k]}));
  return (
    <div className={'mc-root'+(dark?' dark':'')}>
      <style dangerouslySetInnerHTML={{__html:CSS}}/>
      <button className="mc-theme" onClick={()=>setDark(d=>!d)} aria-label="Toggle theme">
        {dark
          ? <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><line x1="6" y1="21" x2="18" y2="16"/><line x1="6" y1="16" x2="18" y2="21"/></g><path d="M12 2.6C8.1 2.6 5 5.3 5 8.7c0 2 1 3.8 2.6 4.9.3.2.5.6.5 1v1.1c0 .5.4.9.9.9h.6v-1.7h.9v1.7h.9v-1.7h.9v1.7h.9v-1.7h.9v1.7h.6c.5 0 .9-.4.9-.9v-1.1c0-.4.2-.8.5-1C18 12.5 19 10.7 19 8.7c0-3.4-3.1-6.1-7-6.1z"/><circle cx="9.4" cy="9" r="1.7" fill="var(--bg)"/><circle cx="14.6" cy="9" r="1.7" fill="var(--bg)"/></svg>
          : <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3.8"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4"/></svg>}
      </button>
      <div className="mc-shell">
        <aside className="mc-rail">
          <img className="mc-avatar" src="/mike-headshot-square.jpg" alt="Mike Calo"/>
          <div className="mc-name">Mike<br/>Calo</div>
          <div className="mc-role">GTM Strategist<br/>Product Marketing Leader</div>
          <nav className="mc-nav">
            <a onClick={()=>go('intro')}>Intro</a>
            <a onClick={()=>go('experience')}>Experience</a>
            <a onClick={()=>go('contact')}>Contact</a>
          </nav>
          <div className="mc-social"><a href="https://linkedin.com/in/mikecalo" target="_blank" rel="noopener">LinkedIn</a></div>
        </aside>
        <main className="mc-main">
          <div className="mc-pillbar"><div className="mc-pills">
            {ids.map(id=><button key={id} className={active===id?'active':''} onClick={()=>go(id)}>{id[0].toUpperCase()+id.slice(1)}</button>)}
          </div></div>

          <section id="intro">
            <h1 className="mc-hook">I help great products win the markets they deserve.</h1>
            <div className="mc-bio">
              <p>Product marketing and go-to-market leader with 13+ years turning products into categories — across SaaS, FinTech, and enterprise, from SMB to the enterprise floor.</p>
              <p>Today I lead Product Marketing &amp; GTM Strategy at Fourth, where I rebuilt the function and own launches, monetization, and the shift toward product-led growth and AI-native GTM. Based in Portland, Maine.</p>
            </div>
          </section>

          <div className="mc-rule"/>

          <section id="experience">
            <div className="mc-label">Experience</div>
            {ORGS.map((org,oi)=>(
              <div className="mc-org" key={oi}>
                <div className="mc-orghead">
                  <div className="mc-logo">{org.logo.img?<img src={org.logo.img} alt={org.name}/>:org.logo.text}</div>
                  <div className="mc-orgname">{org.name}</div>
                  <span className="mc-q" tabIndex={0}>?<span className="mc-tip">{org.tip}</span></span>
                </div>
                {org.roles.map((r,ri)=>{const k=oi+'-'+ri;const isOpen=!!open[k];return(
                  <div key={k}>
                    <button className={'mc-row'+(isOpen?' open':'')} aria-expanded={isOpen} onClick={()=>toggle(k)}>
                      <span className="mc-tog">{isOpen?'\u2212':'+'}</span>
                      <span className="mc-pos">{r.title}</span><span className="mc-dots"/><span className="mc-yr">{r.dates}</span>
                    </button>
                    <div className={'mc-panel'+(isOpen?' open':'')}><ul>{r.bullets.map((b,bi)=><li key={bi}>{b}</li>)}</ul></div>
                  </div>
                );})}
              </div>
            ))}
          </section>

          <div className="mc-rule"/>

          <section id="contact">
            <div className="mc-label">Contact</div>
            <p className="mc-contact">Let&apos;s talk. <a href="mailto:mikexcalo@gmail.com">mikexcalo@gmail.com</a></p>
            <div className="mc-foot">&copy; Mike Calo &middot; Portland, Maine</div>
          </section>
        </main>
      </div>
    </div>
  );
}
