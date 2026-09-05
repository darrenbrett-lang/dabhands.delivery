/**
 * The cue cards for /script.
 *
 * ⚠ These are LEARNING cards, not a teleprompter script. The paragraph under
 * each heading exists to put Darren back in contact with the idea before he
 * speaks freely. It is NOT meant to be read aloud, and it is deliberately more
 * expansive and reflective than anything that would be said on camera.
 *
 * ⚠ DO NOT rewrite, tighten, polish or make this language more presentational.
 * It was corrected back to this form on purpose: declarative, finished copy
 * tells him what to say, where this gives him somewhere to go. The heading can
 * be punchy; the paragraph should not be.
 *
 * The principle: LOOK AT THE IDEA → REMEMBER WHAT I MEAN → TALK.
 *
 * Advance is manual only. There is no pacing, no auto-advance and no
 * teleprompter behaviour, so the old speakDuration/holdDuration fields are
 * gone with it.
 *
 * ⚠ public/captions/intro-en.vtt belongs to the film on /intro and is a
 * separate, static file. It is no longer related to this score.
 */

export interface Card {
  id: number;
  /** The idea, in three or four words. Set large. */
  heading: string;
  /** The reflective prompt underneath. Set smaller. Never spoken verbatim. */
  paragraph: string;
}

export const SCORE: Card[] = [
  { id: 1, heading: 'THANKS FOR CHECKING IN', paragraph: 'I suppose the easiest way to explain what I do is... I’ve always had this thing about making things go, and making them work better.' },
  { id: 2, heading: 'HOW I’M WIRED', paragraph: 'I’ve always had a thing for making things go and work better. When something is messy, stuck or complicated, I naturally want to understand it and get it moving. That’s just how my brain works.' },
  { id: 3, heading: 'BEEN AROUND', paragraph: 'I’ve spent my career where somebody has an ambition and people have to make it real. Big agencies, major brands, then building and running my own agency for seven years. I’ve seen this from both sides.' },
  { id: 4, heading: 'AMBITION OUTRUNS IT', paragraph: 'Businesses rarely run out of good ideas. They reach a point where what they’re trying to do has become bigger or faster than the way the business actually works. The old informal ways stop being enough. That’s the moment I recognise.' },
  { id: 5, heading: 'GET IT MOVING', paragraph: 'That’s where I’m useful. I can come into something complicated, understand what’s really happening, find what’s stuck or unclear, get people aligned and create movement. Not theory. Make the thing go.' },
  { id: 6, heading: 'DON’T KILL THE GOOD BIT', paragraph: 'I don’t believe becoming better organised should mean becoming corporate, slow or bland. The job is to make the business more capable without flattening the instinct, energy and character that made it good in the first place.' },
  { id: 7, heading: 'THE WORK HAS TO WORK', paragraph: 'I’m not interested in efficient machinery for its own sake. I want that machinery to produce the best work possible. Work that reaches customers, makes them feel something and makes them act. Ultimately, it has to sell.' },
  { id: 8, heading: 'THAT’S WHERE I COME IN', paragraph: 'So yeah, that’s kind of where I come in. If you’ve got something important you’re trying to get moving, I’d love to have a chat.' },
];

/** Kept for the page's section rail. */
export const ARC = SCORE.map((c) => c.heading);
