/**
 * The script for /script, in two forms.
 *
 * ⚠ DO NOT rewrite, tighten, polish, shorten or make this language more
 * presentational. `paragraph` is the full thought, read once in DIGEST to load
 * the meaning. `flow` is the same thought reduced to a cue, shown enormous in
 * FLOW while filming. The words spoken on camera are neither: they are his.
 *
 *     DIGEST THE MEANING FIRST → THEN FLOW THROUGH THE IDEAS
 *
 * FLOW must never show `paragraph`. The moment it does it is a teleprompter
 * again, and he is reading rather than talking.
 */

export interface Card {
  id: number;
  /** Section heading. Set large above the paragraph in DIGEST. */
  label: string;
  /** The full thought. DIGEST only, never shown in FLOW. */
  paragraph: string;
  /** The thought as a cue. Set enormous in FLOW. */
  flow: string;
  /** Seconds into the take at which this cue arrives. */
  at: number;
}

/**
 * Length of the take. The last cue lands at 0:42 and holds for the remaining
 * eight seconds — the clock stops there rather than pushing him off the end.
 * Starting long on purpose: if he gets ahead of the cards, shorten it; if they
 * drag him, lengthen it. The software should not dictate the performance.
 */
export const RUN_SECONDS = 50;

export const SCORE: Card[] = [
  {
    id: 1,
    label: 'OPEN',
    flow: 'THANKS FOR CHECKING IN',
    at: 0,
    paragraph:
      'Thanks for checking in. I suppose the easiest way to explain what I do is…',
  },
  {
    id: 2,
    label: 'HOW I’M WIRED',
    flow: 'HOW I’M WIRED',
    at: 4,
    paragraph:
      'I’ve always had a thing for making things go and work better. When something is messy, stuck or complicated, I naturally want to understand what’s really going on, work out what matters, and get it moving. That’s just how my brain works.',
  },
  {
    id: 3,
    label: 'BEEN AROUND',
    flow: 'BEEN AROUND',
    at: 9,
    paragraph:
      'I’ve spent my working life in that place where somebody has an ambition and a bunch of people have to somehow make it real. I’ve done that inside big agencies, with major brands, and then I co-founded an agency of my own and ran it for seven years. So I’ve seen what it takes from both sides.',
  },
  {
    id: 4,
    label: 'AMBITION OUTRUNS IT',
    flow: 'AMBITION OUTRUNS IT',
    at: 15,
    paragraph:
      'Businesses don’t generally run out of good ideas. What happens is that the ambition gets bigger, the business gets more complicated, and eventually what they’re trying to do starts moving faster than the way the place actually works. Things that used to happen naturally or informally stop being enough. That’s the moment I recognise.',
  },
  {
    id: 5,
    label: 'GET IT MOVING',
    flow: 'GET IT MOVING',
    at: 22,
    paragraph:
      'Hand me an ambition and I’ll tell you what it actually takes, then make it happen. That means getting underneath what’s really going on, finding what’s stuck or unclear, working out what needs to change, getting the right people aligned, and staying close enough to the work to actually create movement. I’m not really interested in the theory of it. I want to make the thing go.',
  },
  {
    id: 6,
    label: 'DON’T KILL THE GOOD BIT',
    flow: 'DON’T KILL THE GOOD BIT',
    at: 30,
    paragraph:
      'The thing I care about is that making a business more capable shouldn’t mean making it more corporate, slower or blander. There’s usually something instinctive and energetic that made the business good in the first place. I want to put enough structure around that to let it grow, without flattening the very thing that made people care about it.',
  },
  {
    id: 7,
    label: 'THE WORK HAS TO WORK',
    flow: 'THE WORK HAS TO WORK',
    at: 36,
    paragraph:
      'I’m not interested in operations or efficient machinery for its own sake. All of that exists to get the best work out into the world. I want the good idea to survive the journey through the business and actually reach the customer, make them feel something and make them act. Because ultimately, however much we dress it up, it has to sell.',
  },
  {
    id: 8,
    label: 'CLOSE',
    flow: 'THAT’S WHERE I COME IN',
    at: 42,
    paragraph:
      'So yeah, that’s kind of where I come in. If you’ve got something important you’re trying to get moving, I’d love to have a chat.',
  },
];
