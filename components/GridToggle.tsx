import { useState } from 'react';

/**
 * Floating dev tool. Click to toggle a 12-column grid overlay that matches the
 * site's container (`max-w-screen-xl` + responsive horizontal padding).
 */
export const GridToggle = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {visible && (
        <div className="pointer-events-none fixed inset-0 z-[100]">
          <div className="h-full max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid h-full grid-cols-12 gap-4 md:gap-6 lg:gap-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-full bg-dab-green/10 border-l border-r border-dab-green/30"
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
        className="fixed bottom-5 right-5 z-[101] px-3.5 py-2 rounded-full bg-dab-charcoal text-dab-cream font-mono text-[10px] tracking-[0.2em] uppercase shadow-lg hover:bg-dab-charcoal-alt transition-colors"
      >
        Grid&nbsp;·&nbsp;{visible ? 'on' : 'off'}
      </button>
    </>
  );
};
