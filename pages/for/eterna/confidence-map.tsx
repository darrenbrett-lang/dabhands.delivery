import Head from 'next/head';
import { Fragment, ReactNode, useState } from 'react';

/*
 * PRIVATE, UNLISTED PROPOSAL PAGE. For Dr Adeel Khan (Eterna Health).
 *
 * Route: /for/eterna/confidence-map. noindex, nofollow, noarchive (meta below + an
 * X-Robots-Tag route header in next.config.ts). Not in sitemap. No Open Graph
 * tags, no third-party scripts, no tracking. A shared link never leaks the
 * client or contents.
 *
 * A single mobile-first page inside the DAB Hands house system (Instrument
 * Serif + Manrope, warm-stone palette). Two parts, "The argument" and "The
 * engagement", reachable from a sticky jump bar. Progressive disclosure via
 * native <details> (keyboard accessible; forced open in print). The six-week
 * plan lozenges are React-state disclosures instead (one step open at a time,
 * panel under the tapped week on mobile, full-width under the row on desktop;
 * also forced open in print).
 * Contrast is tuned to WCAG AA at the token level: gold is used for rules only,
 * deep gold (#7E5E27, 5.3:1 on stone) for gold text/marks, graphite darkened
 * for secondary text. The veto is red AND the word "veto", used once.
 *
 * PLACEHOLDER: the "Book 20 minutes" button is a mailto until the real
 * scheduler link (Google appointment booking page) is wired in.
 */

const css = `
.eterna{
  --stone:#F5F1EA;--ink:#1F1F1D;--graphite:#54504A;--gold:#C0974A;--goldink:#7E5E27;
  --hair:#D8D3CB;--dark:#22201C;--onDark:#F5F1EA;--onDarkMuted:#D8CFC0;--goldOnDark:#DFB877;--red:#A62E22;--cardsub:#3A362F;
  --walnut:#53403B;--clay:#A49786;--slate:#535B68;--taupe:#D3CBC2;--green:#3E5C50;
  background:var(--stone);color:var(--ink);min-height:100vh;
  font-family:var(--font-sans),-apple-system,BlinkMacSystemFont,system-ui,sans-serif;
  -webkit-font-smoothing:antialiased;line-height:1.6;
}
.eterna .serif{font-family:var(--font-serif),Georgia,'Times New Roman',serif;}

/* Sticky jump bar */
.eterna .jump{position:sticky;top:0;z-index:30;background:color-mix(in srgb,var(--stone) 92%,transparent);
  backdrop-filter:blur(8px);border-bottom:1px solid var(--hair);}
.eterna .jump-inner{max-width:640px;margin:0 auto;padding:11px 20px;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px 10px;
  font-size:12px;letter-spacing:0.02em;}
.eterna .jump a{color:var(--ink);text-decoration:none;padding:4px 2px;border-bottom:1.5px solid transparent;}
.eterna .jump a:hover{border-bottom-color:var(--gold);}
.eterna .jump .sep{color:var(--graphite);}
.eterna .crumb-inner{max-width:640px;margin:0 auto;padding:14px 20px 0;}
.eterna .crumb a{font-size:13px;letter-spacing:0.02em;color:var(--graphite);text-decoration:none;}
.eterna .crumb a:hover{color:var(--ink);}
.eterna .crumb-arrow{color:var(--goldink);margin-right:5px;}
.eterna .brandbar{border-bottom:1px solid var(--hair);}
.eterna .brandbar-inner{max-width:640px;margin:0 auto;padding:18px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px;}
.eterna .brand-wordmark{font-family:var(--font-serif),Georgia,'Times New Roman',serif;font-size:24px;line-height:1;letter-spacing:-0.01em;color:var(--ink);}
.eterna .brand-url{font-size:13px;letter-spacing:0.01em;color:var(--graphite);text-decoration:none;}
.eterna .brand-url:hover{color:var(--ink);}
.eterna .hero-crown{display:block;height:38px;width:auto;margin:0 0 22px;}

.eterna .wrap{max-width:640px;margin:0 auto;padding:0 20px;}
.eterna [id]{scroll-margin-top:64px;}

/* Type */
.eterna .eyebrow{margin:0 0 14px;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--goldink);}
.eterna h1{margin:0;font-family:var(--font-serif),Georgia,serif;font-weight:400;font-size:38px;line-height:1.08;letter-spacing:-0.01em;color:var(--ink);}
.eterna .statement{margin:0;font-family:var(--font-serif),Georgia,serif;font-weight:400;font-size:27px;line-height:1.2;letter-spacing:-0.01em;color:var(--ink);}
.eterna .body{margin:16px 0 0;font-size:16.5px;color:var(--graphite);}
.eterna .lede{margin:22px 0 0;font-size:18px;line-height:1.62;color:var(--ink);}
.eterna .lede p+p{margin-top:15px;}
.eterna .meta{margin:0 0 24px;font-size:14px;color:var(--graphite);}
.eterna .cue{margin:6px 0 0;font-size:13px;color:var(--graphite);}

/* Hero */
.eterna .hero{margin:28px 0 0;}
.eterna .hero-doc{margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--goldink);}
.eterna .hero-title{margin:2px 0 10px;}
.eterna .hero-summary{padding:26px 22px 28px;background:var(--taupe);border-radius:16px;}
.eterna .hero-summary .eyebrow{color:var(--ink);}

/* Part label */
.eterna .part{position:relative;overflow:hidden;margin:64px 0 0;padding:26px 22px 28px;background:var(--dark);border-radius:16px;}
.eterna .part-eyebrow{position:relative;z-index:1;margin:0;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:var(--goldOnDark);}
.eterna .part-title{position:relative;z-index:1;margin:9px 0 0;font-family:var(--font-serif),Georgia,serif;font-weight:400;font-size:32px;line-height:1.04;letter-spacing:-0.01em;color:var(--onDark);}
.eterna .part-num{position:absolute;right:18px;top:50%;transform:translateY(-50%);font-family:var(--font-serif),Georgia,serif;font-size:80px;line-height:1;color:var(--goldOnDark);opacity:0.3;pointer-events:none;}
@media (min-width:768px){.eterna .part{padding:34px 32px 36px;}.eterna .part-title{font-size:38px;}.eterna .part-num{right:32px;font-size:112px;}}

/* Section */
.eterna .sec{padding:44px 0;border-top:1px solid var(--hair);}
.eterna .sec.first{border-top:0;padding-top:30px;}

/* Cost of Waiting: a unique slate-blue panel (mirrors the taupe Exec Summary) */
.eterna .sec-slate{border-top:0;margin:44px 0;padding:30px 24px 32px;background:var(--slate);color:var(--onDark);border-radius:16px;}
.eterna .sec-slate .eyebrow{color:var(--onDark);}
.eterna .sec-slate .statement{color:var(--onDark);}
.eterna .sec-slate .body{color:var(--onDarkMuted);}
.eterna .sec-slate .pq{color:var(--onDark);border-left-color:var(--goldOnDark);}
.eterna .sec-slate .disc,.eterna .sec-slate .disc-wrap .disc:first-child{border-top-color:rgba(245,241,234,0.22);}
.eterna .sec-slate .disc-label{color:var(--goldOnDark);}
.eterna .sec-slate summary::after{color:var(--goldOnDark);}
.eterna .sec-slate .dbody{color:var(--onDarkMuted);}
.eterna .sec-slate .dbody strong{color:var(--onDark);}
.eterna .sec-slate .figrow{border-top-color:rgba(245,241,234,0.22);}
.eterna .sec-slate .figrow dt{color:var(--onDarkMuted);}
.eterna .sec-slate .figrow dd{color:var(--onDark);}
.eterna .sec-slate .illus{border-color:var(--goldOnDark);color:var(--onDark);background:rgba(245,241,234,0.07);}

/* The name line: twelve words, linked through to the appendix */
.eterna .name-line{margin:26px 0 0;font-family:var(--font-serif),Georgia,serif;font-size:20px;line-height:1.36;color:var(--ink);}
.eterna .name-line a{color:inherit;text-decoration:underline;text-decoration-color:var(--gold);text-decoration-thickness:1px;text-underline-offset:5px;}
.eterna .name-line a:hover{text-decoration-color:var(--goldink);}

/* What it costs to get there: the ONE green section on the page (a plan with
   the weight of a warning but a calmer temperature; do not add a second green
   section without removing this one). Cream opacities are tuned to clear WCAG
   AA on this green at each type size. No gold and no clay in here. */
.eterna .sec-green{border-top:0;margin:44px 0;padding:30px 24px 32px;background:var(--green);color:var(--stone);border-radius:16px;}
.eterna .sec-green .eyebrow{color:rgba(245,241,234,0.78);}
.eterna .sec-green .statement{color:var(--stone);}
.eterna .sec-green .body{color:rgba(245,241,234,0.9);}
.eterna .sec-green .pq{color:var(--stone);border-left-color:rgba(245,241,234,0.25);}
.eterna .sec-green .illus{border-color:rgba(245,241,234,0.25);color:rgba(245,241,234,0.9);background:rgba(245,241,234,0.07);}
.eterna .sec-green .illus strong{color:var(--stone);}
.eterna .sec-green .disc,.eterna .sec-green .disc-wrap .disc:first-child{border-top-color:rgba(245,241,234,0.25);}
.eterna .sec-green .disc-label{color:rgba(245,241,234,0.78);}
.eterna .sec-green summary::after{color:rgba(245,241,234,0.78);}
.eterna .sec-green .dbody{color:rgba(245,241,234,0.9);}
.eterna .sec-green .dbody strong{color:var(--stone);}
.eterna .more{margin:6px 0 0;}
.eterna .more > summary{display:inline-flex;justify-content:flex-start;align-items:center;gap:9px;min-height:40px;padding:4px 0;}
.eterna .more-label{font-size:12px;font-weight:600;letter-spacing:0.11em;text-transform:uppercase;color:rgba(245,241,234,0.85);}
.eterna .more .more-open{display:none;}
.eterna .more[open] .more-open{display:inline;}
.eterna .more[open] .more-closed{display:none;}
.eterna .more .illus{margin:28px 0 16px;}
.eterna .spend-table{width:100%;border-collapse:collapse;margin:14px 0 0;font-variant-numeric:tabular-nums;}
.eterna .spend-table th,.eterna .spend-table td{padding:8px 6px;font-size:14.5px;text-align:right;border-top:1px solid rgba(245,241,234,0.25);font-weight:400;}
.eterna .spend-table thead th{font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(245,241,234,0.78);border-top:0;}
.eterna .spend-table th[scope=row]{text-align:left;color:rgba(245,241,234,0.9);}
.eterna .spend-table td{color:rgba(245,241,234,0.9);}
.eterna .spend-table .yr{font-weight:600;color:var(--stone);}
@media (max-width:767px){
  .eterna .spend-table thead{display:none;}
  .eterna .spend-table,.eterna .spend-table tbody,.eterna .spend-table tr,.eterna .spend-table th[scope=row],.eterna .spend-table td{display:block;width:100%;}
  .eterna .spend-table tr + tr{margin-top:18px;}
  .eterna .spend-table th[scope=row]{border-top:0;padding:0 0 4px;font-weight:600;}
  .eterna .spend-table td{display:flex;justify-content:space-between;align-items:baseline;padding:8px 0;}
  .eterna .spend-table td::before{content:attr(data-q);font-size:13px;color:rgba(245,241,234,0.78);}
}
.eterna .src-note{font-size:13px;color:rgba(245,241,234,0.78);}
.eterna .src-note a,.eterna .sec-green .dbody .src-note a{color:rgba(245,241,234,0.85);text-decoration:underline;text-underline-offset:3px;}
.eterna .sec-green .dbody .src-note a:hover{color:var(--stone);}

/* Pull quote */
.eterna .pq{margin:24px 0 0;border-left:3px solid var(--gold);padding:2px 0 2px 18px;
  font-family:var(--font-serif),Georgia,serif;font-style:italic;font-size:20px;line-height:1.36;color:var(--ink);}
.eterna .checkin{margin:18px 0 0;border-left:2px solid var(--gold);padding-left:14px;font-size:16px;line-height:1.5;color:var(--ink);}

/* Ladder */
.eterna .ladder{list-style:none;margin:22px 0 0;padding:0;}
.eterna .ladder li{display:grid;grid-template-columns:auto minmax(88px,auto) 1fr;gap:8px 12px;align-items:baseline;
  padding:12px 0;border-top:1px solid var(--hair);}
.eterna .ladder li:first-child{border-top:0;}
.eterna .lnum{font-family:var(--font-serif),Georgia,serif;font-size:19px;color:var(--goldink);line-height:1.2;}
.eterna .lname{font-weight:600;color:var(--ink);}
.eterna .lq{font-family:var(--font-serif),Georgia,serif;font-style:italic;color:var(--graphite);}
.eterna .veto{display:inline-block;margin-left:8px;font-family:var(--font-sans);font-style:normal;font-size:11px;font-weight:600;
  letter-spacing:0.14em;text-transform:uppercase;color:var(--red);vertical-align:middle;}

/* Where the energy goes: a full-bleed dark MOMENT (ink, cream type; min 100vh
   on desktop so nothing else shares the screen). No interaction, nothing
   hidden: the point is the order, and the order is also an order of cost,
   handing off into the cost module below. The three are an order of work,
   not a list of faults; the word "fix" must never appear here. Triptych
   columns on desktop (owner call), stacked with rules between on mobile. */
.eterna .energy-sec{margin:44px 0;background:var(--dark);color:var(--onDark);padding:30px 24px 36px;border-radius:16px;}
.eterna .energy-inner{width:100%;}
.eterna .energy-sec .eyebrow{color:var(--goldOnDark);}
.eterna .energy-stand{margin:14px 0 0;font-size:16.5px;line-height:1.55;color:var(--onDarkMuted);}
.eterna .energy{list-style:none;margin:34px 0 0;padding:0;display:grid;grid-template-columns:1fr;gap:8px;}
.eterna .energy li{padding:18px 0 20px;border-top:1px solid rgba(245,241,234,0.25);}
.eterna .e-num{display:block;font-family:var(--font-serif),Georgia,serif;font-size:42px;line-height:1;color:var(--onDark);letter-spacing:0.01em;}
.eterna .energy p{margin:12px 0 0;font-size:15px;line-height:1.55;color:var(--onDarkMuted);}
.eterna .energy strong{display:block;margin-bottom:6px;font-size:16.5px;color:var(--onDark);}
.eterna .energy-close{margin:34px 0 0;font-family:var(--font-serif),Georgia,serif;font-style:italic;font-size:20px;line-height:1.4;color:var(--onDark);letter-spacing:0.01em;}
@media (min-width:768px){
  .eterna .energy-sec{padding:38px 34px 42px;}
  .eterna .energy{grid-template-columns:repeat(3,1fr);gap:28px;align-items:start;}
}

/* The 1/2/3 spine marker each six-week lozenge carries (marker only, no words) */
.eterna .pcard-serves{display:block;margin-top:7px;font-family:var(--font-serif),Georgia,serif;font-size:11.5px;letter-spacing:0.08em;color:var(--cardsub);}

/* Disclosure */
.eterna .disc{border-top:1px solid var(--hair);}
.eterna .disc-wrap{margin:22px 0 0;}
.eterna .disc-wrap .disc:first-child{border-top:1px solid var(--hair);}
.eterna summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;
  min-height:44px;padding:11px 0;}
.eterna summary::-webkit-details-marker{display:none;}
.eterna .disc-label{font-size:12px;font-weight:600;letter-spacing:0.11em;text-transform:uppercase;color:var(--goldink);}
.eterna .disc-main{display:flex;align-items:baseline;gap:12px;}
.eterna .disc-num{font-family:var(--font-serif),Georgia,serif;font-size:16px;line-height:1;color:var(--goldink);min-width:22px;flex:none;}
.eterna .disc-plus{margin-top:16px;}
.eterna summary::after{content:'+';color:var(--goldink);font-size:20px;line-height:1;flex:none;}
.eterna details[open] > summary::after{content:'\\2212';}
.eterna .dbody{padding:2px 0 20px;font-size:15.5px;color:var(--graphite);}
.eterna .dbody p{margin:0;}
.eterna .dbody p+p{margin-top:13px;}
.eterna .dbody strong{color:var(--ink);font-weight:600;}

/* Personas (in the three-patients disclosure) */
.eterna .personas{margin:0;}
.eterna .persona{padding:14px 0;border-top:1px solid var(--hair);}
.eterna .persona:first-child{border-top:0;padding-top:0;}
.eterna .p-name{margin:0;font-family:var(--font-serif),Georgia,serif;font-size:19px;line-height:1.2;color:var(--ink);}
.eterna .p-desc{margin:5px 0 0;font-size:15px;color:var(--graphite);}
.eterna .p-stat{margin:11px 0 0;border-left:2px solid var(--gold);padding:1px 0 1px 14px;}
.eterna .p-stat-num{display:block;font-family:var(--font-serif),Georgia,serif;font-size:18px;line-height:1.2;color:var(--ink);}
.eterna .p-stat-label{display:block;margin-top:2px;font-size:14px;color:var(--graphite);}

/* Lifts / cannot lift split (retaining your name) */
.eterna .namesplit{margin:16px 0 4px;display:flex;flex-direction:column;gap:16px;}
.eterna .ns-label{margin:0 0 9px;font-size:12.5px;font-weight:600;letter-spacing:0.02em;color:var(--graphite);}
.eterna .ns-label-lift{color:var(--goldink);}
.eterna .chips{display:flex;flex-wrap:wrap;gap:8px;}
.eterna .chip{display:inline-flex;font-size:14px;padding:6px 13px;border-radius:999px;line-height:1.25;}
.eterna .chip-lift{background:color-mix(in srgb,var(--gold) 24%,var(--stone));color:var(--ink);font-weight:500;}
.eterna .chip-no{border:1px solid var(--hair);color:var(--graphite);}

/* Illustrative marker */
.eterna .illus{margin:0 0 16px;border:1px solid var(--gold);border-radius:8px;padding:10px 13px;font-size:13.5px;color:var(--ink);background:color-mix(in srgb,var(--gold) 9%,transparent);}
.eterna .sec > .illus{margin:24px 0 0;}

/* What you keep: surface mapping line + per-panel lead and takeaway */
.eterna .wyk-map{margin:18px 0 0;font-size:16.5px;line-height:1.55;color:var(--ink);}
.eterna .dbody .wyk-lead{color:var(--ink);font-weight:500;}
.eterna .dbody .wyk-do{margin-top:15px;padding-left:14px;border-left:2px solid var(--gold);font-style:italic;color:var(--ink);}
.eterna .disc[id]{scroll-margin-top:64px;}

/* Four-market rulebook bullets */
.eterna .markets{list-style:none;margin:16px 0 0;padding:0;}
.eterna .markets li{position:relative;padding:11px 0 11px 22px;border-top:1px solid var(--hair);line-height:1.5;color:var(--graphite);}
.eterna .markets li:first-child{border-top:0;}
.eterna .markets li::before{content:'';position:absolute;left:0;top:0.72em;width:10px;height:1px;background:var(--goldink);}
.eterna .markets strong{color:var(--ink);font-weight:600;}

/* After the Map: the two engagement levels (Roadmap slate, Partner gold) */
.eterna .levels{margin:18px 0 0;display:grid;gap:12px;}
.eterna .level{padding:16px 18px;background:color-mix(in srgb, var(--hair) 24%, var(--stone));border-radius:10px;border-left:3px solid var(--slate);}
.eterna .level.level-top{border-left-color:var(--gold);}
.eterna .level-name{margin:0;font-family:var(--font-serif),Georgia,serif;font-size:20px;line-height:1.1;color:var(--ink);}
.eterna .level-when{margin:5px 0 0;font-size:14.5px;font-weight:500;color:var(--goldink);}
.eterna .level-desc{margin:9px 0 0;font-size:14.5px;line-height:1.5;color:var(--graphite);}
.eterna .dbody .levels-close{margin-top:16px;color:var(--ink);}
.eterna .illus strong{font-weight:600;}

/* Figure table */
.eterna .figtable{margin:0 0 4px;}
.eterna .figrow{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:9px 0;border-top:1px solid var(--hair);}
.eterna .figrow:first-child{border-top:0;}
.eterna .figrow dt{margin:0;color:var(--graphite);font-size:15px;}
.eterna .figrow dd{margin:0;color:var(--ink);font-weight:600;white-space:nowrap;text-align:right;font-variant-numeric:tabular-nums;}
.eterna .fig-title{margin:24px 0 2px;font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:var(--goldink);}
.eterna .app-lead{margin:6px 0 0;font-family:var(--font-serif),Georgia,serif;font-size:22px;line-height:1.28;letter-spacing:-0.01em;color:var(--ink);}

/* Eight steps (tappable step cards) */

/* The shape of the six weeks */
.eterna .plan{margin:40px 0 0;padding-top:38px;border-top:1px solid var(--hair);}
.eterna .plan-label{margin:0 0 4px;font-size:12px;font-weight:600;letter-spacing:0.11em;text-transform:uppercase;color:var(--ink);}
.eterna .plan-hint{margin:0 0 18px;font-size:13px;font-weight:500;color:var(--goldink);}
.eterna .plan-grid{display:flex;flex-direction:column;gap:16px;}
.eterna .pweek-label{display:flex;flex-wrap:wrap;align-items:center;gap:9px;margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--graphite);}
.eterna .pyou{font-size:10px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:var(--onDark);background:var(--dark);border-radius:999px;padding:3px 9px;}
.eterna .pcards{display:flex;flex-wrap:wrap;gap:8px;}
.eterna .pcard{position:relative;flex:1 1 130px;display:block;border:0;border-radius:10px;padding:12px 14px;font:inherit;text-align:left;color:inherit;cursor:pointer;}
.eterna .pcard:focus-visible{outline:2px solid var(--ink);outline-offset:2px;}
@media (hover:hover){.eterna .pcard:hover{box-shadow:inset 0 0 0 1px var(--goldink);}}
.eterna .pcard-open,.eterna .pcard-open:hover{box-shadow:inset 0 0 0 2px var(--goldink);}
.eterna .pcard-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;}
.eterna .pcard-name{display:block;font-family:var(--font-serif),Georgia,serif;font-size:18px;line-height:1.15;color:var(--ink);}
.eterna .pcard-mark{flex:none;color:var(--goldink);font-size:20px;line-height:0.9;}
.eterna .pcard-sub{display:block;margin-top:4px;font-size:13px;line-height:1.3;color:var(--cardsub);}
.eterna .plan-panel{border:1px solid var(--hair);border-radius:12px;background:color-mix(in srgb, var(--gold) 6%, var(--stone));padding:18px 18px 20px;font-size:15.5px;color:var(--graphite);}
.eterna .plan-panel p{margin:0;}
.eterna .plan-panel p + p{margin-top:12px;}
.eterna .ppanel-head{display:flex;align-items:baseline;gap:10px;}
.eterna .ppanel-num{font-family:var(--font-serif),Georgia,serif;color:var(--goldink);font-size:19px;}
.eterna .ppanel-name{font-weight:600;color:var(--ink);font-size:16.5px;}
.eterna .plan-panel .ppanel-tag{margin-top:2px;font-size:13.5px;color:var(--graphite);}
.eterna .plan-panel .step-lead{color:var(--ink);font-weight:600;}
.eterna .plan-parallel{margin:18px 0 0;font-size:13px;line-height:1.5;color:var(--graphite);}
@media (prefers-reduced-motion:no-preference){.eterna .plan-panel{animation:eterna-plan-in .26s ease both;}}
@keyframes eterna-plan-in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
@media (min-width:768px){
  .eterna .plan-panel{padding:22px 24px 24px;}
}

/* Dark block */
.eterna .dark{margin:26px 0 0;background:var(--dark);color:var(--onDark);border-radius:14px;padding:26px 22px;}
.eterna .dark .dk-label{margin:0 0 14px;font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:var(--goldOnDark);}
.eterna .dark .dk-lead{margin:0;font-family:var(--font-serif),Georgia,serif;font-size:22px;line-height:1.28;letter-spacing:-0.01em;color:var(--onDark);}
.eterna .dark p{margin:15px 0 0;font-size:15.5px;color:var(--onDarkMuted);}
.eterna .floor-list{margin:16px 0 0;padding:0;list-style:none;}
.eterna .floor-list li{position:relative;padding:10px 0 10px 24px;font-size:15.5px;line-height:1.5;color:var(--ink);border-top:1px solid var(--hair);}
.eterna .floor-list li:first-child{border-top:0;}
.eterna .floor-list li::before{content:'';position:absolute;left:0;top:1.05em;width:11px;height:1px;background:var(--gold);}
.eterna .fee .fee-num{margin:0;font-family:var(--font-serif),Georgia,serif;font-size:46px;line-height:1;letter-spacing:-0.01em;color:var(--onDark);}

/* Included / not included lists */
.eterna .inclist{margin:14px 0 2px;}
.eterna .inc-head{margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:var(--goldink);}
.eterna .inc-head.inc-head-no{margin-top:24px;color:var(--graphite);}
.eterna .inc-items{margin:0;padding:0;list-style:none;}
.eterna .inc-items li{position:relative;padding:9px 0 9px 24px;font-size:15px;line-height:1.5;color:var(--ink);border-top:1px solid var(--hair);}
.eterna .inc-items li:first-child{border-top:0;}
.eterna .inc-items li::before{content:'';position:absolute;left:0;top:0.95em;width:11px;height:1px;background:var(--gold);}
.eterna .inc-items.inc-items-no li{color:var(--graphite);}
.eterna .inc-items.inc-items-no li::before{background:var(--hair);}

/* Two-year growth plan (mobile-first: a disclosure holding the stacked timeline) */
.eterna .gp{margin:22px 0 0;}
.eterna .gp > summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;min-height:44px;padding:11px 0;border-top:1px solid var(--hair);}
.eterna .gp > summary::-webkit-details-marker{display:none;}
.eterna .gp > summary::after{content:'+';color:var(--goldink);font-size:20px;line-height:1;flex:none;}
.eterna .gp[open] > summary::after{content:'\\2212';}
.eterna .gp-eyebrow{margin:0;font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:var(--goldink);}
.eterna .gp-figure{padding-top:8px;}
.eterna .gp-chart{display:none;}
.eterna .gp-stack{list-style:none;margin:0;padding:0;}
.eterna .gp-srow{position:relative;padding:14px 0 15px 18px;border-top:1px solid var(--hair);}
.eterna .gp-srow:first-child{border-top:0;padding-top:2px;}
.eterna .gp-srow::before{content:'';position:absolute;left:0;top:16px;bottom:17px;width:3px;border-radius:2px;background:var(--clay);}
.eterna .gp-srow:first-child::before{top:4px;}
.eterna .gp-srow.gp-found::before{background:var(--dark);}
.eterna .gp-srow.gp-brand::before{background:var(--walnut);}
.eterna .gp-srow.gp-oper::before{background:var(--slate);}
.eterna .gp-srow.gp-mkt::before{background:var(--gold);}
.eterna .gp-shead{display:flex;align-items:baseline;justify-content:space-between;gap:12px;}
.eterna .gp-name{font-family:var(--font-serif),Georgia,serif;font-size:19px;line-height:1.1;color:var(--ink);}
.eterna .gp-win{flex:none;font-size:12px;font-weight:600;letter-spacing:0.06em;color:var(--goldink);}
.eterna .gp-desc{display:block;margin-top:2px;font-size:13px;line-height:1.4;color:var(--graphite);}
.eterna .gp-slabels{margin-top:9px;display:flex;flex-direction:column;gap:7px;}
.eterna .gp-slabel{position:relative;padding-left:16px;font-size:14.5px;line-height:1.45;color:var(--ink);}
.eterna .gp-slabel::before{content:'';position:absolute;left:0;top:0.62em;width:9px;height:1px;background:var(--goldink);}
.eterna .gp-sgate{margin-top:16px;padding:12px 15px;border:1px solid var(--hair);border-left:3px solid var(--red);border-radius:7px;font-size:13.5px;line-height:1.45;color:var(--ink);}

/* What they spend it on: build cards + amplify band */
.eterna .mg-cards{display:grid;grid-template-columns:1fr;gap:10px;margin:16px 0 0;}
.eterna .mg-card{position:relative;padding:15px 16px 18px;background:color-mix(in srgb, var(--hair) 26%, var(--stone));border-radius:9px;overflow:hidden;}
.eterna .mg-card::after{content:'';position:absolute;left:0;right:0;bottom:0;height:3px;background:var(--clay);}
.eterna .mg-c1::after{background:var(--dark);}
.eterna .mg-c2::after{background:var(--slate);}
.eterna .mg-c3::after{background:var(--clay);}
.eterna .mg-c4::after{background:var(--gold);}
.eterna .mg-num{display:block;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:var(--goldink);}
.eterna .mg-title{display:block;margin-top:3px;font-family:var(--font-serif),Georgia,serif;font-size:19px;line-height:1.1;color:var(--ink);}
.eterna .mg-desc{margin:8px 0 0;font-size:14px;line-height:1.45;color:var(--graphite);}
.eterna .mg-media{margin:14px 0 0;padding:16px 18px;background:var(--gold);border-radius:9px;}
.eterna .mg-media-label{margin-bottom:7px;}
.eterna .mg-media .mg-num{color:var(--walnut);}
.eterna .mg-media .mg-title{color:var(--ink);}
.eterna .mg-media-body{margin:0;font-size:14px;line-height:1.5;color:var(--ink);}
.eterna .dbody .mg-close{margin:30px 0 0;padding-left:16px;border-left:2px solid var(--gold);font-family:var(--font-serif),Georgia,serif;font-size:22px;line-height:1.32;letter-spacing:-0.01em;color:var(--ink);}

/* The working underneath: the per-step material list */
.eterna .wk-list{list-style:none;margin:16px 0 0;padding:0;}
.eterna .wk-item{display:grid;grid-template-columns:28px 1fr;gap:12px;padding:12px 0;border-top:1px solid var(--hair);}
.eterna .wk-item:first-child{border-top:0;}
.eterna .wk-num{font-family:var(--font-serif),Georgia,serif;font-size:17px;line-height:1.5;color:var(--goldink);}
.eterna .wk-body{font-size:14.5px;line-height:1.5;color:var(--graphite);}
.eterna .wk-name{font-weight:600;color:var(--ink);}

/* Close + decision */
.eterna .close{padding:40px 0 0;text-align:center;}
.eterna .close h2{margin:0 auto;max-width:22ch;font-family:var(--font-serif),Georgia,serif;font-weight:400;font-size:28px;line-height:1.24;letter-spacing:-0.01em;color:var(--ink);}
.eterna .actions{margin:28px 0 0;display:flex;flex-wrap:wrap;justify-content:center;gap:12px;}
.eterna .close-panel{padding:46px 26px;text-align:center;}
.eterna .close-crown{display:block;height:51px;width:auto;margin:0 auto 20px;}
.eterna .close-panel h2{color:var(--onDark);}
.eterna .close-panel .btn-primary{background:var(--onDark);color:var(--ink);}
.eterna .close-panel .btn-primary:hover{background:#fff;color:var(--ink);}
.eterna .btn{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:11px 20px;border-radius:999px;font-size:15px;font-weight:500;text-decoration:none;}
.eterna .btn-primary{background:var(--ink);color:var(--onDark);}
.eterna .btn-primary:hover{background:#000;}
.eterna .signoff{margin:40px 0 0;padding:22px 0 48px;border-top:1px solid var(--hair);text-align:center;font-size:12.5px;letter-spacing:0.04em;color:var(--graphite);}

/* Links + focus */
.eterna a{color:var(--goldink);}
.eterna .dbody a{color:var(--goldink);}
.eterna a:focus-visible,.eterna summary:focus-visible{outline:2px solid var(--ink);outline-offset:3px;border-radius:3px;}

/* Desktop */
@media (min-width:768px){
  .eterna h1{font-size:52px;}
  .eterna .statement{font-size:32px;}
  .eterna .wrap{padding:0 24px;}
  .eterna .hero-summary{padding:34px 32px 36px;}
  .eterna .sec-slate{padding:38px 34px 40px;}
  .eterna .brand-wordmark{font-size:26px;}
  .eterna .hero-crown{height:48px;margin-bottom:26px;}
  .eterna .fee .fee-num{font-size:56px;}
  .eterna .close h2{font-size:34px;}

  /* Growth plan: the phasing chart, broken out past the reading column.
     The disclosure stays open and non-interactive; summary is just the eyebrow. */
  .eterna .gp{position:relative;left:50%;transform:translateX(-50%);width:min(92vw,940px);margin:48px 0 14px;--gp-lbl:136px;}
  .eterna .gp:not([open]) > .gp-figure{display:block;}
  .eterna .gp::details-content{content-visibility:visible;}
  .eterna .gp > summary{display:block;cursor:default;border-top:0;padding:0;min-height:0;margin-bottom:14px;}
  .eterna .gp > summary::after{content:none;}
  .eterna .gp-figure{padding-top:0;}
  .eterna .gp-stack{display:none;}
  .eterna .gp-chart{display:block;}
  .eterna .gp-bands{display:grid;grid-template-columns:var(--gp-lbl) repeat(8,1fr);align-items:end;margin-bottom:9px;}
  .eterna .gp-band{font-size:11px;font-weight:600;letter-spacing:0.13em;text-transform:uppercase;line-height:1;}
  .eterna .gp-y1{grid-column:2 / 6;color:var(--graphite);}
  .eterna .gp-gatelabel{grid-column:5 / 7;color:var(--red);white-space:nowrap;text-align:center;}
  .eterna .gp-y2{grid-column:6 / 10;color:var(--goldink);text-align:right;}
  .eterna .gp-grid{position:relative;display:grid;grid-template-columns:var(--gp-lbl) repeat(8,1fr);row-gap:0;}
  .eterna .gp-qhead{grid-column:2 / 10;display:grid;grid-template-columns:repeat(8,1fr);padding-bottom:5px;border-bottom:1px solid var(--hair);margin-bottom:8px;}
  .eterna .gp-q{font-size:11px;color:var(--graphite);letter-spacing:0.03em;text-align:center;}
  .eterna .gp-row{grid-column:1 / 10;display:grid;grid-template-columns:var(--gp-lbl) repeat(8,1fr);align-items:center;min-height:52px;}
  .eterna .gp-rowlabel{grid-column:1;padding-right:14px;}
  .eterna .gp-rowlabel .gp-name{display:block;font-family:var(--font-serif),Georgia,serif;font-size:15px;line-height:1.1;color:var(--ink);}
  .eterna .gp-rowlabel .gp-desc{margin-top:1px;font-size:11.5px;line-height:1.3;color:var(--graphite);}
  .eterna .gp-track{grid-column:2 / 10;position:relative;display:grid;grid-template-columns:repeat(8,1fr);align-items:center;align-self:stretch;min-height:52px;}
  .eterna .gp-bar{grid-row:1;align-self:center;min-height:40px;display:flex;align-items:center;justify-content:center;text-align:center;padding:5px 8px;margin:0 2px;border-radius:4px;overflow:hidden;}
  .eterna .gp-barlabel{font-size:12px;line-height:1.2;font-weight:500;}
  .eterna .gp-found{background:var(--dark);}
  .eterna .gp-brand{background:var(--walnut);}
  .eterna .gp-oper{background:var(--slate);}
  .eterna .gp-mkt{background:color-mix(in srgb, var(--gold) 58%, var(--stone));}
  .eterna .gp-mkt.gp-scale{background:var(--gold);}
  .eterna .gp-bar.gp-cont{min-height:22px;background:color-mix(in srgb, var(--hair) 55%, var(--stone));}
  .eterna .gp-found .gp-barlabel,.eterna .gp-brand .gp-barlabel,.eterna .gp-oper .gp-barlabel{color:var(--onDark);}
  .eterna .gp-mkt .gp-barlabel{color:var(--ink);}
  .eterna .gp-gate{grid-column:5;grid-row:1;justify-self:start;align-self:stretch;width:2px;margin-left:-1px;background:var(--red);z-index:4;pointer-events:none;}

  /* Money cards: two-up, and the media band label as a left rail */
  .eterna .mg-cards{grid-template-columns:1fr 1fr;gap:12px;}
  .eterna .levels{grid-template-columns:1fr 1fr;gap:14px;}
  .eterna .mg-media{display:grid;grid-template-columns:128px 1fr;gap:18px;align-items:start;}
  .eterna .mg-media-label{margin-bottom:0;}
  .eterna .dbody .mg-close{margin-top:36px;font-size:25px;}
}

/* Print: open every disclosure, drop the chrome */
/* Instrument Serif runs tight at display sizes; open the tracking slightly
   across every serif element (the brand wordmark keeps its own logo tracking). */
.eterna .serif,.eterna h1,.eterna .statement,.eterna .part-title,.eterna .part-num,.eterna .name-line,.eterna .pq,
.eterna .lnum,.eterna .lq,.eterna .disc-num,.eterna .p-name,.eterna .p-stat-num,.eterna .level-name,.eterna .app-lead,
.eterna .pcard-name,.eterna .ppanel-num,.eterna .dark .dk-lead,.eterna .fee .fee-num,.eterna .gp-name,.eterna .mg-title,
.eterna .dbody .mg-close,.eterna .wk-num,.eterna .close h2{letter-spacing:0.01em;}

@media print{
  .eterna{background:#fff;color:#000;}
  .eterna .jump{display:none;}
  .eterna details:not([open]) > *:not(summary){display:block !important;}
  .eterna summary::after{content:'' !important;}
  .eterna .plan-panel[hidden]{display:block !important;}
  .eterna .pcard-mark{display:none;}
  .eterna .part{background:#fff;border:1px solid #000;}
  .eterna .part-eyebrow,.eterna .part-title{color:#000;}
  .eterna .part-num{display:none;}
  .eterna .dark{background:#fff;color:#000;border:1px solid #000;}
  .eterna .dark .dk-lead,.eterna .fee .fee-num,.eterna .dark p{color:#000;}
  .eterna .btn{border:1px solid #000;color:#000;}
}
`;

// ── Data ────────────────────────────────────────────────────────────────────
const ladder: { n: string; name: string; q: string; veto?: boolean }[] = [
  { n: '1', name: 'Recognition', q: 'do they see me?' },
  { n: '2', name: 'Fit', q: 'is this right for me?' },
  { n: '3', name: 'Credibility', q: 'can I believe you, and check it?' },
  { n: '4', name: 'Proof', q: 'is the result real?' },
  { n: '5', name: 'Safety', q: 'am I safe if it goes wrong?', veto: true },
  { n: '6', name: 'Clarity', q: 'do I understand what I’m deciding?' },
  { n: '7', name: 'Care', q: 'will you be there afterwards?' },
];

// The eight steps. Each card shows the number, name and a one-line tagline; the
// detail splits into what happens, what we need, and what you get.
// `serves` is the 1/2/3 spine marker from "Where the energy goes" (marker only,
// no words): 1 the experience, 2 how patients are won, 3 the spend.
const steps: { num: string; name: string; tagline: string; happens: string; need: string; end: string; serves: string }[] = [
  {
    num: '01', name: 'Foundation', serves: '1 · 2', tagline: 'Establish what Eterna is building towards.',
    happens: 'I send a written set of questions and you record your answers whenever it suits, in your own voice, with no meeting to attend. I turn those into a single statement of where Eterna is going and what you believe is true about how it gets there. Anything you suspect but have not proved is written down as a question rather than a fact, and those questions become the things the next five weeks tests.',
    need: 'Sixty to ninety minutes of recorded answers, in your own time. An export of the last twelve months of enquiries, however messy. Whatever system holds them, or the inbox if there isn’t one.',
    end: 'A one-page draft of where you are going, back with you inside a week, for you to argue with.',
  },
  {
    num: '02', name: 'Signal', serves: '3', tagline: 'Understand what the evidence says.',
    happens: 'I read the category properly: the rules in your source markets, what patients say in public where you have no control over it, the behavioural evidence on how people decide under uncertainty, and the comparable categories where the same decision has already been studied. Every finding is labelled before it is used. Evidence means two independent sources agree. Pattern means it shows up repeatedly but is not proven. Hypothesis means it is a reasonable inference I still have to test.',
    need: 'Nothing.',
    end: 'The findings that matter, not the reading list, with the sources there if you want them.',
  },
  {
    num: '03', name: 'Competitors', serves: '3', tagline: 'Understand where Eterna can win.',
    happens: 'I look at the clinics you lose to and the ones nobody loses to. Not their websites, their behaviour. Someone enquires as a patient would, times the response, records what they are told about price, candidacy and risk, and notes where it is made easy or hard to check them. A specialist works the same ground as me for three days, so it is not just one pair of eyes.',
    need: 'Tell me who you think your rivals are. It is often not who we find.',
    end: 'Where the space is, and what the best of them do that you do not.',
  },
  {
    num: '04', name: 'Reality', serves: '1 · 2', tagline: 'Understand what actually happens inside.',
    happens: 'Conversations with the people who run each part: whoever answers first, whoever books, whoever consults, whoever follows up once a patient has flown home. Arranged around them rather than the other way round. I am listening for what works, what breaks, and what quietly depends on one person being available that day. The seven standards are the lens I listen through, not a checklist anybody gets handed. I also look at the record itself. What holds an enquiry, what is written down when someone does not book, who is supposed to follow up and whether anyone does. Then the twelve months of enquiries, counted: how many came in, how many reached a consultation, how many were treated, and what happened to everyone else. And what happens after treatment. What the follow-up looks like, whether it is the same in all three clinics, and what happens at week six and month six.',
    need: 'Introductions, and permission for people to be straight with me.',
    end: 'How the business actually behaves, set next to how it is meant to. And the first real count of how many people stopped, and where.',
  },
  {
    num: '05', name: 'Patients', serves: '1 · 2', tagline: 'Understand how confidence is really built.',
    happens: 'Conversations with patients across the three types, recruited, run and analysed by us. Most of them with people who enquired and did not go ahead, because they are the ones who can tell us what stopped them. The rest with patients who did proceed, to find what carried them over the same rung. Recruitment runs underneath week 2, so the conversations are ready to start when the week does.',
    need: 'The names, including the ones who did not book. Consent and data handling are ours to manage.',
    end: 'What your patients actually say, in their own words, with the pattern underneath it, and the reason the ones who stopped gave.',
  },
  {
    num: '06', name: 'Choices', serves: '2 · 3', tagline: 'Decide where to place the bets.',
    happens: 'Everything comes together and we choose. Which patients to build the next two years around, which treatments lead, and what we stop doing. The synthesis behind it runs underneath weeks 3 and 4, so nothing lands cold in the session. Held as a working session rather than a presentation, because the decisions have to be yours, made in the room, not agreed later by email. A second senior strategist sits in with me so you get two views rather than one.',
    need: 'Offline review of recommendations, then 90 minutes on a call and the authority to decide in it.',
    end: 'Fewer things on the list than when we started.',
  },
  {
    num: '07', name: 'Blueprint', serves: '1 · 2', tagline: 'Define what good has to look like.',
    happens: 'For each of the seven standards, three things: where you are today, what good has to look like, and what has to change to get there. Across the experience a patient meets, the words you use, how the work runs, the systems and data underneath it, and who signs things off. Built in a working session with your people so the answer is theirs rather than mine.',
    need: 'Offline review, then 90 minutes to review and challenge, plus your key people for the session.',
    end: 'A picture of the business you are trying to become, standard by standard.',
  },
  {
    num: '08', name: 'Roadmap', serves: '1 · 2 · 3', tagline: 'Turn it into something you can run.',
    happens: 'The blueprint sequenced across twenty-four months. Nought to six, six to twelve, twelve to twenty-four. What depends on what, what each part costs, and whose name is against it. Plus the scorecard we agree before any of it starts, so you can mark the work rather than take my word for it.',
    need: 'Up to half a day to agree it and to own it.',
    end: 'A plan you could run without me, and a way to tell whether it is working.',
  },
];

// The six-week shape. Steps placed into weeks per the delivery mockup; every
// lozenge is a disclosure that opens the matching step's detail (SixWeekPlan
// below). Competitors sits in week 2 and runs across weeks 2 and 3. The card
// tint ramps from light to deep gold across the six weeks.
const weeks: { wk: string; cards: { name: string; sub: string }[] }[] = [
  { wk: 'Week 1', cards: [{ name: 'Foundation', sub: 'Everything from you' }, { name: 'Signal', sub: 'The category' }] },
  { wk: 'Week 2', cards: [{ name: 'Competitors', sub: 'Where you can win' }, { name: 'Reality', sub: 'Inside the clinics' }] },
  { wk: 'Week 3', cards: [{ name: 'Patients', sub: 'The conversations' }] },
  { wk: 'Week 4', cards: [{ name: 'Choices', sub: 'Where we bet' }] },
  { wk: 'Week 5', cards: [{ name: 'Blueprint', sub: 'What good looks like' }] },
  { wk: 'Week 6', cards: [{ name: 'Roadmap', sub: 'Sequence and scorecard' }] },
];
const weekTint = [20, 33, 46, 59, 72, 85];

// The six-week plan: lozenges are the disclosure triggers for the step detail.
// One step open at a time. On mobile (stacked weeks) the panel sits directly
// under the tapped week; on desktop the panel spans the full row beneath the
// six columns (the pweeks are pinned to grid row 1, the open panel takes row 2).
const SixWeekPlan = () => {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="plan-grid">
      {weeks.map((w, i) => (
        <Fragment key={w.wk}>
          <div className="pweek">
            <p className="pweek-label">{w.wk}</p>
            <div className="pcards">
              {w.cards.map((c) => {
                const s = steps.find((st) => st.name === c.name)!;
                const isOpen = open === s.num;
                return (
                  <button
                    type="button"
                    className={`pcard${isOpen ? ' pcard-open' : ''}`}
                    key={c.name}
                    aria-expanded={isOpen}
                    aria-controls={`plan-step-${s.num}`}
                    onClick={() => setOpen(isOpen ? null : s.num)}
                    style={{ background: `color-mix(in srgb, var(--gold) ${weekTint[i]}%, var(--stone))` }}
                  >
                    <span className="pcard-head">
                      <span className="pcard-name">{c.name}</span>
                      <span className="pcard-mark" aria-hidden>{isOpen ? '−' : '+'}</span>
                    </span>
                    <span className="pcard-sub">{c.sub}</span>
                    <span className="pcard-serves" aria-hidden>{s.serves}</span>
                  </button>
                );
              })}
            </div>
          </div>
          {w.cards.map((c) => {
            const s = steps.find((st) => st.name === c.name)!;
            return (
              <div className="plan-panel" id={`plan-step-${s.num}`} key={`panel-${c.name}`} hidden={open !== s.num}>
                <p className="ppanel-head"><span className="ppanel-num">{s.num}</span><span className="ppanel-name">{s.name}</span></p>
                <p className="ppanel-tag">{s.tagline}</p>
                <p><span className="step-lead">What happens.</span> {s.happens}</p>
                <p><span className="step-lead">What we need from you.</span> {s.need}</p>
                <p><span className="step-lead">What you will have at the end.</span> {s.end}</p>
              </div>
            );
          })}
        </Fragment>
      ))}
    </div>
  );
};

// The material each step hands over, listed in "The working underneath".
const workingDocs: [string, string, string][] = [
  ['01', 'Foundation.', 'The question set, your recorded answers, and the first draft of where you are going.'],
  ['02', 'Signal.', 'The evidence log: every finding labelled evidence, pattern or hypothesis, with its source attached.'],
  ['03', 'Competitors.', 'The brief we worked to, the enquiry logs from six clinics, and what each of them said about price, candidacy and risk.'],
  ['04', 'Reality.', 'The interview guide, the notes from every conversation inside the business, and how each rung is supported today.'],
  ['05', 'Patients.', 'The screener, the consent pack, eight transcripts, and the findings coded against the seven rungs.'],
  ['06', 'Choices.', 'What was put on the table, what you chose, what you stopped, and why.'],
  ['07', 'Blueprint.', 'The session pack, and the full blueprint sitting behind the summary.'],
  ['08', 'Roadmap.', 'The sequence with dependencies, costs and owners, and how each measure on the scorecard is defined.'],
];

// ── Building blocks ─────────────────────────────────────────────────────────
const Sec = ({ label, statement, body, first, tone, children }: { label: string; statement: ReactNode; body?: ReactNode; first?: boolean; tone?: string; children?: ReactNode }) => (
  <section className={`sec${first ? ' first' : ''}${tone ? ` sec-${tone}` : ''}`}>
    <p className="eyebrow">{label}</p>
    <h2 className="statement">{statement}</h2>
    {body && <p className="body">{body}</p>}
    {children}
  </section>
);

const Disclosure = ({ summary, children, id, num, plus }: { summary: string; children: ReactNode; id?: string; num?: string; plus?: boolean }) => (
  <details className={`disc${plus ? ' disc-plus' : ''}`} id={id}>
    <summary>
      {num ? (
        <span className="disc-main">
          <span className="disc-num">{num}</span>
          <span className="disc-label">{summary}</span>
        </span>
      ) : (
        <span className="disc-label">{summary}</span>
      )}
    </summary>
    <div className="dbody">{children}</div>
  </details>
);

const FigTable = ({ rows }: { rows: [string, string][] }) => (
  <dl className="figtable">
    {rows.map(([l, v]) => (
      <div className="figrow" key={l}>
        <dt>{l}</dt>
        <dd>{v}</dd>
      </div>
    ))}
  </dl>
);

// The two-year growth plan. A horizontal phasing chart on wider screens (it
// breaks out past the reading column), collapsing to a stacked timeline on a
// phone. Foundations build first, marketing scales only past the proof gate.
type GpLayer = { name: string; desc: string; tone: string; bars: { start: number; span: number; label?: string; cont?: boolean }[]; win: string };
const gpLayers: GpLayer[] = [
  { name: 'Foundations', desc: 'what we can prove', tone: 'found', win: 'Q1-Q3', bars: [{ start: 1, span: 1, label: 'Confidence Map' }, { start: 2, span: 1, label: 'The standards' }, { start: 3, span: 1, label: 'Packaging and pricing' }, { start: 4, span: 5, cont: true }] },
  { name: 'Brand', desc: 'what we say', tone: 'brand', win: 'Q2-Q4', bars: [{ start: 2, span: 3, label: 'One story, three clinics, three patients' }, { start: 5, span: 4, cont: true }] },
  { name: 'Operating', desc: 'how it runs', tone: 'oper', win: 'Q3-Q5', bars: [{ start: 3, span: 3, label: 'Enquiry to consult to treatment, running optimally' }, { start: 6, span: 3, cont: true }] },
  { name: 'Marketing', desc: 'who hears it', tone: 'mkt', win: 'Q3-Q8', bars: [{ start: 3, span: 2, label: 'Test what converts' }, { start: 5, span: 4, label: 'Scale behind proof', cont: false }] },
];

const GrowthPlan = () => (
  <details className="gp">
    <summary className="gp-summary"><span className="gp-eyebrow">The two-year growth plan</span></summary>
    <div
      className="gp-figure"
      role="img"
      aria-label="The two-year growth plan across eight quarters. Foundations build in quarters one to three, brand in two to four, operating in three to five, each then holding steady. Marketing tests what converts in quarters three and four, then scales behind proof from quarter five. A proof gate sits at the end of quarter four, between year one and year two, before spend scales."
    >
    {/* Wide screens: the phasing chart. */}
    <div className="gp-chart" aria-hidden="true">
      <div className="gp-bands">
        <span className="gp-band gp-y1">Year one</span>
        <span className="gp-band gp-gatelabel">Proof gate</span>
        <span className="gp-band gp-y2">Year two</span>
      </div>
      <div className="gp-grid">
        <div className="gp-qhead">
          {['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'].map((q) => (
            <span className="gp-q" key={q}>{q}</span>
          ))}
        </div>
        {gpLayers.map((l) => (
          <div className="gp-row" key={l.name}>
            <div className="gp-rowlabel">
              <span className="gp-name">{l.name}</span>
              <span className="gp-desc">{l.desc}</span>
            </div>
            <div className="gp-track">
              {l.bars.map((b, i) => (
                <span
                  key={i}
                  className={`gp-bar gp-${l.tone}${b.cont ? ' gp-cont' : ''}${b.label && i > 0 ? ' gp-scale' : ''}`}
                  style={{ gridColumn: `${b.start} / ${b.start + b.span}` }}
                >
                  {b.label && <span className="gp-barlabel">{b.label}</span>}
                </span>
              ))}
              <span className="gp-gate" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Phones: the same story, stacked. */}
    <ol className="gp-stack" aria-hidden="true">
      {gpLayers.map((l) => (
        <li className={`gp-srow gp-${l.tone}`} key={l.name}>
          <div className="gp-shead">
            <span className="gp-name">{l.name}</span>
            <span className="gp-win">{l.win}</span>
          </div>
          <span className="gp-desc">{l.desc}</span>
          <div className="gp-slabels">
            {l.bars.filter((b) => b.label).map((b, i) => (
              <span className="gp-slabel" key={i}>{b.label}</span>
            ))}
          </div>
        </li>
      ))}
      <li className="gp-sgate" aria-hidden="true">Proof gate after Q4, between year one and year two. Spend scales only once the chairs prove it.</li>
    </ol>
    </div>
  </details>
);

const Illustrative = () => (
  <p className="illus">
    <strong>Illustrative.</strong> Not yet Eterna’s numbers. Replaced by your own records in week one.
  </p>
);

export default function Eterna() {
  return (
    <>
      <Head>
        <title>Confidence Map</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="eterna">
        {/* ── Back to the Eterna workspace ────────────────────────── */}
        <div className="crumb">
          <div className="crumb-inner">
            <a href="/for/eterna"><span className="crumb-arrow" aria-hidden>&#8592;</span> Eterna</a>
          </div>
        </div>
        {/* ── Brand header (matches the First Response lockup) ─────── */}
        <header className="brandbar">
          <div className="brandbar-inner">
            <span className="brand-wordmark">DAB Hands</span>
            <a className="brand-url" href="https://dabhands.delivery" target="_blank" rel="noopener noreferrer">dabhands.delivery</a>
          </div>
        </header>
        {/* ── Sticky jump bar ─────────────────────────────────────── */}
        <nav className="jump" aria-label="Jump to a part of the proposal">
          <div className="jump-inner">
            <a href="#argument">Situation</a>
            <span className="sep" aria-hidden>·</span>
            <a href="#plan">Plan</a>
            <span className="sep" aria-hidden>·</span>
            <a href="#engagement">Engagement</a>
            <span className="sep" aria-hidden>·</span>
            <a href="#scope">Terms</a>
            <span className="sep" aria-hidden>·</span>
            <a href="#appendix">Appendix</a>
          </div>
        </nav>

        <main className="wrap">
          {/* ── Hero ──────────────────────────────────────────────── */}
          <header className="hero">
            <div className="hero-mast">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="hero-crown" src="/images/crown-mark.webp" alt="" aria-hidden decoding="async" />
              <p className="hero-doc">Eterna Health · Proposal · V1</p>
              {/* The document title proper; the exec summary h1 is hidden above,
                  so this carries the page's h1 while it is. */}
              <h1 className="hero-title">Confidence Map</h1>
              <p className="meta">Prepared for Dr Adeel Khan, with Marco De Pasquale.</p>
            </div>
            {/* Exec Summary hidden for now (owner call, 2026-08-14). Restore by
                flipping this flag. Keeps the h1 out of the page while hidden. */}
            {false && (
              <div className="hero-summary">
                <p className="eyebrow">Exec Summary</p>
                <h1>A two-year plan to fill the chairs.</h1>
                <div className="lede">
                  <p>
                    You want another ten million. That is fewer than five more patients a week, in each clinic you already run. The cheapest place to find them is among the people already talking to you. Most of them stop, and they stop at different points, because something they needed to believe did not hold. They have not said no. Most of them are still deciding.
                  </p>
                  <p>
                    Six weeks finds where that happens, what each one costs, which patients and treatments to build around, and what has to change over two years to fix it.
                  </p>
                </div>
              </div>
            )}
          </header>

          {/* ══════════════ PART ONE · THE ARGUMENT ══════════════ */}
          <div className="part" id="argument">
            <span className="part-num" aria-hidden>01</span>
            <p className="part-eyebrow">Part one</p>
            <p className="part-title">The situation</p>
          </div>

          {/* 1 · The prize */}
          <Sec label="The prize" first statement="The next ten million is already sitting in the rooms you have." body="Your goal: double the business in two years, to around $20m, without opening a single new clinic.">
            <p className="pq">Doubling is fewer than five more patients per clinic, per week.</p>
            <div className="disc-wrap">
              <Disclosure summary="See the arithmetic">
                <Illustrative />
                <FigTable
                  rows={[
                    ['Revenue to find', '$10m a year'],
                    ['At an assumed $15,000 first treatment', '667 patients'],
                    ['Across three clinics', '222 each a year'],
                    ['Across 48 working weeks', '4.6 a week'],
                  ]}
                />
                <p style={{ marginTop: '14px' }}>
                  At $12,000 it is 5.8 a week. At $25,000 it is 2.8. It never leaves single figures. The average treatment value is the number only you have.
                </p>
                <p className="fig-title">What one lost patient costs</p>
                <FigTable
                  rows={[
                    ['First treatment', '$15,000'],
                    ['Come back for a second', '28%'],
                    ['Of those, take a third', '30%'],
                    ['Refer someone who books', '10%'],
                    ['Three-year value', 'about $22,000'],
                  ]}
                />
                <p>
                  Return and referral depend on someone staying in touch. They are not clinical outcomes. The rates are discounted from IVF after a successful cycle, the closest self-pay comparison there is. Your own records replace them in week one.
                </p>
                <p>
                  Florida is not in these numbers. If it opens and runs at today’s per-clinic average it adds about $3.3m, a third of the gap, and everything above gets easier.
                </p>
              </Disclosure>
            </div>
          </Sec>

          {/* 2 · Where the growth is */}
          <Sec label="Where the growth is" statement="The cheapest patients to win are the ones already talking to you." body="More enquiries cost a certain type of investment in marketing. Converting the ones you already have requires attention and trust building.">
            <p className="pq">The focus is revenue per available appointment. More of the chairs you already have, filled by patients worth more, who come back and bring people with them.</p>
          </Sec>

          {/* 3 · The reality */}
          <Sec
            label="The reality"
            statement="A patient who does not book today has not said no. They have stopped at something."
            body="Some are waiting for better evidence. Some are still comparing, and will be for months. Some are frightened and have gone quiet. Almost nobody follows up with any of them."
          >
            <p className="body">So it is one job with two halves. Know who stopped and at which rung, and keep hold of them. Then fix the thing that stopped them, so that more move forward at this stage.</p>
            <p className="pq">Fixing a rung helps everyone who comes next. It does nothing for the people who already stopped, unless you still have their names.</p>
          </Sec>

          {/* 4 · How patients decide */}
          <Sec label="How patients decide" statement="Advertising does not answer a patient’s questions. It sends more people to find them unanswered.">
            <div className="disc-wrap">
              <Disclosure summary="See our three patients">
                <div className="personas">
                  <div className="persona">
                    <p className="p-name">The Proactive Optimiser</p>
                    <p className="p-desc">Healthspan-driven. Buys on the quality of the evidence.</p>
                  </div>
                  <div className="persona">
                    <p className="p-name">The Restoration Seeker</p>
                    <p className="p-desc">Injury, mobility, midlife. Avoiding surgery.</p>
                    <div className="p-stat">
                      <span className="p-stat-num">6 to 18 months</span>
                      <span className="p-stat-label">Researching, comparing four to seven clinics.</span>
                    </div>
                  </div>
                  <div className="persona">
                    <p className="p-name">The Condition Seeker</p>
                    <p className="p-desc">Serious or chronic, told there is nothing else. The most to lose.</p>
                  </div>
                </div>
              </Disclosure>
            </div>
            <p className="body">A patient climbs a ladder of confidence, rung by rung. They only book when enough rungs hold.</p>
            <ol className="ladder">
              {ladder.map((r) => (
                <li key={r.n}>
                  <span className="lnum">{r.n}</span>
                  <span className="lname">{r.name}</span>
                  <span className="lq">
                    {r.q}
                    {r.veto && <span className="veto">veto</span>}
                  </span>
                </li>
              ))}
            </ol>
            <p className="pq">Each drops out at a different rung. That’s what will let us point your spend rather than spread it.</p>
          </Sec>

          {/* ══════════════ PART TWO · THE TWO-YEAR PLAN ══════════════ */}
          <div className="part" id="plan">
            <span className="part-num" aria-hidden>02</span>
            <p className="part-eyebrow">Part two</p>
            <p className="part-title">The two-year plan</p>
          </div>

          {/* 5 · The two-year shape (the horizon, before the first step) */}
          <Sec label="The two-year shape" first statement="Foundations first, then spend behind what we know works." body="Nothing scales until the chairs prove it. We spend more when the chairs prove it works, not because it is year two.">
            <GrowthPlan />
          </Sec>

          {/* 5a2 · Where the energy goes: the dark moment (order of work = order of cost) */}
          <section className="energy-sec">
            <div className="energy-inner">
              <p className="eyebrow">Where the energy goes</p>
              <p className="energy-stand">The Map puts a number against each. The order does not change.</p>
              <ol className="energy">
                <li>
                  <span className="e-num" aria-hidden>1</span>
                  <p><strong>The experience.</strong> That is the product, not the medicine. You have done work here already. It is what makes people come back and tell someone else, and returning patients cost nothing to win.</p>
                </li>
                <li>
                  <span className="e-num" aria-hidden>2</span>
                  <p><strong>How new patients are won.</strong> That is the seven rungs. It works on the enquiries you are already paying for, so it buys no new media at all. More patients, and each one worth more than before.</p>
                </li>
                <li>
                  <span className="e-num" aria-hidden>3</span>
                  <p><strong>Then advertise.</strong> The only one of the three that costs real money, which is why it comes last. By then you know what each pound is buying.</p>
                </li>
              </ol>
              <p className="energy-close">A dollar spent after the first two is worth more than a pound spent before them.</p>
            </div>
          </section>

          {/* 5b · What it costs to get there: the size of the cheque before what it buys */}
          <Sec
            tone="green"
            label="What it costs to get there"
            statement="Ten to fifteen per cent of revenue."
            body="That is what growth costs in this category. Under eight per cent and you are holding position rather than growing. The businesses that have actually doubled in adjacent healthcare spent between a third and a half of revenue doing it. And the number moves with your revenue, which is the mechanic that matters: you fund the business you are trying to become, not the one you had last year."
          >
            <details className="more">
              <summary><span className="more-label more-closed">More</span><span className="more-label more-open">Less</span></summary>
              <p className="body">Most of it is not advertising. Across the industry, media is under a third of a marketing budget. The rest is the people, the systems and the material that make the advertising worth buying.</p>
              <p className="body">Which is why the six weeks comes first. It sets where in the range you land, and how much of the money goes into fixing rather than buying.</p>
              <p className="pq">Growth is funded as a share of turnover, set in advance and protected. You size it. The Map points it.</p>
            <p className="illus">
              <strong>Illustrative until calibrated.</strong> Industry benchmarks, not yet Eterna’s numbers.
            </p>
            <div className="disc-wrap">
              <Disclosure summary="What that comes to in money">
                <p><strong>The band.</strong> For elective, self-pay healthcare the accepted range is 8 to 15% of revenue. The Aesthetic Society puts a steady year at 5 to 8% and a growth year at 10 to 12%. AmSpa’s survey has the average med spa at about 7%, which is a holding number. Practices genuinely growing, new sites or hard markets, run 15 to 20% for the first two years and then taper. Gartner has all-industry marketing at 7.7%, but that is mostly billion dollar companies with brands already built. Smaller businesses growing fast always spend a higher share. Doubling in two years puts you near the top of the range, not the middle.</p>
                <p><strong>The mechanic.</strong> Spend 10% of eleven million and you have funded an eleven million dollar business. The money goes in ahead of the curve or the curve does not happen. So the percentage is taken against where you are going, not where you have been.</p>
                <p><strong>The shape.</strong> Eleven million now, about fifteen at the end of year one, twenty at the end of year two. At 12% of target revenue:</p>
                <table className="spend-table">
                  <thead>
                    <tr>
                      <th scope="col" aria-label="Year"></th>
                      <th scope="col">Q1</th>
                      <th scope="col">Q2</th>
                      <th scope="col">Q3</th>
                      <th scope="col">Q4</th>
                      <th scope="col">Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Year one</th>
                      <td data-q="Q1">$380k</td>
                      <td data-q="Q2">$430k</td>
                      <td data-q="Q3">$470k</td>
                      <td data-q="Q4">$500k</td>
                      <td data-q="Year" className="yr">$1.78m</td>
                    </tr>
                    <tr>
                      <th scope="row">Year two</th>
                      <td data-q="Q1">$560k</td>
                      <td data-q="Q2">$590k</td>
                      <td data-q="Q3">$620k</td>
                      <td data-q="Q4">$630k</td>
                      <td data-q="Year" className="yr">$2.40m</td>
                    </tr>
                  </tbody>
                </table>
                <p>About $4.2m across the two years. At 10% it is $3.5m. At 15% it is $5.2m.</p>
                <p><strong>Where it actually goes.</strong> Gartner puts paid media at 30.6% of the average marketing budget. The other 70% is people, technology, content, production and agencies. So of the $4.2m, roughly $1.3m is advertising and the rest is the machine behind it. That is the industry’s own number, not mine.</p>
                <p><strong>What moves it inside the band.</strong> If a real share of the people already enquiring are stopping at something you can fix, you land at the bottom of the range, because you convert more of what you already get and buy less of what you do not. If they are not, you land at the top. Either way you know before you commit four million rather than after.</p>
                <p className="src-note">Sources: <a href="https://www.gartner.com/en/newsroom/press-releases/2025-05-12-gartner-2025-cmo-spend-survey-reveals-marketing-budgets-have-flatlined-at-seven-percent-of-overall-company-revenue" target="_blank" rel="noopener noreferrer">Gartner 2025 CMO Spend Survey</a> · <a href="https://americanmedspa.org/blog/industry-experts-weigh-in-to-help-answer-how-much-should-i-spend-on-med-spa-marketing" target="_blank" rel="noopener noreferrer">AmSpa Medical Spa State of the Industry</a> · <a href="https://pulsedigital.health/insights/how-much-private-clinic-spend-on-marketing-uk/" target="_blank" rel="noopener noreferrer">UK private clinic marketing benchmark</a></p>
              </Disclosure>
            </div>
            </details>
          </Sec>

          {/* 5b2 · Who spends it: the question the number creates, answered in the open */}
          <Sec label="Who spends it" statement="This level of investment is what the growth costs. It is not a fee to me or anyone you choose to work with.">
            <div className="disc-wrap">
              <Disclosure summary="How the team gets built">
                <p>It also needs more disciplines than any one person has. What I have is the reach, people at the top of their field in each of the parts this needs.</p>
                <p>I won’t put anyone in the room you haven’t asked for. We build the team a piece at a time, as the Map shows what is actually missing, and you keep the say on every one of them. Working this way gets you way more value than a traditional route: no board to take a cut, just the topflight talent needed to steer it right.</p>
              </Disclosure>
            </div>
          </Sec>

          {/* 5c · What they spend it on (unchanged copy; the natural follow-on to the number) */}
          <section className="sec">
            <p className="eyebrow">What it’s spent on</p>
            <p className="body">Four places to build, and one to amplify.</p>
            <div className="mg-cards">
                  <div className="mg-card mg-c1">
                    <span className="mg-num">One</span>
                    <span className="mg-title">Experience</span>
                    <p className="mg-desc">Everything a patient meets: the site, the enquiry, the consult, the follow-up.</p>
                  </div>
                  <div className="mg-card mg-c2">
                    <span className="mg-num">Two</span>
                    <span className="mg-title">Operational change</span>
                    <p className="mg-desc">How the work actually runs, enquiry through to treatment, across three clinics.</p>
                  </div>
                  <div className="mg-card mg-c3">
                    <span className="mg-num">Three</span>
                    <span className="mg-title">Marketing &amp; comms</span>
                    <p className="mg-desc">One story, told where the three patients already are, behind what converts.</p>
                  </div>
                  <div className="mg-card mg-c4">
                    <span className="mg-num">Four</span>
                    <span className="mg-title">Reputation &amp; PR</span>
                    <p className="mg-desc">Other people saying it for you. The rung no amount of advertising can buy.</p>
                  </div>
                </div>
                <div className="mg-media">
                  <div className="mg-media-label">
                    <span className="mg-num">And then</span>
                    <span className="mg-title">Media</span>
                  </div>
                  <p className="mg-media-body">As you know, Google prohibits advertising cell, gene and PRP therapies outright, with no certification route, so media buys attention for the problem, the questions and the clinic, never the procedure. I do not buy media. I bring the buyer, set their aim, and hold the spend to the proof.</p>
                </div>
          </section>

          {/* ══════════════ PART THREE · THE CONFIDENCE MAP ══════════════ */}
          <div className="part" id="engagement">
            <span className="part-num" aria-hidden>03</span>
            <p className="part-eyebrow">Part three</p>
            <p className="part-title">The Confidence Map</p>
          </div>

          {/* 6 · The first engagement */}
          <Sec label="The first engagement" first statement="The Confidence Map: where your patients stop, what each stop costs you, and what to fix first.">

            <div className="plan">
              <p className="plan-label">The shape of the six weeks</p>
              <p className="plan-hint">Tap any stage to see what happens, what it asks of you, and what you get.</p>
              <SixWeekPlan />
            </div>
            <p className="checkin">A short check-in every Friday to review the week and make the decisions together to make the next week count.</p>

          </Sec>

          {/* ══════════════ PART THREE · SCOPE & COST ══════════════ */}
          <div className="part" id="scope">
            <span className="part-num" aria-hidden>04</span>
            <p className="part-eyebrow">Part four</p>
            <p className="part-title">Scope &amp; cost</p>
          </div>

          {/* 7 · What you get (value established before the number) */}
          <Sec label="What you get" statement="Four documents: the leak map is the evidence, the strategy page is the decision, the ranked roadmap is the plan, and the scorecard is how you know it’s working as it moves.">
            <div className="disc-wrap wyk-discs">
              <Disclosure num="01" summary="The leak map">
                <p className="wyk-lead">Every place a patient stops, why, how many, and what it costs you a year.</p>
                <p>A grid. The seven rungs down one side, your three patients across the top. For every square: does it hold, what the evidence is, how many people stopped there in the last twelve months, and the money at risk each year. Ranked, so the biggest number sits at the top.</p>
                <p>It covers the whole route, not just the website. The first response and how long it took. The consultation. The price conversation. What happened after they flew home. And every enquiry that went quiet and was never chased, which is usually the largest and cheapest leak in the business.</p>
                <p>And because it is built from your own enquiry records, it is not only a map of where the money goes. It is the list of people still sitting behind each rung, and what it would take to bring them back.</p>
                <p className="wyk-do">What you do with it: fix the top three, and leave the rest alone until those are done.</p>
              </Disclosure>
              <Disclosure num="02" summary="The ranked roadmap">
                <p className="wyk-lead">Everything worth doing, in order, with a quarter and a name against it.</p>
                <p>Every initiative placed by effort and by value, then sorted into nought to six, six to twelve and twelve to twenty-four months, across the four places you spend: experience, operations, marketing and comms, and reputation.</p>
                <p>Dependencies marked, so you can see what cannot start until something else has finished.</p>
                <p className="wyk-do">What you do with it: you know what to fund this quarter, and what to defer without losing it.</p>
              </Disclosure>
              <Disclosure num="03" summary="Strategy on a page">
                <p className="wyk-lead">What Eterna is for, who it is for, and what it will not do.</p>
                <p>The patients you are building the next two years around. The treatments that lead. The promise you can actually prove. What you have decided to stop doing. And the one number everything is judged by.</p>
                <p>One sheet, in your words, built from your own thinking rather than over the top of it.</p>
                <p className="wyk-do">What you do with it: every argument about priorities gets settled against it, and three countries start saying the same thing.</p>
              </Disclosure>
              <Disclosure num="04" summary="The scorecard">
                <p className="wyk-lead">How you know, quarter by quarter, whether it is working.</p>
                <p>A small number of measures agreed before we start. Each with today’s baseline, and where it should be at three, six and twelve months.</p>
                <p>Including the ones that make me look bad if they do not move.</p>
                <p className="wyk-do">What you do with it: you mark the work rather than take anyone’s word for it.</p>
              </Disclosure>
              <Disclosure plus summary="Plus: The working underneath">
                <p>Every step produces its own material, and all of it comes to you at the end, named and in one place.</p>
                <ol className="wk-list">
                  {workingDocs.map(([num, name, desc]) => (
                    <li className="wk-item" key={num}>
                      <span className="wk-num">{num}</span>
                      <span className="wk-body"><span className="wk-name">{name}</span> <span className="wk-desc">{desc}</span></span>
                    </li>
                  ))}
                </ol>
                <p>Written so that someone who was not in the room can pick it up and use it.</p>
              </Disclosure>
            </div>
          </Sec>

          {/* 8 · What it costs */}
          <section className="sec">
            <p className="eyebrow">The price</p>
            <div className="dark fee">
              <p className="fee-num">£25,000</p>
              <p>About AED 116,000 at today’s rate. Invoiced and paid in sterling.</p>
              <p>Fixed. Six weeks. No day rates, no expenses on top, no change requests.</p>
            </div>
            <div className="disc-wrap">
              <Disclosure summary="What is included, and what is not">
                <div className="inclist">
                  <p className="inc-head">Included</p>
                  <ul className="inc-items">
                    <li>The four documents: the strategy page, the leak map, the ranked roadmap, the scorecard</li>
                    <li>Up to ten conversations inside your business, across all three clinics</li>
                    <li>Eight patient conversations, five with people who did not proceed and three with people who did, recruited, run and analysed by us</li>
                    <li>Twelve months of enquiry records analysed: how many came in, where each one stopped, and how many are still reachable</li>
                    <li>Six competitor clinics enquired at and assessed the way a patient would</li>
                    <li>The rules in your source markets, and what they mean for what you can say</li>
                    <li>Two working sessions with your team, ninety minutes each</li>
                    <li>Every transcript, source and working file, yours to keep</li>
                  </ul>
                  <p className="inc-head inc-head-no">Not included</p>
                  <ul className="inc-items inc-items-no">
                    <li>Building, writing or designing anything</li>
                    <li>Media, production or agency fees</li>
                    <li>Legal advice in any market. I will tell you where you need it</li>
                    <li>Travel, if you want me on site</li>
                    <li>Anything after week six</li>
                  </ul>
                </div>
              </Disclosure>
              <Disclosure summary="Terms">
                <p>
                  <strong>£25,000, fixed.</strong>
                </p>
                <p>Payable in full on acceptance, before I start.</p>
                <p>At the end of week two I will show you what I have found. If you do not want me to carry on, say so and I will refund £12,500 within ten working days. Everything produced to that point is yours.</p>
                <div className="disc-wrap">
                  <Disclosure summary="The practical detail">
                    <p><strong>Currency and tax.</strong> Fees in pounds sterling. Dab Hands Ltd is not VAT registered, so no VAT is chargeable. Bank charges on the transfer are yours.</p>
                    <p><strong>Which entity.</strong> Tell me which of your companies is contracting and I will invoice that one.</p>
                    <p><strong>Dates.</strong> Six weeks from a start date we set together, once the enquiry export and the interview names are in hand. If those arrive late, the end date moves by the same amount. Nothing else shifts the timetable. The price is fixed around the six weeks. Delays in feedback could cause extensions.</p>
                    <p><strong>What you own.</strong> Everything produced is yours, including anything unfinished if you stop at week two. I would like to describe the shape of the work in future without naming you, showing numbers or anything identifying, and you can say no to that.</p>
                    <p><strong>Confidentiality and patient data.</strong> Nothing about your business leaves the engagement. For the patient conversations, consent, recording and data handling are mine to manage, at the strictest standard of the three jurisdictions rather than the easiest. No patient is contacted without your sign-off on the list.</p>
                  </Disclosure>
                </div>
              </Disclosure>
            </div>
          </section>

          {/* The cost of waiting: the last thing before the close */}
          <Sec
            tone="slate"
            label="The cost of waiting"
            statement="Every month is about fifty-six patients."
            body="Nineteen per clinic. The same four and a half a week from earlier, counted differently. In money, roughly $830,000 a month, because waiting does not pause the plan, it moves it."
          >
            <p className="pq">And a month without measuring is a month of evidence that will never exist. You can only record what happens to the patients you are treating now.</p>
            <div className="disc-wrap">
              <Disclosure summary="See the arithmetic">
                <Illustrative />
                <FigTable
                  rows={[
                    ['The gap', '$10m a year'],
                    ['At an assumed $15,000 first treatment', '667 patients a year'],
                    ['Across twelve months', '56 patients a month'],
                    ['Across three clinics', '19 per clinic'],
                    ['In revenue', 'about $830,000 a month'],
                  ]}
                />
                <p>Delay does not destroy this money. It defers it. The whole curve moves right, so every month of waiting is one month of the finished business you never get.</p>
                <p>The evidence is different. Outcome data is the only thing here that cannot be bought later, because you can only record what happened to patients you treated while you were measuring. Regenexx has 963 reviews because they started years ago, not because they bought them.</p>
              </Disclosure>
            </div>
          </Sec>

          {/* ══════════════ APPENDIX ══════════════ */}
          <div className="part" id="appendix">
            <span className="part-num" aria-hidden>A</span>
            <p className="part-eyebrow">Appendix</p>
            <p className="part-title">The detail</p>
          </div>

          <section className="sec first">
            <p className="body">Supplementary detail that sits alongside the proposal. Read it now or come back to it later; nothing here is required.</p>
            <div className="disc-wrap app-discs">

              <Disclosure summary="Your name" id="your-name">
                <p>
                  <strong>Your name gets them onto the ladder. It cannot hold the rungs that stop the sale.</strong>
                </p>
                <div className="namesplit">
                  <div className="ns-group">
                    <p className="ns-label ns-label-lift">It lifts</p>
                    <div className="chips">
                      <span className="chip chip-lift">Recognition</span>
                      <span className="chip chip-lift">Credibility</span>
                      <span className="chip chip-lift">Proof</span>
                    </div>
                  </div>
                  <div className="ns-group">
                    <p className="ns-label">It cannot lift</p>
                    <div className="chips">
                      <span className="chip chip-no">Fit</span>
                      <span className="chip chip-no">Clarity</span>
                      <span className="chip chip-no">Safety</span>
                      <span className="chip chip-no">Care</span>
                    </div>
                  </div>
                </div>
                <p>Worth continuing, and worth pointing at the rungs it moves.</p>
                <p>So we fix the leaks in order: the ones losing the patients worth most, the ones costing the most margin, then the rest. The few that move the money first, not everything at once.</p>
              </Disclosure>

              <Disclosure summary="What has changed in search">
                    <FigTable
                      rows={[
                        ['Health searches returning an AI answer', '88%'],
                        ['Of those, never clicking through', '83%'],
                        ['Traffic falls on clinical pages', '20 to 40%'],
                        ['AI referral conversion, against 2.8% organic', '16%'],
                      ]}
                    />
                    <p style={{ marginTop: '14px' }}>
                      Someone describes you before anyone visits. Your website is where people check what they were told, not where they arrive. Fewer of them come now, but the ones who do are far more likely to book, so losing them costs much more than it used to.
                    </p>
                    <p>Sources: 210 Digital and WebFX, 2026; Bregg, 2026; AirOps and ALM, 2026. Industry analysis, not peer-reviewed.</p>
                  </Disclosure>
                  <Disclosure summary="What you are allowed to say">
                    <p>
                      <strong>The rules follow the patient, not the clinic.</strong>
                    </p>
                    <p>A person in London researching treatment in Cabo is covered by British rules. One in Texas is covered by American ones. So the question is never what you may say in Mexico, it is who you are speaking to and where they are sitting when they read it.</p>
                    <p>That makes it a choice rather than a constraint. Which source markets you go after, and how you speak to each of them, is one of the things the Map decides.</p>
                  </Disclosure>
                  <Disclosure summary="Repairing the floor">
                    <p>
                      <strong>Safety has a veto. Nothing else starts until this holds.</strong>
                    </p>
                    <p>Five things any clinic treating patients who then fly home should be able to show. Most cannot:</p>
                    <ul className="floor-list">
                      <li>An adverse event protocol distributed across every location.</li>
                      <li>A coordination letter to the patient’s own doctor before they fly home.</li>
                      <li>A named 24 hour contact given in writing before treatment.</li>
                      <li>Registration and licence status published for each market.</li>
                      <li>A certificate of analysis as standard for every product used.</li>
                    </ul>
                    <p>Until this holds, awareness spend accelerates exposure rather than conversion. It is also the cheapest work in the plan, and the only work that should not wait.</p>
              </Disclosure>

              <Disclosure summary="What happens after the Map">
              <p>The Map is the entry level, and it is finished work. Your own team, or any agency you already use, can pick it up and act on it. If we never speak again after week six, you have lost nothing and you own everything.</p>
              <p>That is deliberate. A diagnosis that can only be acted on by the person who wrote it is not a diagnosis, it is a sales document.</p>
              <p>If you want to go further, there are two more levels, set by how much of the outcome I hold rather than the hours I bill.</p>
              <div className="levels">
                <div className="level">
                  <p className="level-name">Confidence Roadmap</p>
                  <p className="level-when">When you have the team but need the plan.</p>
                  <p className="level-desc">I build it and stay close to steer delivery. Your team runs the work, and I keep it holding together as it moves.</p>
                </div>
                <div className="level level-top">
                  <p className="level-name">Confidence Partner</p>
                  <p className="level-when">When it simply has to land.</p>
                  <p className="level-desc">I hold the outcome alongside you and drive the priorities end-to-end. My judgement in the room, and accountability for the work arriving as it should. I bring the people needed to execute at the highest level whilst maximising budget.</p>
                </div>
              </div>
                <p className="levels-close">Neither is decided now, nor is it priced now. We choose in the final session, with the roadmap in front of us.</p>
              </Disclosure>

            </div>
          </section>

          {/* ── Close ─────────────────────────────────────────────── */}
          <section className="close">
            <div className="dark close-panel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="close-crown" src="/images/DabHands_crown_white.png" alt="" aria-hidden decoding="async" width={467} height={367} />
              <h2>Five more patients per clinic, per week. Six weeks to find out where they are going and what to do about it.</h2>
              <div className="actions">
                <a className="btn btn-primary" href="mailto:darren@dabhands.delivery?subject=Eterna%20%7C%20The%20First%20Six%20Weeks%20%7C%20Confidence%20Map%20%7C%20v1%20Proposal">Reply to Darren</a>
              </div>
            </div>
            <p className="signoff">DAB Hands &middot; Keeping important work moving</p>
          </section>
        </main>
      </div>
    </>
  );
}
