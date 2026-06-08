'use client';
import { useState, useEffect, useRef } from 'react';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap');
.mc-root{--bg:#F6F4EF;--ink:#1C1B19;--mid:#1C1B19;--soft:#1C1B19;--line:rgba(28,27,25,0.13);--chip:rgba(28,27,25,0.06);--chip-h:rgba(28,27,25,0.12);--sans:'Geist',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--ink);font-family:var(--sans);font-weight:300;line-height:1.55;min-height:100vh;-webkit-font-smoothing:antialiased;transition:background .4s,color .4s}
.mc-root.dark{--bg:#1C1B19;--ink:#F6F4EF;--mid:#F6F4EF;--soft:#F6F4EF;--line:rgba(246,244,239,0.15);--chip:rgba(246,244,239,0.10);--chip-h:rgba(246,244,239,0.18)}
.mc-root *{margin:0;padding:0;box-sizing:border-box}
.mc-root{scroll-behavior:smooth}
.mc-theme{position:fixed;top:18px;right:22px;z-index:60;width:38px;height:38px;border:1px solid var(--line);border-radius:50%;background:var(--bg);color:var(--ink);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:border-color .2s}
.mc-theme:hover{border-color:var(--soft)}
.mc-shell{display:grid;grid-template-columns:290px 1fr;min-height:100vh;max-width:1500px;margin:0 auto}
@media(max-width:880px){.mc-shell{grid-template-columns:1fr}}
.mc-rail{border-right:1px solid var(--line);padding:48px 42px;display:flex;flex-direction:column;position:sticky;top:0;height:100vh}
@media(max-width:880px){.mc-rail{position:static;height:auto;border-right:none;border-bottom:1px solid var(--line)}}
.mc-avatar{width:124px;height:124px;border-radius:50%;object-fit:cover;margin-bottom:22px;display:block}
.mc-name{font-weight:600;font-size:40px;line-height:1.02;letter-spacing:-.025em}
.mc-role{font-size:12px;letter-spacing:.04em;color:var(--soft);margin-top:14px;line-height:1.55}
.mc-nav{margin-top:34px;display:flex;flex-direction:column;gap:13px}
.mc-nav a{color:var(--ink);text-decoration:none;font-size:16px;opacity:.85;transition:opacity .2s,padding-left .2s}
.mc-nav a:hover{opacity:1;padding-left:6px}
.mc-social{margin-top:18px}
.mc-social a{display:inline-flex;align-items:center;color:var(--ink);text-decoration:none;transition:opacity .2s}
.mc-social a:hover{opacity:.6}
.mc-main{padding:40px 60px 110px}
@media(max-width:880px){.mc-main{padding:0 26px 70px}}
.mc-pillbar{position:sticky;top:0;z-index:20;display:flex;justify-content:center;padding:20px 0 12px;background:linear-gradient(var(--bg) 72%,transparent)}
.mc-pills{display:inline-flex;border:1px solid var(--line);border-radius:999px;padding:4px;gap:2px;background:var(--bg)}
.mc-pills button{font-family:inherit;font-size:14px;color:var(--soft);background:none;border:none;padding:7px 15px;border-radius:999px;cursor:pointer;transition:all .25s}
.mc-pills button.active{color:var(--ink);border:1px solid var(--line)}
.mc-pills button:hover{color:var(--ink)}
.mc-root section{padding-top:30px;scroll-margin-top:74px}
.mc-label{font-size:12px;letter-spacing:.13em;text-transform:uppercase;color:var(--soft);margin-bottom:22px;font-weight:500}
.mc-hook{font-weight:500;font-size:28px;line-height:1.22;letter-spacing:-.02em;max-width:none;white-space:nowrap}
@media(max-width:880px){.mc-hook{white-space:normal;font-size:24px}}
.mc-rot{display:inline-block}
.mc-rot > span{display:inline-block;transition:opacity .35s ease, transform .35s ease}
.mc-rot.swap > span{opacity:0;transform:translateY(-8px)}
@media(max-width:880px){.mc-hook{font-size:25px}}
.mc-bio{font-size:17px;max-width:60ch;margin-top:24px}
.mc-bio p{margin-bottom:15px}
.mc-subhead{font-size:20px;font-weight:400;color:var(--ink);letter-spacing:-.01em;margin-top:18px}
.mc-bio a{color:var(--ink);text-decoration:none;background:var(--chip);border-radius:6px;padding:1px 7px;transition:background .2s;white-space:nowrap}
.mc-bio a:hover{background:var(--chip-h)}
.mc-journey{font-size:13px;color:var(--soft);letter-spacing:.02em;margin-top:22px;line-height:1.5}
.mc-journey .arrow{color:var(--soft);opacity:.6;padding:0 4px}
.mc-org{margin-bottom:26px}
.mc-orghead{display:flex;align-items:center;gap:11px;margin-bottom:5px}
.mc-logo{width:26px;height:26px;border-radius:6px;border:none;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:500;flex-shrink:0;overflow:hidden}
.mc-logo img{width:100%;height:100%;object-fit:contain}
.mc-orgname{font-size:18px;font-weight:600;letter-spacing:-.01em}
.mc-q{position:relative;display:inline-flex;align-items:center;justify-content:center;width:15px;height:15px;border:1px solid var(--line);border-radius:50%;font-size:9px;color:var(--soft);cursor:help;flex-shrink:0}
.mc-q:hover{color:var(--ink);border-color:var(--soft)}
.mc-tip{position:absolute;left:0;top:150%;transform:translateY(4px);background:var(--ink);color:var(--bg);font-size:12.5px;font-weight:300;line-height:1.45;padding:9px 12px;border-radius:8px;width:250px;opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;z-index:40;box-shadow:0 8px 22px rgba(0,0,0,.16)}
.mc-q:hover .mc-tip,.mc-q:focus-within .mc-tip{opacity:1;transform:translateY(0)}
.mc-tip:before{content:'';position:absolute;bottom:100%;left:9px;border:5px solid transparent;border-bottom-color:var(--ink)}
.mc-row{position:relative;display:flex;align-items:baseline;gap:12px;width:100%;background:none;border:none;cursor:pointer;text-align:left;font-family:inherit;padding:7px 0 7px 37px;transition:color .2s}
.mc-tog{position:absolute;left:5px;top:7px;width:19px;height:19px;border:none;display:flex;align-items:center;justify-content:center;font-size:17px;line-height:1;color:var(--soft);transition:all .2s}
.mc-row:hover .mc-tog{border-color:var(--soft);color:var(--ink)}
.mc-row.open .mc-tog{border-color:var(--ink);color:var(--ink)}
.mc-pos{font-size:15px;white-space:nowrap;color:var(--mid)}
.mc-row:hover .mc-pos{color:var(--ink)}
.mc-dots{flex:1;border-bottom:1px dotted var(--line);transform:translateY(-4px);min-width:24px}
.mc-yr{font-size:13px;color:var(--soft);white-space:nowrap;letter-spacing:.02em;font-variant-numeric:tabular-nums}
.mc-panel{max-height:0;overflow:hidden;transition:max-height .45s ease}
.mc-panel.open{max-height:1300px}
.mc-panel ul{padding:2px 0 14px 37px}
.mc-panel li{font-size:14.5px;color:var(--mid);margin-bottom:9px;list-style:none;position:relative;padding-left:20px;max-width:70ch;line-height:1.5}
.mc-panel li:before{content:'';position:absolute;left:2px;top:8px;width:4px;height:4px;border-radius:50%;background:var(--ink)}
.mc-group{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--soft);font-weight:400;margin:24px 0 10px 0}
.mc-group:first-child{margin-top:18px}
.mc-quotes{display:grid;grid-template-columns:1fr 1fr;gap:42px 54px}
@media(max-width:880px){.mc-quotes{grid-template-columns:1fr;gap:34px}}
.mc-qt{font-size:18px;line-height:1.5;color:var(--ink)}
.mc-qc{margin-top:14px;font-size:13.5px;color:var(--ink)}
.mc-qc b{font-weight:500}
.mc-quote-card{display:flex;flex-direction:column;gap:16px}
.mc-quote-person{display:flex;align-items:center;gap:12px}
.mc-quote-photo{width:46px;height:46px;border-radius:50%;object-fit:cover;flex-shrink:0}
.mc-quote-who{display:flex;flex-direction:column;line-height:1.4}
.mc-quote-name{font-size:15px;font-weight:500;color:var(--ink)}
.mc-quote-role{font-size:13px;color:var(--soft)}
.mc-video{width:100%;aspect-ratio:16/9;border-radius:12px;overflow:hidden;background:#1C1B19}
.mc-video video{width:100%;height:100%;object-fit:cover;display:block}
.mc-vmeta{display:flex;flex-direction:column;align-items:flex-start;margin-top:16px}
.mc-vtitle{font-size:24px;font-weight:500;letter-spacing:-.01em}
.mc-vsub{font-size:15px;color:var(--ink);line-height:1.5;margin-top:8px;max-width:34ch}
.mc-vcap{font-size:14px;color:var(--ink)}
.mc-vlink{font-size:14px;color:var(--ink);text-decoration:none;border-bottom:1px solid var(--ink);white-space:nowrap}
.mc-vlink:hover{opacity:.6}
.mc-music{display:flex;flex-direction:column;align-items:flex-start;gap:0}
.mc-music-cover{width:100%;aspect-ratio:1.317;height:auto;border-radius:12px;object-fit:cover;display:block}
.mc-music-meta{display:flex;flex-direction:column;min-width:0}
.mc-music-t{font-size:22px;font-weight:500;letter-spacing:-.01em;margin-top:16px}
.mc-music-n{font-size:15px;color:var(--ink);line-height:1.5;margin-top:8px;max-width:34ch}
.mc-listen{display:inline-flex;align-items:center;gap:9px;align-self:flex-start;background:var(--ink);color:var(--bg);font-size:14px;border:none;border-radius:999px;padding:10px 18px;cursor:pointer;font-family:inherit;text-decoration:none;margin-top:16px;white-space:nowrap}
.mc-listen:hover{opacity:.85}
.mc-listen:before{content:'';border-left:9px solid currentColor;border-top:6px solid transparent;border-bottom:6px solid transparent}
@media(max-width:880px){.mc-music-cover{max-width:200px}}
.mc-feature-row{display:grid;grid-template-columns:1.35fr 1fr;gap:48px;align-items:start}
@media(max-width:880px){.mc-feature-row{grid-template-columns:1fr;gap:40px}}
.mc-rule{height:1px;background:var(--line);margin:44px 0 0}
.mc-contact{font-size:26px;font-weight:500;letter-spacing:-.01em;margin-top:6px}
.mc-contact a{color:var(--ink);text-decoration:none;border-bottom:1px solid var(--ink)}
.mc-contact a:hover{opacity:.6}
.mc-contactrow{display:flex;align-items:center;gap:24px;flex-wrap:wrap}
.mc-btnrow{display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.mc-btn{display:inline-flex;align-items:center;gap:9px;font-family:inherit;font-size:14.5px;border-radius:999px;padding:11px 20px;cursor:pointer;text-decoration:none;transition:all .18s;white-space:nowrap;border:1px solid var(--ink);background:transparent;color:var(--ink)}
.mc-btn.primary{background:var(--ink);color:var(--bg)}
.mc-btn.primary:hover{opacity:.85}
.mc-btn.outline:hover{background:var(--ink);color:var(--bg)}
.mc-btn.ghost{border-color:var(--line)}
.mc-btn.ghost:hover{border-color:var(--ink)}
.mc-btn .ico{width:16px;height:16px;display:block}
.mc-foot{font-size:12px;color:var(--soft);margin-top:64px;letter-spacing:.02em}
`;

type Role =
  | { title: string; dates: string; bullets: string[] }
  | { title: string; dates: string; groups: { label: string; bullets: string[] }[] };
type Org = { logo: { img?: string; text?: string }; name: string; tip: string; roles: Role[] };

const ROLES = ["a leader","a strategist","a marketer","a designer","a product engineer","a founder","a creator","an artist","an entrepreneur","a former chef","a dad","a world football fan"];

const ORGS: Org[] = [
  { logo:{img:'/logos/fourth.png'}, name:'Fourth (HotSchedules)', tip:'Workforce and operations software for restaurants and hospitality: scheduling, labor, and back-office management.', roles:[
    { title:'Director, Product Marketing & GTM Strategy', dates:'2024 \u2014 Present', groups:[
      { label:'Product Marketing', bullets:[
        'Rebuilt the product marketing function from the ground up and run its full craft \u2014 positioning, messaging, product narrative, launch, sales enablement, and competitive intelligence \u2014 as the connective tissue between product, sales, and customers.',
        'Launched Fourth iQ and architected its U.S. go-to-market, establishing the company as a category leader in AI-driven restaurant technology.',
        'Created \u201CBuilt for the Hustle,\u201D the company\u2019s first YouTube brand campaign: 24M+ impressions at a $0.063 CPC (67% below industry benchmark), a 245% lift in branded search, and 12,000+ high-intent site visits.',
        'Built AI-native tooling to run the function at scale \u2014 from competitive-intelligence systems to an automated collateral and brochure builder \u2014 turning slow, manual PMM work into fast, on-brand, repeatable engines.',
      ]},
      { label:'GTM Strategy', bullets:[
        'Built a promotional monetization program that produced $2M in new ARR across 162 deals, returning $4.60 for every $1 invested and $1.1M in ARR above baseline.',
        'Grew a FinTech product line 7x year over year and lifted win rates from 10% to 78% through sharper messaging, enablement, and offer design.',
        'Secured official partner status with Square and architected the joint go-to-market promotional strategy to penetrate the food-and-beverage segment.',
        'Consolidated fragmented SMB offerings into unified pricing and packaging, and is leading the shift to product-led growth and AI-native GTM.',
      ]},
    ]},
    { title:'Senior Product Marketing Lead', dates:'2022 \u2014 2024', bullets:[
      'Owned go-to-market for the payments and FinTech ecosystem while directing rebranding and ABM across the enterprise product line.',
      'Coordinated positioning and launches across overlapping FinTech and enterprise lines, each with a distinct audience and sales motion.',
      'Built the enablement system of battle cards, pitch decks, and collateral that simplified complex deals and shortened enterprise sales cycles.' ]},
  ]},
  { logo:{text:'CC'}, name:'CALO&CO', tip:'Boutique growth and creative studio based in Portland, Maine.', roles:[
    { title:'Founder', dates:'2023 \u2014 Present', bullets:[
      'Founded an independent growth and creative studio, partnering with small and mid-sized businesses on brand, positioning, and go-to-market.' ]},
  ]},
  { logo:{img:'/logos/crunchtime.png'}, name:'Crunchtime', tip:'Operations-management software for multi-unit restaurants: inventory, labor, and food-cost control.', roles:[
    { title:'Senior Product Marketing Manager', dates:'2021 \u2014 2022', bullets:[
      'Joined as the first product marketing hire and built the entire discipline from scratch, defining personas, competitive battle cards, and the enablement frameworks the sales team still runs on.',
      'Repositioned the legacy portfolio, cutting sales cycles roughly 20% and lifting win rates about 15%.',
      'Authored the company\u2019s first e-book and caselet series, driving inbound engagement 200% above prior benchmarks.' ]},
  ]},
  { logo:{img:'/logos/state-street.jpg'}, name:'State Street', tip:'Global financial-services firm and one of the world\u2019s largest asset managers and custodian banks.', roles:[
    { title:'Senior Demand Generation Marketing Manager', dates:'2019 \u2014 2021', bullets:[
      'Ran paid and organic social for the firm\u2019s ETF portfolios, partnering with creative and content on full-funnel digital campaigns.',
      'Turned complex financial products into demand-generation programs that grew engagement and qualified pipeline.' ]},
  ]},
  { logo:{img:'/logos/liberty-mutual.png'}, name:'Liberty Mutual', tip:'One of the largest property-and-casualty insurance companies in the United States.', roles:[
    { title:'Partnerships & Field Marketing Manager', dates:'2016 \u2014 2018', bullets:[
      'Built and launched a scalable field-marketing program for partner dealerships, including a performance leaderboard and incentive structure designed to expand across regions.',
      'Ran email and direct-mail campaigns for strategic partners across the connected-home and insurance verticals.' ]},
  ]},
  { logo:{img:'/logos/edx.png'}, name:'edX', tip:'Online learning platform offering university-level courses, originally founded by Harvard and MIT.', roles:[
    { title:'Product Marketing Specialist', dates:'2015 \u2014 2017', bullets:[
      'Grew the affiliate partner program from 0 to 55+ partners in its first year, opening a new inbound acquisition channel.',
      'Ran marketing for the website and course catalog, A/B testing listings to lift engagement and conversion.',
      'Shaped positioning and go-to-market for the MicroMasters launch and supported enterprise bulk-adoption agreements.' ]},
  ]},
  { logo:{img:'/logos/dell.png'}, name:'EMC (Dell)', tip:'Enterprise data-storage and cloud-infrastructure company, now part of Dell Technologies.', roles:[
    { title:'Product Marketing Rotational Program', dates:'2013 \u2014 2015', bullets:[
      'Delivered sales enablement for early-stage cloud and big-data products, supporting adoption across a global sales force.',
      'Partnered across product, channel, and field teams to align messaging with the sales motion.' ]},
  ]},
  { logo:{img:'/logos/boston-college.svg'}, name:'Boston College', tip:'', roles:[
    { title:'B.S. Business Administration', dates:'2009 \u2014 2013', bullets:[
      'Carroll School of Management \u2014 Marketing concentration, History minor.' ]},
  ]},
];

export default function MikeCalo(){
  const [dark,setDark]=useState(false);
  const [open,setOpen]=useState<Record<string,boolean>>({});
  const [active,setActive]=useState('intro');
  const [roleIdx,setRoleIdx]=useState(0);
  const [roleSwap,setRoleSwap]=useState(false);
  const [copied,setCopied]=useState(false);
  const copyEmail=async()=>{ try{ await navigator.clipboard.writeText('mikexcalo@gmail.com'); }catch(e){} setCopied(true); setTimeout(()=>setCopied(false),1400); };
  const ids=['intro','featured','experience','endorsements','contact'];
  useEffect(()=>{
    const id=setInterval(()=>{
      setRoleSwap(true);
      setTimeout(()=>{ setRoleIdx(i=>(i+1)%ROLES.length); setRoleSwap(false); },360);
    },2200);
    return ()=>clearInterval(id);
  },[]);
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
          <div className="mc-social"><a href="https://linkedin.com/in/mikecalo" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3V9zm6 0h3.8v1.64h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9V9z"/></svg></a></div>
          <nav className="mc-nav">
            <a onClick={()=>go('intro')}>Intro</a>
            <a onClick={()=>go('featured')}>Featured</a>
            <a onClick={()=>go('experience')}>Experience</a>
            <a onClick={()=>go('endorsements')}>Endorsements</a>
            <a onClick={()=>go('contact')}>Contact</a>
          </nav>
        </aside>
        <main className="mc-main">
          <section id="intro">
            <h1 className="mc-hook">Hey, I&apos;m Mike, and I&apos;m <span className={'mc-rot'+(roleSwap?' swap':'')}><span>{ROLES[roleIdx]}</span></span></h1>
            <p className="mc-subhead">I help great products, brands, and businesses win.</p>
            <div className="mc-bio">
              <p>With over 13 years of experience, I&apos;ve turned products into categories, from startups like <a href="https://www.edx.org" target="_blank" rel="noopener">edX</a> to global brands like <a href="https://www.libertymutual.com" target="_blank" rel="noopener">Liberty Mutual</a>.</p>
              <p>Today I lead Product Marketing at <a href="https://www.fourth.com" target="_blank" rel="noopener">Fourth</a>, where I rebuilt the function from scratch and built the go-to-market behind real growth. I also founded and run CALO&amp;CO, an independent growth and creative studio.</p>
              <div className="mc-journey">New Jersey <span className="arrow">&rarr;</span> Boston <span className="arrow">&rarr;</span> New York City <span className="arrow">&rarr;</span> Boston <span className="arrow">&rarr;</span> Portland, Maine <span style={{opacity:.55}}>(current)</span></div>
            </div>
          </section>

          <div className="mc-rule"/>

          <div className="mc-feature-row">
            <section id="featured">
              <div className="mc-label">Featured</div>
              <div className="mc-video">
                <video src="/hotschedules-reel.mp4" autoPlay muted loop playsInline preload="auto"></video>
              </div>
              <div className="mc-vmeta">
                <div className="mc-vtitle">Built for the Hustle</div>
                <div className="mc-vsub">I created and launched HotSchedules&rsquo; first-ever YouTube brand campaign &mdash; concept to market.</div>
                <a className="mc-listen" href="https://www.youtube.com/watch?v=3flDiFeyhGs" target="_blank" rel="noopener">Watch on YouTube</a>
              </div>
            </section>

            <section id="offtheclock">
              <div className="mc-label">Off the Clock</div>
              <div className="mc-music">
                <img className="mc-music-cover" src="/cigar-music-cover.jpg" alt="Cigar Music playlist cover"/>
                <div className="mc-music-meta">
                  <div className="mc-music-t">Cigar Music</div>
                  <div className="mc-music-n">A playlist I curate and keep growing &mdash; hip-hop and R&amp;B for the slow, unhurried end of a day.</div>
                  <a className="mc-listen" href="https://music.apple.com/us/playlist/cigar-music/pl.u-zPyLLYXCMo3Jjj" target="_blank" rel="noopener">Listen on Apple Music</a>
                </div>
              </div>
            </section>
          </div>

          <div className="mc-rule"/>

          <section id="experience">
            <div className="mc-label">Experience</div>
            {ORGS.map((org,oi)=>(
              <div className="mc-org" key={oi}>
                <div className="mc-orghead">
                  <div className="mc-logo">{org.logo.img?<img src={org.logo.img} alt={org.name}/>:org.logo.text}</div>
                  <div className="mc-orgname">{org.name}</div>
                  {org.tip && <span className="mc-q" tabIndex={0}>?<span className="mc-tip">{org.tip}</span></span>}
                </div>
                {org.roles.map((r,ri)=>{const k=oi+'-'+ri;const isOpen=!!open[k];return(
                  <div key={k}>
                    <button className={'mc-row'+(isOpen?' open':'')} aria-expanded={isOpen} onClick={()=>toggle(k)}>
                      <span className="mc-tog">{isOpen?'\u2212':'+'}</span>
                      <span className="mc-pos">{r.title}</span><span className="mc-dots"/><span className="mc-yr">{r.dates}</span>
                    </button>
                    <div className={'mc-panel'+(isOpen?' open':'')}>
                      {'groups' in r
                        ? r.groups.map((g,gi)=>(
                            <div key={gi}>
                              <div className="mc-group">{g.label}</div>
                              <ul>{g.bullets.map((b,bi)=><li key={bi}>{b}</li>)}</ul>
                            </div>
                          ))
                        : <ul>{r.bullets.map((b,bi)=><li key={bi}>{b}</li>)}</ul>}
                    </div>
                  </div>
                );})}
              </div>
            ))}
          </section>

          <div className="mc-rule"/>

          <section id="endorsements">
            <div className="mc-label">Endorsements</div>
            <div className="mc-quotes">
              <blockquote className="mc-quote-card">
                <div className="mc-qt">&ldquo;Mike is far more than a product marketer. He&rsquo;s a true go-to-market builder &mdash; he redefined our market positioning, unified the value proposition of four distinct companies into one clear, compelling message, and was the catalyst for true partnership across our entire GTM organization.&rdquo;</div>
                <div className="mc-quote-person">
                  <img className="mc-quote-photo" src="/endorse-heather.jpg" alt="Heather Donohoe Hicks"/>
                  <div className="mc-quote-who">
                    <span className="mc-quote-name">Heather Donohoe Hicks</span>
                    <span className="mc-quote-role">VP of Sales &middot; Petvisor</span>
                  </div>
                </div>
              </blockquote>

              <blockquote className="mc-quote-card">
                <div className="mc-qt">&ldquo;A strong product and GTM leader who combines an entrepreneurial mindset, creative problem-solving, and executive presence &mdash; he creates great ideas and actually gets them done.&rdquo;</div>
                <div className="mc-quote-person">
                  <img className="mc-quote-photo" src="/endorse-mark.jpg" alt="Mark Larik"/>
                  <div className="mc-quote-who">
                    <span className="mc-quote-name">Mark Larik</span>
                    <span className="mc-quote-role">SVP, Strategy &amp; Growth &middot; StrataTech Education Group</span>
                  </div>
                </div>
              </blockquote>
            </div>
          </section>

          <div className="mc-rule"/>

          <section id="contact">
            <div className="mc-label">Contact</div>
            <div className="mc-contactrow">
            <div className="mc-contact">Let&apos;s talk.</div>
            <div className="mc-btnrow">
              <a className="mc-btn primary" href="https://mail.google.com/mail/?view=cm&fs=1&to=mikexcalo@gmail.com" target="_blank" rel="noopener">
                <svg className="ico" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.5v13c0 .8-.7 1.5-1.5 1.5H19V8.6l-7 5.2-7-5.2V20H3.5C2.7 20 2 19.3 2 18.5v-13C2 4.7 2.7 4 3.5 4H4l8 6 8-6h.5c.8 0 1.5.7 1.5 1.5z"/></svg>
                Gmail
              </a>
              <a className="mc-btn outline" href="mailto:mikexcalo@gmail.com">
                <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg>
                Email
              </a>
              <button className="mc-btn ghost" onClick={copyEmail}>
                <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></svg>
                {copied ? 'Copied \u2713' : 'Copy'}
              </button>
            </div>
            </div>
            <div className="mc-foot">&copy; Mike Calo &middot; Portland, Maine</div>
          </section>
        </main>
      </div>
    </div>
  );
}
