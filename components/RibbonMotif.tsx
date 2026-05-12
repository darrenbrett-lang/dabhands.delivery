import { motion } from 'framer-motion';

interface RibbonMotifProps {
  className?: string;
  variant?: 'hero' | 'separator';
  tone?: 'dark' | 'light';
  animated?: boolean;
}

// The flowing signal/ribbon brand device: scattered streams on the left converge
// toward a tight bundle on the right. Represents fragmented signals becoming aligned.
// `hero` is the large dominant composition; `separator` is a thinner band for transitions.
// `tone="dark"` = dark strokes for light bg (default). `tone="light"` = light strokes for dark bg.
export const RibbonMotif = ({ className = '', variant = 'hero', tone = 'dark', animated = false }: RibbonMotifProps) => {
  const W = 1280;
  const H = variant === 'hero' ? 560 : 200;
  const cy = H / 2;
  const spreadRatio = variant === 'hero' ? 0.78 : 0.55;
  const spread = H * spreadRatio;
  const convergeX = W * 0.92;

  // [yOffsetRatio, strokeWidth, accent, opacity]
  // Mixing thick + thin ribbons gives the motif texture without ornament.
  const ribbons: Array<[number, number, 'charcoal' | 'green', number]> = [
    [-0.48, 1.2, 'charcoal', 0.16],
    [-0.40, 3.5, 'charcoal', 0.20],
    [-0.32, 1.0, 'charcoal', 0.14],
    [-0.24, 6, 'charcoal', 0.18],
    [-0.16, 1.5, 'green', 0.85],
    [-0.08, 2.5, 'charcoal', 0.22],
    [0.0, 1.0, 'charcoal', 0.30],
    [0.08, 9, 'charcoal', 0.16],
    [0.16, 1.2, 'charcoal', 0.18],
    [0.24, 3, 'charcoal', 0.20],
    [0.32, 1.5, 'green', 0.85],
    [0.40, 5, 'charcoal', 0.18],
    [0.48, 1.0, 'charcoal', 0.14],
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {ribbons.map(([yRatio, sw, accent, op], i) => {
        const sy = cy + yRatio * spread;
        const cp1x = W * 0.42;
        const cp1y = sy;
        const cp2x = W * 0.72;
        const cp2y = cy + yRatio * spread * 0.18;
        const d = `M 0 ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${convergeX} ${cy}`;
        const baseStroke = tone === 'light' ? '#FAFAFA' : '#000000';
        const stroke = accent === 'green' ? '#B7FF00' : baseStroke;
        return animated ? (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
            initial={{ strokeOpacity: op * 0.4 }}
            animate={{ strokeOpacity: [op * 0.6, op, op * 0.6] }}
            transition={{
              duration: 5 + i * 0.3,
              delay: i * 0.1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ) : (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={stroke}
            strokeWidth={sw}
            strokeOpacity={op}
            strokeLinecap="round"
          />
        );
      })}
      {/* Convergence dot — bright signal where ribbons meet */}
      <circle cx={convergeX} cy={cy} r={variant === 'hero' ? 6 : 4} fill="#B7FF00" />
      <circle cx={convergeX} cy={cy} r={variant === 'hero' ? 18 : 12} fill="#B7FF00" opacity={0.18} />
    </svg>
  );
};
