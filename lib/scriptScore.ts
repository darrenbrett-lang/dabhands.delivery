/**
 * The score for /script — the 45-second conversational cut.
 *
 * ⚠ This is NOT the old performance score. The 24-card version was built for a
 * 90-second deliberate delivery with engineered pauses. This film is a person
 * talking to one person, so the software's job changed: keep the words next to
 * the lens, keep the next thought available, and get out of the way.
 *
 * Line breaks are reading aids, not breathing marks — they exist to keep each
 * block narrow and close to the camera. Several thoughts run straight into the
 * next with no pause at all; see holdDuration.
 *
 * `beat` is the Own It label. There is no `intent`: emotional direction was
 * removed on purpose, because holding an expression is what makes someone look
 * like they are performing.
 *
 * ⚠ Editing the words here does NOT update the film's captions.
 * public/captions/intro-en.vtt is generated from this file; regenerate it on
 * any script change or the captions will speak lines that no longer exist.
 */

export interface Card {
  id: number;
  /** The Own It label — what this thought is, in three or four words. */
  beat: string;
  /** Delivery lines. Breaks keep the block narrow, they are not pauses. */
  fullText: string[];
  /** Anchors only — enough to find the thought, not to read it. */
  cueText: string[];
  /** A short plain note. Kept deliberately sparse. */
  voiceDirection: string;
  /** Seconds of speech, set slightly SHORT so the page stays ahead of him. */
  speakDuration: number;
  /** Seconds of silence after. Cut by a third on 1 Sep — he was having to
   *  wait between lines. Mostly ~0.13 now: a breath, not a beat. */
  holdDuration: number;
}

export const SCORE: Card[] = [
  {
    id: 1,
    beat: 'HELLO',
    fullText: ['Hi, I’m Darren.'],
    cueText: ['HI · DARREN'],
    voiceDirection: 'Just say hello to the person behind the camera.',
    speakDuration: 1.2,
    holdDuration: 0.13,
  },
  {
    id: 2,
    beat: 'HOW I’M WIRED',
    fullText: ['I’ve always had a thing for making things go,', 'and work better.'],
    cueText: ['THING → GO → BETTER'],
    voiceDirection: 'Throwaway. This is how you have always been, not a claim.',
    speakDuration: 4.4,
    holdDuration: 0.13,
  },
  {
    id: 3,
    beat: 'WHERE I’VE WORKED',
    fullText: ['I’ve spent my working life where ambition has to become reality,', 'inside tier-one agencies, with major brands.'],
    cueText: ['AMBITION → REALITY', 'TIER-ONE · MAJOR BRANDS'],
    voiceDirection: 'Runs straight on into the next thought. No pause at the card change.',
    speakDuration: 6.6,
    holdDuration: 0.07,
  },
  {
    id: 4,
    beat: 'I’VE RUN ONE TOO',
    fullText: ['Then I co-founded an agency of my own', 'and ran it for seven years.'],
    cueText: ['CO-FOUNDED', 'SEVEN YEARS'],
    voiceDirection: 'Matter of fact.',
    speakDuration: 5.6,
    holdDuration: 0.17,
  },
  {
    id: 5,
    beat: 'WHAT I’VE NOTICED',
    fullText: ['Here’s what I notice.'],
    cueText: ['HERE’S WHAT I NOTICE'],
    voiceDirection: 'The small beat a person makes when they change subject. Not dramatic.',
    speakDuration: 1.5,
    holdDuration: 0.33,
  },
  {
    id: 6,
    beat: 'THE PROBLEM',
    fullText: ['Businesses get into trouble', 'when ambition starts moving faster', 'than the way they work.'],
    cueText: ['AMBITION MOVING FASTER', 'THAN THE BUSINESS WORKS'],
    voiceDirection: 'Finish the thought. A normal full stop, nothing more.',
    speakDuration: 5.2,
    holdDuration: 0.27,
  },
  {
    id: 7,
    beat: 'WHAT PEOPLE BRING ME IN FOR',
    fullText: ['People bring me in', 'to get important work moving again,'],
    cueText: ['BRING ME IN', 'MOVING AGAIN'],
    voiceDirection: '⚠ One sentence with the next card. There must be no audible pause here.',
    speakDuration: 3.7,
    holdDuration: 0.0,
  },
  {
    id: 8,
    beat: 'DON’T KILL THE MAGIC',
    fullText: ['without flattening what made the business good', 'in the first place.'],
    cueText: ['WITHOUT FLATTENING', 'WHAT MADE IT GOOD'],
    voiceDirection: 'The second half of the sentence you started on the last card.',
    speakDuration: 4.0,
    holdDuration: 0.17,
  },
  {
    id: 9,
    beat: 'GET THE BEST WORK OUT',
    fullText: ['I care about getting the best work out.'],
    cueText: ['BEST WORK OUT'],
    voiceDirection: 'One argument runs from here to “it has to sell”. Keep it moving.',
    speakDuration: 3.0,
    holdDuration: 0.1,
  },
  {
    id: 10,
    beat: 'MAKE PEOPLE FEEL + ACT',
    fullText: ['Work that makes customers feel something', 'and act.'],
    cueText: ['CUSTOMERS', 'FEEL → ACT'],
    voiceDirection: 'Still the same argument. Not a separate statement.',
    speakDuration: 3.0,
    holdDuration: 0.1,
  },
  {
    id: 11,
    beat: 'IT HAS TO SELL',
    fullText: ['Because ultimately,', 'it has to sell.'],
    cueText: ['ULTIMATELY', 'HAS TO SELL'],
    voiceDirection: 'Let the sentence finish. No theatrical silence after it.',
    speakDuration: 2.3,
    holdDuration: 0.27,
  },
  {
    id: 12,
    beat: 'INVITATION',
    fullText: ['If something important isn’t landing,', 'I’d love to hear from you.'],
    cueText: ['IMPORTANT NOT LANDING', 'LOVE TO HEAR FROM YOU'],
    voiceDirection:
      'Then stay with them for about a second. Not a pose, not a nod, no finished expression — just still there. Then it fades.',
    speakDuration: 4.1,
    holdDuration: 0.9,
  },
];

/** Shown on the setup screen. */
export const ARC = 'TALK TO ONE PERSON';
