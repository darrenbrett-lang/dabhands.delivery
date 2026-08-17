/*
 * The Signal to Noise diagram, rebuilt as native SVG from the original
 * framework poster: the spine only (Idea & Intent → the two cog systems →
 * customer impact), in the house palette. Over it sits the interpretive
 * layer from the August 2026 brief: the person who said yes, two dashed
 * sight lines that stop short, and the shaded stretch between them that
 * nobody in the room can see.
 *
 * Two renderings: the full horizontal composition (md+) and a simplified
 * vertical one for small screens (person → system → gap → outcome), so the
 * shaded gap stays legible at 375px without zooming.
 */

// The diagram lives on the Slate Blue panel: bone line-work, a faint bone
// band, the gold-wash strip, and the light gold that stays legible on slate
// (plain gold fails AA there; see the palette notes).
const INK = 'var(--color-bone)';
const GRAPHITE = 'color-mix(in srgb, var(--color-bone) 72%, transparent)';
const GOLD = 'var(--color-gold)';
const DEEP_GOLD = '#EBD4A8';
const BAND_FILL = 'color-mix(in srgb, var(--color-bone) 8%, transparent)';
const STRIP_FILL = 'color-mix(in srgb, var(--color-gold) 20%, transparent)';

const BIG_COGS = ['Strategy', 'Brand', 'Commercial', 'Product', 'Content', 'Technology', 'Operations'];
const SMALL_COGS = ['Brief', 'Plan', 'Design', 'Produce', 'Review', 'Approve', 'Deploy'];

const DESCRIPTION =
  'Diagram. You, at the left, said yes to an idea. The idea enters a wide band where two systems work on it at once: a business system of large cogs labelled strategy, brand, commercial, product, content, technology and operations, and a process system of small cogs labelled brief, plan, design, produce, review, approve and deploy. A dashed sight line from you, labelled what you can see, reaches only a short way into the band before it stops. A second dashed line from the customer impact panel at the right, labelled what turned up, reaches only a short way back. The stretch between the two, covering the middle cogs of both rows, is shaded and labelled you can’t see this.';

// A calm, sketch-weight cog: a circle with radial teeth and a centre dot.
const Cog = ({ cx, cy, r, teeth }: { cx: number; cy: number; r: number; teeth: number }) => {
  const lines = [];
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    const toothLen = r * 0.24;
    lines.push(
      <line
        key={i}
        x1={cx + Math.cos(a) * r}
        y1={cy + Math.sin(a) * r}
        x2={cx + Math.cos(a) * (r + toothLen)}
        y2={cy + Math.sin(a) * (r + toothLen)}
        strokeLinecap="round"
      />,
    );
  }
  return (
    <g stroke={INK} strokeWidth="1.4" fill="none">
      <circle cx={cx} cy={cy} r={r} />
      {lines}
      <circle cx={cx} cy={cy} r={r * 0.13} fill={INK} stroke="none" />
    </g>
  );
};

// The person who said yes: head and shoulders, nothing clever.
const Figure = ({ cx, cy }: { cx: number; cy: number }) => (
  <g stroke={INK} strokeWidth="1.6" fill="none">
    <circle cx={cx} cy={cy} r={9} />
    <path d={`M ${cx - 15} ${cy + 34} Q ${cx} ${cy + 8} ${cx + 15} ${cy + 34}`} />
  </g>
);

const label = {
  fontFamily: 'inherit',
} as const;

export const SignalToNoiseDesktop = () => (
  <svg
    viewBox="0 0 1160 500"
    role="img"
    aria-label={DESCRIPTION}
    className="hidden md:block w-full h-auto select-none"
  >
    {/* ── The system band ── */}
    <rect x="226" y="66" width="770" height="366" rx="14" style={{ fill: BAND_FILL }} />

    {/* ── The shaded stretch nobody can see (under the cogs, above the band) ── */}
    <rect x="430" y="66" width="360" height="366" style={{ fill: STRIP_FILL }} />
    <line x1="430" y1="66" x2="430" y2="432" stroke={GOLD} strokeWidth="1" strokeDasharray="3 5" opacity="0.7" />
    <line x1="790" y1="66" x2="790" y2="432" stroke={GOLD} strokeWidth="1" strokeDasharray="3 5" opacity="0.7" />
    <text x="610" y="92" textAnchor="middle" fontSize="11.5" letterSpacing="0.16em" fill={DEEP_GOLD} style={label}>
      YOU CAN’T SEE THIS
    </text>

    {/* ── You, and the idea you backed ── */}
    <Figure cx={46} cy={172} />
    <text x="46" y="234" textAnchor="middle" fontSize="13" fontWeight="600" fill={INK} style={label}>You</text>
    <text x="46" y="252" textAnchor="middle" fontSize="11.5" fill={GRAPHITE} style={label}>said yes</text>

    <rect x="88" y="160" width="108" height="52" rx="10" fill="none" stroke={INK} strokeWidth="1.4" />
    <text x="142" y="190" textAnchor="middle" fontSize="12" fill={INK} style={label}>Idea &amp; intent</text>
    <line x1="196" y1="186" x2="226" y2="186" stroke={INK} strokeWidth="1.4" />

    {/* ── Business system: the big cogs ── */}
    <text x="246" y="128" fontSize="11" letterSpacing="0.14em" fill={GRAPHITE} style={label}>THE BUSINESS SYSTEM</text>
    {BIG_COGS.map((name, i) => {
      const cx = 286 + i * 112;
      return (
        <g key={name}>
          <Cog cx={cx} cy={196} r={28} teeth={8} />
          <text x={cx} y={252} textAnchor="middle" fontSize="10.5" letterSpacing="0.06em" fill={GRAPHITE} style={label}>
            {name}
          </text>
        </g>
      );
    })}

    {/* ── Process system: the small cogs ── */}
    <text x="246" y="308" fontSize="11" letterSpacing="0.14em" fill={GRAPHITE} style={label}>THE PROCESS SYSTEM</text>
    {SMALL_COGS.map((name, i) => {
      const cx = 286 + i * 112;
      return (
        <g key={name}>
          <Cog cx={cx} cy={356} r={18} teeth={6} />
          <text x={cx} y={402} textAnchor="middle" fontSize="10.5" letterSpacing="0.06em" fill={GRAPHITE} style={label}>
            {name}
          </text>
        </g>
      );
    })}

    {/* ── Customer impact ── */}
    <line x1="996" y1="186" x2="1020" y2="186" stroke={INK} strokeWidth="1.4" />
    <rect x="1020" y="146" width="124" height="80" rx="12" fill="none" stroke={INK} strokeWidth="1.4" />
    <text x="1082" y="181" textAnchor="middle" fontSize="12.5" fontWeight="500" fill={INK} style={label}>Customer</text>
    <text x="1082" y="199" textAnchor="middle" fontSize="12.5" fontWeight="500" fill={INK} style={label}>impact</text>

    {/* ── The sight lines: they stop, they don't arrive ── */}
    <g stroke={INK} strokeWidth="1.3" opacity="0.75">
      <line x1="58" y1="34" x2="430" y2="34" strokeDasharray="6 5" />
      <line x1="430" y1="25" x2="430" y2="43" />
      <line x1="1082" y1="34" x2="790" y2="34" strokeDasharray="6 5" />
      <line x1="790" y1="25" x2="790" y2="43" />
    </g>
    <text x="58" y="20" fontSize="11.5" fill={GRAPHITE} style={label}>what you can see</text>
    <text x="1082" y="20" textAnchor="end" fontSize="11.5" fill={GRAPHITE} style={label}>what turned up</text>
    <line x1="46" y1="44" x2="46" y2="150" stroke={INK} strokeWidth="1" opacity="0.25" />
    <line x1="1082" y1="44" x2="1082" y2="134" stroke={INK} strokeWidth="1" opacity="0.25" />
  </svg>
);

// The small-screen slots cycle their labels through the full seven stages
// (3s per phase, CSS-driven), so the simplified telling carries everything
// the desktop one does. Slots of two use a 6s window, slots of three a 9s
// window; all switch on the same 3s beat. Reduced motion pins the first
// label of each slot. Distribution: 2 + 2 + 3 covers all seven per row.
const MOBILE_BUSINESS: string[][] = [
  ['Strategy', 'Product'],
  ['Brand', 'Content'],
  ['Commercial', 'Technology', 'Operations'],
];
const MOBILE_PROCESS: string[][] = [
  ['Brief', 'Produce'],
  ['Plan', 'Review'],
  ['Design', 'Approve', 'Deploy'],
];

const CyclingLabel = ({ variants, x, y }: { variants: string[]; x: number; y: number }) => (
  <>
    {variants.map((name, i) => (
      <text
        key={name}
        x={x}
        y={y}
        textAnchor="middle"
        fontSize="10"
        letterSpacing="0.05em"
        fill={GRAPHITE}
        style={label}
        className={`${variants.length === 3 ? 'sn-seq3' : 'sn-seq2'} ${i === 1 ? 'sn-d1' : ''} ${i === 2 ? 'sn-d2' : ''} ${i === 0 ? 'sn-first' : ''}`}
      >
        {name}
      </text>
    ))}
  </>
);

// The small-screen telling: person → system → gap → outcome, top to bottom.
// Both cog rows sit fully inside the shaded stretch (that overlap is the
// argument); a thin visible sliver remains at each end of the band, where
// the two sight lines stop. Labels keep clear lanes: nothing collides.
export const SignalToNoiseMobile = () => (
  <svg
    viewBox="0 0 360 600"
    role="img"
    aria-label={DESCRIPTION}
    className="md:hidden w-full h-auto select-none"
  >
    {/* You and the idea */}
    <Figure cx={40} cy={26} />
    <text x="72" y="26" fontSize="13" fontWeight="600" fill={INK} style={label}>You</text>
    <text x="72" y="43" fontSize="11.5" fill={GRAPHITE} style={label}>said yes</text>
    <rect x="216" y="8" width="128" height="44" rx="10" fill="none" stroke={INK} strokeWidth="1.4" />
    <text x="280" y="34" textAnchor="middle" fontSize="12" fill={INK} style={label}>Idea &amp; intent</text>

    {/* The system band */}
    <rect x="16" y="104" width="328" height="372" rx="12" style={{ fill: BAND_FILL }} />

    {/* Sight line in: stops just inside the band's top sliver */}
    <line x1="40" y1="68" x2="40" y2="128" stroke={INK} strokeWidth="1.3" strokeDasharray="6 5" opacity="0.75" />
    <line x1="31" y1="128" x2="49" y2="128" stroke={INK} strokeWidth="1.3" opacity="0.75" />
    <text x="58" y="132" fontSize="11.5" fill={GRAPHITE} style={label}>what you can see</text>

    {/* The shaded stretch: covers BOTH rows, labels and all */}
    <rect x="16" y="142" width="328" height="294" style={{ fill: STRIP_FILL }} />
    <line x1="16" y1="142" x2="344" y2="142" stroke={GOLD} strokeWidth="1" strokeDasharray="3 5" opacity="0.7" />
    <line x1="16" y1="436" x2="344" y2="436" stroke={GOLD} strokeWidth="1" strokeDasharray="3 5" opacity="0.7" />

    {/* Business row: each slot cycles through its share of the seven */}
    <text x="32" y="168" fontSize="10.5" letterSpacing="0.13em" fill={GRAPHITE} style={label}>THE BUSINESS SYSTEM</text>
    {MOBILE_BUSINESS.map((variants, i) => {
      const cx = 76 + i * 104;
      return (
        <g key={variants[0]}>
          <Cog cx={cx} cy={210} r={24} teeth={8} />
          <CyclingLabel variants={variants} x={cx} y={258} />
        </g>
      );
    })}

    {/* The strip label sits in the clear lane between the two rows */}
    <text x="180" y="296" textAnchor="middle" fontSize="11.5" letterSpacing="0.16em" fill={DEEP_GOLD} style={label}>
      YOU CAN’T SEE THIS
    </text>

    {/* Process row: same cycling, same beat */}
    <text x="32" y="330" fontSize="10.5" letterSpacing="0.13em" fill={GRAPHITE} style={label}>THE PROCESS SYSTEM</text>
    {MOBILE_PROCESS.map((variants, i) => {
      const cx = 76 + i * 104;
      return (
        <g key={variants[0]}>
          <Cog cx={cx} cy={372} r={16} teeth={6} />
          <CyclingLabel variants={variants} x={cx} y={412} />
        </g>
      );
    })}

    {/* Sight line back: stops just inside the band's bottom sliver */}
    <line x1="180" y1="524" x2="180" y2="452" stroke={INK} strokeWidth="1.3" strokeDasharray="6 5" opacity="0.75" />
    <line x1="171" y1="452" x2="189" y2="452" stroke={INK} strokeWidth="1.3" opacity="0.75" />
    <text x="194" y="502" fontSize="11.5" fill={GRAPHITE} style={label}>what turned up</text>

    {/* Customer impact */}
    <rect x="100" y="532" width="160" height="52" rx="12" fill="none" stroke={INK} strokeWidth="1.4" />
    <text x="180" y="563" textAnchor="middle" fontSize="12.5" fontWeight="500" fill={INK} style={label}>Customer impact</text>
  </svg>
);
