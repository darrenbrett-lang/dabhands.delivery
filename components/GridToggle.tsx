import { useState } from 'react';

/**
 * Floating design aid. Toggles a column-grid overlay that mirrors the live grid
 * (.u-container + .u-grid): 4 columns on mobile, 12 from md, with the same
 * gutters. Sits unobtrusively bottom-right.
 *
 * NB: rendered in every environment via Layout. Hide / gate it before promoting
 * the new site to production.
 */
export const GridToggle = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {visible && (
        <div className="pointer-events-none fixed inset-0 z-[100]">
          <div className="u-container h-full">
            <div className="u-grid h-full">
              {/* 12 columns; the last 8 only appear from md, matching .u-grid
                  collapsing to 4 columns on mobile. Coral so it reads on every
                  brand background (bone, charcoal, teal, the room pastels). */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-full ${i >= 4 ? 'hidden md:block' : ''}`}
                  style={{
                    backgroundColor: 'rgba(217,135,115,0.09)',
                    borderInline: '1px solid rgba(217,135,115,0.4)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-pressed={visible}
        aria-label="Toggle column grid overlay"
        className="fixed bottom-5 right-5 z-[101] inline-flex items-center gap-2 rounded-full bg-charcoal/90 px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-bone shadow-[0_10px_30px_-10px_rgba(31,31,29,0.6)] backdrop-blur transition-colors hover:bg-teal"
      >
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full transition-colors"
          style={{ backgroundColor: visible ? 'var(--color-coral)' : 'rgba(245,241,234,0.4)' }}
        />
        Grid
      </button>
    </>
  );
};
