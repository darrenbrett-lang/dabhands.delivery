import { useEffect, useRef } from 'react';
import { SeoMeta } from '@/components/SeoMeta';

/*
 * PRIVATE PAGE - unlisted. No nav links to it, noindex (SeoMeta + an
 * X-Robots-Tag header in next.config.ts), not in sitemap.xml or llms.txt.
 * A living reference for the DAB Hands v6 font and colour system, rendered
 * in the system it documents. Reuses the site's Instrument Serif + Manrope
 * (via --font-* vars); all styles scoped under .ds-doc so nothing leaks.
 */

const CSS = String.raw`
.ds-doc{
  --serif:var(--font-instrument-serif),Georgia,'Times New Roman',serif;
  --sans:var(--font-manrope),-apple-system,BlinkMacSystemFont,system-ui,sans-serif;

  /* Light = the brand's native warm-stone world */
  --ground:#F5F1EA;
  --ground-2:#FBF8F3;
  --panel:#FBF8F3;
  --ink:#1F1F1D;
  --muted:#5C5C58;
  --line:#D8D3CB;
  --line-soft:#E4DFD6;
  --gold:#C0974A;
  --gold-ink:#9A7735;
  --shadow:0 1px 0 rgba(31,31,29,.04), 0 18px 40px -28px rgba(31,31,29,.28);
}
@media (prefers-color-scheme:dark){
  .ds-doc{
    --ground:#1C1C1A;
    --ground-2:#232320;
    --panel:#232320;
    --ink:#F5F1EA;
    --muted:#B4AEA2;
    --line:#37362F;
    --line-soft:#2C2B26;
    --gold:#CBA25A;
    --gold-ink:#D9B36A;
    --shadow:0 1px 0 rgba(0,0,0,.2), 0 22px 46px -30px rgba(0,0,0,.7);
  }
}
.ds-doc[data-theme="light"]{
  --ground:#F5F1EA;--ground-2:#FBF8F3;--panel:#FBF8F3;--ink:#1F1F1D;--muted:#5C5C58;
  --line:#D8D3CB;--line-soft:#E4DFD6;--gold:#C0974A;--gold-ink:#9A7735;
  --shadow:0 1px 0 rgba(31,31,29,.04), 0 18px 40px -28px rgba(31,31,29,.28);
}
.ds-doc[data-theme="dark"]{
  --ground:#1C1C1A;--ground-2:#232320;--panel:#232320;--ink:#F5F1EA;--muted:#B4AEA2;
  --line:#37362F;--line-soft:#2C2B26;--gold:#CBA25A;--gold-ink:#D9B36A;
  --shadow:0 1px 0 rgba(0,0,0,.2), 0 22px 46px -30px rgba(0,0,0,.7);
}

.ds-doc *{box-sizing:border-box}
.ds-doc{scroll-behavior:smooth}
.ds-doc{
  margin:0;background:var(--ground);color:var(--ink);
  font-family:var(--sans);font-weight:400;line-height:1.6;letter-spacing:-.006em;
  -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
  transition:background .3s ease,color .3s ease;
}
.ds-doc .wrap{max-width:960px;margin-inline:auto;padding:0 24px}
@media(min-width:768px){.ds-doc .wrap{padding:0 40px}}

/* ── type ─────────────────────────────────────────── */
.ds-doc h1,.ds-doc h2,.ds-doc h3{font-family:var(--serif);font-weight:400;letter-spacing:-.01em;line-height:1.06;text-wrap:balance;margin:0}
.ds-doc p{margin:0;text-wrap:pretty}
.ds-doc .eyebrow{
  font-family:var(--sans);font-size:11px;font-weight:500;letter-spacing:.22em;
  text-transform:uppercase;color:var(--gold-ink);margin:0;
}
.ds-doc .serif{font-family:var(--serif)}
.ds-doc .italic{font-style:italic}
.ds-doc .tnum{font-variant-numeric:tabular-nums}

/* ── rules & rhythm ───────────────────────────────── */
.ds-doc .rule{width:32px;height:2px;background:var(--gold);border:0;margin:0}
.ds-doc .hair{height:1px;background:var(--line);border:0;margin:0}
.ds-doc section{padding:64px 0}
.ds-doc section+section{border-top:1px solid var(--line-soft)}
@media(min-width:768px){.ds-doc section{padding:88px 0}}
.ds-doc .section-head{display:flex;flex-direction:column;gap:14px;margin-bottom:40px}
.ds-doc .section-head .rule{margin-bottom:2px}
.ds-doc .section-head h2{font-size:clamp(1.9rem,4.5vw,2.6rem)}
.ds-doc .lede{font-size:1.0625rem;color:var(--muted);max-width:60ch}

/* ── masthead ─────────────────────────────────────── */
.ds-doc .mast{padding:76px 0 56px;position:relative}
.ds-doc .mast .brandline{display:flex;align-items:center;gap:12px;margin-bottom:34px}
.ds-doc .dot{width:12px;height:12px;border-radius:50%;background:var(--gold);flex:none;box-shadow:0 0 0 4px color-mix(in srgb,var(--gold) 22%,transparent)}
.ds-doc .wordmark{font-family:var(--sans);font-weight:600;font-size:15px;letter-spacing:.01em}
.ds-doc .mast h1{font-size:clamp(2.9rem,9vw,5.5rem);line-height:1;margin:18px 0 22px}
.ds-doc .mast .stand{font-size:clamp(1.05rem,2.4vw,1.3rem);color:var(--muted);max-width:34ch}
.ds-doc .meta-row{display:flex;flex-wrap:wrap;gap:8px 28px;margin-top:38px}
.ds-doc .meta-row .k{font-family:var(--sans);font-size:12px;color:var(--muted)}
.ds-doc .meta-row .k b{color:var(--ink);font-weight:600}

.ds-doc .toggle{
  position:absolute;top:34px;right:0;display:inline-flex;align-items:center;gap:8px;
  background:var(--panel);border:1px solid var(--line);color:var(--ink);
  font-family:var(--sans);font-size:12px;font-weight:600;letter-spacing:.02em;
  padding:9px 14px;border-radius:999px;cursor:pointer;transition:border-color .2s,transform .2s;
}
.ds-doc .toggle:hover{border-color:var(--gold)}
.ds-doc .toggle:focus-visible{outline:2px solid var(--gold);outline-offset:3px}

/* ── typography specimens ─────────────────────────── */
.ds-doc .faces{display:grid;gap:20px;grid-template-columns:1fr}
@media(min-width:720px){.ds-doc .faces{grid-template-columns:1fr 1fr}}
.ds-doc .face{
  background:var(--panel);border:1px solid var(--line);border-radius:14px;
  padding:30px 30px 26px;box-shadow:var(--shadow);display:flex;flex-direction:column;gap:6px;
}
.ds-doc .face .glyphs{font-size:clamp(3.6rem,11vw,5.4rem);line-height:.98;letter-spacing:-.02em}
.ds-doc .face .role{margin-top:14px;display:flex;flex-direction:column;gap:3px}
.ds-doc .face .fname{font-family:var(--sans);font-weight:600;font-size:15px}
.ds-doc .face .fmeta{font-family:var(--sans);font-size:12.5px;color:var(--muted)}
.ds-doc .face .fspecs{font-family:var(--sans);font-size:12px;color:var(--muted);margin-top:12px;line-height:1.55}
.ds-doc .face .fspecs code{font-family:var(--sans);color:var(--ink);font-weight:600;font-variant-numeric:tabular-nums}

.ds-doc .scale{margin-top:40px;display:flex;flex-direction:column}
.ds-doc .step{display:grid;grid-template-columns:1fr auto;align-items:baseline;gap:16px 24px;padding:18px 0;border-top:1px solid var(--line-soft)}
.ds-doc .step:first-child{border-top:0}
.ds-doc .step .sample{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
.ds-doc .step .spec{font-family:var(--sans);font-size:12px;color:var(--muted);text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}
.ds-doc .step .spec b{color:var(--ink);font-weight:600}
.ds-doc .s-display{font-family:var(--serif);font-size:3.2rem;line-height:1.02}
.ds-doc .s-h1{font-family:var(--serif);font-size:2.3rem}
.ds-doc .s-h2{font-family:var(--serif);font-size:1.7rem}
.ds-doc .s-h3{font-family:var(--serif);font-size:1.28rem}
.ds-doc .s-bodyl{font-family:var(--sans);font-size:1.125rem}
.ds-doc .s-body{font-family:var(--sans);font-size:1rem}
.ds-doc .s-cap{font-family:var(--sans);font-size:.8125rem;color:var(--muted)}
.ds-doc .s-eye{font-family:var(--sans);font-size:11px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-ink)}

/* ── colour ───────────────────────────────────────── */
.ds-doc .grouplabel{margin:36px 0 16px}
.ds-doc .grouplabel:first-of-type{margin-top:8px}
.ds-doc .swatches{display:grid;gap:14px;grid-template-columns:repeat(auto-fill,minmax(220px,1fr))}
.ds-doc .sw{border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--panel);box-shadow:var(--shadow)}
.ds-doc .sw .chip{height:112px;padding:14px 15px;display:flex;flex-direction:column;justify-content:space-between}
.ds-doc .sw .chip .aa{font-family:var(--serif);font-size:2rem;line-height:1}
.ds-doc .sw .chip .hx{font-family:var(--sans);font-size:12px;font-weight:600;letter-spacing:.04em;font-variant-numeric:tabular-nums;opacity:.92}
.ds-doc .sw .info{padding:12px 15px 14px;display:flex;flex-direction:column;gap:3px;border-top:1px solid var(--line)}
.ds-doc .sw .nm{font-family:var(--sans);font-weight:600;font-size:13.5px}
.ds-doc .sw .tok{font-family:var(--sans);font-size:11.5px;color:var(--gold-ink);font-weight:600}
.ds-doc .sw .rl{font-family:var(--sans);font-size:12px;color:var(--muted);line-height:1.45}
.ds-doc .fg-ink{color:#1F1F1D}
.ds-doc .fg-bone{color:#F5F1EA}

/* ── brand marks ──────────────────────────────────── */
.ds-doc .marks{display:grid;gap:14px;grid-template-columns:1fr}
@media(min-width:720px){.ds-doc .marks{grid-template-columns:1fr 1fr}}
.ds-doc .mark-card{border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--panel);box-shadow:var(--shadow);display:flex;flex-direction:column}
.ds-doc .mark-stage{display:flex;align-items:center;justify-content:center;min-height:136px;padding:28px;background:var(--ground-2)}
.ds-doc .mark-dot{width:26px;height:26px;border-radius:50%;background:var(--gold);box-shadow:0 0 0 8px color-mix(in srgb,var(--gold) 22%,transparent)}
.ds-doc .crown-svg{width:auto;height:58px;color:var(--ink)}
.ds-doc .mark-meta{display:flex;flex-direction:column;gap:3px;padding:16px 18px 18px;border-top:1px solid var(--line)}
.ds-doc .mark-meta .nm{font-family:var(--sans);font-weight:600;font-size:14px}
.ds-doc .mark-meta .tok{font-family:var(--sans);font-size:11.5px;color:var(--gold-ink);font-weight:600}
.ds-doc .mark-meta .rl{font-family:var(--sans);font-size:12.5px;color:var(--muted);line-height:1.5;margin-top:5px;max-width:46ch}

/* ── the logo ─────────────────────────────────────── */
.ds-doc .logo-lockup{display:flex;align-items:center;justify-content:center;gap:20px;padding:48px 28px;background:var(--ground-2);border:1px solid var(--line);border-radius:14px}
.ds-doc .mark-dot-lg{width:30px;height:30px;box-shadow:0 0 0 9px color-mix(in srgb,var(--gold) 22%,transparent)}
.ds-doc .logo-word{font-family:var(--sans);font-weight:600;font-size:clamp(1.9rem,5.5vw,2.7rem);letter-spacing:-.02em;color:var(--ink);line-height:1}
.ds-doc .logo-cap{font-family:var(--sans);font-size:12px;color:var(--muted);text-align:center;margin-top:12px}
.ds-doc .meaning{display:grid;grid-template-columns:1fr;margin:30px 0 4px}
@media(min-width:720px){.ds-doc .meaning{grid-template-columns:repeat(3,1fr);column-gap:28px}}
.ds-doc .mng{display:flex;flex-direction:column;gap:8px;border-top:1px solid var(--line);padding:16px 0 6px}
.ds-doc .mng-k{font-family:var(--sans);font-size:11px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-ink)}
.ds-doc .mng p{font-family:var(--sans);font-size:13.5px;line-height:1.55;color:var(--muted);max-width:32ch}
.ds-doc .logo-icon{display:block;line-height:0}
.ds-doc .logo-icon svg{width:88px;height:88px;border-radius:20px;display:block;box-shadow:var(--shadow);border:1px solid var(--line)}

/* ── layout tokens ────────────────────────────────── */
.ds-doc .measures{display:flex;flex-direction:column;gap:12px;margin-top:8px}
.ds-doc .measure{display:flex;flex-direction:column;gap:8px}
.ds-doc .measure .lbl{display:flex;justify-content:space-between;align-items:baseline;gap:16px;font-family:var(--sans);font-size:13px}
.ds-doc .measure .lbl .nm{font-weight:600}
.ds-doc .measure .lbl .val{color:var(--muted);font-variant-numeric:tabular-nums}
.ds-doc .measure .bar{height:10px;border-radius:5px;background:linear-gradient(90deg,var(--gold),color-mix(in srgb,var(--gold) 40%,var(--line)));position:relative}
.ds-doc .tokengrid{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));margin-top:28px}
.ds-doc .tk{border:1px solid var(--line);border-radius:10px;padding:14px 16px;background:var(--panel)}
.ds-doc .tk .tn{font-family:var(--sans);font-size:12px;color:var(--gold-ink);font-weight:600}
.ds-doc .tk .tv{font-family:var(--serif);font-size:1.5rem;margin:4px 0 2px;font-variant-numeric:tabular-nums}
.ds-doc .tk .td{font-family:var(--sans);font-size:12px;color:var(--muted)}

/* ── rules list ───────────────────────────────────── */
.ds-doc .rules{display:grid;gap:2px;margin-top:6px}
.ds-doc .ru{display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:start;padding:18px 0;border-top:1px solid var(--line-soft)}
.ds-doc .ru:first-child{border-top:0}
.ds-doc .ru .mk{font-family:var(--serif);font-size:1.5rem;color:var(--gold);line-height:1;margin-top:-2px}
.ds-doc .ru h3{font-size:1.18rem;margin-bottom:5px}
.ds-doc .ru p{font-size:.95rem;color:var(--muted);max-width:62ch}
.ds-doc .ru code{font-family:var(--sans);font-weight:600;color:var(--ink);background:color-mix(in srgb,var(--gold) 14%,transparent);padding:1px 6px;border-radius:5px;font-size:.85em}
.ds-doc .ban{text-decoration:line-through;text-decoration-color:var(--gold);color:var(--muted)}

/* ── foot ─────────────────────────────────────────── */
.ds-doc footer{padding:52px 0 72px;border-top:1px solid var(--line-soft)}
.ds-doc footer p{font-family:var(--sans);font-size:12.5px;color:var(--muted);line-height:1.7}
.ds-doc footer code{font-family:var(--sans);color:var(--ink);font-weight:600}
.ds-doc .pull{font-family:var(--serif);font-style:italic;font-size:clamp(1.5rem,4vw,2rem);line-height:1.2;color:var(--ink);max-width:24ch;margin-bottom:28px}

@media (prefers-reduced-motion:reduce){.ds-doc *{transition:none!important;scroll-behavior:auto!important}}

.ds-doc{min-height:100dvh}`;

const BODY = String.raw`<div class="wrap">

  <header class="mast">
    <button class="toggle" id="themeBtn" type="button" aria-label="Toggle light and dark theme">
      <span id="themeIcon">&#9681;</span><span id="themeLabel">Dark</span>
    </button>
    <div class="brandline">
      <span class="dot" aria-hidden="true"></span>
      <span class="wordmark">DAB Hands</span>
    </div>
    <p class="eyebrow">Design System &nbsp;&middot;&nbsp; Palette v6</p>
    <h1>The font &amp;<br>colour system</h1>
    <p class="stand">The earthy, grounded type and colour that carry every DAB Hands surface.</p>
    <div class="meta-row">
      <span class="k"><b>Source</b> &nbsp;styles/globals.css</span>
      <span class="k"><b>Faces</b> &nbsp;Instrument Serif &middot; Manrope</span>
      <span class="k"><b>Updated</b> &nbsp;July 2026</span>
    </div>
  </header>

  <!-- TYPOGRAPHY -->
  <section id="type">
    <div class="section-head">
      <hr class="rule">
      <p class="eyebrow">Typography</p>
      <h2>Two faces, one voice</h2>
      <p class="lede">Instrument Serif carries the display and is allowed to breathe, a single weight with a true italic for pull quotes. Manrope runs everything you operate: body, navigation, buttons, cards.</p>
    </div>

    <div class="faces">
      <div class="face">
        <div class="glyphs serif">Aa</div>
        <div class="role">
          <span class="fname">Instrument Serif</span>
          <span class="fmeta">Display &middot; headings &middot; pull quotes</span>
        </div>
        <p class="fspecs">Weight <code>400</code> only, plus a true <span class="serif italic">italic</span>. Set with <code>-0.01em</code> tracking, <code>1.06</code> line-height, balanced wrap. Colour is inherited from the section, never fixed on the heading.</p>
      </div>
      <div class="face">
        <div class="glyphs" style="font-family:var(--sans);font-weight:600">Aa</div>
        <div class="role">
          <span class="fname">Manrope</span>
          <span class="fmeta">Body &middot; interface &middot; labels</span>
        </div>
        <p class="fspecs">Weights <code>400</code> / <code>500</code> / <code>600</code>. Body sits at <code>1.6</code> line-height, <code>-0.006em</code> tracking. Also the eyebrow face: 11px, 500, uppercase, <code>0.22em</code>.</p>
      </div>
    </div>

    <div class="scale" aria-label="Type scale">
      <div class="step"><span class="sample s-display serif">Turn ambition into impact</span><span class="spec"><b>Display</b> &middot; 3.2rem / 1.02</span></div>
      <div class="step"><span class="sample s-h1 serif">Where I help</span><span class="spec"><b>H1</b> &middot; 2.3rem</span></div>
      <div class="step"><span class="sample s-h2 serif">The confidence map</span><span class="spec"><b>H2</b> &middot; 1.7rem</span></div>
      <div class="step"><span class="sample s-h3 serif">Marks of skilled hands</span><span class="spec"><b>H3</b> &middot; 1.28rem</span></div>
      <div class="step"><span class="sample s-bodyl">Capability is abundant; judgement is the edge.</span><span class="spec"><b>Body L</b> &middot; 1.125rem &middot; Manrope</span></div>
      <div class="step"><span class="sample s-body">Emotion comes from imagery, clarity from contrast.</span><span class="spec"><b>Body</b> &middot; 1rem &middot; Manrope 400</span></div>
      <div class="step"><span class="sample s-cap">Supporting caption and fine print.</span><span class="spec"><b>Caption</b> &middot; 0.8125rem</span></div>
      <div class="step"><span class="sample s-eye">Section eyebrow</span><span class="spec"><b>Eyebrow</b> &middot; 11px &middot; 0.22em</span></div>
    </div>
  </section>

  <!-- COLOUR -->
  <section id="colour">
    <div class="section-head">
      <hr class="rule">
      <p class="eyebrow">Colour &middot; v6 earthy palette</p>
      <h2>Restrained by design</h2>
      <p class="lede">A grounded, earthy system. Charcoal and warm stone carry the interface; slate, walnut and clay hold the dark and washed surfaces; aged gold is the one expressive accent. Emotion comes from the photography, not the palette.</p>
    </div>

    <p class="eyebrow grouplabel">Grounds</p>
    <div class="swatches">
      <div class="sw"><div class="chip fg-ink" style="background:#F5F1EA"><span class="aa">Aa</span><span class="hx">#F5F1EA</span></div><div class="info"><span class="nm">Warm Stone</span><span class="tok">--color-bone</span><span class="rl">Primary background.</span></div></div>
      <div class="sw"><div class="chip fg-ink" style="background:#FBF8F3"><span class="aa">Aa</span><span class="hx">#FBF8F3</span></div><div class="info"><span class="nm">Paper</span><span class="tok">--color-paper</span><span class="rl">Lighter secondary background.</span></div></div>
    </div>

    <p class="eyebrow grouplabel">Ink &amp; text</p>
    <div class="swatches">
      <div class="sw"><div class="chip fg-bone" style="background:#1F1F1D"><span class="aa">Aa</span><span class="hx">#1F1F1D</span></div><div class="info"><span class="nm">Charcoal</span><span class="tok">--color-ink / --color-charcoal</span><span class="rl">Primary text and dark sections.</span></div></div>
      <div class="sw"><div class="chip fg-bone" style="background:#5C5C58"><span class="aa">Aa</span><span class="hx">#5C5C58</span></div><div class="info"><span class="nm">Graphite</span><span class="tok">--color-graphite</span><span class="rl">Secondary and body text.</span></div></div>
    </div>

    <p class="eyebrow grouplabel">Structure</p>
    <div class="swatches">
      <div class="sw"><div class="chip fg-ink" style="background:#D8D3CB"><span class="aa">Aa</span><span class="hx">#D8D3CB</span></div><div class="info"><span class="nm">Soft Grey</span><span class="tok">--color-stone</span><span class="rl">Borders, dividers, subtle fills.</span></div></div>
    </div>

    <p class="eyebrow grouplabel">Brand accents</p>
    <div class="swatches">
      <div class="sw"><div class="chip fg-bone" style="background:#535B68"><span class="aa">Aa</span><span class="hx">#535B68</span></div><div class="info"><span class="nm">Slate Blue</span><span class="tok">--color-blue-green</span><span class="rl">Interactive, solid panels, emphasis.</span></div></div>
      <div class="sw"><div class="chip fg-bone" style="background:#53403B"><span class="aa">Aa</span><span class="hx">#53403B</span></div><div class="info"><span class="nm">Walnut</span><span class="tok">--color-walnut</span><span class="rl">Warm dark sections, footer.</span></div></div>
      <div class="sw"><div class="chip fg-ink" style="background:#A49786"><span class="aa">Aa</span><span class="hx">#A49786</span></div><div class="info"><span class="nm">Warm Clay</span><span class="tok">--color-clay</span><span class="rl">Soft hero washes, section highlights.</span></div></div>
      <div class="sw"><div class="chip fg-ink" style="background:#C0974A"><span class="aa">Aa</span><span class="hx">#C0974A</span></div><div class="info"><span class="nm">Aged Gold</span><span class="tok">--color-gold</span><span class="rl">The accent: arrows, eyebrows, current-page, CTA hover.</span></div></div>
    </div>
  </section>

  <!-- THE LOGO -->
  <section id="logo">
    <div class="section-head">
      <hr class="rule">
      <p class="eyebrow">The logo</p>
      <h2>The dab</h2>
      <p class="lede">A single, deliberate mark. The gold dot is the dab: the touch of an expert hand. The soft halo around it is where the meaning lives.</p>
    </div>

    <div class="logo-lockup">
      <span class="mark-dot mark-dot-lg" aria-hidden="true"></span>
      <span class="logo-word">DAB Hands</span>
    </div>
    <p class="logo-cap">Wordmark set in Manrope, semibold.</p>

    <div class="meaning">
      <div class="mng"><span class="mng-k">The dab</span><p>The gold dot is the mark made by the expert. One deliberate touch from a capable hand.</p></div>
      <div class="mng"><span class="mng-k">One to many</span><p>The wider mark, the halo, describes the relationship of the one to the many that DAB Hands can represent.</p></div>
      <div class="mng"><span class="mng-k">The signal</span><p>The signal in the system: the signal-to-noise and safe-passage problem that DAB Hands represents.</p></div>
    </div>

    <p class="eyebrow grouplabel">The two marks</p>
    <div class="marks">
      <div class="mark-card">
        <div class="mark-stage">
          <span class="logo-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="7" fill="#201F1D"/><circle cx="16" cy="16" r="7.71" fill="#D5B98D"/></svg>
          </span>
        </div>
        <div class="mark-meta">
          <span class="nm">The full mark</span>
          <span class="tok">favicon.svg / app icon</span>
          <p class="rl">The mark standing alone: a sand gold disc on a charcoal field (#D5B98D on #201F1D). The favicon, app icon and avatar, wherever the wordmark cannot follow. A lighter gold than the nav lockup, so it holds on the dark ground.</p>
        </div>
      </div>
      <div class="mark-card">
        <div class="mark-stage">
          <svg class="crown-svg" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M46 85 L52 50 L66 68 L80 40 L94 68 L108 50 L114 85"/>
              <path d="M40 85 L120 85"/>
              <path d="M40 93 L120 93"/>
              <path d="M40 85 L40 93"/>
              <path d="M120 85 L120 93"/>
            </g>
            <g fill="currentColor">
              <circle cx="52" cy="50" r="2.4"/>
              <circle cx="80" cy="40" r="2.4"/>
              <circle cx="108" cy="50" r="2.4"/>
            </g>
          </svg>
        </div>
        <div class="mark-meta">
          <span class="nm">The crown</span>
          <span class="tok">/images/crown-mark.webp</span>
          <p class="rl">The expressive signifier. Set centred above key headings: the homepage hero, section openers, the close, and Contact. Always decorative and aria-hidden, roughly 36 to 40px, using the mark on light grounds or its bone variant on dark. Used sparingly, so it keeps its weight.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- LAYOUT -->
  <section id="layout">
    <div class="section-head">
      <hr class="rule">
      <p class="eyebrow">Layout</p>
      <h2>One grid, three measures</h2>
      <p class="lede">One page container, a 12-column grid inside it (4 on mobile), and named reading measures for centred text. Every module uses the shared container; nothing sets its own width.</p>
    </div>

    <div class="measures">
      <div class="measure">
        <div class="lbl"><span class="nm">Page container</span><span class="val">80rem &middot; 1280px</span></div>
        <div class="bar" style="width:100%"></div>
      </div>
      <div class="measure">
        <div class="lbl"><span class="nm">Statement measure</span><span class="val">60rem &middot; 960px</span></div>
        <div class="bar" style="width:75%"></div>
      </div>
      <div class="measure">
        <div class="lbl"><span class="nm">Reading measure</span><span class="val">50rem &middot; 800px</span></div>
        <div class="bar" style="width:62.5%"></div>
      </div>
    </div>

    <div class="tokengrid">
      <div class="tk"><span class="tn">Outer gutter</span><span class="tv tnum">24 / 40 / 64</span><span class="td">px-6 / md:px-10 / lg:px-16</span></div>
      <div class="tk"><span class="tn">Column gutter</span><span class="tv tnum">24 / 32</span><span class="td">gap-x-6 / lg:gap-x-8</span></div>
      <div class="tk"><span class="tn">Section rhythm</span><span class="tv tnum">80 / 112 / 128</span><span class="td">py-20 / md:py-28 / lg:py-32</span></div>
      <div class="tk"><span class="tn">Deep beat</span><span class="tv tnum">96 / 128 / 160</span><span class="td">py-24 / md:py-32 / lg:py-40</span></div>
    </div>
  </section>

  <!-- RULES -->
  <section id="rules">
    <div class="section-head">
      <hr class="rule">
      <p class="eyebrow">House rules</p>
      <h2>The non-negotiables</h2>
      <p class="lede">A handful of hard rules keep every surface on-brand. These override convenience.</p>
    </div>

    <div class="rules">
      <div class="ru"><span class="mk">*</span><div><h3>No em dashes, ever</h3><p>A hard rule for all user-facing copy. Use commas, periods, colons or parentheses instead.</p></div></div>
      <div class="ru"><span class="mk">*</span><div><h3>White text is always bone</h3><p>Never <code>text-white</code>. Use bone <code>#F5F1EA</code> for light text, including on charcoal and walnut sections.</p></div></div>
      <div class="ru"><span class="mk">*</span><div><h3>The wordmark is "DAB Hands"</h3><p>Uppercase DAB, capital-H Hands. Audience labels stay Title Case, and only as labels, never mid-sentence.</p></div></div>
      <div class="ru"><span class="mk">*</span><div><h3>Headings inherit their colour</h3><p>Instrument Serif headings never fix a colour; they take it from the section so they stay legible on dark grounds.</p></div></div>
      <div class="ru"><span class="mk">*</span><div><h3>Version image filenames</h3><p>Assets cache immutable for a year. Replace at a new filename (<code>foo.webp</code> to <code>foo-2.webp</code>) and update the src; favicons use <code>?v=N</code>.</p></div></div>
    </div>
  </section>

  <footer>
    <p class="pull serif">Capability has never been more abundant. Judgement has rarely been the sharper edge.</p>
    <p>Rendered in the system it documents: Instrument Serif and Manrope, warm stone and charcoal, aged gold.<br>Source of truth: <code>styles/globals.css</code> and <code>pages/_app.tsx</code>. Palette v6, July 2026.</p>
  </footer>

</div>`;

export default function DesignSystem() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const btn = root.querySelector<HTMLButtonElement>('#themeBtn');
    const icon = root.querySelector('#themeIcon');
    const label = root.querySelector('#themeLabel');
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const current = () => root.getAttribute('data-theme') || (mq.matches ? 'dark' : 'light');
    const paint = () => {
      const d = current() === 'dark';
      if (icon) icon.textContent = d ? '\u25D0' : '\u25D1';
      if (label) label.textContent = d ? 'Light' : 'Dark';
    };
    const onClick = () => {
      root.setAttribute('data-theme', current() === 'dark' ? 'light' : 'dark');
      paint();
    };
    btn?.addEventListener('click', onClick);
    mq.addEventListener('change', paint);
    paint();
    return () => {
      btn?.removeEventListener('click', onClick);
      mq.removeEventListener('change', paint);
    };
  }, []);

  return (
    <>
      <SeoMeta
        title="Design System | DAB Hands"
        description="Private reference for the DAB Hands v6 font and colour system."
        path="/design-system"
        noindex
      />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div ref={rootRef} className="ds-doc" dangerouslySetInnerHTML={{ __html: BODY }} />
    </>
  );
}
