import { Fragment, type ReactNode } from 'react';

// "\n" → a line break that only shows from md up: a deliberate break on desktop,
// natural wrapping on mobile. The space is preserved so the break point still
// reads as one space when the <br> is hidden.
export const withSoftBreaks = (s: string): ReactNode =>
  s.split('\n').map((part, i) => (
    <Fragment key={i}>
      {i > 0 && (
        <>
          {' '}
          <br className="hidden md:block" />
        </>
      )}
      {part}
    </Fragment>
  ));

// "\n" → an always-on hard line break (two-part headlines, e.g. the Challenge thesis).
export const withBreaks = (s: string): ReactNode =>
  s.split('\n').map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {part}
    </Fragment>
  ));
