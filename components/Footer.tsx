export const Footer = () => (
  <>
    <section id="contact-cta" className="bg-dab-green text-dab-charcoal">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
          <p className="text-lg md:text-xl lg:text-[22px] font-semibold tracking-[-0.02em] leading-snug max-w-[36ch]">
            If something important needs to move properly, let&rsquo;s talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 font-mono text-[11px] tracking-[0.18em] uppercase">
            <span>Darren Brett</span>
            <a href="mailto:db@dabhands.delivery" className="hover:opacity-60 transition-opacity">
              db@dabhands.delivery
            </a>
            <a href="tel:+447788711433" className="hover:opacity-60 transition-opacity">
              07788 711433
            </a>
          </div>
        </div>
      </div>
    </section>

    <footer className="bg-dab-charcoal text-dab-cream">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-dab-green" />
            <span className="font-semibold text-[15px] tracking-[-0.02em]">
              <span className="font-bold">Dab</span> Hands
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/darren-brett-1474403/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Darren Brett on LinkedIn"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/linkedin.png"
                alt=""
                width={16}
                height={16}
                className="block"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </a>
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-dab-brown">© 2026 Dab Hands</p>
          </div>
        </div>
      </div>
    </footer>
  </>
);
